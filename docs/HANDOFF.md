## Patch 44.37 - Producción: scroll corregido
- La pantalla Centro de Producción usa scroll interno propio con altura de viewport.
- Se evita que el render automático cada segundo interfiera durante wheel, touchmove o scroll.
- Mantener esta base acumulativa para futuros cambios.

## Patch 44.36 - Estado actual del Centro de Producción
- El concepto del 44.35 se mantiene, pero el layout fue reorganizado para mejorar posiciones y tamaño de imágenes.
- Animales y Maquinarias se muestran con tarjetas más respiradas y escalables.
- Se reforzó la interacción para evitar la sensación de doble toque causada por el re-render periódico.
- Base acumulativa: conserva todo hasta 44.35.

## Patch 44.35 - Estado actual: Centro de Producción
- La antigua entrada vacía de Producción ahora abre un panel real de control.
- El centro lee datos vivos de Corrales, Maquinarias y Almacén.
- La producción animal prevista usa los animales adultos actuales, igual que la lógica diaria existente.
- La producción industrial muestra construcción, proceso, tiempo restante, inactividad o producto listo.
- La pantalla está preparada para crecer con nuevas fuentes productivas sin rehacer su estructura.

## Patch 44.34 - Estado de Maquinarias
- Maquinarias recibe un ajuste fino visual y de interacción.
- El objetivo fue hacer más claro el botón principal y reforzar la respuesta al toque/click en los botones de acción.
- Base acumulativa segura desde 44.32.

## Patch 44.33 - Estado actual de Maquinarias
- Maquinarias ya fue pulida visualmente sobre la base acumulativa actual.
- La pantalla conserva sus máquinas reales, recetas, temporizadores y anuncios.
- El parche solo cambia presentación visual y render textual, no lógica.
- Próxima pantalla sugerida: Producción o Contratos.

## Patch 44.32 - Corrales: contraste global de popups
- Los popups internos de Corrales ya siguen una regla visual más consistente y legible.
- Abarca compra de animales, mejora del corral/establo y matadero.
- No se cambia la lógica interna, solo contraste y lectura.

## Patch 44.31 - Matadero
- El modal de matadero ya no usa combinaciones de color tan lavadas.
- Se mantiene la misma estructura, pero con mejor contraste y legibilidad.

## Patch 44.30 - Estado actual del Almacén interno
- El Almacén conserva la estructura premium del 44.29, pero ahora prioriza legibilidad.
- El modal es un poco más ancho y los textos pequeños son más grandes y gruesos.
- No hubo cambios funcionales ni de balance.

## Patch 44.29 - Estado actual de Almacén interno
- El resumen del Almacén ya fue pulido visualmente.
- La pantalla sigue siendo un modal generado por `storage.js`, pero ahora tiene una estructura más clara de gestión.
- Se preservan cálculos de lotes, capacidad, sobrecapacidad, multa y mejoras.
- El tooltip de demanda de Mercado también quedó un poco más grande, manteniendo su fondo 100% sólido.

## Patch 44.28 - Tooltip Mercado corregido de raíz
- La transparencia no venía del color del tooltip, sino de una regla vieja genérica: `.modal-demand-info span { opacity:.72; }`.
- El wrapper del tooltip era un `span`, por lo que todo el cuadro heredaba la opacidad.
- Se cambió la estructura a `div` y se corrigió el stacking order respecto a la gráfica.
- No tocar esta corrección al pulir Mercado en parches futuros.

## Patch 44.27 - Corrección definitiva tooltip Mercado
- El problema anterior incluía cache viejo y uso innecesario de opacity.
- El tooltip ahora usa fondo sólido real y aparece sin transición de transparencia.
- No se toca economía, precios ni guardado.

## Patch 44.26 - Ajuste fino de tooltip
- El tooltip del popup de Mercado queda con fondo sólido oscuro y lectura más limpia.
- No cambia lógica ni comportamiento del Mercado.

## Patch 44.25 - Mercado popup contrastado
- Tras 44.24 se detectó bajo contraste en la gráfica y sensación de transparencia del modal.
- 44.25 corrige solo color, opacidad y legibilidad del popup del producto.
- La estructura compacta, categorías y comportamiento de Todo se mantienen intactos.

## Patch 44.24 - Estado actual de Mercado
- Mercado mantiene categorías y filas compactas del 44.23.
- `Todo` ya es silencioso: solo rellena la cantidad máxima disponible.
- El popup de producto fue limpiado; la explicación extensa de demanda vive en un tooltip de información.
- La lógica económica no fue alterada.

