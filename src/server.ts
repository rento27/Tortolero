import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";
import * as files from "./files.js";
import { loadPolicy, resolveSafe, type PathPolicy } from "./paths.js";
import * as procs from "./processes.js";

const text = (value: string) => ({ content: [{ type: "text" as const, text: value }] });
const json = (value: unknown) => text(JSON.stringify(value, null, 2));

function guarded<A>(fn: (args: A) => Promise<ReturnType<typeof text>>) {
  return async (args: A) => {
    try {
      return await fn(args);
    } catch (err) {
      return {
        isError: true,
        content: [{ type: "text" as const, text: err instanceof Error ? err.message : String(err) }],
      };
    }
  };
}

export function createServer(policy: PathPolicy = loadPolicy(), env: NodeJS.ProcessEnv = process.env) {
  const server = new McpServer({ name: "tortolero-commander", version: "0.1.0" });
  const safe = (p: string) => resolveSafe(p, policy);

  server.registerTool(
    "read_file",
    {
      description: "Lee un archivo de texto. offset y length son en lineas.",
      inputSchema: {
        path: z.string(),
        offset: z.number().int().min(0).optional(),
        length: z.number().int().min(1).optional(),
      },
    },
    guarded(async ({ path: p, offset, length }) => text(await files.readText(await safe(p), offset ?? 0, length))),
  );

  server.registerTool(
    "write_file",
    {
      description: "Escribe un archivo (sobrescribe, o agrega al final con mode=append). Crea carpetas si faltan.",
      inputSchema: {
        path: z.string(),
        content: z.string(),
        mode: z.enum(["rewrite", "append"]).optional(),
      },
    },
    guarded(async ({ path: p, content, mode }) => {
      const target = await safe(p);
      await files.writeText(target, content, mode === "append");
      return text(`Escrito: ${target} (${content.length} caracteres)`);
    }),
  );

  server.registerTool(
    "edit_block",
    {
      description: "Reemplaza texto exacto en un archivo. Falla si el numero de coincidencias no es el esperado.",
      inputSchema: {
        path: z.string(),
        old_string: z.string(),
        new_string: z.string(),
        expected_replacements: z.number().int().min(1).optional(),
      },
    },
    guarded(async ({ path: p, old_string, new_string, expected_replacements }) => {
      const n = await files.editText(await safe(p), old_string, new_string, expected_replacements ?? 1);
      return text(`${n} reemplazo(s) aplicado(s).`);
    }),
  );

  server.registerTool(
    "list_directory",
    {
      description: "Lista el contenido de una carpeta. depth controla la profundidad (por defecto 1).",
      inputSchema: { path: z.string(), depth: z.number().int().min(1).max(5).optional() },
    },
    guarded(async ({ path: p, depth }) => text((await files.listDir(await safe(p), depth ?? 1)).join("\n") || "(vacia)")),
  );

  server.registerTool(
    "create_directory",
    { description: "Crea una carpeta (y las intermedias).", inputSchema: { path: z.string() } },
    guarded(async ({ path: p }) => {
      const target = await safe(p);
      await fs.mkdir(target, { recursive: true });
      return text(`Carpeta creada: ${target}`);
    }),
  );

  server.registerTool(
    "move_file",
    {
      description: "Mueve o renombra un archivo o carpeta. No sobrescribe destinos existentes.",
      inputSchema: { source: z.string(), destination: z.string() },
    },
    guarded(async ({ source, destination }) => {
      const from = await safe(source);
      const to = await safe(destination);
      try {
        await fs.access(to);
        throw new Error(`El destino ya existe: ${to}`);
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
      }
      await fs.mkdir(path.dirname(to), { recursive: true });
      await fs.rename(from, to);
      return text(`Movido: ${from} -> ${to}`);
    }),
  );

  server.registerTool(
    "get_file_info",
    { description: "Metadatos de un archivo o carpeta.", inputSchema: { path: z.string() } },
    guarded(async ({ path: p }) => json(await files.fileInfo(await safe(p)))),
  );

  server.registerTool(
    "search_files",
    {
      description: "Busca archivos o carpetas por nombre (coincidencia parcial, sin distinguir mayusculas).",
      inputSchema: { path: z.string(), pattern: z.string().min(1), max_results: z.number().int().min(1).max(500).optional() },
    },
    guarded(async ({ path: p, pattern, max_results }) => {
      const found = await files.searchNames(await safe(p), pattern, max_results ?? 100);
      return text(found.join("\n") || "Sin resultados.");
    }),
  );

  server.registerTool(
    "search_content",
    {
      description: "Busca texto dentro de archivos con una expresion regular. Omite binarios, node_modules y .git.",
      inputSchema: { path: z.string(), regex: z.string().min(1), max_results: z.number().int().min(1).max(500).optional() },
    },
    guarded(async ({ path: p, regex, max_results }) => {
      let re: RegExp;
      try {
        re = new RegExp(regex);
      } catch {
        throw new Error(`Expresion regular invalida: ${regex}`);
      }
      const found = await files.searchContent(await safe(p), re, max_results ?? 100);
      return text(found.join("\n") || "Sin resultados.");
    }),
  );

  if (env.TORTOLERO_DISABLE_PROCESS !== "1") {
    server.registerTool(
      "start_process",
      {
        description:
          "Ejecuta un comando de shell. Devuelve el pid y la salida inicial. Si sigue corriendo, usa read_process_output o interact_with_process. ATENCION: el comando no esta restringido a los directorios permitidos.",
        inputSchema: { command: z.string().min(1), cwd: z.string().optional(), timeout_ms: z.number().int().min(100).max(120000).optional() },
      },
      guarded(async ({ command, cwd, timeout_ms }) => {
        const dir = cwd ? await safe(cwd) : policy.allowed[0] ?? process.cwd();
        return json(await procs.run(command, dir, timeout_ms ?? 5000));
      }),
    );

    server.registerTool(
      "read_process_output",
      {
        description: "Lee la salida nueva de un proceso en ejecucion.",
        inputSchema: { pid: z.number().int(), timeout_ms: z.number().int().min(100).max(120000).optional() },
      },
      guarded(async ({ pid, timeout_ms }) => text((await procs.readOutput(pid, timeout_ms ?? 5000)) || "(sin salida nueva)")),
    );

    server.registerTool(
      "interact_with_process",
      {
        description: "Envia texto a la entrada estandar de un proceso y devuelve su respuesta. Sin TTY: algunos REPL no muestran prompt.",
        inputSchema: { pid: z.number().int(), input: z.string(), timeout_ms: z.number().int().min(100).max(120000).optional() },
      },
      guarded(async ({ pid, input, timeout_ms }) => text((await procs.sendInput(pid, input, timeout_ms ?? 5000)) || "(sin salida)")),
    );

    server.registerTool(
      "force_terminate",
      { description: "Termina un proceso iniciado con start_process.", inputSchema: { pid: z.number().int() } },
      guarded(async ({ pid }) => text(procs.terminate(pid))),
    );

    server.registerTool(
      "list_sessions",
      { description: "Lista los procesos iniciados en esta sesion.", inputSchema: {} },
      guarded(async () => json(procs.listSessions())),
    );
  }

  return server;
}
