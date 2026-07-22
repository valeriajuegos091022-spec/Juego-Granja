## Patch 44.37 - Scroll estable en Centro de Producción
- Se corrige el scroll vertical de la pantalla de Producción.
- Producción ahora tiene un viewport interno explícito porque el juego bloquea el scroll global de html/body.
- El refresco automático se pausa brevemente mientras el jugador desplaza la pantalla para evitar tirones o saltos.
- No se toca economía, guardado, recetas ni fórmulas.

## Patch 44.36 - Centro de Producción: layout y primer toque
- Se reorganiza el Centro de Producción para dar más aire a imágenes, tarjetas y botones.
- En el resumen, Animales y Maquinarias pasan a bloques completos con tarjetas más anchas.
- Las imágenes de maquinaria usan `contain` para mostrarse completas y no quedar recortadas/apretadas.
- Se corrige una causa real del doble toque: el render automático de 1 segundo podía reemplazar un botón entre `pointerdown` y `click`.
- Se pausa temporalmente el render durante la interacción y se usa resolución por `pointerup` con deduplicación.
- Sin cambios en economía, guardado, recetas, producción ni balance.

## Patch 44.35 - Centro de Producción
- Se crea la pantalla funcional de Centro de Producción.
- Resume producción animal, estado de maquinarias, procesos activos, productos listos y capacidad de almacén.
- Incluye pestañas: Resumen, Animales, Maquinarias y Listo para recoger.
- Permite navegar a corrales y maquinarias, y recoger producción industrial terminada usando la lógica existente.
- Se añade el módulo `js/modules/production_center.js` y el CSS modular `css/production_center.css`.
- No se modifica economía, balance, guardado, recetas ni fórmulas de producción.

## Patch 44.34 - Maquinarias: botones y doble toque
- Se mejora el verde del botón principal de Maquinarias.
- Se ajusta un poco más el contraste general de tarjetas y cajas internas.
- Se refuerza el manejo de eventos en Maquinarias para evitar casos donde pareciera que había que tocar dos veces los botones.
- No se tocan recetas, tiempos, anuncios ni lógica de producción.

## Patch 44.33 - Maquinarias premium
- Se pule la pantalla de Maquinarias con una estructura visual más clara y coherente con el resto del juego.
- Se limpian cabecera, ayudas, tarjetas de máquinas, recetas, stock, estados y barras de progreso.
- Se reducen emojis decorativos en cabecera y títulos de máquina.
- Se mantienen intactos temporizadores, recetas, anuncios, construcción, producción y recogida.

## Patch 44.32 - Contraste global en popups de Corrales
- Se revisa el contraste de todos los popups de Corrales: Comprar, Mejorar y Matadero.
- Se corrigen tarjetas claras con texto demasiado pálido.
- Se unifica la lectura de títulos, etiquetas, valores y descripciones.
- Ajuste visual únicamente; sin tocar lógica ni cálculos.

## Patch 44.31 - Contraste de Matadero
- Se corrige el contraste del popup de Matadero.
- El bloque “Decisión rápida”, las tarjetas de rendimiento y el preview interno ahora tienen lectura mucho más clara.
- Ajuste visual únicamente; no se tocan cálculos ni lógica del matadero.

## Patch 44.30 - Almacén más legible
- Se mantiene la estructura visual del Almacén 44.29.
- Se aumenta ligeramente el ancho útil del modal.
- Se agrandan y engrosan etiquetas, descripciones, estadísticas y textos secundarios.
- Las tarjetas de productos reciben más espacio y mejor jerarquía tipográfica.
- No se toca lógica, capacidad, multas, mejora, economía ni guardado.

## Patch 44.29 - Almacén interno premium + tooltip Mercado mayor
- Se rediseña visualmente el resumen interno del Almacén sin tocar cálculos ni reglas.
- Capacidad, estado, ocupación, sobrecapacidad, multa, mejora y productos guardados quedan mejor organizados.
- El tooltip de demanda del Mercado se agranda ligeramente para mejorar la lectura.
- Se mantiene el fondo sólido corregido en el Patch 44.28.
- No se toca economía, guardado, balance ni lógica de inventario.

