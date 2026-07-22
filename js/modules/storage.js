// FARM LEGACY - Almacén V2/V3

// =========================
// ALMACEN V2 - LOTES + SOBRECAPACIDAD
// =========================
// El almacén ya no usa 1 producto = 1 espacio.
// Ahora calcula espacios por lotes y permite sobrecapacidad con multa diaria.
const ALMACEN_LOTES = {};
// Patch 34: las reglas reales de lotes viven en PRODUCTOS_CATALOGO.
// Se mantiene ALMACEN_LOTES vacío solo por compatibilidad con parches viejos.

function getReglaLoteProducto(productoId){
  if(typeof getProductoLoteAlmacen === "function"){
    return getProductoLoteAlmacen(productoId);
  }
  return ALMACEN_LOTES[productoId] || 1;
}

function espaciosProducto(producto){
  const cantidad = Math.max(0, Number(producto?.tienes || 0));
  if(cantidad <= 0) return 0;
  return Math.ceil(cantidad / getReglaLoteProducto(producto.id));
}

function calcularEspacioUsadoAlmacen(){
  return mercadoTrading.productos.reduce((total, producto) => total + espaciosProducto(producto), 0);
}

function calcularSobrecapacidadAlmacen(){
  const usado = calcularEspacioUsadoAlmacen();
  const total = Number(partidaTemporal.espacioTotal || 10);
  return Math.max(0, usado - total);
}

function calcularCostoSobrecapacidadAlmacen(){
  const exceso = calcularSobrecapacidadAlmacen();
  let costo = 0;
  for(let i = 1; i <= exceso; i++){
    if(i <= 2) costo += 2;
    else if(i <= 5) costo += 4;
    else costo += 8;
  }
  return costo;
}

function porcentajeUsoAlmacen(){
  const usado = calcularEspacioUsadoAlmacen();
  const total = Number(partidaTemporal.espacioTotal || 10);
  if(total <= 0) return 0;
  return Math.min(140, Math.round((usado / total) * 100));
}


// =========================
// ALMACÉN V3 - MEJORAS PREMIUM
// =========================
// Regla de diseño: la ventana principal del almacén se mantiene limpia.
// El botón abre un popup aparte con detalles de la mejora.
function asegurarDatosMejoraAlmacen(){
  partidaTemporal.almacenNivel = Math.max(1, Math.floor(Number(partidaTemporal.almacenNivel || 1)));
  partidaTemporal.almacenCostoMejora = Math.max(1, Math.round(Number(partidaTemporal.almacenCostoMejora || 80)));
}

function aumentoMejoraAlmacen(nivelActual = partidaTemporal.almacenNivel){
  // Progresión elegida: Nivel 1 +5, Nivel 2 +10, Nivel 3 +15...
  const nivel = Math.max(1, Math.floor(Number(nivelActual || 1)));
  return nivel * 5;
}

function calcularSiguienteMejoraAlmacen(){
  asegurarDatosMejoraAlmacen();
  const nivelActual = Number(partidaTemporal.almacenNivel || 1);
  const capacidadActual = Number(partidaTemporal.espacioTotal || 10);
  const aumento = aumentoMejoraAlmacen(nivelActual);
  const capacidadNueva = capacidadActual + aumento;
  const costo = Math.max(1, Math.round(Number(partidaTemporal.almacenCostoMejora || 80)));
  const costoPorEspacio = aumento > 0 ? costo / aumento : costo;
  return {
    nivelActual,
    nivelNuevo: nivelActual + 1,
    capacidadActual,
    capacidadNueva,
    aumento,
    costo,
    costoPorEspacio
  };
}

