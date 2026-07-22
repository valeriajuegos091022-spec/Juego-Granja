# Patch 44.4 — Fondo protagonista

Este parche corrige la portada del 44.3. El letrero grande hecho por CSS no quedó bien, así que se cambia a una solución más alcanzable y estable: usar el fondo existente como portada principal.

## Archivos modificados

- `index.html`
- `css/style.css`
- `docs/CHANGELOG.md`
- `docs/HANDOFF.md`
- `docs/TODO.md`
- `docs/UI_DESIGN_BIBLE.md`
- `docs/BUGS.md`
- `docs/README_PATCH_44_4_FONDO_PROTAGONISTA.md`

## Cambios

- Se elimina el letrero gigante del 44.3.
- El fondo existente vuelve a ser protagonista.
- Se respeta el logo integrado del fondo.
- El menú pasa a un dock compacto abajo.
- Nueva Partida queda como acción principal.
- Cache actualizado a `44_4_fondo_protagonista`.

## No cambia

- Guardado.
- Economía.
- Mercado.
- Corrales.
- Contratos.
- Maquinarias.
- Selección de personaje.
- Balance.

## QA recomendado

1. Abrir portada en PC.
2. Confirmar que el fondo/logo se ven bien.
3. Confirmar que el menú no tapa demasiado.
4. Probar Nueva Partida.
5. Probar Continuar y Cargar Partida.
6. Revisar pantalla baja y móvil.
