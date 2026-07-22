# README PATCH 41.9 — Navegación y vistas internas

## Objetivo

Seguir puliendo el juego sin meter sistemas grandes todavía.

Este parche mejora la navegación en las pantallas internas para que el jugador no se sienta atrapado o perdido.

---

## Cambios realizados

### Botón ☰ MENÚ en vistas internas

Se agrega un botón **☰ MENÚ** en:

- Mercado.
- Corrales.
- Detalle de corral.
- Maquinarias.
- Contratos.

El botón usa la confirmación existente para volver al menú principal.

---

## Mejora pequeña del texto del popup

El popup sigue con el diseño visual anterior, pero el texto se acortó para que no se vea tan cargado.

Pendiente:

- Rediseñar el popup completo en un parche futuro.

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
- `docs/README_PATCH_41_9_NAV_VISTAS.md`

---

## QA recomendado

1. Entrar a una partida.
2. Abrir Mercado y probar **☰ MENÚ**.
3. Abrir Corrales y probar **☰ MENÚ**.
4. Entrar a Detalle de Corral y probar **☰ MENÚ**.
5. Abrir Maquinarias y probar **☰ MENÚ**.
6. Abrir Contratos y probar **☰ MENÚ**.
7. Confirmar que **Volver** sigue funcionando en cada pantalla.

---

## Qué no cambia

- No cambia economía.
- No cambia mercado.
- No cambia contratos.
- No cambia maquinarias.
- No cambia guardado.
- No cambia balance.

Este parche es solo de navegación y pulido de vistas internas.
