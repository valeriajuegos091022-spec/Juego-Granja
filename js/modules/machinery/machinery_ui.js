// FARM LEGACY - Maquinarias: render y pantalla
function nombreProductoPorId(id){
  const producto = productoMercadoPorId(id);
  if(producto) return `${producto.icon} ${producto.nombre}`;
  const def = typeof getProductoDef === "function" ? getProductoDef(id) : null;
  return def ? `${def.icon} ${def.nombre}` : id;
}

function cantidadProducto(id){
  return Number(productoMercadoPorId(id)?.tienes || 0);
}

function recetaTexto(maquina){
  const entrada = Object.entries(maquina.receta || {})
    .map(([id, cantidad]) => `${nombreProductoPorId(id)} x${cantidad}`)
    .join(" + ");
  const salida = Object.entries(maquina.salida || {})
    .map(([id, cantidad]) => `${nombreProductoPorId(id)} x${cantidad}`)
    .join(" + ");
  return `${entrada} → ${salida}`;
}

function salidaPrincipal(maquina){
  if(typeof getSalidaPrincipalReceta === "function" && maquina.recetaId){
    return getSalidaPrincipalReceta(maquina.recetaId);
  }
  const entradas = Object.entries(maquina.salida || {});
  if(!entradas.length) return { id:"producto", cantidad:1, nombre:"Producto", icon:"📦" };
  const [id, cantidad] = entradas[0];
  const producto = productoMercadoPorId(id);
  return { id, cantidad:Number(cantidad || 1), nombre: producto?.nombre || id, icon: producto?.icon || "📦" };
}

function selectorRecetaMaquinaHTML(maquina){
  const recetas = Array.isArray(maquina.recetasIds) ? maquina.recetasIds : [];
  if(recetas.length <= 1) return "";

  const bloqueado = maquina.produciendo || maquina.productoListo;
  const opciones = recetas.map((recetaId) => {
    const receta = typeof getRecetaDef === "function" ? getRecetaDef(recetaId) : null;
    const selected = recetaId === maquina.recetaId ? "selected" : "";
    return `<option value="${recetaId}" ${selected}>${receta?.nombre || recetaId}</option>`;
  }).join("");

  return `
    <div class="machine-recipe-selector-box ${bloqueado ? "locked" : ""}">
      <span>${maquina.selectorTitulo || "Elegir receta"}</span>
      <select data-machine-recipe-selector data-machine-id="${maquina.id}" ${bloqueado ? "disabled" : ""}>
        ${opciones}
      </select>
      <small>${bloqueado ? "Receta bloqueada hasta terminar/recoger" : "Puedes cambiar la receta antes de producir"}</small>
    </div>`;
}

function calcularFaltanteReceta(maquina){
  for(const [id, requerido] of Object.entries(maquina.receta || {})){
    const tiene = cantidadProducto(id);
    if(tiene < Number(requerido || 0)){
      return { id, requerido:Number(requerido || 0), tiene, falta:Number(requerido || 0) - tiene };
    }
  }
  return null;
}

function getEstadoVisualMaquina(maquina){
  if(!maquina.construido && !maquina.construccionFin) return "sin-construir";
  if(!maquina.construido && maquina.construccionFin) return "construyendo";
  if(maquina.produciendo) return "produciendo";
  if(maquina.productoListo) return "producto-listo";
  return "lista";
}

