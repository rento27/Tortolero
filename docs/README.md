# Documentación RESCOLDO — canon vigente

Este repo es el **espejo versionado (Git) de la capa de autoridad de RESCOLDO**.
La casa física completa del proyecto vive en el SSD JOCHIS_SSD, en
**`RESCOLDO_MAESTRO_EL_FINAL`** (303,002 registros auditados: canon, decisiones, guiones,
música, video, mapping, código, investigación, snapshots). Aquí se conserva, en texto y
versionado, lo que **manda**: el canon narrativo congelado y las decisiones.

## Regla de autoridad (orden que manda)

1. `canon/ACTA_CONGELAMIENTO_CANON_NARRATIVO_2026-09-07.md` — canon narrativo **congelado** por René el 7-sep-2026.
2. `RESCOLDO_LO_QUE_QUEDO_CANON_2026-09-07.html` — el archivo que manda (vive en el SSD; SHA-256 `553f5e04…`).
3. `canon/00_LEER_PRIMERO_CANON_NARRATIVO.md`
4. `canon/CANON_ESTADO_ACTUAL.md` y `canon/DECISIONES_RENE_REGISTRO.md` (decisiones del 5-sep, G01–G22), subordinados al congelamiento del 7-sep si hay contradicción.

Cuando un documento anterior contradice el congelamiento del 7-sep, **prevalece el congelamiento**.

## Candados del canon (no se tocan sin reapertura y ratificación de René)

RESCOLDO pertenece a **UMBRAL** · **RT Studio Lab queda fuera** de la arquitectura de marca
gastronómica · **TZOMÉ** agudo, no es Colímotl · **Portadores** durante la experiencia,
"Hijos del Volcán" solo como revelación ficcional · **piedra queda, tlalchichi se entrega** ·
**Ceniza = epílogo**, sin plato · **Plafón = 0** · **Raíces** conserva nombre y contenido ·
frase final "El fuego no se apagó. Solo cambió de lugar." → **NEGRO** y permiso de conversación ·
La Cerradura / La Migración del Calor / La Cuenta del Hierro = **NO CANON**.

## Índice

| Documento | Qué es |
|---|---|
| [`canon/MAPA_RESCOLDO_MAESTRO.md`](./canon/MAPA_RESCOLDO_MAESTRO.md) | Mapa de la casa física en el SSD (los cajones 00–99) y la regla de autoridad. |
| [`canon/00_PRECEDENCIA_Y_ESTADO_ACTUAL.md`](./canon/00_PRECEDENCIA_Y_ESTADO_ACTUAL.md) | Precedencia documental y estado actual (consolidación 1-oct). |
| [`canon/ACTA_CONGELAMIENTO_CANON_NARRATIVO_2026-09-07.md`](./canon/ACTA_CONGELAMIENTO_CANON_NARRATIVO_2026-09-07.md) | Acta de congelamiento del canon narrativo (autoridad #1). |
| [`canon/00_LEER_PRIMERO_CANON_NARRATIVO.md`](./canon/00_LEER_PRIMERO_CANON_NARRATIVO.md) | Qué leer antes de usar cualquier texto; candados. |
| [`canon/CANON_ESTADO_ACTUAL.md`](./canon/CANON_ESTADO_ACTUAL.md) | Estado del canon: G01–G22, 14 fragmentos con nombre, frases exactas, náhuatl. |
| [`canon/DECISIONES_RENE_REGISTRO.md`](./canon/DECISIONES_RENE_REGISTRO.md) | Registro de decisiones de René (5-sep). |
| [`canon/DECISIONES_CIERRE_2026-10-24.md`](./canon/DECISIONES_CIERRE_2026-10-24.md) | Decisiones de cierre más recientes (24-oct): la casa única, no se borra nada. |
| [`QUE_CAMBIO_DESDE_AGOSTO.md`](./QUE_CAMBIO_DESDE_AGOSTO.md) | Comparación: qué cambió del diagnóstico de agosto al canon vigente de sep–oct. |
| [`historico/`](./historico/) | Material de agosto (diagnóstico 11-ago, documento maestro 31-ago, decisiones/pendientes de agosto). **Superado**; se conserva como referencia. |

## Principio de gobernanza

> **Lo más reciente y ratificado manda.** Cada decisión que René cierra se anota con fecha
> (hoy, en `canon/DECISIONES_CIERRE_2026-10-24.md`); no se borra nada (lo viejo va a histórico);
> no se reabre el canon congelado sin ratificación explícita.

## Nota sobre el alcance del repo

El repo guarda **texto de autoridad**, no los medios ni el código (eso vive en el SSD, que Git no
debe cargar). Para traer un documento nuevo del maestro al repo, se copia su texto aquí bajo
`canon/` y se referencia su ruta en el SSD.
