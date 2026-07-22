# FARM LEGACY — MAQUINARIAS PATCH 41.7

## Visión

El sistema de maquinarias es uno de los pilares de Farm Legacy. Su objetivo es transformar productos base en productos de mayor valor usando tiempo real, inversión y decisiones de producción.

---

## Arquitectura

La maquinaria actual usa registros centrales y motor universal:

```text
machines.js → define la máquina
recipes.js → define la receta
production.js → ejecuta la producción
machinery_ui.js → muestra la tarjeta
machinery_actions.js → conecta botones/selectores
machinery_timer.js → actualiza tiempos
machinery_save.js → guarda/restaura
```

---

## Flujo de una máquina

```text
Comprar/construir máquina
↓
Esperar tiempo real de construcción
↓
Elegir receta si la máquina tiene varias
↓
Validar ingredientes
↓
Consumir ingredientes al iniciar producción
↓
Esperar producción
↓
Recoger producto
↓
Producto entra al mercado/almacén
```

---

## Máquinas actuales

### Taller Textil

```text
Costo: 280
Construcción: 12 min
Receta: hilo_textil
Entrada: 5 lana
Salida: 1 hilo
Producción: 25 min
Anuncio: -5 min
```

Función: primera transformación textil. Convierte lana en hilo de mayor valor.

### Quesería

```text
Costo: 420
Construcción: 18 min
Receta: queso_artesanal
Entrada: 8 leche
Salida: 2 queso
Producción: 30 min
Anuncio: -5 min
```

Función: primera cadena láctea. Convierte leche en queso.

### Empaquetadora de Carne

```text
Costo: 720
Construcción: 22 min
Recetas:
  empaquetado_pollo
  empaquetado_res
  empaquetado_cordero
Anuncio: -5 min
```

Función: una sola máquina con selector de receta para carnes.

Recetas:

```text
3 Pollo Fresco → 2 Pollo Empaquetado | 18 min
2 Res Fresca → 1 Res Empaquetada | 22 min
2 Cordero Fresco → 1 Cordero Empaquetado | 22 min
```

---

## Selector de receta

La Empaquetadora usa selector. Reglas:

- Se puede cambiar receta antes de producir.
- No se puede cambiar receta mientras está produciendo.
- No se puede cambiar receta si hay producto listo para recoger.
- Se corrigió el bug donde el selector se cerraba por el refresco automático.

---

## UI actual

La pantalla de maquinarias tiene:

- Scroll interno.
- Tarjetas premium.
- Separación visual correcta.
- Animaciones reducidas para no molestar.
- Barras de progreso.
- Estado visual:
  - Disponible.
  - Construyendo.
  - Lista para producir.
  - Produciendo.
  - Lista para recoger.

---

## Anuncios

Actualmente son simulados:

- Abren enlace externo tipo video.
- Recompensa inmediata.
- Reducen 5 minutos.

Futuro:

- Reemplazar por AdMob Rewarded Ads cuando se empaquete para Android.

---

## Cómo agregar una máquina nueva

1. Registrar productos nuevos en `products.js`.
2. Crear receta nueva en `recipes.js`.
3. Crear entrada nueva en `machines.js`.
4. Agregar imagen en `assets/maquinas/`.
5. Probar construir, producir, recoger, guardar y anuncio.

No se debe crear una función especial tipo `producirNuevaMaquina()`.