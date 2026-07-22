// FARM LEGACY - Contratos / pedidos especiales V1
// Patch 41: el jugador elige contratos disponibles. El contador empieza al aceptar.
// Regla económica: el mercado permite especular, pero comprar caro para completar hoy no debe ser rentable.

const CONTRATOS_CONFIG = {
  version: "41_contratos_v1",
  maxDisponibles: 3,
  maxActivos: 2,
  ofertaDiasMin: 2,
  ofertaDiasMax: 3
};

const CONTRATOS_CLIENTES = {
  huevo: ["Panadería del Pueblo", "Hostal Camino Viejo", "Cocina de Doña Elvira"],
  leche: ["Cafetería La Plaza", "Dulcería Santa Clara", "Merendero del Valle"],
  lana: ["Tejedoras del Norte", "Mercería Los Pinos", "Sastrería Rural"],
  queso: ["Bodega El Roble", "Restaurante del Mercado", "Posada San Mateo"],
  hilo: ["Taller de Costura", "Comerciante Textil", "Casa de Telas"],
  carnePollo: ["Asador del Pueblo", "Comedor Familiar", "Carnicería El Camino"],
  carneOveja: ["Parrilla del Valle", "Fonda La Sierra", "Carnicería Premium"],
  carnePolloEmpaquetada: ["Tienda Gourmet", "Reparto Frío Local", "Mercado Premium"],
  carneVacaEmpaquetada: ["Hotel La Estación", "Distribuidor Mayorista", "Restaurante La Hacienda"],
  carneOvejaEmpaquetada: ["Club Campestre", "Pedido Especial del Pueblo", "Tienda Gourmet"]
};

const CONTRATOS_PRODUCTOS = [
  { id:"huevo", min:18, max:36, dias:3, reputacion:1, rareza:"común" },
  { id:"leche", min:8, max:18, dias:3, reputacion:1, rareza:"común" },
  { id:"lana", min:5, max:12, dias:3, reputacion:1, rareza:"común" },
  { id:"queso", min:2, max:5, dias:4, reputacion:2, rareza:"procesado", requiere:"queseria" },
  { id:"hilo", min:1, max:4, dias:4, reputacion:2, rareza:"procesado", requiere:"tallerTextil" },
  { id:"carnePollo", min:1, max:3, dias:4, reputacion:2, rareza:"carne" },
  { id:"carneOveja", min:1, max:3, dias:4, reputacion:2, rareza:"carne" },
  { id:"carnePolloEmpaquetada", min:1, max:2, dias:5, reputacion:3, rareza:"premium", requiere:"empaquetadoraCarne" },
  { id:"carneVacaEmpaquetada", min:1, max:1, dias:5, reputacion:4, rareza:"premium", requiere:"empaquetadoraCarne" },
  { id:"carneOvejaEmpaquetada", min:1, max:2, dias:5, reputacion:3, rareza:"premium", requiere:"empaquetadoraCarne" }
];

let contratosV1 = {
  version: CONTRATOS_CONFIG.version,
  disponibles: [],
  activos: [],
  completados: 0,
  fallidos: 0,
  reputacion: 0,
  nextId: 1
};

