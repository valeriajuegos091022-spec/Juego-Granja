# ARCHITECTURE — FARM LEGACY

## Versión documentada

Documento actualizado después del **Patch 33 — Maquinaria modular escalable**.

Este documento explica la estructura actual del proyecto, las reglas de trabajo y cómo debe crecer Farm Legacy sin volver a concentrar toda la lógica en `main.js`.

---

## Objetivo arquitectónico

Farm Legacy debe poder crecer durante mucho tiempo sin convertirse en un proyecto difícil de mantener.

La regla principal es:

```text
main.js no debe volver a contener sistemas completos.
```

`main.js` queda como archivo de arranque. La lógica real vive en módulos separados dentro de `js/modules/`.

---

## Tecnología actual

Farm Legacy está construido con:

- HTML.
- CSS.
- JavaScript clásico.
- LocalStorage para guardado.
- Carga mediante scripts `defer` en orden.

Por ahora **no se usa `type="module"`** para evitar problemas de compatibilidad al abrir localmente y pensando en el futuro empaquetado con Capacitor.

Objetivo futuro:

- Android con Capacitor.
- Anuncios reales con AdMob Rewarded Ads.
- Mejor persistencia local si el proyecto lo requiere.

---

## Estructura actual aprobada

```text
FarmLegacy/
│
├── index.html
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   │
│   └── modules/
│       ├── state.js
│       ├── dialogs.js
│       ├── storage.js
│       ├── corrals.js
│       ├── market.js
│       ├── story.js
│       ├── saves.js
│       ├── daycycle.js
│       ├── events.js
│       ├── machinery.js
│       │
│       └── machinery/
│           ├── machinery_state.js
│           ├── machinery_timer.js
│           ├── machinery_ui.js
│           ├── machinery_actions.js
│           ├── machinery_ads.js
│           ├── machinery_save.js
│           ├── machinery_events.js
│           └── machinery_boot.js
│
├── assets/
│   ├── images/
│   └── maquinas/
│       └── taller_textil.png
│
└── docs/
    ├── ARCHITECTURE.md
    ├── HANDOFF.md
    ├── CHANGELOG.md
    ├── TODO.md
    ├── BUGS.md
    ├── BALANCE.md
    ├── MERCADO.md
    ├── ANIMALES.md
    ├── DECISIONES_DE_DISENO.md
    └── UI_DESIGN_BIBLE.md
```

---

## Orden de carga en `index.html`

El orden de carga es muy importante porque se usa JavaScript clásico, no módulos ES6.

Orden actual:

```text
1. js/modules/state.js
2. js/modules/dialogs.js
3. js/modules/storage.js
4. js/modules/corrals.js
5. js/modules/market.js
6. js/modules/story.js
7. js/modules/saves.js
8. js/modules/daycycle.js
9. js/modules/machinery/machinery_state.js
10. js/modules/machinery/machinery_timer.js
11. js/modules/machinery/machinery_ui.js
12. js/modules/machinery/machinery_actions.js
13. js/modules/machinery/machinery_ads.js
14. js/modules/machinery/machinery_save.js
15. js/modules/machinery/machinery_events.js
16. js/modules/machinery/machinery_boot.js
17. js/modules/machinery.js
18. js/modules/events.js
19. js/main.js
```

No cambiar este orden sin revisar dependencias.

---

## Rol de `main.js`

`main.js` debe mantenerse pequeño.

Responsabilidades permitidas:

- Arrancar el juego.
- Ejecutar verificaciones iniciales.
- Llamar funciones de inicialización.
- Mostrar un log de arranque.

Responsabilidades prohibidas:

- Crear sistemas completos.
- Renderizar pantallas grandes.
- Manejar lógica de mercado, corrales, almacén o maquinaria.
- Agregar nuevas mecánicas directamente dentro de `main.js`.

Ejemplo correcto:

```javascript
(function initFarmLegacy(){
  document.addEventListener("DOMContentLoaded", () => {
    asegurarProductoHiloTextil();
    asegurarOvejasCompletas();
    asegurarDatosMejoraAlmacen();
    completarProcesosMaquinaria();
    actualizarDashboard();
  });
})();
```

---

## Reglas de escalabilidad

### 1. Un sistema nuevo = un módulo nuevo

Ejemplos futuros:

```text
modules/contracts/
modules/weather/
modules/bank/
modules/trucks/
modules/employees/
modules/missions/
```

