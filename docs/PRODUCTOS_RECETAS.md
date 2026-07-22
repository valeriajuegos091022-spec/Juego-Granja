# FARM LEGACY — PRODUCTOS Y RECETAS PATCH 41.7

## Productos registrados

### Básicos

```text
huevo
leche
lana
```

### Procesados

```text
queso
hilo
```

### Carne fresca

```text
carnePollo
carneVaca
carneOveja
```

### Carne procesada

```text
carnePolloEmpaquetada
carneVacaEmpaquetada
carneOvejaEmpaquetada
```

---

## Recetas registradas

### Hilo Textil

```text
id: hilo_textil
entrada: 5 lana
salida: 1 hilo
producción: 30 min
```

### Queso Artesanal

```text
id: queso_artesanal
entrada: 8 leche
salida: 2 queso
producción: 35 min
```

### Pollo Empaquetado

```text
id: empaquetado_pollo
entrada: 3 carnePollo
salida: 2 carnePolloEmpaquetada
producción: 20 min
```

### Res Empaquetada

```text
id: empaquetado_res
entrada: 2 carneVaca
salida: 1 carneVacaEmpaquetada
producción: 25 min
```

### Cordero Empaquetado

```text
id: empaquetado_cordero
entrada: 2 carneOveja
salida: 1 carneOvejaEmpaquetada
producción: 25 min
```

---

## Cómo agregar producto nuevo

1. Agregar entrada en `PRODUCTOS_CATALOGO`.
2. Definir icono, nombre, categoría, precios, historial y lote de almacén.
3. Si será producto inicial, incluirlo en `PRODUCTOS_INICIALES`.
4. Si será producido, crear receta en `recipes.js`.
5. Si necesita máquina, registrar máquina en `machines.js`.

---

## Cómo agregar receta nueva

1. Crear entrada en `RECETAS_CATALOGO`.
2. Definir `id`, `nombre`, `descripcion`, `categoria`.
3. Definir `entradas`.
4. Definir `salidas`.
5. Definir `produccionMs`.
6. Conectar a una máquina mediante `recetaId` o `recetasIds`.

No crear lógica especial para cada receta.