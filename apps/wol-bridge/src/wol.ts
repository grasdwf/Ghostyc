// Wake-on-LAN magic packet sender (Linux Mint bridge).
//
// Magic packet: 6 × 0xFF + 16 × 6-byte MAC = 102 bytes. UDP/IPv4 broadcast.
// Bind ephemeral port → setBroadcast(true) → send (required on Linux).

import * as dgram from "node:dgram";
import * as os from "node:os";
import type { BridgeLogger } from "./logger.js";

const COLON_MAC = /^([0-9A-Fa-f]{2}):([0-9A-Fa-f]{2}):([0-9A-Fa-f]{2}):([0-9A-Fa-f]{2}):([0-9A-Fa-f]{2}):([0-9A-Fa-f]{2})$/;
const HYPHEN_MAC = /^([0-9A-Fa-f]{2})-([0-9A-Fa-f]{2})-([0-9A-Fa-f]{2})-([0-9A-Fa-f]{2})-([0-9A-Fa-f]{2})-([0-9A-Fa-f]{2})$/;
const COMPACT_MAC = /^[0-9A-Fa-f]{12}$/;

export interface WakeOptions {
  mac: string;
  /** Primary LAN broadcast (e.g. 192.168.1.255). */
  broadcast: string;
  /** Primary UDP port from env (default 9). */
  wolPort: number;
  /** When true, also 255.255.255.255 and port 7 per matrix. */
  multiSend: boolean;
  /** Bind socket to this local IPv4 so the datagram leaves the right NIC. */
  bindAddress?: string;
  /** Send timeout in ms for the whole operation. Default 5000. */
  timeoutMs?: number;
  /** Structured bridge logs (tcpdump / iPhone app comparison). */
  logger?: Pick<BridgeLogger, "info" | "debug" | "warn">;
  /** Correlates with command.request_id when present. */
  request_id?: string | null;
}

export interface WakeAttempt {
  destination: string;
  port: number;
  bytes: number;
  packetLength: number;
  status: "packet_sent";
}

export interface WakeResult {
  status: "packet_sent";
  packet_sent: true;
  packetLength: number;
  normalized_mac: string;
  attempts: WakeAttempt[];
  note: string;
}

export class WolError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = "WolError";
  }
}

/** Parse MAC to exactly 6 bytes; accepts :, -, or 12 hex (not ASCII text). */
export function parseMac(mac: string): { bytes: Buffer; normalized: string } {
  const raw = mac.trim();
  let hex: string;
  if (COLON_MAC.test(raw)) {
    hex = raw.replace(/:/g, "");
  } else if (HYPHEN_MAC.test(raw)) {
    hex = raw.replace(/-/g, "");
  } else if (COMPACT_MAC.test(raw)) {
    hex = raw;
  } else {
    throw new WolError(
      "wol.invalid_mac",
      `MAC must be AA:BB:CC:DD:EE:FF, AA-BB-CC-DD-EE-FF, or AABBCCDDEEFF (got ${JSON.stringify(raw)})`,
    );
  }
  const bytes = Buffer.from(hex, "hex");
  if (bytes.length !== 6) {
    throw new WolError("wol.invalid_mac", `decoded MAC has ${bytes.length} bytes, expected 6`);
  }
  const normalized = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(":");
  return { bytes, normalized };
}

/** Build WoL payload: 102 bytes — 6×0xFF + MAC×16. */
export function buildMagicPacket(macBytes: Buffer): Buffer {
  if (macBytes.length !== 6) {
    throw new WolError("wol.invalid_mac", `MAC buffer must be 6 bytes, got ${macBytes.length}`);
  }
  const packet = Buffer.allocUnsafe(102);
  packet.fill(0xff, 0, 6);
  for (let i = 0; i < 16; i++) {
    macBytes.copy(packet, 6 + i * 6);
  }
  if (packet.length !== 102) {
    throw new WolError("wol.internal", `packet length assertion failed: ${packet.length}`);
  }
  return packet;
}

function networkInterfacesSnapshot(): Record<string, { address: string; internal: boolean }[]> {
  const snap: Record<string, { address: string; internal: boolean }[]> = {};
  const ifaces = os.networkInterfaces();
  for (const [name, addrs] of Object.entries(ifaces)) {
    if (!addrs) continue;
    snap[name] = addrs
      .filter((a) => a.family === "IPv4")
      .map((a) => ({ address: a.address, internal: a.internal }));
  }
  return snap;
}

function buildSendMatrix(broadcast: string, wolPort: number, multiSend: boolean): { host: string; port: number }[] {
  if (!multiSend) {
    return [{ host: broadcast, port: wolPort }];
  }
  const destinations = [broadcast, "255.255.255.255"];
  const ports = Array.from(new Set([wolPort, 7]));
  const out: { host: string; port: number }[] = [];
  for (const host of destinations) {
    for (const port of ports) {
      out.push({ host, port });
    }
  }
  return out;
}

/**
 * Send magic packet(s) per options. Resolves when all UDP sends succeed (OS accepted datagrams only).
 */
