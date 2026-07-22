# PATCH 35 — Quesería V1

## Objetivo
Agregar la primera maquinaria láctea de Farm Legacy usando la arquitectura modular ya creada.

## Nuevo asset
- `assets/maquinas/queseria.png`

## Nueva maquinaria
### Quesería
Cadena:

```text
🥛 Leche → 🧀 Queso
```

Valores provisionales:
- Costo: 450 €
- Construcción: 20 minutos reales
- Receta: 8 Leche → 2 Quesos
- Producción: 35 minutos reales
- Anuncio simulado: -5 minutos

## Flujo correcto
1. Construir Quesería.
2. Esperar temporizador real o usar anuncio.
3. Tener 8 leche antes de producir.
4. Al iniciar producción se consumen las 8 leches.
5. Cuando termina el tiempo aparece `RECOGER QUESO`.
6. Al recoger se suman 2 quesos al inventario.

## Arquitectura
La Quesería se integra en el motor modular de maquinarias:

```text
js/modules/machinery/
  machinery_state.js
  machinery_timer.js
  machinery_ui.js
  machinery_actions.js
  machinery_ads.js
  machinery_save.js
  machinery_events.js
  machinery_boot.js
```

No se agregó lógica grande a `main.js`.
