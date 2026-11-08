# Prompts para Codex — La Casa de las Conchas OS

Pégalos **uno por uno y en orden**. No pases al siguiente hasta que el anterior funcione (`npm run build` sin errores).

Antes de empezar, en la Mac:
1. Finder → `Documents/02_PROYECTOS_CODIGO/Activos/Dev/lasal/lasal-os-saas-evergent` → clic derecho → **Descargar ahora**.
2. Clona `rento27/Tortolero` y ten a la mano `docs/PROPUESTA_CASA_DE_LAS_CONCHAS.md` y la carpeta `data/casa_conchas/`.
3. Crea el proyecto nuevo de Supabase y genera las llaves de pey y OpenAI. **No las pegues en los prompts**: van solo en `.env.local`.

---

## Prompt 0 — Contexto (pégalo primero, en todas las sesiones nuevas)

```
Vas a construir "La Casa de las Conchas OS", la plataforma de una panadería artesanal de conchas en Manzanillo, Colima (México). Es para el hackatón OpenAI DevDay × pey; la entrega es el domingo 8 de noviembre a la 1:00 PM.

Reglas del proyecto:
- Stack: Next.js (App Router) + TypeScript + Tailwind + Supabase (Postgres, Auth, RLS) + Vercel AI SDK con @ai-sdk/openai. Deploy en Vercel.
- Pagos: API de pey (CoDi). Base URL https://api.pey.mx. Auth: header "Authorization: Bearer <PEY_API_KEY>". Documentación: https://docs.pey.mx
- Idioma de la interfaz: español de México. Moneda MXN.
- Llaves solo en variables de entorno del servidor: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, PEY_API_KEY, PEY_WEBHOOK_SECRET, OPENAI_API_KEY, PEY_DEMO_AMOUNT. Nunca expongas PEY_API_KEY, SUPABASE_SERVICE_ROLE_KEY ni OPENAI_API_KEY al cliente.
- Modo demo: si PEY_DEMO_AMOUNT está definido (ej. 0.01), todos los cobros a pey se mandan por ese monto, aunque el pedido diga otra cosa. La interfaz muestra el monto real.
- Datos de clientes en la demo: ficticios. Nunca uses datos personales reales.
- Lee docs/PROPUESTA_CASA_DE_LAS_CONCHAS.md y data/casa_conchas/README.md antes de escribir código. Son la fuente de verdad del negocio.

Marca: "La Casa de las Conchas", slogan "Rico sabor en cada mordida", color principal rosa pálido, estilo nostalgia de los 90, empaque kraft con listón.

Producto: solo conchas de 85 g (65 g de masa + 20 g de cobertura). Para vender hoy están costeadas: Vainilla, Chocolate, Mazapán, Oreo, Abuelita y Pie de Limón. La carta completa está en data/casa_conchas/menu_carta.csv, en 5 categorías: Las Oldie's, Las Famosas, Las Fashion, Luxury Concha y Saladas; los productos sin costear se muestran como "Próximamente". Paquetes: 6 conchas por $60 y 12 por $120, con envío a domicilio incluido. La concha Abuelita cuesta $12 suelta.

Confirma que entendiste en 5 líneas y espera el siguiente prompt.
```

---

## Prompt 1 — Base del proyecto (reutilizando LaSal OS)

