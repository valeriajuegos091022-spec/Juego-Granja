## Regla de pantallas largas - 44.37
- Como el shell global usa overflow:hidden, toda pantalla larga debe declarar explícitamente height:100dvh y overflow-y:auto.
- En pantallas con refresco automático, pausar el render mientras el usuario hace scroll.

## Linea visual 44.36
- En Centro de Producción, evitar imágenes estrechas en columnas laterales.
- Animales pueden usar imagen protagonista; maquinarias deben mostrarse completas con `object-fit: contain`.
- El resumen debe priorizar respiración, jerarquía y acciones claras sobre densidad excesiva.

## Línea visual 44.35 - Centro de Producción
- El Centro de Producción funciona como panel de control: resumen compacto arriba y detalle por pestañas abajo.
- Colores: crema cálido, nogal oscuro y verde oliva para estados positivos/progreso.
- Evitar listas eternas: usar pestañas y tarjetas modulares escalables.
- La pantalla debe mostrar estado y acceso rápido, pero no duplicar formularios complejos de otros sistemas.

## Linea visual 44.34
- En Maquinarias, la acción principal puede usar verde vivo para transmitir avance/producción.
- Cajas informativas internas deben tener mejor contraste que el fondo general para no perderse.

## Linea visual 44.33
- Maquinarias: tarjetas claras tipo gestión industrial rural, con imágenes reales protagonistas y datos bien separados.
- Evitar grandes bloques oscuros y emojis decorativos innecesarios.
- Estados, recetas, inventario y progreso deben poder leerse de un vistazo.

## Linea visual 44.32
- Popups de gestión animal deben usar crema cálido para tarjetas, nogal oscuro para cajas de precio y texto siempre oscuro sobre fondos claros.
- Evitar etiquetas doradas demasiado pálidas cuando el fondo es claro.

## Linea visual 44.31
- En modales de decisión como Matadero, evitar texto claro sobre fondos claros o grisáceos.
- Priorizar crema cálido con texto nogal oscuro y acentos verdes/rojos solo para estado.

## Línea visual 44.30
- Los textos secundarios no deben bajar tanto de tamaño que requieran esfuerzo para leerlos.
- En modales de gestión, priorizar ancho útil, contraste y tipografía secundaria de al menos lectura cómoda.

## Línea visual 44.29
- Almacén interno: gestión clara, cálida y premium, con crema, nogal y oliva.
- La información crítica debe separarse en bloques: capacidad, estado, mejora y productos.
- Tooltips informativos: fondo sólido oscuro y tipografía suficientemente grande para leer sin esfuerzo.

## Regla tooltip Mercado 44.28
- No usar wrappers `span` para tooltips dentro de `.modal-demand-info`, porque existen reglas antiguas de opacidad para spans.
- Tooltip informativo: fondo sólido oscuro, sin alpha ni backdrop-filter.
- La capa de demanda debe quedar por encima de la gráfica cuando el tooltip se extienda hacia arriba.

## Linea visual 44.27
- Tooltips de información: fondo sólido real, sin transparencia ni animación por opacity cuando la lectura sea prioritaria.

## Linea visual 44.26
- Tooltips informativos sobre fondos claros deben usar color sólido oscuro y texto claro.

## Línea visual 44.25
- Los modales informativos deben ser opacos y legibles; evitar transparencias sobre fondos muy detallados.
- Gráficas: panel oscuro sólido, ejes claros y línea dorada con alto contraste.
- Tooltips: fondo opaco, texto corto y apertura que no tape controles importantes.

## Línea visual 44.24
- Popup de Mercado: mostrar datos, no párrafos largos.
- Explicaciones contextuales deben ir en iconos de información/tooltip cuando no sean necesarias todo el tiempo.
- La interacción `Todo` debe ser silenciosa y predecible: preparar cantidad, nunca vender automáticamente.

## Línea visual 44.23
- Mercado debe escalar mediante pestañas compactas de categoría, no mediante una lista interminable.
- Mostrar solo categorías con productos disponibles.
- Categorías de futuro previstas: Básicos, Lácteos, Cárnicos, Elaborados, Conservas y Cultivos.

## Linea visual 44.22
- Mercado: lista ligera, compacta y operativa.
- Detalle rico (demanda, gráfica, contexto) en el popup del producto, no en la lista.

## Linea visual 44.21
- En Mercado, la lista principal debe ser ligera y operativa; la lectura detallada vive en el modal.
- Botón `Todo` = preparar cantidad, no ejecutar venta.

## Linea visual 44.20
- Mercado: tarjetas claras, precios visibles y acciones rápidas limpias.
- Resumen de demanda visible sin saturar la pantalla.
- Mantener lectura premium: crema, nogal, oliva suave y textos legibles.

## Línea visual 44.19 - Corrales
- Corrales debe sentirse como una sección premium de gestión animal: tarjetas claras, madera oscura de fondo, imágenes reales protagonistas.
- Evitar exceso de emojis decorativos en pantallas principales de gestión.
- Usar etiquetas cortas, microtextos y barras de progreso para explicar capacidad y estado.

## Linea visual 44.18
- Pantalla principal: HUD limpio, módulos de acción con microtextos y botón de siguiente día protagonista.
- Menos emojis decorativos, más etiquetas premium.
- Panel lateral de guía debe ser útil y visualmente simple, sin ruido.

## Linea intro 44.17
- La intro debe sentirse como escena narrativa, no como popup.
- Estructura recomendada: imagen protagonista + panel de carta + progreso visual.
- Texto grande, cálido, legible y sin ruido visual.
- Mantener estilo premium rural: madera oscura, pergamino, oliva y dorado envejecido.

