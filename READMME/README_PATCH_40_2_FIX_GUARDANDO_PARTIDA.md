# PATCH 40.2 - Fix indicador Guardando Partida

Corrige la pérdida del aviso visual premium de guardado al pasar el día.

## Cambios

- Se añadió un indicador premium dinámico de guardado.
- Al pasar el día, el guardado vuelve a mostrar:
  - Guardando partida...
  - Barra de progreso
  - Partida guardada
- Los guardados silenciosos de maquinaria/timers siguen sin mostrar popup para no molestar.

## Archivos modificados

- js/modules/saves.js
- js/modules/daycycle.js
- css/style.css
- index.html cache busting
