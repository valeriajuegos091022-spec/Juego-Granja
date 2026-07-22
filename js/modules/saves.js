// FARM LEGACY - Guardado por usuario y slots

let saveIndicatorTimer1 = null;
let saveIndicatorTimer2 = null;
let saveIndicatorTimer3 = null;

function mostrarIndicadorGuardadoPremium(){
  let indicador = document.getElementById("farmSaveIndicator");
  if(!indicador){
    indicador = document.createElement("div");
    indicador.id = "farmSaveIndicator";
    indicador.className = "farm-save-indicator";
    indicador.innerHTML = `
      <div class="farm-save-card">
        <div class="farm-save-icon">💾</div>
        <div class="farm-save-content">
          <strong id="farmSaveTitle">Guardando partida...</strong>
          <span id="farmSaveSubtitle">No cierres el juego todavía</span>
          <div class="farm-save-bar"><i id="farmSaveProgress"></i></div>
        </div>
      </div>`;
    document.body.appendChild(indicador);
  }

  const title = document.getElementById("farmSaveTitle");
  const subtitle = document.getElementById("farmSaveSubtitle");
  const progress = document.getElementById("farmSaveProgress");

  clearTimeout(saveIndicatorTimer1);
  clearTimeout(saveIndicatorTimer2);
  clearTimeout(saveIndicatorTimer3);

  if(title) title.textContent = "Guardando partida...";
  if(subtitle) subtitle.textContent = "Progreso del día guardado";
  if(progress){
    progress.style.transition = "none";
    progress.style.width = "0%";
    progress.offsetHeight;
    progress.style.transition = "width 1.15s ease";
  }

  indicador.classList.remove("saved", "active");
  indicador.offsetHeight;
  indicador.classList.add("active");

  requestAnimationFrame(() => {
    if(progress) progress.style.width = "100%";
  });

  saveIndicatorTimer1 = setTimeout(() => {
    indicador.classList.add("saved");
    if(title) title.textContent = "Partida guardada";
    if(subtitle) subtitle.textContent = "Puedes seguir jugando tranquilo";
  }, 1150);

  saveIndicatorTimer2 = setTimeout(() => {
    indicador.classList.remove("active");
  }, 3300);

  saveIndicatorTimer3 = setTimeout(() => {
    if(progress) progress.style.width = "0%";
    indicador.classList.remove("saved");
  }, 3800);
}

// Disponible para el ciclo diario y futuros sistemas que necesiten confirmar guardado visual.
window.mostrarIndicadorGuardadoPremium = mostrarIndicadorGuardadoPremium;

function normalizarUsuarioSave(nombre){
  return limpiarNombre(nombre || "").toLowerCase();
}

function leerDBSaves(){
  try{
    return JSON.parse(localStorage.getItem(SAVE_DB_KEY) || "{}");
  }catch(error){
    return {};
  }
}

function escribirDBSaves(db){
  localStorage.setItem(SAVE_DB_KEY, JSON.stringify(db));
}

function leerUltimaSesionSave(){
  try{ return JSON.parse(localStorage.getItem(LAST_SESSION_KEY) || "null"); }
  catch(error){ return null; }
}

function crearSnapshotPartida(){
  return {
    version: "V17",
    guardadoEn: new Date().toISOString(),
    currentSaveUser,
    currentSaveSlot,
    partidaTemporal: JSON.parse(JSON.stringify(partidaTemporal)),
    mercadoTrading: (() => {
      const copia = JSON.parse(JSON.stringify(mercadoTrading));
      copia.productoActivoId = mercadoTrading.productoActivo?.id || null;
      copia.productoActivo = null;
      return copia;
    })(),
    corralesV16: JSON.parse(JSON.stringify(corralesV16)),
    maquinariaV1: JSON.parse(JSON.stringify(typeof maquinariaV1 !== "undefined" ? maquinariaV1 : {})),
    contratosV1: JSON.parse(JSON.stringify(typeof contratosV1 !== "undefined" ? contratosV1 : {}))
  };
}

