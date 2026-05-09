/** Relay URL resolution for REST and WebSocket. Build-time env only. */

function trimTrailingSlashes(s: string): string {
  return s.replace(/\/+$/, "");
}

/**
 * Base URL for REST (no trailing slash). Empty string = relative URLs (Vite dev proxy).
 * Priority: VITE_API_BASE_URL → VITE_RELAY_URL (legacy) → "".
 */
export function getApiBaseUrl(): string {
  const api = import.meta.env.VITE_API_BASE_URL?.trim();
  if (api) return trimTrailingSlashes(api);
  const legacy = import.meta.env.VITE_RELAY_URL?.trim();
  if (legacy) return trimTrailingSlashes(legacy);
  return "";
}

/**
 * WebSocket origin (no trailing slash, no path).
 * Priority: VITE_WS_BASE_URL → derive from getApiBaseUrl() → ws(s)://current host (dev).
 */
export function getWsBaseUrl(): string {
  const ws = import.meta.env.VITE_WS_BASE_URL?.trim();
  if (ws) return trimTrailingSlashes(ws);
  const api = getApiBaseUrl();
  if (api) {
    return trimTrailingSlashes(
      api.replace(/^http:\/\//i, "ws://").replace(/^https:\/\//i, "wss://"),
    );
  }
  if (typeof window !== "undefined") {
    const proto = window.location.protocol === "https:" ? "wss" : "ws";
    return `${proto}://${window.location.host}`;
  }
  return "ws://localhost:5173";
}
