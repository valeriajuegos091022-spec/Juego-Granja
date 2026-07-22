// FARM LEGACY - Maquinarias: anuncio simulado / recompensa temporal
function acelerarMaquinaPorAnuncio(id){
  const trailerUrl = "https://www.youtube.com/watch?v=pcTJ5ACaS4Y";
  try{ window.open(trailerUrl, "_blank", "noopener,noreferrer"); }
  catch(error){ window.location.href = trailerUrl; }

  const maquina = getMaquina(id);
  if(!maquina) return;
  const reduccion = Number(maquina.anuncioReduceMs || (typeof getReduccionAnuncioDefault === "function" ? getReduccionAnuncioDefault() : 5*60*1000));

  if(!maquina.construido && maquina.construccionFin){
    acelerarProcesoTiempoReal(maquina, "construccionInicio", "construccionFin", reduccion);
    completarProcesosMaquinaria();
    renderMaquinariasV1();
    guardarPartidaForzadaSilenciosa();
    simpleNotice(`▶ Anuncio simulado: ${maquina.nombre} acelerada 5 min.`, "success");
    return;
  }

  if(maquina.produciendo && maquina.produccionFin){
    acelerarProcesoTiempoReal(maquina, "produccionInicio", "produccionFin", reduccion);
    completarProcesosMaquinaria();
    renderMaquinariasV1();
    guardarPartidaForzadaSilenciosa();
    simpleNotice(`▶ Anuncio simulado: producción acelerada 5 min.`, "success");
    return;
  }

  simpleNotice("No hay ningún proceso activo para acelerar.", "info");
}

function acelerarTallerTextilPorAnuncio(){ acelerarMaquinaPorAnuncio("tallerTextil"); }
function acelerarQueseriaPorAnuncio(){ acelerarMaquinaPorAnuncio("queseria"); }
