# La Casa de las Conchas OS — Propuesta de reutilización de LaSal OS

**Fecha:** 7 de noviembre de 2026
**Para:** Hackatón OpenAI DevDay × pey (entrega: domingo 8 de noviembre, 1:00 PM)
**Estrategia:** tomar el código de LaSal OS, quitar lo que no aplica y hacer cambios pequeños. No se reescribe desde cero.

---

## 1. Fuentes encontradas

| Fuente | Dónde | Qué aporta |
|---|---|---|
| Plan de mercado "La Casa de las Conchas" (UTeM, nov 2020) | Google Drive | Producto, sabores, paquetes, empaque, mercado de Manzanillo |
| "La Casa de las Conchas — Desarrollo de imagen" | Google Drive | Slogan, color, logo, promociones, servicio al cliente |
| LaSal OS (`lasal-os-saas-evergent`) | MacBook `~/Documents/02_PROYECTOS_CODIGO/Activos/Dev/lasal/` (iCloud) | Código base: Next.js 16 + Supabase + Vercel AI SDK |
| `COSTOS_LASAL.xlsx` (actualizado 25-ene-2026) | Google Drive | Costos reales de insumos y proveedores de Manzanillo |
| `LIBRO DE COSTOS LA SAL FINAL.xlsx` | Google Drive | Recetario costeado y estructura de clasificación de menú |
| Documento maestro LaSal (ene 2026) | MacBook | Reglas de negocio: VIP, descuentos, autorizaciones, reportes |
| Documentación de pey | https://docs.pey.mx | API de CoDi: QR, push, links de pago, webhooks |

### Datos del negocio

- **Producto:** conchas gourmet de 45 g con porción idéntica.
- **Sabores:** Vainilla, Chocolate, Mazapán, Oreo, Froot Loops, Pay de Limón.
- **Paquetes:** 6 por $60 y 12 por $120, con envío a domicilio incluido.
- **Empaque:** charola de cartón, papel kraft, listón curling y sello de la casa.
- **Marca:** "Rico sabor en cada mordida", color rosa pálido, concepto de nostalgia de los 90.
- **Mercado:** Manzanillo, Colima (Santiago, Salagua, Valle de las Garzas, zona industrial).

---

## 2. Qué se reutiliza de LaSal OS

### Se queda (con cambios pequeños)

| Módulo LaSal OS | Ruta actual | Uso en Conchas | Cambio |
|---|---|---|---|
| Comandera / POS | `/pos`, `/pos/ticket/[id]` | Venta en mostrador y captura de pedidos | Quitar mesas y meseros; agregar pedido a domicilio |
| Caja | `/caja` | Cobro | **Pagos divididos** y CoDi con pey (ver sección 4) |
| Corte X / Z | `/corte-x`, `/corte-z` | Cierre del día | Sumar por método: CoDi, efectivo, tarjeta |
| KDS | `/kds` | **Producción** | Zona "horno" en lugar de cocina/barra; agrupar por sabor y hora de entrega |
| Menú digital con QR | `/menu-digital`, `/menu`, `/gate` | **Tienda en línea** | Catálogo de conchas y paquetes; mismo consentimiento de privacidad |
| Recetario | `/recetas` | Receta y costo por concha | Se reutiliza `theoreticalCost` de `MenuItem` |
| Almacén | `/almacen/catalogo`, `/almacen/stock`, `/almacen/pedidos`, `/almacen/proveedores` | Insumos y empaque | Ubicaciones: secos, refrigerador, empaque; quitar pesca y congeladores |
| CRM | `/crm`, `/crm/[id]` | Clientes | Agregar última compra, RFM, puntos y nivel |
| Dashboard | `/dashboard` | Panel del dueño | Agregar ingeniería de menú y RFM |
| Impresión | `/print/*`, `print_jobs`, `scripts/print-agent.mjs` | Ticket y etiqueta del pedido | Sin cambios |
| Menu concierge (IA) | `src/components/menu-concierge.tsx`, `/api/menu-assistant` | Asistente que toma pedidos | Cambiar de Ollama a la API de OpenAI |
| WhatsApp | `/whatsapp/*` | Fase 2: recuperar clientes en riesgo | Ocultar para la demo |
| Facturación CFDI | `/facturacion` | Fase 2 | Ocultar para la demo |