```
Crea el proyecto nuevo "casa-conchas-os" tomando como base el código de LaSal OS en ~/Documents/02_PROYECTOS_CODIGO/Activos/Dev/lasal/lasal-os-saas-evergent. Copia el código a una carpeta nueva; NO modifiques el proyecto original.

Conserva y adapta:
- POS / comandera (src/app/(protected)/pos), caja, corte X y corte Z.
- KDS (lo vamos a convertir en "Producción").
- Menú digital con QR y consentimiento de privacidad (src/app/menu-digital, src/app/menu, src/app/gate).
- Recetas, almacén (catálogo, stock, pedidos, proveedores), CRM y dashboard.
- Impresión (src/app/print, print_jobs, scripts/print-agent.mjs).
- El componente src/components/menu-concierge.tsx y /api/menu-assistant.

Elimina por completo (rutas, componentes, tipos, migraciones y entradas de menú): mesas, tables, pesca, recepcion-pesca, transferencias-pesca, lasalfy, ptt, academy, horarios, socios, briefing, onboarding, administracion/rg-legacy, mockups, intro, whatsapp, facturacion, propinas y tronco, ProteinLockEvent.

Roles: deja solo "dueno", "mostrador" y "repartidor". Elimina los demás de UserRole y de RBAC.

Cambia el branding a La Casa de las Conchas (nombre, colores rosa pálido, logo de texto provisional).

Al terminar: npm run build sin errores, y dame la lista de lo que borraste y de lo que quedó.
```

---

## Prompt 2 — Esquema de Supabase y datos semilla

```
Crea una migración nueva en supabase/migrations con este esquema (con RLS activado en todas las tablas y políticas por rol: dueno ve todo; mostrador ve pedidos, pagos, producción y clientes; repartidor solo sus entregas):

products(id, nombre, sabor, tipo ['concha','paquete'], precio, costo_insumos, costo_operar, peso_g, activo, foto_url)
package_items(package_id, cantidad_piezas)  -- paquetes de 6 y 12, sabores a elegir
insumos(id, nombre, proveedor, unidad, costo_unitario, stock_actual, stock_minimo, ubicacion ['secos','refrigerador','empaque'])
recipes(id, product_id, nombre, rendimiento_g)
recipe_lines(recipe_id, insumo_id, cantidad, unidad)
customers(id, tipo ['persona','aliada'], nombre, negocio, telefono, email, direccion, colonia, consentimiento, marketing_opt_in, primera_compra, ultima_compra, num_compras, gasto_total, puntos, nivel, segmento_rfm)
orders(id, customer_id, canal ['mostrador','tienda','asistente'], tipo ['recoger','domicilio'], entrega_programada, direccion, estado ['abierto','en_cobro','pagado','en_produccion','listo','en_camino','entregado','cancelado'], subtotal, descuento, total, creado_en)
order_items(id, order_id, product_id, sabor, cantidad, precio_unitario, total_linea)
payment_splits(id, order_id, customer_id, monto, metodo ['codi','efectivo','tarjeta'], estado ['pendiente','pagado','expirado','cancelado'], pey_qr_id, pey_num_ref, pey_transaction_id, qr_payload, expira_en, pagado_en)
split_items(split_id, order_item_id, cantidad)
webhook_events(id, proveedor, tipo, transaction_id UNIQUE, payload jsonb, procesado_en)
loyalty_ledger(id, customer_id, order_id, split_id, puntos, motivo, creado_en)
production_batches(id, fecha, sabor, piezas_planeadas, piezas_hechas, estado)
deliveries(id, order_id, repartidor_id, estado, salida_en, entregado_en)
cash_closures(id, tipo ['corte_x','corte_z'], total_codi, total_efectivo, total_tarjeta, efectivo_contado, diferencia, creado_en)
fixed_costs(id, concepto, tipo, costo_mensual)
customer_levels(nivel, orden, min_compras_30d, max_compras_30d, descripcion)

Restricciones obligatorias:
- La suma de payment_splits.monto (no cancelados) de un pedido nunca puede superar orders.total (usa una función/trigger en Postgres).
- webhook_events.transaction_id es UNIQUE.

Crea un script scripts/seed.mjs que cargue los CSV de data/casa_conchas/:
- productos.csv → products (las 6 conchas costeadas) + 2 paquetes (6 por $60, 12 por $120).
- menu_carta.csv → agrega la columna categoria a products y carga el resto de la carta con activo=false y precio vacío ("Próximamente").
- insumos.csv → insumos.
- costos_fijos.csv → fixed_costs.
- niveles_clientes.csv → customer_levels.
- tandas_masa.csv → úsalo para crear la receta "Masa base" por concha (41.5 g harina, 18.8 g leche, 6.6 g azúcar, 4.7 g mantequilla, 4.7 g manteca, 0.8 g levadura, 0.6 g sal, 0.6 g vainilla, 0.4 g mejorante, 0.1 huevo).
- cobertura_pie_de_limon.csv → receta "Cobertura Pie de Limón".
Además genera 40 clientes ficticios tipo persona, 5 negocios ficticios tipo aliada con pedidos recurrentes, y 60 días de ventas de ejemplo (~50 conchas diarias, con más vainilla y chocolate, y algunos clientes que compran casi diario) para que la matriz y los niveles tengan datos.

Al terminar: corre la migración y el seed contra mi Supabase y muéstrame el conteo de filas por tabla.
```

