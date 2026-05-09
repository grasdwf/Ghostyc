// Bridge env config — validated on boot. PROTOCOL.md §14.

import { z } from "zod";
import { parseMac } from "./wol.js";

const IPV4_RE = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d)$/;

function isValidMac(v: string): boolean {
  try {
    parseMac(v);
    return true;
  } catch {
    return false;
  }
}

const ConfigSchema = z.object({
  GHOSTYC_BRIDGE_TOKEN: z.string().min(8, "must be at least 8 chars"),
  RELAY_URL: z
    .string()
    .min(1)
    .refine(
      (v) => /^wss?:\/\//i.test(v) || /^https?:\/\//i.test(v),
      { message: "must start with ws://, wss://, http:// or https://" },
    ),
  PC_MAC_ADDRESS: z.string().refine((v) => isValidMac(v), {
    message: "must be AA:BB:CC:DD:EE:FF, AA-BB-CC-DD-EE-FF, or AABBCCDDEEFF",
  }),
  PC_BROADCAST_ADDRESS: z
    .string()
    .refine((v) => IPV4_RE.test(v), { message: "must be IPv4 dotted quad" }),
  GHOSTYC_BRIDGE_LOG_DIR: z.string().default("./logs"),
  WOL_PORT: z.preprocess(
    (v) => (v === undefined || v === null || String(v).trim() === "" ? 9 : Number(v)),
    z.number().int().min(1).max(65535),
  ),
  /** When true (default), try subnet broadcast + 255.255.255.255 and WOL_PORT + port 7. */
  WOL_MULTI_SEND: z.preprocess((v) => {
    if (v === undefined || v === null || String(v).trim() === "") return true;
    const s = String(v).toLowerCase().trim();
    if (s === "false" || s === "0" || s === "no") return false;
    if (s === "true" || s === "1" || s === "yes") return true;
    return false;
  }, z.boolean()),
  /** Bind UDP socket to this local IPv4 (wins over WOL_INTERFACE). */
  WOL_LOCAL_ADDRESS: z.preprocess(
    (v) => (v === undefined || v === null || String(v).trim() === "" ? undefined : String(v).trim()),
    z.string().regex(IPV4_RE).optional(),
  ),
  /** Bind to first non-internal IPv4 on this interface name (e.g. eth0, enp3s0). */
  WOL_INTERFACE: z.preprocess(
    (v) => (v === undefined || v === null || String(v).trim() === "" ? undefined : String(v).trim()),
    z.string().min(1).optional(),
  ),
});

export type BridgeConfig = z.infer<typeof ConfigSchema>;

export type ConfigLoadResult =
  | { ok: true; config: BridgeConfig }
  | { ok: false; missing: string[]; invalid: { key: string; reason: string }[] };

export function loadConfig(env: NodeJS.ProcessEnv): ConfigLoadResult {
  const parsed = ConfigSchema.safeParse(env);
  if (parsed.success) return { ok: true, config: parsed.data };
  const missing: string[] = [];
  const invalid: { key: string; reason: string }[] = [];
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "(root)");
    if (issue.code === "invalid_type" && issue.received === "undefined") {
      missing.push(key);
    } else {
      invalid.push({ key, reason: issue.message });
    }
  }
  return { ok: false, missing, invalid };
}

/** Convert an http(s)/ws(s) relay URL to the /ws/bridge WS endpoint. */
export function bridgeWsUrl(relayUrl: string): string {
  let base = relayUrl.replace(/\/$/, "");
  if (/^http:\/\//i.test(base)) base = "ws://" + base.slice("http://".length);
  else if (/^https:\/\//i.test(base)) base = "wss://" + base.slice("https://".length);
  return `${base}/ws/bridge`;
}
