// FARM LEGACY - Maquinarias: listeners propios
// Patch 36: las acciones se resuelven desde MAQUINAS_CATALOGO, no con lista manual por máquina.
window.__farmLegacyLastMachineryInteraction = window.__farmLegacyLastMachineryInteraction || { key:"", at:0 };

function maquinariaInteraccionReciente(key, ventana = 650){
  const last = window.__farmLegacyLastMachineryInteraction || { key:"", at:0 };
  return last.key === key && (Date.now() - Number(last.at || 0)) < ventana;
}

function registrarInteraccionMaquinaria(key){
  window.__farmLegacyLastMachineryInteraction = { key, at: Date.now() };
}

function resolverAccionMaquinaria(btn){
  if(!btn || btn.disabled) return false;
  const action = btn.dataset.action || "";
  const accion = typeof getMaquinaAccion === "function" ? getMaquinaAccion(action) : null;
  if(!accion) return false;

  const key = `${accion.tipo}:${accion.maquinaId}`;
  if(maquinariaInteraccionReciente(key)) return true;
  registrarInteraccionMaquinaria(key);

  if(accion.tipo === "construir"){ construirMaquina(accion.maquinaId); return true; }
  if(accion.tipo === "producir"){ iniciarProduccionMaquina(accion.maquinaId); return true; }
  if(accion.tipo === "recoger"){ recogerProduccionMaquina(accion.maquinaId); return true; }
  if(accion.tipo === "anuncio"){ acelerarMaquinaPorAnuncio(accion.maquinaId); return true; }
  return false;
}

function abrirSeccionMaquinariaDesdeBoton(btn){
  if(!btn) return false;
  const key = 'open:machinery';
  if(maquinariaInteraccionReciente(key, 500)) return true;
  registrarInteraccionMaquinaria(key);
  abrirMaquinariasV1();
  return true;
}

document.addEventListener("pointerup", (event) => {
  const openBtn = event.target.closest("[data-action='open-section'][data-section='machinery']");
  if(openBtn){
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    abrirSeccionMaquinariaDesdeBoton(openBtn);
    return;
  }

  const screen = event.target.closest('[data-screen="machinery"]');
  if(!screen) return;
  const btn = event.target.closest("[data-action]");
  if(!btn) return;
  if(resolverAccionMaquinaria(btn)){
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
}, true);

document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-action='open-section'][data-section='machinery']");
  if(!btn) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  abrirSeccionMaquinariaDesdeBoton(btn);
}, true);

// Acciones propias de Maquinarias en fase de captura para evitar doble click o listeners duplicados.
document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-action]");
  if(!btn) return;
  if(resolverAccionMaquinaria(btn)){
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
}, true);

// Selector de receta para máquinas con varias recetas, como la Empaquetadora de Carne.
// PATCH 38.1:
// El render automático de la pantalla cada 1 segundo cerraba el desplegable nativo
// mientras el jugador estaba eligiendo receta. Marcamos el selector como "ocupado"
// para que el timer no regenere la UI hasta que el jugador termine de escoger.
window.__farmLegacyRecipeSelectorBusyUntil = 0;

function marcarSelectorRecetaOcupado(ms = 4500){
  window.__farmLegacyRecipeSelectorBusyUntil = Date.now() + ms;
}

function haySelectorRecetaActivo(){
  const activo = document.activeElement;
  const enfocado = activo && typeof activo.closest === "function" && activo.closest("[data-machine-recipe-selector]");
  const enVentana = Date.now() < Number(window.__farmLegacyRecipeSelectorBusyUntil || 0);
  return Boolean(enfocado || enVentana);
}

document.addEventListener("pointerdown", (event) => {
  const selector = event.target.closest("[data-machine-recipe-selector]");
  if(!selector) return;
  marcarSelectorRecetaOcupado();
}, true);

document.addEventListener("focusin", (event) => {
  const selector = event.target.closest("[data-machine-recipe-selector]");
  if(!selector) return;
  marcarSelectorRecetaOcupado();
}, true);

document.addEventListener("change", (event) => {
  const selector = event.target.closest("[data-machine-recipe-selector]");
  if(!selector) return;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  // Ya eligió receta: permitimos que se actualice la tarjeta enseguida.
  window.__farmLegacyRecipeSelectorBusyUntil = 0;

  const maquinaId = selector.dataset.machineId;
  const recetaId = selector.value;
  if(typeof cambiarRecetaMaquina === "function"){
    cambiarRecetaMaquina(maquinaId, recetaId);
  }
}, true);

setInterval(() => {
  completarProcesosMaquinaria();
  const pantallaMaquinariaActiva = document.querySelector('[data-screen="machinery"].active');
  if(pantallaMaquinariaActiva && !haySelectorRecetaActivo()){
    renderMaquinariasV1();
  }
}, 1000);
