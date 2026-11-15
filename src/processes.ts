import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";

const MAX_BUFFER_CHARS = 200_000;

interface Session {
  pid: number;
  command: string;
  child: ChildProcessWithoutNullStreams;
  pending: string;
  exitCode: number | null;
  signal: string | null;
  startedAt: number;
}

const sessions = new Map<number, Session>();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function append(session: Session, chunk: Buffer): void {
  session.pending += chunk.toString("utf8");
  if (session.pending.length > MAX_BUFFER_CHARS) {
    session.pending = "[...salida recortada...]\n" + session.pending.slice(-MAX_BUFFER_CHARS);
  }
}

function drain(session: Session): string {
  const out = session.pending;
  session.pending = "";
  const status =
    session.exitCode !== null || session.signal !== null
      ? `\n[proceso terminado: codigo=${session.exitCode ?? "n/a"} senal=${session.signal ?? "n/a"}]`
      : "";
  return out + status;
}

/** Espera salida nueva o el fin del proceso, hasta timeoutMs. */
async function waitForOutput(session: Session, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (session.pending.length > 0 || session.exitCode !== null || session.signal !== null) {
      await sleep(100); // deja llegar el resto de la salida inmediata
      return;
    }
    await sleep(50);
  }
}

export function startProcess(command: string, cwd: string): Session {
  const child = spawn(command, { cwd, shell: true, env: process.env });
  const pid = child.pid;
  if (pid === undefined) throw new Error(`No se pudo iniciar: ${command}`);
  const session: Session = {
    pid,
    command,
    child,
    pending: "",
    exitCode: null,
    signal: null,
    startedAt: Date.now(),
  };
  child.stdout.on("data", (d: Buffer) => append(session, d));
  child.stderr.on("data", (d: Buffer) => append(session, d));
  child.on("close", (code, signal) => {
    session.exitCode = code;
    session.signal = signal;
  });
  child.on("error", (err) => append(session, Buffer.from(`error: ${err.message}\n`)));
  sessions.set(pid, session);
  return session;
}

function get(pid: number): Session {
  const s = sessions.get(pid);
  if (!s) throw new Error(`No hay sesion con pid ${pid}. Usa list_sessions.`);
  return s;
}

export async function run(command: string, cwd: string, timeoutMs: number) {
  const session = startProcess(command, cwd);
  await waitForOutput(session, timeoutMs);
  return { pid: session.pid, output: drain(session) };
}

export async function readOutput(pid: number, timeoutMs: number) {
  const session = get(pid);
  await waitForOutput(session, timeoutMs);
  return drain(session);
}

export async function sendInput(pid: number, input: string, timeoutMs: number) {
  const session = get(pid);
  if (session.exitCode !== null || session.signal !== null) {
    throw new Error(`El proceso ${pid} ya termino.`);
  }
  session.child.stdin.write(input.endsWith("\n") ? input : input + "\n");
  await waitForOutput(session, timeoutMs);
  return drain(session);
}

export function terminate(pid: number): string {
  const session = get(pid);
  session.child.kill("SIGTERM");
  setTimeout(() => {
    if (session.exitCode === null && session.signal === null) session.child.kill("SIGKILL");
  }, 3000).unref();
  return `Senal SIGTERM enviada al pid ${pid}.`;
}

export function listSessions() {
  return [...sessions.values()].map((s) => ({
    pid: s.pid,
    command: s.command,
    running: s.exitCode === null && s.signal === null,
    runtime_seconds: Math.round((Date.now() - s.startedAt) / 1000),
  }));
}

export function killAll(): void {
  for (const s of sessions.values()) {
    if (s.exitCode === null && s.signal === null) s.child.kill("SIGKILL");
  }
}
