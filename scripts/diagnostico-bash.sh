#!/bin/bash
# Diagnostico de por que la herramienta Bash de Claude Code no ejecuta nada en macOS.
#
# Uso (en la Terminal de macOS, NO dentro de Claude Code):
#   bash scripts/diagnostico-bash.sh
#
# Escribe el resultado en pantalla y en ~/diagnostico-bash-claude.txt
# No imprime valores de variables de entorno ni contenido de tokens: solo nombres y claves.

set -u

SALIDA="$HOME/diagnostico-bash-claude.txt"
: > "$SALIDA"

log() { printf '%s\n' "$*" | tee -a "$SALIDA"; }
sec() { log ""; log "=== $* ==="; }

log "Diagnostico Bash / Claude Code - $(date '+%Y-%m-%d %H:%M:%S')"

sec "1. Sistema"
log "macOS:        $(sw_vers -productVersion 2>/dev/null || echo desconocido)"
log "Arquitectura: $(uname -m)"
log "Usuario:      $(id -un)"

sec "2. Shell de login"
log "SHELL=${SHELL:-<vacio>}"
if [ -n "${SHELL:-}" ] && [ -x "${SHELL:-}" ]; then
  log "El binario de SHELL existe y es ejecutable."
else
  log "PROBLEMA: SHELL no apunta a un binario ejecutable. Claude Code lanza los comandos con este shell."
fi

# Claude Code arranca un shell de login para cada comando. Si un archivo de arranque
# cuelga o falla, todos los comandos fallan aunque el comando en si sea trivial.
sec "3. Arranque del shell (login)"
INICIO=$(date +%s)
if SALIDA_LOGIN=$("${SHELL:-/bin/zsh}" -l -c 'echo __OK__' 2>&1); then
  FIN=$(date +%s)
  log "Duracion: $((FIN - INICIO))s"
  if printf '%s' "$SALIDA_LOGIN" | grep -q '__OK__'; then
    log "El shell de login responde correctamente."
  else
    log "PROBLEMA: el shell de login no devolvio la marca esperada."
  fi
  RUIDO=$(printf '%s' "$SALIDA_LOGIN" | grep -v '__OK__' || true)
  if [ -n "$RUIDO" ]; then
    log "AVISO: los archivos de arranque imprimen texto extra (puede romper el parseo de salida):"
    printf '%s\n' "$RUIDO" | sed 's/^/    /' | tee -a "$SALIDA"
  fi
else
  log "PROBLEMA: el shell de login sale con error. Revisa ~/.zshrc, ~/.zprofile, ~/.zshenv."
  printf '%s\n' "$SALIDA_LOGIN" | sed 's/^/    /' | tee -a "$SALIDA"
fi

for f in "$HOME/.zshenv" "$HOME/.zprofile" "$HOME/.zshrc" "$HOME/.bash_profile" "$HOME/.bashrc"; do
  [ -f "$f" ] && log "existe: $f ($(wc -l < "$f" | tr -d ' ') lineas)"
done

sec "4. PATH"
log "Entradas de PATH:"
printf '%s\n' "${PATH:-}" | tr ':' '\n' | sed 's/^/    /' | tee -a "$SALIDA"
for b in /bin/pwd /usr/bin/env "${SHELL:-/bin/zsh}"; do
  [ -x "$b" ] || log "PROBLEMA: falta o no es ejecutable $b"
done

sec "5. Instalacion de Claude Code"
log "claude: $(command -v claude 2>/dev/null || echo '<no esta en PATH>')"
log "version: $(claude --version 2>&1 | head -1)"
log "node: $(command -v node 2>/dev/null || echo '<no esta en PATH>') $(node --version 2>&1 | head -1)"

