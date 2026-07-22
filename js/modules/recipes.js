// FARM LEGACY - Registro central de recetas
// Patch 36: las transformaciones de productos viven aquí.
// Regla del proyecto: ninguna receta debe estar escrita dentro de una máquina.

const RECETAS_CATALOGO = {
  hilo_textil: {
    id: "hilo_textil",
    nombre: "Hilo Textil",
    descripcion: "Convierte lana de oveja en hilo textil de mayor valor.",
    categoria: "textil",
    entradas: { lana: 5 },
    salidas: { hilo: 1 },
    produccionMs: typeof getBalanceReceta === "function" ? (getBalanceReceta("hilo_textil")?.produccionMs || 25 * 60 * 1000) : 25 * 60 * 1000,
    desbloqueado: true
  },

  queso_artesanal: {
    id: "queso_artesanal",
    nombre: "Queso Artesanal",
    descripcion: "Convierte leche fresca en queso artesanal listo para vender.",
    categoria: "lacteos",
    entradas: { leche: 8 },
    salidas: { queso: 2 },
    produccionMs: typeof getBalanceReceta === "function" ? (getBalanceReceta("queso_artesanal")?.produccionMs || 30 * 60 * 1000) : 30 * 60 * 1000,
    desbloqueado: true
  },

  empaquetado_pollo: {
    id: "empaquetado_pollo",
    nombre: "Pollo Empaquetado",
    descripcion: "Empaqueta carne de pollo fresca para aumentar su valor en el mercado.",
    categoria: "carne",
    entradas: { carnePollo: 3 },
    salidas: { carnePolloEmpaquetada: 2 },
    produccionMs: typeof getBalanceReceta === "function" ? (getBalanceReceta("empaquetado_pollo")?.produccionMs || 18 * 60 * 1000) : 18 * 60 * 1000,
    desbloqueado: true
  },

  empaquetado_res: {
    id: "empaquetado_res",
    nombre: "Res Empaquetada",
    descripcion: "Empaqueta carne de res fresca como producto premium para el mercado.",
    categoria: "carne",
    entradas: { carneVaca: 2 },
    salidas: { carneVacaEmpaquetada: 1 },
    produccionMs: typeof getBalanceReceta === "function" ? (getBalanceReceta("empaquetado_res")?.produccionMs || 22 * 60 * 1000) : 22 * 60 * 1000,
    desbloqueado: true
  },

  empaquetado_cordero: {
    id: "empaquetado_cordero",
    nombre: "Cordero Empaquetado",
    descripcion: "Empaqueta carne de cordero fresca para venderla como producto procesado.",
    categoria: "carne",
    entradas: { carneOveja: 2 },
    salidas: { carneOvejaEmpaquetada: 1 },
    produccionMs: typeof getBalanceReceta === "function" ? (getBalanceReceta("empaquetado_cordero")?.produccionMs || 22 * 60 * 1000) : 22 * 60 * 1000,
    desbloqueado: true
  }
};

function getRecetaDef(id){
  return RECETAS_CATALOGO[id] || null;
}

function clonarRecetaParte(parte){
  return JSON.parse(JSON.stringify(parte || {}));
}

function getEntradasReceta(id){
  return clonarRecetaParte(getRecetaDef(id)?.entradas || {});
}

function getSalidasReceta(id){
  return clonarRecetaParte(getRecetaDef(id)?.salidas || {});
}

function getTiempoProduccionReceta(id, fallback = 10 * 60 * 1000){
  const receta = getRecetaDef(id);
  return Number(receta?.produccionMs || fallback);
}

function getProductosReceta(id){
  const receta = getRecetaDef(id);
  if(!receta) return [];
  return Array.from(new Set([
    ...Object.keys(receta.entradas || {}),
    ...Object.keys(receta.salidas || {})
  ]));
}

function asegurarProductosDeReceta(id){
  if(typeof asegurarProductoEnMercado !== "function") return;
  getProductosReceta(id).forEach((productoId) => asegurarProductoEnMercado(productoId, 0));
}

function asegurarTodasLasRecetas(){
  Object.keys(RECETAS_CATALOGO).forEach(asegurarProductosDeReceta);
}

function recetaTieneIngredientes(id, getCantidadProducto){
  const receta = getRecetaDef(id);
  if(!receta) return { ok:false, faltante:{ id:"receta", requerido:1, tiene:0, falta:1 } };

  for(const [productoId, requerido] of Object.entries(receta.entradas || {})){
    const tiene = Number(getCantidadProducto(productoId) || 0);
    const req = Number(requerido || 0);
    if(tiene < req){
      return { ok:false, faltante:{ id:productoId, requerido:req, tiene, falta:req - tiene } };
    }
  }

  return { ok:true, faltante:null };
}
