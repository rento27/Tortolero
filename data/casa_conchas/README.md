# Datos de La Casa de las Conchas

Semilla para la base de datos del sistema. Fuentes revisadas el 7-nov-2026.

| Archivo | Contenido | Fuente |
|---|---|---|
| `insumos.csv` | 25 insumos con presentación y costo unitario | `Final_Costeo_La_Casa_de_las_Conchas_2021_Final.xlsx` (jul 2021) |
| `productos.csv` | Las 6 conchas que se venden, con costo y utilidad | mismo archivo + cálculo de Pie de Limón |
| `cobertura_pie_de_limon.csv` | Receta y costo de la cobertura de Pie de Limón (rinde 220 g) | Receta de René + costos jul 2021 |
| `costos_fijos.csv` | Gastos fijos mensuales ($28,183.33) | mismo archivo |
| `tandas_masa.csv` | 17 tandas de masa de concha por número de piezas | Notas de René (pegadas en el chat) |
| `niveles_clientes.csv` | Niveles de cliente por frecuencia de compra (Luxury → Oldie) | Nombres tomados de las categorías de la carta |
| `tipos_clientes.csv` | Tipos de cliente: Persona y Las Aliadas (negocios de mayoreo) | Decisión de René (8-nov-2026) |
| `menu_carta.csv` | Carta completa: 36 conchas en 5 categorías (Oldie's, Famosas, Fashion, Luxury, Saladas) | Nota de René con la carta para el local físico (nunca abrió) |

**Decisiones (7-nov-2026):** la tienda vende **solo conchas**. Las hojas "Tío", galletas y chocolate caliente del Excel no entran. Para el hackatón se usan los costos de julio 2021; actualizarlos a 2026 queda pendiente.

**Armado de una concha (jul 2021):** 65 g de masa base ($34.78/kg) + 20 g de cobertura = 85 g. Con eso cuadra el costo de la Concha Vainilla ($2.26 + $1.09 = $3.35).

## Receta base por concha (derivada de `tandas_masa.csv`)

Todas las tandas usan la misma proporción, unos **41.5 g de harina por concha**:

| Insumo | Por concha |
|---|---|
| Harina | 41.5 g |
| Leche | 18.8 g |
| Azúcar | 6.6 g |
| Mantequilla | 4.7 g |
| Manteca | 4.7 g |
| Levadura | 0.8 g |
| Sal | 0.6 g |
| Vainilla | 0.6 g |
| Mejorante | 0.4 g |
| Huevo | 0.1 pieza |

Variantes por cada 5 conchas de 65 g:
- **Mazapán:** 325 g de masa + 20 g de mazapán.
- **Oreo:** 325 g de masa + 125 g de Oreo.

## Lista de insumos del proceso

- **Masa:** harina, mejorante, leche, sal, vainilla, levadura, huevo, azúcar, mantequilla, manteca.
- **Cobertura:** azúcar glass, manteca vegetal, harina, vainilla, mazapán, Oreo.
- **Horneado y empaque:** horno, gas, aceite, papel encerado, bolsa de plástico.

## Datos del negocio (Entregable 1, AMPERSAND, 28-jul-2021)

- Inicio de ventas: **15 de marzo de 2020**, con Vainilla y Chocolate; un mes después, Mazapán, Oreo y Pie de Limón.
- Menú 2021: Vainilla, Chocolate, Mazapán, Oreo, Chocolate Abuelita, Pie de Limón.
- Equipo: Larissa Tortolero (reparto), Connie Roldán (panadera), René Tortolero (panadero).
- Producción artesanal en casa, en Salagua, Manzanillo.
- Volumen: "más de 50 conchas diarias" (Proyecto final 2.0).
- Cliente más frecuente en el mes piloto: mujeres de 30 años en adelante, mayormente amas de casa.
- Competencia: La Princesa ($8 la concha) y La Espiga de Oro ($7).
- Punto de equilibrio (dic 2020): costos fijos $6,300, precio $10, costo variable $0.50; equilibrio en 664 conchas al mes.

## Lo que falta

- **Historial de ventas.** No está en ningún Excel, PDF ni Word revisado en Google Drive, la MacBook ni la carpeta `JOCHIS_SSD/iMAC`. Los documentos dicen que el equipo llevaba "control de los pedidos que llegan al día", así que probablemente están en WhatsApp o en libreta.
- Costo real de la galleta María (se usó un estimado de $60/kg).
- Costo del empaque (charola, kraft, listón, sello), papel encerado y bolsa.
- Actualizar todos los costos a precios de 2026.
