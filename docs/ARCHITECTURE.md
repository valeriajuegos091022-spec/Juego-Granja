## Patch 44.35 - Módulo `production_center.js`

Se añade `js/modules/production_center.js` como capa de **UI agregadora** para el Centro de Producción.

Responsabilidad:

- Leer datos existentes de Corrales.
- Leer datos existentes de Maquinarias.
- Leer ocupación existente del Almacén.
- Mostrar resumen, pestañas y accesos rápidos.

Regla arquitectónica:

`production_center.js` **no calcula economía, no define recetas y no cambia fórmulas productivas**. Solo consulta motores existentes y presenta el estado. El motor `production.js` conserva su responsabilidad universal de ejecutar recetas.

Estructura añadida:

```text
css/
  production_center.css
js/modules/
  production_center.js
```

# FARM LEGACY — ARCHITECTURE PATCH 41.7

## Objetivo de arquitectura

Farm Legacy debe crecer como un juego de simulación/economía modular. La arquitectura actual busca que añadir productos, recetas, maquinarias y reglas económicas no obligue a reescribir sistemas completos.

Estado actual de referencia:

- `main.js` sigue pequeño y solo arranca el juego.
- `js/modules/` contiene la lógica activa.
- `js/legacy/` conserva código viejo, pero no debe usarse para sistemas nuevos.
- Mercado, contratos, guardado, almacén, corrales y maquinarias ya están separados por módulos.

Principio principal:

```text
Datos centrales + motores universales + UI que consulta datos
```

---

## Estructura de carpetas

```text
index.html
css/
  style.css
  machinery_premium.css
js/
  main.js
  legacy/
  modules/
    state.js
    products.js
    recipes.js
    machines.js
    production.js
    economy.js
    dialogs.js
    storage.js
    corrals.js
    market.js
    story.js
    saves.js
    daycycle.js
    events.js
    machinery.js
    machinery/
      machinery_state.js
      machinery_timer.js
      machinery_ui.js
      machinery_actions.js
      machinery_ads.js
      machinery_save.js
      machinery_events.js
      machinery_boot.js
assets/
  maquinas/
```

---

## `main.js`

Debe seguir siendo pequeño.

Responsabilidad:

- Arrancar el juego.
- Conectar módulos.
- Inicializar pantallas/eventos.

No debe contener:

- Lógica de mercado.
- Lógica de maquinarias.
- Recetas.
- Productos.
- Fórmulas económicas.
- Guardado complejo.

---

## Módulos centrales

### `state.js`

Mantiene el estado global base del juego.

Debe usarse para:

- Dinero.
- Día actual.
- Datos del jugador.
- Estado general necesario para otros módulos.

### `products.js`

Registro central de productos.

Responsabilidad:

- Definir productos.
- Nombre, icono, categoría.
- Precio inicial, mínimo y máximo.
- Historial inicial.
- Lote de almacén.
- Si es comprable/vendible.

Regla: todo producto nuevo debe entrar primero aquí.

### `recipes.js`

Registro central de recetas.

Responsabilidad:

- Entradas.
- Salidas.
- Tiempo de producción.
- Categoría de receta.
- Helpers para validar ingredientes.

Regla: ninguna receta debe vivir dentro de una máquina.

### `machines.js`

Registro central de maquinarias.

Responsabilidad:

- Nombre.
- Imagen.
- Costo.
- Tiempo de construcción.
- Receta principal.
- Recetas múltiples si la máquina permite selector.
- Textos de construcción/producción/listo.

Regla: nueva máquina = nueva entrada aquí.

### `production.js`

Motor universal de producción.

Responsabilidad:

- Leer la maquinaria.
- Leer la receta.
- Validar ingredientes.
- Consumir ingredientes.
- Crear temporizador.
- Entregar productos al recoger.

No debe saber casos como “si es Quesería” o “si es Taller Textil”. Debe trabajar con datos.

### `economy.js`

Cerebro económico.

Responsabilidad:

- Demanda diaria.
- Escasez.
- Saturación.
- Elasticidad.
- Recuperación de demanda.
- Variación diaria.
- Actualización de precios por comportamiento de mercado.

Regla: `market.js` muestra; `economy.js` decide.

---

## Sistema de maquinarias

La carpeta `js/modules/machinery/` divide la pantalla y la interacción.

### `machinery_state.js`

Crea y normaliza el estado de cada máquina según `machines.js`.

### `machinery_ui.js`

Renderiza tarjetas, estados, botones, barra de progreso, selector de receta y estilos de la pantalla.

### `machinery_actions.js`

Gestiona acciones:

- Construir.
- Producir.
- Recoger.
- Anuncio.
- Cambiar receta.

### `machinery_timer.js`

Actualiza temporizadores de construcción y producción.

### `machinery_ads.js`

Maneja el anuncio simulado. Actualmente abre un enlace de YouTube y aplica recompensa de reducción de tiempo.

### `machinery_save.js`

Snapshot/restore del estado de maquinarias.

### `machinery_events.js`

Conecta eventos de clicks y selects.

### `machinery_boot.js`

Inicialización específica del sistema.

---

## Flujo universal de producción

```text
Jugador pulsa producir
↓
Se lee la máquina desde machines.js
↓
Se lee la receta activa desde recipes.js
↓
Se validan ingredientes
↓
Se consumen ingredientes al iniciar
↓
Arranca temporizador real
↓
Al terminar queda producto listo
↓
Jugador pulsa recoger
↓
Se entregan salidas de la receta
↓
Se guarda estado
↓
Se refresca UI
```

---

## Flujo del mercado

```text
Producto en products.js
↓
Estado de mercado en productos del juego
↓
Venta del jugador registra vendidoHoy
↓
Al pasar día economy.js calcula presión
↓
Se actualiza precio
↓
Se ajusta demanda diaria
↓
market.js muestra tarjetas, demanda y precio
```

---

## Compatibilidad

El proyecto usa scripts clásicos cargados desde `index.html`, no ES modules. Esto se mantiene por compatibilidad local y futuro Capacitor/Android.

---

## Reglas de desarrollo futuro

1. No duplicar datos.
2. No programar excepciones si puede resolverse con datos.
3. No meter sistemas nuevos en `main.js`.
4. No tocar `legacy/` salvo para referencia.
5. Cada módulo debe tener una responsabilidad clara.
6. Cualquier sistema económico debe consultar o vivir en `economy.js`.
7. Cualquier maquinaria debe pasar por `machines.js` + `recipes.js`.