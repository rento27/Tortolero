# Plan para terminar el video "Cass & René"

Trabajo en la MacBook: `~/Tortolero_boda/` (vista previa web en `web/`, servida en el puerto 8765).

## 1. Estado actual (hecho)

| Parte | Estado |
|---|---|
| Material | 14 archivos de `~/Downloads/BodaR&C` analizados (1 duplicado exacto: `E9590175 2`) |
| Votos de René | 0:00–1:14 de `6E2C3462`: voz separada con Demucs y limpiada (ruido -68 → -96 dB), transcrita y corregida ("Bueno… Casandra"), subtítulos palabra por palabra |
| Música bajo votos | "No tiene sentido (acoustic cover)" – Tony White, sin voz (Demucs), al 22 % |
| Canción principal | "no tiene sentido" – Beéle (BORONDO, 2025), entra en 1:14 |
| Baile multicámara | HD (`E9590175`, 6 variantes de efecto) + WhatsApp + 3 stories, sincronizados por audio y coreografía (16 cortes) |
| Fiesta | 14 tomas de 1 s (novios en hombros, público, risas) |
| Color | "Máscara": corrección RGB por toma hacia la referencia del baile HD + look común + viñeta |
| Letras | Versión opcional en motion graphics: "FRENTE A FRENTE / CUERPO A CUERPO" y coro "NO TIENE SENTIDO" con tiempos por palabra |
| Estética | Apertura y cierre con la tipografía y el dibujo de la invitación |
| Quitado a pedido | Parte "Amigos", invitada de vestido negro, dedicatoria "tu hermano", canción bajo los votos |
| Duración actual | 2:18 (34 tomas) |

## 2. Lo que falta

### A. Votos faltantes (están en el iPhone)
1. Pasar del iPhone a la Mac por AirDrop **el video original** (no grabación de pantalla), a `~/Downloads/BodaR&C/`.
2. Analizar: duración, si es continuación de "te he visto levantarte todos los días" o una parte anterior, calidad de audio.
3. Separar y limpiar la voz (mismo proceso de los votos actuales) y transcribir con Whisper.
4. Revisar el texto con el usuario (nombres y palabras que Whisper confunda).
5. Insertar en el orden en que los dijo; extender la sección de votos y los subtítulos; ajustar la guitarra para que cubra toda la sección.
6. Imagen durante la parte nueva: su propio video si lo hay; si no, tomas de la ceremonia y la foto del abrazo.

### B. Decisiones del usuario
1. Versión final: **con letras**, **sin letras** o **ambas**.
2. Volumen de la guitarra bajo los votos.
3. Texto del cierre (hoy: nombres + fecha + copas, sin dedicatoria).
4. Duración final (se alarga con los votos nuevos).

### C. Revisión en el iPhone
- Opción 1: misma red Wi-Fi + permitir "python" en el firewall de macOS → `http://192.168.100.39:8765` (la IP puede cambiar). Hoy el firewall bloquea la conexión.
- Opción 2: video borrador 540p con marca "BORRADOR" (con y sin letras), pasado por AirDrop. Solo con aprobación del usuario.

### D. Render final (solo con aprobación)
1. Másters intermedios 1080x1920 H.264 de alta calidad de cada tramo usado, desde los originales (el baile de WhatsApp desde la versión escalada `baile_hd.mp4`).
2. Render cuadro a cuadro de la misma página web en Chrome sin ventana (1080x1920, 30 fps): lo que se ve en la vista previa es exactamente lo que sale (color, letras, tarjetas, subtítulos).
3. Mezcla de audio con ffmpeg siguiendo `edl.js`: voz de René, guitarra, canción, fundidos; normalizado a -14 LUFS.
4. Unir video + audio → `render/Cass_y_Rene_final[_letras].mp4`.

### E. Verificación y entrega
- Revisar sincronía voz/subtítulos y baile/canción, cortes, niveles de audio y cuadros clave.
- Entregar: versión máxima calidad + versión ligera para WhatsApp; enviar al iPhone por AirDrop.
- Respaldar los archivos del proyecto (EDL, scripts, voz limpia).