## Patch 44.23 - Mercado preparado para crecer
- Mercado usa ahora filtros de categoría dinámicos para evitar una lista eterna en el futuro.
- La taxonomía preparada contempla: Básicos, Lácteos, Cárnicos, Elaborados, Conservas y Cultivos.
- Las categorías aparecen automáticamente cuando haya productos asociados.
- Las filas se compactaron ligeramente respecto al 44.22.

## Patch 44.22 - Estado actual de Mercado
- Mercado ahora usa una lista más compacta.
- La demanda ya no vive en cada fila, sino principalmente en el popup del producto.
- Esto mejora la escalabilidad cuando haya más productos.

## Patch 44.21 - Ajuste funcional de Mercado
- Este parche corrige dos problemas detectados tras el 44.20: falta de scroll y comportamiento incorrecto del botón `Todo`.
- La lista principal queda más ligera; la información completa sigue en el modal del producto.
- Base acumulativa: incluye lo de Principal y Corrales ya pulido.

## Patch 44.20 - Estado actual de Mercado
- Mercado ya fue pulido sobre la base acumulativa que incluye Principal y Corrales.
- La lógica de trading no se tocó: solo se rehízo la presentación HTML/CSS y el render visual de la lista.
- La siguiente pantalla sugerida para pulir es Almacén interno o Maquinarias.

## Patch 44.19 - Estado actual de Corrales
- Corrales fue pulido sobre el estado acumulativo con 44.18 aplicado.
- Se modificó HTML/CSS y solo el render visual de `js/modules/corrals.js`.
- La lógica de compra, mejora, matadero, precios y guardado se mantiene intacta.
- Siguiente candidato después de Corrales: revisar detalle fino de modales o continuar con otra sección interna.

## Patch 44.18 - Estado actual de pantalla principal
- La pantalla principal ya fue pulida para acercarla a la calidad visual de la portada y pantallas setup.
- Se mantiene la lógica original de botones y flujo.
- La siguiente pantalla candidata para pulir despues de esta es Corrales.
- El parche es solo HTML/CSS/docs.

## Patch 44.17 - Estado actual de intro
- La pantalla de historia fue reestructurada desde el 44.16 acumulativo.
- Mantiene los IDs usados por JS: storyImage, storyCounter, storyTitle, storyText y nextStoryText.
- Se agrego storySceneNote y story-dot para progreso visual.
- story.js se modifico solo para contenido/progreso visual de la intro; no se modifican sistemas de economia, guardado o balance.
- La pantalla de almacen y setup del 44.16 se conservan.

## Patch 44.16 - Estado correcto acumulativo
- Importante: el Patch 44.15 queda reemplazado por 44.16 porque 44.15 fue armado sobre una base anterior y podía perder arreglos del 44.14.
- Base válida: 44.14 + mejoras de historieta/almacén.
- Se mantienen retratos reales de granjero/granjera y pantallas setup premium.
- Se agregan ajustes visuales de historieta y almacén.
- No se tocó JS, economía, guardado ni balance.

## Patch 44.14 - Estado actual
- Base recibida del usuario: ZIP actual con portada 44.12 y selector 44.13 aplicado.
- Se confirmó que existen los assets reales:
  - `assets/images/characters/granjero_44_0.png`
  - `assets/images/characters/granjera_44_0.png`
  - `assets/images/ui/title_logo_44_12.png`
- Patch 44.14 pule únicamente pantallas de preparación:
  - gestor de partidas,
  - selector de personaje,
  - pantalla de nombre.
- No se modificó lógica JavaScript. Las acciones `new`, `continue`, `load`, `settings`, `exit`, `select-save-slot`, `choose-character`, `confirm-name` se mantienen.
- Próximos ajustes deben hacerse con cuidado desde este ZIP actual, no desde bases viejas.

## Patch 44.13 - Selector de personaje
- La portada queda en la linea 44.12 con logo transparente real.
- El selector de personaje vuelve a usar retratos reales en lugar de emojis.
- Assets usados: `assets/images/characters/granjero_44_0.png` y `assets/images/characters/granjera_44_0.png`.
- No se toco la logica de seleccion; solo HTML/CSS/assets/docs.

## Patch 44.12 - Estado actual de portada
- El cartel principal ya no usa una imagen con fondo visible.
- Se integra un PNG limpio con transparencia real.
- La composicion base sigue siendo: logo arriba + panel compacto debajo.
- El enfoque actual es ajuste fino visual, no rediseño total.

## Patch 44.11 - Nota importante de portada
- El fallo del 44.10 no era falta de asset: era conflicto de CSS.
- La regla vieja `.title-mosaic-brand img { display:none !important; }` seguia ganando por especificidad.
- El 44.11 lo corrige con un selector mas especifico para mostrar el logo.
- Base visual: fondo calido, logo madera arriba, panel compacto con botones oscuros.