sec "6. Snapshots de shell"
# Claude Code genera un snapshot del shell y lo carga antes de cada comando.
# Un snapshot corrupto hace fallar todos los comandos, incluido 'pwd'.
DIR_SNAP="$HOME/.claude/shell-snapshots"
if [ -d "$DIR_SNAP" ]; then
  N=$(ls -1 "$DIR_SNAP" 2>/dev/null | wc -l | tr -d ' ')
  log "$DIR_SNAP: $N archivos"
  ULTIMO=$(ls -t "$DIR_SNAP" 2>/dev/null | head -1)
  if [ -n "$ULTIMO" ]; then
    log "mas reciente: $ULTIMO"
    if bash -n "$DIR_SNAP/$ULTIMO" 2>/dev/null; then
      log "El snapshot mas reciente tiene sintaxis valida."
    else
      log "PROBLEMA: el snapshot mas reciente tiene sintaxis invalida. Borra la carpeta y reinicia Claude Code:"
      log "    rm -rf ~/.claude/shell-snapshots"
    fi
  fi
else
  log "No hay carpeta de snapshots."
fi

sec "7. Hooks y permisos en settings"
# Un hook PreToolUse que falla o devuelve codigo 2 bloquea TODAS las llamadas a Bash.
for s in "$HOME/.claude/settings.json" "$HOME/.claude/settings.local.json" ".claude/settings.json" ".claude/settings.local.json"; do
  [ -f "$s" ] || continue
  log "--- $s"
  python3 - "$s" <<'PY' 2>&1 | tee -a "$SALIDA"
import json, sys
ruta = sys.argv[1]
try:
    with open(ruta) as fh:
        datos = json.load(fh)
except Exception as err:
    print(f"    PROBLEMA: JSON invalido ({err}). Claude Code puede fallar al arrancar.")
    sys.exit()
hooks = datos.get("hooks") or {}
if hooks:
    for evento, entradas in hooks.items():
        print(f"    hook {evento}:")
        for entrada in entradas:
            for h in entrada.get("hooks", []):
                print(f"        {h.get('type')}: {h.get('command')}")
else:
    print("    sin hooks")
permisos = datos.get("permissions") or {}
for clave in ("deny", "ask", "allow"):
    reglas = permisos.get(clave) or []
    bash = [r for r in reglas if str(r).startswith("Bash")]
    if bash:
        print(f"    permissions.{clave} (Bash): {bash}")
entorno = datos.get("env") or {}
if entorno:
    print(f"    env definidas (solo nombres): {sorted(entorno)}")
PY
done

sec "8. Directorio de trabajo"
log "PWD: $(pwd)"
CASO=$(df "$(pwd)" 2>/dev/null | tail -1)
log "volumen: $CASO"
case "$(pwd)" in
  /Volumes/*)
    log "AVISO: estas en un volumen externo. macOS puede bloquear el acceso hasta que"
    log "       le des permiso a la app en Ajustes > Privacidad y seguridad > Archivos y carpetas,"
    log "       y el modo sandbox de Claude Code suele fallar sobre volumenes externos."
    ;;
esac
if [ -w "$(pwd)" ]; then log "El directorio actual tiene permiso de escritura."; else log "PROBLEMA: no hay permiso de escritura en el directorio actual."; fi
TMP_PRUEBA=$(mktemp 2>&1) && rm -f "$TMP_PRUEBA" && log "mktemp funciona." || log "PROBLEMA: mktemp falla: $TMP_PRUEBA"

sec "9. Sandbox (modo auto)"
# En modo auto Claude Code ejecuta los comandos dentro de sandbox-exec.
# Si el sandbox no arranca, ningun comando corre, ni siquiera 'pwd'.
if command -v sandbox-exec >/dev/null 2>&1; then
  if sandbox-exec -p '(version 1)(allow default)' /bin/pwd >/dev/null 2>&1; then
    log "sandbox-exec ejecuta comandos correctamente."
  else
    log "PROBLEMA: sandbox-exec no puede ejecutar ni /bin/pwd."
    log "       Prueba dentro de Claude Code: shift+tab hasta salir de 'auto mode' y repite un comando."
  fi
else
  log "sandbox-exec no esta disponible."
fi

sec "Resumen"
if grep -q '^PROBLEMA' "$SALIDA"; then
  log "Se encontraron problemas:"
  grep -n '^PROBLEMA' "$SALIDA" | sed 's/^/    /'
else
  log "Ninguna comprobacion fallo. Si Bash sigue sin correr dentro de Claude Code,"
  log "el fallo esta en el proceso de Claude Code y no en el shell del sistema."
fi

log ""
log "Resultado guardado en: $SALIDA"