## Línea visual 44.16
- Mantener coherencia entre portada, setup, historieta y almacén.
- No volver a bases viejas con emojis o pantallas setup antiguas.
- Parche acumulativo actual: portada premium + setup premium + historieta/almacén premium.

## Línea visual Patch 44.14
- Pantallas previas al juego deben verse como parte del mismo paquete visual que la portada.
- Materiales: madera oscura, crema cálida, dorado envejecido y verde/oliva suave.
- Evitar emojis, botones chillones y paneles con apariencia de prototipo.
- Los retratos deben verse como retratos reales, no como iconos baratos.
- Los textos pequeños deben mantener contraste suficiente sobre madera oscura.

## Selector de personaje 44.13
- Usar retratos reales para Granjero y Granjera, no emojis.
- Marcos premium con esquinas redondeadas, borde dorado y sombra suave.
- Mantener lectura clara de nombre, descripcion y boton ELEGIR.

## Linea portada 44.12
- El logo principal debe ser un emblema con fondo transparente real.
- Evitar rectangulos o nubes claras detras del logo.
- Mantener contraste claro en tipografia sobre botones oscuros de madera.

## Portada 44.11
- Cuando se use logo en imagen dentro de `.title-mosaic-brand`, recordar que hay reglas viejas que ocultan imagenes.
- Usar selector especifico `.title-logo-brand .title-logo-image` para assets de logo.
- Botones: madera oscura, texto crema grueso y subtitulos visibles.

## Linea portada 44.10
- Logo principal: emblema de madera integrado, no rectangulo pegado.
- Botones: madera oscura tipo nogal, relieve suave, texto claro de alto contraste.
- Tipografia recomendada en botones: serif fuerte, gruesa y muy legible.
- Subtitulos pequenos deben seguir siendo visibles sin esfuerzo.

## Portada 44.9 - Direccion aprobable
- La marca principal debe funcionar como cartel de madera premium, no como texto CSS plano.
- Usar madera oscura/nogal, crema envejecida, dorado viejo y oliva.
- Botones preferidos: compactos, oscuros, con textura de madera y texto serif claro.
- Evitar superficies plásticas, naranja brillante, emojis, logos recortados viejos o imágenes rectangulares pegadas.

## Linea portada 44.8
- Estilo buscado: cálido, premium, legible, con materiales tipo madera nogal + crema envejecida + oliva suave.
- Evitar naranjas brillantes y superficies con aspecto plástico.
- Botones preferidos: placas compactas con buena separación, texto serif fuerte y subtítulo discreto.
- Mantener sensación de juego de gestión rural premium, no página web.

# FARM LEGACY — UI DESIGN BIBLE PATCH 44.7

## Estilo visual

Farm Legacy usa una estética:

```text
rústica + premium + agrícola + madera envejecida + metal dorado
```

Debe sentirse como un juego de granja con negocio serio, no como caricatura infantil.

---

## Principios UI

1. Todo debe ser claro antes que bonito.
2. Las tarjetas deben respirar: no pegar elementos demasiado.
3. Las animaciones deben ayudar, no molestar.
4. En móvil debe poder scrollear sin cortar contenido.
5. Cada estado importante debe verse sin leer mucho.

## Portada / Menú principal

Regla desde Patch 44.7:

- No usar el logo imagen si aparece recortado o mal integrado.
- Si el logo asset no funciona, usar título tipográfico limpio.
- Los mosaicos no deben ser fichas estrechas ni apretadas.
- Preferir composición compacta 1 + 2 + 2 antes que cinco fichas iguales.
- Evitar numeración decorativa si no mejora la lectura.

Regla desde Patch 44.6:

- No usar botones largos en portada.
- Evitar colores distintos por cada botón.
- La portada debe parecer menú de videojuego, no página web.
- Preferir mosaicos/cartas compactas con una sola paleta.
- El logo real puede ser protagonista si ayuda a dar identidad.
- El fondo debe funcionar como ambiente y no competir con el menú.

---

## Pantalla de maquinarias

Estado actual bueno:

- Scroll interno funcional.
- Cards premium.
- Separación correcta.
- Hover corregido.
- Barra de progreso.
- Imagen de maquinaria.
- Botones por estado.
- Selector de receta para Empaquetadora.

Cuidado:

- No volver a poner hover que mueva demasiado la tarjeta.
- Mantener espacio entre tarjetas.
- No romper scroll interno.

---

## Pantalla de mercado

Estado actual: mejoró, pero sigue pendiente de pensar más.

Debe evolucionar hacia:

- Menos tabla, más mercado.
- Categorías claras.
- Explicación visible de precio.
- Barras de demanda fáciles de entender.
- Menos ruido visual.

Ideas futuras:

```text
Pestañas:
- Básicos
- Procesados
- Carnes
- Premium
```

O separar:

```text
Mercado Local
Contratos
Mayorista
Premium
```

---

## Colores/estados conceptuales

- Verde: correcto, listo, rentable.
- Rojo: exceso, saturación, problema.
- Dorado: premium, oportunidad, valor alto.
- Azul/neutro: información.
- Gris/madera: base del panel.

---

## Tipografía

Se ha usado Trebuchet MS como fuente principal en pruebas. Mantener legible y compatible.

---

## Animación

Permitida:

- Brillo suave.
- Progreso sutil.
- Estado listo con glow moderado.

Evitar:

- Movimiento constante al pasar mouse.
- Saltos de layout.
- Animaciones que dificulten click.

---

## Responsive

Prioridad:

- Android/móvil.
- Pantallas pequeñas.
- Scroll interno en secciones largas.
- Botones grandes pero no exagerados.

---

## Nota importante

Cuando se agregue una pantalla nueva, primero hacerla funcional y clara. Después se pule visualmente. No sacrificar arquitectura por diseño rápido.
