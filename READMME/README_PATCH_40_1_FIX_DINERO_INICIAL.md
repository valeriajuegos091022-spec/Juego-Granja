# PATCH 40.1 - Fix dinero inicial

## Motivo
En el Patch 40 el dinero inicial se había balanceado a 120€, pero al escoger el almacén grande se estaba reemplazando por 80€.

Eso podía dar la sensación de que el parche no aplicó correctamente.

## Cambio
- Nueva partida normal comienza con 120€.
- Almacén pequeño mantiene 120€.
- Almacén grande ahora también mantiene 120€.
- El almacén grande sigue teniendo alquiler mayor para balancear su ventaja de capacidad.
- No se toca el modo admin.

## Nota importante
Si el jugador carga una partida guardada vieja, conservará el dinero de esa partida.
Para probar este cambio hay que crear una partida nueva o usar un slot nuevo.
