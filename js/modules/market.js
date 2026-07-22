// FARM LEGACY - Mercado trading y gráficas
function calcularTendencia(producto){
  const h = producto.historial;
  if(!h || h.length < 2) return { clase:"trend-flat", texto:"➖ 0%", valor:0 };
  const anterior = h[h.length - 2];
  const actual = h[h.length - 1];
  const cambio = anterior === 0 ? 0 : ((actual - anterior) / anterior) * 100;
  if(cambio > 0.25) return { clase:"trend-up", texto:`📈 +${cambio.toFixed(1)}%`, valor:cambio };
  if(cambio < -0.25) return { clase:"trend-down", texto:`📉 ${cambio.toFixed(1)}%`, valor:cambio };
  return { clase:"trend-flat", texto:"➖ 0%", valor:cambio };
}

function porcentajeDemandaMercado(info){
  if(!info || !info.demanda) return 0;
  return Math.max(0, Math.min(135, Math.round((Number(info.vendido || 0) / Number(info.demanda || 1)) * 100)));
}

function textoBalanceMercado(info){
  if(!info) return "Demanda sin datos";
  if(info.estado === "saturado") return "Exceso de oferta";
  if(info.estado === "escasez") return "Falta producto";
  if(info.estado === "oportunidad") return "Buena oportunidad";
  if(info.estado === "sinActividad") return "Sin actividad";
  return "Zona sana";
}

const MERCADO_CATEGORIAS_UI = [
  { id:"todos", label:"Todos" },
  { id:"basicos", label:"Básicos" },
  { id:"lacteos", label:"Lácteos" },
  { id:"carnicos", label:"Cárnicos" },
  { id:"elaborados", label:"Elaborados" },
  { id:"conservas", label:"Conservas" },
  { id:"cultivos", label:"Cultivos" }
];

let mercadoCategoriaActiva = "todos";

function categoriaMercadoFiltro(producto){
  const def = typeof getProductoDef === "function" ? getProductoDef(producto.id) : null;
  const id = String(producto.id || "").toLowerCase();
  const cat = String(def?.categoria || producto.categoria || "").toLowerCase();

  if(["leche", "queso", "mantequilla", "yogur", "yogurt", "crema"].includes(id) || ["lacteo", "lacteos"].includes(cat)) return "lacteos";
  if(["carne", "carne_procesada", "carnico", "carnicos"].includes(cat) || id.includes("carne")) return "carnicos";
  if(["enlatado", "enlatados", "conserva", "conservas"].includes(cat)) return "conservas";
  if(["cultivo", "cultivos", "agricola", "agricolas", "cereal", "cereales", "fruta", "frutas", "verdura", "verduras"].includes(cat)) return "cultivos";
  if(["procesado", "procesados", "elaborado", "elaborados"].includes(cat)) return "elaborados";
  return "basicos";
}

function nombreCategoriaMercado(producto){
  const mapa = {
    basicos:"Básico",
    lacteos:"Lácteo",
    carnicos:"Cárnico",
    elaborados:"Elaborado",
    conservas:"Conserva",
    cultivos:"Cultivo"
  };
  return mapa[categoriaMercadoFiltro(producto)] || "Producto";
}

function renderCategoriasMercado(){
  const barra = document.getElementById("marketCategoryBar");
  if(!barra) return;

  const conteos = mercadoTrading.productos.reduce((acc, producto) => {
    const categoria = categoriaMercadoFiltro(producto);
    acc[categoria] = (acc[categoria] || 0) + 1;
    return acc;
  }, {});

  const categoriasVisibles = MERCADO_CATEGORIAS_UI.filter((categoria) => categoria.id === "todos" || (conteos[categoria.id] || 0) > 0);

  if(!categoriasVisibles.some((categoria) => categoria.id === mercadoCategoriaActiva)){
    mercadoCategoriaActiva = "todos";
  }

  barra.innerHTML = categoriasVisibles.map((categoria) => {
    const cantidad = categoria.id === "todos" ? mercadoTrading.productos.length : (conteos[categoria.id] || 0);
    return `
      <button class="market-category-tab ${mercadoCategoriaActiva === categoria.id ? "active" : ""}"
              data-action="filter-market-category"
              data-category="${categoria.id}"
              aria-pressed="${mercadoCategoriaActiva === categoria.id}">
        <span>${categoria.label}</span>
        <strong>${cantidad}</strong>
      </button>
    `;
  }).join("");
}