### Se quita (no aplica a una panadería)

`/mesas`, `/tables`, `/cocina/pesca`, `/recepcion-pesca`, `/almacen/recepcion-pesca`, `/almacen/transferencias-pesca`, `/lasalfy`, `/ptt`, `/academy`, `/horarios`, `/socios`, `/briefing`, `/onboarding`, `/administracion/rg-legacy`, `/mockups`, `/intro`, el módulo de propinas y tronco, y la parte de `ProteinLockEvent`.

### Roles

LaSal OS tiene 17 roles (con `dueno` y `owner` duplicados). Se reducen a 3:

| Rol | Puede |
|---|---|
| `dueno` | Todo, incluidos costos, reportes y descuentos |
| `mostrador` | Vender, cobrar, ver producción, cerrar caja |
| `repartidor` | Ver sus entregas y marcarlas como entregadas |

---

## 3. Modelo de datos (Supabase, cuenta nueva)

Se toman los tipos de `src/lib/types.ts` de LaSal OS y se ajustan:

```
products            id, nombre, tipo (concha|paquete|extra), sabor, precio, costo_receta, activo, foto_url
package_items       package_id, product_id (o "sabor libre"), cantidad
recipes             product_id, rendimiento_piezas, notas
recipe_lines        recipe_id, insumo_id, cantidad, unidad
insumos             id, nombre, codigo, proveedor, unidad, costo_unitario, stock_actual, stock_minimo, ubicacion
customers           id, nombre, telefono, email, direccion, colonia, consentimiento, marketing_opt_in,
                    primera_compra, ultima_compra, num_compras, gasto_total, puntos, nivel, segmento_rfm
orders              id, customer_id, canal (mostrador|tienda|asistente), tipo (recoger|domicilio),
                    entrega_programada, direccion, estado (abierto|en_cobro|pagado|en_produccion|
                    listo|en_camino|entregado|cancelado), subtotal, descuento, total, creado_en
order_items         id, order_id, product_id, sabor, cantidad, precio_unitario, total_linea
payment_splits      id, order_id, customer_id, monto, metodo (codi|efectivo|tarjeta),
                    estado (pendiente|pagado|expirado|cancelado), pey_qr_id, pey_num_ref,
                    pey_transaction_id, qr_payload, expira_en, pagado_en
split_items         split_id, order_item_id, cantidad
webhook_events      id, proveedor, tipo, transaction_id (único), payload, procesado_en
loyalty_ledger      id, customer_id, order_id, split_id, puntos, motivo, creado_en
production_batches  id, fecha, sabor, piezas_planeadas, piezas_hechas, estado
deliveries          id, order_id, repartidor_id, estado, salida_en, entregado_en
cash_closures       id, tipo (corte_x|corte_z), total_codi, total_efectivo, total_tarjeta,
                    efectivo_contado, diferencia, creado_en
```

**Mejora frente a LaSal OS:** el ticket de LaSal OS admite un solo `paymentMethod`. Aquí un pedido tiene varios `payment_splits`.

---

## 4. Cuentas divididas (obligatorio)

### Formas de dividir
1. **Partes iguales:** total ÷ personas; los centavos que sobran van a la última parte.
2. **Por productos:** cada parte cubre productos específicos (`split_items`).
3. **Montos libres:** cada parte define su monto.
4. **Mixto:** combinación de las anteriores.

Cada parte puede pagarse con CoDi, efectivo o tarjeta.

### Flujo con pey
1. Cada parte con método CoDi llama a `POST https://api.pey.mx/codi/qr` con
   `{ amount, concept, expiration, numRef }`, donde `numRef` = `<order_id>-<n>`.
2. El QR se muestra en pantalla (componente `qrcode.react`, que ya existe en LaSal OS).
3. pey envía el webhook `codi.qr.payment_received` con `codiQrId`, `numRef` y `transactionId`.
4. El servidor verifica la firma (`webhook-signature`, Standard Webhooks), busca la parte por `numRef`/`codiQrId` y la marca como pagada.
5. Cuando la suma de partes pagadas = total, el pedido pasa a `pagado` y entra a producción.