No agregar sistemas grandes dentro de archivos ya saturados.

### 2. Separar responsabilidades

Cada sistema grande debe dividirse por responsabilidad:

```text
state
ui
actions
events
save
timer/logic si aplica
```

### 3. No duplicar lógica

Si varias máquinas usan temporizadores, anuncios, producción y recogida, debe existir una lógica compartida. No copiar y pegar la lógica completa para cada máquina.

### 4. No romper sistemas funcionando

Regla de trabajo aprobada:

```text
No tocar sistemas funcionales si el cambio no lo necesita.
```

### 5. Parche específico

Cada parche debe tener un objetivo claro:

```text
Patch visual
Patch de bug
Patch de arquitectura
Patch de mecánica nueva
Patch de documentación
```

Evitar mezclar todo en un mismo parche.

---

## Estado central

Archivo:

```text
js/modules/state.js
```

Contiene los datos base actuales:

- `partidaTemporal`
- `SAVE_DB_KEY`
- `LAST_SESSION_KEY`
- `saveManagerMode`
- `currentSaveUser`
- `currentSaveSlot`
- `mercadoTrading`
- `corralesV16`
- snapshots iniciales de mercado/corrales

Este archivo no debe convertirse en un archivo gigante de lógica. Debe contener datos base y estado global simple.

Futuro recomendado:

```text
modules/data/products.js
modules/data/animals.js
modules/data/machines.js
```

para centralizar productos, animales y máquinas.

---

## Diálogos y avisos

Archivo:

```text
js/modules/dialogs.js
```

Responsabilidades:

- Crear modal genérico.
- Mostrar avisos.
- Mostrar confirmaciones.
- Cerrar diálogo.
- Formatear valores comunes como euros.

Funciones importantes:

- `showGameNotice()`
- `showGameConfirm()`
- `simpleNotice()`
- `closeGameDialog()`
- `formatoEuro()`

---

## Almacén

Archivo:

```text
js/modules/storage.js
```

Responsabilidades:

- Calcular espacio usado.
- Calcular sobrecapacidad.
- Calcular multa diaria.
- Renderizar resumen de almacén.
- Mostrar mejora de almacén.
- Aplicar mejora de almacén.

Regla de lotes actual:

```text
10 huevos = 1 espacio
5 leches = 1 espacio
5 lanas = 1 espacio
2 quesos = 1 espacio
2 carnes de pollo = 1 espacio
1 carne de vaca = 1 espacio
1 carne de oveja = 1 espacio
```

Nota importante:

El código actual asigna `hilo = 2` en la maquinaria cuando asegura el producto Hilo Textil. En documentación de balance anterior aparece `3 hilos = 1 espacio`. Esto debe unificarse más adelante para evitar contradicción.

---

## Corrales, animales y matadero

Archivo:

```text
js/modules/corrals.js
```

Responsabilidades:

- Renderizar tarjetas de corrales.
- Renderizar detalle de cada corral.
- Comprar animales.
- Mejorar corrales.
- Matadero.
- Vista de etapas: crías, jóvenes, adultas y viejas.
- Cálculo de rendimiento de matadero.

Regla actual:

```text
Los animales no se venden directamente.
Los animales producen recursos o se procesan en matadero.
```

Futuro recomendado:

Si crece mucho, dividir en:

```text
modules/corrals/corrals_state.js
modules/corrals/corrals_ui.js
modules/corrals/corrals_actions.js
modules/corrals/slaughter.js
modules/corrals/animal_growth.js
```

---

## Mercado

Archivo:

```text
js/modules/market.js
```

Responsabilidades:

- Renderizar mercado.
- Mostrar popup de producto.
- Comprar y vender productos.
- Compra rápida y venta rápida.
- Calcular tendencia.
- Dibujar gráfica de precios.

Productos actuales:

```text
Huevo
Leche
Lana
Queso
Hilo Textil
Pollo Fresco
Res Fresca
Cordero Fresco
```

Regla de diseño:

```text
El mercado es el corazón del juego.
```

Los precios cambian al pasar día, pero no se muestran en el resumen de fin de día.

---

## Historia

Archivo:

```text
js/modules/story.js
```

Responsabilidades:

- Intro de Don Mateo.
- Escenas de historia.
- Typewriter.
- Avanzar/saltar historia.
- Navegación básica de pantallas.