---

## Prompt 3 — Cuentas divididas y cobro con pey (CoDi)

```
Implementa el cobro con cuentas divididas. Es la función más importante de la demo.

En la pantalla de Caja, al cobrar un pedido, el usuario elige cómo dividir:
1. Partes iguales: total ÷ N. Los centavos que sobren van a la última parte.
2. Por productos: cada parte selecciona qué order_items (y cuántas piezas) cubre.
3. Montos libres: cada parte captura su monto.
4. Mixto: algunas partes por productos y el resto en partes iguales.
Cada parte elige método: CoDi, efectivo o tarjeta. Cada parte puede asignarse a un cliente distinto.

Para cada parte con método CoDi:
- Server action/route: POST https://api.pey.mx/codi/qr con body { amount, concept, expiration: 600, numRef } donde numRef = `${orderId}-${n}`. Si PEY_DEMO_AMOUNT existe, amount = PEY_DEMO_AMOUNT.
- Guarda pey_qr_id, pey_num_ref, qr_payload y expira_en en payment_splits.
- Muestra el QR con qrcode.react y un contador de expiración. Si expira, botón "Regenerar QR" solo para esa parte.

Webhook: crea /api/webhooks/pey (POST).
- Verifica la firma del header "webhook-signature" con Standard Webhooks (paquete "standardwebhooks") usando PEY_WEBHOOK_SECRET. Si falla, responde 401.
- Inserta en webhook_events; si transaction_id ya existe, responde 200 sin hacer nada (idempotencia).
- Para el evento "codi.qr.payment_received": busca la parte por codiQrId o numRef, márcala pagada (pagado_en = datePaid), y si la suma pagada = total del pedido, pasa el pedido a "pagado" y luego a "en_produccion".
- Suma puntos en loyalty_ledger al cliente de esa parte: 1 punto por cada $10 del monto REAL de la parte.

Efectivo y tarjeta se marcan pagados con un botón en caja.

En la pantalla del pedido muestra en vivo (Supabase Realtime): "Pagado $X de $Y — faltan N partes", con el estado de cada parte.

Reglas: nunca permitir que la suma de partes supere el total; si se agregan productos a un pedido con partes pagadas, la diferencia crea una parte nueva.

Corte X/Z: separa totales por método (CoDi, efectivo, tarjeta) sumando payment_splits pagados.

Pruebas: escribe tests de la lógica de división (centavos, mixto, no exceder el total) y del webhook (firma inválida, evento repetido).
```

---

## Prompt 4 — Tienda en línea con asistente de IA

