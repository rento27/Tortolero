import { promises as fs } from "node:fs";
import path from "node:path";

const MAX_READ_BYTES = 2 * 1024 * 1024;
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", ".next", "__pycache__"]);

async function assertText(file: string): Promise<void> {
  const handle = await fs.open(file, "r");
  try {
    const buf = Buffer.alloc(4096);
    const { bytesRead } = await handle.read(buf, 0, buf.length, 0);
    if (buf.subarray(0, bytesRead).includes(0)) {
      throw new Error(`El archivo parece binario: ${file}`);
    }
  } finally {
    await handle.close();
  }
}

export async function readText(
  file: string,
  offset = 0,
  length?: number,
): Promise<string> {
  const stat = await fs.stat(file);
  if (!stat.isFile()) throw new Error(`No es un archivo: ${file}`);
  if (stat.size > MAX_READ_BYTES) {
    throw new Error(
      `Archivo demasiado grande (${stat.size} bytes, maximo ${MAX_READ_BYTES}). Usa search_content para ubicar la parte que necesitas.`,
    );
  }
  await assertText(file);
  const lines = (await fs.readFile(file, "utf8")).split("\n");
  const end = length === undefined ? lines.length : offset + length;
  const slice = lines.slice(offset, end);
  const header =
    offset > 0 || end < lines.length
      ? `[lineas ${offset + 1}-${offset + slice.length} de ${lines.length}]\n`
      : "";
  return header + slice.join("\n");
}

export async function writeText(
  file: string,
  content: string,
  append: boolean,
): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true });
  if (append) await fs.appendFile(file, content, "utf8");
  else await fs.writeFile(file, content, "utf8");
}

export async function editText(
  file: string,
  oldString: string,
  newString: string,
  expected: number,
): Promise<number> {
  if (oldString === "") throw new Error("old_string no puede estar vacio");
  const original = await fs.readFile(file, "utf8");
  const count = original.split(oldString).length - 1;
  if (count === 0) throw new Error("old_string no se encontro en el archivo");
  if (count !== expected) {
    throw new Error(
      `Se esperaban ${expected} coincidencias pero hay ${count}. Agrega mas contexto a old_string o ajusta expected_replacements.`,
    );
  }
  await fs.writeFile(file, original.split(oldString).join(newString), "utf8");
  return count;
}

export async function listDir(dir: string, depth: number): Promise<string[]> {
  const out: string[] = [];
  async function walk(current: string, level: number, prefix: string) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      const tag = entry.isDirectory() ? "[DIR]" : "[FILE]";
      out.push(`${tag} ${prefix}${entry.name}`);
      if (entry.isDirectory() && level < depth && !SKIP_DIRS.has(entry.name)) {
        await walk(path.join(current, entry.name), level + 1, `${prefix}${entry.name}/`);
      }
      if (out.length >= 2000) return;
    }
  }
  await walk(dir, 1, "");
  return out;
}

export async function fileInfo(file: string) {
  const s = await fs.stat(file);
  return {
    path: file,
    type: s.isDirectory() ? "directory" : s.isFile() ? "file" : "other",
    size: s.size,
    modified: s.mtime.toISOString(),
    created: s.birthtime.toISOString(),
    mode: (s.mode & 0o777).toString(8),
  };
}

export async function searchNames(
  root: string,
  pattern: string,
  maxResults: number,
): Promise<string[]> {
  const needle = pattern.toLowerCase();
  const results: string[] = [];
  async function walk(dir: string) {
    if (results.length >= maxResults) return;
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (results.length >= maxResults) return;
      const full = path.join(dir, e.name);
      if (e.name.toLowerCase().includes(needle)) results.push(full);
      if (e.isDirectory() && !SKIP_DIRS.has(e.name)) await walk(full);
    }
  }
  await walk(root);
  return results;
}

export async function searchContent(
  root: string,
  regex: RegExp,
  maxResults: number,
): Promise<string[]> {
  const results: string[] = [];
  async function walk(dir: string) {
    if (results.length >= maxResults) return;
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (results.length >= maxResults) return;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (!SKIP_DIRS.has(e.name)) await walk(full);
        continue;
      }
      if (!e.isFile()) continue;
      try {
        const stat = await fs.stat(full);
        if (stat.size > MAX_READ_BYTES) continue;
        await assertText(full);
        const lines = (await fs.readFile(full, "utf8")).split("\n");
        for (let i = 0; i < lines.length && results.length < maxResults; i++) {
          if (regex.test(lines[i] ?? "")) results.push(`${full}:${i + 1}: ${(lines[i] ?? "").trim().slice(0, 200)}`);
        }
      } catch {
        // archivo ilegible o binario: se omite
      }
    }
  }
  await walk(root);
  return results;
}
