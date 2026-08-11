# RESCOLDO — Diagnóstico integral y propuestas

**Fecha:** 11 de agosto de 2026
**Alcance revisado:** carpeta `RESCOLDO_Y_UMBRAL` (SSD JOCHIS)
**Rol:** consultoría de marca, producto, storytelling, experiencia espacial y web

> Documento de referencia. Preserva el diagnóstico completo tal como se produjo.
> El análisis de los archivos crudos vive en el SSD y se corre en la sesión local
> de Claude Code (no en la sesión de nube).

---

## Qué se leyó realmente (para calibrar la confianza del diagnóstico)

Se leyó íntegramente:

- Los tres documentos maestros de raíz (`00_ORDEN_Y_MAPA`, `00_ESTADO_CONSOLIDACION`, `00_BITACORA`).
- Los 10 documentos de `RESCOLDO_BIBLIA_STORYTELLING_COMPLETA` (storytelling maestro, guiones de TZÓME / René / hostess / guardianes, journey, cue-by-cue, arco dramático, biblia de transiciones, storyboard y versión narrada).
- Los 9 documentos de canon de `07_CANON_OPERACION_Y_WEB/rea/content/`, más `data/rescoldo.json`, `DECISIONES.md`, `PENDIENTES.md` e `HISTORIAL_DE_CAMBIOS.md`.
- El código de las dos superficies web existentes: `web/experience-lab/index.html` y `rescoldo-site/index.html`, y el `server.mjs`.
- El sistema de identidad completo: `RESCOLDO_IDENTIDAD_V1.zip` (SVG y PNG del logo, cobrand, monograma RT) y las 18 páginas del `Manual_de_Marca_RESCOLDO_RT_STUDIO_LAB.pdf`.
- El índice completo de archivos de toda la carpeta (2,000 entradas).

No se revisó (y por tanto no se opina de ellos): los videos y renders (`.mp4`, `.mov`), las presentaciones Keynote y PPTX, los HTML gigantes de WhatsApp para Nico (207 MB c/u), los 27 audios de TZÓME/COLIMOTL, los PNG de referencia visual, los exports de chat de `chats_rt_gpt`, y el proyecto Remotion. Son piezas de producción; el diagnóstico se sostiene sobre el canon, el relato, la marca y la web, que es donde están las decisiones.

---

## A. Resumen ejecutivo

RESCOLDO no es un proyecto incompleto. Es un proyecto muy avanzado y desordenado en su gobernanza. La narrativa está resuelta a un nivel que la mayoría de las experiencias inmersivas nunca alcanza: hay tesis, arco de cinco actos, cadena causal, guion palabra por palabra de TZÓME, cue-by-cue con horas, biblia de transiciones y un journey en primera persona. La marca visual también existe y está bien argumentada: hay manual de 18 páginas, concepto de símbolo, paleta, tipografía, usos incorrectos y arquitectura de marca.

El problema no es falta de material. Es que hay dos fuentes maestras vivas que no se conocen entre sí, la parte gastronómica está vacía, la web de reservas no existe (sólo está descrita en un documento) y hay siete contradicciones que, si no se cierran antes de producir, van a costar dinero en montaje.

En una frase: falta menos de lo que crees en historia y marca, y más de lo que crees en menú, operación y web. Lo urgente no es crear, es decidir y consolidar.

### Estado por bloque

| Bloque | Estado real | Riesgo |
|---|---|---|
| Universo narrativo y canon | ~95% | Bajo |
| Guion y dramaturgia del show | ~85% | Bajo |
| Identidad visual / marca | ~70% | Medio |
| Arquitectura de marca | ~45% | Alto |
| Menú y gastronomía | ~5% | Crítico |
| Web de reservas | 0% construido | Crítico |
| Portal digital del Umbral | 0% construido | Alto |
| Mapping / biblia visual técnica | ~25% | Alto |
| Diseño industrial (Umbral, Fragmento, Pulso) | ~10% | Alto |
| Gobernanza documental | Roto | Crítico |

---

## B. Lo que ya está listo

Esto no hay que rehacerlo. Confírmalo y protégelo.

### Narrativa

- **Tesis y pregunta dramática.** "¿Cómo puede una tierra nacida del fuego terminar alimentando la vida?" Es una tesis real, no un eslogan.
- **Cadena causal de 9 capítulos:** Prólogo → Fuego → Ceniza → Maíz → Raíces → Sal → Mar → Brasa → Rescoldo. Con la decisión inteligente de que agua y valle son transiciones, no capítulos. Esa decisión ahorra 20 minutos de show.
- **Frase rectora narrativa:** "El fuego no se apagó. Solo cambió de lugar."
- **El sistema del Fragmento:** entrega 72 h antes → mesa circular de 14 receptáculos → activación colectiva → devolución al final. Es el mejor mecanismo del proyecto. Convierte al cliente en Portador con una sola acción física y cierra el círculo. No tocarlo.
- Guion completo de TZÓME, palabra por palabra, con principios de interpretación.
- Guiones de René Digital, René humano, hostess y guardianes.
- Arco emocional de 19 estados, tabulado.
- Biblia de transiciones: cada capítulo nace del anterior por causa física, no por corte. Esto es exactamente lo que necesita el mapping.
- Storyboard de 125 planos.
- Cue-by-cue con horas (19:00 → 21:30).
- Journey en primera persona y versión narrada continua: sirven como brief para inversionistas, para Nico y para el equipo sin traducir nada.

### Marca

- **Concepto de símbolo:** el círculo incompleto como rescoldo / portal / pulso / centro de mesa. Es un buen concepto, defendible y animable.
- **Paleta:** negro mineral, carbón, hueso, ceniza, brasa, cobre, y magenta RT relegado a firma heredada. Correcta.
- **Regla tipográfica:** serif para emoción, grotesca para sistema. Prohibición explícita de tipografías "mexicanas", western y de fuego. Correcta.
- **Lista de usos incorrectos** (8 prohibiciones). Es de las páginas más útiles del manual.
- **Voz de marca** con listas sí/no. "Decir menos. Hacer que pese."
- Guion de identidad en movimiento en 6 pasos, 2.5–4 s.

### Operación / experiencia

- Horarios: convocatoria 19:00, inicio 19:40, cierre 21:15–21:25, sobremesa opcional.
- Recorrido espacial en La Sal: acceso lateral → escalera-grieta → antesala/barra → cámara principal en palapa.
- Formato: 14 comensales, mesa larga, 7 por lado, 14 Guardianes.
- Flujo de aprobación gastronómica: cocina propone → Nico aprueba → René aprueba → prueba integrada → entra al menú.
- Decisión de El Pulso (dispositivo físico de mesa, sin teléfono, sin sonido).
- Consolidación del archivo: la carpeta está ordenada, con bitácora, convención de nombres y verificación por SHA-256. Ese trabajo está bien hecho y no hay que repetirlo.

