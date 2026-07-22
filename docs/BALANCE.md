# FARM LEGACY — BALANCE PATCH 41.7

## Estado de balance

El balance actual es funcional pero todavía está en etapa de prueba. La prioridad reciente fue crear arquitectura escalable. Ahora toca empezar a probar varios días de juego para medir ritmo económico.

---

## Economía inicial

Productos iniciales relevantes:

```text
Huevo: precio inicial 0.62 | rango 0.30 - 0.80
Leche: precio inicial 0.95 | rango 0.50 - 1.20
Lana: precio inicial 1.34 | rango 0.80 - 1.80
Queso: precio inicial 4.30 | rango 3.20 - 5.00
Hilo: precio inicial 3.25 | rango 2.40 - 5.80
Pollo Fresco: precio inicial 8.40 | rango 5.00 - 12.00
Res Fresca: precio inicial 36.00 | rango 25.00 - 45.00
Cordero Fresco: precio inicial 12.00 | rango 9.00 - 18.00
Pollo Empaquetado: precio inicial 15.80 | rango 11.00 - 24.00
Res Empaquetada: precio inicial 82.00 | rango 58.00 - 120.00
Cordero Empaquetado: precio inicial 28.00 | rango 20.00 - 42.00
```

---

## Costos de maquinaria

```text
Taller Textil: 300 | construcción 15 min
Quesería: 450 | construcción 20 min
Empaquetadora de Carne: 750 | construcción 25 min
```

---

## Recetas y rentabilidad conceptual

### Hilo Textil

```text
5 lana → 1 hilo
```

Actualmente es una receta lenta y de valor medio. Debe revisarse porque 5 lana por 1 hilo puede ser exigente si la producción de lana es baja.

### Queso Artesanal

```text
8 leche → 2 queso
```

Debe sentirse como mejora clara sobre vender leche directa, pero no tan fuerte que rompa la economía.

### Pollo Empaquetado

```text
3 pollo fresco → 2 pollo empaquetado
```

Buena primera receta de carne procesada. Debe dar valor extra sin convertir cada pollo en dinero exagerado.

### Res Empaquetada

```text
2 res fresca → 1 res empaquetada
```

Producto premium. Poca demanda, precio alto, alta volatilidad.

### Cordero Empaquetado

```text
2 cordero fresco → 1 cordero empaquetado
```

Intermedio entre pollo y res.

---

## Demanda diaria actual

```text
Huevo: 30
Leche: 18
Lana: 10
Queso: 7
Hilo: 6
Pollo Fresco: 5
Res Fresca: 2
Cordero Fresco: 3
Pollo Empaquetado: 4
Res Empaquetada: 1
Cordero Empaquetado: 2
```

Estas cantidades son para early game y representan compradores disponibles para una granja pequeña.

---

## Mercado y volatilidad

El mercado ahora usa:

- Volatilidad base aproximada 0.095.
- Recuperación de demanda 0.26.
- Variación diaria 0.18.
- Demanda mínima 60% de demanda base.
- Demanda máxima 170% de demanda base.

---

## Puntos que hay que probar

1. ¿El jugador consigue dinero demasiado rápido con carne empaquetada?
2. ¿La Quesería tarda demasiado para el beneficio que da?
3. ¿El Taller Textil vale la pena o se siente lento?
4. ¿La demanda de productos premium es demasiado baja?
5. ¿El mercado baja precios demasiado fuerte cuando se vende mucho?
6. ¿La subida por escasez se entiende y se siente justa?
7. ¿El almacén limita bien o se vuelve molesto?

---

## Recomendación

No hacer grandes cambios de balance sin probar al menos 10-15 días simulados.

El mercado debe sentirse vivo, pero no castigar al jugador de forma invisible. Si baja un precio, la UI debe explicar por qué.


## Patch 40 - Ajuste de balance

Se centralizó parte del balance en `js/modules/balance.js`. El objetivo es poder ajustar dinero inicial, almacenes, demanda, tiempos y costos sin perseguir números por todo el proyecto.

Valores base nuevos:

- Dinero inicial: 120.
- Almacén pequeño: capacidad 12, alquiler 8, costo mejora 90.
- Almacén grande: capacidad 30, alquiler 14, dinero inicial 80, costo mejora 130.
- Demanda diaria más variable, pero presión de precio más controlada.