# scripts

## diagnostico-bash.sh

Diagnostica por que la herramienta Bash de Claude Code deja de ejecutar comandos en macOS
(el sintoma es que ni siquiera `pwd` devuelve nada).

Ejecutar desde la Terminal de macOS, **no** desde dentro de Claude Code:

```bash
bash scripts/diagnostico-bash.sh
```

Imprime el resultado en pantalla y lo guarda en `~/diagnostico-bash-claude.txt`.
Cada linea que empieza por `PROBLEMA` es una causa candidata; el resumen final las agrupa.

Comprueba, en este orden:

1. Version de macOS y arquitectura.
2. Que `$SHELL` apunte a un binario ejecutable.
3. Que el shell de login arranque sin errores y sin imprimir texto extra
   (Claude Code lanza un shell de login por comando; un `~/.zshrc` roto rompe todos).
4. `PATH` y presencia de los binarios basicos.
5. Version de `claude` y de `node`.
6. Sintaxis del snapshot de shell mas reciente en `~/.claude/shell-snapshots`
   (un snapshot corrupto hace fallar todos los comandos).
6b. Opciones de shell peligrosas dentro del snapshot: `onecmd`, `noexec`, `errexit`.
6c. Reproduccion del arranque real, con el shell invocado de las dos formas posibles
   (`-c` con una cadena, y con un guion en archivo).
7. Hooks y reglas de permisos sobre `Bash` en los `settings.json`
   (un hook `PreToolUse` que falla bloquea todas las llamadas a Bash).
8. Directorio de trabajo: permisos de escritura y si esta en un volumen externo.
9. Que `sandbox-exec` funcione, que es lo que usa el modo auto para ejecutar comandos.

No imprime valores de variables de entorno ni contenido de credenciales: solo nombres de
claves y rutas, para que la salida se pueda compartir sin filtrar secretos.

### Sobre `set -o onecmd`

El snapshot restaura las opciones del shell tal como estaban al generarlo. Si entre ellas
queda `onecmd` (`set -t`), el shell **termina despues de ejecutar un solo comando**. Como el
snapshot ya consume ese comando, todo lo que viene detras se salta en silencio y el shell
sale con codigo 0: sin error, sin salida. Ese es exactamente el sintoma de `pwd` que no
devuelve nada.

Lo mismo con `noexec` (lee los comandos pero no los ejecuta) y `errexit` (corta a la primera
salida distinta de cero).

Se reproduce fuera de Claude Code asi:

```bash
S=~/.claude/shell-snapshots/$(ls -t ~/.claude/shell-snapshots | head -1)
printf 'source %q >/dev/null 2>&1\npwd\n' "$S" > /tmp/prueba.sh
bash /tmp/prueba.sh        # no imprime nada, codigo 0
grep -n 'set -o onecmd' "$S"
```

## Remedios, en orden

1. Borrar los snapshots y reiniciar Claude Code. Se regeneran solos:

   ```bash
   rm -rf ~/.claude/shell-snapshots
   ```

2. Si vuelve a pasar, mirar que archivo de arranque deja esa opcion activada
   (`~/.zshrc`, `~/.zprofile`, `~/.zshenv`) y quitar de ahi el `set -t` / `set -o onecmd`.
3. Si el script no encuentra nada, arrancar en modo depuracion y repetir un comando trivial;
   ahi si aparece el error real de la herramienta:

   ```bash
   claude --debug
   ```
