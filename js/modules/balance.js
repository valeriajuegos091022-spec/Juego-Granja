// FARM LEGACY - Balance general central
// Patch 40: números base para que el juego sea más fácil de ajustar sin perseguir valores por todo el código.
// Regla del proyecto: los valores de economía, inicio, almacén y ritmo deben poder revisarse desde una fuente clara.

const BALANCE_CORE_VERSION = "40_balance_general";

const BALANCE_V40 = {
  jugador: {
    dineroInicial: 120,
    dineroAdmin: 100000
  },

  almacenes: {
    pequeno: {
      capacidad: 12,
      alquiler: 8,
      dineroInicial: 120,
      costoMejora: 90
    },
    grande: {
      capacidad: 30,
      alquiler: 14,
      dineroInicial: 120,
      costoMejora: 130
    }
  },

  mercado: {
    volatilidadBase: 0.075,
    demandaMinFactor: 0.45,
    demandaMaxFactor: 1.90,
    recuperacionDemanda: 0.22,
    variacionDemandaDiaria: 0.30,
    historialMaximo: 14
  },

  productosDemanda: {
    huevo: { demandaBase: 24, elasticidad: 0.66 },
    leche: { demandaBase: 14, elasticidad: 0.74 },
    lana: { demandaBase: 8, elasticidad: 0.84 },
    queso: { demandaBase: 5, elasticidad: 1.02 },
    hilo: { demandaBase: 4, elasticidad: 1.10 },
    carnePollo: { demandaBase: 4, elasticidad: 1.12 },
    carneVaca: { demandaBase: 2, elasticidad: 1.30 },
    carneOveja: { demandaBase: 2, elasticidad: 1.24 },
    carnePolloEmpaquetada: { demandaBase: 3, elasticidad: 1.34 },
    carneVacaEmpaquetada: { demandaBase: 1, elasticidad: 1.50 },
    carneOvejaEmpaquetada: { demandaBase: 1, elasticidad: 1.46 }
  },

  maquinarias: {
    tallerTextil: { costo: 280, construccionMs: 12 * 60 * 1000 },
    queseria: { costo: 420, construccionMs: 18 * 60 * 1000 },
    empaquetadoraCarne: { costo: 720, construccionMs: 22 * 60 * 1000 }
  },

  recetas: {
    hilo_textil: { produccionMs: 25 * 60 * 1000 },
    queso_artesanal: { produccionMs: 30 * 60 * 1000 },
    empaquetado_pollo: { produccionMs: 18 * 60 * 1000 },
    empaquetado_res: { produccionMs: 22 * 60 * 1000 },
    empaquetado_cordero: { produccionMs: 22 * 60 * 1000 }
  },

  notas: [
    "El inicio normal debe comenzar siempre con 120€, sin importar el almacén elegido.",
    "Los procesados deben valer más que vender materia prima, pero no duplicar la riqueza demasiado rápido.",
    "La demanda debe variar, pero no volverse loca de un día para otro.",
    "El mercado V2 queda funcional; Mercado V3 se pensará con más calma."
  ]
};

function getBalanceValue(path, fallback = null){
  const partes = String(path || "").split(".").filter(Boolean);
  let actual = BALANCE_V40;
  for(const parte of partes){
    if(!actual || typeof actual !== "object" || !(parte in actual)) return fallback;
    actual = actual[parte];
  }
  return actual;
}

function getBalanceAlmacen(tipo){
  return getBalanceValue(`almacenes.${tipo}`, null);
}

function getBalanceMaquinaria(id){
  return getBalanceValue(`maquinarias.${id}`, null);
}

function getBalanceReceta(id){
  return getBalanceValue(`recetas.${id}`, null);
}

function getBalanceDemandaProducto(id){
  return getBalanceValue(`productosDemanda.${id}`, null);
}
