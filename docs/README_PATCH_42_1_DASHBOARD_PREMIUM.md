# README PATCH 42.1 — Pantalla principal premium

## Objetivo

Pulir la pantalla principal para que Farm Legacy se sienta menos antiguo y más profesional, sin tocar sistemas de juego.

Este parche mejora el centro visual del juego: el dashboard donde el jugador ve la granja, entra a Mercado/Corrales/Maquinarias y pasa el día.

---

## Qué cambia

### Dashboard principal

- Mejor textura de madera oscura.
- Bordes dorados más finos.
- Más contraste entre paneles.
- Sombras más premium.
- Fondo con más profundidad.

### HUD superior

- Dinero, día y almacén ahora se ven como tarjetas separadas.
- El aviso de guardado automático queda más limpio.

### Botones principales

Cada botón ahora tiene:

- icono,
- título,
- descripción corta.

Esto ayuda a que el jugador entienda mejor cada sección sin llenar la pantalla de tutoriales.

### Panel “¿Qué hacer ahora?”

- Mejor contraste.
- Mejor integración con el estilo rústico premium.
- Pasos del tutorial más limpios.

---

## Archivos tocados

### Código

- `index.html`
- `css/style.css`

### Documentación

- `docs/CHANGELOG.md`
- `docs/HANDOFF.md`
- `docs/TODO.md`
- `docs/UI_DESIGN_BIBLE.md`
- `docs/BUGS.md`
- `docs/README_PATCH_42_1_DASHBOARD_PREMIUM.md`

---

## Qué no cambia

- No cambia economía.
- No cambia mercado.
- No cambia contratos.
- No cambia guardado.
- No cambia maquinarias.
- No cambia balance.

---

## ¿Hace falta programa externo o plugin?

No para este parche.

Esta mejora se hizo con HTML y CSS.

Para un salto visual mayor en el futuro sí convendría preparar assets externos, por ejemplo:

- iconos propios por sección,
- marcos PNG de madera/dorado,
- fondo exclusivo para el dashboard,
- ilustraciones de Don Mateo o personajes.

Eso se puede hacer más adelante con IA, Canva, Photoshop, Figma o similar.

---

## QA recomendado

1. Abrir una partida.
2. Revisar la pantalla principal completa.
3. Probar Mercado, Corrales, Maquinarias, Almacén, Producción y Contratos.
4. Confirmar que el botón **Siguiente Día** funciona.
5. Confirmar que **Menú Principal** sigue abriendo el popup correcto.
6. Probar en una pantalla más pequeña o con el navegador reducido.
