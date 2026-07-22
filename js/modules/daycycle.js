// FARM LEGACY - Ciclo diario, producción y dashboard
function limitarHistorial(valores, max = 14){
  while(valores.length > max) valores.shift();
}

function variarPrecio(valor, min, max, fuerza = 0.10){
  const base = Number(valor || min || 1);
  const factor = 1 + ((Math.random() * 2 - 1) * fuerza);
  return Number(Math.min(max, Math.max(min, base * factor)).toFixed(2));
}

function actualizarPreciosDia(){
  asegurarProductosBaseMercado();
  if(typeof actualizarMercadoPorDemandaDia === "function"){
    actualizarMercadoPorDemandaDia(mercadoTrading.productos);
  }else{
    mercadoTrading.productos.forEach((producto) => {
      const [min,max] = typeof getProductoPrecioRango === "function"
        ? getProductoPrecioRango(producto.id, producto.precio)
        : [producto.precio * .7, producto.precio * 1.3];
      producto.precio = variarPrecio(producto.precio, min, max, 0.11);
      producto.historial = producto.historial || [];
      producto.historial.push(producto.precio);
      limitarHistorial(producto.historial, 14);
    });
  }

  corralesV16.especies.forEach((especie) => {
    const limitesAnimales = especie.id === "gallinas" ? [6,14] : especie.id === "vacas" ? [24,48] : [9,22];
    especie.precioCompra = variarPrecio(especie.precioCompra, limitesAnimales[0], limitesAnimales[1], 0.09);
    especie.precioHistorial = especie.precioHistorial || [];
    especie.precioHistorial.push(especie.precioCompra);
    limitarHistorial(especie.precioHistorial, 14);
  });
}

function productoProduccionPorEspecie(especie){
  const mapa = { gallinas:"huevo", vacas:"leche", ovejas:"lana" };
  return productoMercadoPorId(mapa[especie.id]);
}

function avanzarAnimalesDia(){
  const resumen = [];
  corralesV16.especies.forEach((especie) => {
    const e = especie.edades || (especie.edades = { crias:0, jovenes:0, adultas:0, viejas:0 });
    especie.diasCiclo = Number(especie.diasCiclo || 0) + 1;

    let nacenJovenes = 0;
    let pasanAdultas = 0;
    let pasanViejas = 0;

    if(especie.diasCiclo % 2 === 0 && e.crias > 0){
      nacenJovenes = Math.max(1, Math.ceil(e.crias * 0.35));
      nacenJovenes = Math.min(nacenJovenes, e.crias);
      e.crias -= nacenJovenes;
      e.jovenes += nacenJovenes;
    }

    if(especie.diasCiclo % 3 === 0 && e.jovenes > 0){
      pasanAdultas = Math.max(1, Math.ceil(e.jovenes * 0.30));
      pasanAdultas = Math.min(pasanAdultas, e.jovenes);
      e.jovenes -= pasanAdultas;
      e.adultas += pasanAdultas;
    }

    if(especie.diasCiclo % 6 === 0 && e.adultas > 0){
      pasanViejas = Math.max(1, Math.ceil(e.adultas * 0.08));
      pasanViejas = Math.min(pasanViejas, e.adultas);
      e.adultas -= pasanViejas;
      e.viejas += pasanViejas;
    }

    const producto = productoProduccionPorEspecie(especie);
    const produccion = Math.max(0, Number(e.adultas || 0));
    if(producto && produccion > 0){
      producto.tienes = Number(producto.tienes || 0) + produccion;
    }

    especie.produccionCantidad = produccion;
    const unidad = especie.id === "gallinas" ? "huevos" : especie.id === "vacas" ? "leche" : "lana";
    especie.produccionTexto = `${produccion} ${unidad}/día`;

    resumen.push({
      nombre: especie.nombre,
      icon: especie.icon,
      produccion,
      productoIcon: especie.produccionIcon,
      criasAJovenes: nacenJovenes,
      jovenesAAdultas: pasanAdultas,
      adultasAViejas: pasanViejas
    });
  });
  return resumen;
}

