import { randomBytes } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

export const DEFAULT_TOKEN_FILE = path.join(os.homedir(), ".tortolero", "token");

/** Lee el token guardado o crea uno nuevo de 256 bits (archivo con permisos 600). */
export function loadOrCreateToken(file = DEFAULT_TOKEN_FILE, rotate = false): string {
  if (!rotate && existsSync(file)) {
    const saved = readFileSync(file, "utf8").trim();
    if (saved.length >= 32) return saved;
  }
  const token = randomBytes(32).toString("base64url");
  mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  writeFileSync(file, token + "\n", { mode: 0o600 });
  chmodSync(file, 0o600);
  return token;
}
