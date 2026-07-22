# README PATCH 42.2 - Visual limpio / menos colores

## Objetivo

Pulir la pantalla principal después del Patch 42.1.

El 42.1 mejoró la estructura, pero el usuario notó que había demasiados colores compitiendo. Este parche mantiene la estructura que ya funcionaba y baja el ruido visual.

## Qué cambia

### Paleta

- Menos colores fuertes por botón.
- Base común de madera oscura.
- Dorado envejecido como borde/acento principal.
- Verde oliva suave como apoyo, sin saturar.

### Botones principales

- Mercado, Corrales, Maquinarias, Almacén, Producción y Contratos ya no usan fondos tan diferentes entre sí.
- Cada botón conserva un acento pequeño para diferenciarlo.
- Los iconos se ven menos saturados para que no compitan tanto.

### Dashboard

- Fondo más oscuro y sobrio.
- Imagen de granja con menos saturación.
- Brillos y sombras más controlados.
- Panel **¿Qué hacer ahora?** más integrado con el resto.

## Archivos tocados

### Código

- `index.html`
- `css/style.css`

### Documentación

- `docs/CHANGELOG.md`
- `docs/HANDOFF.md`
- `docs/TODO.md`
- `docs/UI_DESIGN_BIBLE.md`
- `docs/BUGS.md`
- `docs/README_PATCH_42_2_VISUAL_LIMPIO.md`

## Qué no cambia

- No cambia economía.
- No cambia mercado.
- No cambia contratos.
- No cambia guardado.
- No cambia producción.
- No cambia balance.
- No cambia estructura HTML de la pantalla principal.

## Próximo paso recomendado

Probar la pantalla principal en PC y móvil.

Si todavía se siente cargada, el siguiente paso debería ser crear o reemplazar iconos por assets propios más sobrios, porque los emojis aportan mucho color aunque el CSS esté más controlado.