function avanzarSiguienteDia(){
  partidaTemporal.dia = Number(partidaTemporal.dia || 1) + 1;

  const alquiler = Number(partidaTemporal.alquiler || 0);
  const multaSobrecapacidad = calcularCostoSobrecapacidadAlmacen();
  const cobroTotalDia = partidaTemporal.modoAdmin ? 0 : (alquiler + multaSobrecapacidad);

  if(cobroTotalDia > 0){
    partidaTemporal.dineroInicial = Number(Math.max(0, (partidaTemporal.dineroInicial || 0) - cobroTotalDia).toFixed(2));
  }

  const resumen = avanzarAnimalesDia();
  const resumenContratos = typeof avanzarContratosDia === "function" ? avanzarContratosDia() : null;
  actualizarPreciosDia();
  actualizarDashboard();
  actualizarHudMercado();
  actualizarHudCorrales();
  renderMercadoTrading();
  renderCorrales();
  if(document.querySelector('[data-screen="corral-detail"].active')) renderDetalleCorral(corralesV16.activo);
  const guardadoVisualOk = autoGuardarSiHaySlot({ visual:true });
  // PATCH 40.4: doble seguridad. Si el guardado ocurrió pero algún puente antiguo
  // bloquea el indicador, lo mostramos desde aquí también. La función limpia timers,
  // así que si ya se mostró no se duplica: solo reinicia la animación.
  if(guardadoVisualOk && typeof mostrarIndicadorGuardadoPremium === "function"){
    mostrarIndicadorGuardadoPremium();
  }

  const filas = resumen.map((item) => {
    const cambios = [];
    if(item.criasAJovenes) cambios.push(`${item.criasAJovenes} crías → jóvenes`);
    if(item.jovenesAAdultas) cambios.push(`${item.jovenesAAdultas} jóvenes → adultas`);
    if(item.adultasAViejas) cambios.push(`${item.adultasAViejas} adultas → viejas`);
    return `<div class="game-dialog-row"><span>${item.icon} ${item.nombre}</span><strong>${item.productoIcon} +${item.produccion}</strong><small>${cambios.join(" · ") || "Sin cambios de edad"}</small></div>`;
  }).join("");

  showGameNotice({
    title: `Día ${partidaTemporal.dia}`,
    icon: "🌅",
    tone: "success",
    message: `<p>Pasó un día en la granja.</p><div class="game-dialog-list">${filas}</div>${alquiler && !partidaTemporal.modoAdmin ? `<p>Alquiler cobrado: <strong>${formatoEuro(alquiler)}</strong></p>` : ""}${multaSobrecapacidad && !partidaTemporal.modoAdmin ? `<p class="storage-warning-text">⚠ Sobrecapacidad del almacén: <strong>${formatoEuro(multaSobrecapacidad)}</strong> cobrados por almacenamiento excedente.</p>` : ""}${typeof resumenContratosDiaHTML === "function" ? resumenContratosDiaHTML(resumenContratos) : ""}`
  });
}

function actualizarDashboard(){
  asegurarDatosMejoraAlmacen();
  const money = document.getElementById("hudMoney");
  const day = document.getElementById("hudDay");
  const storage = document.getElementById("hudStorage");

  const usadoAlmacen = calcularEspacioUsadoAlmacen();
  const totalAlmacen = Number(partidaTemporal.espacioTotal || 10);
  const excesoAlmacen = Math.max(0, usadoAlmacen - totalAlmacen);

  if(money) money.textContent = formatoEuro(partidaTemporal.dineroInicial || 0);
  if(day) day.textContent = `DÍA ${partidaTemporal.dia || 1}`;
  if(storage){
    storage.textContent = `${usadoAlmacen} / ${totalAlmacen}`;
    storage.classList.toggle("storage-over-capacity", excesoAlmacen > 0);
    storage.title = excesoAlmacen > 0
      ? `Sobrecapacidad: +${excesoAlmacen} espacio(s). Multa diaria: ${formatoEuro(calcularCostoSobrecapacidadAlmacen())}.`
      : "Almacén dentro de capacidad.";
  }
}
