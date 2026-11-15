import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

const DEFAULT_DENIED = [".ssh", ".aws", ".gnupg", ".config/gcloud", ".kube"];

export interface PathPolicy {
  allowed: string[];
  denied: string[];
}

function expandHome(p: string): string {
  if (p === "~") return os.homedir();
  if (p.startsWith("~/")) return path.join(os.homedir(), p.slice(2));
  return p;
}

function splitList(value: string | undefined): string[] {
  return (value ?? "")
    .split(path.delimiter)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => path.resolve(expandHome(s)));
}

export function loadPolicy(env: NodeJS.ProcessEnv = process.env): PathPolicy {
  const allowed = splitList(env.TORTOLERO_ALLOWED_DIRS);
  const home = os.homedir();
  return {
    allowed: allowed.length > 0 ? allowed : [home],
    denied: [
      ...DEFAULT_DENIED.map((d) => path.join(home, d)),
      ...splitList(env.TORTOLERO_DENIED_PATHS),
    ],
  };
}

function isInside(child: string, parent: string): boolean {
  const rel = path.relative(parent, child);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

/** Resuelve el realpath del ancestro existente mas cercano y le agrega el resto. */
async function realpathLoose(target: string): Promise<string> {
  const pending: string[] = [];
  let current = target;
  for (;;) {
    try {
      const real = await fs.realpath(current);
      return path.join(real, ...pending.reverse());
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
      const parent = path.dirname(current);
      if (parent === current) return target;
      pending.push(path.basename(current));
      current = parent;
    }
  }
}

export async function resolveSafe(
  input: string,
  policy: PathPolicy,
): Promise<string> {
  const absolute = path.resolve(expandHome(input));
  const real = await realpathLoose(absolute);
  const allowedReal = await Promise.all(
    policy.allowed.map((a) => realpathLoose(a)),
  );
  const deniedReal = await Promise.all(
    policy.denied.map((d) => realpathLoose(d)),
  );
  if (!allowedReal.some((a) => isInside(real, a))) {
    throw new Error(
      `Ruta fuera de los directorios permitidos: ${input}. Permitidos: ${policy.allowed.join(", ")}`,
    );
  }
  if (deniedReal.some((d) => isInside(real, d))) {
    throw new Error(`Ruta bloqueada por la politica de seguridad: ${input}`);
  }
  return real;
}
