// FARM LEGACY - Maquinarias: estado y datos vivos
// Patch 36: maquinaria lee datos de MAQUINAS_CATALOGO y recetas de RECETAS_CATALOGO.
// Regla del proyecto: nueva máquina = datos + receta, no lógica nueva en main.js.

const FL_MACHINERY_PATCH = {
  version: "38_empaquetadora_carne_selector",
  ahora(){ return Date.now(); }
};

function asegurarProductoHiloTextil(){
  if(typeof asegurarProductoEnMercado === "function"){
    asegurarProductoEnMercado("hilo", 0);
  }
}

function asegurarProductoQueso(){
  if(typeof asegurarProductoEnMercado === "function"){
    asegurarProductoEnMercado("queso", 0);
  }
}

function asegurarProductosCarneEmpaquetada(){
  if(typeof asegurarProductoEnMercado === "function"){
    asegurarProductoEnMercado("carnePolloEmpaquetada", 0);
    asegurarProductoEnMercado("carneVacaEmpaquetada", 0);
    asegurarProductoEnMercado("carneOvejaEmpaquetada", 0);
  }
}

function asegurarProductosBaseMaquinaria(){
  if(typeof asegurarTodasLasRecetas === "function") asegurarTodasLasRecetas();
  asegurarProductoHiloTextil();
  asegurarProductoQueso();
  asegurarProductosCarneEmpaquetada();
}

asegurarProductosBaseMaquinaria();

// Refuerzo de ovejas por si una partida vieja viene sin datos completos.
function asegurarOvejasCompletas(){
  let ovejas = corralesV16.especies.find(e => e.id === "ovejas");
  if(!ovejas){
    ovejas = {
      id:"ovejas", icon:"🐑", nombre:"Ovejas", tipoLugar:"Corral", nivel:1,
      capacidad:15, precioCompra:12, precioHistorial:[12,11.5,13,12.8,14],
      mejoraCosto:130, produccionIcon:"🧶", produccionCantidad:0,
      produccionTexto:"0 lana/día", imagenClase:"sheep",
      edades:{ crias:0, jovenes:0, adultas:0, viejas:0 }
    };
    corralesV16.especies.push(ovejas);
  }
  ovejas.icon = ovejas.icon || "🐑";
  ovejas.nombre = ovejas.nombre || "Ovejas";
  ovejas.tipoLugar = ovejas.tipoLugar || "Corral";
  ovejas.produccionIcon = "🧶";
  ovejas.imagenClase = ovejas.imagenClase || "sheep";
  ovejas.capacidad = Number(ovejas.capacidad || 15);
  ovejas.precioCompra = Number(ovejas.precioCompra || 12);
  ovejas.mejoraCosto = Number(ovejas.mejoraCosto || 130);
  ovejas.edades = Object.assign({crias:0,jovenes:0,adultas:0,viejas:0}, ovejas.edades || {});
}
asegurarOvejasCompletas();

function normalizarRecetasMaquina(datos){
  const recetas = Array.isArray(datos.recetasIds) && datos.recetasIds.length
    ? datos.recetasIds.slice()
    : [datos.recetaId].filter(Boolean);
  return recetas;
}

function aplicarRecetaActivaMaquina(maquina){
  if(!maquina) return maquina;
  const recetas = Array.isArray(maquina.recetasIds) && maquina.recetasIds.length
    ? maquina.recetasIds
    : [maquina.recetaId].filter(Boolean);

  let activa = maquina.recetaActivaId || maquina.recetaId || recetas[0] || "";
  if(recetas.length && !recetas.includes(activa)) activa = recetas[0];

  maquina.recetaActivaId = activa;
  maquina.recetaId = activa;

  const receta = typeof getRecetaDef === "function" ? getRecetaDef(activa) : null;
  maquina.produccionMs = Number(receta?.produccionMs || maquina.produccionMs || 10 * 60 * 1000);
  maquina.receta = typeof getEntradasReceta === "function" ? getEntradasReceta(activa) : JSON.parse(JSON.stringify(maquina.receta || {}));
  maquina.salida = typeof getSalidasReceta === "function" ? getSalidasReceta(activa) : JSON.parse(JSON.stringify(maquina.salida || {}));

  return maquina;
}

