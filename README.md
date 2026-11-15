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

## Configuracion (variables de entorno)

| Variable | Efecto |
|---|---|
| `TORTOLERO_ALLOWED_DIRS` | Carpetas accesibles, separadas por `:`. Por defecto, tu carpeta personal |
| `TORTOLERO_DENIED_PATHS` | Rutas extra bloqueadas, separadas por `:` |
| `TORTOLERO_DISABLE_PROCESS` | Con `1`, desactiva las herramientas de terminal |

Siempre estan bloqueadas `~/.ssh`, `~/.aws`, `~/.gnupg`, `~/.config/gcloud` y `~/.kube`.

## Seguridad: lo que si y lo que no protege

- Las herramientas de **archivos** solo operan dentro de `TORTOLERO_ALLOWED_DIRS`. Se resuelven enlaces simbolicos y `..` antes de comprobar, y hay pruebas para eso.
- Las herramientas de **terminal no estan restringidas** por esas carpetas: un comando puede leer o borrar cualquier cosa que tu usuario pueda. Si no las necesitas, usa `TORTOLERO_DISABLE_PROCESS=1`.
- Este servidor es solo local por stdio. No abre puertos ni acepta conexiones de red.

## Limitaciones

- Los procesos corren sin TTY: algunos REPL interactivos (por ejemplo `python` sin `-i`) no muestran prompt.
- `read_file` rechaza binarios y archivos de mas de 2 MB.

## Desarrollo

```bash
npm test
```

Las pruebas arrancan el servidor real y lo usan por MCP.