---

## C. Lo que falta — priorizado

### Nivel 0 — Bloquea todo lo demás

**C1. Una sola fuente maestra.** Hoy existen dos y ninguna cita a la otra:

- `07_CANON_OPERACION_Y_WEB/rea/content/03_storytelling_show.md` — "Bloque 3, en desarrollo", con decisiones administrativas.
- `RESCOLDO_BIBLIA_STORYTELLING_COMPLETA/` — versión de producción de agosto, mucho más avanzada, con guion final.

El `README.md` del proyecto `rea` dice: "La fuente oficial es la carpeta documental. La web sólo lee y presenta." Pero la biblia de producción vive fuera de esa carpeta. El sistema de gobernanza construido está describiendo un canon que ya fue superado por otro documento. Mientras esto no se cierre, cualquier persona que entre al proyecto va a producir con la versión equivocada.

**C2. El menú.** Hay 8 huecos literales marcados `[PLATO POR DEFINIR]` en el storytelling maestro. Sin menú no hay cue-by-cue real, no hay tiempos reales, no hay costo, no hay prueba integrada y no hay show. Todo el resto del proyecto está esperando a esto. Es el único bloqueo verdaderamente externo (depende de Nico).

**C3. Las siete decisiones abiertas.** Ver sección D. Son baratas de cerrar hoy y caras de cerrar en montaje.

### Nivel 1 — Producto que no existe

- **C4. Web de reservas.** No existe una sola línea de código. Sólo existe `07_operacion_reservaciones.md`, un documento de arquitectura marcado como "Planeado". Detalle importante: ese documento dice explícitamente "No almacenar datos reales de clientes todavía. No construir una base de datos productiva todavía." La ausencia fue una decisión, no un olvido — pero ya no es sostenible si vas a vender funciones.
- **C5. Portal digital del Umbral.** Descrito en detalle (cuenta regresiva, restricciones, manifestaciones progresivas de TZÓME durante 3 días) y construido en 0%.
- **C6. Sistema de captura de datos de comensal.** Nombre, teléfono, correo, domicilio de entrega, alergias, accesibilidad, con/sin alcohol, asiento, número de Fragmento. Sin esto no puedes entregar el Umbral, que es donde empieza la experiencia.

### Nivel 2 — Producción física

- **C7. Diseño industrial del Umbral (caja) y del Fragmento.** Medidas, peso, material, sistema de apertura, costo unitario, ruta logística de entrega a domicilio.
- **C8. La mesa circular de 14 receptáculos.** Es el corazón del Prólogo y no existe ningún documento de diseño o técnico sobre ella. Requiere: mesa física, 14 alojamientos, detección de pieza colocada, proyección adherida a superficie y trigger de la escena. Es la pieza técnica más compleja del show y la menos documentada.
- **C9. El Pulso.** Diseño técnico pendiente.
- **C10. 14 Cajas de Ignición** y protocolo de ignición sincronizada (con su protocolo de seguridad y de seguro).

### Nivel 3 — Técnico escénico

- **C11. Biblia visual de MadMapper con contenido real.** El documento actual tiene 633 bytes y 5 nombres de capa. Es un índice, no una biblia.
- **C12. Mapeo de superficies** de la palapa y de la mesa larga.
- **C13. Plan de contingencia sin proyección** (el canon lo exige, no está escrito).
- **C14. Producción de René Digital y de TZÓME** (los guiones están; las piezas no).

### Nivel 4 — Marca

- **C15. Arquitectura de marca completa** con el nombre de la sede. Ver sección G.
- **C16. Rediseño / producción final del logo** con lockups, isotipo, versión mono y outlines. Ver sección F.
- **C17. Aplicaciones reales:** menú, invitación, portal, señalética, uniforme del Guardián, empaque del Fragmento.

---

## D. Problemas detectados

Ordenados por costo de no resolverlos.

### D1. "Catorce" es un dato narrativo, no una capacidad. (Crítico)

El canon dice: "La capacidad ideal seguirá siendo de 14 a 16 comensales. La capacidad máxima de 20 queda en evaluación técnica."

Pero todo el Prólogo está escrito sobre el número 14, literalmente:

- La mesa circular tiene exactamente catorce receptáculos.
- TZÓME dice en voz alta: "Catorce Fragmentos. Catorce Portadores."
- Entran exactamente catorce Guardianes, uno por comensal.
- La mesa larga es de 7 + 7.
- La instalación colectiva es de 14 a 16 Fragmentos.

Con 16 o 20 comensales el show no se adapta: se rompe. Habría que refabricar la mesa circular, regrabar la voz de TZÓME, contratar más Guardianes y romper la simetría 7+7.

**Decisión requerida:** 14 es el formato. Punto. Si necesitas ingreso, la palanca no es meter más gente: es más funciones o un precio más alto. Recomendación: eliminar "14 a 16" y "20 en evaluación" del canon y sustituirlo por: "Catorce Portadores. El número es dramaturgia, no aforo."

### D2. ¿TZÓME es una proyección o es un actor? (Crítico — impacta costo y casting)

Canon (`01_biblia_maestra.md`): "TZÓME conservará apariciones puntuales con voz, proyección, silueta, rostro y cuerpo completo en momentos seleccionados."

Storytelling maestro: "TZÓME reaparece en vivo en la cabecera de la mesa" — y desde ahí habla en los nueve capítulos, de 19:40 a 21:22.

No son la misma producción. Uno es contenido pregrabado; el otro es un actor con vestuario, dirección, ensayos, nómina por función y riesgo de enfermedad. Además cambia por completo el diseño de audio (voz pregrabada sincronizada vs. voz en vivo con micrófono).

**Recomendación:** TZÓME en vivo en la cabecera. Es dramáticamente muy superior — la decisión de que "la entidad es la misma, cambia el medio en que se manifiesta" es elegante y resuelve el salto proyección→presencia. Pero hay que decidirlo formalmente, presupuestarlo y actualizar el canon, porque hoy el canon dice otra cosa.

### D3. "El Umbral" nombra tres cosas distintas. (Alto — contamina toda la comunicación)

- El Umbral de RESCOLDO = la caja de invitación que llega a domicilio.
- Prólogo — El Umbral = el capítulo 1 del show.
- Umbral físico = el primer cuarto del segundo piso (según `08_vista_para_nico.md`).

Y además "umbral" se usa como metáfora general ("escalera-umbral", "umbral volcánico"). Cuando un mismo término nombra un objeto, un capítulo y una habitación, el equipo de producción va a equivocarse.

