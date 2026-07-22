# PATCH 41.1 - Partidas, perfiles y guardado claro

Este parche ajusta el flujo de partidas sin tocar la lógica económica ni los contratos.

## Cambios principales

- Se añade botón **CARGAR PARTIDA** en la portada.
- **CONTINUAR** queda reservado para abrir la última partida usada.
- **NUEVA PARTIDA** mantiene el flujo de crear o sobrescribir slot con confirmación.
- El gestor de partidas ahora distingue mejor entre crear y cargar.
- El campo de perfil se rellena con el último usuario usado cuando existe.
- Las tarjetas de slots muestran perfil, día, dinero y fecha.
- Se añade cache busting a `css/style.css` y a los scripts para evitar que el navegador cargue interfaz vieja.

## Regla oficial de guardado

- Acciones importantes guardan silenciosamente.
- Pasar el día guarda con aviso visual premium.
- Continuar carga la última sesión.
- Cargar Partida permite elegir perfil y slot.

## Próximos pasos recomendados

- Añadir opción de borrar slot con confirmación.
- Añadir pantalla futura de perfiles más visual.
- Añadir respaldo/exportación de partida cuando el juego vaya a Android.
