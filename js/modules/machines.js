// FARM LEGACY - Registro central de maquinarias
// Patch 37: las máquinas son datos. El motor universal decide cómo construir, producir y recoger.
// Regla del proyecto: nueva máquina = registro aquí + receta central + asset visual.

const MAQUINAS_CATALOGO = {
  tallerTextil: {
    id: "tallerTextil",
    nombre: "Taller Textil",
    icon: "🏭",
    clase: "textile",
    tipo: "procesadora",
    categoria: "produccion_basica",
    recetaId: "hilo_textil",
    imagen: "assets/maquinas/taller_textil.png",
    descripcion: "Procesa lana de oveja y la convierte en Hilo Textil, un producto de mayor valor para vender en el mercado.",
    construccionTexto: "Construyendo Taller Textil",
    produccionTexto: "Produciendo Hilo Textil",
    listoTexto: "Hilo listo para recoger",
    costo: typeof getBalanceMaquinaria === "function" ? (getBalanceMaquinaria("tallerTextil")?.costo || 280) : 280,
    construccionMs: typeof getBalanceMaquinaria === "function" ? (getBalanceMaquinaria("tallerTextil")?.construccionMs || 12 * 60 * 1000) : 12 * 60 * 1000,
    anuncioReduceMs: 5 * 60 * 1000
  },

  queseria: {
    id: "queseria",
    nombre: "Quesería",
    icon: "🧀",
    clase: "cheese",
    tipo: "procesadora",
    categoria: "produccion_basica",
    recetaId: "queso_artesanal",
    imagen: "assets/maquinas/queseria.png",
    descripcion: "Transforma leche fresca en queso artesanal. Es la primera cadena industrial de las vacas y aumenta el valor de la leche.",
    construccionTexto: "Construyendo Quesería",
    produccionTexto: "Produciendo Queso",
    listoTexto: "Queso listo para recoger",
    costo: typeof getBalanceMaquinaria === "function" ? (getBalanceMaquinaria("queseria")?.costo || 420) : 420,
    construccionMs: typeof getBalanceMaquinaria === "function" ? (getBalanceMaquinaria("queseria")?.construccionMs || 18 * 60 * 1000) : 18 * 60 * 1000,
    anuncioReduceMs: 5 * 60 * 1000
  },

  empaquetadoraCarne: {
    id: "empaquetadoraCarne",
    nombre: "Empaquetadora de Carne",
    icon: "📦",
    clase: "meat-packer",
    tipo: "procesadora",
    categoria: "carne",
    recetaId: "empaquetado_pollo",
    recetasIds: ["empaquetado_pollo", "empaquetado_res", "empaquetado_cordero"],
    selectorTitulo: "Elegir carne",
    imagen: "assets/maquinas/empaquetadora_carne.png",
    descripcion: "Permite elegir qué carne empaquetar: pollo, res o cordero. Una sola máquina, varias recetas premium.",
    construccionTexto: "Construyendo Empaquetadora de Carne",
    produccionTexto: "Empaquetando carne",
    listoTexto: "Carne empaquetada lista para recoger",
    costo: typeof getBalanceMaquinaria === "function" ? (getBalanceMaquinaria("empaquetadoraCarne")?.costo || 720) : 720,
    construccionMs: typeof getBalanceMaquinaria === "function" ? (getBalanceMaquinaria("empaquetadoraCarne")?.construccionMs || 22 * 60 * 1000) : 22 * 60 * 1000,
    anuncioReduceMs: 5 * 60 * 1000
  }
};

const TIPOS_ACCION_MAQUINA = ["construir", "producir", "recoger", "anuncio"];

function getMaquinaDef(id){
  return MAQUINAS_CATALOGO[id] || null;
}

function getMaquinasDefLista(){
  return Object.keys(MAQUINAS_CATALOGO).map(getMaquinaDef).filter(Boolean);
}

function getAccionMaquina(id, tipo){
  const mapa = {
    construir: "build",
    producir: "produce",
    recoger: "collect",
    anuncio: "ad"
  };
  return `machine-${mapa[tipo] || tipo}-${id}`;
}

function getMaquinaAccion(action){
  for(const def of getMaquinasDefLista()){
    for(const tipo of TIPOS_ACCION_MAQUINA){
      if(getAccionMaquina(def.id, tipo) === action){
        return { maquinaId:def.id, tipo };
      }
    }
  }
  return null;
}

function getCategoriaMaquinaTexto(categoria){
  const mapa = {
    produccion_basica: "🏭 Producción básica",
    produccion_avanzada: "🏗️ Producción avanzada",
    carne: "📦 Procesamiento de carne",
    lacteos: "🧀 Lácteos",
    textil: "🧵 Textil"
  };
  return mapa[categoria] || "⚙️ Maquinarias";
}
