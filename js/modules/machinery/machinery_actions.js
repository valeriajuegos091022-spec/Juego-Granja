// FARM LEGACY - Maquinarias: acciones universales construir/producir/recoger
// Patch 37: este archivo ya no conoce recetas concretas; delega en production.js.

function construirMaquina(id){
  const maquina = getMaquina(id);
  if(!maquina) return;
  if(maquina.construido || maquina.construccionFin){
    simpleNotice(`${maquina.nombre} ya está en proceso o construida.`, "info");
    return;
  }

  const dinero = Number(partidaTemporal.dineroInicial || 0);
  if(dinero < maquina.costo){
    simpleNotice(`No tienes dinero suficiente. Costo: ${formatoEuro(maquina.costo)}.`, "error");
    return;
  }

  partidaTemporal.dineroInicial = Number((dinero - maquina.costo).toFixed(2));
  maquina.construccionInicio = Date.now();
  maquina.construccionFin = maquina.construccionInicio + Number(maquina.construccionMs || 0);

  actualizarDashboard();
  renderMaquinariasV1();
  guardarPartidaForzadaSilenciosa();
  simpleNotice(`🏗️ Construcción iniciada: ${maquina.nombre}.`, "success");
}

function iniciarProduccionMaquina(id){
  const maquina = getMaquina(id);
  if(!maquina) return;
  if(!maquina.construido){ simpleNotice(`Primero debes terminar ${maquina.nombre}.`, "error"); return; }
  if(maquina.produciendo){ simpleNotice(`${maquina.nombre} ya está trabajando.`, "info"); return; }
  if(maquina.productoListo){ simpleNotice("Primero recoge el producto terminado.", "info"); return; }

  const resultado = iniciarProcesoProduccionUniversal(maquina);
  if(!resultado.ok){
    if(resultado.motivo === "ingredientes" && resultado.faltante){
      const faltante = resultado.faltante;
      const producto = productoMercadoPorId(faltante.id) || (typeof getProductoDef === "function" ? getProductoDef(faltante.id) : null);
      simpleNotice(`Necesitas ${faltante.requerido} de ${producto?.nombre || faltante.id}.`, "error");
      return;
    }
    simpleNotice("No se pudo iniciar la producción.", "error");
    return;
  }

  actualizarDashboard();
  renderMercadoTrading();
  renderMaquinariasV1();
  guardarPartidaForzadaSilenciosa();
  simpleNotice(`✅ Producción iniciada en ${maquina.nombre}.`, "success");
}

function recogerProduccionMaquina(id){
  const maquina = getMaquina(id);
  if(!maquina) return;

  const resultado = recogerProcesoProduccionUniversal(maquina);
  if(!resultado.ok){
    simpleNotice("No hay producto listo para recoger.", "info");
    return;
  }

  actualizarDashboard();
  renderMercadoTrading();
  renderMaquinariasV1();
  guardarPartidaForzadaSilenciosa();

  const textoRecibidos = resultado.recibidos.map((item) => item.texto).join(" · ") || "Producto recibido";
  showGameNotice({
    title:"Producto recogido",
    icon: maquina.icon || "📦",
    tone:"success",
    message:`<p>Recibiste <strong>${textoRecibidos}</strong>.</p><p>Ya aparece en Mercado y Almacén.</p>`
  });
}


function cambiarRecetaMaquina(id, recetaId){
  const maquina = getMaquina(id);
  if(!maquina) return;

  if(maquina.produciendo || maquina.productoListo){
    simpleNotice("No puedes cambiar la receta mientras la máquina está trabajando o tiene producto listo.", "info");
    renderMaquinariasV1();
    return;
  }

  const recetas = Array.isArray(maquina.recetasIds) ? maquina.recetasIds : [maquina.recetaId].filter(Boolean);
  if(!recetas.includes(recetaId)){
    simpleNotice("Esa receta no pertenece a esta máquina.", "error");
    renderMaquinariasV1();
    return;
  }

  maquina.recetaActivaId = recetaId;
  maquina.recetaId = recetaId;
  if(typeof aplicarRecetaActivaMaquina === "function") aplicarRecetaActivaMaquina(maquina);

  renderMaquinariasV1();
  guardarPartidaForzadaSilenciosa();

  const receta = typeof getRecetaDef === "function" ? getRecetaDef(recetaId) : null;
  simpleNotice(`📋 Receta seleccionada: ${receta?.nombre || recetaId}.`, "success");
}

function acelerarProcesoTiempoReal(maquina, inicioKey, finKey, reduccionMs){
  const ahora = Date.now();
  const inicio = Number(maquina[inicioKey] || 0);
  const fin = Number(maquina[finKey] || 0);
  const reduccion = Math.max(0, Number(reduccionMs || 0));

  if(!inicio || !fin || fin <= ahora || reduccion <= 0) return false;

  // El anuncio no reduce la duración total del proceso; mueve el proceso hacia atrás.
  maquina[inicioKey] = inicio - reduccion;
  maquina[finKey] = Math.max(ahora, fin - reduccion);
  return true;
}