**Propuesta de renombrado (mínimo esfuerzo, máximo orden):**

| Hoy | Propuesto | Por qué |
|---|---|---|
| El Umbral de RESCOLDO (caja) | La Caja o El Envío internamente; "tu Fragmento llega el jueves" hacia el cliente | El objeto memorable ya es el Fragmento, no la caja. La caja es el continente. |
| Prólogo — El Umbral (capítulo) | El Umbral (único titular del término) | Es el uso más fuerte y el que TZÓME pronuncia. |
| Umbral físico (cuarto) | La Antesala | Ya lo llamas así en el storytelling maestro. |

Es decir: "Umbral" se reserva para el momento en que las catorce piedras completan la mesa. Nada más.

### D4. El manual de marca borra a René. (Alto — contradice una regla no negociable)

Canon, reglas no negociables: "No esconder la autoría de René."

Canon, fórmula oficial: "Una experiencia de RT Studio Lab / Creada y dirigida por René Tortolero / Dirección gastronómica de Nico Mejía."

Manual de marca, firma recomendada: "RESCOLDO | RT STUDIO LAB × NICO MEJÍA" — y la jerarquía de créditos de la p.15 pone el nombre de Nico en cartel, invitación, menú, prensa y staff. El nombre de René no aparece en ninguna de las cinco.

Esto no es un descuido menor: es la diferencia entre "RESCOLDO es una obra de autor de René Tortolero" y "RESCOLDO es un evento del estudio con un chef invitado". Contradice el documento marcado como no negociable.

**Recomendación:** corregir la p.15 del manual. Fórmula pública:

> RESCOLDO
> Creada y dirigida por René Tortolero
> Dirección culinaria: Nico Mejía
> Una producción de RT STUDIO LAB

En cartel puede compactarse a `RESCOLDO — René Tortolero × Nico Mejía`. Lo que no debe quedar es la versión donde sólo aparece el estudio y el chef.

### D5. El descriptor del logo es de RT, no de RESCOLDO. (Medio)

El SVG del logo lleva grabado debajo: `EXPERIENCIAS GASTRONÓMICAS INMERSIVAS DE AUTOR`. Pero:

- Está en plural y RESCOLDO es una experiencia.
- El propio manual dice que "Experiencias gastronómicas inmersivas de autor" es el descriptor institucional — o sea, de RT STUDIO LAB, la marca madre.
- Y el manual también dice que RESCOLDO es "la primera experiencia" del universo RT.

Resultado: el logo de la obra lleva colgado el descriptor de la casa productora. Hay que quitarlo del lockup. Ver F.

### D6. `rescoldo.json` está desincronizado con el canon. (Medio, pero envenena la web interna)

El array `chapters` del JSON dice: `Umbral · Tensión · Origen · Raíz · Sal · Mar · Brasa · Cierre · Persistencia`

El canon dice: `Prólogo · Fuego · Ceniza · Maíz · Raíces · Sal · Mar · Brasa · Rescoldo`

Cinco de nueve capítulos no coinciden. "Tensión", "Origen", "Cierre" y "Persistencia" no existen en ningún otro documento del proyecto. Además, la sección `vista-nico` figura como "Planeado / 10%" cuando el `HISTORIAL_DE_CAMBIOS` registra que se construyó el 8 de agosto.

Como el Experience Lab lee este JSON para pintar la interfaz, la web interna está mostrando capítulos que no existen. Cualquiera que consulte el lab se lleva información falsa.

### D7. "Raíz" vs "Raíces". (Bajo, pero se propaga)

`08_vista_para_nico.md` y `rescoldo.json` dicen `Raíz` (singular). El storytelling maestro, la biblia de transiciones, el storyboard y el guion de TZÓME dicen `Raíces` (plural). El plural es el correcto y el necesario: todo el capítulo trata de que ninguna cocina nace sola, de raíces que se encuentran y se mezclan. En singular el capítulo se lee como "lo originario / lo puro", que es exactamente lo que el texto se esfuerza en negar.

**Fijar: Raíces.**

### D8. Dos "frases rectoras". (Bajo, fácil de ordenar)

- Manual de marca: «Aquí la cocina no se sirve. Se revela.»
- Storytelling: «El fuego no se apagó. Solo cambió de lugar.»

Ambas son buenas y no compiten si se les asigna función:

- "El fuego no se apagó. Solo cambió de lugar." → **frase del relato.** Es el cierre del show, el mensaje del día siguiente, la línea de la caja. No se usa en publicidad porque es un spoiler emocional.
- "Aquí la cocina no se sirve. Se revela." → **frase de marca.** Va en web, prensa, dossier y firma.

### D9. Código de vestimenta: sí y no. (Bajo)

- `03_storytelling_show.md` (Bloque 3.1): el portal digital incluirá "código de vestimenta".
- Storytelling maestro: "No existe código de vestimenta temático. Vestimenta de cena especial; calzado cómodo para escaleras."

La segunda versión es la correcta y más elegante (pedir disfraz abarataría la experiencia). Consolidar: "Vestimenta de cena. Calzado cómodo: hay escaleras." Y nada más.

### D10. QR o NFC sigue sin decidirse. (Bajo)

Canon: "híbrido, NFC oculto como primera opción, QR como respaldo, decisión pendiente". Storytelling maestro: ya asume "QR discreto".

**Recomendación:** QR discreto, y cerrarlo hoy. El NFC en una caja de cartón/rígida añade costo unitario, un punto de falla (iPhone con NFC deshabilitado, Android sin lectura en segundo plano) y no aporta nada narrativo que el QR no aporte. El misterio no lo produce la tecnología, lo produce el texto de la tarjeta. Guarda el NFC para el Fragmento en una versión futura si alguna vez quieres que la piedra "recuerde".

### D11. `TZOMÉ | COLIMOTL` contradice el canon. (Medio — es el único riesgo legal/reputacional real)

El canon es enfático: "TZÓME... No es el Rey Colimán ni Colímotl. No es una deidad, chamán, sacerdote o antepasado histórico. No habla en nombre de una comunidad originaria."

Y sin embargo el proyecto tiene 27 pistas musicales y dos paquetes de publicación de YouTube ya preparados (`13_PUBLICACION_TZOME`) bajo el título "TZOMÉ | COLIMOTL", con letra, hashtags, descripción y checklist de publicación.

Publicar TZÓME junto a Colimotl como una unidad es exactamente lo que el canon prohíbe: fusiona tu personaje de ficción con una figura histórica/cultural real. Si eso sale al público antes de que la experiencia exista, el primer artículo que se escriba sobre RESCOLDO va a ser sobre apropiación, no sobre cocina.

