# README PATCH 41.8 — Pulido UI + Menú principal

## Objetivo

Hacer un parche pequeño de calidad de vida antes de seguir con sistemas más grandes.

Se atacan dos molestias reales del flujo actual:

1. No había un botón claro para volver al **menú principal** desde la pantalla principal de la granja.
2. La **portada** se veía algo amontonada y los botones podían tapar demasiado la zona central del fondo/logo.

---

## Cambios realizados

### 1) Botón Menú principal

Se agrega un botón nuevo dentro de la pantalla principal del juego:

- Texto: **MENÚ PRINCIPAL**
- Acción: abre un diálogo de confirmación.
- Mensaje: recuerda que el guardado real ocurre al pasar el día.

No cambia la regla del proyecto:

- **No se fuerza un guardado manual escondido.**
- El guardado importante sigue siendo al pasar el día.

---

### 2) Portada más limpia

Se retoca la portada para mejorar:

- espaciado,
- respiración visual,
- caja del menú,
- tamaño y orden de botones.

La idea es que el menú se vea más elegante y tape menos el centro del fondo principal.

---

## Archivos tocados

### Código
- `index.html`
- `css/style.css`
- `js/modules/events.js`

### Documentación
- `docs/CHANGELOG.md`
- `docs/HANDOFF.md`
- `docs/TODO.md`
- `docs/UI_DESIGN_BIBLE.md`
- `docs/BUGS.md`
- `docs/README_PATCH_41_8_UI_MENU.md`

---

## QA recomendado

1. Entrar a una partida.
2. Verificar que aparece el botón **MENÚ PRINCIPAL**.
3. Pulsarlo y revisar el popup de confirmación.
4. Cancelar y confirmar para validar ambos caminos.
5. Revisar la portada en PC y también en un ancho más pequeño.
6. Confirmar que los botones ya no se vean tan amontonados.

---

## Qué no cambia

- No cambia economía.
- No cambia mercado.
- No cambia contratos.
- No cambia maquinarias.
- No cambia lógica de guardado.

Este parche es solo de **pulido UI + navegación**.
