import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, statSync, writeFileSync } from "node:fs";
import type { AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";
import { after, before, describe, it } from "node:test";
import { createMcpHttpServer } from "../http.js";
import { loadOrCreateToken } from "../token.js";
import { parseTunnelUrl } from "../tunnel.js";

const root = mkdtempSync(path.join(os.tmpdir(), "tortolero-http-"));
const outside = mkdtempSync(path.join(os.tmpdir(), "tortolero-http-out-"));
const token = "t".repeat(20) + "SECRETO" + "x".repeat(20);
let base: string;
let server: ReturnType<typeof createMcpHttpServer>;

before(async () => {
  process.env.TORTOLERO_ALLOWED_DIRS = root;
  server = createMcpHttpServer(token);
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

after(() => {
  server.close();
});

const rpc = { jsonrpc: "2.0", id: 1, method: "tools/list", params: {} };
const post = (url: string, headers: Record<string, string> = {}, body: string = JSON.stringify(rpc)) =>
  fetch(url, { method: "POST", headers: { "content-type": "application/json", accept: "application/json, text/event-stream", ...headers }, body });

describe("autenticacion HTTP", () => {
  it("responde 404 sin token", async () => {
    assert.equal((await post(`${base}/mcp`)).status, 404);
    assert.equal((await post(`${base}/`)).status, 404);
  });

  it("responde 404 con token incorrecto (ruta y header)", async () => {
    assert.equal((await post(`${base}/mcp/${"x".repeat(token.length)}`)).status, 404);
    assert.equal((await post(`${base}/mcp`, { authorization: "Bearer mal" })).status, 404);
  });

  it("no revela nada en el 404", async () => {
    const text = await (await post(`${base}/mcp/incorrecto`)).text();
    assert.equal(text, JSON.stringify({ error: "not found" }));
  });

  it("acepta el token en la ruta y como Bearer", async () => {
    assert.equal((await post(`${base}/mcp/${token}`)).status, 200);
    assert.equal((await post(`${base}/mcp`, { authorization: `Bearer ${token}` })).status, 200);
  });

  it("solo permite POST", async () => {
    const res = await fetch(`${base}/mcp/${token}`, { method: "GET" });
    assert.equal(res.status, 405);
  });

  it("rechaza JSON invalido y cuerpos enormes", async () => {
    assert.equal((await post(`${base}/mcp/${token}`, {}, "{no es json")).status, 400);
    assert.equal((await post(`${base}/mcp/${token}`, {}, JSON.stringify({ x: "a".repeat(1_100_000) }))).status, 413);
  });

  it("exige un token de al menos 32 caracteres", () => {
    assert.throws(() => createMcpHttpServer("corto"), /32 caracteres/);
  });
});

describe("uso real por HTTP", () => {
  it("un cliente MCP lista herramientas, escribe y lee archivos", async () => {
    const client = new Client({ name: "test-http", version: "0.0.0" });
    await client.connect(new StreamableHTTPClientTransport(new URL(`${base}/mcp/${token}`)));
    const tools = (await client.listTools()).tools.map((t) => t.name);
    assert.ok(tools.includes("read_file") && tools.includes("start_process"));

    const file = path.join(root, "remoto.txt");
    await client.callTool({ name: "write_file", arguments: { path: file, content: "hola remoto" } });
    const read = (await client.callTool({ name: "read_file", arguments: { path: file } })) as { content: { text: string }[] };
    assert.equal(read.content[0]?.text, "hola remoto");
    await client.close();
  });

  it("mantiene la politica de rutas por HTTP", async () => {
    writeFileSync(path.join(outside, "secreto.txt"), "no debe leerse");
    const client = new Client({ name: "test-http", version: "0.0.0" });
    await client.connect(new StreamableHTTPClientTransport(new URL(`${base}/mcp/${token}`)));
    const res = (await client.callTool({ name: "read_file", arguments: { path: path.join(outside, "secreto.txt") } })) as {
      isError?: boolean;
      content: { text: string }[];
    };
    assert.equal(res.isError, true);
    assert.match(res.content[0]?.text ?? "", /fuera de los directorios permitidos/);
    await client.close();
  });
});

describe("token y tunel", () => {
  it("crea un token de 256 bits con permisos 600 y lo reutiliza", () => {
    const file = path.join(mkdtempSync(path.join(os.tmpdir(), "tortolero-tok-")), "sub", "token");
    const first = loadOrCreateToken(file);
    assert.ok(first.length >= 43);
    assert.equal(statSync(file).mode & 0o777, 0o600);
    assert.equal(loadOrCreateToken(file), first);
    assert.equal(readFileSync(file, "utf8").trim(), first);
  });

  it("--rotate genera un token distinto", () => {
    const file = path.join(mkdtempSync(path.join(os.tmpdir(), "tortolero-tok-")), "token");
    const first = loadOrCreateToken(file);
    assert.notEqual(loadOrCreateToken(file, true), first);
  });

  it("extrae la URL del tunel de la salida de cloudflared", () => {
    const log = "INF |  https://rapid-fox-1234.trycloudflare.com  |\nINF Registered tunnel";
    assert.equal(parseTunnelUrl(log), "https://rapid-fox-1234.trycloudflare.com");
    assert.equal(parseTunnelUrl("sin url"), undefined);
    assert.equal(parseTunnelUrl("https://evil.example.com/trycloudflare.com"), undefined);
  });
});
