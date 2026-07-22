// FARM LEGACY - Corrales, animales y matadero
const corralModalState = {
  tipo: "",
  especieId: ""
};

function totalAnimalesCorral(especie){
  const e = especie.edades;
  return (e.crias || 0) + (e.jovenes || 0) + (e.adultas || 0) + (e.viejas || 0);
}

function nivelVisualCorral(especie){
  // El nivel real puede seguir subiendo para capacidad/economía.
  // La imagen visual se queda en máximo 5 hasta que creemos más artes.
  return Math.min(5, Math.max(1, Number(especie?.nivel || 1)));
}

function etiquetaNivelVisualCorral(especie){
  const nivelReal = Math.max(1, Number(especie?.nivel || 1));
  return nivelReal > 5 ? "Nivel 5+" : `Nivel ${nivelReal}`;
}

function calcularNuevaCapacidadCorral(especie){
  const actual = Number(especie?.capacidad || 0);
  if(actual <= 0) return 10;

  // Progresión más fuerte que +10 fijo:
  // gallinas y ovejas crecen rápido, vacas crecen un poco más controladas por valor alto.
  const multiplicador = especie.id === "vacas" ? 1.55 : 1.65;
  const redondeo = especie.id === "vacas" ? 5 : 10;
  return Math.ceil((actual * multiplicador) / redondeo) * redondeo;
}

function getCorralImageSrc(especie){
  const tipo = especie?.id === "gallinas" ? "gallinas" : especie?.id === "vacas" ? "vacas" : "ovejas";
  return `assets/images/corrales/${tipo}_nivel_${nivelVisualCorral(especie)}.png`;
}

function renderCorralImage(especie, extraClass = ""){
  const alt = `${especie.nombre} nivel ${nivelVisualCorral(especie)}`;
  return `
    <div class="corral-image-placeholder corral-image-real ${especie.imagenClase} ${extraClass}">
      <img src="${getCorralImageSrc(especie)}" alt="${alt}">
      <em>${etiquetaNivelVisualCorral(especie)}</em>
    </div>`;
}

function actualizarHudCorrales(){
  const money = document.getElementById("corralsHudMoney");
  const day = document.getElementById("corralsHudDay");
  const detailMoney = document.getElementById("corralDetailMoney");
  if(money) money.textContent = formatoEuro(partidaTemporal.dineroInicial || 0);
  if(detailMoney) detailMoney.textContent = formatoEuro(partidaTemporal.dineroInicial || 0);
  if(day) day.textContent = `DÍA ${partidaTemporal.dia || 1}`;
}