## Patch 44.28 - Tooltip opaco: corrección estructural real
- Se detectó la causa raíz del tooltip transparente: una regla antigua aplicaba `opacity:.72` a todos los `span` dentro de la demanda, y el wrapper completo del tooltip también era un `span`.
- Se cambia la estructura del tooltip a `div` para evitar esa herencia.
- Se fuerza el bloque de demanda por encima de la gráfica mediante `z-index` y stacking order explícito.
- El fondo del tooltip es sólido `#2d1a0f`, sin transparencias, filtros ni mezcla de capas.
- Sin cambios en economía, precios, guardado ni balance.

## Patch 44.27 - Tooltip 100% opaco real
- Se corrige de raíz el tooltip de información del Mercado.
- Se elimina el uso de opacity/transición para mostrarlo.
- Ahora se oculta con display:none y aparece con display:flex, siempre 100% opaco.
- Se fuerza un nuevo cache tag 44.27 para impedir que el navegador reutilice CSS anterior.

## Patch 44.26 - Tooltip sólido en Mercado
- Se corrige el tooltip de información del popup del Mercado para que use un fondo sólido, sin sensación de transparencia.
- Ajuste visual fino únicamente.

## Patch 44.25 - Popup de Mercado con contraste real
- Se elimina la sensación de transparencia del popup del producto.
- El modal usa ahora un fondo sólido tipo pergamino.
- La gráfica pasa a un panel nogal oscuro con ejes, números y línea mucho más legibles.
- Las tarjetas de estadísticas y demanda quedan opacas y con mejor contraste.
- El tooltip de información ahora es totalmente opaco y abre hacia arriba para no tapar la zona de cantidad.
- No se toca economía, guardado, precios ni balance.

## Patch 44.24 - Mercado: TODO silencioso y popup limpio
- El botón `Todo` ahora solo carga la cantidad disponible, sin popup, aviso ni interrupción.
- Se limpia el popup del producto para reducir texto explicativo visible.
- La explicación de demanda se mueve a un icono de información con tooltip al pasar el mouse o enfocar.
- Se mantiene visibles los datos clave: demanda diaria, vendido, restante, estado y cobertura.
- Se refina el aspecto del modal, gráfica y bloques de estadísticas.
- Sin cambios en economía, precios, guardado ni balance.

## Patch 44.23 - Mercado más compacto y categorías escalables
- Se reducen un poco más las filas de productos para mostrar más contenido en pantalla.
- Se añade un sistema de filtros por categorías preparado para crecimiento futuro.
- Categorías previstas: Todos, Básicos, Lácteos, Cárnicos, Elaborados, Conservas y Cultivos.
- Solo se muestran las categorías que actualmente tienen productos, evitando pestañas vacías.
- No se toca economía, guardado, precios ni balance.

## Patch 44.22 - Mercado compacto
- Se compactan las filas de productos del Mercado para que quepan más elementos visibles.
- Se elimina la demanda de la lista principal para reducir carga visual.
- La información de demanda queda priorizada dentro del popup/modal al tocar cada producto.
- No se altera economía, guardado ni lógica de precios.

## Patch 44.21 - Mercado: scroll y boton TODO corregidos
- Se recupera el scroll de la pantalla de Mercado.
- El botón `Todo` ya no vende automáticamente: ahora solo carga la cantidad máxima disponible en el input.
- Se hace más visible el botón `Todo`.
- Se reduce el tamaño visual de las barras/resumen de demanda en la lista.
- Se deja el detalle fuerte para el modal al tocar el producto.
- No se toca economía, guardado ni lógica de precios.

## Patch 44.20 - Mercado premium
- Se pule la pantalla de Mercado con estructura más clara y premium.
- Se mejora el resumen superior y la lista de productos.
- Cada producto muestra mejor precios, inventario, acciones rápidas y un resumen visual de demanda.
- No se altera la economía ni la lógica de compra/venta; solo cambia presentación/render UI.

