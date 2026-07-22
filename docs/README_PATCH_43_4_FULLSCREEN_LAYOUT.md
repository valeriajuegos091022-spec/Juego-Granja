# Patch 43.4 — Corrección fullscreen mapa de finca

Este parche corrige el problema visual donde la barra superior podía quedar superpuesta al mapa al poner el juego en pantalla completa.

## Archivos modificados

- `index.html`
- `css/style.css`
- `docs/CHANGELOG.md`
- `docs/HANDOFF.md`
- `docs/TODO.md`
- `docs/UI_DESIGN_BIBLE.md`
- `docs/BUGS.md`
- `docs/README_PATCH_43_4_FULLSCREEN_LAYOUT.md`

## Cambios

- La topbar del mapa ahora reserva más altura real.
- El logo queda más controlado y no invade el mapa.
- El cuerpo del mapa queda separado de la fila superior.
- El footer se reduce un poco para recuperar espacio vertical.
- Se agregan reglas para pantallas anchas con poca altura.
- Cache actualizado a `43_4_fullscreen_layout`.

## No cambia

- Economía.
- Mercado.
- Contratos.
- Guardado.
- Producción.
- Balance.
- Datos de partidas.

## Prueba recomendada

1. Abrir el juego.
2. Entrar a una partida.
3. Poner pantalla completa.
4. Confirmar que el logo/HUD no se montan encima del mapa.
5. Probar Mercado, Corrales, Maquinarias, Almacén, Producción y Contratos.
6. Probar **Siguiente Día**.
