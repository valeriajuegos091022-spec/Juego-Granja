# README PATCH 43.1 — Mapa de finca integrado

## Objetivo

Implementar en el juego real la dirección visual aprobada: una pantalla principal tipo **mapa de la finca**, parecida al concepto generado, donde las secciones del juego se sientan integradas a la imagen y no como botones sueltos.

---

## Qué cambia

- La pantalla principal deja de ser un dashboard tradicional.
- Ahora tiene una estructura más parecida a un juego de gestión premium:
  - marca y recursos arriba,
  - mapa grande al centro,
  - zonas clicables sobre la finca,
  - panel derecho con Don Mateo y objetivos,
  - barra inferior con Menú principal y Siguiente día.

---

## Zonas integradas al mapa

Las secciones principales siguen usando las mismas acciones del juego:

- Mercado
- Corrales
- Maquinarias
- Almacén
- Producción
- Contratos

No se cambia la lógica interna. Solo cambia cómo se presentan en la pantalla principal.

---

## Assets nuevos

Se agregan:

- `assets/images/ui/farm_map_43_1.png`
- `assets/images/ui/don_mateo_43_1.png`

Estos assets sirven para acercar la pantalla real al concepto visual aprobado.

---

## Archivos modificados

### Código / UI

- `index.html`
- `css/style.css`
- `assets/images/ui/farm_map_43_1.png`
- `assets/images/ui/don_mateo_43_1.png`

### Documentación

- `docs/CHANGELOG.md`
- `docs/HANDOFF.md`
- `docs/TODO.md`
- `docs/UI_DESIGN_BIBLE.md`
- `docs/BUGS.md`
- `docs/README_PATCH_43_1_MAPA_FINCA.md`

---

## Qué no cambia

- No cambia economía.
- No cambia guardado.
- No cambia mercado.
- No cambia contratos.
- No cambia maquinarias.
- No cambia balance.

---

## QA recomendado

1. Abrir una partida.
2. Revisar que se vea el mapa de finca.
3. Probar cada zona clicable.
4. Probar Menú principal.
5. Probar Siguiente día.
6. Revisar si alguna placa necesita moverse.

Este parche probablemente necesita una segunda pasada de ajuste fino después de verlo en pantalla real.