**Recomendación:** o se renombra la pieza musical (p. ej. sólo "TZÓME"), o el canon se ajusta para explicar deliberadamente esa relación. Pero no pueden convivir como están. Además, `PENDIENTES.md` deja abierta la "revisión marcaria si se usa como marca principal independiente" — y una publicación en YouTube es uso público de marca.

### D12. El plano espacial de Vista Nico no coincide con el storytelling. (Medio)

`08_vista_para_nico.md` describe: acceso lateral → escalera → primer cuarto = Umbral físico → dos cuartos consecutivos = barra y recepción → palapa = salón.

El storytelling maestro describe: llegada → bebida en recepción/bar → escalera → antesala con mesa circular → puerta → cámara larga.

En la segunda versión el "primer cuarto / Umbral físico" desaparece y la bienvenida ocurre abajo. Son dos plantas distintas del mismo edificio. Hay que ir a La Sal con un metro, levantar el plano real y fijar una sola secuencia de habitaciones, porque de ahí dependen: el mapping, la posición de proyectores, dónde va la mesa circular, el flujo de servicio y el tiempo de tránsito.

### D13. Cosas que sobran o duplican.

- `RESCOLDO_BIBLIA_STORYTELLING_COMPLETA` existe como carpeta y como `.zip` en la misma raíz.
- `RESCOLDO_NICO_UN_SOLO_HTML_WHATSAPP 2.html` y `... 3.html`: 207 MB cada uno, idénticos en tamaño. Un HTML de 207 MB no se abre bien en un iPhone por WhatsApp, que es justo su propósito. Están duplicados y probablemente inservibles.
- `RESCOLDO_FINAL_PRE(1).key` y `RESCOLDO_FINAL_PRE(1) (1).key`: 66 MB cada uno, mismo tamaño.
- `RESCOLDO_UMBRAL_FUEGO_PREMIUM_1080P.mp4` y `RESCOLDO_UMBRAL_FUEGO_VOL_ALTO.mp4`: 230,536,861 bytes exactos los dos. Mismo archivo con dos nombres.
- `13_PUBLICACION_TZOME` contiene dos carpetas idénticas (mismos 10 archivos, mismos tamaños).
- 27 pistas musicales sin un máster marcado. `10_MUSICA/README` y la bitácora reconocen que no se sabe cuál es la aprobada.
- `rescoldo-remotion-clean` incluye `node_modules` completo (1,372 entradas) dentro del respaldo.

Nada de esto es urgente, pero hay ~1.5 GB de duplicados verificables y una playlist sin máster designado, que sí es un problema real cuando llegue el diseño sonoro del show.

### D14. Lo que depende de una decisión tuya, no de trabajo.

Estas cinco cosas no avanzan por más horas que se les metan; necesitan que tú decidas:

1. 14 fijo o capacidad variable (D1).
2. TZÓME en vivo o pregrabado (D2).
3. Quién firma la obra públicamente (D4).
4. Si RESCOLDO ocurre dentro de La Sal Playa o en una sede propia (ver G).
5. Si TZÓME se publica como proyecto musical antes del estreno (D11).

---

## E. Web de reservas

### E1. Diagnóstico: la web de reservas no existe

Lo que existe es:

| Superficie | Qué es | Estado |
|---|---|---|
| `web/experience-lab/` | Lector interno de documentación (Node + JSON + Markdown), corre en localhost:3000 | Funcional, interno, sin desplegar |
| `rescoldo-site/index.html` | Página de una sola vista con audios, hecha para Nico | Funcional, incompleta |
| `09_INTEGRACION_RT_STUDIO_LAB/src/app/page.tsx` | Sección de RESCOLDO dentro del sitio de RT Studio Lab | Fragmento de otra plataforma |
| `content/07_operacion_reservaciones.md` | Documento que describe el módulo de reservas | "Planeado" · 0 líneas de código |

No hay reservas, no hay pago, no hay captura de comensal, no hay portal del Umbral, no hay base de datos. El documento de operación incluso dice explícitamente: "No almacenar datos reales de clientes todavía. No construir una base de datos productiva todavía. Sólo documentar la arquitectura." Fue una decisión consciente. Pero si vas a vender funciones, ya venció.

### E2. Diagnóstico UX de lo que sí existe

**Experience Lab (interno)**

Lo bueno: la arquitectura es correcta — Markdown como fuente, JSON como manifiesto, web sólo como lector. Es la decisión de sistema más sana de todo el proyecto. Búsqueda, navegación, badges de estado y progreso.

Lo malo:

- Muestra datos falsos, porque lee el `chapters` desanclado del `rescoldo.json` (D6).
- Corre sólo en localhost. En la práctica es una app de una sola máquina: si tú no estás, el equipo no tiene canon.
- Tiene 7 badges de estado (Confirmado, En desarrollo, Pendiente con René, Pendiente con Nico, Pendiente técnico, Privado, Público). Son demasiados y mezclan dos ejes distintos: madurez y visibilidad. Reducir a 3 estados (Confirmado / En desarrollo / Bloqueado) + 1 flag de visibilidad.
- El `server.mjs` incluye un proxy a la API de Skywork con `SKYWORK_API_KEY` leída de `.env.local`. Ese archivo está dentro del respaldo. Aunque el `.gitignore` lo excluye del repo, está en el SSD. **Rota esa clave.**
- `safeResolveDoc` permite leer cualquier archivo bajo la raíz del proyecto vía `/api/doc?path=`. En localhost es tolerable; si algún día lo despliegas tal cual, es una fuga.

**rescoldo-site (la de Nico)**

Está bien resuelta visualmente: oscura, cálida, tipografía grande, responsiva, `playsinline` para iPhone. La intención "que abra bien en iPhone" está cumplida.

Pero:

- Sólo tiene 3 secciones (Prólogo / Desarrollo / Cierre) cuando la experiencia tiene 9 capítulos — y hay 13 audios generados en `/audios/` de los cuales sólo usa 3.
- El texto es de plantilla, no de proyecto: "El contenido visual y el texto se pueden expandir por tiempo", "La estructura ya está pensada para no romperse en pantallas pequeñas". Eso son notas al desarrollador visibles para el cliente.
- La copy habla del sitio, no de RESCOLDO: "compatible con iPhone, Mac y PC", "si más adelante quieres voz humana o una locución menos robótica".
- El logo no aparece. Se usa `<h1>RESCOLDO</h1>` en la fuente del sistema, no la marca.

Veredicto: ninguna de las dos es la web que el proyecto necesita, y ninguna hay que "arreglar". La primera es una herramienta interna que hay que sanear y desplegar; la segunda cumplió su función (mandarle algo a Nico) y debe archivarse.

### E3. Propuesta: qué web hay que construir, y en qué orden

