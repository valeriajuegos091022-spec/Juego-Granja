# README PATCH 42.0 — Diálogos premium

## Objetivo

Pulir el diseño visual de los popups generales del juego.

El popup anterior funcionaba, pero se veía demasiado pesado: borde grande, botón rojo llamativo, textos apretados y botones muy fuertes.

---

## Cambios realizados

### Popup general

- Panel más pequeño.
- Cierre integrado en la esquina superior derecha.
- Borde dorado más fino.
- Fondo madera oscura premium.
- Sombra menos exagerada.
- Icono más pequeño.
- Título y texto más compactos.
- Botones menos gigantes.

### Confirmación de menú principal

- Título más corto: **¿Volver al menú?**
- Mensaje más breve y claro.
- Botón secundario ahora dice **CANCELAR**.

### Avisos simples

`simpleNotice(...)` ahora usa títulos e iconos más coherentes:

- `info`: Aviso / ℹ️
- `success`: Listo / ✅
- `warning`: Atención / ⚠️
- `error`: No se puede hacer / ❌

---

## Archivos tocados

### Código

- `index.html`
- `css/style.css`
- `js/modules/dialogs.js`
- `js/modules/events.js`

### Documentación

- `docs/CHANGELOG.md`
- `docs/HANDOFF.md`
- `docs/TODO.md`
- `docs/UI_DESIGN_BIBLE.md`
- `docs/BUGS.md`
- `docs/README_PATCH_42_0_DIALOGOS_PREMIUM.md`

---

## QA recomendado

1. Abrir una partida.
2. Pulsar **MENÚ PRINCIPAL**.
3. Revisar que el popup se vea más limpio.
4. Probar **CANCELAR**.
5. Volver a abrirlo y probar **IR AL MENÚ**.
6. Probar avisos simples, por ejemplo Ajustes o Salir desde portada.
7. Revisar que los popups grandes de almacén no se vean rotos.

---

## Qué no cambia

- No cambia economía.
- No cambia mercado.
- No cambia contratos.
- No cambia guardado.
- No cambia balance.
- No cambia maquinarias.

Este parche es solo de **pulido visual de diálogos**.