Funciones importantes:

- `mostrarPantalla()`
- `iniciarIntroDonMateo()`
- `avanzarIntro()`
- `limpiarNombre()`

---

## Guardado

Archivo:

```text
js/modules/saves.js
```

Responsabilidades:

- LocalStorage.
- Usuario y 3 slots.
- Crear snapshot.
- Aplicar snapshot.
- Nueva partida.
- Continuar última partida.
- Guardado silencioso.

Funciones importantes:

- `crearSnapshotPartida()`
- `aplicarSnapshotPartida()`
- `guardarPartidaEnSlot()`
- `guardarPartidaForzadaSilenciosa()`
- `autoGuardarSiHaySlot()`
- `continuarUltimaPartida()`

Decisión actual:

```text
El guardado visual premium se reserva para el paso de día.
El guardado técnico silencioso se permite en acciones importantes.
```

Motivo:

- No perder temporizadores reales.
- No perder construcciones.
- No perder productos listos.
- No perder mejoras importantes si el jugador recarga.

Esto corrige la regla antigua de “guardar solo al pasar día” sin romper la experiencia visual del jugador.

---

## Ciclo diario

Archivo:

```text
js/modules/daycycle.js
```

Responsabilidades:

- Siguiente Día.
- Envejecimiento animal.
- Producción animal.
- Actualización de precios.
- Cobro de alquiler.
- Cobro de sobrecapacidad.
- Actualización de HUD.
- Resumen de día.

Orden conceptual ideal:

```text
1. Procesar día.
2. Producción animal.
3. Gastos diarios.
4. Sobrecapacidad.
5. Mercado nuevo.
6. Actualizar UI.
7. Guardar.
8. Mostrar resumen.
```

---

## Eventos generales

Archivo:

```text
js/modules/events.js
```

Responsabilidades:

- Clicks globales.
- Navegación general.
- Inputs generales.
- Teclas como Enter, Space y Escape.
- Acciones que no pertenecen a maquinaria.

Nota:

Las acciones de maquinaria se manejan en `machinery_events.js`, no aquí, para evitar doble click y conflictos entre listeners.

---

# Arquitectura de Maquinarias — Patch 33

El sistema de maquinaria fue dividido en varios archivos para escalar a futuras máquinas como:

- Quesería.
- Empacadora.
- Molino.
- Fábrica textil avanzada.
- Conservas.
- Panadería.

## Estructura de maquinaria

```text
js/modules/machinery/
│
├── machinery_state.js
├── machinery_timer.js
├── machinery_ui.js
├── machinery_actions.js
├── machinery_ads.js
├── machinery_save.js
├── machinery_events.js
└── machinery_boot.js
```

`js/modules/machinery.js` queda como puente/documentación.

---

## machinery_state.js

Responsabilidades:

- Datos base del sistema de maquinaria.
- Definición de `maquinariaV1Default`.
- Estado real `maquinariaV1`.
- Asegurar Hilo Textil.
- Asegurar ovejas completas.
- Normalización defensiva del Taller Textil.

Estado actual del Taller Textil:

```text
id
nombre
icon
construido
construccionInicio
construccionFin
produccionInicio
produccionFin
produciendo
productoListo
productoPendiente
recetaConsumida
costo
construccionMs
produccionMs
receta
salida
anuncioReduceMs
```

---

## machinery_timer.js

Responsabilidades:

- Revisar si una construcción terminó.
- Revisar si una producción terminó.
- Convertir producción terminada en producto listo.
- Recuperar saves antiguos o intermedios.
- Guardar silenciosamente si hubo cambios.

Regla aprobada:

```text
Cuando termina una producción, NO se entrega automáticamente.
Queda como producto listo para recoger.
```

---

## machinery_ui.js

Responsabilidades:

- Renderizar tarjeta de maquinaria.
- Mostrar imagen.
- Mostrar receta.
- Mostrar estado.
- Mostrar barra de progreso.
- Mostrar botón principal.
- Mostrar botón de anuncio separado.

Flujo visual aprobado:

```text
Sin construir → Construir
Construyendo → Ver anuncio
Lista → Producir
Produciendo → Ver anuncio
Producto listo → Recoger
```

Regla importante:

```text
El botón principal no debe compartir responsabilidad con el botón de anuncio.
```

---

## machinery_actions.js

Responsabilidades:

- Construir máquina.
- Iniciar producción.
- Consumir receta al iniciar.
- Recoger producto.
- Acelerar proceso en tiempo real.

Regla crítica del Taller Textil:

```text
Para iniciar producción necesita 5 lana.
Al iniciar producción se consumen las 5 lanas.
Al terminar se muestra RECOGER HILO.
Al recoger NO se vuelve a pedir lana.
```

---

## machinery_ads.js

Responsabilidades:

- Abrir anuncio simulado.
- Aplicar recompensa temporal.
- Reducir 5 minutos.

Estado actual:

```text
Botón anuncio → abre YouTube → aplica reducción inmediata de 5 minutos.
```

URL actual de prueba:

```text
https://www.youtube.com/watch?v=pcTJ5ACaS4Y
```

Decisión futura:

```text
Reemplazar YouTube por AdMob Rewarded Ads.
La recompensa se dará solo cuando AdMob confirme anuncio completado.
```

---

## machinery_save.js

Responsabilidades:

- Integrar maquinaria con snapshot.
- Cargar maquinaria desde partida.
- Resetear maquinaria en partida nueva.
- Mantener autoguardado silencioso.
- Proteger temporizadores reales.

Regla:

```text
Toda máquina futura debe quedar incluida en el snapshot.
```

---

## machinery_events.js

Responsabilidades:

- Abrir pantalla de maquinaria.
- Capturar clicks de maquinaria.
- Evitar doble click.
- Evitar conflictos con `events.js`.
- Intervalo de actualización cada segundo.

Acciones actuales:

```text
build-textile-workshop
start-yarn-production
collect-yarn-production
ad-speed-textile
```

---

## machinery_boot.js

Responsabilidades:

- Asegurar datos al cargar.
- Completar procesos pendientes al abrir juego.
- Evitar inconsistencias al iniciar.

---

# Cómo agregar una nueva máquina en el futuro

Ejemplo: Quesería.

## 1. Agregar producto si no existe

Producto:

```text
queso
```

Debe estar en:

- Mercado.
- Almacén.
- Guardado.
- Balance.

## 2. Agregar datos de máquina

En el estado de maquinaria:

```javascript
queseria: {
  id:"queseria",
  nombre:"Quesería",
  icon:"🧀",
  construido:false,
  construccionInicio:0,
  construccionFin:0,
  produccionInicio:0,
  produccionFin:0,
  produciendo:false,
  productoListo:false,
  productoPendiente:0,
  recetaConsumida:false,
  costo:450,
  construccionMs:20 * 60 * 1000,
  produccionMs:35 * 60 * 1000,
  receta:{ leche:10 },
  salida:{ queso:2 },
  anuncioReduceMs:5 * 60 * 1000
}
```

## 3. Reutilizar flujo existente

No duplicar todo el código del Taller Textil.

Objetivo futuro:

```text
Crear funciones genéricas para:
construirMaquina(id)
iniciarProduccionMaquina(id)
recogerProductoMaquina(id)
acelerarMaquinaPorAnuncio(id)
renderMaquina(id)
```

## 4. Agregar botones/actions

Ejemplo:

```text
build-cheese-workshop
start-cheese-production
collect-cheese-production
ad-speed-cheese
```

Pero lo ideal será migrar a acciones genéricas:

```text
machine-build data-machine="queseria"
machine-start data-machine="queseria"
machine-collect data-machine="queseria"
machine-ad data-machine="queseria"
```

---

# Qué archivos pedir para trabajar en el futuro

No siempre hace falta pasar el ZIP completo.

## Si el cambio es de maquinaria

Pedir:

```text
index.html
js/main.js
js/modules/state.js
js/modules/saves.js
js/modules/market.js
js/modules/storage.js
js/modules/daycycle.js
js/modules/machinery.js
js/modules/machinery/
```

Si también hay cambio visual:

```text
css/style.css
```

## Si el cambio es visual general

Pedir:

```text
index.html
css/style.css
js/modules/events.js
módulo afectado
```

## Si el cambio es de mercado

Pedir:

```text
js/modules/state.js
js/modules/market.js
js/modules/storage.js
js/modules/saves.js
js/modules/daycycle.js
```

## Si el cambio es de guardado

Pedir:

```text
js/modules/state.js
js/modules/saves.js
js/modules/daycycle.js
js/modules/machinery/machinery_save.js
módulo afectado
```