RESCOLDO no necesita "una web". Necesita tres superficies distintas con públicos y momentos distintos:

```
1. SITIO PÚBLICO          →  desconocido        →  desear y reservar
2. PORTAL DEL PORTADOR    →  ya reservó         →  esperar 3 días
3. CONSOLA DE OPERACIÓN   →  equipo interno     →  ejecutar la función
```

**Superficie 1 — Sitio público + reserva**

Principio rector: RESCOLDO tiene 14 lugares, una sola función por noche y venta cerrada 72 h antes. Eso no es un restaurante, es una función de teatro. Por lo tanto: nada de calendario de disponibilidad, nada de selector de hora, nada de "número de personas" que dispare mesas distintas, nada de mapa de asientos, nada de cuenta de usuario. La web entera cabe en una página con cinco pasos.

Bloque de reserva — 5 pasos, uno por pantalla:

1. **Elegir función.** Mostrar sólo las 2 o 3 próximas fechas, nunca un calendario. Cada una con "Quedan 6 de 14 lugares". Cuando se agota: "Completa" (no "sold out"). Cuando faltan menos de 72 h: "Cerrada".
2. **Cuántos lugares.** 1–14, con microtexto honesto: "Compartirás mesa con los demás Portadores de la noche."
3. **Los Portadores.** Un bloque por persona: nombre completo, restricciones alimentarias (texto libre + alergias graves marcadas), con/sin alcohol. Nombre por persona es obligatorio, porque el Fragmento va personalizado y el asiento está numerado.
4. **Dónde entregamos.** Domicilio de entrega del Fragmento + teléfono + ventana horaria preferida. Copy: "Tres días antes te entregaremos algo en mano. No es un envío: alguien de RESCOLDO irá."
5. **Pago y confirmación.** Pago completo (no anticipo — con 14 lugares un no-show es el 7% de la sala). Política de cancelación visible antes del botón, no después.

Confirmación — usar literalmente el texto que ya está en el storytelling maestro:

> RESCOLDO // Tu lugar ha sido confirmado
> [Nombre], tu lugar en RESCOLDO ha sido confirmado para [fecha].
> Hora de encuentro: 19:00. La Sal Playa · Manzanillo, Colima.
> Tres días antes recibirás algo que deberá acompañarte esa noche. Consérvalo.
> No necesitas hacer nada más por ahora.

Reglas de UX no negociables:

- Nunca decir "boletos", "tickets", "evento", "menú degustación" ni "cena show".
- Cero spoilers. Ni TZÓME, ni la mesa circular, ni René Digital, ni las cajas de fuego.
- Una sola imagen fuerte por bloque, negro mineral, luz lateral. Nada de galería.
- El precio se muestra. Ocultarlo en una experiencia premium genera desconfianza, no exclusividad.
- Sin cuenta de usuario, sin login, sin newsletter en modal.
- Móvil primero. El 80% va a reservar desde el teléfono.
- Peso objetivo: < 1 MB.

**Superficie 2 — El Portal del Portador**

Es la pieza más valiosa y la más olvidada. Se abre con el QR del Fragmento y cambia durante 72 horas:

| Momento | Qué muestra |
|---|---|
| Al abrir la caja (T-72 h) | Nombre. Faltan 3 días. Una sola línea de TZÓME. Nada más. |
| T-48 h | Se añade una segunda línea. Aparece el mapa de llegada. |
| T-24 h | Vestimenta, hora, acceso lateral, teléfono guardado, contacto de emergencia. |
| El día, 12:00 | Esta noche. 19:00. Trae tu Fragmento. |
| T+12 h (día siguiente) | Anoche el fuego cambió de lugar. + la pieza sonora de cierre. |

Técnicamente es una página estática con lógica de fecha. No necesita backend. Es de lo más barato de construir y de lo que más se va a recordar. Prioridad alta, esfuerzo bajo.

**Superficie 3 — Consola de operación**

Lo que ya describe `07_operacion_reservaciones.md`, sin adornos: lista del día, asiento, número de Fragmento, alergias, con/sin alcohol, estado de entrega, estado de llegada, y exportables por área (cocina / hospitalidad / servicio / producción). Una tabla. No necesita ser bonita, necesita imprimirse bien y funcionar sin internet la noche de la función.

### E4. Simplificación recomendada

| En vez de | Haz |
|---|---|
| Un sitio con menú de navegación | Una página, cinco bloques, un botón |
| Calendario de disponibilidad | Las próximas 2–3 funciones |
| Mapa de asientos | Nada: el asiento lo asigna la producción |
| Cuenta de usuario | Un enlace único por reserva |
| Galería de fotos | Una imagen por bloque |
| Sección "el concepto" con 800 palabras | Cuatro frases y la frase rectora |
| 7 estados en el Experience Lab | 3 estados + 1 flag |

Lo que NO hay que cambiar: la arquitectura del Experience Lab (Markdown fuente / JSON manifiesto / web sólo lee) es correcta y hay que conservarla y extenderla, no sustituirla.

---

## F. Marca y logo

### F1. Diagnóstico del logo actual

El logo es `RESC⊙LDO`: la O sustituida por un anillo incompleto en brasa (`#D66A2E`), con un punto ámbar suelto, tipografía EB Garamond, y descriptor debajo.

El concepto es bueno y hay que conservarlo. Un círculo interrumpido que funciona a la vez como O, portal, pulso, centro de mesa y resto de fuego, y que evita el cliché de la flama, es una idea que muchos estudios no consiguen. No cambies el concepto. Cambia la ejecución.

Problemas de ejecución, revisados sobre el SVG real:

- **El anillo no es una letra, es un objeto pegado.** El texto está a `font-size: 210` en Garamond (astas gruesas, alto contraste) y el anillo tiene `stroke-width: 8` y `r: 63`. Es visiblemente más ligero y más pequeño que las letras que lo rodean. El ojo lo lee como "RESC · símbolo · LDO", no como una palabra.
- **Espaciado óptico desigual.** Los dos huecos no están igualados ópticamente, y el `letter-spacing: 12` no compensa la diferencia.
- **El corte del anillo está en un ángulo arbitrario** (`rotate(-20)` + `stroke-dasharray: 350 50`). Es una decisión de software, no de diseño.
- **El punto ámbar suelto desaparece.** A tamaño de favicon o grabado en una piedra, ese `r=7` no existe. Y crea un segundo color (`#FFB04C`) que el manual ni siquiera declara en la paleta.
- **Dos tintas.** Con hueso + brasa + ámbar, el logo no es imprimible en una sola tinta. Pero el proyecto entero pide una tinta: grabado en el Fragmento, hot-stamping en la caja, bordado en el uniforme del Guardián, grabado en cristalería. Hoy no existe versión mono.
- **El descriptor está mal** (D5): plural, y pertenece a RT STUDIO LAB.
- **El descriptor está en Arial dentro del SVG.** El manual manda grotesca de sistema. Arial es un marcador de posición que se quedó.
- **El SVG usa `<text>` vivo, no trazados.** Si EB Garamond no está instalada, cae a Georgia y el logo cambia de forma. Un logotipo entregable siempre va en curvas.
- **Sólo hay un lockup.** No hay versión apilada, no hay isotipo suelto, no hay favicon, no hay versión para formato cuadrado ni mínimo de tamaño declarado.