function numeroAleatorioEntero(min, max){
  const a = Math.ceil(Number(min || 0));
  const b = Math.floor(Number(max || min || 0));
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function elegirAleatorio(lista){
  if(!Array.isArray(lista) || !lista.length) return null;
  return lista[Math.floor(Math.random() * lista.length)];
}

function productoContrato(id){
  return typeof productoMercadoPorId === "function"
    ? productoMercadoPorId(id)
    : (mercadoTrading.productos || []).find((p) => p.id === id);
}

function getNombreProductoContrato(id){
  const p = productoContrato(id);
  const def = typeof getProductoDef === "function" ? getProductoDef(id) : null;
  return p?.nombre || def?.nombre || id;
}

function getIconoProductoContrato(id){
  const p = productoContrato(id);
  const def = typeof getProductoDef === "function" ? getProductoDef(id) : null;
  return p?.icon || def?.icon || "📦";
}

function getCantidadProductoContrato(id){
  return Number(productoContrato(id)?.tienes || 0);
}

function maquinariaConstruidaParaContrato(id){
  try{
    return Boolean(maquinariaV1 && maquinariaV1[id] && maquinariaV1[id].construido);
  }catch(error){
    return false;
  }
}

function productoPermitidoParaContrato(regla){
  if(!regla) return false;
  if(!regla.requiere) return true;
  return maquinariaConstruidaParaContrato(regla.requiere) || getCantidadProductoContrato(regla.id) > 0 || Number(partidaTemporal.dia || 1) >= 7;
}

function opcionesContratoDisponibles(){
  const opciones = CONTRATOS_PRODUCTOS.filter(productoPermitidoParaContrato);
  return opciones.length ? opciones : CONTRATOS_PRODUCTOS.slice(0, 3);
}

function getMultiplicadorContratoPorCategoria(id){
  const def = typeof getProductoDef === "function" ? getProductoDef(id) : null;
  const cat = def?.categoria || "basico";
  if(cat === "carne_procesada") return 1.24;
  if(cat === "procesado") return 1.20;
  if(cat === "carne") return 1.16;
  return 1.14;
}

function calcularRecompensaContrato(productos){
  const lineas = Array.isArray(productos) ? productos : [];
  let ventaNormal = 0;
  let compraDirecta = 0;
  let objetivo = 0;

  lineas.forEach((linea) => {
    const producto = productoContrato(linea.id);
    const precioVenta = typeof getPrecioVentaMercadoProducto === "function"
      ? getPrecioVentaMercadoProducto(producto)
      : Number(producto?.precio || 0);
    const precioCompra = typeof getPrecioCompraMercadoProducto === "function"
      ? getPrecioCompraMercadoProducto(producto)
      : Number(precioVenta * 1.35);
    const cantidad = Number(linea.cantidad || 0);
    const multi = getMultiplicadorContratoPorCategoria(linea.id);
    ventaNormal += precioVenta * cantidad;
    compraDirecta += precioCompra * cantidad;
    objetivo += precioVenta * multi * cantidad;
  });

  const bonoPlanificacion = Math.min(18, Math.max(4, ventaNormal * 0.06));
  // Barrera anti-exploit: comprar todo hoy y entregar no debe dejar ganancia.
  const limiteCompraDirecta = compraDirecta * 0.88;
  const recompensa = Math.min(objetivo + bonoPlanificacion, limiteCompraDirecta);
  return Math.max(1, Number(recompensa.toFixed(2)));
}

function crearContratoDisponible(){
  asegurarProductosBaseMercado?.();
  const regla = elegirAleatorio(opcionesContratoDisponibles());
  const dia = Number(partidaTemporal.dia || 1);
  const escala = Math.min(1.75, 1 + Math.max(0, dia - 1) * 0.035 + Number(contratosV1.reputacion || 0) * 0.015);
  const cantidad = Math.max(1, Math.round(numeroAleatorioEntero(regla.min, regla.max) * escala));
  const productos = [{ id: regla.id, cantidad }];
  const cliente = elegirAleatorio(CONTRATOS_CLIENTES[regla.id]) || "Comprador del Pueblo";
  const recompensa = calcularRecompensaContrato(productos);
  const id = `CT-${Date.now().toString(36)}-${contratosV1.nextId++}`;
  const ofertaDias = numeroAleatorioEntero(CONTRATOS_CONFIG.ofertaDiasMin, CONTRATOS_CONFIG.ofertaDiasMax);

  return {
    id,
    cliente,
    titulo: `Pedido de ${getNombreProductoContrato(regla.id)}`,
    rareza: regla.rareza || "común",
    productos,
    recompensa,
    diasLimite: Number(regla.dias || 3),
    diasRestantes: Number(regla.dias || 3),
    ofertaDiasRestantes: ofertaDias,
    reputacion: Number(regla.reputacion || 1),
    estado: "disponible",
    creadoDia: Number(partidaTemporal.dia || 1)
  };
}

function clonarContrato(c){
  return JSON.parse(JSON.stringify(c));
}

function asegurarContratosV1(){
  if(!contratosV1 || typeof contratosV1 !== "object"){
    resetContratosV1();
  }
  contratosV1.version = CONTRATOS_CONFIG.version;
  contratosV1.disponibles = Array.isArray(contratosV1.disponibles) ? contratosV1.disponibles : [];
  contratosV1.activos = Array.isArray(contratosV1.activos) ? contratosV1.activos : [];
  contratosV1.completados = Math.max(0, Number(contratosV1.completados || 0));
  contratosV1.fallidos = Math.max(0, Number(contratosV1.fallidos || 0));
  contratosV1.reputacion = Math.max(0, Number(contratosV1.reputacion || 0));
  contratosV1.nextId = Math.max(1, Number(contratosV1.nextId || 1));

  while(contratosV1.disponibles.length < CONTRATOS_CONFIG.maxDisponibles){
    contratosV1.disponibles.push(crearContratoDisponible());
  }
  if(contratosV1.disponibles.length > CONTRATOS_CONFIG.maxDisponibles){
    contratosV1.disponibles = contratosV1.disponibles.slice(0, CONTRATOS_CONFIG.maxDisponibles);
  }
  return contratosV1;
}

function resetContratosV1(){
  contratosV1 = {
    version: CONTRATOS_CONFIG.version,
    disponibles: [],
    activos: [],
    completados: 0,
    fallidos: 0,
    reputacion: 0,
    nextId: 1
  };
  asegurarContratosV1();
}

function aplicarSnapshotContratosV1(snapshot){
  if(snapshot && typeof snapshot === "object"){
    contratosV1 = Object.assign({
      version: CONTRATOS_CONFIG.version,
      disponibles: [], activos: [], completados:0, fallidos:0, reputacion:0, nextId:1
    }, JSON.parse(JSON.stringify(snapshot)));
  }else{
    resetContratosV1();
  }
  asegurarContratosV1();
}

function contratoTieneProductos(contrato){
  return (contrato.productos || []).every((linea) => getCantidadProductoContrato(linea.id) >= Number(linea.cantidad || 0));
}

function contratoRequisitosHTML(contrato){
  return (contrato.productos || []).map((linea) => {
    const tiene = getCantidadProductoContrato(linea.id);
    const necesita = Number(linea.cantidad || 0);
    const pct = necesita > 0 ? Math.min(100, Math.round((tiene / necesita) * 100)) : 100;
    const ok = tiene >= necesita;
    return `
      <div class="contract-requirement ${ok ? "ok" : "missing"}">
        <div class="contract-req-top">
          <span>${getIconoProductoContrato(linea.id)} ${getNombreProductoContrato(linea.id)}</span>
          <strong>${tiene} / ${necesita}</strong>
        </div>
        <div class="contract-progress"><i style="width:${pct}%"></i></div>
      </div>`;
  }).join("");
}

function contratoCardDisponibleHTML(contrato){
  return `
    <article class="contract-card available ${contrato.rareza}">
      <div class="contract-card-head">
        <div><span class="contract-kicker">${contrato.rareza}</span><h3>${contrato.cliente}</h3></div>
        <div class="contract-seal">${contrato.ofertaDiasRestantes}d<br><small>oferta</small></div>
      </div>
      <p class="contract-title">${contrato.titulo}</p>
      ${contratoRequisitosHTML(contrato)}
      <div class="contract-footer clean">
        <div><span>Recompensa</span><strong>${formatoEuro(contrato.recompensa)}</strong></div>
        <div><span>Plazo</span><strong>${contrato.diasLimite} días</strong></div>
        <button class="contract-btn accept" data-action="accept-contract" data-contract-id="${contrato.id}">ACEPTAR</button>
      </div>
    </article>`;
}

function contratoCardActivoHTML(contrato){
  const listo = contratoTieneProductos(contrato);
  const danger = Number(contrato.diasRestantes || 0) <= 1 ? "urgent" : "";
  return `
    <article class="contract-card active ${danger}">
      <div class="contract-card-head">
        <div><span class="contract-kicker">activo</span><h3>${contrato.cliente}</h3></div>
        <div class="contract-seal ${danger}">${contrato.diasRestantes}d<br><small>restan</small></div>
      </div>
      <p class="contract-title">${contrato.titulo}</p>
      ${contratoRequisitosHTML(contrato)}
      <div class="contract-footer clean">
        <div><span>Recompensa</span><strong>${formatoEuro(contrato.recompensa)}</strong></div>
        <div><span>Reputación</span><strong>+${contrato.reputacion}</strong></div>
        <button class="contract-btn deliver" data-action="deliver-contract" data-contract-id="${contrato.id}" ${listo ? "" : "disabled"}>ENTREGAR</button>
      </div>
      ${listo ? `<p class="contract-ready">✅ Listo para entregar.</p>` : `<p class="contract-waiting">Pendiente de completar.</p>`}
    </article>`;
}

function renderContratos(){
  asegurarContratosV1();
  const money = document.getElementById("contractsHudMoney");
  const day = document.getElementById("contractsHudDay");
  const rep = document.getElementById("contractsHudRep");
  const actCount = document.getElementById("contractsActiveCount");
  const comp = document.getElementById("contractsCompletedCount");
  const fail = document.getElementById("contractsFailedCount");
  const available = document.getElementById("contractsAvailableList");
  const active = document.getElementById("contractsActiveList");

  if(money) money.textContent = formatoEuro(partidaTemporal.dineroInicial || 0);
  if(day) day.textContent = `DÍA ${partidaTemporal.dia || 1}`;
  if(rep) rep.textContent = String(contratosV1.reputacion || 0);
  if(actCount) actCount.textContent = `${contratosV1.activos.length} / ${CONTRATOS_CONFIG.maxActivos}`;
  if(comp) comp.textContent = String(contratosV1.completados || 0);
  if(fail) fail.textContent = String(contratosV1.fallidos || 0);

  if(available){
    available.innerHTML = contratosV1.disponibles.length
      ? contratosV1.disponibles.map(contratoCardDisponibleHTML).join("")
      : `<div class="contracts-empty">📭 No hay ofertas disponibles por ahora.</div>`;
  }
  if(active){
    active.innerHTML = contratosV1.activos.length
      ? contratosV1.activos.map(contratoCardActivoHTML).join("")
      : `<div class="contracts-empty">📜 No tienes contratos activos. Acepta uno cuando estés listo.</div>`;
  }
}

function abrirContratos(){
  asegurarContratosV1();
  renderContratos();
  mostrarPantalla("contracts");
}

function aceptarContrato(id){
  asegurarContratosV1();
  if(contratosV1.activos.length >= CONTRATOS_CONFIG.maxActivos){
    simpleNotice(`Solo puedes tener ${CONTRATOS_CONFIG.maxActivos} contratos activos por ahora.`, "error");
    return;
  }
  const idx = contratosV1.disponibles.findIndex((c) => c.id === id);
  if(idx < 0){ simpleNotice("Ese contrato ya no está disponible.", "error"); return; }
  const contrato = contratosV1.disponibles.splice(idx, 1)[0];
  contrato.estado = "activo";
  contrato.diasRestantes = Number(contrato.diasLimite || 3);
  contrato.aceptadoDia = Number(partidaTemporal.dia || 1);
  delete contrato.ofertaDiasRestantes;
  contratosV1.activos.push(contrato);
  asegurarContratosV1();
  autoGuardarSiHaySlot();
  renderContratos();
  showGameNotice({
    title:"Contrato aceptado",
    icon:"📜",
    tone:"success",
    message:`<p>Ahora tienes <strong>${contrato.diasRestantes} días</strong> para completar el pedido de <strong>${contrato.cliente}</strong>.</p><p>El tiempo empezó desde este momento.</p>`
  });
}

function entregarContrato(id){
  asegurarContratosV1();
  const idx = contratosV1.activos.findIndex((c) => c.id === id);
  if(idx < 0){ simpleNotice("No se encontró ese contrato activo.", "error"); return; }
  const contrato = contratosV1.activos[idx];
  if(!contratoTieneProductos(contrato)){
    simpleNotice("Todavía no tienes todos los productos para entregar ese contrato.", "error");
    return;
  }

  (contrato.productos || []).forEach((linea) => {
    const producto = productoContrato(linea.id);
    if(producto) producto.tienes = Math.max(0, Number(producto.tienes || 0) - Number(linea.cantidad || 0));
  });

  contratosV1.activos.splice(idx, 1);
  contratosV1.completados = Number(contratosV1.completados || 0) + 1;
  contratosV1.reputacion = Number(contratosV1.reputacion || 0) + Number(contrato.reputacion || 1);
  partidaTemporal.dineroInicial = Number((Number(partidaTemporal.dineroInicial || 0) + Number(contrato.recompensa || 0)).toFixed(2));

  actualizarDashboard();
  renderMercadoTrading?.();
  autoGuardarSiHaySlot();
  renderContratos();

  showGameNotice({
    title:"Contrato completado",
    icon:"✅",
    tone:"success",
    message:`<p>Entregaste el pedido de <strong>${contrato.cliente}</strong>.</p><div class="game-dialog-summary"><span>Recompensa</span><strong>${formatoEuro(contrato.recompensa)}</strong><span>Reputación</span><strong>+${contrato.reputacion}</strong></div>`
  });
}

function avanzarContratosDia(){
  asegurarContratosV1();
  const resumen = { vencidos:[], ofertasRenovadas:0 };

  contratosV1.activos = contratosV1.activos.filter((contrato) => {
    contrato.diasRestantes = Number(contrato.diasRestantes || contrato.diasLimite || 1) - 1;
    if(contrato.diasRestantes <= 0){
      resumen.vencidos.push(clonarContrato(contrato));
      contratosV1.fallidos = Number(contratosV1.fallidos || 0) + 1;
      contratosV1.reputacion = Math.max(0, Number(contratosV1.reputacion || 0) - 1);
      return false;
    }
    return true;
  });

  contratosV1.disponibles = contratosV1.disponibles.filter((contrato) => {
    contrato.ofertaDiasRestantes = Number(contrato.ofertaDiasRestantes || 1) - 1;
    if(contrato.ofertaDiasRestantes <= 0){
      resumen.ofertasRenovadas += 1;
      return false;
    }
    return true;
  });

  asegurarContratosV1();
  if(document.querySelector('[data-screen="contracts"].active')) renderContratos();
  return resumen;
}

function resumenContratosDiaHTML(resumen){
  if(!resumen) return "";
  const partes = [];
  if(resumen.vencidos?.length){
    partes.push(`<p class="storage-warning-text">📜 Contratos fallidos: <strong>${resumen.vencidos.length}</strong>. Reputación -${resumen.vencidos.length}.</p>`);
  }
  if(resumen.ofertasRenovadas > 0){
    partes.push(`<p>📬 ${resumen.ofertasRenovadas} oferta(s) de contrato se renovaron en el pueblo.</p>`);
  }
  return partes.join("");
}

asegurarContratosV1();
