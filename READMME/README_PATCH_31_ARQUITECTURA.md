# PATCH 31 — Arquitectura modular real

## Objetivo

Este parche deja Farm Legacy preparado para crecer sin volver a llenar `js/main.js`.

## Cambio principal

Antes:

```html
<script src="js/main.js" defer></script>
```

Ahora `index.html` carga los módulos reales en orden:

```text
js/modules/state.js
js/modules/dialogs.js
js/modules/storage.js
js/modules/corrals.js
js/modules/market.js
js/modules/story.js
js/modules/saves.js
js/modules/daycycle.js
js/modules/machinery.js
js/modules/events.js
js/main.js
```

`js/main.js` queda solo como inicializador pequeño.

## Regla de trabajo futura

- No meter sistemas nuevos completos dentro de `main.js`.
- Nueva maquinaria → `js/modules/machinery.js` o submódulo futuro de maquinaria.
- Nuevo mercado/sistema de precios → `js/modules/market.js`.
- Nuevo producto → registrar en mercado, almacén, guardado y UI.
- Nuevo ciclo diario → `js/modules/daycycle.js`.
- Nuevas pantallas/eventos → `js/modules/events.js` + CSS/HTML si corresponde.

## Legacy

La carpeta `js/legacy/` se mantiene como respaldo histórico. No está cargada por `index.html`.

## Nota técnica

Se usan scripts clásicos con `defer`, no `type="module"`, para mantener compatibilidad con pruebas locales y Capacitor. El orden importa.

## Archivos que reemplazar

Reemplazar:

```text
index.html
js/
```

No tocar:

```text
assets/
css/
```