## Patch 44.10 - Estado actual de portada
- La portada mejora respecto al 44.9 corrigiendo un fallo clave: ahora el cartel/logo si viene incluido en el parche.
- El emblema principal usa un PNG transparente integrado en la composicion.
- Se reforzo la fuente de los botones y la lectura de los microtextos.
- La base visual sigue siendo: fondo calido + logo arriba + menu compacto 1 + 2 + 2.

## Patch 44.9 - Portada actual
- Base visual: Patch 44.8 refinado.
- Cambio clave: portada usa un cartel/logo generado de madera como imagen integrada, no texto CSS.
- Asset nuevo: `assets/images/ui/title_logo_44_9.png`.
- El asset se preparó con transparencia y tamaño optimizado para que no parezca una foto rectangular sobre el fondo.
- Botones: más oscuros, con textura de madera y letras crema/dorado suave.
- Mantener esta dirección si el usuario la aprueba: logo real arriba + menú compacto 1 + 2 + 2.
- No se tocaron sistemas internos del juego.

## Patch 44.8 - Estado actual de portada
- La mejor base reciente sigue siendo el enfoque del Patch 44.7 (panel compacto).
- Ajuste realizado en 44.8: agrandar un poco el conjunto y refinar material/color.
- Se elimina sensación demasiado naranja/plástica: ahora domina crema envejecida, nogal oscuro y oliva cálido.
- El layout se mantiene: título tipográfico + menú 1 + 2 + 2.
- No se tocó JS ni lógica del juego; el parche es solo de HTML/CSS/docs.

# FARM LEGACY — HANDOFF ACTUALIZADO PATCH 44.7

**Fecha:** 2026-06-26  
**Estado:** arquitectura modular estable + maquinarias universales + mercado V2 con demanda/escasez + portada con panel compacto sin logo recortado.

Este documento es para abrir otro chat o retomar el proyecto sin perder contexto. Farm Legacy ya no debe tratarse como prototipo suelto: ahora tiene una arquitectura modular pensada para crecer.

## Ajuste visual más reciente — Patch 44.7

- Se elimina el logo imagen de la portada porque se veía recortado y mal integrado.
- Se reemplaza por título tipográfico grande **Farm Legacy**.
- Se abandona la forma de fichas apretadas del 44.6.
- Se mantiene la idea de no usar barras largas, pero con forma más limpia:
  - botón principal moderado,
  - cuatro botones secundarios en dos columnas.
- Cache actualizado a `44_7_panel_compacto`.
- Importante: solo cambia HTML/CSS/cache/docs; no cambia guardado, economía, mercado, corrales ni lógica.

## Ajuste visual anterior — Patch 44.6

- La portada abandona los botones largos.
- La nueva dirección es menú de mosaicos/cartas de juego:
  - logo real del juego arriba,
  - fondo de mapa de finca como ambiente,
  - cinco botones compactos tipo carta,
  - misma paleta para todos los botones,
  - sin emojis ni colores cambiantes por botón.
- Cache actualizado a `44_6_menu_mosaico`.
- Importante: solo cambia HTML/CSS/cache/docs; no cambia guardado, economía, mercado, corrales ni lógica.

---

## 1. Regla principal del proyecto

**Antes de crecer en contenido, asegurar estructura.**

Reglas activas:

- `main.js` debe mantenerse pequeño, solo como arranque/inicialización.
- No meter lógica nueva grande dentro de `main.js`.
- Cada sistema importante debe vivir en su propio módulo.
- Ninguna regla del juego debe estar escrita dos veces.
- Productos, recetas, maquinarias y economía deben tener registros centrales.
- Nueva maquinaria = registro en `machines.js` + receta en `recipes.js` + producto en `products.js` si aplica + asset visual.
- El motor universal debe ejecutar datos, no casos especiales por máquina.

---

## 2. Estado actual jugable

Sistemas funcionando:

- Portada y flujo base del juego.
- Selector de personaje/nombre.
- Día de juego con botón **Siguiente día**.
- Animales, corrales y producción base.
- Mercado con productos, precios, historial y demanda.
- Almacén con ocupación/capacidad.
- Maquinarias con construcción en tiempo real.
- Anuncio simulado que reduce 5 minutos.
- Taller Textil.
- Quesería.
- Empaquetadora de Carne con selector de receta.
- Guardado modular.
- Scroll interno premium en pantalla de maquinarias.

---

## 3. Arquitectura actual

Estructura relevante:

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
    empaquetadora_carne.png
