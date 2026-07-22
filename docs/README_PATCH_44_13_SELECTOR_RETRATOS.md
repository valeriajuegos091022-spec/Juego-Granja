# Patch 44.13 - Selector con retratos reales

## Objetivo
Corregir la pantalla de selección de personaje, que había vuelto a mostrar emojis aunque ya existían imágenes de granjero y granjera.

## Cambios incluidos
- Se reemplazan los emojis por retratos reales.
- Se usan los assets:
  - `assets/images/characters/granjero_44_0.png`
  - `assets/images/characters/granjera_44_0.png`
- Se cambia el marco de retrato para que se vea más premium y menos infantil.
- Se mantiene el flujo actual: elegir personaje y pasar a la pantalla de nombre.

## Archivos modificados
- index.html
- css/style.css
- assets/images/characters/granjero_44_0.png
- assets/images/characters/granjera_44_0.png
- docs/CHANGELOG.md
- docs/HANDOFF.md
- docs/TODO.md
- docs/UI_DESIGN_BIBLE.md
- docs/BUGS.md
- docs/README_PATCH_44_13_SELECTOR_RETRATOS.md

## No tocado
- Economía
- Guardado
- Balance
- Lógica JS

## Instalación
Copiar y reemplazar estos archivos encima del juego actual.
