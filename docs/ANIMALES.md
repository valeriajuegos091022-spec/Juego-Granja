# FARM LEGACY — ANIMALES PATCH 41.7

## Estado actual

El sistema de animales es la base productiva del juego. Produce recursos que luego alimentan el mercado y las maquinarias.

Animales principales:

- Gallinas → huevos.
- Vacas → leche y carne de res.
- Ovejas → lana y carne de cordero.
- Pollos/carne de pollo según sistema de matadero/procesamiento.

---

## Relación con productos

Productos base generados por animales:

```text
huevo
leche
lana
carnePollo
carneVaca
carneOveja
```

Estos productos están registrados en `products.js` y alimentan:

- Mercado.
- Almacén.
- Recetas.
- Maquinarias.

---

## Relación con maquinarias

```text
lana → Taller Textil → hilo
leche → Quesería → queso
carnePollo → Empaquetadora → pollo empaquetado
carneVaca → Empaquetadora → res empaquetada
carneOveja → Empaquetadora → cordero empaquetado
```

---

## Diseño futuro

Los animales no deben quedarse solo como generadores automáticos. A futuro pueden tener:

- Calidad.
- Salud.
- Alimentación.
- Producción variable.
- Edad.
- Mejoras por corral.
- Eventos de clima/enfermedad.

---

## Balance pendiente

Hay que revisar si la producción diaria de animales permite sostener las nuevas recetas:

- La receta de queso pide 8 leche.
- La receta de hilo pide 5 lana.
- Las recetas de carne piden 2-3 carnes frescas.

Si el jugador tarda demasiado en juntar recursos, las máquinas pueden sentirse inútiles. Si junta demasiado rápido, se rompe la economía.