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
3b. `compinit`: cuantas veces se llama y si se llama sin `-u`/`-C`; arranque de un shell
   interactivo con limite de tiempo, y `compaudit` para listar los directorios inseguros.
   Ademas avisa si los archivos de arranque tienen credenciales en texto plano
   (solo cuenta cuantas y con que permisos, nunca imprime el valor).
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
3. Reinstalar Claude Code **no** arregla ninguna de estas causas: el instalador reemplaza el
   binario, pero no toca `~/.zshrc` ni el contenido de `~/.claude/`. Solo sirve si el binario
   en si esta danado, y aun asi hay que borrar los snapshots a mano.
4. Si el script no encuentra nada, arrancar en modo depuracion y repetir un comando trivial;
   ahi si aparece el error real de la herramienta:

   ```bash
   claude --debug
   ```

### Sobre `compinit`

`compinit` revisa los directorios de funciones de completado y, si alguno tiene permisos de
escritura para grupo u otros, pregunta:

```
Ignore insecure directories and continue [y] or abort [n]?
```

En un shell sin terminal —como el que Claude Code lanza para cada comando— esa pregunta no
se puede contestar: el shell se queda esperando o muere sin escribir nada. El sintoma es el
mismo que el de `onecmd`, salida vacia, pero la causa y el arreglo son otros.

Arreglo, cualquiera de los dos:

```bash
compaudit | xargs chmod go-w   # corrige los permisos de raiz
```

o dejar una sola llamada en `.zshrc` y cambiarla por `compinit -u`, que se salta la revision.
Llamar a `compinit` mas de una vez en el mismo archivo multiplica la probabilidad de toparse
con la pregunta.
