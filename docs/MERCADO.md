# FARM LEGACY — MERCADO PATCH 41.7

## Visión

El mercado de Farm Legacy debe sentirse como un mercado agrícola vivo: no totalmente aleatorio, pero tampoco rígido. El jugador debe mirar precios, demanda y almacén para decidir si vende hoy, espera o procesa productos.

Estado actual: **mercado dinámico funcional con compra/venta separada, demanda en popup y contratos V1 alrededor**.

---

## Objetivo de diseño

El mercado debe crear decisiones como:

- ¿Vendo huevos hoy o espero a que suba?
- ¿Proceso leche en queso para ganar más?
- ¿Vendo carne fresca o la empaqueto?
- ¿Saturé el mercado vendiendo demasiado?
- ¿Hay escasez que puedo aprovechar?

---

## Módulos involucrados

### `products.js`

Define los productos:

- Precio inicial.
- Precio mínimo.
- Precio máximo.
- Icono.
- Categoría.
- Historial inicial.

### `economy.js`

Decide la economía:

- Demanda diaria.
- Elasticidad.
- Escasez.
- Saturación.
- Recuperación diaria.
- Cambio de precio.

### `market.js`

Muestra e interactúa:

- Tarjetas del mercado.
- Botones vender/comprar.
- Precio de venta.
- Precio de compra.
- Tendencia.
- Demanda detallada dentro del popup del producto.
- Historial visual.
- Estados de mercado.

---

## Estados de mercado

### Normal

El producto se vendió dentro de una zona sana. El precio puede moverse poco.

### Compradores esperando

El jugador tiene producto y todavía no vendió. Puede subir ligeramente si los compradores siguen esperando.

### Escasez

Se vendió algo, pero no se cubrió la demanda. El precio tiende a subir.

### Saturado

Se vendió más de lo que el mercado quería absorber. El precio tiende a bajar.

### Sin actividad

No hubo ventas relevantes. El precio no debe moverse demasiado para evitar balance roto.

---

## Demandas base actuales

Estas demandas representan compradores disponibles para una granja pequeña, no toda una ciudad.

```text
Huevo: 24/día
Leche: 14/día
Lana: 8/día
Queso: 5/día
Hilo: 4/día
Pollo Fresco: 4/día
Res Fresca: 2/día
Cordero Fresco: 2/día
Pollo Empaquetado: 3/día
Res Empaquetada: 1/día
Cordero Empaquetado: 1/día
```

---

## Elasticidad actual

Los productos premium tienen más elasticidad. Eso significa que reaccionan más a escasez o saturación.

```text
Huevo: baja/media
Leche: media
Lana: media
Queso: media/alta
Hilo: alta
Carne fresca: alta
Carne empaquetada: muy alta
```

---

## Fórmula conceptual

Al pasar el día:

```text
ventas del día
↓
comparación con demanda
↓
estado del mercado
↓
presión de precio
↓
ajuste dentro del rango min/max
↓
ajuste de demanda para mañana
↓
reset de vendidoHoy
```

---

## Balance actual

El sistema fue ajustado para early game:

- Huevos y leche tienen demanda mayor.
- Productos procesados tienen demanda menor, pero mayor valor.
- Carnes procesadas son premium y más volátiles.
- Si el jugador no vendió nada y no tiene stock, el precio no debe dispararse sin razón.

---

## Problema pendiente

Aunque mejoró, la pantalla de mercado todavía necesita más pensamiento. No conviene cambiarla a lo loco.

Pendientes para Mercado V3:

- Mejorar explicación visual de por qué sube/baja el precio.
- Separar mejor productos base, procesados y carne.
- Posible pantalla por pestañas.
- Integrar mejor contratos con la lectura del mercado.
- Mejor sensación de mercado agrícola.
- Evitar saturar al jugador con demasiados números.

---

## Propuesta futura Mercado V3

Separar la economía en varias vías:

### Mercado Local

- Compra cantidades pequeñas todos los días.
- Precio normal.
- Bueno para vender rápido.

### Contratos

- Piden cantidades grandes.
- Mejor precio.
- Varios días para cumplir.
- Ideal para dar objetivos.
- Estado actual: Contratos V1 ya existe; falta pulido visual y balance fino.

### Mayorista

- Compra mucho.
- Paga menos.
- Sirve para vaciar almacén.

### Mercado Premium

- Paga mejor por procesados.
- Queso, hilo y carne empaquetada tienen mayor importancia.

---

## Regla futura

`market.js` no debe decidir la economía. Toda fórmula económica debe vivir en `economy.js`.