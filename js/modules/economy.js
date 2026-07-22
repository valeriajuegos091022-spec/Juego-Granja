// FARM LEGACY - Reglas económicas centrales
// Patch 39: mercado inteligente V1 con demanda, escasez, saturación y recuperación.
// Regla del proyecto: market.js muestra; economy.js decide la economía.

const ECONOMIA_CONFIG = {
  version: typeof BALANCE_CORE_VERSION !== "undefined" ? BALANCE_CORE_VERSION : "40_balance_general",
  mercado: {
    volatilidadBase: typeof getBalanceValue === "function" ? getBalanceValue("mercado.volatilidadBase", 0.075) : 0.075,
    historialMaximo: typeof getBalanceValue === "function" ? getBalanceValue("mercado.historialMaximo", 14) : 14,
    demandaMinFactor: typeof getBalanceValue === "function" ? getBalanceValue("mercado.demandaMinFactor", 0.45) : 0.45,
    demandaMaxFactor: typeof getBalanceValue === "function" ? getBalanceValue("mercado.demandaMaxFactor", 1.90) : 1.90,
    recuperacionDemanda: typeof getBalanceValue === "function" ? getBalanceValue("mercado.recuperacionDemanda", 0.22) : 0.22,
    variacionDemandaDiaria: typeof getBalanceValue === "function" ? getBalanceValue("mercado.variacionDemandaDiaria", 0.30) : 0.30
  },
  anuncios: {
    reduccionMsDefault: 5 * 60 * 1000
  }
};

const ECONOMIA_PRODUCTOS = {
  // Demanda local diaria pensada para el inicio del juego.
  // No representa toda una ciudad: representa compradores disponibles para la granja.
  huevo: { demandaBase: 30, elasticidad: 0.70 },
  leche: { demandaBase: 18, elasticidad: 0.78 },
  lana: { demandaBase: 10, elasticidad: 0.88 },
  queso: { demandaBase: 7, elasticidad: 1.05 },
  hilo: { demandaBase: 6, elasticidad: 1.12 },
  carnePollo: { demandaBase: 5, elasticidad: 1.18 },
  carneVaca: { demandaBase: 2, elasticidad: 1.35 },
  carneOveja: { demandaBase: 3, elasticidad: 1.28 },
  carnePolloEmpaquetada: { demandaBase: 4, elasticidad: 1.40 },
  carneVacaEmpaquetada: { demandaBase: 1, elasticidad: 1.58 },
  carneOvejaEmpaquetada: { demandaBase: 2, elasticidad: 1.52 }
};

function clampNumero(valor, min, max){
  return Math.min(max, Math.max(min, Number(valor || 0)));
}

function getReduccionAnuncioDefault(){
  return Number(ECONOMIA_CONFIG.anuncios.reduccionMsDefault || 5 * 60 * 1000);
}


// Patch 41: precios separados para preservar la mecánica de especulación.
// El jugador vende al precio de mercado, pero comprar al mercado tiene margen.
// Así comprar barato y vender caro sigue existiendo, pero comprar caro y entregar contrato no rompe el juego.
function getPrecioVentaMercadoProducto(producto){
  return Number(Number(producto?.precio || 0).toFixed(2));
}

function getMultiplicadorCompraMercado(producto){
  const def = typeof getProductoDef === "function" ? getProductoDef(producto?.id) : null;
  const cat = def?.categoria || producto?.categoria || "basico";
  if(cat === "carne_procesada") return 1.52;
  if(cat === "procesado") return 1.44;
  if(cat === "carne") return 1.48;
  return 1.36;
}

function getPrecioCompraMercadoProducto(producto){
  const venta = getPrecioVentaMercadoProducto(producto);
  return Number((venta * getMultiplicadorCompraMercado(producto)).toFixed(2));
}

function getPrecioContratoSeguroProducto(producto){
  const venta = getPrecioVentaMercadoProducto(producto);
  const compra = getPrecioCompraMercadoProducto(producto);
  const def = typeof getProductoDef === "function" ? getProductoDef(producto?.id) : null;
  const cat = def?.categoria || producto?.categoria || "basico";
  const bonus = cat === "carne_procesada" ? 1.24 : cat === "procesado" ? 1.20 : cat === "carne" ? 1.16 : 1.14;
  return Number(Math.min(venta * bonus, compra * 0.88).toFixed(2));
}

function getVolatilidadMercadoBase(){
  return Number(ECONOMIA_CONFIG.mercado.volatilidadBase || 0.11);
}

function getHistorialMercadoMaximo(){
  return Number(ECONOMIA_CONFIG.mercado.historialMaximo || 14);
}

