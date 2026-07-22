// FARM LEGACY - Centro de Producción
// Patch 44.36
// Panel visual que resume la producción animal, industrial y productos listos.
// No contiene economía ni recetas: solo lee el estado real de otros sistemas.

let productionCenterActiveTab = "resumen";

function pcNumero(valor, fallback = 0){
  const n = Number(valor);
  return Number.isFinite(n) ? n : fallback;
}

function pcFormatoNumero(valor){
  const n = pcNumero(valor, 0);
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function pcProductoAnimal(especie){
  const mapa = { gallinas:"huevo", vacas:"leche", ovejas:"lana" };
  const id = mapa[especie?.id] || "";
  const producto = typeof productoMercadoPorId === "function" ? productoMercadoPorId(id) : null;
  return {
    id,
    nombre: producto?.nombre || (especie?.id === "gallinas" ? "Huevos" : especie?.id === "vacas" ? "Leche" : "Lana"),
    icon: producto?.icon || especie?.produccionIcon || ""
  };
}

function pcProduccionAnimal(){
  const especies = Array.isArray(window.corralesV16?.especies) ? window.corralesV16.especies : (typeof corralesV16 !== "undefined" ? corralesV16.especies : []);
  return (especies || []).map((especie) => {
    const adultas = pcNumero(especie?.edades?.adultas, 0);
    const totalAnimales = typeof totalAnimalesCorral === "function"
      ? totalAnimalesCorral(especie)
      : Object.values(especie?.edades || {}).reduce((suma, n) => suma + pcNumero(n, 0), 0);
    const producto = pcProductoAnimal(especie);
    const imagen = typeof getCorralImageSrc === "function" ? getCorralImageSrc(especie) : "";
    return {
      id: especie.id,
      nombre: especie.nombre,
      lugar: especie.tipoLugar || "Corral",
      nivel: pcNumero(especie.nivel, 1),
      capacidad: pcNumero(especie.capacidad, 0),
      totalAnimales,
      adultas,
      produccion: adultas,
      producto,
      imagen,
      activo: adultas > 0
    };
  });
}

function pcSalidaMaquina(maquina){
  if(typeof getSalidaPrincipalReceta === "function" && maquina?.recetaId){
    return getSalidaPrincipalReceta(maquina.recetaId);
  }
  const salida = Object.entries(maquina?.salida || {});
  if(!salida.length) return { id:"producto", cantidad:1, nombre:"Producto", icon:"" };
  const [id, cantidad] = salida[0];
  const producto = typeof productoMercadoPorId === "function" ? productoMercadoPorId(id) : null;
  return { id, cantidad:pcNumero(cantidad, 1), nombre:producto?.nombre || id, icon:producto?.icon || "" };
}

function pcEstadoMaquina(maquina){
  const ahora = Date.now();
  const salida = pcSalidaMaquina(maquina);
  if(!maquina.construido && !maquina.construccionFin){
    return { clave:"sin-construir", titulo:"Sin construir", detalle:"Disponible para construir", progreso:0, tiempo:"—", salida };
  }
  if(!maquina.construido && maquina.construccionFin){
    return {
      clave:"construyendo",
      titulo:"En construcción",
      detalle:maquina.construccionTexto || `Construyendo ${maquina.nombre}`,
      progreso:typeof porcentajeProceso === "function" ? porcentajeProceso(maquina.construccionInicio, maquina.construccionFin) : 0,
      tiempo:typeof formatoTiempoRestante === "function" ? formatoTiempoRestante(maquina.construccionFin - ahora) : "—",
      salida
    };
  }
  if(maquina.produciendo){
    return {
      clave:"produciendo",
      titulo:"Produciendo",
      detalle:maquina.produccionTexto || `Produciendo ${salida.nombre}`,
      progreso:typeof porcentajeProceso === "function" ? porcentajeProceso(maquina.produccionInicio, maquina.produccionFin) : 0,
      tiempo:typeof formatoTiempoRestante === "function" ? formatoTiempoRestante(maquina.produccionFin - ahora) : "—",
      salida
    };
  }
  if(maquina.productoListo){
    return {
      clave:"listo",
      titulo:"Listo para recoger",
      detalle:maquina.listoTexto || `${salida.nombre} listo para recoger`,
      progreso:100,
      tiempo:"LISTO",
      salida,
      pendiente:pcNumero(maquina.productoPendiente, salida.cantidad || 1)
    };
  }
  return { clave:"disponible", titulo:"Lista para producir", detalle:`Preparada para producir ${salida.nombre}.`, progreso:0, tiempo:"INACTIVA", salida };
}

function pcProduccionIndustrial(){
  const maquinas = typeof getMaquinasLista === "function" ? getMaquinasLista() : [];
  return maquinas.map((maquina) => ({
    id:maquina.id,
    nombre:maquina.nombre,
    imagen:maquina.imagen || "",
    construido:Boolean(maquina.construido),
    estado:pcEstadoMaquina(maquina)
  }));
}

function pcResumenDatos(){
  const animales = pcProduccionAnimal();
  const maquinas = pcProduccionIndustrial();
  const procesosActivos = maquinas.filter((item) => ["construyendo","produciendo"].includes(item.estado.clave)).length;
  const listos = maquinas.filter((item) => item.estado.clave === "listo").length;
  const produccionAnimal = animales.reduce((suma, item) => suma + pcNumero(item.produccion, 0), 0);
  const usado = typeof calcularEspacioUsadoAlmacen === "function" ? pcNumero(calcularEspacioUsadoAlmacen(), 0) : 0;
  const total = Math.max(1, pcNumero(typeof partidaTemporal !== "undefined" ? partidaTemporal.espacioTotal : 10, 10));
  const libre = Math.max(0, total - usado);
  const exceso = Math.max(0, usado - total);
  return { animales, maquinas, procesosActivos, listos, produccionAnimal, usado, total, libre, exceso };
}

function pcResumenCardsHTML(datos){
  const storageClass = datos.exceso > 0 ? "danger" : datos.libre <= 3 ? "warning" : "ok";
  return `
    <section class="production-summary-grid" aria-label="Resumen de producción">
      <article class="production-summary-card active-processes">
        <span>Procesos activos</span>
        <strong>${datos.procesosActivos}</strong>
        <small>Producción o construcción en curso</small>
      </article>
      <article class="production-summary-card ready-items ${datos.listos > 0 ? "has-ready" : ""}">
        <span>Listos para recoger</span>
        <strong>${datos.listos}</strong>
        <small>${datos.listos > 0 ? "Hay productos esperando" : "Nada pendiente ahora"}</small>
      </article>
      <article class="production-summary-card animal-output">
        <span>Producción animal prevista</span>
        <strong>${pcFormatoNumero(datos.produccionAnimal)}</strong>
        <small>Unidades al avanzar el día</small>
      </article>
      <article class="production-summary-card storage-space ${storageClass}">
        <span>Espacio de almacén</span>
        <strong>${datos.exceso > 0 ? `+${datos.exceso}` : datos.libre}</strong>
        <small>${datos.exceso > 0 ? "Espacios de sobrecapacidad" : `${datos.usado} de ${datos.total} usados`}</small>
      </article>
    </section>`;
}

function pcAnimalCardHTML(item, compacta = false){
  return `
    <article class="production-animal-card ${compacta ? "compact" : ""} ${item.activo ? "active" : "inactive"}">
      <div class="production-animal-image">
        ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}">` : ""}
        <span>Nivel ${item.nivel}</span>
      </div>
      <div class="production-animal-copy">
        <div class="production-card-kicker">${item.lugar}</div>
        <h3>${item.nombre}</h3>
        <div class="production-output-main">
          <span>${item.producto.icon || ""}</span>
          <div><strong>${pcFormatoNumero(item.produccion)}</strong><small>${item.producto.nombre} previstos / día</small></div>
        </div>
        <div class="production-mini-stats">
          <div><span>Adultas</span><strong>${item.adultas}</strong></div>
          <div><span>Total</span><strong>${item.totalAnimales}</strong></div>
          <div><span>Capacidad</span><strong>${item.capacidad}</strong></div>
        </div>
        <button class="production-secondary-btn" data-production-action="open-corral" data-corral="${item.id}">IR AL ${item.lugar.toUpperCase()}</button>
      </div>
    </article>`;
}

function pcMachineCardHTML(item, compacta = false){
  const estado = item.estado;
  const canManage = true;
  return `
    <article class="production-machine-card ${compacta ? "compact" : ""} state-${estado.clave}">
      <div class="production-machine-image">
        ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}">` : ""}
        <span class="production-state-pill state-${estado.clave}">${estado.titulo}</span>
      </div>
      <div class="production-machine-copy">
        <div class="production-card-kicker">Producción industrial</div>
        <h3>${item.nombre}</h3>
        <p>${estado.detalle}</p>
        <div class="production-machine-output">
          <span>Salida actual</span>
          <strong>${estado.salida.icon || ""} ${estado.salida.nombre}</strong>
        </div>
        <div class="production-progress-row">
          <div><span>Progreso</span><strong>${estado.tiempo}</strong></div>
          <div class="production-progress-track"><i style="width:${Math.min(100, Math.max(0, estado.progreso))}%"></i></div>
        </div>
        ${estado.clave === "listo"
          ? `<button class="production-primary-btn collect" data-production-action="collect-machine" data-machine="${item.id}">RECOGER ${estado.salida.nombre.toUpperCase()}</button>`
          : `<button class="production-secondary-btn" data-production-action="open-machinery">GESTIONAR MAQUINARIAS</button>`}
      </div>
    </article>`;
}

function pcReadyCardHTML(item){
  const estado = item.estado;
  return `
    <article class="production-ready-card">
      <div class="production-ready-image">${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}">` : ""}</div>
      <div class="production-ready-copy">
        <span class="production-card-kicker">Producción terminada</span>
        <h3>${item.nombre}</h3>
        <p>Hay <strong>${pcFormatoNumero(estado.pendiente || estado.salida.cantidad || 1)} ${estado.salida.nombre}</strong> esperando para entrar en tu inventario.</p>
      </div>
      <button class="production-primary-btn collect" data-production-action="collect-machine" data-machine="${item.id}">RECOGER</button>
    </article>`;
}

function pcEmptyHTML(titulo, texto, accion = ""){
  return `
    <div class="production-empty-state">
      <div class="production-empty-mark">FL</div>
      <h3>${titulo}</h3>
      <p>${texto}</p>
      ${accion}
    </div>`;
}

function pcResumenHTML(datos){
  const ready = datos.maquinas.filter((item) => item.estado.clave === "listo");
  const animales = datos.animales.map((item) => pcAnimalCardHTML(item, true)).join("");
  const maquinas = datos.maquinas.map((item) => pcMachineCardHTML(item, true)).join("");
  return `
    ${datos.listos > 0 ? `
      <section class="production-ready-banner">
        <div><span>Producción terminada</span><strong>${datos.listos} ${datos.listos === 1 ? "máquina tiene" : "máquinas tienen"} producto listo para recoger.</strong></div>
        <button data-production-tab="listos">VER LISTOS</button>
      </section>` : ""}

    <section class="production-overview-grid">
      <div class="production-overview-section">
        <header><div><span class="production-section-kicker">Origen animal</span><h2>Producción diaria</h2></div><button data-production-tab="animales">VER TODO</button></header>
        <div class="production-animal-list compact-list">${animales}</div>
      </div>
      <div class="production-overview-section">
        <header><div><span class="production-section-kicker">Industria</span><h2>Estado de maquinarias</h2></div><button data-production-tab="maquinarias">VER TODO</button></header>
        <div class="production-machine-list compact-list">${maquinas}</div>
      </div>
    </section>

    ${ready.length ? `<section class="production-ready-section"><header><span class="production-section-kicker">Recogida pendiente</span><h2>Listo para tu inventario</h2></header><div class="production-ready-list">${ready.map(pcReadyCardHTML).join("")}</div></section>` : ""}
  `;
}

function pcAnimalesHTML(datos){
  return `
    <section class="production-tab-intro">
      <div><span class="production-section-kicker">Producción animal</span><h2>Lo que tus corrales producirán al avanzar el día</h2></div>
      <p>La producción prevista se basa en los animales adultos disponibles actualmente.</p>
    </section>
    <div class="production-animal-list full-list">${datos.animales.map((item) => pcAnimalCardHTML(item, false)).join("")}</div>`;
}

function pcMaquinariasHTML(datos){
  return `
    <section class="production-tab-intro">
      <div><span class="production-section-kicker">Producción industrial</span><h2>Todas tus maquinarias en un solo lugar</h2></div>
      <p>Consulta procesos activos, tiempos, productos listos y máquinas todavía sin construir.</p>
    </section>
    <div class="production-machine-list full-list">${datos.maquinas.map((item) => pcMachineCardHTML(item, false)).join("")}</div>`;
}

function pcListosHTML(datos){
  const ready = datos.maquinas.filter((item) => item.estado.clave === "listo");
  return `
    <section class="production-tab-intro">
      <div><span class="production-section-kicker">Recogida</span><h2>Productos terminados</h2></div>
      <p>Recoge aquí cualquier producción industrial terminada para enviarla al inventario.</p>
    </section>
    ${ready.length
      ? `<div class="production-ready-list production-ready-list-large">${ready.map(pcReadyCardHTML).join("")}</div>`
      : pcEmptyHTML("Nada listo para recoger", "Cuando una máquina termine su proceso aparecerá aquí automáticamente.", `<button class="production-secondary-btn" data-production-action="open-machinery">IR A MAQUINARIAS</button>`)}
  `;
}

function pcContenidoTabHTML(datos){
  if(productionCenterActiveTab === "animales") return pcAnimalesHTML(datos);
  if(productionCenterActiveTab === "maquinarias") return pcMaquinariasHTML(datos);
  if(productionCenterActiveTab === "listos") return pcListosHTML(datos);
  return pcResumenHTML(datos);
}

function ensureCentroProduccionScreen(){
  let screen = document.querySelector('[data-screen="production"]');
  if(screen) return screen;

  const main = document.querySelector("main") || document.body;
  screen = document.createElement("section");
  screen.className = "screen production-center-screen";
  screen.dataset.screen = "production";
  screen.setAttribute("aria-label", "Centro de Producción");
  screen.innerHTML = `
    <div class="production-center-bg" aria-hidden="true"></div>
    <div class="production-center-shell">
      <header class="production-center-topbar">
        <button class="back-wood-btn" data-action="back-main">← VOLVER</button>
        <div class="production-center-titlebox">
          <span class="production-center-kicker">Centro de control</span>
          <h1>Centro de Producción</h1>
          <p>Todo lo que produce tu granja, en un solo lugar.</p>
        </div>
        <div class="production-center-brand-icon" aria-hidden="true">
          <img src="assets/images/ui/section_icons/06_produccion.png" alt="">
        </div>
      </header>
      <div id="productionCenterRoot"></div>
    </div>`;
  main.appendChild(screen);
  return screen;
}

function renderCentroProduccion(){
  const screen = ensureCentroProduccionScreen();
  const root = screen.querySelector("#productionCenterRoot");
  if(!root) return;
  const datos = pcResumenDatos();
  root.innerHTML = `
    ${pcResumenCardsHTML(datos)}
    <nav class="production-tabs" aria-label="Filtros del centro de producción">
      <button class="${productionCenterActiveTab === "resumen" ? "active" : ""}" data-production-tab="resumen">RESUMEN</button>
      <button class="${productionCenterActiveTab === "animales" ? "active" : ""}" data-production-tab="animales">ANIMALES <span>${datos.animales.length}</span></button>
      <button class="${productionCenterActiveTab === "maquinarias" ? "active" : ""}" data-production-tab="maquinarias">MAQUINARIAS <span>${datos.maquinas.length}</span></button>
      <button class="${productionCenterActiveTab === "listos" ? "active" : ""}" data-production-tab="listos">LISTO PARA RECOGER <span>${datos.listos}</span></button>
    </nav>
    <div class="production-tab-content">${pcContenidoTabHTML(datos)}</div>
  `;
}

function abrirCentroProduccion(){
  if(typeof completarProcesosMaquinaria === "function") completarProcesosMaquinaria();
  productionCenterActiveTab = productionCenterActiveTab || "resumen";
  renderCentroProduccion();
  mostrarPantalla("production");
}

function pcIrACorral(id){
  if(typeof abrirDetalleCorral === "function"){
    abrirDetalleCorral(id || "gallinas");
    return;
  }
  if(typeof abrirCorrales === "function") abrirCorrales();
}

function pcIrAMaquinarias(){
  if(typeof abrirMaquinariasV1 === "function") abrirMaquinariasV1();
}

function pcRecogerMaquina(id){
  if(typeof recogerProduccionMaquina !== "function") return;
  recogerProduccionMaquina(id);
  renderCentroProduccion();
}

// PATCH 44.36 - Interacción robusta en Producción.
// El Centro se actualiza cada segundo para mostrar temporizadores reales. En touch,
// un render podía ocurrir entre pointerdown y click y destruir el botón antes del click.
// Pausamos temporalmente el render mientras el usuario interactúa y resolvemos la acción
// en pointerup, con deduplicación para que el click posterior no ejecute dos veces.
window.__farmLegacyProductionInteractionBusyUntil = window.__farmLegacyProductionInteractionBusyUntil || 0;
window.__farmLegacyProductionLastInteraction = window.__farmLegacyProductionLastInteraction || { key:"", at:0 };

function pcMarcarInteraccionOcupada(ms = 1400){
  window.__farmLegacyProductionInteractionBusyUntil = Date.now() + ms;
}

function pcInteraccionReciente(key, ventana = 700){
  const last = window.__farmLegacyProductionLastInteraction || { key:"", at:0 };
  return last.key === key && (Date.now() - Number(last.at || 0)) < ventana;
}

function pcRegistrarInteraccion(key){
  window.__farmLegacyProductionLastInteraction = { key, at:Date.now() };
}

function pcResolverInteraccion(target){
  if(!target || typeof target.closest !== "function") return false;

  const openBtn = target.closest("[data-action='open-section'][data-section='production']");
  if(openBtn){
    const key = "open:production";
    if(!pcInteraccionReciente(key, 550)){
      pcRegistrarInteraccion(key);
      abrirCentroProduccion();
    }
    return true;
  }

  const tab = target.closest("[data-production-tab]");
  if(tab){
    const key = `tab:${tab.dataset.productionTab || "resumen"}`;
    if(!pcInteraccionReciente(key)){
      pcRegistrarInteraccion(key);
      productionCenterActiveTab = tab.dataset.productionTab || "resumen";
      renderCentroProduccion();
    }
    return true;
  }

  const actionBtn = target.closest("[data-production-action]");
  if(!actionBtn) return false;

  const action = actionBtn.dataset.productionAction || "";
  const targetId = actionBtn.dataset.corral || actionBtn.dataset.machine || "general";
  const key = `${action}:${targetId}`;
  if(pcInteraccionReciente(key)) return true;
  pcRegistrarInteraccion(key);

  if(action === "open-corral"){ pcIrACorral(actionBtn.dataset.corral || "gallinas"); return true; }
  if(action === "open-machinery"){ pcIrAMaquinarias(); return true; }
  if(action === "collect-machine"){ pcRecogerMaquina(actionBtn.dataset.machine || ""); return true; }
  return false;
}

document.addEventListener("pointerdown", (event) => {
  const target = event.target;
  if(!target || typeof target.closest !== "function") return;
  const relevante = target.closest("[data-production-tab], [data-production-action], [data-action='open-section'][data-section='production']");
  if(relevante) pcMarcarInteraccionOcupada();
}, true);

// PATCH 44.37 - Mientras el jugador hace scroll, el refresco automático no debe
// reconstruir las tarjetas. Esto evita tirones, bloqueos o saltos de posición.
function pcMarcarScrollActivo(ms = 900){
  pcMarcarInteraccionOcupada(ms);
}

document.addEventListener("wheel", (event) => {
  const screen = event.target?.closest?.('[data-screen="production"].active');
  if(screen) pcMarcarScrollActivo(950);
}, { capture:true, passive:true });

document.addEventListener("touchmove", (event) => {
  const screen = event.target?.closest?.('[data-screen="production"].active');
  if(screen) pcMarcarScrollActivo(950);
}, { capture:true, passive:true });

document.addEventListener("scroll", (event) => {
  const screen = event.target;
  if(screen?.matches?.('[data-screen="production"].active')) pcMarcarScrollActivo(850);
}, true);

document.addEventListener("pointerup", (event) => {
  if(!pcResolverInteraccion(event.target)) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}, true);

// Fallback para teclado/navegadores sin Pointer Events. La deduplicación evita doble ejecución.
document.addEventListener("click", (event) => {
  if(!pcResolverInteraccion(event.target)) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}, true);

if(!window.__farmLegacyProductionCenterTimer){
  window.__farmLegacyProductionCenterTimer = setInterval(() => {
    const screen = document.querySelector('[data-screen="production"].active');
    if(!screen) return;
    if(Date.now() < Number(window.__farmLegacyProductionInteractionBusyUntil || 0)) return;
    if(typeof completarProcesosMaquinaria === "function") completarProcesosMaquinaria();
    const scrollTop = screen.scrollTop;
    renderCentroProduccion();
    screen.scrollTop = scrollTop;
  }, 1000);
}
