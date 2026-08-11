# PENDIENTES — RESCOLDO

Lista priorizada de lo que falta. Regla de gobernanza: cuando un pendiente se decide o se
completa, se mueve a `DECISIONES.md` (si es decisión) o se marca hecho, y se retira de aquí.

> Origen: `RESCOLDO_diagnostico_integral_2026-08-11.md`, secciones C y D.

---

## Nivel 0 — Bloquea todo lo demás

- **C1 · Una sola fuente maestra.** Fusionar `RESCOLDO_BIBLIA_STORYTELLING_COMPLETA` dentro de `07_CANON_OPERACION_Y_WEB/rea/content/` como storytelling oficial; degradar `03_storytelling_show.md` a documento histórico. Un solo canon.
- **C2 · El menú.** 8 huecos `[PLATO POR DEFINIR]` en el storytelling maestro. Bloqueo externo (depende de Nico). Sin menú no hay cue-by-cue real, ni tiempos, ni costo, ni prueba integrada.
- **C3 · Las 7 contradicciones.** Ya escritas como propuestas en `DECISIONES.md` (DEC-D1, D2, D3, D4, D7, D10, H2.5). Falta ratificación de René.
- **D6 · Reparar `rescoldo.json`.** Los 9 capítulos correctos (Prólogo · Fuego · Ceniza · Maíz · Raíces · Sal · Mar · Brasa · Rescoldo) y estados reales. Hoy la web interna muestra capítulos inexistentes.

## Nivel 1 — Producto que no existe

- **C4 · Web de reservas.** 0 líneas de código. Sólo `07_operacion_reservaciones.md` ("Planeado"). Construir sitio público + reserva de 5 pasos.
- **C5 · Portal digital del Umbral (Portal del Portador).** 0% construido. Página estática con lógica de fecha (T-72h → T+12h). Toda la copy ya escrita. Prioridad alta, esfuerzo bajo.
- **C6 · Captura de datos de comensal.** Nombre, teléfono, correo, domicilio de entrega, alergias, accesibilidad, con/sin alcohol, asiento, número de Fragmento.

## Nivel 2 — Producción física

- **C7 · Diseño industrial de la caja (El Envío) y del Fragmento.** Medidas, peso, material, apertura, costo unitario, logística de entrega a domicilio.
- **C8 · Mesa circular de 14 receptáculos.** Corazón del Prólogo, sin documentación. Mayor riesgo técnico del show. Prototipar antes que cualquier contenido de mapping.
- **C9 · El Pulso.** Diseño técnico pendiente.
- **C10 · 14 Cajas de Ignición** + protocolo de ignición sincronizada (seguridad y seguro).

## Nivel 3 — Técnico escénico

- **C11 · Biblia visual de MadMapper con contenido real.** El documento actual (633 bytes, 5 capas) es un índice, no una biblia. Organizar por las 4 superficies (S1–S4) y la tabla de intensidad (diagnóstico I2–I3).
- **C12 · Mapeo de superficies** de la palapa y la mesa larga.
- **C13 · Plan de contingencia sin proyección.** El canon lo exige; no existe.
- **C14 · Producción de René Digital y de TZÓME.** Los guiones están; las piezas no.

## Nivel 4 — Marca

- **C15 · Arquitectura de marca completa** con nombre de sede (depende del escenario, ver decisiones de René).
- **C16 · Rediseño/producción final del logo.** Rutas A (logotipo mineral) + B (sello) del diagnóstico. Lockups, isotipo, versión mono, outlines. Entregar como `RESCOLDO_IDENTIDAD_V2`.
- **C17 · Aplicaciones reales:** menú, invitación, portal, señalética, uniforme del Guardián, empaque del Fragmento.

---

## Intervenciones de storytelling (diagnóstico H3)

Cinco de seis son de bajo esfuerzo:

1. Llenar los 8 `[PLATO POR DEFINIR]` con Nico — **alto, externo** (= C2).
2. Añadir 2 picos de participación colectiva (Maíz/Raíces ~20:15 y Sal ~20:35) — medio.
3. Una frase que justifique René Digital vs. René humano en el cierre — bajo.
4. Protocolo del Fragmento olvidado / silla vacía (hostess con 2 de reserva) — bajo.
5. Reaparición del Corazón Territorial en Rescoldo — bajo.
6. Integrar El Pulso en el relato (TZÓME o el Guardián lo menciona) — bajo.

---

## Decisiones que dependen de René (no avanzan con horas, sólo con decisión)

1. 14 fijo o capacidad variable (→ DEC-D1).
2. TZÓME en vivo o pregrabado (→ DEC-D2).
3. Quién firma la obra públicamente (→ DEC-D4).
4. Escenario de sede: huésped en La Sal / piso propio / sede nueva (→ nombre PAROTA).
5. Publicar TZÓME como proyecto musical antes del estreno (→ D11).

---

## URGENTE — fuera del plan, atender ya

- **TZOMÉ | COLIMOTL en YouTube.** Los paquetes de publicación (`13_PUBLICACION_TZOME`) fusionan el personaje de ficción con Colimotl, figura histórica/cultural real — exactamente lo que el canon prohíbe. Único riesgo reputacional/marcario real. **No publicar** hasta renombrar la música o ajustar el canon. (Diagnóstico D11)
- **Rotar `SKYWORK_API_KEY`.** Está en `.env.local` dentro del respaldo del SSD (aunque `.gitignore` la excluya del repo). Rotarla. (Diagnóstico E2)

---

## Limpieza de archivo (bajo, ~1.5 GB de duplicados)

- HTML de WhatsApp de 207 MB duplicados e inservibles.
- `.key` de 66 MB duplicados; `.mp4` de 230,536,861 bytes con dos nombres.
- `13_PUBLICACION_TZOME` con dos carpetas idénticas.
- `node_modules` completo dentro de `rescoldo-remotion-clean`.
- 27 pistas musicales sin máster designado — sí es problema real cuando llegue el diseño sonoro.
