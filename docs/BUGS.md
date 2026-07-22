## Patch 44.37 - Bug de scroll en Producción
- Corregido: Centro de Producción no permitía desplazamiento vertical de forma confiable.
- Se añade scroll interno explícito y protección frente al render automático durante el desplazamiento.

## QA visual/funcional Patch 44.36
- Confirmar que los botones del Centro de Producción responden al primer toque.
- Confirmar que el timer de actualización no interrumpe taps/clicks.
- Confirmar que imágenes de animales y maquinarias ya no quedan apretadas o recortadas.
- Probar todas las pestañas y navegación hacia Corrales/Maquinarias.

## QA Patch 44.35 - Centro de Producción
- Revisar acceso desde el botón Producción de la pantalla principal.
- Probar pestañas Resumen, Animales, Maquinarias y Listo para recoger.
- Confirmar navegación a Corrales y Maquinarias.
- Confirmar recogida de producto terminado desde el centro.
- Revisar actualización de temporizadores sin perder scroll.

## QA visual/funcional Patch 44.34
- Probar si los botones de Maquinarias ya responden al primer toque.
- Revisar contraste de descripción, receta, stock y selector.

## QA visual/funcional Patch 44.33
- Revisar scroll interno de Maquinarias.
- Probar construir, producir, recoger y acelerar con anuncio.
- Probar selector de receta de Empaquetadora de Carne.
- Confirmar que ningún temporizador o estado fue alterado.

## QA visual Patch 44.32
- Revisar contraste de popups Comprar, Mejorar y Matadero en Corrales.
- Validar lectura de precios, stats, campos y previews.

## QA visual Patch 44.31
- Revisar contraste de Matadero: advertencia, rendimiento, producto esperado y preview.

## QA visual Patch 44.30
- Confirmar que etiquetas, reglas de ocupación, valores y subtítulos del Almacén sean legibles.
- Confirmar que no haya cortes ni desbordes en desktop ni móvil.

## QA visual/funcional Patch 44.29
- Confirmar Almacén vacío y con inventario.
- Confirmar cálculo visual de capacidad, exceso y multa.
- Confirmar apertura del popup de mejora.
- Confirmar que el tooltip de demanda de Mercado es más grande y sigue 100% opaco.

## QA Patch 44.28
- Verificar que el tooltip de demanda no deje ver la gráfica a través del fondo.
- Verificar que el tooltip quede por encima del gráfico y sea legible al 100%.
- Verificar hover/focus en escritorio y comportamiento fijo en móvil.

## QA Patch 44.27
- Confirmar que el tooltip no deja ver ningún elemento detrás.
- Confirmar que el navegador carga CSS 44.27 y no una versión en caché anterior.

## QA visual Patch 44.26
- Confirmar que el tooltip del Mercado ya no se percibe transparente.

## QA visual Patch 44.25
- Confirmar que el popup del Mercado ya no parece transparente.
- Confirmar que números, ejes y línea de la gráfica se leen sin esfuerzo.
- Confirmar que el tooltip de información no tapa la zona de cantidad/operación.

## QA visual/funcional Patch 44.24
- Confirmar que `Todo` no muestra popup ni aviso.
- Confirmar que `Todo` solo rellena el input con el inventario disponible.
- Confirmar que el tooltip de información de demanda aparece al pasar el mouse y al enfocar el icono.
- Confirmar que comprar/vender y categorías siguen funcionando.

## QA visual/funcional Patch 44.23
- Confirmar que las filas son ligeramente más pequeñas que en 44.22.
- Confirmar que los filtros de categoría cambian la lista sin afectar compra/venta.
- Confirmar que categorías vacías no aparecen.
- Confirmar que Todo sigue solo cargando cantidad y no vende automáticamente.

## QA visual/funcional Patch 44.22
- Verificar que las filas del Mercado sean más compactas.
- Verificar que la demanda ya no aparezca en la lista, solo en el popup.
- Confirmar que comprar, vender y Todo sigan funcionando.

## QA visual/funcional Patch 44.21
- Confirmar scroll vertical en Mercado.
- Confirmar que `Todo` solo carga cantidad y no vende.
- Confirmar que el detalle de demanda se consulta tocando el producto.

## QA visual Patch 44.20
- Revisar lista de productos del mercado en desktop y móvil.
- Probar abrir modal de producto y ejecutar comprar/vender/vender todo.
- Revisar que el resumen de demanda se vea bien y no corte.
- Confirmar que no se alteró la lógica de mercado.

## QA visual Patch 44.19
- Confirmar que las 3 tarjetas de corrales cargan con imagen real.
- Confirmar que Gestionar abre el detalle correcto.
- Confirmar que comprar, mejorar y matadero siguen abriendo sus modales.
- Confirmar que no se rompió la pantalla principal 44.18.

## QA visual Patch 44.18
- Revisar HUD (dinero, día, almacén, guardado).
- Revisar acceso a las 6 secciones desde la pantalla principal.
- Revisar botón siguiente día.
- Confirmar que el panel lateral no corta texto en desktop ni móvil.

## QA Patch 44.17
- Validar que la intro avance por las 3 escenas.
- Validar que el typewriter se complete al hacer clic si aun esta escribiendo.
- Validar que Saltar intro lleva al almacén.
- Validar que al terminar la tercera escena se abre selección de almacén.

