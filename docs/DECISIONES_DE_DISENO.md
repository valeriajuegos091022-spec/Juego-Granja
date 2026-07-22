## Patch 44.35 - Decisión: Producción será un centro de control

La pantalla Producción no será otra fábrica ni duplicará Maquinarias. Se define como **Centro de Producción**: una vista transversal de toda la actividad productiva de la granja.

Incluye actualmente:

- Producción animal prevista.
- Estado de maquinarias.
- Procesos activos.
- Productos listos para recoger.
- Espacio libre o sobrecapacidad del almacén.

La estructura usa pestañas para permitir futuras categorías como Cultivos, Frutales o Conservas sin convertir la pantalla en una lista infinita.

# FARM LEGACY — DECISIONES DE DISEÑO PATCH 41.7

## Identidad del juego

Farm Legacy debe sentirse como un juego de granja con economía real, no como un clicker simple.

Tono:

- Rústico.
- Premium.
- Agrícola.
- Con sensación de negocio familiar que crece.

Evitar:

- Estilo infantil excesivo.
- Casino/monedas brillantes exageradas.
- UI demasiado cargada.
- Sistemas ocultos que el jugador no entienda.

---

## Filosofía de sistemas

El juego debe girar alrededor de decisiones:

```text
comprar animales
↓
producir recursos
↓
almacenar o procesar
↓
vender según mercado
↓
invertir en expansión
```

---

## Arquitectura como decisión de diseño

Se decidió construir primero la base escalable:

- Productos centrales.
- Recetas centrales.
- Máquinas como datos.
- Producción universal.
- Economía centralizada.

Esto evita que cada máquina sea un bloque de código diferente.

---

## Mercado

El mercado debe ser volátil, pero lógico.

No queremos:

```text
precio sube porque sí
precio baja porque sí
```

Queremos:

```text
si hay escasez, sube
si hay saturación, baja
si está equilibrado, se mueve poco
```

El jugador debe poder entender la causa.

---

## Maquinarias

Las maquinarias son inversión y progreso.

Deben:

- Costar lo suficiente para sentirse importantes.
- Tardar en construirse.
- Procesar recursos base.
- Aumentar valor de productos.
- Abrir cadenas nuevas.

La Empaquetadora de Carne estableció una decisión importante:

> Una máquina puede tener varias recetas seleccionables.

Esto será útil para máquinas futuras como:

- Molino con varios granos.
- Panadería con varios productos.
- Conservas con frutas/verduras.

---

## Anuncios

Los anuncios deben ser opcionales, no obligatorios.

Uso actual:

- Reducir tiempo de construcción/producción.
- Test con enlace externo.

Futuro:

- AdMob Rewarded Ads.
- Nunca forzar al jugador a ver anuncio para avanzar.

---

## UI

La UI debe priorizar claridad:

- Tarjetas claras.
- Estados visibles.
- Barras de progreso.
- Colores usados con intención.
- Scroll cuando hay muchas tarjetas.

La pantalla de mercado debe seguir mejorándose porque tendrá mucho peso en el juego.