# Boda Cass & René - analisis y plan de edicion

Video regalo para el hermano (René) por su boda con Cass.
El trabajo corre en la MacBook (`~/Tortolero_boda/`), donde estan los originales:
`~/Downloads/IMG_4099.MOV`, `IMG_4100.MOV`, `IMG_4101.MOV` y el clip del baile
`690cc615-...MP4` (= `media/raw/clip01.mp4` en este repo).

## Material
| Archivo | Duracion | Formato | Contenido |
|---|---|---|---|
| clip01 / 690cc615 | 29.6 s | 576x1024 H.264 (WhatsApp) | Primer baile de los novios |
| IMG_4099.MOV | 14.4 s | 1080x1920 HEVC | Fiesta, novia de blanco entre invitados |
| IMG_4100.MOV | 3:03 | 1080x1920 HEVC | Fiesta: novios en hombros, publico cantando |
| IMG_4101.MOV | 1:31 | 1080x1920 HEVC | Fiesta; invitada (vestido negro) riendo a camara |
| 83C3052F...JPG | foto | 1320x2347 | Abrazo de los novios en la ceremonia civil |
| beb461fb...JPG | foto | 850x1206 | Invitacion |

Ningun video tiene voz/discurso: solo musica de la fiesta (whisper solo alucina texto).

## Musica (Shazam)
- **Baile de los novios: "no tiene sentido" - Beéle** (album BORONDO, 2025).
  El clip empieza en el **segundo 35.2** de la cancion oficial (correlacion mel, z=7).
- IMG_4099 / inicio de IMG_4100: "La Player (Bandolera)" - Zion & Lennox
- IMG_4100 ~0:30: "Ella" - Tomas Dobarro; 1:00-3:00: "Tití Me Preguntó" - Bad Bunny
- Tempo del baile ~123 BPM.

## Analisis cuadro a cuadro (4 fps, resolucion completa)
Herramientas: YuNet (deteccion de caras pequenas) + MediaPipe FaceLandmarker
(blendshapes: sonrisa, boca abierta, ojos, cejas), diferencia de cuadros (movimiento),
varianza laplaciana (nitidez).

- Baile: sonrisas sostenidas todo el clip; **risas** en 10, 13, 15, 25 y 27 s;
  novio carcajada clara en 2.5 s; bajada juntos al piso 21-25 s.
- IMG_4100: novios cargados en hombros 8-20 s, risas del publico 17-18 s,
  publico cantando 23-46 s y 84-90 s, caras cercanas sonriendo 151-159 s.
- IMG_4101: invitada riendo a camara 0-1 s y 9.5-11.5 s; cierre 86-90 s.
- IMG_4099: novia cerca de camara ~4 s.
- Fiesta muy oscura (brillo medio 13-40/255): requiere levantar gamma.

## Calidad
El baile (576x1024) se escala a 1080x1920: limpieza de ruido + Lanczos + nitidez,
mezclado 65/35 con Real-ESRGAN (realesr-animevideov3 x2) para quitar bloques de
compresion sin dejar caras "de plastico". Extraido a 30 fps constantes para no
desincronizar (la fuente es VFR).

## Estetica (de la invitacion)
Fondo papel blanco, tinta negra; serif de alto contraste para nombres (Italiana),
trazo "and" recortado de la invitacion original, Montserrat Light para datos,
linea vertical fina, dibujo de copas recortado de la invitacion, fecha 07 • 11 • 2026.

## Estructura del video (1080x1920, 30 fps, ~60 s)
| t | Segmento |
|---|---|
| 0-5.5 | Apertura estilo invitacion (nombres, direccion, fecha aparecen en secuencia) |
| 5-10.5 | Foto del abrazo con acercamiento lento, rotulo "CASS & RENÉ" |
| 10-39.6 | Primer baile en HD con audio oficial sincronizado; rotulo "Primer baile · no tiene sentido — Beéle" |
| 39.1-54.1 | Fiesta: novios en hombros (4100 8-14 s, acercamiento), novia (4099 3-6.5), invitada riendo (4101 9.5-12), publico (4100 15-18) |
| 53.6-60.1 | Cierre: nombres, fecha, dedicatoria, copas; fundido a blanco |

Audio: cancion oficial desde 25.2 s, fade in/out, loudnorm -14 LUFS.
Dedicatoria provisional: "Que nunca deje de tener sentido. / Con amor, tu hermano".