Veredicto: el logo no está mal diseñado, está mal producido. No necesita rediseño conceptual, necesita dibujarse en serio y convertirse en sistema.

### F2. Dirección visual recomendada

Una sola idea rectora, tomada de tu propio manual: **la marca no se enciende con color. Se enciende con luz.**

El color brasa deja de ser "el color del logo" y pasa a ser un evento: aparece en el momento de encendido, en la animación, en el punto del Fragmento, en un acento mínimo. La marca en reposo es monocroma: hueso sobre negro mineral. Esto resuelve de golpe la impresión a una tinta, el grabado, el bordado y el favicon, y hace que el naranja signifique algo cuando aparece.

### F3. Cuatro rutas de logo

**RUTA A — Editorial mineral ★ recomendada como marca maestra.** El anillo deja de ser un objeto y se convierte en la O: se dibuja una O de la misma familia y peso que el resto de la palabra, y se le practica un corte limpio, como una grieta. EB Garamond redibujado y en curvas. Un único corte a 45° arriba-derecha, documentado como constante de marca. Monocromo hueso `#E7DDCB` sobre negro mineral `#0A0A0A`. Brasa sólo en movimiento y en el isotipo aislado. Descriptor fuera del lockup; cuando se necesite, `MANZANILLO · COLIMA`.

**RUTA B — El Sello ★ recomendada como isotipo complementario.** El anillo cortado se independiza: círculo grueso, interrumpido, con la brasa como punto contenido dentro de la interrupción. Trazo pesado, geometría perfecta, sin tipografía. Diseñado para 1 tinta y relieve: grabado en el Fragmento, lacre en la caja, troquel en el menú, cara superior de El Pulso, botón de la web. Funciona a 16 px y a 2 metros.

**Recomendación de sistema: A + B.** Ruta A es el logotipo; Ruta B es el símbolo. Juntas cubren el 100% de las aplicaciones.

**RUTA C — Cinemática / tipo en movimiento.** La marca se define primero como animación (oscuridad → punto de brasa → se traza el anillo → pulso → emerge RESCOLDO → respiración) y el estático se deriva de un fotograma. Sirve como bumper de video, arranque del portal, apertura de proyección. Producir, pero no como maestra.

**RUTA D — Gastronómica / compacta.** Lockup reducido para tamaños pequeños y superficies difíciles: `RESC⊙LDO` apilado o comprimido, sin descriptor, con el corte de la O agrandado para que se lea a 12 mm. Menú, servilleta, base de plato, cristalería, etiqueta de la pieza sonora, uniforme. Pieza obligatoria del sistema que hoy falta.

**Ruta que NO se recomienda:** cualquier exploración "más ritual" que incorpore glifos, iconografía prehispánica o formas rituales. El canon ya establece que TZÓME no representa a ninguna comunidad originaria (D11), y el manual prohíbe la tipografía temática mexicana.

### F4. Entregables concretos del rediseño

1. Logotipo maestro en curvas (`.svg` + `.ai`) — horizontal, apilado, compacto.
2. Isotipo (sello) en 1 tinta, positivo y negativo.
3. Versión mono para grabado / relieve / bordado.
4. Favicon y avatar cuadrado.
5. Tamaño mínimo declarado (24 mm de ancho para el horizontal, 8 mm para el sello).
6. Área de respeto aplicada al nuevo dibujo.
7. Animación de marca, 3 s, con y sin sonido.
8. Corrección de la p.15 del manual (jerarquía de créditos, D4).
9. Sustituir el descriptor del lockup.
10. Empaquetar todo como `RESCOLDO_IDENTIDAD_V2` y retirar V1 a archivo.

---

## G. Nombre del restaurante / sede

### G1. Antes de proponer nombres: hay una ambigüedad que resolver

Toda la documentación sitúa RESCOLDO en La Sal Playa, Manzanillo — un restaurante que ya existe. El storytelling maestro lo protege como decisión: "La Sal sigue siendo La Sal. No se construye un templo ficticio." El contraste entre lo cotidiano de abajo y lo ceremonial de arriba es lo que hace funcionar la escalera.

Tres escenarios, y el nombre correcto depende de cuál sea el tuyo:

| Escenario | ¿Necesitas nombre? | Qué nombras |
|---|---|---|
| 1. RESCOLDO ocurre dentro de La Sal, como huésped | No. Ponerle nombre a un espacio ajeno confunde. | Nada. A lo sumo, la sala: "La Cámara". |
| 2. RESCOLDO ocurre en un piso que tú operas dentro del complejo | Sí, un nombre de sala | El espacio |
| 3. Vas a abrir una sede propia | Sí, un nombre de casa completo | El restaurante |

Si estás en el escenario 1, la recomendación es no crear un nombre: usa `RESCOLDO · La Sal Playa`.

### G2. Criterios que debe cumplir el nombre

- No puede competir con RESCOLDO por el mismo significado (fuego, brasa, ceniza, calor).
- Debe ser sustantivo de lugar o de materia, no de acción ni de emoción.
- Español, sin folklore explícito.
- No debe ser náhuatl inventado ni derivado histórico (ya hay ese riesgo con D11).
- Una palabra, pronunciable, disponible como dominio y como @.
- Debe funcionar tipografiado en EB Garamond, en versalitas, debajo de RESCOLDO.

### G3. Propuestas, ordenadas por recomendación

1. **PAROTA ★ recomendación final.** La parota (*Enterolobium cyclocarpum*) es el árbol grande y emblemático del occidente de México y de Colima. Su madera es exactamente la que se usa para hacer mesas largas de una sola pieza. Es literalmente la mesa. Es territorio real de Colima sin ser folklore ni apropiación (es botánica, no cultura). No compite con el fuego. Riesgo: verificar disponibilidad marcaria en clase 43; `Casa Parota` o `Parota, Manzanillo` mitiga.
2. **CALDERA.** La depresión que deja un volcán; y en cocina, la raíz de caldero y caldo. Riesgo: se asocia también a la caldera industrial, y roza el criterio 1 (fuego).
3. **COSTA NEGRA.** La arena volcánica oscura del litoral de Colima. Une volcán y Pacífico. Riesgo: dos palabras; "negra" puede leerse sombrío.
4. **SALINA.** El lugar donde el agua de mar se evapora y deja sal. Riesgo grande: casi indistinguible de "La Sal Playa"; sólo viable en escenario 3.
5. **LA CÁMARA — para nombrar la sala, no la casa.** Ya está en tu propio texto ("la cámara principal", "la cámara larga"). Opción de menor esfuerzo y menor riesgo para escenarios 1–2.

