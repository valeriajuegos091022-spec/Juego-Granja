# PATCH 37 — MOTOR UNIVERSAL DE PRODUCCIÓN

## Objetivo

Este parche convierte la producción industrial de Farm Legacy en un sistema universal y escalable.

Antes, aunque ya existían productos y recetas centrales, todavía quedaba lógica de producción dentro de las acciones de maquinaria.

Ahora el flujo pasa a estar centralizado en:

```text
js/modules/production.js
```

## Archivos nuevos

```text
js/modules/economy.js
js/modules/production.js
```

## Cambios principales

### 1. Motor universal de producción

Nuevo módulo:

```text
production.js
```

Funciones centrales:

```text
validarIngredientesReceta()
consumirIngredientesReceta()
entregarSalidasReceta()
iniciarProcesoProduccionUniversal()
completarProcesoProduccionUniversal()
recogerProcesoProduccionUniversal()
```

Esto significa que Taller Textil, Quesería y futuras máquinas usan el mismo flujo.

### 2. Las máquinas ya no necesitan acciones manuales

En `machines.js`, las acciones se generan automáticamente:

```text
machine-build-ID
machine-produce-ID
machine-collect-ID
machine-ad-ID
```

Para agregar una máquina futura solo se necesita:

```text
1. Producto en products.js
2. Receta en recipes.js
3. Máquina en machines.js
4. Imagen en assets/maquinas/
```

### 3. economy.js queda preparado

Se crea `economy.js` como punto central para reglas económicas futuras.

Por ahora contiene:

```text
volatilidad base
historial máximo
reducción por anuncio
```

En Patch 39 se usará para demanda, escasez, abundancia y recuperación del mercado.

## Flujo final del motor

```text
Jugador pulsa producir
↓
Maquinaria lee su recetaId
↓
production.js valida ingredientes
↓
production.js consume ingredientes
↓
Maquinaria inicia temporizador
↓
Timer marca producto listo
↓
Jugador recoge
↓
production.js entrega salidas
↓
Guardado silencioso
```

## Pruebas obligatorias

- Abrir Maquinarias.
- Construir Taller Textil.
- Producir Hilo.
- Recoger Hilo.
- Construir Quesería.
- Producir Queso.
- Recoger Queso.
- Usar anuncio en construcción.
- Usar anuncio en producción.
- Cerrar/cargar partida con proceso activo.

## Estado

Patch de arquitectura. No añade contenido visible nuevo, pero deja la base lista para Patch 38 — Empacadora.