## Patch 44.19 - Corrales premium
- Se pule la pantalla de Corrales: HUD, ayudas, tarjetas de especies y detalle individual.
- Las tarjetas ahora muestran imagen real, progreso de capacidad, precio animal, producción y etapas de forma más limpia.
- Se reduce el uso de emojis decorativos en Corrales y se reemplaza por etiquetas premium.
- Se mejora la presentación de modales de comprar, mejorar y matadero sin cambiar la lógica.
- No se toca economía, guardado ni balance de animales.

## Patch 44.18 - Pantalla principal premium
- Se pule la pantalla principal del juego (HUD, secciones, panel de ayuda y botón de siguiente día).
- Se corrige la estructura del topbar para 4 bloques reales y más legibles.
- Se reducen los emojis decorativos y se reemplazan por etiquetas y microtextos más premium.
- Las secciones Mercado, Corrales, Maquinarias, Almacén, Producción y Contratos quedan más claras y limpias.
- No se toca lógica, economía, guardado ni navegación.

## Patch 44.17 - Intro cinematica Don Mateo
- Se rehace la estructura de la intro/historieta, no solo el color.
- La intro pasa a formato cinematografico: imagen grande + panel de carta/narracion.
- Se agregan nota de escena y progreso visual de 3 pasos.
- Se reescriben los textos de la intro para que cuenten mejor el legado de Don Mateo.
- Se mantiene el flujo: siguiente escena, saltar intro y pasar a seleccion de almacen.
- No se toca economia, guardado, balance ni sistemas de juego.

## Patch 44.16 - Acumulativo setup + historieta + almacén
- Corrige el error del Patch 44.15: ese parche se construyó sobre una base anterior y podía sobrescribir mejoras del Patch 44.14.
- Este parche parte del Patch 44.14 y suma los cambios visuales de historieta y selección de almacén.
- Se conservan las pantallas ya arregladas: portada, selector con retratos reales, escoger partidas y poner nombre.
- Se rediseñan historieta e inicio de almacén sin tocar lógica JS, economía, guardado ni balance.

## Patch 44.14 - Pantallas setup premium
- Se pulen visualmente tres pantallas previas al juego: selector de granjero/granjera, gestor de partidas y pantalla de nombre.
- Se unifica el fondo con el mapa cálido de finca usado en la portada actual.
- Se mejoran paneles, bordes, sombras, textura madera y legibilidad de textos.
- El selector conserva las imágenes reales del Patch 44.13 y mantiene las mismas acciones de elección.
- El gestor de partidas conserva la lógica de usuario + 3 slots; solo cambia presentación visual.
- La pantalla de nombre conserva input, volver y continuar; solo cambia presentación visual.
- No se tocaron JS, economía, guardado ni balance.

## Patch 44.13 - Selector con retratos reales
- Se recuperan los retratos `granjero_44_0.png` y `granjera_44_0.png` en la pantalla de seleccion de personaje.
- Se eliminan los emojis del selector de granjero/granjera.
- Se cambia el marco circular por un marco premium rectangular-redondeado para mostrar mejor las imagenes.
- Se mantiene intacta la logica `data-action=choose-character` y `data-gender`.
- Sin cambios en economia, guardado ni balance.

## Patch 44.12 - Logo transparente real
- Se reemplaza el cartel anterior por un PNG con transparencia real.
- Se elimina el aspecto de pegatina blanca/beige alrededor del logo.
- Se ajusta el CSS del encabezado para integrar mejor el emblema sobre el fondo.
- No hay cambios en botones, logica, guardado ni economia.

## Patch 44.11 - Correccion real del logo oculto
- Se corrige la causa exacta de que el cartel/logo no apareciera: una regla antigua con mayor especificidad ocultaba las imagenes dentro del titulo.
- Se fuerza el logo con `.title-logo-brand .title-logo-image { display:block !important; }`.
- Se conserva el asset `title_logo_44_10.png`.
- Se mejora un poco mas la legibilidad de los textos pequenos de botones.
- Sin cambios en logica, guardado ni economia.