Nombres descartados: Ascua/Brasa/Fogón/Ember/Tizón (compiten con RESCOLDO); Colimán/Colimotl/Tzome como sede (riesgo cultural y marcario); Umbral (ya nombra tres cosas); Volcán/Fuego/Nevado (literales, turísticos); cualquier náhuatl inventado (contradice el canon).

### G4. Arquitectura de marca resultante

```
RT STUDIO LAB                    marca madre (estudio)
        │
        ├── RESCOLDO             la obra / la experiencia insignia
        │       │
        │       ├── TZÓME        personaje narrativo (NO marca autónoma)
        │       ├── El Fragmento objeto / activo de la experiencia
        │       └── El Pulso     dispositivo interno
        │
        └── PAROTA               la sede física (si aplica escenario 2 o 3)
```

Reglas de jerarquía:

- RESCOLDO siempre va primero. La sede aloja a la obra, no al revés.
- La sede nunca aparece por encima ni al mismo tamaño que RESCOLDO.
- TZÓME no es marca. Mantenerlo como personaje.
- RT STUDIO LAB no debe aparecer en las superficies del comensal (invitación, portal, mesa). Va en prensa, dossier y créditos.

---

## H. Storytelling

### H1. Qué funciona — y funciona muy bien

1. **La causalidad.** Cada capítulo nace físicamente del anterior. Es una cadena de consecuencias, no un desfile de escenas.
2. **La regla de oro.** "Si una escena sólo muestra un tema, todavía no es RESCOLDO." La mejor herramienta de control de calidad del proyecto.
3. **El Fragmento.** Deuda dramática a 72 h, resuelta en la antesala, cerrada al final. Un arco completo con un objeto de $50.
4. **Agua y valle como transiciones, no capítulos.** Disciplina narrativa real.
5. **El tratamiento de Raíces.** "La identidad no es pureza. Es memoria compartiendo la misma olla." Honesto, adulto, sin folklore.
6. **La renuncia al clímax final.** Rescoldo (cap. 9) no intenta superar a Brasa (cap. 8). Decisión de dirección madura.
7. **La voz de TZÓME.** Corta, sin adjetivos, con pausas escritas.
8. **El día siguiente.** Un único mensaje, no comercial.

### H2. Qué no funciona

**H2.1 — El relato tiene un agujero del 60% de su duración: la comida.** Ocho `[PLATO POR DEFINIR]`. El show dura 102 minutos y más de una hora (20:05 → 21:22) transcurre en capítulos gastronómicamente vacíos. En una experiencia gastronómica el plato es la escena. Lo que sí está bien: la función narrativa de cada hueco está definida (ese es el brief correcto para Nico).

**H2.2 — El primer capítulo se come a los demás.** Fuego (19:40–19:54) contiene 14 Guardianes, cajas de ignición, cóctel con viales, humo frío, ignición sincronizada, fractura de la mesa, corrientes de luz, tres latidos y el Corazón Territorial. Luego Ceniza, Maíz, Raíces, Sal y Mar sólo tienen proyección + plato. Recomendación: no reducir Fuego; sembrar dos picos intermedios de participación física (uno en Maíz/Raíces ~20:15, uno en Sal ~20:35). Regla: cada 20 minutos debe pasar algo que los catorce hagan al mismo tiempo.

**H2.3 — René aparece tres veces y cada vez es una persona distinta.** René Digital (Prólogo), René humano (Brasa), René humano (Cierre). Nunca se explica por qué el mismo señor apareció como holograma. Salida recomendada: convertirlo en sentido con una línea en el cierre, p. ej. "Cuando empezó la noche, yo tampoco estaba aquí del todo." Coste: una frase.

**H2.4 — El Prólogo no tiene plan B.** Toda la apertura depende de que los catorce lleguen con su Fragmento. Recomendación: la hostess lleva dos Fragmentos de reserva idénticos; el protocolo se ejecuta en la recepción de abajo, antes de subir. Si la función se vende con 13, producción coloca el catorceavo antes de que suba el grupo.

**H2.5 — El canon y el relato discrepan sobre el protagonista.** `00_canon_maestro.md`: "Protagonista conceptual: el fuego." `01_STORYTELLING_MAESTRO`: "El protagonista real es el territorio; el fuego es la primera fuerza que lo transforma." La segunda es mejor y sostiene todo el arco. Actualizar el canon: "Protagonista: el territorio de Colima. Fuerza recurrente: el fuego, que cambia de forma."

**H2.6 — Cosas menores pero reales.**

- El Corazón Territorial aparece en Fuego y no vuelve nunca. Debería reaparecer, aunque sea un latido, en Rescoldo.
- El Pulso no está en el relato. O TZÓME lo integra en una línea al sentarse, o el Guardián lo explica en la recepción.
- Nico aparece en Maíz "sólo como manos", pero no está en el cue-by-cue como cue propio. Si no está en el cue sheet, no va a pasar.

### H3. ¿Hay que reescribir el storytelling?

No. El relato está bien resuelto y una reescritura lo empeoraría. Necesita seis intervenciones quirúrgicas:

| # | Intervención | Esfuerzo |
|---|---|---|
| 1 | Llenar los 8 `[PLATO POR DEFINIR]` con Nico | Alto — externo |
| 2 | Añadir 2 picos de participación colectiva (Maíz/Raíces y Sal) | Medio |
| 3 | Una frase que justifique René Digital vs. René humano | Bajo |
| 4 | Protocolo del Fragmento olvidado / silla vacía | Bajo |
| 5 | Reaparición del Corazón Territorial en Rescoldo | Bajo |
| 6 | Integrar El Pulso en el relato | Bajo |

Cinco de seis son de bajo esfuerzo. La única grande es el menú, y no depende de ti.

---

## I. Mapping y experiencia escénica

### I1. El relato base ya está resuelto lo suficiente para empezar el mapping

La biblia de transiciones (`08_BIBLIA_DE_TRANSICIONES.md`) es, de hecho, el mejor documento de mapping que tienes, aunque no se llame así. Lo que bloquea el mapping no es el relato: es que no hay plano (D12) y que no hay tiempos reales (dependen del menú).

### I2. Ordena el mapping en cuatro superficies

