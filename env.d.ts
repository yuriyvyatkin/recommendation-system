/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_API_URL: string;
  // Declare other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