## Patch 44.10 - Logo visible y fuente reforzada
- Se corrige el fallo del Patch 44.9 donde el cartel/logo no aparecia porque faltaba el asset dentro del parche.
- Se agrega `assets/images/ui/title_logo_44_10.png` como PNG con fondo transparente.
- Se refuerza la tipografia de botones: titulos mas gordos y subtitulos pequenos mas legibles.
- Se ajusta un poco escala/espaciado del logo y del menu principal.
- Sin cambios en logica, guardado o economia.

## Patch 44.9 - Logo madera integrado
- Se integra la primera opción de logo/cartel generado como asset real: `assets/images/ui/title_logo_44_9.png`.
- Se elimina el título tipográfico anterior de la portada para evitar que se vea plano o feo.
- El logo fue preparado como PNG con transparencia para no parecer una imagen rectangular pegada sobre otra.
- Se oscurecen los botones y el panel con textura tipo madera/nogal.
- Se cambia la fuente visual de los botones hacia una serif más elegante.
- Se mantiene la estructura compacta del 44.8 y no se toca lógica, guardado ni economía.

## Patch 44.8 - Panel refinado
- Base: Patch 44.7 (panel compacto), conservando la misma estructura general.
- Portada agrandada un poco: título, panel y botones aumentan presencia visual.
- Nueva dirección de color/textura: menos naranja duro, más crema, nogal y oliva suave.
- Botones con material más premium: placa cálida, brillo suave, veta/estrías sutiles e interior más limpio.
- Menú con más aire entre tarjetas y mejor lectura general.
- Sin cambios en lógica, economía, guardado ni navegación de botones.

# FARM LEGACY — CHANGELOG

## V44.7 — Panel compacto sin logo recortado

- Se corrige la portada del 44.6 porque el logo imagen se veía recortado y los mosaicos quedaban feos/apretados.
- Se elimina el uso de `assets/logo/farm_legacy_logo.png` en la portada.
- El título **Farm Legacy** pasa a ser texto grande por CSS.
- El menú mantiene la idea de botones compactos, pero cambia a composición 1 + 2 + 2:
  - Nueva Partida como botón principal.
  - Continuar / Cargar en segunda fila.
  - Ajustes / Salir en tercera fila.
- Se quitan los numeritos 01/02/03/04/05.
- Se actualizan los `?v=` de `index.html` a `44_7_panel_compacto` para evitar caché vieja.
- No se cambia lógica de partidas, guardado, economía, mercado, corrales ni selección de personaje.

## V44.6 — Menú mosaico

- Se cambia completamente la portada para dejar atrás los botones largos.
- El menú principal ahora usa mosaicos/cartas de juego, no barras horizontales.
- Todos los mosaicos usan el mismo color base madera/crema; no hay mezcla fuerte de verde/dorado/azul.
- Se usa el logo real `assets/logo/farm_legacy_logo.png`.
- El fondo pasa a `assets/images/ui/farm_map_43_1.png` como ambiente.
- Se eliminan emojis de portada.
- Se actualizan los `?v=` de `index.html` a `44_6_menu_mosaico` para evitar caché vieja.
- No se cambia lógica de partidas, guardado, economía, mercado, corrales ni selección de personaje.

## V39.1 — Mercado UI + Balance

- Se mejora la pantalla de mercado para que no parezca una tabla pesada.
- Se organizan productos en tarjetas más legibles.
- Se añade barra visual de demanda.
- Se muestran mejor vendido/demanda/restante.
- Se ajusta la demanda inicial para que tenga más sentido en early game.
- Se evita que productos sin ventas ni stock del jugador disparen precios de forma absurda.
- El mercado queda funcional como V2, aunque pendiente de rediseño estratégico V3.

## V39 — Mercado con demanda y escasez

- Se crea mercado inteligente V1.
- Se agrega demanda diaria por producto.
- Se registra `vendidoHoy`.
- Se implementan estados de mercado:
  - Normal.
  - Demanda abierta.
  - Escasez.
  - Saturado.
  - Sin actividad.
- Se crea `js/modules/economy.js` como cerebro económico.
- Los precios ahora se ajustan por comportamiento del jugador, no solo por azar.
- La demanda se recupera o cambia al pasar el día.
- Se agrega elasticidad por producto.

