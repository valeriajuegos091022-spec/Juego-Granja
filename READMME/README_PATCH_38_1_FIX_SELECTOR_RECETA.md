# PATCH 38.1 - Fix selector de receta

Corrige el problema donde el desplegable de receta de la Empaquetadora de Carne se cerraba demasiado rápido.

## Causa
La pantalla de Maquinarias se re-renderiza cada segundo para mantener actualizados los temporizadores. Ese render reemplazaba el `<select>` mientras el jugador lo tenía abierto.

## Solución
Cuando el selector de receta está enfocado o recién tocado, el render automático se pausa por unos segundos. Al escoger una receta, se actualiza normalmente.

## Archivos tocados
- `index.html`
- `js/modules/machinery/machinery_events.js`

No cambia balance, recetas, productos ni guardado.
