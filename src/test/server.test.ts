import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, symlinkSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const entry = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "index.js");
const root = mkdtempSync(path.join(os.tmpdir(), "tortolero-test-"));
const outside = mkdtempSync(path.join(os.tmpdir(), "tortolero-outside-"));
let client: Client;

async function call(name: string, args: Record<string, unknown>) {
  const res = (await client.callTool({ name, arguments: args })) as {
    isError?: boolean;
    content: { type: string; text: string }[];
  };
  return { isError: res.isError === true, text: res.content[0]?.text ?? "" };
}

before(async () => {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [entry],
    env: { ...process.env, TORTOLERO_ALLOWED_DIRS: root } as Record<string, string>,
  });
  client = new Client({ name: "test", version: "0.0.0" });
  await client.connect(transport);
});

after(async () => {
  await client.close();
});

describe("archivos", () => {
  it("escribe, lee y edita", async () => {
    const file = path.join(root, "a", "nota.txt");
    assert.equal((await call("write_file", { path: file, content: "uno\ndos\ntres" })).isError, false);
    assert.equal((await call("read_file", { path: file })).text, "uno\ndos\ntres");
    assert.match((await call("read_file", { path: file, offset: 1, length: 1 })).text, /dos$/);
    assert.equal((await call("edit_block", { path: file, old_string: "dos", new_string: "DOS" })).isError, false);
    assert.equal((await call("read_file", { path: file })).text, "uno\nDOS\ntres");
  });

  it("edit_block falla si hay coincidencias ambiguas", async () => {
    const file = path.join(root, "dup.txt");
    writeFileSync(file, "x x");
    const res = await call("edit_block", { path: file, old_string: "x", new_string: "y" });
    assert.equal(res.isError, true);
    assert.match(res.text, /2 coincidencias|hay 2/);
  });

  it("busca por nombre y por contenido", async () => {
    mkdirSync(path.join(root, "src"));
    writeFileSync(path.join(root, "src", "hola.ts"), "const saludo = 'hola mundo';\n");
    assert.match((await call("search_files", { path: root, pattern: "HOLA" })).text, /hola\.ts/);
    assert.match((await call("search_content", { path: root, regex: "saludo\\s*=" })).text, /hola\.ts:1:/);
  });

  it("move_file no sobrescribe", async () => {
    writeFileSync(path.join(root, "m1.txt"), "1");
    writeFileSync(path.join(root, "m2.txt"), "2");
    const res = await call("move_file", { source: path.join(root, "m1.txt"), destination: path.join(root, "m2.txt") });
    assert.equal(res.isError, true);
  });
});

describe("seguridad de rutas", () => {
  it("rechaza rutas fuera de los directorios permitidos", async () => {
    const res = await call("read_file", { path: path.join(outside, "x.txt") });
    assert.equal(res.isError, true);
    assert.match(res.text, /fuera de los directorios permitidos/);
  });

  it("rechaza escapar con ..", async () => {
    const res = await call("read_file", { path: path.join(root, "..", path.basename(outside), "x.txt") });
    assert.equal(res.isError, true);
  });

  it("rechaza symlinks que apuntan fuera", async () => {
    writeFileSync(path.join(outside, "secreto.txt"), "secreto");
    symlinkSync(outside, path.join(root, "enlace"));
    const res = await call("read_file", { path: path.join(root, "enlace", "secreto.txt") });
    assert.equal(res.isError, true);
  });

  it("no escribe fuera de los directorios permitidos", async () => {
    const res = await call("write_file", { path: path.join(outside, "nuevo.txt"), content: "x" });
    assert.equal(res.isError, true);
  });
});

describe("procesos", () => {
  it("ejecuta un comando y devuelve su salida", async () => {
    const res = await call("start_process", { command: "echo hola-proceso", cwd: root });
    assert.match(res.text, /hola-proceso/);
    assert.match(res.text, /proceso terminado: codigo=0/);
  });

  it("interactua con un proceso en ejecucion y lo termina", async () => {
    const started = JSON.parse((await call("start_process", { command: "cat", cwd: root, timeout_ms: 300 })).text) as { pid: number };
    const echo = await call("interact_with_process", { pid: started.pid, input: "ping" });
    assert.match(echo.text, /ping/);
    assert.equal((await call("force_terminate", { pid: started.pid })).isError, false);
    const out = await call("read_process_output", { pid: started.pid, timeout_ms: 2000 });
    assert.match(out.text, /proceso terminado/);
  });

  it("falla con un pid inexistente", async () => {
    assert.equal((await call("read_process_output", { pid: 999999 })).isError, true);
  });
});