### Reglas
- La suma de las partes nunca supera el total.
- Si se agregan productos con partes ya pagadas, la diferencia crea una parte nueva.
- `webhook_events.transaction_id` es único: un webhook repetido no se procesa dos veces.
- Un QR expirado se regenera solo para esa parte.
- Cada parte puede asignarse a un cliente distinto y genera puntos a ese cliente.
- **Modo demo:** variable `PEY_DEMO_AMOUNT=0.01`; cada QR cobra $0.01 sin importar el monto real (los pagos de prueba no se devuelven).

---

## 5. Costos (estimados con precios reales del libro de costos de LaSal)

Precios de insumos tomados de `COSTOS_LASAL.xlsx` (25-ene-2026):

| Insumo | Proveedor | Costo |
|---|---|---|
| Harina de trigo (costal 44 kg) | Molino Central | $17.20 / kg |
| Azúcar estándar | Frutería Rosita | $25.80 / kg |
| Mantequilla entera | Abarrotes Vejarano | $216.00 / kg |
| Huevo fresco | Frutería Rosita | $45.00 / kg |
| Leche entera | Sam's | $26.34 / L |
| Levadura fresca | Abarrotes Vejarano | $57.50 / kg |
| Sal de Colima | Salineras Cuyutlán | $2.60 / kg |
| Vainilla Molina | Abarrotes Raúl | $73.30 / L |
| Mazapán | Buonissimo | $109.00 / L |
| Chocolate de mesa | Abarrotes Vejarano | $128.57 / kg |

### Costo estimado de una concha de vainilla (lote de 24 piezas)

| Ingrediente | Cantidad | Costo |
|---|---|---|
| Harina (masa + cubierta) | 720 g | $12.38 |
| Azúcar (masa + cubierta) | 240 g | $6.19 |
| Mantequilla (masa + cubierta) | 190 g | $41.04 |
| Huevo | 150 g | $6.75 |
| Leche | 200 ml | $5.27 |
| Levadura fresca | 25 g | $1.44 |
| Sal | 8 g | $0.02 |
| Vainilla | 5 ml | $0.37 |
| **Total del lote** | | **$73.46** |
| **Por concha** | | **$3.06** |
| Con 10% de merma y gas | | **≈ $3.40** |

**SUPUESTOS (validar con René):** la fórmula del lote es una receta estándar de concha, no la "receta secreta" de la casa. El empaque (charola, kraft, listón y sello) se estima en $8 por paquete. Los sabores con relleno o cubierta especial (Oreo, Froot Loops, Mazapán, Pay de Limón) suman entre $0.50 y $1.50 por pieza.

Con precio de $10 por concha (6 × $60), el costo de alimento queda cerca del 34% para vainilla, antes de empaque.

---

## 6. Ingeniería de menú (estrella, vaca, enigma, perro)

Matriz de Kasavana y Smith (1982), adaptación de la matriz BCG. Se calcula por producto en un periodo:

- **Popularidad:** el producto es popular si su participación en ventas ≥ 70% de la participación promedio (`(1 / número de productos) × 0.7`).
- **Margen:** contribución = precio − costo. Es alto si es ≥ la contribución promedio ponderada.

| Clasificación | Popularidad | Margen | Acción sugerida por la IA |
|---|---|---|---|
| Estrella | Alta | Alto | Mantener calidad, destacar en tienda |
| Vaca / Caballo de batalla | Alta | Bajo | Subir precio poco a poco o meter en paquete |
| Enigma | Baja | Alto | Recomendarlo más, mejor foto, posición destacada |
| Perro | Baja | Bajo | Rediseñar o retirar |

Se implementa como **vista SQL** sobre `order_items` + `products.costo_receta`, y el panel la muestra como gráfica de cuadrantes.

---

## 7. Clientes: RFM y lealtad

### RFM
- **R (recencia):** días desde `ultima_compra`.
- **F (frecuencia):** `num_compras` en los últimos 180 días.
- **M (monto):** `gasto_total` en los últimos 180 días.
- Puntaje 1 a 5 por quintiles en cada dimensión.