function crearEstadoMaquina(datos){
  const recetasIds = normalizarRecetasMaquina(datos);
  const recetaInicialId = datos.recetaId || recetasIds[0] || "";
  const receta = typeof getRecetaDef === "function" ? getRecetaDef(recetaInicialId) : null;
  const estado = {
    id: datos.id,
    nombre: datos.nombre,
    icon: datos.icon,
    tipo: datos.tipo || "procesadora",
    categoria: datos.categoria || "produccion_basica",
    recetaId: recetaInicialId,
    recetaActivaId: recetaInicialId,
    recetasIds,
    selectorTitulo: datos.selectorTitulo || "Elegir receta",
    imagen: datos.imagen,
    descripcion: datos.descripcion,
    construccionTexto: datos.construccionTexto || `Construyendo ${datos.nombre}`,
    produccionTexto: datos.produccionTexto || `Produciendo ${datos.nombre}`,
    listoTexto: datos.listoTexto || "Producto listo para recoger",
    construido:false,
    construccionInicio:0,
    construccionFin:0,
    produccionInicio:0,
    produccionFin:0,
    produciendo:false,
    productoListo:false,
    productoPendiente:0,
    recetaConsumida:false,
    costo: Number(datos.costo || 0),
    construccionMs: Number(datos.construccionMs || 0),
    produccionMs: Number(datos.produccionMs || receta?.produccionMs || 10 * 60 * 1000),
    receta: typeof getEntradasReceta === "function" ? getEntradasReceta(recetaInicialId) : JSON.parse(JSON.stringify(datos.receta || {})),
    salida: typeof getSalidasReceta === "function" ? getSalidasReceta(recetaInicialId) : JSON.parse(JSON.stringify(datos.salida || {})),
    anuncioReduceMs: Number(datos.anuncioReduceMs || 5 * 60 * 1000),
    accionConstruir: typeof getAccionMaquina === "function" ? getAccionMaquina(datos.id, "construir") : `machine-build-${datos.id}`,
    accionProducir: typeof getAccionMaquina === "function" ? getAccionMaquina(datos.id, "producir") : `machine-produce-${datos.id}`,
    accionRecoger: typeof getAccionMaquina === "function" ? getAccionMaquina(datos.id, "recoger") : `machine-collect-${datos.id}`,
    accionAnuncio: typeof getAccionMaquina === "function" ? getAccionMaquina(datos.id, "anuncio") : `machine-ad-${datos.id}`,
    clase: datos.clase || datos.id
  };

  return aplicarRecetaActivaMaquina(estado);
}

function crearEstadoMaquinariasDefault(){
  const defs = typeof getMaquinasDefLista === "function" ? getMaquinasDefLista() : [];
  const salida = {};
  defs.forEach((def) => {
    salida[def.id] = crearEstadoMaquina(def);
  });
  return salida;
}

const maquinariaV1Default = crearEstadoMaquinariasDefault();
let maquinariaV1 = JSON.parse(JSON.stringify(maquinariaV1Default));

function resetMaquinariaV1(){
  maquinariaV1 = JSON.parse(JSON.stringify(maquinariaV1Default));
}

function refrescarDatosMaquinaDesdeCatalogo(maquina, base){
  // Mantiene progreso/estado guardado, pero actualiza datos de diseño desde catálogo y receta central.
  const estadoVivo = {
    construido: maquina.construido,
    construccionInicio: maquina.construccionInicio,
    construccionFin: maquina.construccionFin,
    produccionInicio: maquina.produccionInicio,
    produccionFin: maquina.produccionFin,
    produciendo: maquina.produciendo,
    productoListo: maquina.productoListo,
    productoPendiente: maquina.productoPendiente,
    recetaConsumida: maquina.recetaConsumida,
    recetaActivaId: maquina.recetaActivaId || maquina.recetaId
  };

  Object.assign(maquina, JSON.parse(JSON.stringify(base)), estadoVivo);

  if(!Array.isArray(maquina.recetasIds) || !maquina.recetasIds.length){
    maquina.recetasIds = [maquina.recetaId].filter(Boolean);
  }
  if(!maquina.recetaActivaId || !maquina.recetasIds.includes(maquina.recetaActivaId)){
    maquina.recetaActivaId = maquina.recetaId || maquina.recetasIds[0] || "";
  }
  aplicarRecetaActivaMaquina(maquina);

  // Normalización defensiva para partidas anteriores.
  if(typeof maquina.productoListo !== "boolean") maquina.productoListo = false;
  if(typeof maquina.productoPendiente === "undefined") maquina.productoPendiente = 0;
  if(typeof maquina.recetaConsumida !== "boolean"){
    maquina.recetaConsumida = Boolean(maquina.produciendo || maquina.productoListo || Number(maquina.productoPendiente || 0) > 0);
  }
  return maquina;
}

function getMaquina(id){
  const base = maquinariaV1Default[id];
  if(!base) return null;
  if(!maquinariaV1[id]) maquinariaV1[id] = JSON.parse(JSON.stringify(base));
  return refrescarDatosMaquinaDesdeCatalogo(maquinariaV1[id], base);
}

function getMaquinasLista(){
  return Object.keys(maquinariaV1Default).map(getMaquina).filter(Boolean);
}

function getTallerTextil(){
  return getMaquina("tallerTextil");
}

function getQueseria(){
  return getMaquina("queseria");
}

function getEmpaquetadoraCarne(){
  return getMaquina("empaquetadoraCarne");
}

function formatoTiempoRestante(ms){
  ms = Math.max(0, Number(ms || 0));
  const totalSeg = Math.ceil(ms / 1000);
  const min = Math.floor(totalSeg / 60);
  const seg = totalSeg % 60;
  return `${String(min).padStart(2,"0")}:${String(seg).padStart(2,"0")}`;
}

function porcentajeProceso(inicio, fin){
  const ahora = Date.now();
  inicio = Number(inicio || 0); fin = Number(fin || 0);
  if(!inicio || !fin || fin <= inicio) return 0;
  return Math.max(0, Math.min(100, Math.round(((ahora - inicio) / (fin - inicio)) * 100)));
}