function resumenMejoraAlmacenHTML(){
  const datos = calcularSiguienteMejoraAlmacen();
  const dinero = Number(partidaTemporal.dineroInicial || 0);
  const suficiente = dinero >= datos.costo;
  const usado = calcularEspacioUsadoAlmacen();
  const excesoActual = Math.max(0, usado - datos.capacidadActual);
  const excesoNuevo = Math.max(0, usado - datos.capacidadNueva);

  return `
    <div class="storage-upgrade-panel ${suficiente ? 'can-afford' : 'cannot-afford'}">
      <div class="storage-upgrade-hero">
        <div>
          <span class="storage-kicker">AMPLIACIÓN DE ALMACÉN</span>
          <h3>📦 Nivel ${datos.nivelActual} → ${datos.nivelNuevo}</h3>
          <p>${suficiente
            ? 'Tienes dinero suficiente para ampliar el almacén.'
            : `Te faltan <b>${formatoEuro(datos.costo - dinero)}</b> para hacer esta mejora.`}</p>
        </div>
        <div class="storage-upgrade-seal">
          <strong>+${datos.aumento}</strong>
          <small>espacios</small>
        </div>
      </div>

      <div class="storage-upgrade-grid">
        <div><span>Capacidad actual</span><strong>${datos.capacidadActual}</strong></div>
        <div><span>Nueva capacidad</span><strong>${datos.capacidadNueva}</strong></div>
        <div><span>Espacios ganados</span><strong>+${datos.aumento}</strong></div>
        <div><span>Costo</span><strong>${formatoEuro(datos.costo)}</strong></div>
        <div><span>Dinero actual</span><strong>${formatoEuro(dinero)}</strong></div>
        <div><span>Costo por espacio</span><strong>${formatoEuro(datos.costoPorEspacio)}</strong></div>
      </div>

      <div class="storage-upgrade-note">
        <strong>Beneficio</strong>
        <span>${excesoActual > 0
          ? `Ahora tienes +${excesoActual} espacios de exceso. Después de mejorar quedarías con +${excesoNuevo} de exceso.`
          : 'Aumenta tu capacidad y reduce el riesgo de pagar multas por sobrecapacidad al pasar el día.'}</span>
      </div>
    </div>
  `;
}

function abrirPopupMejoraAlmacen(){
  showGameConfirm({
    title: 'Mejorar Almacén',
    icon: '📦',
    tone: 'info',
    confirmText: 'MEJORAR',
    cancelText: 'CANCELAR',
    message: resumenMejoraAlmacenHTML(),
    onConfirm: confirmarMejoraAlmacen
  });
}

function confirmarMejoraAlmacen(){
  const datos = calcularSiguienteMejoraAlmacen();
  const dinero = Number(partidaTemporal.dineroInicial || 0);
  if(dinero < datos.costo){
    simpleNotice(`No tienes dinero suficiente. Te faltan ${formatoEuro(datos.costo - dinero)}.`, 'error');
    return;
  }

  partidaTemporal.dineroInicial = Number((dinero - datos.costo).toFixed(2));
  partidaTemporal.almacenNivel = datos.nivelNuevo;
  partidaTemporal.espacioTotal = datos.capacidadNueva;
  partidaTemporal.almacenCostoMejora = Math.max(1, Math.round(datos.costo * 1.6));

  actualizarDashboard();
  guardarPartidaForzadaSilenciosa();

  showGameNotice({
    title: 'Almacén mejorado',
    icon: '📦',
    tone: 'success',
    message: `<p>El almacén subió a <strong>Nivel ${partidaTemporal.almacenNivel}</strong>.</p><div class="game-dialog-summary"><span>Capacidad nueva</span><strong>${partidaTemporal.espacioTotal} espacios</strong><span>Próxima mejora</span><strong>${formatoEuro(partidaTemporal.almacenCostoMejora)}</strong></div><p>Recuerda: el guardado permanente ocurre al pasar el día.</p>`
  });
}

