# Patch 44.35 - Centro de Producción

## Objetivo
Convertir la antigua pantalla vacía de Producción en un panel de control real y escalable.

## Qué incluye
- Resumen de procesos activos.
- Producción industrial lista para recoger.
- Producción animal prevista al avanzar el día.
- Espacio libre o sobrecapacidad del almacén.
- Pestañas: Resumen, Animales, Maquinarias y Listo para recoger.
- Navegación hacia corrales y maquinarias.
- Recogida de producción industrial terminada usando la lógica existente.

## Archivos modificados o nuevos
- `index.html`
- `css/production_center.css`
- `js/modules/events.js`
- `js/modules/production_center.js`
- `docs/ARCHITECTURE.md`
- `docs/BUGS.md`
- `docs/CHANGELOG.md`
- `docs/DECISIONES_DE_DISENO.md`
- `docs/HANDOFF.md`
- `docs/TODO.md`
- `docs/UI_DESIGN_BIBLE.md`
- `docs/README_PATCH_44_35_CENTRO_PRODUCCION.md`

## No tocado
- Economía
- Guardado
- Balance
- Fórmulas de producción animal
- Recetas
- Temporizadores
- Lógica interna de Maquinarias

## Instalación
Copiar y reemplazar los archivos del parche encima del juego actual.
