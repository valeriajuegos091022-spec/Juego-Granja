# Patch 44.36 - Centro de Producción: layout y primer toque

## Objetivo
Mejorar la posición de los elementos del Centro de Producción, dar más espacio a las imágenes y corregir la sensación de que algunos botones requerían dos toques.

## Cambios visuales
- Animales y Maquinarias del resumen pasan a bloques completos.
- Tarjetas más anchas y con mejor separación.
- Imágenes de animales más protagonistas.
- Imágenes de maquinaria mostradas completas con `object-fit: contain`.
- Botones alineados al pie de las tarjetas para una composición más estable.
- Tarjetas de productos listos para recoger con más espacio.

## Corrección de interacción
El Centro de Producción se actualiza cada segundo para reflejar temporizadores reales. Ese render podía reemplazar un botón entre el inicio y el final de un toque.

Ahora:
- el render se pausa temporalmente mientras el usuario interactúa;
- las acciones se resuelven en `pointerup`;
- existe deduplicación para impedir doble ejecución con el `click` posterior.

## Archivos modificados
- index.html
- css/production_center.css
- js/modules/production_center.js
- docs/CHANGELOG.md
- docs/HANDOFF.md
- docs/TODO.md
- docs/UI_DESIGN_BIBLE.md
- docs/BUGS.md
- docs/README_PATCH_44_36_PRODUCCION_LAYOUT_TOUCH_FIX.md

## No tocado
- Economía
- Guardado
- Recetas
- Fórmulas de producción
- Temporizadores internos de maquinaria
- Balance

## Instalación
Copiar y reemplazar estos archivos encima del juego actual.
