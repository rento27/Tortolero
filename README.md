# tortolero-commander

Servidor MCP local que da a Claude acceso a archivos, busqueda y terminal de tu computadora. Corre por stdio en tu propia maquina: no usa creditos, cuentas ni servicios externos.

## Herramientas

| Herramienta | Que hace |
|---|---|
| `read_file` | Lee un archivo de texto (con `offset` y `length` en lineas) |
| `write_file` | Escribe o agrega a un archivo |
| `edit_block` | Reemplaza texto exacto; falla si las coincidencias no son las esperadas |
| `list_directory` | Lista una carpeta, con profundidad opcional |
| `create_directory` | Crea carpetas |
| `move_file` | Mueve o renombra, sin sobrescribir |
| `get_file_info` | Tamano, fechas y permisos |
| `search_files` | Busca por nombre |
| `search_content` | Busca texto con regex dentro de archivos |
| `start_process` | Ejecuta un comando de shell |
| `read_process_output` | Lee la salida nueva de un proceso |
| `interact_with_process` | Envia entrada a un proceso en ejecucion |
| `force_terminate` | Termina un proceso |
| `list_sessions` | Lista los procesos de la sesion |

## Instalacion

Requiere Node.js 20 o superior.

```bash
git clone https://github.com/rento27/Tortolero.git
cd Tortolero
npm install
npm run build
```

### Claude Desktop

Agrega esto a `~/Library/Application Support/Claude/claude_desktop_config.json` (en macOS), cambiando las rutas por las tuyas, y reinicia Claude Desktop con `Cmd+Q`:

```json
{
  "mcpServers": {
    "tortolero-commander": {
      "command": "node",
      "args": ["/RUTA/A/Tortolero/dist/index.js"],
      "env": {
        "TORTOLERO_ALLOWED_DIRS": "/Users/TU_USUARIO/Documents:/Users/TU_USUARIO/Desktop"
      }
    }
  }
}
```

## Modo remoto (usarlo desde claude.ai o sesiones en la nube)

Abre un tunel gratuito de Cloudflare (Quick Tunnel, sin cuenta ni creditos) hacia un servidor HTTP que escucha solo en `127.0.0.1`.

```bash
brew install cloudflared   # una sola vez
cd ~/Tortolero && npm run remote
```

Imprime una URL como `https://algo.trycloudflare.com/mcp/<token>`. Agregala en Claude como conector personalizado (Configuracion > Conectores > Agregar conector personalizado). Mientras la terminal siga abierta, Claude llega a tu computadora; con `Ctrl+C` se cierra todo.

- La URL **cambia cada vez** que arrancas el tunel. El token (256 bits, guardado en `~/.tortolero/token` con permisos 600) se mantiene.
- `npm run remote -- --rotate` genera un token nuevo e invalida la URL anterior.
- `npm run remote -- --no-tunnel` solo levanta el servidor local, por si usas tu propio tunel.
- **No se inicia solo** al encender la computadora, a proposito.

### Seguridad del modo remoto

- Sin token valido, cualquier peticion recibe `404` (no revela que hay un servidor). El token se compara en tiempo constante y se acepta en la ruta o como `Authorization: Bearer`.
- Quien tenga la URL completa controla archivos **y terminal** de tu computadora. Tratala como una contrasena: no la pegues en chats compartidos ni capturas. Si se filtra, usa `--rotate`.
- Para exponer solo archivos, arranca con `TORTOLERO_DISABLE_PROCESS=1 npm run remote`.
- Las carpetas permitidas siguen aplicando (`TORTOLERO_ALLOWED_DIRS`), pero la terminal no esta limitada por ellas.
- Los Quick Tunnels de Cloudflare no tienen garantia de disponibilidad; para una URL fija hace falta un tunel con nombre (cuenta gratuita de Cloudflare).

## Configuracion (variables de entorno)

| Variable | Efecto |
|---|---|
| `TORTOLERO_ALLOWED_DIRS` | Carpetas accesibles, separadas por `:`. Por defecto, tu carpeta personal |
| `TORTOLERO_DENIED_PATHS` | Rutas extra bloqueadas, separadas por `:` |
| `TORTOLERO_DISABLE_PROCESS` | Con `1`, desactiva las herramientas de terminal |
| `TORTOLERO_PORT` | Puerto local del modo remoto (por defecto 8765) |
| `TORTOLERO_TOKEN` | Token fijo para el modo remoto (minimo 32 caracteres). Si no, se genera uno |

Siempre estan bloqueadas `~/.ssh`, `~/.aws`, `~/.gnupg`, `~/.config/gcloud` y `~/.kube`.

## Seguridad: lo que si y lo que no protege

- Las herramientas de **archivos** solo operan dentro de `TORTOLERO_ALLOWED_DIRS`. Se resuelven enlaces simbolicos y `..` antes de comprobar, y hay pruebas para eso.
- Las herramientas de **terminal no estan restringidas** por esas carpetas: un comando puede leer o borrar cualquier cosa que tu usuario pueda. Si no las necesitas, usa `TORTOLERO_DISABLE_PROCESS=1`.
- Por stdio (Claude Desktop) es solo local: no abre puertos. El modo remoto es opcional y solo existe mientras ejecutes `npm run remote`.

## Limitaciones

- Los procesos corren sin TTY: algunos REPL interactivos (por ejemplo `python` sin `-i`) no muestran prompt.
- `read_file` rechaza binarios y archivos de mas de 2 MB.

## Desarrollo

```bash
npm test
```

Las pruebas arrancan el servidor real y lo usan por MCP.
