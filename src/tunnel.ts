import { spawn } from "node:child_process";

const TUNNEL_URL = /https:\/\/[a-z0-9-]+\.trycloudflare\.com/;

export function parseTunnelUrl(text: string): string | undefined {
  return TUNNEL_URL.exec(text)?.[0];
}

export interface Tunnel {
  url: string;
  stop(): void;
}

/** Abre un Quick Tunnel gratuito de Cloudflare (sin cuenta) hacia el puerto local. */
export function startTunnel(port: number, timeoutMs = 30_000): Promise<Tunnel> {
  return new Promise((resolve, reject) => {
    const child = spawn("cloudflared", ["tunnel", "--no-autoupdate", "--url", `http://127.0.0.1:${port}`], {
      stdio: ["ignore", "ignore", "pipe"],
    });
    let settled = false;
    let buffer = "";
    const fail = (err: Error) => {
      if (settled) return;
      settled = true;
      child.kill("SIGTERM");
      reject(err);
    };
    const timer = setTimeout(() => fail(new Error("cloudflared no dio una URL a tiempo")), timeoutMs);

    child.stderr.on("data", (d: Buffer) => {
      buffer += d.toString("utf8");
      const url = parseTunnelUrl(buffer);
      if (url && !settled) {
        settled = true;
        clearTimeout(timer);
        resolve({ url, stop: () => child.kill("SIGTERM") });
      }
      buffer = buffer.slice(-2000);
    });
    child.on("error", (err) => {
      clearTimeout(timer);
      fail(
        (err as NodeJS.ErrnoException).code === "ENOENT"
          ? new Error("cloudflared no esta instalado. Instalalo con: brew install cloudflared")
          : err,
      );
    });
    child.on("exit", (code) => {
      clearTimeout(timer);
      fail(new Error(`cloudflared termino (codigo ${code}) antes de abrir el tunel`));
    });
  });
}
