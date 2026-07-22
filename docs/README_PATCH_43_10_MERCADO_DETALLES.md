# Patch 43.10 — Mercado detalles gráficos

Este parche pule visualmente el Mercado local y corrige el panel donde aparece el dinero.

## Archivos modificados

- `index.html`
- `css/style.css`
- `docs/CHANGELOG.md`
- `docs/HANDOFF.md`
- `docs/TODO.md`
- `docs/UI_DESIGN_BIBLE.md`
- `docs/BUGS.md`
- `docs/README_PATCH_43_10_MERCADO_DETALLES.md`

## Cambios

- Panel derecho del topbar más ancho.
- Dinero en una sola línea, con mejor tamaño y elipsis si hiciera falta.
- Más detalles gráficos en el mercado:
  - líneas decorativas,
  - acentos laterales,
  - brillo suave,
  - tarjetas con más profundidad,
  - tickets de precio más definidos,
  - encabezados con símbolos discretos.
- Cache actualizado a `43_10_mercado_detalles`.

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
2. Revisar el panel de dinero.
3. Confirmar que no se parte el valor.
4. Revisar si los detalles gráficos se sienten mejor.
5. Probar Comprar, Vender y Todo.
