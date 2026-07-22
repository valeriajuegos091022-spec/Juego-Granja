# PATCH 33 — Maquinaria modular escalable

Objetivo: evitar que `machinery.js` se convierta en otro `main.js` gigante.

## Cambios

- `js/main.js` sigue pequeño.
- `js/modules/machinery.js` queda como puente/documentación.
- La lógica real de maquinaria se divide en:

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

## Lo que NO se cambió

- No se agregó Quesería.
- No se agregó Empacadora.
- No se cambió el balance.
- No se cambió el flujo del Taller Textil.
- No se cambió la simulación actual de anuncio con YouTube.

## Flujo esperado del Taller Textil

```text
Tener 5 lana
→ PRODUCIR HILO
→ se consumen 5 lanas al iniciar
→ corre contador
→ aparece RECOGER HILO
→ al recoger suma +1 Hilo Textil
→ la barra vuelve a 0
```

## Regla futura

Nueva máquina = datos/receta/render dentro del sistema `machinery/`.
No volver a meter sistemas completos en `main.js`.

## Archivos a reemplazar

```text
index.html
js/
```

No tocar `assets/` ni `css/`.
