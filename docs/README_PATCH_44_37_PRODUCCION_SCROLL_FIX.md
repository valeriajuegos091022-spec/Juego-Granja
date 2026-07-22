# Patch 44.37 - Producción: scroll estable

## Objetivo
Corregir el problema que impedía o dificultaba hacer scroll dentro del Centro de Producción.

## Causa
El juego bloquea el scroll global de `html` y `body`, por lo que cada pantalla larga necesita su propio contenedor desplazable. Además, Producción se actualiza automáticamente cada segundo y ese refresco podía interferir mientras el usuario estaba desplazando la pantalla.

## Cambios
- `height: 100dvh` explícito para Producción.
- `overflow-y: auto` y `overflow-x: hidden`.
- Soporte de desplazamiento suave en touch.
- Pausa breve del refresco automático durante rueda, touchmove y scroll.

## Archivos modificados
- `index.html`
- `css/production_center.css`
- `js/modules/production_center.js`
- documentación del parche

## No tocado
- Economía
- Guardado
- Balance
- Recetas
- Fórmulas de producción
- Lógica de corrales o maquinarias