function maquinariaCardHTML(maquina){
  const ahora = Date.now();
  let estado = "Disponible para construir";
  let barra = 0;
  let tiempo = "--:--";
  let accionPrincipal = "";
  let accionAnuncio = "";
  let detalle = maquina.descripcion || "Procesa materia prima y la convierte en productos de mayor valor.";
  const salida = salidaPrincipal(maquina);
  const selectorReceta = selectorRecetaMaquinaHTML(maquina);
  const estadoVisual = getEstadoVisualMaquina(maquina);

  if(!maquina.construido && !maquina.construccionFin){
    accionPrincipal = `<button class="machine-primary-btn" data-action="${maquina.accionConstruir}">CONSTRUIR · ${formatoEuro(maquina.costo)}</button>`;
  }else if(!maquina.construido && maquina.construccionFin){
    estado = maquina.construccionTexto || `Construyendo ${maquina.nombre}`;
    barra = porcentajeProceso(maquina.construccionInicio, maquina.construccionFin);
    tiempo = formatoTiempoRestante(maquina.construccionFin - ahora);
    detalle = `${maquina.nombre} está en construcción. Puedes esperar o usar un anuncio para acelerar el tiempo.`;
    accionPrincipal = `<button class="machine-primary-btn" disabled>CONSTRUYENDO...</button>`;
    accionAnuncio = `<button class="machine-ad-btn" data-action="${maquina.accionAnuncio}">▶ Ver anuncio · -5 min</button>`;
  }else if(maquina.produciendo){
    estado = maquina.produccionTexto || `Produciendo ${salida.nombre}`;
    barra = porcentajeProceso(maquina.produccionInicio, maquina.produccionFin);
    tiempo = formatoTiempoRestante(maquina.produccionFin - ahora);
    detalle = "La receta ya fue consumida al iniciar. Ahora espera a que termine el proceso o usa un anuncio para acelerar.";
    accionPrincipal = `<button class="machine-primary-btn" disabled>PRODUCIENDO...</button>`;
    accionAnuncio = `<button class="machine-ad-btn" data-action="${maquina.accionAnuncio}">▶ Ver anuncio · -5 min</button>`;
  }else if(maquina.productoListo){
    estado = maquina.listoTexto || `${salida.nombre} listo para recoger`;
    barra = 100;
    tiempo = "LISTO";
    const pendiente = Number(maquina.productoPendiente || salida.cantidad || 1);
    detalle = `La producción terminó. Recoge ${pendiente} ${salida.nombre} para enviarlo al inventario.`;
    accionPrincipal = `<button class="machine-primary-btn collect" data-action="${maquina.accionRecoger}">RECOGER ${salida.nombre.toUpperCase()}</button>`;
  }else{
    const faltante = calcularFaltanteReceta(maquina);
    barra = 0;
    tiempo = "INACTIVO";

    if(faltante){
      estado = `Esperando ${nombreProductoPorId(faltante.id)}`;
      detalle = `Para iniciar producción necesitas ${faltante.requerido} de ${nombreProductoPorId(faltante.id)}. Ahora tienes ${faltante.tiene}.`;
      accionPrincipal = `<button class="machine-primary-btn" data-action="${maquina.accionProducir}" disabled>FALTA ${faltante.falta}</button>`;
    }else{
      estado = "Listo para producir";
      detalle = `Tienes los recursos necesarios. Al iniciar se consumirá la receta: ${recetaTexto(maquina)}.`;
      accionPrincipal = `<button class="machine-primary-btn" data-action="${maquina.accionProducir}">PRODUCIR ${salida.nombre.toUpperCase()}</button>`;
    }
  }

  const stockHTML = Object.entries(Object.assign({}, maquina.receta || {}, maquina.salida || {}))
    .map(([id]) => `<div><span>${productoMercadoPorId(id)?.nombre || id}</span><strong>${nombreProductoPorId(id).split(" ")[0]} ${cantidadProducto(id)}</strong></div>`)
    .join("");

  return `
    <div class="machine-premium-card ${maquina.clase || maquina.id} machine-state-${estadoVisual}" data-machine="${maquina.id}" data-machine-state="${estadoVisual}">
      <div class="machine-image-frame">
        <span class="machine-image-shine" aria-hidden="true"></span>
        <img src="${maquina.imagen}" alt="${maquina.nombre}">
      </div>
      <div class="machine-card-content">
        <div class="machine-title-row">
          <div><span class="panel-kicker">MAQUINARIA</span><h2>${maquina.nombre}</h2></div>
          <strong class="machine-status-pill">${maquina.construido ? "ACTIVO" : "OBRA"}</strong>
        </div>
        <p class="machine-desc">${detalle}</p>
        ${selectorReceta}
        <div class="machine-recipe-box">
          <span>Receta</span>
          <strong>${recetaTexto(maquina)}</strong>
        </div>
        <div class="machine-stock-grid">
          ${stockHTML}
          <div><span>Estado</span><strong>${estado}</strong></div>
        </div>
        <div class="machine-progress-area">
          <div class="machine-progress-label"><span>Progreso</span><strong>${tiempo}</strong></div>
          <div class="machine-progress-bar"><div style="width:${barra}%"></div></div>
        </div>
        <div class="machine-actions-row machine-main-action">${accionPrincipal}</div>
        ${accionAnuncio ? `<div class="machine-actions-row machine-ad-action">${accionAnuncio}</div>` : ""}
      </div>
    </div>`;
}

function maquinariaEstadoHTML(){
  const tarjetas = getMaquinasLista().map(maquinariaCardHTML).join("");
  return `
    <div class="machinery-scroll-hint">
      <span>Maquinarias disponibles</span>
      <strong>Desliza para ver más</strong>
    </div>
    <div class="machinery-category-label">
      <span>Producción y procesamiento</span>
      <em>Construcción · recetas · producción · recogida</em>
    </div>
    ${tarjetas}
  `;
}

function ensureMaquinariasScreen(){
  let screen = document.querySelector('[data-screen="machinery"]');
  if(screen) return screen;
  const main = document.querySelector("main") || document.body;
  screen = document.createElement("section");
  screen.className = "screen machinery-screen";
  screen.dataset.screen = "machinery";
  screen.innerHTML = `
    <div class="machinery-bg-blur"></div>
    <div class="machinery-layout">
      <div class="game-topbar machinery-topbar">
        <button class="back-link" data-action="back-main">← VOLVER</button>
        <div><span>FARM LEGACY</span><strong>Maquinarias</strong></div>
      </div>
      <div class="machinery-header">
        <span class="panel-kicker">INDUSTRIA DE LA GRANJA</span>
        <h1>Maquinarias</h1>
        <p>Las máquinas no aparecen al instante: se construyen con tiempo real, producen con tiempo real y pueden acelerarse con anuncios.</p>
      </div>
      <div id="machineryCards" class="machinery-cards"></div>
    </div>`;
  main.appendChild(screen);
  return screen;
}

function renderMaquinariasV1(){
  completarProcesosMaquinaria();
  ensureMaquinariasScreen();
  const cont = document.getElementById("machineryCards");
  if(cont) cont.innerHTML = maquinariaEstadoHTML();
}

function abrirMaquinariasV1(){
  asegurarProductosBaseMaquinaria();
  asegurarOvejasCompletas();
  renderMaquinariasV1();
  mostrarPantalla("machinery");
}
