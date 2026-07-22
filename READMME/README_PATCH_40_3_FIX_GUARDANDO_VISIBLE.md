# PATCH 40.3 - Fix Guardando Partida Visible

## Problema
El indicador bonito de guardado podía quedar demasiado abajo o fuera de la zona visible, especialmente cuando la pantalla quedaba recortada por debajo.

## Solución
- El aviso premium de guardado ahora aparece arriba al centro.
- Se mantiene por más tiempo para que el jugador lo vea.
- Se respeta safe-area en móvil.
- No se toca la lógica de guardado ni el guardado silencioso de máquinas.

## Prueba
1. Crear/cargar partida.
2. Pulsar Siguiente día.
3. Ver arriba el aviso: Guardando partida -> Partida guardada.