```
Convierte el menú digital en la tienda pública de La Casa de las Conchas (ruta "/"):
- Catálogo organizado por categoría (Las Oldie's, Las Famosas, Las Fashion, Luxury Concha, Saladas), con foto (placeholder si no hay), precio y descripción. Los productos activos se pueden comprar; los demás aparecen como "Próximamente".
- Armado de paquete: el cliente elige los sabores hasta completar 6 o 12.
- Carrito, datos de entrega (nombre, teléfono, dirección, colonia, fecha y hora), aviso de privacidad y consentimiento (reutiliza el de LaSal OS).
- Al confirmar, crea el pedido y lleva al cobro con QR CoDi (puede dividir la cuenta igual que en caja).

Asistente de pedidos (reutiliza menu-concierge.tsx, cambiando el proveedor a OpenAI con @ai-sdk/openai):
- Chat donde el cliente escribe, por ejemplo: "quiero 12, mitad Oreo y mitad mazapán, para mañana en Salagua".
- Usa tool calling con estas herramientas: listar_productos, agregar_al_carrito, ver_carrito, calcular_total, crear_pedido.
- Solo puede ofrecer productos que existen en la tabla products; si piden algo que no hay, lo dice.
- Antes de crear el pedido, confirma sabores, cantidad, dirección y hora.
- Sugerencias de venta: si el carrito tiene 6, ofrece subir a 12; recomienda los productos marcados como "estrella" o "enigma" (prompt 6).
- Tono: cálido, mexicano, breve, con el slogan "Rico sabor en cada mordida".

Usa el modelo de OpenAI desde una variable de entorno OPENAI_MODEL.
```

---

## Prompt 5 — Producción, almacén y entregas

```
1. Convierte el KDS en "Producción":
   - Tablero del día agrupado por hora de entrega y por sabor: "Vainilla: 18 piezas, Chocolate: 12…".
   - Botón "Generar tanda" que calcula la masa con la receta base × piezas (igual que data/casa_conchas/tandas_masa.csv) y las coberturas por sabor.
   - Estados del pedido: en_produccion → listo → en_camino → entregado.
2. Almacén: al marcar una tanda como hecha, descuenta los insumos del stock según la receta. Alerta cuando un insumo baje del mínimo.
3. Entregas: vista móvil para el repartidor con sus pedidos del día, dirección y botón "Entregado".
4. Impresión: ticket del pedido y etiqueta para el empaque (nombre del cliente, sabores, hora), reutilizando print_jobs.
```

---

## Prompt 6 — Ingeniería de menú (estrella, vaca, enigma, perro)

```
Crea una vista SQL "menu_engineering" sobre order_items pagados + products, para un periodo seleccionable (últimos 30 días por defecto):
- Popularidad: participación de cada sabor en piezas vendidas. Es "alta" si es ≥ (1 / número de sabores) × 0.70 (método Kasavana-Smith).
- Margen: contribución = precio sin IVA − (costo_insumos + costo_operar). Es "alto" si es ≥ la contribución promedio ponderada por ventas.
- Clasificación: alta popularidad + alto margen = Estrella; alta + bajo = Vaca; baja + alto = Enigma; baja + bajo = Perro.

En el panel del dueño:
- Gráfica de cuadrantes (Recharts, ya está en el proyecto) con cada sabor.
- Tabla con piezas, ingreso, contribución y clasificación.
- Botón "Pedir recomendación": manda la tabla a OpenAI y muestra 3 acciones concretas (ej. "La Oreo deja $0.22 por pieza: sube el precio a $12 o métela solo en paquetes").
```

---

## Prompt 7 — Niveles de clientes, RFM y lealtad