## Si el cambio es de corrales/animales

Pedir:

```text
js/modules/state.js
js/modules/corrals.js
js/modules/daycycle.js
js/modules/market.js
js/modules/saves.js
```

## Si el cambio es de documentación

Pedir solo:

```text
docs/*.md
```

o los `.md` específicos.

---

# Riesgos actuales

## 1. Productos todavía no están centralizados

Los productos viven principalmente dentro de `mercadoTrading.productos` en `state.js`, pero algunos productos como Hilo Textil se aseguran desde maquinaria.

Siguiente paso recomendado:

```text
Crear registro central de productos.
```

Ejemplo futuro:

```text
modules/data/products.js
```

## 2. Maquinaria todavía está especializada en Taller Textil

Aunque el sistema ya está dividido, muchas funciones todavía hablan directamente de Hilo/Lana/Taller Textil.

Siguiente paso recomendado:

```text
Crear motor genérico de máquinas.
```

## 3. Versiones mezcladas

Aparecen nombres como:

```text
V17
Patch 28
Patch 31
Patch 33
Alpha 0.1.0
```

Recomendación:

```text
Usar versión visible Alpha 0.1.x
Usar patch interno para desarrollo
```

Ejemplo:

```text
Alpha 0.1.0 — Patch 33
```

## 4. JavaScript clásico depende del orden

Como no se usa `type="module"`, el orden de scripts es crítico.

No mover scripts sin revisar dependencias.

---

# Próximos pasos de arquitectura recomendados

## Paso 1 — Registro central de productos

Crear un lugar único para definir:

- id
- nombre
- icono
- categoría
- precio inicial
- rango mínimo/máximo
- historial inicial
- regla de almacén
- si se puede comprar
- si se puede vender

Esto evitará modificar mercado, almacén y maquinaria por separado cada vez que aparezca un producto nuevo.

## Paso 2 — Motor genérico de máquinas

Pasar de funciones específicas:

```text
construirTallerTextil()
iniciarProduccionHilo()
recogerProduccionHilo()
```

a funciones genéricas:

```text
construirMaquina(id)
iniciarProduccionMaquina(id)
recogerProductoMaquina(id)
acelerarMaquina(id)
```

## Paso 3 — Quesería V1

Primera máquina nueva ideal porque prueba si el motor escala:

```text
Vaca → Leche → Quesería → Queso
```

## Paso 4 — Empacadora V1

Máquina universal para carnes:

```text
Pollo Fresco → Pollo Empaquetado
Res Fresca → Res Empaquetada
Cordero Fresco → Cordero Empaquetado
```

---

# Reglas permanentes para el asistente

Cuando se trabaje en Farm Legacy:

1. No meter sistemas grandes en `main.js`.
2. No agregar mecánicas nuevas sin revisar dónde deben vivir.
3. Mantener estructura escalable.
4. Crear parches específicos y probables de sobrescribir.
5. Pedir solo los archivos necesarios según el cambio.
6. Documentar al final de sesión si hubo cambios importantes.
7. No tocar sistemas funcionales si no es necesario.
8. Pensar siempre en Android/Capacitor y anuncios reales futuros.
9. Si algo se repite, convertirlo en motor o utilidad compartida.
10. Mantener claro qué es guardado visual y qué es guardado técnico silencioso.

---

# Resumen ejecutivo para otro chat

Farm Legacy ya no debe trabajarse como un proyecto de un solo `main.js`.

La arquitectura actual aprobada después del Patch 33 es modular:

```text
main.js = arranque
modules/ = sistemas reales
modules/machinery/ = maquinaria dividida por responsabilidad
```

El sistema más avanzado actualmente es Maquinarias/Taller Textil:

```text
5 Lana → Taller Textil → 1 Hilo Textil
```

Flujo correcto:

```text
Tener 5 lana
→ pulsar Producir
→ se consumen 5 lana
→ corre temporizador real
→ termina producción
→ aparece Recoger Hilo
→ al recoger se suma Hilo Textil
```

El botón de anuncio está separado:

```text
Ver anuncio → abre YouTube temporal → reduce 5 minutos
```

Futuro:

```text
YouTube será reemplazado por AdMob Rewarded Ads.
```

La siguiente mejora arquitectónica recomendada es centralizar productos y luego convertir maquinaria en motor genérico para Quesería y Empacadora.
