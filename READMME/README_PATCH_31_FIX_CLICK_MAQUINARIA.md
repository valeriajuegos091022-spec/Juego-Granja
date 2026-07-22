# PATCH 31 FIX — Click único en botones de Maquinaria

## Problema detectado

En algunas pruebas el botón `PRODUCIR HILO` del Taller Textil parecía requerir dos clicks.

## Causa probable

Después de modularizar, el juego tiene manejadores globales de clicks y la maquinaria tenía su propio listener. Aunque funcional, el click podía pasar por el flujo general antes de resolver la acción específica de maquinaria.

## Corrección

Las acciones de maquinaria ahora se capturan primero y se detiene la propagación:

- `build-textile-workshop`
- `start-yarn-production`
- `collect-yarn-production`
- `ad-speed-textile`

Esto hace que cada botón de maquinaria responda con un solo click.

## Flujo textil conservado

- Para producir necesita 5 lana al inicio.
- Al iniciar se consumen 5 lana.
- Luego corre el temporizador.
- Al terminar aparece `RECOGER HILO`.
- Recoger no vuelve a pedir lana.
