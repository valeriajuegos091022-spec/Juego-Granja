// FARM LEGACY - Maquinarias: temporizadores reales y finalización de procesos
function completarProcesosMaquinaria(){
  asegurarProductosBaseMaquinaria();

  const ahora = Date.now();
  let cambio = false;

  getMaquinasLista().forEach((maquina) => {
    if(!maquina.construido && maquina.construccionFin && ahora >= maquina.construccionFin){
      maquina.construido = true;
      maquina.construccionInicio = 0;
      maquina.construccionFin = 0;
      cambio = true;
    }

    // Cuando termina la producción NO se entrega automáticamente.
    // Queda como producto listo para que el jugador pulse RECOGER.
    if(maquina.produciendo && maquina.produccionFin && ahora >= maquina.produccionFin){
      if(typeof completarProcesoProduccionUniversal === "function"){
        completarProcesoProduccionUniversal(maquina);
      }else{
        maquina.produciendo = false;
        maquina.productoListo = true;
        maquina.productoPendiente = Object.values(maquina.salida || {}).reduce((suma, n) => suma + Number(n || 0), 0) || 1;
        maquina.recetaConsumida = true;
        maquina.produccionInicio = 0;
        maquina.produccionFin = 0;
      }
      cambio = true;
    }

    // Recuperación defensiva para partidas con fin vencido.
    if(!maquina.produciendo && !maquina.productoListo && Number(maquina.produccionFin || 0) > 0 && ahora >= Number(maquina.produccionFin || 0)){
      maquina.productoListo = true;
      maquina.productoPendiente = Number(maquina.productoPendiente || Object.values(maquina.salida || {})[0] || 1);
      maquina.recetaConsumida = true;
      maquina.produccionInicio = 0;
      maquina.produccionFin = 0;
      cambio = true;
    }

    // Recuperación para saves intermedios.
    if(!maquina.produciendo && !maquina.productoListo && Number(maquina.productoPendiente || 0) > 0){
      maquina.productoListo = true;
      maquina.recetaConsumida = true;
      maquina.produccionInicio = 0;
      maquina.produccionFin = 0;
      cambio = true;
    }
  });

  if(cambio){
    actualizarDashboard();
    renderMercadoTrading();
    guardarPartidaForzadaSilenciosa();
  }
}