export function sendMagicPacket(opts: WakeOptions): Promise<WakeResult> {
  const timeoutMs = opts.timeoutMs ?? 5000;
  const log = opts.logger;
  const rid = opts.request_id ?? null;

  const { bytes: macBytes, normalized } = parseMac(opts.mac);
  const packet = buildMagicPacket(macBytes);
  const matrix = buildSendMatrix(opts.broadcast, opts.wolPort, opts.multiSend);

  const macBytesArr = Array.from(macBytes);
  const firstSix = Array.from(packet.subarray(0, 6));
  const firstRepeat = Array.from(packet.subarray(6, 12));
  const toHex = (arr: number[]) => arr.map((b) => b.toString(16).padStart(2, "0")).join(" ");

  if (log) {
    log.info(
      "wol.prepare",
      "WoL packet prepared (pre-send diagnostics)",
      {
        request_id: rid,
        context: {
          raw_mac: opts.mac.trim(),
          normalized_mac: normalized,
          parsed_mac_bytes_decimal: macBytesArr,
          parsed_mac_bytes_hex: toHex(macBytesArr),
          packet_length: packet.length,
          first_6_packet_bytes_decimal: firstSix,
          first_6_packet_bytes_hex: toHex(firstSix),
          first_mac_repeat_bytes_decimal: firstRepeat,
          first_mac_repeat_bytes_hex: toHex(firstRepeat),
          broadcast_destinations: matrix.map((m) => m.host),
          ports: matrix.map((m) => m.port),
          multi_send: opts.multiSend,
          wol_port: opts.wolPort,
          bind_address: opts.bindAddress ?? null,
          os_network_interfaces_ipv4: networkInterfacesSnapshot(),
        },
      },
    );
  }

  return new Promise<WakeResult>((resolve, reject) => {
    const socket = dgram.createSocket({ type: "udp4", reuseAddr: true });
    let settled = false;
    const finishErr = (err: WolError) => {
      if (settled) return;
      settled = true;
      try {
        socket.close();
      } catch {
        /* ignore */
      }
      reject(err);
    };
    const finishOk = (attempts: WakeAttempt[]) => {
      if (settled) return;
      settled = true;
      try {
        socket.close();
      } catch {
        /* ignore */
      }
      resolve({
        status: "packet_sent",
        packet_sent: true,
        packetLength: packet.length,
        normalized_mac: normalized,
        attempts,
        note: "UDP accepted by OS; delivery/wake not guaranteed",
      });
    };

    const timer = setTimeout(() => {
      finishErr(new WolError("wol.timeout", `magic packet send timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    socket.once("error", (err) => {
      clearTimeout(timer);
      finishErr(new WolError("wol.send_failed", err.message));
    });

    const onBound = () => {
      let local: string | null = null;
      try {
        const a = socket.address();
        local = typeof a === "string" ? a : `${a.address}:${a.port}`;
      } catch {
        local = null;
      }
      if (log) {
        log.debug("wol.socket_bound", "UDP socket bound", {
          request_id: rid,
          context: { local_address: local, bind_address_config: opts.bindAddress ?? null },
        });
      }
      try {
        socket.setBroadcast(true);
      } catch (err) {
        clearTimeout(timer);
        finishErr(
          new WolError(
            "wol.broadcast_failed",
            err instanceof Error ? err.message : String(err),
          ),
        );
        return;
      }

      void (async () => {
        const attempts: WakeAttempt[] = [];
        try {
          for (const { host, port } of matrix) {
            const bytes = await new Promise<number>((res, rej) => {
              socket.send(packet, 0, packet.length, port, host, (err, n) => {
                if (err) rej(err);
                else res(n ?? packet.length);
              });
            });
            const attempt: WakeAttempt = {
              destination: host,
              port,
              bytes,
              packetLength: packet.length,
              status: "packet_sent",
            };
            attempts.push(attempt);
            if (log) {
              log.info("wol.udp_sent", "UDP send completed (OS accepted datagram)", {
                request_id: rid,
                status: "packet_sent",
                context: {
                  destination: host,
                  port,
                  bytes_sent: bytes,
                  packet_length: packet.length,
                  status: "packet_sent",
                },
              });
            }
          }
          clearTimeout(timer);
          finishOk(attempts);
        } catch (err) {
          clearTimeout(timer);
          const msg = err instanceof Error ? err.message : String(err);
          finishErr(new WolError("wol.send_failed", msg));
        }
      })();
    };

    try {
      if (opts.bindAddress) {
        socket.bind(0, opts.bindAddress, onBound);
      } else {
        socket.bind(0, onBound);
      }
    } catch (err) {
      clearTimeout(timer);
      finishErr(new WolError("wol.bind_failed", err instanceof Error ? err.message : String(err)));
    }
  });
}

/** Resolve optional interface name to first non-internal IPv4 address. */
export function resolveInterfaceAddress(interfaceName: string): string {
  const ifaces = os.networkInterfaces();
  const list = ifaces[interfaceName];
  if (!list || list.length === 0) {
    throw new WolError("wol.unknown_interface", `no addresses for interface ${JSON.stringify(interfaceName)}`);
  }
  const ipv4 = list.find((i) => i.family === "IPv4" && !i.internal);
  if (!ipv4?.address) {
    throw new WolError(
      "wol.interface_no_ipv4",
      `interface ${JSON.stringify(interfaceName)} has no non-internal IPv4 address`,
    );
  }
  return ipv4.address;
}
