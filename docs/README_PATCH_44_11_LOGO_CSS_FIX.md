# Patch 44.11 - Logo CSS Fix

## Objetivo
Corregir de verdad el problema donde el cartel/logo no aparecia en la portada.

## Causa
El asset ya estaba incluido, pero una regla vieja del CSS tenia mas prioridad:

`.title-mosaic-brand img { display:none !important; }`

Eso ocultaba el logo aunque existiera el archivo.

## Cambios
- Se actualiza cache a `44_11_logo_css_fix`.
- Se fuerza el logo con un selector mas especifico:
  `.title-logo-brand .title-logo-image`.
- Se mantiene el asset `assets/images/ui/title_logo_44_10.png`.
- Se refuerzan subtitulos pequenos de los botones.

## Archivos incluidos
- index.html
- css/style.css
- assets/images/ui/title_logo_44_10.png
- docs actualizados

## No tocado
- Economia
- Guardado
- Logica JS
