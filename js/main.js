// FARM LEGACY - main.js
// Patch 33 Architecture
//
// Este archivo debe mantenerse pequeño.
// La lógica real vive en js/modules/.
// Regla del proyecto: no volver a meter sistemas completos aquí.
//
// Orden de carga definido en index.html:
// state -> dialogs -> storage -> corrals -> market -> story -> saves -> daycycle -> machinery/* -> events -> main.

(function initFarmLegacy(){
  document.addEventListener("DOMContentLoaded", () => {
    try{
      if(typeof asegurarProductosBaseMercado === "function") asegurarProductosBaseMercado();
      if(typeof asegurarProductoHiloTextil === "function") asegurarProductoHiloTextil();
      if(typeof asegurarProductoQueso === "function") asegurarProductoQueso();
      if(typeof asegurarOvejasCompletas === "function") asegurarOvejasCompletas();
      if(typeof asegurarDatosMejoraAlmacen === "function") asegurarDatosMejoraAlmacen();
      if(typeof completarProcesosMaquinaria === "function") completarProcesosMaquinaria();
      if(typeof asegurarContratosV1 === "function") asegurarContratosV1();
      if(typeof actualizarDashboard === "function") actualizarDashboard();
      console.info("Farm Legacy iniciado con arquitectura modular Patch 33.");
    }catch(error){
      console.error("Error iniciando Farm Legacy:", error);
    }
  });
})();
