# PATCH 40.4 - Fix real guardado visual y pantalla principal

## Problema
El aviso premium de "Guardando partida" no aparecía al pasar el día.

## Causa real
El módulo `js/modules/machinery/machinery_save.js` envolvía `autoGuardarSiHaySlot`, pero no reenviaba las opciones.
Por eso `autoGuardarSiHaySlot({ visual:true })` se convertía internamente en `autoGuardarSiHaySlot()` y se perdía la orden de mostrar el aviso visual.

## Solución
- El wrapper ahora conserva `opciones`.
- `daycycle.js` tiene una doble seguridad para mostrar el indicador cuando el guardado del día fue correcto.
- `saves.js` expone el indicador premium de forma segura.
- `style.css` mueve el indicador arriba al centro con z-index máximo.
- La pantalla principal ya no queda recortada por debajo: ahora permite scroll interno si la altura no alcanza.
- `index.html` actualiza cache busting a `v=40_4_guardado_real`.