## QA Patch 44.16
- Verificar que al aplicar el parche no se pierden mejoras del 44.14.
- Revisar flujo: portada → partidas → personaje con retratos → nombre → historieta → almacén.
- Confirmar que no hay emojis viejos en selector de personaje y que el almacén conserva sus acciones.

## QA Patch 44.14
- Verificar que el selector siga mostrando imágenes reales, no emojis.
- Verificar que el gestor de partidas siga renderizando los 3 slots desde JS.
- Verificar que la pantalla de nombre siga aceptando texto y que los botones mantengan sus acciones.
- Sin cambios esperados en economía, guardado o módulos.

## QA visual Patch 44.13
- Confirmar que ya no aparecen emojis en el selector de personaje.
- Confirmar que los retratos cargan correctamente.
- Confirmar que los botones siguen ejecutando `choose-character`.

## QA visual Patch 44.12
- Confirmar que el logo no tiene fondo claro visible.
- Confirmar integracion natural del emblema sobre la escena de fondo.
- Sin cambios funcionales previstos.

## Bug visual corregido en 44.11
- El logo no aparecia aunque el asset existia.
- Causa: conflicto CSS por especificidad con una regla antigua que escondia imagenes en la marca.
- Estado: corregido por CSS en Patch 44.11.

## QA visual Patch 44.10
- Confirmar que el logo/cartel aparece correctamente en la portada.
- Confirmar legibilidad de titulos y subtitulos dentro de los botones.
- Sin cambios funcionales previstos.

## QA visual Patch 44.9
- Revisar que `assets/images/ui/title_logo_44_9.png` cargue correctamente.
- Revisar que el logo no se vea como rectángulo pegado sobre el fondo.
- Revisar que los botones oscuros sigan siendo legibles en pantalla normal y completa.
- No hay cambios funcionales previstos.

## QA visual Patch 44.8
- Sin cambios funcionales previstos.
- Revisar solamente percepción visual: escala, legibilidad, contraste y armonía de color en la portada.

# FARM LEGACY — BUGS / QA PATCH 44.7

## Bugs corregidos recientemente

### Logo recortado y mosaicos feos en portada

Estado: corregido visualmente en Patch 44.7.

Problema:

- El logo real se veía recortado/mal integrado.
- Los mosaicos del 44.6 se veían como fichas apretadas.
- Los numeritos no aportaban calidad visual.

Solución:

- Se elimina la imagen del logo en portada.
- El título pasa a texto grande por CSS.
- Los botones se reorganizan como panel compacto 1 + 2 + 2.
- Se quitan los numeritos.

Pendiente:

- Probar si el panel debe ser más ancho, más bajo o con menos sombra.

### Portada seguía con botones largos y aspecto de web

Estado: replanteada visualmente en Patch 44.6.

Problema:

- Las versiones anteriores seguían usando barras horizontales demasiado largas.
- Los botones cambiaban demasiado de color.
- La portada no se sentía como menú de videojuego.

Solución:

- Se cambia a mosaicos compactos.
- Todos los botones comparten el mismo color base.
- Se elimina el uso de emojis en portada.

Pendiente:

- Probar si los mosaicos deben ser más grandes, más separados o moverse ligeramente.

### Selector de receta se cerraba rápido

Estado: corregido en Patch 38.1.

Causa: la pantalla de maquinarias se refrescaba por temporizadores y reconstruía el selector.

Solución: proteger la interacción mientras el jugador está seleccionando receta.

### Tarjetas de maquinarias muy pegadas

Estado: corregido en Patch 35.3.

### Animación hover molesta en maquinarias

Estado: corregido en Patch 35.2.

### Scroll de maquinarias faltante

Estado: corregido en Patch 35.1.

### Quesería quedaba cortada en pantalla

Estado: corregido con scroll interno.

---

## Bugs/zonas a vigilar

### Mercado V2 todavía necesita revisión visual

No es un bug técnico, pero sí una zona de diseño pendiente.

Vigilar:

- Que los precios no suban o bajen sin explicación.
- Que las demandas se sientan justas.
- Que el jugador entienda saturación/escasez.

### Guardado de recetas seleccionadas

Verificar que la Empaquetadora recuerde la receta elegida al salir/entrar o recargar.

### Producción pendiente al recargar

Verificar:

- Máquina construyendo.
- Máquina produciendo.
- Máquina lista para recoger.
- Recargar navegador.
- Estado debe mantenerse.

### Anuncio en producción/construcción

Verificar que reduzca 5 minutos correctamente sin romper el estado.

### Almacén y productos nuevos

Verificar que carnes empaquetadas ocupen el espacio correcto y aparezcan en mercado/almacén.

---

## Checklist QA por parche

```text
Nueva partida
Continuar partida
Comprar/construir Taller Textil
Producir/recoger Hilo
Comprar/construir Quesería
Producir/recoger Queso
Comprar/construir Empaquetadora
Cambiar receta
Producir/recoger pollo empaquetado
Producir/recoger res empaquetada
Producir/recoger cordero empaquetado
Usar anuncio en construcción
Usar anuncio en producción
Vender productos en mercado
Pasar día
Revisar demanda/precio
Recargar y continuar
```
