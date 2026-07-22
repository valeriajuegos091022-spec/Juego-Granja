# Farm Legacy - Patch 38

## Empaquetadora de Carne V1

Este parche agrega la primera máquina nueva creada sobre el motor universal de producción.

### Nuevo contenido

- Nueva máquina: **Empaquetadora de Carne**
- Nueva imagen: `assets/maquinas/empaquetadora_carne.png`
- Nuevos productos:
  - Pollo Empaquetado
  - Res Empaquetada
  - Cordero Empaquetado
- Nuevas recetas centrales:
  - `empaquetado_pollo`
  - `empaquetado_res`
  - `empaquetado_cordero`

### Mecánica nueva

La Empaquetadora usa **una sola tarjeta de maquinaria**, pero permite cambiar la receta antes de producir.

Flujo:

1. Construir Empaquetadora de Carne.
2. Elegir receta: pollo, res o cordero.
3. Producir.
4. Esperar tiempo real.
5. Recoger producto empaquetado.

### Regla importante

No se puede cambiar la receta mientras la máquina está produciendo o tiene producto listo para recoger.

### Archivos modificados

- `index.html`
- `css/machinery_premium.css`
- `js/modules/products.js`
- `js/modules/recipes.js`
- `js/modules/machines.js`
- `js/modules/machinery/machinery_state.js`
- `js/modules/machinery/machinery_ui.js`
- `js/modules/machinery/machinery_actions.js`
- `js/modules/machinery/machinery_events.js`

### Archivos nuevos

- `assets/maquinas/empaquetadora_carne.png`