function actualizarHudMercado(){
  const money = document.getElementById("marketHudMoney");
  const day = document.getElementById("marketHudDay");
  if(money) money.textContent = formatoEuro(partidaTemporal.dineroInicial || 0);
  if(day) day.textContent = `DÍA ${partidaTemporal.dia || 1}`;
}

function renderMercadoTrading(){
  if(typeof asegurarProductosBaseMercado === "function") asegurarProductosBaseMercado();
  const lista = document.getElementById("marketProductList");
  if(!lista) return;

  actualizarHudMercado();
  const globalTrend = document.getElementById("marketGlobalTrend");
  if(globalTrend && typeof resumenMercadoGlobal === "function") globalTrend.textContent = resumenMercadoGlobal(mercadoTrading.productos);

  renderCategoriasMercado();
  const productosVisibles = mercadoCategoriaActiva === "todos"
    ? mercadoTrading.productos
    : mercadoTrading.productos.filter((producto) => categoriaMercadoFiltro(producto) === mercadoCategoriaActiva);

  lista.innerHTML = productosVisibles.map((producto) => {
    if(typeof inicializarEconomiaProducto === "function") inicializarEconomiaProducto(producto);
    const tendencia = calcularTendencia(producto);
    const precioVenta = typeof getPrecioVentaMercadoProducto === "function" ? getPrecioVentaMercadoProducto(producto) : Number(producto.precio || 0);
    const precioCompra = typeof getPrecioCompraMercadoProducto === "function" ? getPrecioCompraMercadoProducto(producto) : Number((precioVenta * 1.35).toFixed(2));
    return `
      <article class="market-product-row market-product-card market-product-card-clean market-product-row-compact" data-product="${producto.id}">
        <button class="market-product-open" data-action="open-market-product" data-product="${producto.id}" aria-label="Abrir ${producto.nombre}">
          <span class="market-product-main">
            <span class="market-product-icon">${producto.icon}</span>
            <span class="market-product-copy">
              <span class="market-product-category">${nombreCategoriaMercado(producto)}</span>
              <span class="market-product-name">${producto.nombre}</span>
              <span class="market-card-hint">Toca para ver demanda, gráfica y detalles</span>
            </span>
          </span>
        </button>

        <div class="market-price-stack market-price-ticket" aria-label="Precio de ${producto.nombre}">
          <div class="price-ticket-row price-ticket-sell">
            <span>Vendes</span>
            <strong class="market-product-price">${formatoEuro(precioVenta)}</strong>
          </div>
          <div class="price-ticket-row price-ticket-buy">
            <span>Compras</span>
            <strong class="market-buy-price">${formatoEuro(precioCompra)}</strong>
          </div>
          <em class="market-product-trend ${tendencia.clase}">${tendencia.texto}</em>
        </div>

        <div class="market-owned-stack">
          <span class="market-label-small">Inventario</span>
          <strong class="market-product-owned">${producto.tienes}</strong>
          <small>${producto.tienes > 0 ? 'Listo para vender' : 'Sin stock'}</small>
        </div>

        <div class="quick-trade-controls">
          <div class="quick-trade-topline">
            <span class="market-label-small">Cantidad</span>
            <input class="quick-trade-input" type="number" min="1" max="999" value="1" inputmode="numeric" data-quick-amount="${producto.id}" aria-label="Cantidad para ${producto.nombre}">
          </div>
          <div class="quick-trade-buttons">
            <button class="quick-trade-btn buy" data-action="quick-market-buy" data-product="${producto.id}">Comprar</button>
            <button class="quick-trade-btn sell" data-action="quick-market-sell" data-product="${producto.id}">Vender</button>
            <button class="quick-trade-btn sell-all" data-action="quick-market-sell-all" data-product="${producto.id}" title="Cargar toda la cantidad disponible">Todo</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  if(!productosVisibles.length){
    lista.innerHTML = `
      <div class="market-empty-category">
        <strong>No hay productos en esta categoría todavía.</strong>
        <span>Cuando agreguemos nuevos productos aparecerán aquí automáticamente.</span>
      </div>
    `;
  }
}

function dibujarGraficaMercado(producto){
  const svg = document.getElementById("marketPriceChart");
  if(!svg) return;

  const valores = producto.historial;
  const ancho = 680;
  const alto = 300;
  const padLeft = 78;
  const padRight = 28;
  const padTop = 28;
  const padBottom = 46;
  const minReal = Math.min(...valores);
  const maxReal = Math.max(...valores);
  const margen = Math.max((maxReal - minReal) * 0.18, maxReal * 0.03, 0.05);
  const min = Math.max(0, minReal - margen);
  const max = maxReal + margen;
  const rango = max - min || 1;
  const chartW = ancho - padLeft - padRight;
  const chartH = alto - padTop - padBottom;

  const puntos = valores.map((valor, i) => {
    const x = padLeft + (i * (chartW / (valores.length - 1 || 1)));
    const y = padTop + chartH - ((valor - min) / rango) * chartH;
    return { x, y, valor };
  });

  const linea = puntos.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${padLeft},${padTop+chartH} ${linea} ${padLeft+chartW},${padTop+chartH}`;
  const ejeY = [0,1,2,3,4].map((n) => {
    const ratio = n / 4;
    const valor = max - (rango * ratio);
    const y = padTop + (chartH * ratio);
    return `
      <line class="chart-grid-line" x1="${padLeft}" y1="${y}" x2="${padLeft+chartW}" y2="${y}"/>
      <text class="chart-axis-label y" x="${padLeft-12}" y="${y+5}" text-anchor="end">${formatoEuro(valor)}</text>
    `;
  }).join("");
  const ejeX = puntos.map((p, i) => `
    <line class="chart-tick" x1="${p.x}" y1="${padTop+chartH}" x2="${p.x}" y2="${padTop+chartH+6}"/>
    <text class="chart-axis-label x" x="${p.x}" y="${alto-14}" text-anchor="middle">D${i+1}</text>
  `).join("");
  const dots = puntos.map((p, i) => `<circle class="chart-dot" cx="${p.x}" cy="${p.y}" r="6"><title>Día ${i+1}: ${formatoEuro(p.valor)}</title></circle>`).join("");

  svg.innerHTML = `
    <line class="chart-axis" x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop+chartH}"/>
    <line class="chart-axis" x1="${padLeft}" y1="${padTop+chartH}" x2="${padLeft+chartW}" y2="${padTop+chartH}"/>
    ${ejeY}
    ${ejeX}
    <polygon class="chart-area" points="${area}"></polygon>
    <polyline class="chart-line" points="${linea}"></polyline>
    ${dots}
  `;
}
function dibujarGraficaAnimalCompra(especie){
  const svg = document.getElementById("animalBuyPriceChart");
  if(!svg || !especie?.precioHistorial?.length) return;

  const valores = especie.precioHistorial;
  const ancho = 680;
  const alto = 300;
  const padLeft = 78;
  const padRight = 28;
  const padTop = 28;
  const padBottom = 46;
  const minReal = Math.min(...valores);
  const maxReal = Math.max(...valores);
  const margen = Math.max((maxReal - minReal) * 0.18, maxReal * 0.03, 0.05);
  const min = Math.max(0, minReal - margen);
  const max = maxReal + margen;
  const rango = max - min || 1;
  const chartW = ancho - padLeft - padRight;
  const chartH = alto - padTop - padBottom;

  const puntos = valores.map((valor, i) => {
    const x = padLeft + (i * (chartW / (valores.length - 1 || 1)));
    const y = padTop + chartH - ((valor - min) / rango) * chartH;
    return { x, y, valor };
  });

  const linea = puntos.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${padLeft},${padTop+chartH} ${linea} ${padLeft+chartW},${padTop+chartH}`;
  const ejeY = [0,1,2,3,4].map((n) => {
    const ratio = n / 4;
    const valor = max - (rango * ratio);
    const y = padTop + (chartH * ratio);
    return `
      <line class="chart-grid-line" x1="${padLeft}" y1="${y}" x2="${padLeft+chartW}" y2="${y}"/>
      <text class="chart-axis-label y" x="${padLeft-12}" y="${y+5}" text-anchor="end">${formatoEuro(valor)}</text>
    `;
  }).join("");
  const ejeX = puntos.map((p, i) => `
    <line class="chart-tick" x1="${p.x}" y1="${padTop+chartH}" x2="${p.x}" y2="${padTop+chartH+6}"/>
    <text class="chart-axis-label x" x="${p.x}" y="${alto-14}" text-anchor="middle">D${i+1}</text>
  `).join("");
  const dots = puntos.map((p, i) => `<circle class="chart-dot" cx="${p.x}" cy="${p.y}" r="6"><title>Día ${i+1}: ${formatoEuro(p.valor)}</title></circle>`).join("");

  svg.innerHTML = `
    <line class="chart-axis" x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop+chartH}"/>
    <line class="chart-axis" x1="${padLeft}" y1="${padTop+chartH}" x2="${padLeft+chartW}" y2="${padTop+chartH}"/>
    ${ejeY}
    ${ejeX}
    <polygon class="chart-area animal-chart-area" points="${area}"></polygon>
    <polyline class="chart-line animal-chart-line" points="${linea}"></polyline>
    ${dots}
  `;
}


function leerCantidadMercado(valor, fallback = 1){
  const numero = Math.floor(Number(valor));
  if(!Number.isFinite(numero) || numero < 1) return fallback;
  return Math.min(999, numero);
}

function actualizarPreviewTrade(){
  const producto = mercadoTrading.productoActivo;
  if(!producto) return;
  const amount = document.getElementById("tradeAmount");
  const txt = document.getElementById("tradePreviewText");
  const val = document.getElementById("tradePreviewValue");
  if(amount) amount.value = mercadoTrading.cantidad;
  const precioVenta = typeof getPrecioVentaMercadoProducto === "function" ? getPrecioVentaMercadoProducto(producto) : Number(producto.precio || 0);
  const precioCompra = typeof getPrecioCompraMercadoProducto === "function" ? getPrecioCompraMercadoProducto(producto) : Number((precioVenta * 1.35).toFixed(2));
  if(txt) txt.textContent = `Cantidad: ${mercadoTrading.cantidad} unidad${mercadoTrading.cantidad === 1 ? "" : "es"}`;
  if(val) val.innerHTML = `Comprar: ${formatoEuro(precioCompra * mercadoTrading.cantidad)} · Vender: ${formatoEuro(precioVenta * mercadoTrading.cantidad)}`;
}

function abrirProductoMercado(id){
  const producto = mercadoTrading.productos.find((p) => p.id === id);
  if(!producto) return;

  if(typeof inicializarEconomiaProducto === "function") inicializarEconomiaProducto(producto);
  mercadoTrading.productoActivo = producto;
  mercadoTrading.cantidad = 1;
  const tendencia = calcularTendencia(producto);
  const demanda = typeof getMercadoInfoProducto === "function" ? getMercadoInfoProducto(producto) : null;
  const min = Math.min(...producto.historial);
  const max = Math.max(...producto.historial);

  document.getElementById("modalProductIcon").textContent = producto.icon;
  document.getElementById("modalProductName").textContent = producto.nombre;
  const precioVenta = typeof getPrecioVentaMercadoProducto === "function" ? getPrecioVentaMercadoProducto(producto) : Number(producto.precio || 0);
  const precioCompra = typeof getPrecioCompraMercadoProducto === "function" ? getPrecioCompraMercadoProducto(producto) : Number((precioVenta * 1.35).toFixed(2));
  document.getElementById("modalProductPrice").textContent = `${formatoEuro(precioVenta)} venta / ${formatoEuro(precioCompra)} compra`;
  const trend = document.getElementById("modalProductTrend");
  if(trend){ trend.textContent = tendencia.texto; trend.className = tendencia.clase; }
  document.getElementById("modalMinPrice").textContent = formatoEuro(min);
  document.getElementById("modalMaxPrice").textContent = formatoEuro(max);
  document.getElementById("modalOwnedQty").textContent = producto.tienes;
  document.getElementById("modalOwnedValue").textContent = formatoEuro(producto.tienes * producto.precio);
  const demandBox = document.getElementById("modalDemandInfo");
  if(demandBox && demanda){
    const demandaPct = porcentajeDemandaMercado(demanda);
    demandBox.innerHTML = `
      <div class="modal-demand-heading">
        <h3 class="modal-demand-title">Demanda del día</h3>
        <div class="market-info-wrap">
          <button class="market-info-dot" type="button" aria-label="Información sobre demanda">i</button>
          <div class="market-info-tooltip" role="tooltip">
            <strong>Cómo leer la demanda</strong>
            <p><b>Demanda diaria:</b> unidades que el mercado puede absorber hoy.</p>
            <p><b>Vendido hoy:</b> cantidad ya colocada durante el día actual.</p>
            <p><b>Restante:</b> margen aproximado antes de cubrir la demanda.</p>
            <p><b>Cobertura:</b> porcentaje de la demanda diaria que ya fue atendida.</p>
            <p><b>Estado:</b> resume si hay oportunidad, escasez, equilibrio o saturación.</p>
            <em>La demanda cambia con los días y puede afectar la conveniencia de vender, guardar o comprar.</em>
          </div>
        </div>
      </div>
      <div><span>Demanda diaria</span><strong>${demanda.demanda}</strong></div>
      <div><span>Vendido hoy</span><strong>${demanda.vendido}</strong></div>
      <div><span>Restante</span><strong>${demanda.restante}</strong></div>
      <div><span>Estado</span><strong class="${demanda.clase}">${demanda.texto}</strong></div>
      <div class="modal-demand-wide">
        <span>Cobertura del mercado</span>
        <strong>${demandaPct}%</strong>
        <div class="market-demand-bar"><span class="market-demand-fill ${demanda.clase}" style="width:${Math.min(100, demandaPct)}%"></span></div>
      </div>
    `;
  }

  dibujarGraficaMercado(producto);
  actualizarPreviewTrade();

  const modal = document.getElementById("marketModal");
  if(modal){
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  }
}

function cerrarModalMercado(){
  const modal = document.getElementById("marketModal");
  if(modal){
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
}

function operarMercado(tipo, abrirPopupDespues = true){
  const producto = mercadoTrading.productoActivo;
  if(!producto) return;
  const precioUnitario = tipo === "comprar"
    ? (typeof getPrecioCompraMercadoProducto === "function" ? getPrecioCompraMercadoProducto(producto) : Number((producto.precio || 0) * 1.35))
    : (typeof getPrecioVentaMercadoProducto === "function" ? getPrecioVentaMercadoProducto(producto) : Number(producto.precio || 0));
  const total = Number((precioUnitario * mercadoTrading.cantidad).toFixed(2));

  if(tipo === "comprar"){
    if((partidaTemporal.dineroInicial || 0) < total){
      simpleNotice("No tienes dinero suficiente para comprar esa cantidad.", "error");
      return;
    }
    partidaTemporal.dineroInicial = Number((partidaTemporal.dineroInicial - total).toFixed(2));
    producto.tienes += mercadoTrading.cantidad;
  }

  if(tipo === "vender"){
    if(producto.tienes < mercadoTrading.cantidad){
      simpleNotice("No tienes suficientes unidades para vender.", "error");
      return;
    }
    partidaTemporal.dineroInicial = Number((partidaTemporal.dineroInicial + total).toFixed(2));
    producto.tienes -= mercadoTrading.cantidad;
    if(typeof registrarVentaMercado === "function") registrarVentaMercado(producto, mercadoTrading.cantidad);
  }

  actualizarDashboard();
  autoGuardarSiHaySlot();
  renderMercadoTrading();

  if(abrirPopupDespues){
    abrirProductoMercado(producto.id);
  } else {
    cerrarModalMercado();
  }
}

function operarMercadoRapido(id, tipo){
  const producto = mercadoTrading.productos.find((p) => p.id === id);
  if(!producto) return;
  const input = document.querySelector(`[data-quick-amount="${id}"]`);
  mercadoTrading.productoActivo = producto;
  mercadoTrading.cantidad = leerCantidadMercado(input?.value || 1);
  if(input) input.value = mercadoTrading.cantidad;
  operarMercado(tipo, false);
}

function prepararVenderTodoMercadoRapido(id){
  const producto = mercadoTrading.productos.find((p) => p.id === id);
  if(!producto) return;

  const input = document.querySelector(`[data-quick-amount="${id}"]`);
  const cantidad = Math.min(999, Math.max(0, Number(producto.tienes || 0)));
  if(input) input.value = cantidad;
}

function venderTodoMercadoRapido(id, abrirPopupDespues = false){
  const producto = mercadoTrading.productos.find((p) => p.id === id);
  if(!producto) return;
  if((producto.tienes || 0) <= 0){
    simpleNotice("No tienes unidades para vender de este producto.", "warning");
    return;
  }

  const input = document.querySelector(`[data-quick-amount="${id}"]`);
  mercadoTrading.productoActivo = producto;
  mercadoTrading.cantidad = Math.min(999, Number(producto.tienes || 0));
  if(input) input.value = mercadoTrading.cantidad;
  operarMercado("vender", abrirPopupDespues);
}