| Superficie | Función narrativa | Contenido |
|---|---|---|
| S1 · Mesa circular (antesala) | Activación. Es interactiva. | 14 puntos, red de líneas, convergencia, destello |
| S2 · Mesa larga (cámara) | El territorio. El "suelo" del relato. | Grietas, luz en fractura, ceniza, cauces, rutas, cristales, corrientes |
| S3 · Muros y columnas | Escala y atmósfera. | Caída mineral, erosión, salinas, horizonte, apertura al Pacífico |
| S4 · Palapa / techo cónico | Cielo y presión. | Casi siempre vacía. Se usa 3 veces: Fuego, Mar, Rescoldo |

Regla para la biblia visual: **nunca más de dos superficies activas a la vez.**

### I3. Alineación historia ↔ proyección

| Capítulo | Superficie dominante | Intensidad (1-5) | Regla |
|---|---|---|---|
| Prólogo | S1 | 4 | Interactivo. Nada más se proyecta. |
| Fuego | S2 | 5 | Pico. S3 apagado. La mesa es el mundo entero. |
| Ceniza | S2 + S3 | 3 | Descenso. Es la caída después del pico. |
| Maíz | S2 | 3 | La proyección se sincroniza con manos reales. |
| Raíces | S2 | 3 | Rutas. Sin banderas, sin mapas escolares. |
| Sal | S2 + S3 | 2 | Menos es la idea. Blanco mineral, geometría, quietud. |
| Mar | S3 + S4 | 4 | Segundo pico. Apertura. Los muros dejan de ser muros. |
| Brasa | ninguna | 1 | La tecnología retrocede. Sólo luz de apoyo al fuego real. |
| Rescoldo | S2 mínima | 0→1 | Las capas se apagan una a una, no en corte. |

Perfil de intensidad 4-5-3-3-3-2-4-1-0: pico temprano, meseta con respiración, segundo pico, retirada.

### I4. Cinco decisiones técnicas antes de generar contenido

1. **Plano real de La Sal.** Medir, fotografiar, fijar la secuencia de habitaciones (D12).
2. **La mesa circular** es el mayor riesgo técnico y el menos documentado. Recomendación: trigger manual desde control (más confiable). Proyección cenital sin sombra de cuerpos. Prototípala primero.
3. **Sombras.** Con proyección cenital y 14 personas, las manos y cabezas proyectan sombra. Solución gratis: diseñar el contenido para el centro de la mesa (donde no hay manos). Tu contenido ya está diseñado así casi por accidente; consérvalo deliberadamente.
4. **Contingencia sin proyección.** El canon la exige y no existe. Escríbela ahora.
5. **Timecode maestro.** Un solo operador de cues, un solo documento (`06_SHOW_CUE_BY_CUE.md`). Prohibir versiones paralelas.

### I5. Lo que NO hay que hacer

- No generar contenido de mapping antes de tener el menú (los tiempos dependen del emplatado).
- No animar los nueve capítulos de una vez. Prototipa Fuego entero, pruébalo con 14 personas sentadas, y recién entonces produce el resto.
- No añadir efectos porque MadMapper los permite. "Nada entra únicamente porque se ve bonito."

---

## J. Recomendación final — qué haría primero, segundo y tercero

### PRIMERO — Consolidar y decidir (esta semana, sin presupuesto)

1. **Fusionar las dos fuentes maestras.** Mover `RESCOLDO_BIBLIA_STORYTELLING_COMPLETA` dentro de `07_CANON_OPERACION_Y_WEB/rea/content/` como el storytelling oficial, y degradar `03_storytelling_show.md` a documento histórico. Una sola carpeta. Un solo canon. (C1)
2. **Cerrar las 7 contradicciones** en `DECISIONES.md`, con fecha: 14 es formato (D1); TZÓME actor en vivo (D2); "Umbral" sólo el capítulo (D3); créditos con René (D4); protagonista = territorio (H2.5); Raíces plural (D7); QR no NFC (D10).
3. **Reparar `rescoldo.json`:** los 9 capítulos correctos y los estados reales. Media hora. (D6)
4. **Resolver `TZOMÉ | COLIMOTL`:** o se renombra la música, o se ajusta el canon. No publicar nada mientras. (D11)
5. **Decidir el escenario de sede** (G1) y, si aplica, aprobar el nombre.
6. **Rotar la `SKYWORK_API_KEY`.** (E2)

### SEGUNDO — Desbloquear a Nico y construir la reserva (en paralelo)

- **Vía A — Menú (bloquea el show entero).** Enviar a Nico un brief de una página por cada uno de los 8 momentos: emoción, función narrativa, acontecimiento visible, acción del comensal y restricciones de servicio. Pedir explícitamente los dos picos de participación (H2.2).
- **Vía B — Web (no depende de nadie más).** Construir el Portal del Portador primero (el más barato, más impacto, toda la copy ya escrita). Luego el sitio público + reserva de 5 pasos. Desplegar el Experience Lab en una URL privada con contraseña y el JSON corregido. Archivar `rescoldo-site` y los HTML de 207 MB.
- **Vía C — Marca (trabajo de diseño puro).** Producir Ruta A + Ruta B del logo. Entregar como `RESCOLDO_IDENTIDAD_V2`.

### TERCERO — Producir (una vez que exista el menú)

- Levantar el plano real de La Sal y cerrar la secuencia de habitaciones (D12, I4.1).
- Prototipar la mesa circular. El mayor riesgo técnico. Antes que cualquier contenido (I4.2).
- Producir el capítulo Fuego completo de mapping y probarlo con 14 personas sentadas. Sólo entonces producir los otros ocho (I5).
- Diseño industrial del Fragmento, la caja y El Pulso (C7, C9).
- Producir René Digital y los materiales de TZÓME.
- Escribir el plan de contingencia sin proyección (I4.4).
- Función piloto con 14 invitados de confianza, cronometrada, antes de vender la primera.

---

## Una última observación

El riesgo de RESCOLDO no es la calidad. La calidad está. El riesgo es que es un proyecto que produce documentos más rápido de lo que toma decisiones. Hay diez versiones de casi todo y muy pocas cosas marcadas como cerradas de forma irreversible. `DECISIONES.md` tiene 45 decisiones y `PENDIENTES.md` tiene 50 pendientes — y varios pendientes son, en realidad, decisiones que ya se tomaron en otro archivo y nunca se cerraron aquí.

La disciplina que necesita el proyecto ahora no es creativa. Es esta: **cada vez que algo se decida, borrarlo de pendientes, escribirlo en decisiones, y no volver a abrirlo salvo que cambie un hecho.**

Con eso, RESCOLDO se estrena. Sin eso, seguirá siendo el mejor proyecto no terminado.