function aplicarSnapshotPartida(snapshot){
  if(!snapshot) return false;
  if(snapshot.partidaTemporal) Object.assign(partidaTemporal, snapshot.partidaTemporal);
  if(snapshot.mercadoTrading){
    mercadoTrading.cantidad = snapshot.mercadoTrading.cantidad || 1;
    mercadoTrading.productos.splice(0, mercadoTrading.productos.length, ...(snapshot.mercadoTrading.productos || []));
    if(typeof asegurarProductosBaseMercado === "function") asegurarProductosBaseMercado();
    const activoId = snapshot.mercadoTrading.productoActivoId || snapshot.mercadoTrading.productoActivo?.id || null;
    mercadoTrading.productoActivo = activoId ? productoMercadoPorId(activoId) : null;
  }
  if(snapshot.corralesV16){
    corralesV16.activo = snapshot.corralesV16.activo || "gallinas";
    corralesV16.especies.splice(0, corralesV16.especies.length, ...(snapshot.corralesV16.especies || []));
  }
  if(snapshot.maquinariaV1 && typeof maquinariaV1 !== "undefined"){
    maquinariaV1 = Object.assign(
      JSON.parse(JSON.stringify(maquinariaV1Default)),
      JSON.parse(JSON.stringify(snapshot.maquinariaV1))
    );
    if(snapshot.maquinariaV1.tallerTextil){
      maquinariaV1.tallerTextil = Object.assign(
        JSON.parse(JSON.stringify(maquinariaV1Default.tallerTextil)),
        JSON.parse(JSON.stringify(snapshot.maquinariaV1.tallerTextil))
      );
    }
  }else if(typeof resetMaquinariaV1 === "function"){
    resetMaquinariaV1();
  }
  if(snapshot.contratosV1 && typeof aplicarSnapshotContratosV1 === "function"){
    aplicarSnapshotContratosV1(snapshot.contratosV1);
  }else if(typeof resetContratosV1 === "function"){
    resetContratosV1();
  }
  if(typeof asegurarProductosBaseMercado === "function") asegurarProductosBaseMercado();
  if(typeof asegurarProductoHiloTextil === "function") asegurarProductoHiloTextil();
  if(typeof asegurarOvejasCompletas === "function") asegurarOvejasCompletas();
  if(typeof completarProcesosMaquinaria === "function") completarProcesosMaquinaria();
  asegurarDatosMejoraAlmacen();
  return true;
}

function slotKey(slot){ return `slot${slot}`; }

function obtenerSlotUsuario(usuario, slot){
  const db = leerDBSaves();
  return db?.[usuario]?.[slotKey(slot)] || null;
}

function guardarPartidaEnSlot(usuario = currentSaveUser, slot = currentSaveSlot, opciones = {}){
  usuario = normalizarUsuarioSave(usuario);
  slot = Number(slot || 1);
  const silencioso = opciones && opciones.silencioso === true;
  const mostrarIndicador = opciones && opciones.mostrarIndicador === true;

  if(!usuario){
    if(!silencioso) simpleNotice("No hay usuario de guardado activo.", "error");
    return false;
  }

  const db = leerDBSaves();
  if(!db[usuario]) db[usuario] = {};

  const snapshot = crearSnapshotPartida();
  snapshot.currentSaveUser = usuario;
  snapshot.currentSaveSlot = slot;

  db[usuario][slotKey(slot)] = snapshot;
  escribirDBSaves(db);

  currentSaveUser = usuario;
  currentSaveSlot = slot;
  localStorage.setItem(LAST_SESSION_KEY, JSON.stringify({ usuario, slot }));
  if(mostrarIndicador) mostrarIndicadorGuardadoPremium();
  return true;
}

function guardarPartidaForzadaSilenciosa(){
  if(!currentSaveUser) return false;
  return guardarPartidaEnSlot(currentSaveUser, currentSaveSlot, { silencioso:true });
}

function autoGuardarSiHaySlot(opciones = {}){
  const quiereVisual = opciones && opciones.visual === true;
  if(currentSaveUser){
    return guardarPartidaEnSlot(currentSaveUser, currentSaveSlot, {
      silencioso:true,
      mostrarIndicador: quiereVisual
    });
  }

  // Si por alguna razón la partida no tiene slot activo, no mentimos con un guardado real.
  // Pero dejamos retorno claro para que el ciclo diario pueda decidir qué hacer.
  return false;
}

