# PATCH 31 FIX — Taller Textil flujo correcto

Corrección sobre arquitectura modular real.

## Corregido

- El Taller Textil verifica las 5 lanas solo al iniciar producción.
- Las 5 lanas se consumen inmediatamente cuando comienza el contador.
- Al terminar el contador, queda `RECOGER HILO`.
- Al recoger no se vuelve a pedir lana.
- La barra vuelve a 0 después de recoger.
- Se añadió normalización defensiva para saves intermedios.

## Reemplazar

- `index.html`
- `js/`
- `docs/` si quieres mantener docs del patch anterior

No tocar `assets/` ni `css/`.
