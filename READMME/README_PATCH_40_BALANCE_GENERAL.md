# PATCH 40 - Balance general y base de ajuste

Este parche no agrega una pantalla grande nueva. Su objetivo es dejar Farm Legacy mejor preparado para ajustar el balance sin romper sistemas.

## Cambios principales

- Nuevo módulo `js/modules/balance.js`.
- El dinero inicial base sube a 120 para que el inicio sea menos apretado.
- Almacén pequeño queda como camino seguro: más capacidad inicial y renta más baja.
- Almacén grande queda como camino de riesgo: más capacidad, menos dinero inicial, renta ajustada.
- Costos y tiempos de maquinarias ajustados ligeramente.
- Tiempos de recetas reducidos un poco para mejorar ritmo.
- Mercado con más variación de demanda diaria, pero precios más controlados.
- Migración suave de demanda para partidas ya guardadas mediante `balanceVersion`.

## Filosofía

A partir de ahora, los números importantes deben revisarse desde una fuente clara. El mercado V2 queda funcional, pero Mercado V3 se pensará con más calma.

## Qué probar

1. Crear partida nueva con almacén pequeño.
2. Crear partida nueva con almacén grande.
3. Pasar varios días y mirar renta/dinero.
4. Producir hilo, queso y carne empaquetada.
5. Vender productos y revisar que la demanda cambie sin volverse loca.
