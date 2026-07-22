// FARM LEGACY - Motor Universal de Producción
// Patch 37: una sola lógica para cualquier maquinaria.
// Regla del proyecto: las máquinas solo definen datos; este motor ejecuta recetas.

const PRODUCTION_CORE_VERSION = "37_universal_production_core";

function obtenerCantidadProducto(productoId){
  return Number(productoMercadoPorId(productoId)?.tienes || 0);
}

function obtenerProductoSeguro(productoId){
  if(typeof asegurarProductoEnMercado === "function"){
    return asegurarProductoEnMercado(productoId, 0);
  }
  return productoMercadoPorId(productoId);
}

function validarIngredientesReceta(recetaId){
  const receta = getRecetaDef(recetaId);
  if(!receta){
    return { ok:false, faltante:{ id:"receta", requerido:1, tiene:0, falta:1 }, receta:null };
  }

  for(const [productoId, requeridoBase] of Object.entries(receta.entradas || {})){
    const requerido = Number(requeridoBase || 0);
    const tiene = obtenerCantidadProducto(productoId);
    if(tiene < requerido){
      return { ok:false, faltante:{ id:productoId, requerido, tiene, falta:requerido - tiene }, receta };
    }
  }

  return { ok:true, faltante:null, receta };
}

function consumirIngredientesReceta(recetaId){
  const receta = getRecetaDef(recetaId);
  if(!receta) return false;

  for(const [productoId, cantidadBase] of Object.entries(receta.entradas || {})){
    const producto = obtenerProductoSeguro(productoId);
    if(producto){
      producto.tienes = Number(producto.tienes || 0) - Number(cantidadBase || 0);
    }
  }

  return true;
}

function entregarSalidasReceta(recetaId){
  const receta = getRecetaDef(recetaId);
  if(!receta) return [];

  const recibidos = [];
  for(const [productoId, cantidadBase] of Object.entries(receta.salidas || {})){
    const producto = obtenerProductoSeguro(productoId);
    const cantidad = Number(cantidadBase || 0);
    if(producto && cantidad > 0){
      producto.tienes = Number(producto.tienes || 0) + cantidad;
      recibidos.push({
        id: productoId,
        cantidad,
        icon: producto.icon || "📦",
        nombre: producto.nombre || productoId,
        texto: `${producto.icon || "📦"} +${cantidad} ${producto.nombre || productoId}`
      });
    }
  }
  return recibidos;
}

function getCantidadSalidaTotalReceta(recetaId){
  const receta = getRecetaDef(recetaId);
  if(!receta) return 1;
  const total = Object.values(receta.salidas || {}).reduce((suma, n) => suma + Number(n || 0), 0);
  return total || 1;
}

function getSalidaPrincipalReceta(recetaId){
  const receta = getRecetaDef(recetaId);
  const entradas = Object.entries(receta?.salidas || {});
  if(!entradas.length) return { id:"producto", cantidad:1, nombre:"Producto", icon:"📦" };

  const [id, cantidad] = entradas[0];
  const producto = productoMercadoPorId(id) || (typeof getProductoDef === "function" ? getProductoDef(id) : null);
  return {
    id,
    cantidad:Number(cantidad || 1),
    nombre: producto?.nombre || id,
    icon: producto?.icon || "📦"
  };
}

function iniciarProcesoProduccionUniversal(maquina){
  if(!maquina || !maquina.recetaId) return { ok:false, motivo:"maquina_invalida" };

  const verificacion = validarIngredientesReceta(maquina.recetaId);
  if(!verificacion.ok){
    return { ok:false, motivo:"ingredientes", faltante:verificacion.faltante };
  }

  consumirIngredientesReceta(maquina.recetaId);

  maquina.produciendo = true;
  maquina.productoListo = false;
  maquina.productoPendiente = 0;
  maquina.recetaConsumida = true;
  maquina.produccionInicio = Date.now();
  maquina.produccionFin = maquina.produccionInicio + Number(maquina.produccionMs || getTiempoProduccionReceta(maquina.recetaId));

  return { ok:true, receta:verificacion.receta };
}

function completarProcesoProduccionUniversal(maquina){
  if(!maquina) return false;
  maquina.produciendo = false;
  maquina.productoListo = true;
  maquina.productoPendiente = getCantidadSalidaTotalReceta(maquina.recetaId);
  maquina.recetaConsumida = true;
  maquina.produccionInicio = 0;
  maquina.produccionFin = 0;
  return true;
}

function recogerProcesoProduccionUniversal(maquina){
  if(!maquina || !maquina.productoListo){
    return { ok:false, recibidos:[] };
  }

  const recibidos = entregarSalidasReceta(maquina.recetaId);

  maquina.productoListo = false;
  maquina.productoPendiente = 0;
  maquina.recetaConsumida = false;
  maquina.produccionInicio = 0;
  maquina.produccionFin = 0;
  maquina.produciendo = false;

  return { ok:true, recibidos };
}