function resumenSlot(slotData){
  if(!slotData) return `<strong>Vacío</strong><span>Disponible para nueva partida.</span>`;
  const p = slotData.partidaTemporal || {};
  const usuario = slotData.currentSaveUser || p.currentSaveUser || "perfil";
  const nombre = p.personajeNombre || usuario || "Partida";
  const fecha = slotData.guardadoEn ? new Date(slotData.guardadoEn).toLocaleString() : "Sin fecha";
  return `<strong>${nombre}</strong><span>Perfil: ${usuario} · Día ${p.dia || 1} · ${formatoEuro(p.dineroInicial || 0)} · ${fecha}</span>`;
}

function renderSaveSlots(){
  const input = document.getElementById("saveUserName");
  const lista = document.getElementById("saveSlotsList");
  if(!input || !lista) return;
  const usuario = normalizarUsuarioSave(input.value);
  const db = leerDBSaves();
  const userSlots = usuario ? (db[usuario] || {}) : {};
  lista.innerHTML = [1,2,3].map((slot) => {
    const data = userSlots[slotKey(slot)] || null;
    const ocupado = !!data;
    const textoAccion = saveManagerMode === "load" ? (ocupado ? "CARGAR" : "VACÍO") : (ocupado ? "SOBRESCRIBIR" : "NUEVA PARTIDA");
    return `<button class="save-slot-card ${ocupado ? "occupied" : "empty"}" data-action="select-save-slot" data-slot="${slot}" ${saveManagerMode === "load" && !ocupado ? "disabled" : ""}>
      <span class="save-slot-number">SLOT ${slot}</span>
      <span class="save-slot-info">${resumenSlot(data)}</span>
      <span class="save-slot-action">${textoAccion}</span>
    </button>`;
  }).join("");
}

function abrirGestorSaves(mode){
  saveManagerMode = mode === "load" ? "load" : "new";
  const kicker = document.getElementById("saveModeKicker");
  const title = document.getElementById("saveModeTitle");
  const desc = document.getElementById("saveModeDescription");
  const input = document.getElementById("saveUserName");
  const last = leerUltimaSesionSave();
  if(kicker) kicker.textContent = saveManagerMode === "load" ? "CARGAR PARTIDA" : "NUEVA PARTIDA";
  if(title) title.textContent = saveManagerMode === "load" ? "Elige una partida guardada" : "Elige perfil y slot";
  if(desc){
    desc.textContent = saveManagerMode === "load"
      ? "Escribe el perfil y escoge un slot ocupado para cargarlo. Los slots vacíos no se pueden abrir."
      : "Cada perfil tiene 3 slots. Si eliges uno ocupado, el juego pedirá confirmación antes de sobrescribirlo.";
  }
  if(input){
    input.value = currentSaveUser || last?.usuario || "";
    setTimeout(() => input.focus(), 80);
  }
  renderSaveSlots();
  mostrarPantalla("save-manager");
}

function resetPartidaTemporalNueva(usuario, slot){
  currentSaveUser = usuario;
  currentSaveSlot = Number(slot || 1);
  partidaTemporal.personajeGenero = "";
  partidaTemporal.personajeNombre = "";
  partidaTemporal.almacenTipo = "";
  partidaTemporal.espacioTotal = 0;
  partidaTemporal.alquiler = 0;
  partidaTemporal.almacenNivel = 1;
  partidaTemporal.almacenCostoMejora = typeof getBalanceValue === "function" ? getBalanceValue("almacenes.pequeno.costoMejora", 90) : 90;
  partidaTemporal.dineroInicial = usuario === "admin" ? (typeof getBalanceValue === "function" ? getBalanceValue("jugador.dineroAdmin", 100000) : 100000) : (typeof getBalanceValue === "function" ? getBalanceValue("jugador.dineroInicial", 120) : 120);
  partidaTemporal.dia = 1;
  partidaTemporal.modoAdmin = usuario === "admin";
  mercadoTrading.productoActivo = null;
  mercadoTrading.cantidad = 1;
  mercadoTrading.productos.splice(0, mercadoTrading.productos.length, ...JSON.parse(JSON.stringify(INITIAL_MERCADO_PRODUCTOS)));
  corralesV16.activo = "gallinas";
  corralesV16.especies.splice(0, corralesV16.especies.length, ...JSON.parse(JSON.stringify(INITIAL_CORRALES_ESPECIES)));
  if(typeof resetMaquinariaV1 === "function") resetMaquinariaV1();
  if(typeof resetContratosV1 === "function") resetContratosV1();
  if(typeof asegurarProductosBaseMercado === "function") asegurarProductosBaseMercado();
  if(typeof asegurarProductoHiloTextil === "function") asegurarProductoHiloTextil();
  if(typeof asegurarOvejasCompletas === "function") asegurarOvejasCompletas();
  localStorage.setItem(LAST_SESSION_KEY, JSON.stringify({ usuario, slot: currentSaveSlot }));
}

