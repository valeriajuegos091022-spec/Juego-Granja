# PATCH 34 — Registro Central de Productos

## Objetivo

Dejar una arquitectura más escalable antes de añadir Quesería, Empacadora u otras cadenas productivas.

## Cambio principal

Se añadió:

```text
js/modules/products.js
```

Ese archivo es ahora el catálogo central de productos.

Todo producto nuevo debe registrarse ahí primero.

## Ahora products.js controla

- ID interno.
- Icono.
- Nombre.
- Categoría.
- Precio inicial.
- Precio mínimo y máximo.
- Historial inicial.
- Espacio/lote en almacén.
- Si el producto puede comprarse o venderse.

## Sistemas conectados

- Mercado usa el catálogo para productos iniciales.
- Almacén usa el catálogo para reglas de lotes.
- Ciclo diario usa el catálogo para rangos de precios.
- Taller Textil usa el catálogo para asegurar Hilo Textil.
- Guardado/carga normaliza productos desde el catálogo.

## Regla para futuro

Para agregar un producto nuevo como:

```text
queso_cabra
polloEmpaquetado
resEmpaquetada
tela
harina
```

primero se agrega en:

```text
js/modules/products.js
```

y luego la máquina/mercado/corral lo usa por ID.

## Archivos modificados

- index.html
- js/main.js
- js/modules/products.js
- js/modules/state.js
- js/modules/storage.js
- js/modules/daycycle.js
- js/modules/market.js
- js/modules/saves.js
- js/modules/machinery/machinery_state.js

## Nota

Este parche no cambia el balance intencionalmente. Solo centraliza datos.