```

`legacy/` conserva código viejo como respaldo, pero no debe usarse para desarrollar sistemas nuevos.

---

## 4. Últimos parches integrados

### Patch 36 — Recetas centrales

Se creó `js/modules/recipes.js`.

Ahora las transformaciones viven en un catálogo central:

- Lana → Hilo Textil.
- Leche → Queso Artesanal.
- Carne fresca → Carne empaquetada.

La regla es que ninguna máquina debe escribir su receta dentro de su propio código.

### Patch 37 — Motor universal de producción

Se agregó el núcleo universal:

- `js/modules/machines.js`
- `js/modules/production.js`
- `js/modules/economy.js`

El flujo ahora es:

```text
maquinaria → receta → validar ingredientes → consumir → temporizador → recoger producto
```

### Patch 38 — Empaquetadora de Carne

Se agregó la máquina nueva:

- Nombre: **Empaquetadora de Carne**.
- Imagen: `assets/maquinas/empaquetadora_carne.png`.
- Usa selector de receta.
- Permite elegir entre pollo, res y cordero.
- No se puede cambiar receta mientras produce o tiene producto listo.

### Patch 38.1 — Fix selector receta

El selector se cerraba porque la pantalla de maquinarias refrescaba por los temporizadores. Se ajustó para que no cierre mientras el jugador está eligiendo receta.

### Patch 39 — Mercado demanda/escasez

Se creó un mercado más vivo:

- Demanda diaria por producto.
- Ventas registradas por día.
- Escasez si se vende poco respecto a la demanda.
- Saturación si se vende demasiado.
- Recuperación y ajuste diario.
- `economy.js` decide la economía.

### Patch 39.1 — Mercado UI + balance

Mejoró la pantalla del mercado:

- Tarjetas más claras.
- Barra visual de demanda.
- Demandas iniciales más balanceadas.
- Evita subidas sin sentido cuando el jugador no tiene producto ni vende.
- Mercado V2 queda funcional, pero pendiente de seguir pensando para V3.

---

## 5. Productos actuales importantes

Productos base:

- Huevo.
- Leche.
- Lana.
- Pollo Fresco.
- Res Fresca.
- Cordero Fresco.

Productos procesados:

- Queso.
- Hilo Textil.
- Pollo Empaquetado.
- Res Empaquetada.
- Cordero Empaquetado.

---

## 6. Recetas actuales

```text
hilo_textil:
  5 lana → 1 hilo
  tiempo: 30 min

queso_artesanal:
  8 leche → 2 queso
  tiempo: 35 min

empaquetado_pollo:
  3 carnePollo → 2 carnePolloEmpaquetada
  tiempo: 20 min

empaquetado_res:
  2 carneVaca → 1 carneVacaEmpaquetada
  tiempo: 25 min

empaquetado_cordero:
  2 carneOveja → 1 carneOvejaEmpaquetada
  tiempo: 25 min
```

---

## 7. Maquinarias actuales

### Taller Textil

- Costo: 300.
- Construcción: 15 min.
- Receta: `hilo_textil`.
- Reduce 5 min con anuncio.

### Quesería

- Costo: 450.
- Construcción: 20 min.
- Receta: `queso_artesanal`.
- Reduce 5 min con anuncio.

### Empaquetadora de Carne

- Costo: 750.
- Construcción: 25 min.
- Recetas disponibles:
  - `empaquetado_pollo`
  - `empaquetado_res`
  - `empaquetado_cordero`
- Reduce 5 min con anuncio.

---

## 8. Mercado actual

El mercado ya no es solo precio aleatorio. Ahora considera:

- Demanda diaria.
- Cantidad vendida hoy.
- Estado del producto:
  - Normal.
  - Demanda abierta.
  - Escasez.
  - Saturado.
  - Sin actividad.
- Elasticidad.
- Recuperación diaria.
- Historial de precios.

Pendiente: seguir diseñando Mercado V3 con más claridad estratégica.

---

## 9. Próximo trabajo recomendado

No conviene seguir tocando el mercado a ciegas. Recomendado:

1. Guardar documentación actual.
2. Probar varios días el balance del mercado.
3. Pensar Mercado V3 con calma.
4. Próximo gran sistema posible: contratos/pedidos.
5. También puede hacerse pulido general de balance antes de nuevos sistemas.

---

## 10. Advertencias importantes

- No romper la arquitectura universal.
- No volver a escribir recetas dentro de maquinarias.
- No crear productos directamente en mercado sin registrarlos en `products.js`.
- No duplicar fórmulas económicas entre `market.js` y `economy.js`.
- Si se toca el mercado, cuidar mucho que el jugador entienda por qué sube o baja un precio.
- El mercado actual funciona, pero todavía necesita diseño V3 más adelante.
