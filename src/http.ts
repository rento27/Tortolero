import { timingSafeEqual } from "node:crypto";
import { createServer as createHttpServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "./server.js";

const MAX_BODY_BYTES = 1_000_000;

function tokenMatches(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function send(res: ServerResponse, status: number, body: unknown, headers: Record<string, string> = {}): void {
  res.writeHead(status, { "content-type": "application/json", ...headers });
  res.end(JSON.stringify(body));
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    size += (chunk as Buffer).length;
    if (size > MAX_BODY_BYTES) throw Object.assign(new Error("payload too large"), { status: 413 });
    chunks.push(chunk as Buffer);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw Object.assign(new Error("invalid json"), { status: 400 });
  }
}

/** Devuelve el token presentado: en la ruta /mcp/<token> o como Authorization: Bearer en /mcp. */
function presentedToken(req: IncomingMessage): string | undefined {
  const pathname = new URL(req.url ?? "/", "http://localhost").pathname;
  if (pathname.startsWith("/mcp/")) return decodeURIComponent(pathname.slice("/mcp/".length));
  if (pathname === "/mcp") {
    const auth = req.headers.authorization ?? "";
    return auth.startsWith("Bearer ") ? auth.slice("Bearer ".length) : undefined;
  }
  return undefined;
}

/**
 * Servidor MCP por HTTP sin estado. Cualquier peticion sin token valido recibe 404
 * para no revelar que hay un servidor. Solo acepta POST.
 */
export function createMcpHttpServer(token: string): Server {
  if (token.length < 32) throw new Error("El token debe tener al menos 32 caracteres");

  return createHttpServer(async (req, res) => {
    try {
      const given = presentedToken(req);
      if (given === undefined || !tokenMatches(given, token)) {
        return send(res, 404, { error: "not found" });
      }
      if (req.method !== "POST") {
        return send(res, 405, { error: "method not allowed" }, { allow: "POST" });
      }
      const body = await readJson(req);
      const server = createServer();
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true,
      });
      res.on("close", () => {
        void transport.close();
        void server.close();
      });
      await server.connect(transport);
      await transport.handleRequest(req, res, body);
    } catch (err) {
      const status = (err as { status?: number }).status ?? 500;
      if (!res.headersSent) {
        // Si no se leyo el cuerpo completo, la conexion no se puede reutilizar.
        const headers: Record<string, string> = status === 413 ? { connection: "close" } : {};
        send(res, status, { error: status === 500 ? "internal error" : (err as Error).message }, headers);
      } else res.end();
    }
  });
}
