# Patch 44.24 - Mercado: TODO silencioso y popup limpio

## Objetivo
Pulir dos detalles de uso del Mercado sin tocar su economía ni balance.

## Cambios incluidos
- El botón `Todo` solo carga la cantidad máxima disponible y no muestra ningún popup ni aviso.
- El popup de producto se limpia para evitar párrafos explicativos permanentes.
- Se agrega un icono de información junto a `Demanda del día`.
- Al pasar el mouse o enfocar ese icono aparece un tooltip con la explicación completa de la demanda.
- Se mantienen visibles los números clave y la barra de cobertura.
- Se refina visualmente el popup, la gráfica y los bloques de estadísticas.

## Archivos modificados
- index.html
- css/style.css
- js/modules/market.js
- docs/CHANGELOG.md
- docs/HANDOFF.md
- docs/TODO.md
- docs/UI_DESIGN_BIBLE.md
- docs/BUGS.md
- docs/README_PATCH_44_24_MERCADO_POPUP_INFO.md

## No tocado
- Economía
- Guardado
- Lógica de precios
- Balance

## Instalación
Copiar y reemplazar estos archivos encima del juego actual con el Patch 44.23 aplicado.
