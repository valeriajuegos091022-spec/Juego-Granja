# Patch 43.11 — Mercado hover legible

Este parche corrige el efecto visual al pasar el mouse sobre productos del Mercado local.

## Archivos modificados

- `index.html`
- `css/style.css`
- `docs/CHANGELOG.md`
- `docs/HANDOFF.md`
- `docs/TODO.md`
- `docs/UI_DESIGN_BIBLE.md`
- `docs/BUGS.md`
- `docs/README_PATCH_43_11_MERCADO_HOVER_LEGIBLE.md`

## Cambios

- El nombre del producto ya no se pone amarillo en hover.
- El texto principal queda oscuro y legible.
- El hover ahora usa:
  - borde verde,
  - brillo suave,
  - acento lateral,
  - elevación ligera,
  - sombra controlada.
- Cache actualizado a `43_11_mercado_hover_legible`.

## No cambia

- Economía.
- Precios.
- Demanda.
- Compra/venta.
- Vender todo.
- Guardado.
- Balance.

## Prueba recomendada

1. Abrir Mercado local.
2. Pasar el mouse por encima de varios productos.
3. Confirmar que el texto se lee bien.
4. Confirmar que el click abre el popup del producto.
