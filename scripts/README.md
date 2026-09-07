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
7. Hooks y reglas de permisos sobre `Bash` en los `settings.json`
   (un hook `PreToolUse` que falla bloquea todas las llamadas a Bash).
8. Directorio de trabajo: permisos de escritura y si esta en un volumen externo.
9. Que `sandbox-exec` funcione, que es lo que usa el modo auto para ejecutar comandos.

No imprime valores de variables de entorno ni contenido de credenciales: solo nombres de
claves y rutas, para que la salida se pueda compartir sin filtrar secretos.
