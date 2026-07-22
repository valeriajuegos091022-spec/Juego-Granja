// FARM LEGACY - Catálogo central de productos
// Patch 34: un único registro para productos, mercado, almacén y futuras recetas.
// Regla del proyecto: todo producto nuevo debe registrarse aquí primero.

const PRODUCTOS_CATALOGO = {
  huevo: {
    id: "huevo",
    icon: "🥚",
    nombre: "Huevo",
    categoria: "basico",
    precioInicial: 0.60,
    precioMin: 0.35,
    precioMax: 0.95,
    historialInicial: [0.50,0.54,0.48,0.57,0.60,0.58,0.62],
    almacenLote: 10,
    comprable: true,
    vendible: true
  },
  leche: {
    id: "leche",
    icon: "🥛",
    nombre: "Leche",
    categoria: "basico",
    precioInicial: 0.90,
    precioMin: 0.55,
    precioMax: 1.35,
    historialInicial: [0.80,0.82,0.88,0.93,0.90,0.98,0.95],
    almacenLote: 5,
    comprable: true,
    vendible: true
  },
  lana: {
    id: "lana",
    icon: "🧶",
    nombre: "Lana",
    categoria: "basico",
    precioInicial: 1.25,
    precioMin: 0.75,
    precioMax: 1.95,
    historialInicial: [1.20,1.18,1.25,1.30,1.42,1.38,1.34],
    almacenLote: 5,
    comprable: true,
    vendible: true
  },
  queso: {
    id: "queso",
    icon: "🧀",
    nombre: "Queso",
    categoria: "procesado",
    precioInicial: 4.80,
    precioMin: 3.40,
    precioMax: 6.70,
    historialInicial: [3.50,3.70,3.60,3.95,4.10,4.05,4.30],
    almacenLote: 2,
    comprable: true,
    vendible: true
  },
  hilo: {
    id: "hilo",
    icon: "🧵",
    nombre: "Hilo Textil",
    categoria: "procesado",
    precioInicial: 7.20,
    precioMin: 5.20,
    precioMax: 9.80,
    historialInicial: [2.90,3.00,3.10,3.18,3.25],
    // Se conserva el valor actual del código para no cambiar balance en este parche.
    almacenLote: 2,
    comprable: true,
    vendible: true
  },
  carnePollo: {
    id: "carnePollo",
    icon: "🍗",
    nombre: "Pollo Fresco",
    categoria: "carne",
    precioInicial: 8.40,
    precioMin: 5.00,
    precioMax: 12.00,
    historialInicial: [8.00,7.50,7.80,8.20,8.70,8.50,8.40],
    almacenLote: 2,
    comprable: true,
    vendible: true
  },
  carneVaca: {
    id: "carneVaca",
    icon: "🥩",
    nombre: "Res Fresca",
    categoria: "carne",
    precioInicial: 36.00,
    precioMin: 25.00,
    precioMax: 45.00,
    historialInicial: [35.00,34.00,35.50,37.00,36.50,35.80,36.00],
    almacenLote: 1,
    comprable: true,
    vendible: true
  },
  carneOveja: {
    id: "carneOveja",
    icon: "🍖",
    nombre: "Cordero Fresco",
    categoria: "carne",
    precioInicial: 12.00,
    precioMin: 9.00,
    precioMax: 18.00,
    historialInicial: [12.00,11.50,12.30,13.00,12.70,12.20,12.90],
    almacenLote: 1,
    comprable: true,
    vendible: true
  },

  carnePolloEmpaquetada: {
    id: "carnePolloEmpaquetada",
    icon: "📦",
    nombre: "Pollo Empaquetado",
    categoria: "carne_procesada",
    precioInicial: 16.40,
    precioMin: 11.80,
    precioMax: 23.50,
    historialInicial: [14.20,14.80,15.10,15.60,15.30,15.90,15.80],
    almacenLote: 2,
    comprable: true,
    vendible: true
  },
  carneVacaEmpaquetada: {
    id: "carneVacaEmpaquetada",
    icon: "🥡",
    nombre: "Res Empaquetada",
    categoria: "carne_procesada",
    precioInicial: 84.00,
    precioMin: 62.00,
    precioMax: 118.00,
    historialInicial: [76.00,78.50,80.00,83.00,81.20,82.50,82.00],
    almacenLote: 1,
    comprable: true,
    vendible: true
  },
  carneOvejaEmpaquetada: {
    id: "carneOvejaEmpaquetada",
    icon: "🧺",
    nombre: "Cordero Empaquetado",
    categoria: "carne_procesada",
    precioInicial: 29.00,
    precioMin: 21.00,
    precioMax: 41.00,
    historialInicial: [25.00,26.20,27.00,28.30,27.80,28.50,28.00],
    almacenLote: 1,
    comprable: true,
    vendible: true
  }
};

