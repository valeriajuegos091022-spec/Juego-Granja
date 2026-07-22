# Patch 44.28 - Tooltip opaco: corrección estructural real

## Problema detectado
El tooltip seguía pareciendo transparente aunque tuviera un color sólido.

La causa real era una regla antigua:

```css
.modal-demand-info span { opacity: .72; }
```

El wrapper completo del tooltip era un elemento `span`, así que todo el cuadro heredaba esa opacidad. Además, el tooltip se extendía sobre la zona de la gráfica y necesitaba una prioridad de capa explícita.

## Corrección
- Wrapper del icono de información cambiado de `span` a `div`.
- Tooltip cambiado de `span` a `div`.
- Texto interno cambiado a párrafos para evitar herencias de opacidad antiguas.
- Fondo sólido `#2d1a0f`.
- Sin alpha, sin `backdrop-filter`, sin `mix-blend-mode`.
- Stacking order reforzado para que la demanda y su tooltip queden por encima de la gráfica.

## Archivos modificados
- `index.html`
- `css/style.css`
- `js/modules/market.js`
- documentación del parche

## No tocado
- Economía
- Precios
- Guardado
- Balance
- Lógica de compra/venta

## Instalación
Copiar y reemplazar estos archivos encima del juego actual.