function renderCorrales(){
  const contenedor = document.getElementById("corralsCards");
  if(!contenedor) return;
  actualizarHudCorrales();
  contenedor.innerHTML = corralesV16.especies.map((especie) => {
    const total = totalAnimalesCorral(especie);
    const capacidad = Math.max(1, Number(especie.capacidad || 1));
    const porcentaje = Math.min(100, Math.round((total / capacidad) * 100));
    const lleno = total >= especie.capacidad;
    const estadoClase = lleno ? "full" : porcentaje >= 80 ? "warning" : "ok";
    return `
      <article class="corral-card ${especie.imagenClase}">
        ${renderCorralImage(especie)}
        <div class="corral-card-body">
          <div class="corral-card-title">
            <div>
              <span class="panel-kicker">${especie.tipoLugar}</span>
              <h2>${especie.nombre}</h2>
              <p>${total} animales activos</p>
            </div>
            <strong class="corral-level">NIVEL ${especie.nivel}</strong>
          </div>

          <div class="corral-progress ${estadoClase}" style="--fill:${porcentaje}%">
            <span></span>
          </div>

          <div class="corral-card-stats-clean">
            <div>
              <span>Capacidad</span>
              <strong class="${lleno ? "capacity-full" : ""}">${total} / ${especie.capacidad}</strong>
            </div>
            <div>
              <span>Producción</span>
              <strong>${especie.produccionCantidad} / día</strong>
            </div>
            <div>
              <span>Precio animal</span>
              <strong>${formatoEuro(especie.precioCompra || 0)}</strong>
            </div>
            <div>
              <span>Etapas</span>
              <strong>${especie.edades.adultas || 0} adultas</strong>
            </div>
          </div>

          <button class="manage-corral-btn" data-action="manage-corral" data-corral="${especie.id}">GESTIONAR CORRAL</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderDetalleCorral(id){
  const especie = corralesV16.especies.find((item) => item.id === id) || corralesV16.especies[0];
  if(!especie) return;
  corralesV16.activo = especie.id;
  const total = totalAnimalesCorral(especie);

  actualizarHudCorrales();
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if(el) el.textContent = value;
  };

  setText("corralDetailKicker", especie.tipoLugar);
  setText("corralDetailTitle", especie.nombre);
  setText("corralDetailLevel", especie.nivel);
  setText("corralDetailCapacity", `${total} / ${especie.capacidad}`);
  setText("corralDetailProduction", `${especie.produccionCantidad} / día`);
  setText("detailBabies", especie.edades.crias);
  setText("detailYoung", especie.edades.jovenes);
  setText("detailAdult", especie.edades.adultas);
  setText("detailOld", especie.edades.viejas);

  const img = document.getElementById("corralDetailImage");
  if(img){
    img.className = `corral-image-placeholder corral-image-real large ${especie.imagenClase}`;
    img.innerHTML = `<img src="${getCorralImageSrc(especie)}" alt="${especie.nombre} nivel ${nivelVisualCorral(especie)}"><em>${etiquetaNivelVisualCorral(especie)}</em>`;
  }
}

function abrirCorrales(){
  renderCorrales();
  mostrarPantalla("corrales");
}

function abrirDetalleCorral(id){
  renderDetalleCorral(id);
  mostrarPantalla("corral-detail");
}

function productoMercadoPorId(id){
  return mercadoTrading.productos.find((p) => p.id === id);
}

function getEspecieActiva(){
  return corralesV16.especies.find((item) => item.id === corralesV16.activo) || corralesV16.especies[0];
}

function actualizarPrecioAnimal(especie){
  if(!especie.precioHistorial || !especie.precioHistorial.length){
    especie.precioHistorial = [especie.precioCompra || 1];
  }
  const ultimo = especie.precioHistorial[especie.precioHistorial.length - 1];
  const variacion = 0.88 + Math.random() * 0.24;
  const nuevo = Math.max(1, Number((ultimo * variacion).toFixed(2)));
  especie.precioCompra = nuevo;
  especie.precioHistorial.push(nuevo);
  if(especie.precioHistorial.length > 10) especie.precioHistorial.shift();
}


function calcularCostoMejoraCorral(especie){
  return Math.max(1, Math.round(Number(especie?.mejoraCosto || 100)));
}

function calcularSiguienteMejoraCorral(especie){
  const nivelActual = Math.max(1, Number(especie?.nivel || 1));
  const capacidadActual = Math.max(0, Number(especie?.capacidad || 0));
  const capacidadNueva = calcularNuevaCapacidadCorral(especie);
  const aumento = Math.max(0, capacidadNueva - capacidadActual);
  const costo = calcularCostoMejoraCorral(especie);
  const costoPorEspacio = aumento > 0 ? costo / aumento : costo;
  return { nivelActual, nivelNuevo:nivelActual + 1, capacidadActual, capacidadNueva, aumento, costo, costoPorEspacio };
}

function costoServicioMatadero(especie){
  if(especie.id === "gallinas") return 5;
  if(especie.id === "vacas") return 15;
  if(especie.id === "ovejas") return 5;
  return 5;
}

function calcularResultadoMatadero(especie, etapa, cantidad){
  const producto = getProductoCarneParaEspecie(especie);
  const rendimiento = rendimientoMatadero[etapa] || 1;
  const multiplicador = especie.id === "gallinas" ? 2 : 1;
  const unidades = Math.max(1, Math.floor(cantidad * rendimiento * multiplicador));
  const costo = costoServicioMatadero(especie) * cantidad;
  const valorMercado = producto ? producto.precio * unidades : 0;
  const gananciaEstimada = valorMercado - costo;
  return { producto, rendimiento, unidades, costo, valorMercado, gananciaEstimada };
}

function abrirModalCorral(tipo){
  const especie = getEspecieActiva();
  if(!especie) return;
  corralModalState.tipo = tipo;
  corralModalState.especieId = especie.id;

  const modal = document.getElementById("corralActionModal");
  const title = document.getElementById("corralModalTitle");
  const body = document.getElementById("corralModalBody");
  const confirm = document.getElementById("corralModalConfirm");
  if(!modal || !title || !body || !confirm) return;

  if(tipo === "comprar"){
    actualizarPrecioAnimal(especie);
    title.textContent = `Comprar ${especie.nombre}`;
    const total = totalAnimalesCorral(especie);
    const espacioLibre = Math.max(0, especie.capacidad - total);
    const minPrecio = Math.min(...especie.precioHistorial);
    const maxPrecio = Math.max(...especie.precioHistorial);
    const ultimo = especie.precioHistorial[especie.precioHistorial.length - 2] || especie.precioCompra;
    const cambio = ultimo ? (((especie.precioCompra - ultimo) / ultimo) * 100) : 0;
    const trendClass = cambio > 0.2 ? "trend-up" : cambio < -0.2 ? "trend-down" : "trend-flat";
    const trendText = cambio > 0.2 ? `Sube +${cambio.toFixed(1)}%` : cambio < -0.2 ? `Baja ${cambio.toFixed(1)}%` : "Estable 0%";

    body.innerHTML = `
      <div class="animal-buy-trading">
        <div class="animal-buy-hero">
          ${renderCorralImage(especie, "buy-preview")}
          <div class="animal-buy-pricebox">
            <span>Precio actual</span>
            <strong>${formatoEuro(especie.precioCompra)}</strong>
            <b class="${trendClass}">${trendText}</b>
          </div>
        </div>

        <div class="animal-chart-card">
          <div class="chart-topline">
            <strong>Historial de precio</strong>
            <span>Mín ${formatoEuro(minPrecio)} · Máx ${formatoEuro(maxPrecio)}</span>
          </div>
          <svg id="animalBuyPriceChart" class="market-price-chart animal-price-chart" viewBox="0 0 680 300" preserveAspectRatio="none"></svg>
        </div>

        <div class="animal-buy-stats">
          <div><span>Capacidad</span><strong>${total} / ${especie.capacidad}</strong></div>
          <div><span>Espacio libre</span><strong>${espacioLibre}</strong></div>
          <div><span>Dinero</span><strong>${formatoEuro(partidaTemporal.dineroInicial || 0)}</strong></div>
        </div>

        <label class="corral-modal-field animal-amount-field">Cantidad a comprar
          <input id="corralBuyAmount" type="number" min="1" max="${Math.max(1, espacioLibre)}" value="1" inputmode="numeric">
        </label>
        <p id="corralBuyPreview" class="corral-modal-preview rich-preview">Total: ${formatoEuro(especie.precioCompra)}</p>
      </div>`;
    confirm.textContent = "COMPRAR ANIMALES";
    confirm.className = "corral-modal-confirm buy";
    setTimeout(() => {
      dibujarGraficaAnimalCompra(especie);
      actualizarPreviewCompraAnimal();
    }, 0);
  }


  if(tipo === "mejora"){
    title.textContent = `Mejorar ${especie.tipoLugar} · ${especie.nombre}`;
    const datos = calcularSiguienteMejoraCorral(especie);
    const dinero = Number(partidaTemporal.dineroInicial || 0);
    const suficiente = dinero >= datos.costo;
    body.innerHTML = `
      <div class="upgrade-panel">
        <div class="upgrade-hero">
          ${renderCorralImage(especie, "upgrade-preview")}
          <div class="upgrade-summary ${suficiente ? "can-afford" : "cannot-afford"}">
            <span>Mejora disponible</span>
            <strong>Nivel ${datos.nivelActual} → ${datos.nivelNuevo}</strong>
            <p>${suficiente ? "Tienes dinero suficiente para esta mejora." : `Te faltan ${formatoEuro(datos.costo - dinero)} para mejorar.`}</p>
          </div>
        </div>

        <div class="upgrade-stats-grid">
          <div><span>Nivel actual</span><strong>${datos.nivelActual}</strong></div>
          <div><span>Nivel nuevo</span><strong>${datos.nivelNuevo}</strong></div>
          <div><span>Capacidad actual</span><strong>${datos.capacidadActual}</strong></div>
          <div><span>Nueva capacidad</span><strong>${datos.capacidadNueva}</strong></div>
          <div class="good"><span>Aumento</span><strong>+${datos.aumento}</strong></div>
          <div><span>Costo</span><strong>${formatoEuro(datos.costo)}</strong></div>
        </div>

        <div class="upgrade-economy-card">
          <span>Costo por espacio nuevo</span>
          <strong>${formatoEuro(datos.costoPorEspacio)}</strong>
          <p>Este dato ayuda a decidir si conviene invertir ahora o guardar dinero para comprar animales.</p>
        </div>
      </div>`;
    confirm.textContent = "CONFIRMAR MEJORA";
    confirm.className = "corral-modal-confirm upgrade";
  }

  if(tipo === "matadero"){
    title.textContent = `Matadero · ${especie.nombre}`;
    const producto = getProductoCarneParaEspecie(especie);
    const productoTxt = producto ? `${producto.icon} ${producto.nombre}` : "Producto pendiente";
    body.innerHTML = `
      <div class="slaughter-panel">
        <div class="slaughter-hero">
          ${renderCorralImage(especie, "slaughter-preview")}
          <div class="slaughter-warning">
            <strong>Decisión rápida</strong>
            <p>Sirve para obtener producto rápido, pero sacrificar crías o jóvenes rinde menos.</p>
          </div>
        </div>

        <div class="slaughter-yield-grid">
          <div><span>Cría</span><strong>25%</strong></div>
          <div><span>Joven</span><strong>60%</strong></div>
          <div><span>Adulta</span><strong>100%</strong></div>
          <div><span>Vieja</span><strong>80%</strong></div>
        </div>

        <div class="slaughter-form-grid">
          <label class="corral-modal-field">Etapa
            <select id="slaughterAge">
              <option value="crias">Crías · ${especie.edades.crias || 0} disponibles</option>
              <option value="jovenes">Jóvenes · ${especie.edades.jovenes || 0} disponibles</option>
              <option value="adultas" selected>Adultas · ${especie.edades.adultas || 0} disponibles</option>
              <option value="viejas">Viejas · ${especie.edades.viejas || 0} disponibles</option>
            </select>
          </label>
          <label class="corral-modal-field">Cantidad
            <input id="slaughterAmount" type="number" min="1" max="999" value="1" inputmode="numeric">
          </label>
        </div>

        <div class="slaughter-output-card">
          <span>Producto esperado</span>
          <strong>${productoTxt}</strong>
          <p id="slaughterPreview" class="corral-modal-preview rich-preview">Calculando...</p>
        </div>
      </div>`;
    confirm.textContent = "CONFIRMAR MATADERO";
    confirm.className = "corral-modal-confirm slaughter";
    setTimeout(() => actualizarPreviewMatadero(), 0);
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function cerrarModalCorral(){
  const modal = document.getElementById("corralActionModal");
  if(modal){
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
}

function leerEnteroPositivo(valor, fallback = 1){
  const n = Math.floor(Number(valor));
  if(!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(999, n);
}

function actualizarPreviewCompraAnimal(){
  const especie = getEspecieActiva();
  const input = document.getElementById("corralBuyAmount");
  const preview = document.getElementById("corralBuyPreview");
  if(!especie || !input || !preview) return;
  const cantidad = leerEnteroPositivo(input.value);
  const totalAnimales = totalAnimalesCorral(especie);
  const espacioLibre = Math.max(0, especie.capacidad - totalAnimales);
  const cantidadFinal = Math.min(cantidad, Math.max(1, espacioLibre));
  input.value = cantidadFinal;
  const total = especie.precioCompra * cantidadFinal;
  preview.innerHTML = `
    <span>Operación</span>
    <strong>${cantidadFinal} ${especie.nombre.toLowerCase()}</strong>
    <em>Total: ${formatoEuro(total)}</em>
  `;
}

function comprarAnimalActual(){
  const especie = getEspecieActiva();
  const input = document.getElementById("corralBuyAmount");
  if(!especie || !input) return;
  const cantidad = leerEnteroPositivo(input.value);
  const totalAnimales = totalAnimalesCorral(especie);
  const espacioLibre = especie.capacidad - totalAnimales;
  if(cantidad > espacioLibre){
    simpleNotice(`No tienes espacio suficiente. Espacio libre: ${espacioLibre}.`, "error");
    return;
  }
  const costo = especie.precioCompra * cantidad;
  if((partidaTemporal.dineroInicial || 0) < costo){
    simpleNotice("No tienes dinero suficiente para comprar esa cantidad.", "error");
    return;
  }
  partidaTemporal.dineroInicial = Number((partidaTemporal.dineroInicial - costo).toFixed(2));
  especie.edades.crias += cantidad;
  autoGuardarSiHaySlot();
  cerrarModalCorral();
  actualizarDashboard();
  renderDetalleCorral(especie.id);
}

const rendimientoMatadero = { crias: 0.25, jovenes: 0.60, adultas: 1, viejas: 0.80 };

function getProductoCarneParaEspecie(especie){
  if(especie.id === "gallinas") return productoMercadoPorId("carnePollo");
  if(especie.id === "vacas") return productoMercadoPorId("carneVaca");
  if(especie.id === "ovejas") return productoMercadoPorId("carneOveja");
  return null;
}

function actualizarPreviewMatadero(){
  const especie = getEspecieActiva();
  const age = document.getElementById("slaughterAge");
  const amount = document.getElementById("slaughterAmount");
  const preview = document.getElementById("slaughterPreview");
  if(!especie || !age || !amount || !preview) return;
  const etapa = age.value;
  const cantidad = leerEnteroPositivo(amount.value);
  amount.value = cantidad;
  const disponibles = especie.edades[etapa] || 0;
  const resultado = calcularResultadoMatadero(especie, etapa, cantidad);
  if(!resultado.producto){
    preview.innerHTML = `<strong>Pendiente</strong><em>Ese producto aún no está creado en mercado.</em>`;
    return;
  }
  const claseDisponibilidad = cantidad > disponibles ? "bad" : "good";
  const claseGanancia = resultado.gananciaEstimada >= 0 ? "good" : "bad";
  preview.innerHTML = `
    <span class="${claseDisponibilidad}">Disponibles: ${disponibles}</span>
    <div class="slaughter-preview-grid">
      <div><small>Animales</small><strong>${cantidad}</strong></div>
      <div><small>Rendimiento</small><strong>${Math.round(resultado.rendimiento * 100)}%</strong></div>
      <div><small>Producto</small><strong>${resultado.unidades} ${resultado.producto.nombre}</strong></div>
      <div><small>Costo servicio</small><strong>${formatoEuro(resultado.costo)}</strong></div>
      <div><small>Valor mercado</small><strong>${formatoEuro(resultado.valorMercado)}</strong></div>
      <div><small>Ganancia estimada</small><strong class="${claseGanancia}">${formatoEuro(resultado.gananciaEstimada)}</strong></div>
    </div>
    <em>El producto quedará en inventario del mercado para venderlo cuando el precio convenga.</em>
  `;
}

function confirmarMatadero(){
  const especie = getEspecieActiva();
  const age = document.getElementById("slaughterAge");
  const amount = document.getElementById("slaughterAmount");
  if(!especie || !age || !amount) return;
  const etapa = age.value;
  const cantidad = leerEnteroPositivo(amount.value);
  const disponibles = especie.edades[etapa] || 0;
  if(cantidad > disponibles){
    simpleNotice(`No tienes suficientes animales en esa etapa. Disponibles: ${disponibles}.`, "error");
    return;
  }
  const resultado = calcularResultadoMatadero(especie, etapa, cantidad);
  if(!resultado.producto){
    simpleNotice("Ese producto todavía no está creado en el mercado.", "error");
    return;
  }
  if((partidaTemporal.dineroInicial || 0) < resultado.costo){
    simpleNotice(`No tienes dinero suficiente para pagar el servicio. Costo: ${formatoEuro(resultado.costo)}.`, "error");
    return;
  }
  showGameConfirm({
    title: "Confirmar matadero",
    icon: "🔪",
    tone: "danger",
    confirmText: "Sí, procesar",
    cancelText: "Cancelar",
    message: `
      <p>¿Seguro que deseas sacrificar <strong>${cantidad} ${especie.nombre.toLowerCase()}</strong>?</p>
      <div class="game-dialog-summary">
        <span>Recibirás</span><strong>${resultado.unidades} ${resultado.producto.nombre}</strong>
        <span>Costo del servicio</span><strong>${formatoEuro(resultado.costo)}</strong>
      </div>`,
    onConfirm: () => {
      especie.edades[etapa] -= cantidad;
      partidaTemporal.dineroInicial = Number((partidaTemporal.dineroInicial - resultado.costo).toFixed(2));
      resultado.producto.tienes += resultado.unidades;
      autoGuardarSiHaySlot();
      cerrarModalCorral();
      actualizarDashboard();
      renderDetalleCorral(especie.id);
      showGameNotice({
        title: "Matadero completado",
        icon: "🥩",
        tone: "success",
        message: `<p>Recibiste <strong>${resultado.unidades} ${resultado.producto.nombre}</strong>.</p><p>Puedes venderlo en Mercado cuando el precio convenga.</p>`
      });
    }
  });
}

function mejorarCorralActual(){
  const especie = getEspecieActiva();
  if(!especie) return;
  const datos = calcularSiguienteMejoraCorral(especie);
  const dinero = Number(partidaTemporal.dineroInicial || 0);
  if(dinero < datos.costo){
    simpleNotice(`No tienes dinero suficiente. Te faltan ${formatoEuro(datos.costo - dinero)}.`, "error");
    return;
  }
  partidaTemporal.dineroInicial = Number((dinero - datos.costo).toFixed(2));
  especie.nivel = datos.nivelNuevo;
  especie.capacidad = datos.capacidadNueva;
  especie.mejoraCosto = Math.round(datos.costo * 1.75);
  autoGuardarSiHaySlot();
  actualizarDashboard();
  renderDetalleCorral(especie.id);
  cerrarModalCorral();
  showGameNotice({ title: "Corral mejorado", icon: "🏗️", tone: "success", message: `<p>${especie.tipoLugar} mejorado correctamente.</p><div class="game-dialog-summary"><strong>Nivel ${especie.nivel}</strong><strong>Nueva capacidad: ${especie.capacidad}</strong></div>` });
}

function confirmarAccionCorral(){
  if(corralModalState.tipo === "comprar") comprarAnimalActual();
  if(corralModalState.tipo === "matadero") confirmarMatadero();
  if(corralModalState.tipo === "mejora") mejorarCorralActual();
}
