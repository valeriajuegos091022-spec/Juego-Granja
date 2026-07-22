# PATCH 31 FIX — Botones separados en Maquinarias

## Objetivo

Separar la acción principal del Taller Textil del botón de anuncio.

## Regla corregida

- El botón principal solo puede ser:
  - CONSTRUIR
  - PRODUCIR HILO
  - RECOGER HILO
  - estado deshabilitado cuando está construyendo/produciendo/falta lana
- El botón de anuncio queda en una fila aparte.
- El anuncio solo aparece cuando hay un proceso activo:
  - construcción
  - producción
- Para producir se exige lana al inicio.
- Al iniciar producción se consumen 5 lana.
- Al recoger no se pide lana.

## Archivos modificados

- `index.html`
- `js/modules/machinery.js`

## No tocar

- `assets/`
- `css/`