function getEconomiaProductoConfig(id){
  const def = typeof getProductoDef === "function" ? getProductoDef(id) : null;
  const cfg = (typeof getBalanceDemandaProducto === "function" ? getBalanceDemandaProducto(id) : null) || ECONOMIA_PRODUCTOS[id] || {};
  const basePorCategoria = def?.categoria === "basico" ? 50 : def?.categoria === "procesado" ? 18 : def?.categoria === "carne" ? 8 : 6;
  const demandaBase = Number(cfg.demandaBase || basePorCategoria || 10);
  return {
    demandaBase,
    elasticidad: Number(cfg.elasticidad || 1),
    demandaMin: Math.max(1, Math.round(demandaBase * ECONOMIA_CONFIG.mercado.demandaMinFactor)),
    demandaMax: Math.max(2, Math.round(demandaBase * ECONOMIA_CONFIG.mercado.demandaMaxFactor))
  };
}

function inicializarEconomiaProducto(producto){
  if(!producto || !producto.id) return producto;
  const cfg = getEconomiaProductoConfig(producto.id);
  const versionBalance = typeof BALANCE_CORE_VERSION !== "undefined" ? BALANCE_CORE_VERSION : ECONOMIA_CONFIG.version;
  const necesitaMigrarBalance = producto.balanceVersion !== versionBalance;
  producto.demandaBase = necesitaMigrarBalance ? Number(cfg.demandaBase) : Number(producto.demandaBase || cfg.demandaBase);
  const demandaGuardada = Number(producto.demandaActual || cfg.demandaBase);
  const demandaSuavizada = necesitaMigrarBalance ? ((demandaGuardada * 0.35) + (cfg.demandaBase * 0.65)) : demandaGuardada;
  producto.demandaActual = Math.round(clampNumero(demandaSuavizada, cfg.demandaMin, cfg.demandaMax));
  producto.balanceVersion = versionBalance;
  producto.vendidoHoy = Math.max(0, Math.floor(Number(producto.vendidoHoy || 0)));
  producto.estadoMercado = producto.estadoMercado || "normal";
  producto.ultimoMovimientoMercado = producto.ultimoMovimientoMercado || "Mercado estable";
  producto.diasEscasez = Math.max(0, Math.floor(Number(producto.diasEscasez || 0)));
  producto.diasSaturacion = Math.max(0, Math.floor(Number(producto.diasSaturacion || 0)));
  producto.diasSinActividad = Math.max(0, Math.floor(Number(producto.diasSinActividad || 0)));
  return producto;
}

function getMercadoInfoProducto(producto){
  inicializarEconomiaProducto(producto);
  const demanda = Math.max(1, Math.round(Number(producto.demandaActual || producto.demandaBase || 1)));
  const vendido = Math.max(0, Math.floor(Number(producto.vendidoHoy || 0)));
  const ratio = vendido / demanda;
  const restante = Math.max(0, demanda - vendido);

  let estado = "normal";
  let texto = "Equilibrado";
  let clase = "market-state-normal";
  let detalle = "El producto está dentro de una zona sana de mercado.";

  if(vendido <= 0){
    estado = Number(producto.tienes || 0) > 0 ? "oportunidad" : "sinActividad";
    texto = Number(producto.tienes || 0) > 0 ? "Compradores esperando" : "Sin ventas";
    clase = Number(producto.tienes || 0) > 0 ? "market-state-opportunity" : "market-state-idle";
    detalle = Number(producto.tienes || 0) > 0
      ? "Hay compradores, pero todavía no cubriste demanda. Puede subir un poco si el mercado sigue esperando."
      : "No hubo movimiento del jugador en este producto. El precio se mueve poco para no romper el balance.";
  }else if(ratio < 0.55){
    estado = "escasez";
    texto = "Escasez";
    clase = "market-state-shortage";
    detalle = "Vendiste algo, pero no alcanzó para cubrir la demanda. El precio tiende a subir.";
  }else if(ratio > 1.10){
    estado = "saturado";
    texto = "Saturado";
    clase = "market-state-saturated";
    detalle = "Vendiste más de lo que el mercado quería absorber hoy. El precio tiende a bajar.";
  }

  return { demanda, vendido, restante, ratio, estado, texto, clase, detalle };
}

function registrarVentaMercado(producto, cantidad){
  if(!producto) return;
  inicializarEconomiaProducto(producto);
  producto.vendidoHoy = Math.max(0, Math.floor(Number(producto.vendidoHoy || 0) + Number(cantidad || 0)));
}

