# clip01 - Analisis

Archivo fuente: `media/raw/clip01.mp4` (no se sube al repo).

## Datos tecnicos
- Duracion: 29.64 s, 887 cuadros, ~29.9 fps variable (VFR)
- Codificado 1024x576 H.264 con rotacion -90 -> se ve **vertical 576x1024 (9:16)**
- Bitrate video ~1.6 Mbps: resolucion y calidad bajas (parece exportado/comprimido, p. ej. desde WhatsApp)
- Audio AAC estereo 44.1 kHz, -11.9 LUFS integrados, pico -0.1 dBTP (muy alto, casi satura)

## Contenido
Primer baile / baile de novios en una boda, de noche, carpa con guirnaldas de focos.
Novia con vestido blanco de espalda descubierta; novio con traje beige claro.
Invitados alrededor de la pista grabando con el celular. Camara en mano, toma de invitado.

No hay voz: el audio es solo musica (whisper no detecta habla).

## Linea de tiempo
| Tiempo | Que pasa |
|---|---|
| 0.0 - 2.0 | Novia girando sola, el novio se acerca. Audio mas bajo (intro) |
| 2.0 - 9.0 | Bailan tomados de la mano, vueltas; novia sonriendo |
| 9.0 - 12.2 | Novio da vuelta a la novia; giro rapido, movimiento de camara |
| **12.19** | Corte / salto de camara (cambio de encuadre, mas de frente) |
| 12.2 - 19.0 | Bailan de frente a camara, publico al fondo; espalda del vestido a 15-16 s |
| 19.0 - 21.0 | Se toman de las manos de frente |
| 21.0 - 25.0 | **Momento fuerte:** bajan juntos hasta abajo (sentadillas, ~23-25 s) |
| 24.83 | Corte detectado |
| 25.0 - 27.0 | Se levantan |
| 26.63 / 28.15 | Cortes detectados (movimiento brusco de camara) |
| 27.0 - 29.6 | Novio vuelve a girar a la novia, final |

## Musica
- Tempo ~123 BPM (un beat cada ~0.49 s), estable todo el clip
- Beats (s): 0.07 0.56 1.04 1.53 2.04 2.55 3.04 3.51 3.99 4.48 4.97 5.46 5.94 6.48 6.97 7.43 7.94 8.43 8.92 9.40 9.89 10.38 10.87 11.38 11.87 12.35 12.84 13.33 13.84 14.33 14.81 15.30 15.81 16.30 16.76 17.28 17.76 18.25 18.74 19.25 19.74 20.22 20.71 21.20 21.71 22.20 22.69 23.17 23.66 24.15 24.66 25.15 25.63 26.12 26.61 27.12 27.59 28.10 28.58 29.07
- Energia: intro mas suave 0-3 s (-22 dB), luego estable alta (-12 a -15 dB)

## Notas para la edicion
- Ya es vertical: sirve directo para Reels/TikTok/Shorts sin recortar
- Calidad baja: evitar zoom fuerte; se puede mejorar un poco con nitidez/denoise y color
- Bajar el audio ~2-3 dB o normalizar a -14 LUFS para redes
- Mejores momentos: giros 9-12 s, de frente 13-16 s, la bajada 22-25 s
- Cortes a ritmo: usar los tiempos de beat de arriba