function resumenAlmacenHTML(){
  asegurarDatosMejoraAlmacen();
  const usado = calcularEspacioUsadoAlmacen();
  const total = Number(partidaTemporal.espacioTotal || 10);
  const exceso = Math.max(0, usado - total);
  const libre = Math.max(0, total - usado);
  const multa = calcularCostoSobrecapacidadAlmacen();
  const porcentaje = porcentajeUsoAlmacen();
  const nivel = Number(partidaTemporal.almacenNivel || 1);
  const mejoraEspacios = aumentoMejoraAlmacen();
  const mejoraCosto = Number(partidaTemporal.almacenCostoMejora || 80);
  const estadoTexto = exceso > 0 ? "SOBRECAPACIDAD" : (porcentaje >= 80 ? "CASI LLENO" : "ESTABLE");
  const estadoClase = exceso > 0 ? "danger" : (porcentaje >= 80 ? "warning" : "ok");

  const filas = mercadoTrading.productos
    .filter((producto) => Number(producto.tienes || 0) > 0)
    .map((producto) => {
      const lote = getReglaLoteProducto(producto.id);
      const espacios = espaciosProducto(producto);
      const cantidad = Math.max(0, Number(producto.tienes || 0));
      const valor = Number(producto.precio || 0) * cantidad;
      return `
        <article class="storage-item-card">
          <div class="storage-item-icon">${producto.icon}</div>
          <div class="storage-item-main">
            <div class="storage-item-name">${producto.nombre}</div>
            <div class="storage-item-rule">${lote} unidad(es) ocupan 1 espacio</div>
          </div>
          <div class="storage-item-numbers">
            <strong>${cantidad}</strong>
            <span>${espacios} esp.</span>
            <em>${formatoEuro(valor)}</em>
          </div>
        </article>`;
    }).join("") || `
      <div class="storage-empty-state">
        <strong>Almacén vacío</strong>
        <span>Recolecta productos o compra en el mercado para empezar a llenarlo.</span>
      </div>`;

  return `
    <div class="storage-panel-v2 storage-panel-44-29 ${estadoClase}">
      <header class="storage-hero storage-hero-44-29">
        <div class="storage-hero-copy">
          <span class="storage-kicker">GESTIÓN DE INVENTARIO</span>
          <div class="storage-title-row">
            <h3>Almacén nivel ${nivel}</h3>
            <span class="storage-status-pill ${estadoClase}">${estadoTexto}</span>
          </div>
          <p>${exceso > 0
            ? "Has superado la capacidad disponible. Puedes seguir almacenando, pero pagarás una multa al avanzar el día."
            : porcentaje >= 80
              ? "Tu almacén se está llenando. Conviene vender, procesar productos o ampliar pronto."
              : "Tu inventario está bajo control y todavía tienes espacio para seguir produciendo."}</p>
        </div>

        <div class="storage-capacity-summary" aria-label="Capacidad del almacén">
          <div class="storage-capacity-number"><strong>${usado}</strong><span>/ ${total}</span></div>
          <small>espacios usados</small>
        </div>
      </header>

      <section class="storage-meter-wrap storage-meter-wrap-44-29">
        <div class="storage-meter-labels">
          <span>Ocupación actual</span>
          <strong>${porcentaje}%</strong>
        </div>
        <div class="storage-meter"><div style="width:${Math.min(100, porcentaje)}%"></div></div>
      </section>

      <section class="storage-stat-grid storage-stat-grid-44-29">
        <div class="storage-stat-card">
          <span>Disponible</span>
          <strong>${libre} esp.</strong>
        </div>

        <div class="storage-stat-card storage-tooltip-card">
          <span class="storage-stat-label-with-info">
            Sobrecapacidad
            <span class="storage-info-dot" tabindex="0" aria-label="Información sobre sobrecapacidad">i</span>
            <span class="storage-info-tooltip">
              <strong>Multa por sobrecapacidad</strong>
              <small>Puedes superar el límite, pero cada espacio extra aumenta el cobro diario al pasar de día.</small>
              <small><b>1-2 extra:</b> 2 € cada uno</small>
              <small><b>3-5 extra:</b> 4 € cada uno</small>
              <small><b>6 o más:</b> 8 € cada uno</small>
            </span>
          </span>
          <strong>${exceso > 0 ? '+' + exceso + ' esp.' : '0'}</strong>
        </div>

        <div class="storage-stat-card ${exceso > 0 ? 'danger' : ''}">
          <span>Multa al pasar día</span>
          <strong>${formatoEuro(multa)}</strong>
        </div>
      </section>

      ${exceso > 0 ? `
        <div class="storage-alert-box storage-alert-44-29">
          <strong>Atención</strong>
          <span>Si avanzas de día ahora pagarás <b>${formatoEuro(multa)}</b>. Vende productos o amplía el almacén para reducir el exceso.</span>
        </div>` : ""}

      <section class="storage-upgrade-entry storage-upgrade-entry-44-29">
        <div class="storage-upgrade-copy">
          <span class="storage-upgrade-kicker">Próxima ampliación</span>
          <strong>Nivel ${nivel} → ${nivel + 1}</strong>
          <small>Ganas +${mejoraEspacios} espacios por ${formatoEuro(mejoraCosto)}</small>
        </div>
        <button class="storage-upgrade-btn" data-action="open-storage-upgrade">VER MEJORA</button>
      </section>

      <section class="storage-products-section">
        <div class="storage-section-heading">
          <div>
            <span class="storage-kicker">CONTENIDO ACTUAL</span>
            <h4>Productos guardados</h4>
          </div>
          <strong>${mercadoTrading.productos.filter((producto) => Number(producto.tienes || 0) > 0).length} tipos</strong>
        </div>
        <div class="storage-item-list storage-item-list-44-29">${filas}</div>
      </section>
    </div>
  `;
}

function mostrarResumenAlmacen(){
  showGameNotice({
    title: "Almacén",
    icon: "📦",
    tone: calcularSobrecapacidadAlmacen() > 0 ? "danger" : "info",
    message: resumenAlmacenHTML()
  });
}