function calcularNuevoPrecioPorDemanda(producto){
  inicializarEconomiaProducto(producto);
  const info = getMercadoInfoProducto(producto);
  const cfg = getEconomiaProductoConfig(producto.id);
  const [min,max] = typeof getProductoPrecioRango === "function"
    ? getProductoPrecioRango(producto.id, producto.precio)
    : [producto.precio * .7, producto.precio * 1.3];

  const ruido = (Math.random() * 2 - 1) * (getVolatilidadMercadoBase() * 0.18);
  let presion = ruido;

  if(info.estado === "oportunidad"){
    presion += 0.018 * cfg.elasticidad;
    producto.diasSinActividad = Number(producto.diasSinActividad || 0) + 1;
    producto.diasEscasez = Math.max(0, Number(producto.diasEscasez || 0) - 1);
    producto.diasSaturacion = 0;
    producto.estadoMercado = "oportunidad";
    producto.ultimoMovimientoMercado = "Compradores esperando: subió ligeramente por falta de oferta del jugador.";
  }else if(info.estado === "escasez"){
    const fuerza = clampNumero(0.55 - info.ratio, 0, 0.55) / 0.55;
    presion += (0.025 + fuerza * 0.055) * cfg.elasticidad;
    producto.diasEscasez = Number(producto.diasEscasez || 0) + 1;
    producto.diasSaturacion = 0;
    producto.diasSinActividad = 0;
    producto.estadoMercado = "escasez";
    producto.ultimoMovimientoMercado = "Escasez: el precio subió por demanda sin cubrir.";
  }else if(info.estado === "saturado"){
    const fuerza = clampNumero(info.ratio - 1.10, 0, 1.4) / 1.4;
    presion -= (0.035 + fuerza * 0.085) * cfg.elasticidad;
    producto.diasSaturacion = Number(producto.diasSaturacion || 0) + 1;
    producto.diasEscasez = 0;
    producto.diasSinActividad = 0;
    producto.estadoMercado = "saturado";
    producto.ultimoMovimientoMercado = "Saturación: el precio bajó por exceso de ventas.";
  }else{
    producto.diasEscasez = Math.max(0, Number(producto.diasEscasez || 0) - 1);
    producto.diasSaturacion = Math.max(0, Number(producto.diasSaturacion || 0) - 1);
    producto.diasSinActividad = Math.max(0, Number(producto.diasSinActividad || 0) - 1);
    producto.estadoMercado = info.estado === "sinActividad" ? "sinActividad" : "normal";
    producto.ultimoMovimientoMercado = info.estado === "sinActividad"
      ? "Sin ventas: precio con movimiento mínimo."
      : "Equilibrio: precio con variación ligera.";
  }

  const nuevo = Number(clampNumero(Number(producto.precio || min) * (1 + presion), min, max).toFixed(2));
  return nuevo;
}

function demandaObjetivoAleatoria(producto, cfg){
  const variacion = Number(ECONOMIA_CONFIG.mercado.variacionDemandaDiaria || 0.18);
  const ruido = 1 + ((Math.random() * 2 - 1) * variacion);
  const def = typeof getProductoDef === "function" ? getProductoDef(producto.id) : null;
  const premium = def?.categoria === "carne_procesada" ? 0.92 + Math.random() * 0.28 : 1;
  return cfg.demandaBase * ruido * premium;
}

function actualizarDemandaProductoDia(producto){
  inicializarEconomiaProducto(producto);
  const info = getMercadoInfoProducto(producto);
  const cfg = getEconomiaProductoConfig(producto.id);
  const objetivo = demandaObjetivoAleatoria(producto, cfg);
  let demanda = Number(producto.demandaActual || cfg.demandaBase);

  if(info.estado === "escasez"){
    demanda = (demanda * 1.04) + (objetivo * 0.08);
  }else if(info.estado === "oportunidad"){
    demanda = (demanda * 1.02) + (objetivo * 0.04);
  }else if(info.estado === "saturado"){
    demanda = (demanda * 0.88) + (objetivo * 0.04);
  }else{
    demanda = demanda + ((objetivo - demanda) * ECONOMIA_CONFIG.mercado.recuperacionDemanda);
  }

  producto.demandaActual = Math.round(clampNumero(demanda, cfg.demandaMin, cfg.demandaMax));
  producto.vendidoHoy = 0;
}

function actualizarMercadoPorDemandaDia(productos){
  if(!Array.isArray(productos)) return;
  productos.forEach((producto) => {
    inicializarEconomiaProducto(producto);
    producto.precio = calcularNuevoPrecioPorDemanda(producto);
    producto.historial = producto.historial || [];
    producto.historial.push(producto.precio);
    if(typeof limitarHistorial === "function") limitarHistorial(producto.historial, getHistorialMercadoMaximo());
    actualizarDemandaProductoDia(producto);
  });
}

function resumenMercadoGlobal(productos){
  if(!Array.isArray(productos) || !productos.length) return "Mixta";
  const conteo = { escasez:0, oportunidad:0, saturado:0, normal:0, sinActividad:0 };
  productos.forEach((p) => {
    const info = getMercadoInfoProducto(p);
    conteo[info.estado] = (conteo[info.estado] || 0) + 1;
  });
  if(conteo.saturado >= 3) return "Saturación en varios productos";
  if((conteo.escasez + conteo.oportunidad) >= 4) return "Demanda alta";
  if(conteo.escasez || conteo.saturado || conteo.oportunidad) return "Mixta";
  return "Estable";
}
