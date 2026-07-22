# README PATCH 42.3 - Iconos sobrios y textos legibles

## Objetivo

Seguir puliendo la pantalla principal después del Patch 42.2.

El 42.2 bajó los colores, pero todavía quedaban emojis grandes que hacían el dashboard menos premium. Este parche mejora iconos, alineación y lectura.

## Qué cambia

### Iconos

- Se reemplazan emojis grandes por medallones con siglas/símbolos.
- HUD:
  - Dinero: `$`
  - Día: `D`
  - Almacén: `A`
  - Guardado automático: `OK`
- Accesos:
  - Mercado: `MK`
  - Corrales: `CR`
  - Maquinarias: `MQ`
  - Almacén: `AL`
  - Producción: `PR`
  - Contratos: `CT`

### Textos

- Mejor alineación vertical en botones principales.
- Títulos un poco más controlados.
- Subtítulos más fáciles de leer.
- Panel **¿Qué hacer ahora?** con mejor lectura en pasos y texto principal.

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
- `docs/README_PATCH_42_3_ICONOS_LEGIBLES.md`

## Qué no cambia

- No cambia economía.
- No cambia mercado.
- No cambia contratos.
- No cambia guardado.
- No cambia producción.
- No cambia balance.

## Nota futura

Si las siglas se sienten demasiado simples, el siguiente salto visual debería ser crear iconos propios PNG/SVG de estilo dorado o madera, no volver a emojis grandes.