| Segmento | Regla | Acción |
|---|---|---|
| Campeón | R ≥ 4, F ≥ 4, M ≥ 4 | Recompensa exclusiva, probar sabores nuevos |
| Leal | F ≥ 4 | Puntos dobles en su sabor favorito |
| Nuevo | 1 compra, R ≥ 4 | Bienvenida y cupón para la segunda compra |
| En riesgo | F ≥ 3 y más de **21 días** sin comprar | Mensaje de recuperación con promoción |
| Perdido | Más de **60 días** sin comprar | Campaña de reactivación |

En LaSal el corte de riesgo es de 90 días. **En una panadería se compra más seguido, por eso los cortes son de 21 y 60 días** (ajustables en configuración).

### Lealtad
- 1 punto por cada $10 pagados (se registra en `loyalty_ledger` al confirmarse cada parte del pago).
- 100 puntos = 1 paquete de 6 gratis.
- Niveles (nombres por definir; propuesta con sabores): **Vainilla** (0–299 pts históricos), **Chocolate** (300–999), **Mazapán** (1,000+).

**PENDIENTE:** René quiere usar la escala de nombres de Nico (tiburón, atún, etc.). No se encontró en Drive, la MacBook ni el SSD. Falta que René la confirme.

---

## 8. Paquetes para ampliar la oferta

Propuestas (precios por validar):

| Paquete | Contenido | Precio sugerido |
|---|---|---|
| Media docena | 6 conchas, sabores a elegir | $60 (actual) |
| Docena | 12 conchas, sabores a elegir | $120 (actual) |
| Caja Noventera | 12 conchas, los 6 sabores × 2, empaque especial | $135 |
| Desayuno para 2 | 4 conchas + 2 cafés de olla | $95 |
| Oficina | 24 conchas surtidas, entrega programada | $230 |
| Suscripción semanal | 6 conchas cada semana, mismo día | $55 por semana |
| Tarjeta de regalo | Monto libre, link de pago de pey | Variable |

Los paquetes se cobran con link de pago de pey (`POST` a payment links) cuando son pedidos anticipados.

---

## 9. IA (API de OpenAI)

Se reemplaza Ollama vía túnel de Cloudflare (inestable) por la API de OpenAI, usando el `@ai-sdk/openai` que ya está en `package.json`.

| Función | Dónde | Qué hace |
|---|---|---|
| Asistente de pedidos | Tienda | Toma el pedido en lenguaje natural, solo con el catálogo real, y arma el carrito con herramientas (`agregar_producto`, `calcular_total`, `crear_pedido`) |
| Divisor inteligente | Caja | "Somos 3, yo pago las de Oreo" → propone las partes |
| Analista del dueño | Panel | Explica la matriz y el RFM: qué empujar, qué precio ajustar, a quién recuperar |
| Mensajes de recuperación | CRM | Redacta mensajes personalizados para clientes en riesgo |

---

## 10. Plan de entrega

| Paso | Qué | Quién |
|---|---|---|
| 0 | Copiar LaSal OS a un repo nuevo y descargar todo de iCloud | René en la Mac |
| 1 | Crear proyecto nuevo de Supabase y variables de entorno | René |
| 2 | Quitar módulos que no aplican y reducir roles | Codex |
| 3 | Nuevo esquema de base de datos (sección 3) + datos semilla | Codex |
| 4 | Pagos divididos + integración pey + webhook | Codex |
| 5 | Tienda + asistente de pedidos con OpenAI | Codex |
| 6 | Producción (KDS) + almacén con insumos reales | Codex |
| 7 | Lealtad + RFM | Codex |
| 8 | Ingeniería de menú + panel | Codex |
| 9 | Pruebas con pagos reales de $0.01 + video de demo | René |
| 10 | Envío a hola@aibuilders.lat antes del domingo 1:00 PM | René |

---

## 11. Privacidad

- La demo usa **clientes ficticios**. No se importa `La Sal - Base de datos Clientes.csv` ni datos del personal.
- Se mantiene el consentimiento de privacidad del menú digital de LaSal OS.
- Las llaves de pey y OpenAI van solo en variables de entorno del servidor, nunca en el frontend.
