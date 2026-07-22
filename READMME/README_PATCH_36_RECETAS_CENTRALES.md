# PATCH 36 — Sistema Central de Recetas

## Objetivo
Crear una base escalable para producción. Las recetas ya no viven dentro de cada máquina.

## Nuevo
- `js/modules/recipes.js`
- `js/modules/machines.js`

## Cambios
- Taller Textil lee receta `hilo_textil`.
- Quesería lee receta `queso_artesanal`.
- Maquinarias se generan desde `MAQUINAS_CATALOGO`.
- Eventos de maquinaria se resuelven por catálogo, no por lista manual.
- Se mantiene compatibilidad con saves anteriores.

## Regla nueva
Ninguna receta debe duplicarse en módulos de maquinaria.

## Pruebas
1. Abrir juego.
2. Entrar a Maquinarias.
3. Construir/producir/recoger en Taller Textil.
4. Construir/producir/recoger en Quesería.
5. Probar anuncio simulado.
6. Recargar y verificar guardado.