## V38.1 — Fix selector receta Empaquetadora

- Se corrige el problema donde el desplegable de receta se cerraba rápido.
- La causa era el refresco periódico de la pantalla de maquinarias.
- Ahora el selector se respeta mientras el jugador está eligiendo.

## V38 — Empaquetadora de Carne

- Se agrega nueva maquinaria: **Empaquetadora de Carne**.
- Se agrega imagen industrial/rústica para la máquina.
- Se implementa selector de receta dentro de la tarjeta.
- La misma máquina permite empaquetar:
  - Pollo.
  - Res.
  - Cordero.
- Se agregan productos procesados:
  - Pollo Empaquetado.
  - Res Empaquetada.
  - Cordero Empaquetado.
- Se agregan recetas:
  - `empaquetado_pollo`.
  - `empaquetado_res`.
  - `empaquetado_cordero`.
- La máquina usa el motor universal.

## V37 — Motor Universal de Producción

- Se introduce `js/modules/machines.js`.
- Se introduce `js/modules/production.js`.
- Las máquinas pasan a ser datos.
- La producción se vuelve flujo universal:
  - Máquina.
  - Receta.
  - Validación.
  - Consumo.
  - Temporizador.
  - Recogida.
- Taller Textil y Quesería dejan de ser casos especiales.

## V36 — Recetas Centrales

- Se crea `js/modules/recipes.js`.
- Las recetas dejan de estar escritas dentro de maquinarias.
- Se centralizan entradas, salidas y tiempo de producción.
- Recetas incluidas:
  - Hilo Textil.
  - Queso Artesanal.
  - Empaquetados de carne.

## V35.3 — Espaciado Maquinarias

- Se ajusta separación entre tarjetas de maquinarias.
- Se mantiene scroll premium.
- Mejora lectura visual de Taller Textil y Quesería.

## V35.2 — Fix Animación Maquinarias

- Se corrige hover excesivo en tarjetas.
- La tarjeta ya no se mueve de forma molesta al poner el mouse.
- Se mantiene sensación premium sin incomodar.

## V35.1 — Maquinarias Premium Scroll

- Se crea scroll interno en pantalla de maquinarias.
- Se evita que Quesería o futuras máquinas queden cortadas.
- Se agrega `css/machinery_premium.css`.
- Se mejora look visual de cards, estado, progreso y brillo.

## V35 — Quesería V1

- Se agrega Quesería.
- Receta inicial: leche → queso.
- Imagen rústica premium.
- Construcción y producción en tiempo real.
- Anuncio reduce 5 minutos.

## V34 — Registro Central de Productos

- Se crea catálogo central de productos.
- Productos tienen precio inicial, mínimo, máximo, icono y almacenamiento.
- Se prepara el proyecto para recetas, mercado y almacén más consistentes.

## V33 — Motor Modular de Maquinarias

- Se divide maquinaria en submódulos.
- Se prepara motor escalable para múltiples máquinas.
- Se separan UI, estado, acciones, timers, anuncios y guardado.

## V32 — Anuncio Simulado

- Se implementa prueba de anuncio/recompensa.
- El botón abre enlace externo tipo video y aplica reducción de tiempo.
- Futuro reemplazo: AdMob Rewarded Ads.

## V31 — Arquitectura Modular Real

- `main.js` queda más limpio.
- Se evita seguir acumulando lógica en un solo archivo.
- Se empieza a consolidar estructura modular.

## V30 — QA Guardado y Taller Textil

- Se corrige flujo de Taller Textil.
- Se consume lana al iniciar producción.
- Se recoge hilo al finalizar.
- Se mejora guardado de maquinarias.


## Patch 40 - Balance general

- Se agregó `js/modules/balance.js` como base central para ajustes de economía y ritmo.
- Se ajustó el dinero inicial, almacenes, demanda, tiempos de recetas y costos/tiempos de maquinarias.
- El Mercado V2 queda funcional y Mercado V3 queda pendiente para rediseño estratégico.
