# Patch 43.8 — Botones mercado + vender todo

Este parche mejora las acciones rápidas del Mercado local.

## Archivos modificados

- `index.html`
- `css/style.css`
- `js/modules/market.js`
- `js/modules/events.js`
- `docs/CHANGELOG.md`
- `docs/HANDOFF.md`
- `docs/TODO.md`
- `docs/UI_DESIGN_BIBLE.md`
- `docs/BUGS.md`
- `docs/README_PATCH_43_8_MERCADO_ACCIONES.md`

## Cambios

- Comprar usa verde vivo.
- Vender usa rojo vivo.
- Botones más pequeños y legibles.
- Fuente de botones de mercado ajustada a Arial/Helvetica.
- Nuevo botón **Todo** en cada fila para vender todo el producto disponible.
- Nuevo botón **Vender todo** en el popup del producto.
- Cache actualizado a `43_8_mercado_acciones`.

## No cambia

- Precios.
- Demanda.
- Balance.
- Guardado.
- Fórmula de economía.

## Prueba recomendada

1. Abrir Mercado local.
2. Comprar 1 unidad de un producto.
3. Vender 1 unidad del mismo producto.
4. Usar **Todo** en una fila con inventario.
5. Abrir un producto y usar **Vender todo**.
6. Probar **Todo** en un producto con 0 unidades para confirmar que muestra aviso.
