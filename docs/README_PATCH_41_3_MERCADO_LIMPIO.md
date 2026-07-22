# Patch 41.3 - Mercado más limpio

## Objetivo

Reducir la carga visual de la pantalla principal del mercado sin eliminar la mecánica de demanda, escasez y saturación.

## Cambios

- Se elimina la barra de demanda de cada tarjeta del mercado.
- La lista principal queda más limpia: producto, precio, inventario, estado y compra/venta.
- La demanda completa se mueve al popup del producto.
- Se añade el texto `ⓘ Ver demanda y gráfica` para enseñar al jugador dónde tocar.
- El estado del producto también abre el detalle de demanda.
- Se mantiene intacta la lógica económica: precios vivos, demanda diaria, saturación, escasez y margen compra/venta.

## Archivos modificados

- `index.html`
- `js/modules/market.js`
- `css/style.css`
- `docs/README_PATCH_41_3_MERCADO_LIMPIO.md`
