/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Relay REST API base (production). Example: https://ghostyc-production.up.railway.app */
  readonly VITE_API_BASE_URL?: string;
  /** Relay WebSocket origin (production). Example: wss://ghostyc-production.up.railway.app */
  readonly VITE_WS_BASE_URL?: string;
  /** @deprecated Use VITE_API_BASE_URL. Still supported as fallback for REST/WS derivation. */
  readonly VITE_RELAY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
