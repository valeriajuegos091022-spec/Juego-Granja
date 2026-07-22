// FARM LEGACY - State central / datos base
const partidaTemporal = {
  personajeGenero: "",
  personajeNombre: "",
  almacenTipo: "",
  espacioTotal: 0,
  alquiler: 0,
  almacenNivel: 1,
  almacenCostoMejora: 80,
  dineroInicial: typeof getBalanceValue === "function" ? getBalanceValue("jugador.dineroInicial", 120) : 120,
  dia: 1,
  modoAdmin: false
};


const SAVE_DB_KEY = "farmLegacy_saves_v17";
const LAST_SESSION_KEY = "farmLegacy_last_session_v17";
let saveManagerMode = "new";
let currentSaveUser = "";
let currentSaveSlot = 1;

const mercadoTrading = {
  productoActivo: null,
  cantidad: 1,
  // Patch 34: los productos nacen desde el catálogo central en products.js.
  productos: typeof crearProductosMercadoIniciales === "function"
    ? crearProductosMercadoIniciales()
    : []
};

const corralesV16 = {
  activo: "gallinas",
  especies: [
    {
      id: "gallinas",
      icon: "🐔",
      nombre: "Gallinas",
      tipoLugar: "Corral",
      nivel: 1,
      capacidad: 20,
      precioCompra: 8,
      precioHistorial: [8.00, 8.50, 7.80, 9.20, 8.70, 9.60, 8.90],
      mejoraCosto: 100,
      produccionIcon: "🥚",
      produccionCantidad: 10,
      produccionTexto: "10 huevos/día",
      imagenClase: "hens",
      edades: { crias: 2, jovenes: 4, adultas: 10, viejas: 2 }
    },
    {
      id: "vacas",
      icon: "🐄",
      nombre: "Vacas",
      tipoLugar: "Establo",
      nivel: 1,
      capacidad: 10,
      precioCompra: 30,
      precioHistorial: [30, 32, 29, 35, 34, 33, 36],
      mejoraCosto: 180,
      produccionIcon: "🥛",
      produccionCantidad: 6,
      produccionTexto: "6 leche/día",
      imagenClase: "cows",
      edades: { crias: 1, jovenes: 1, adultas: 6, viejas: 0 }
    },
    {
      id: "ovejas",
      icon: "🐑",
      nombre: "Ovejas",
      tipoLugar: "Corral",
      nivel: 1,
      capacidad: 15,
      precioCompra: 12,
      precioHistorial: [12, 11.5, 13, 12.8, 14, 13.5, 14.2],
      mejoraCosto: 130,
      produccionIcon: "🧶",
      produccionCantidad: 4,
      produccionTexto: "4 lana/día",
      imagenClase: "sheep",
      edades: { crias: 1, jovenes: 2, adultas: 4, viejas: 0 }
    }
  ]
};

const INITIAL_MERCADO_PRODUCTOS = JSON.parse(JSON.stringify(mercadoTrading.productos));
const INITIAL_CORRALES_ESPECIES = JSON.parse(JSON.stringify(corralesV16.especies));
