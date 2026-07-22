# PATCH 35.1 — Maquinarias Premium + Scroll Interno

## Objetivo

Corregir la pantalla de Maquinarias cuando hay más de una máquina y dejarla preparada para muchas máquinas futuras.

## Cambios

- La pantalla de Maquinarias ahora tiene scroll interno en la lista de máquinas.
- La cabecera, recursos y paneles superiores se mantienen visibles.
- Las tarjetas recibieron mejoras visuales premium:
  - entrada animada,
  - borde dorado más elegante,
  - efecto de brillo suave en imagen,
  - hover sutil en PC,
  - barra de progreso con brillo,
  - estados visuales por máquina.
- Se agregó `css/machinery_premium.css` para no tocar el CSS principal del juego.
- Preparado para 10+ máquinas sin cortar botones.

## Archivos modificados

- `index.html`
- `js/modules/machinery/machinery_ui.js`
- `css/machinery_premium.css`

## Prueba recomendada

1. Abrir Maquinarias.
2. Confirmar que Taller Textil y Quesería se ven completas.
3. Hacer scroll dentro de la lista.
4. Construir/producir/recoger en ambas máquinas.
5. Probar en ventana pequeña para validar responsive.
