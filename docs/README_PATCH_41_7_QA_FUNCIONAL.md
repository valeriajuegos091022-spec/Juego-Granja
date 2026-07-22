# PATCH 41.7 - QA funcional HUD dinero

## Objetivo

Corregir un bug visual pequeño pero importante antes de seguir con Mercado V3 o sistemas nuevos.

## Problema encontrado

Algunos HUD mostraban el dinero con un fallback viejo:

```js
partidaTemporal.dineroInicial || 100
```

Cuando el jugador tenía `0 €`, JavaScript trataba el 0 como falso y la pantalla podía enseñar `100 €`, aunque el dinero real fuera 0.

## Corrección aplicada

Se cambió el render visual del dinero en:

- `js/modules/daycycle.js`
- `js/modules/market.js`
- `js/modules/corrals.js`

Ahora usan:

```js
formatoEuro(partidaTemporal.dineroInicial || 0)
```

## Importante

No se modificó el balance del juego.
No se tocaron precios, contratos, producción ni guardado.

## Verificación técnica

- `node --check` pasó en todos los archivos `.js`.
- Se actualizó `index.html` a `41_7_qa_funcional` para evitar caché vieja.

## Próximo paso recomendado

Patch 41.8 debe ser una prueba manual de flujo completo:

1. Nueva partida.
2. Pasar varios días.
3. Comprar/vender en mercado.
4. Aceptar/entregar/fallar contratos.
5. Construir/producir/recoger maquinaria.
6. Recargar navegador y usar Continuar.