```
1. Niveles por frecuencia (tabla customer_levels, escala propia del negocio):
   - Luxury: 12 o más compras en los últimos 30 días (casi diario).
   - Fashion: 4 a 11 (semanal).
   - Famosa: 2 a 3 (quincenal).
   - Oldie: 0 a 1 (mensual o cliente nuevo).
   Los nombres vienen de las categorías de la carta de La Casa de las Conchas.
   Los niveles solo aplican a clientes tipo "persona".
1b. Tipo de cliente "Las Aliadas" (customers.tipo = 'aliada'): negocios que compran para revender o servir (ej. Chantilly, Vida Café, Restaurante Bambú, Café Río, Los 3 Potrillos; usa nombres ficticios en la demo).
   - Ficha con nombre del negocio, contacto, dirección y días/horario de entrega.
   - Pedidos recurrentes: "cada martes y viernes, 24 conchas surtidas" que se generan solos y entran a Producción.
   - Vista "Las Aliadas" en el CRM con piezas por mes, último pedido y alerta si un negocio deja de pedir más de 14 días.
   Calcula el nivel de cada cliente con una función/vista que se recalcule al confirmarse cada pago. Los rangos se editan desde configuración.
2. RFM: R = días desde la última compra, F = compras en 180 días, M = gasto en 180 días; puntaje 1–5 por quintil. Segmentos: Campeón, Leal, Nuevo, En riesgo (F ≥ 3 y más de 21 días sin comprar), Perdido (más de 60 días).
3. Lealtad: 1 punto por cada $10 pagados; 100 puntos = paquete de 6 gratis (canjeable en caja).
4. CRM: ficha del cliente con nivel, segmento, sabor favorito, historial y puntos. Lista filtrable por nivel y segmento.
5. Botón "Mensaje de recuperación" para clientes en riesgo: OpenAI redacta un mensaje corto y personalizado (con su sabor favorito) listo para copiar a WhatsApp.
```

---

## Prompt 8 — Panel del dueño y preparación de la demo

```
1. Panel del dueño: ventas del día y del mes, piezas por sabor, ticket promedio, cobros por método (CoDi, efectivo, tarjeta), clientes por nivel y la matriz del prompt 6.
2. Punto de equilibrio: con fixed_costs y el margen promedio, muestra cuántas conchas al mes se necesitan para no perder.
3. Analista con IA: caja de texto donde el dueño pregunta ("¿cuánto vendí esta semana?", "¿qué sabor me conviene empujar?") y OpenAI responde usando consultas a la base (tool calling con funciones de solo lectura).
4. Modo demo: un botón en el panel que reinicia los datos de ejemplo.
5. Revisión final:
   - npm run build y los tests sin errores.
   - Deploy a Vercel con las variables de entorno.
   - Configura en el portal de pey la URL del webhook: https://<mi-dominio>/api/webhooks/pey
   - Haz un pago real de $0.01 dividido en 2 partes desde dos celulares y confirma que el pedido pasa a "pagado" y a Producción.
6. Escribe README.md con: qué es, cómo correrlo, variables de entorno, arquitectura y cómo se usa pey.
```

---

## Guion del video de demo (1:30 min)

1. **(0:00–0:15) Problema:** "La Casa de las Conchas vendía más de 50 conchas diarias por WhatsApp, cobraba en efectivo o por transferencia y no sabía qué sabor le dejaba ganancia."
2. **(0:15–0:40) Pedido con IA:** un cliente escribe en el chat "12 conchas, mitad Oreo y mitad mazapán, para mañana" y el asistente arma el pedido.
3. **(0:40–1:00) Cuenta dividida con CoDi:** se divide en 2. Dos celulares escanean dos QR de $0.01 y la pantalla pasa de "1 de 2 pagado" a "Pagado".
4. **(1:00–1:15) Producción:** el pedido aparece en el tablero de producción con la tanda calculada.
5. **(1:15–1:30) Panel del dueño:** la matriz muestra que la Oreo es "Vaca" (3% de utilidad), la IA recomienda subirle el precio, y un cliente nivel "Luxury" recibe su mensaje de lealtad.

## Correo de entrega (a hola@aibuilders.lat)

```
Asunto: Entrega hackatón OpenAI DevDay — La Casa de las Conchas OS

Hola, equipo de AI Builders:

Les comparto nuestro proyecto para el hackatón.

Proyecto: La Casa de las Conchas OS
Equipo: René Manuel Tortolero Roldán
Qué hace: plataforma para una panadería artesanal de Manzanillo que toma pedidos con IA (OpenAI), cobra con CoDi a través de pey (incluyendo cuentas divididas, cada parte con su propio QR), manda los pedidos a producción y le dice al dueño qué sabor le conviene vender (ingeniería de menú) y qué clientes recuperar.

Demo: <URL de Vercel>
Video: <URL del video>
Código: <URL del repositorio>

Saludos,
René Tortolero
```
