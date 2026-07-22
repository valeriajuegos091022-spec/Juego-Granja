# PATCH 39.1 — Mercado agrícola V2: UI + balance

## Objetivo
Pulir la pantalla del mercado sin romper la idea principal del Patch 39: precios vivos por demanda, escasez y saturación.

## Cambios principales
- Pantalla de mercado reorganizada en tarjetas más legibles.
- Demanda visible con barra de cobertura.
- Estado más claro: Sin ventas, Demanda abierta, Escasez, Equilibrado o Saturado.
- El detalle del popup ahora muestra cobertura del mercado.
- La demanda diaria ya no queda fija: cambia cada día de forma controlada.
- Balance inicial ajustado para que las demandas sean jugables al inicio.

## Balance nuevo
La demanda representa compradores disponibles para la granja, no toda una ciudad.
Por eso los valores se redujeron para que tengan sentido con pocas gallinas, pocas vacas y primeras máquinas.

## Regla importante
Si no vendes nada de un producto y tampoco tienes inventario, el precio no se dispara por escasez.
Esto evita que productos futuros o sin acceso suban demasiado sin que el jugador participe.

## Archivos tocados
- index.html
- js/modules/market.js
- js/modules/economy.js
- css/style.css