function seleccionarSaveSlot(slot){
  const input = document.getElementById("saveUserName");
  const usuario = normalizarUsuarioSave(input?.value || "");
  if(usuario.length < 2){
    simpleNotice("Escribe un usuario válido para continuar.", "error");
    input?.focus();
    return;
  }
  const data = obtenerSlotUsuario(usuario, slot);
  if(saveManagerMode === "load"){
    if(!data){ simpleNotice("Ese slot está vacío.", "error"); return; }
    aplicarSnapshotPartida(data);
    currentSaveUser = usuario;
    currentSaveSlot = Number(slot);
    localStorage.setItem(LAST_SESSION_KEY, JSON.stringify({ usuario, slot:Number(slot) }));
    actualizarDashboard();
    renderMercadoTrading();
    renderCorrales();
    showGameNotice({ title:"Partida cargada", icon:"💾", tone:"success", message:`<p>Usuario: <strong>${usuario}</strong><br>Slot: <strong>${slot}</strong></p>` });
    mostrarPantalla("main-game");
    return;
  }
  const comenzar = () => {
    resetPartidaTemporalNueva(usuario, slot);
    mostrarPantalla("character");
  };
  if(data){
    const p = data.partidaTemporal || {};
    showGameConfirm({
      title:"Sobrescribir slot",
      icon:"⚠️",
      tone:"danger",
      message:`<p>Este slot ya tiene una partida.</p><div class="game-dialog-summary"><span>Usuario</span><strong>${usuario}</strong><span>Slot</span><strong>${slot}</strong><span>Dinero</span><strong>${formatoEuro(p.dineroInicial || 0)}</strong></div>`,
      confirmText:"SOBRESCRIBIR",
      cancelText:"CANCELAR",
      onConfirm: comenzar
    });
  }else{
    comenzar();
  }
}

function continuarUltimaPartida(){
  const last = leerUltimaSesionSave();
  if(!last?.usuario || !last?.slot){
    simpleNotice("No hay última partida todavía. Usa Cargar Partida o Nueva Partida.", "error");
    return;
  }
  const data = obtenerSlotUsuario(last.usuario, last.slot);
  if(!data){
    simpleNotice("No se encontró la última partida guardada.", "error");
    return;
  }
  aplicarSnapshotPartida(data);
  currentSaveUser = last.usuario;
  currentSaveSlot = Number(last.slot);
  actualizarDashboard();
  showGameNotice({ title:"Continuar", icon:"🏡", tone:"success", message:`<p>Cargada la última partida de <strong>${currentSaveUser}</strong>, slot <strong>${currentSaveSlot}</strong>.</p>` });
  mostrarPantalla("main-game");
}

function guardarPartidaActual(){
  if(!currentSaveUser){
    abrirGestorSaves("new");
    simpleNotice("Primero elige un usuario y un slot para guardar.", "info");
    return;
  }
  if(guardarPartidaEnSlot()){
    showGameNotice({ title:"Partida guardada", icon:"💾", tone:"success", message:`<p>Usuario: <strong>${currentSaveUser}</strong><br>Slot: <strong>${currentSaveSlot}</strong></p>` });
  }
}
