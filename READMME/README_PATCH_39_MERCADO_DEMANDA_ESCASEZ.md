# PATCH 39 - Mercado inteligente V1

## Objetivo
Agregar la primera versión real del mercado con demanda, escasez y saturación.

## Cambios
- `js/modules/economy.js` ahora controla la lógica económica del mercado.
- Cada producto tiene demanda diaria, vendido hoy y estado del mercado.
- Al vender productos se registra la cantidad vendida del día.
- Al pasar al siguiente día, el precio cambia según oferta/demanda:
  - poca venta = escasez = el precio tiende a subir.
  - demasiada venta = saturación = el precio tiende a bajar.
  - venta normal = variación ligera y recuperación de demanda.
- La demanda se recupera hacia su valor base con el tiempo.
- El mercado muestra columna de demanda y estado.
- El popup de producto muestra detalles de demanda.

## Archivos principales
- `js/modules/economy.js`
- `js/modules/market.js`
- `js/modules/daycycle.js`
- `js/modules/products.js`
- `index.html`
- `css/style.css`

## Prueba recomendada
1. Abrir Mercado.
2. Vender varios huevos o leche.
3. Ver que sube `vendido/demanda`.
4. Pasar día.
5. Confirmar que el precio reacciona según escasez o saturación.
