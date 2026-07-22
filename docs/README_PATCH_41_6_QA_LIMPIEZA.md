# PATCH 41.6 - QA / limpieza de continuidad

Fecha: 2026-06-29

## Objetivo

Cerrar la etapa 41.x con una limpieza pequeña antes de seguir programando sistemas nuevos.

Este parche no rehace mecánicas. Solo alinea código, textos y documentación con el estado real del juego.

## Cambios de código

- `index.html`
  - Se actualizaron todos los `?v=` a `41_6_qa_limpieza`.
  - Esto ayuda a evitar caché vieja cuando se reemplazan archivos.

- `js/modules/market.js`
  - El popup del mercado cambió el título viejo `Cartel de demanda abierta` por `Demanda del día`.

- `js/modules/economy.js`
  - El estado visual viejo `Demanda abierta` se cambió por `Compradores esperando`.
  - La lógica económica no cambió.

- `js/modules/contracts.js`
  - Se eliminó una función visual no usada que generaba cálculos económicos internos para contratos.
  - La lógica real de recompensa y anti-exploit sigue igual.

## Documentación actualizada

- `CHANGELOG.md`
- `HANDOFF.md`
- `BUGS.md`
- `TODO.md`
- `ARCHITECTURE.md`
- `MERCADO.md`

## QA técnico realizado

- Se revisó estructura activa del ZIP.
- Se confirmó que `main.js` sigue pequeño.
- Se confirmó que el runtime carga `js/modules/`.
- Se ejecutó `node --check` sobre todos los `.js` sin errores de sintaxis.
- Se levantó servidor local correctamente.

## Pendiente importante

Falta QA manual en navegador real:

- Crear partida.
- Guardar al pasar día.
- Continuar última partida.
- Aceptar contrato.
- Entregar contrato.
- Dejar fallar contrato.
- Comprar/vender en mercado.
- Probar anuncio en construcción y producción.

## Próximo paso recomendado

Patch 41.7 debería ser QA funcional real de guardado, contratos y mercado antes de iniciar Mercado V3.
