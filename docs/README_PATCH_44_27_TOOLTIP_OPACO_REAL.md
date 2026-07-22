# Patch 44.27 - Tooltip 100% opaco real

## Objetivo
Corregir definitivamente la transparencia del cuadro informativo del Mercado.

## Cambios
- Se elimina el uso de `opacity` y transición para mostrar el tooltip.
- El tooltip queda oculto con `display:none`.
- Al pasar el mouse aparece con `display:flex` y fondo sólido `#2d1a0f`.
- Se desactivan `backdrop-filter`, `filter` y `mix-blend-mode` en el tooltip.
- Se fuerza el cache tag `44_27_tooltip_opaco_real` en el `index.html`.

## Archivos modificados
- index.html
- css/style.css
- docs/CHANGELOG.md
- docs/HANDOFF.md
- docs/TODO.md
- docs/UI_DESIGN_BIBLE.md
- docs/BUGS.md
- docs/README_PATCH_44_27_TOOLTIP_OPACO_REAL.md

## No tocado
- Economía
- Guardado
- Lógica de precios
- Balance
