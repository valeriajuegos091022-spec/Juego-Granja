# PATCH 35.2 — Fix Animación Maquinarias

Corrección visual después del Patch 35.1.

## Problema

Al pasar el mouse sobre las tarjetas de Maquinarias, las tarjetas seguían moviéndose o reiniciando animaciones, especialmente porque la pantalla refresca los temporizadores cada segundo.

## Corrección

- Se mantiene el scroll interno.
- Se elimina el movimiento de la tarjeta al hacer hover.
- Se elimina el brillo deslizante que se reiniciaba.
- La imagen conserva un brillo leve pero sin zoom fuerte.
- Se mantienen animaciones útiles: barra de progreso, estado activo y botón de recoger.
- Se añade soporte para `prefers-reduced-motion`.

## Archivos tocados

- `css/machinery_premium.css`
- `index.html` solo para cache bust `v=35_2_animfix`
