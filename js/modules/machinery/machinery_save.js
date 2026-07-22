// FARM LEGACY - Maquinarias: integración con guardado/carga
const FL_originalCrearSnapshotPartida = crearSnapshotPartida;
crearSnapshotPartida = function(){
  asegurarProductosBaseMaquinaria();
  asegurarOvejasCompletas();
  const snap = FL_originalCrearSnapshotPartida();
  snap.maquinariaV1 = JSON.parse(JSON.stringify(maquinariaV1));
  return snap;
};

const FL_originalAplicarSnapshotPartida = aplicarSnapshotPartida;
aplicarSnapshotPartida = function(snapshot){
  const ok = FL_originalAplicarSnapshotPartida(snapshot);
  if(snapshot && snapshot.maquinariaV1){
    maquinariaV1 = Object.assign(JSON.parse(JSON.stringify(maquinariaV1Default)), snapshot.maquinariaV1 || {});
    Object.keys(maquinariaV1Default).forEach((id) => {
      maquinariaV1[id] = Object.assign(
        JSON.parse(JSON.stringify(maquinariaV1Default[id])),
        JSON.parse(JSON.stringify(maquinariaV1[id] || {}))
      );
    });
  }else{
    resetMaquinariaV1();
  }
  asegurarProductosBaseMaquinaria();
  asegurarOvejasCompletas();
  completarProcesosMaquinaria();
  actualizarDashboard();
  return ok;
};

const FL_originalResetPartidaTemporalNueva = resetPartidaTemporalNueva;
resetPartidaTemporalNueva = function(usuario, slot){
  FL_originalResetPartidaTemporalNueva(usuario, slot);
  resetMaquinariaV1();
  asegurarProductosBaseMaquinaria();
  asegurarOvejasCompletas();
};

// Guardado seguro del juego.
// PATCH 40.4:
// Antes este puente llamaba autoGuardarSiHaySlot() sin pasar opciones.
// Eso rompía { visual:true } al pasar el día y por eso no aparecía
// el aviso premium de "Guardando partida". Ahora conserva las opciones.
const FL_originalAutoGuardarSiHaySlot = autoGuardarSiHaySlot;
autoGuardarSiHaySlot = function(opciones = {}){
  return FL_originalAutoGuardarSiHaySlot(opciones);
};
const FL_originalAvanzarSiguienteDia = avanzarSiguienteDia;
avanzarSiguienteDia = function(){
  asegurarProductosBaseMaquinaria();
  asegurarOvejasCompletas();
  completarProcesosMaquinaria();
  window.__farmLegacySavingDay = true;
  try{ return FL_originalAvanzarSiguienteDia(); }
  finally{ window.__farmLegacySavingDay = false; }
};