const PRODUCTOS_INICIALES = [
  "huevo",
  "leche",
  "lana",
  "queso",
  "carnePollo",
  "carneVaca",
  "carneOveja",
  "carnePolloEmpaquetada",
  "carneVacaEmpaquetada",
  "carneOvejaEmpaquetada"
];

function getProductoDef(id){
  return PRODUCTOS_CATALOGO[id] || null;
}

function crearProductoMercado(id, cantidadInicial = 0){
  const def = getProductoDef(id);
  if(!def){
    console.warn("Producto no registrado en PRODUCTOS_CATALOGO:", id);
    return {
      id,
      icon: "📦",
      nombre: id,
      precio: 1,
      tienes: cantidadInicial,
      historial: [1]
    };
  }

  const producto = {
    id: def.id,
    icon: def.icon,
    nombre: def.nombre,
    precio: Number(def.precioInicial || 1),
    tienes: Number(cantidadInicial || 0),
    historial: JSON.parse(JSON.stringify(def.historialInicial || [def.precioInicial || 1]))
  };
  if(typeof inicializarEconomiaProducto === "function") inicializarEconomiaProducto(producto);
  return producto;
}

function crearProductosMercadoIniciales(){
  return PRODUCTOS_INICIALES.map((id) => {
    const cantidadInicial = id === "huevo" ? 20 :
      id === "leche" ? 8 :
      id === "lana" ? 4 :
      id === "queso" ? 2 :
      id === "carnePollo" ? 1 : 0;
    return crearProductoMercado(id, cantidadInicial);
  });
}

function normalizarProductoMercado(producto){
  if(!producto || !producto.id) return producto;
  const def = getProductoDef(producto.id);
  if(!def) return producto;

  producto.icon = producto.icon || def.icon;
  producto.nombre = producto.nombre || def.nombre;
  producto.precio = Number(producto.precio || def.precioInicial || 1);
  producto.tienes = Number(producto.tienes || 0);
  producto.historial = Array.isArray(producto.historial) && producto.historial.length
    ? producto.historial
    : JSON.parse(JSON.stringify(def.historialInicial || [producto.precio]));
  if(typeof inicializarEconomiaProducto === "function") inicializarEconomiaProducto(producto);

  return producto;
}

function asegurarProductoEnMercado(id, cantidadInicial = 0){
  if(typeof mercadoTrading === "undefined" || !mercadoTrading.productos) return null;
  let producto = mercadoTrading.productos.find((p) => p.id === id);
  if(!producto){
    producto = crearProductoMercado(id, cantidadInicial);
    mercadoTrading.productos.push(producto);
  }
  return normalizarProductoMercado(producto);
}

function asegurarProductosBaseMercado(){
  if(typeof mercadoTrading === "undefined" || !mercadoTrading.productos) return;
  PRODUCTOS_INICIALES.forEach((id) => asegurarProductoEnMercado(id, 0));
  mercadoTrading.productos.forEach(normalizarProductoMercado);
}

function getProductoPrecioRango(id, precioActual = 1){
  const def = getProductoDef(id);
  if(def && Number.isFinite(Number(def.precioMin)) && Number.isFinite(Number(def.precioMax))){
    return [Number(def.precioMin), Number(def.precioMax)];
  }
  const base = Number(precioActual || 1);
  return [base * 0.7, base * 1.3];
}

function getProductoLoteAlmacen(id){
  const def = getProductoDef(id);
  return Number(def?.almacenLote || 1);
}
