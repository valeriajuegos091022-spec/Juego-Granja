// FARM LEGACY - Eventos DOM generales
document.addEventListener("click", (event) => {
  const quickButton = event.target.closest("[data-action='quick-market-buy'], [data-action='quick-market-sell'], [data-action='quick-market-sell-all']");

  if(quickButton){
    event.preventDefault();
    event.stopPropagation();

    if(quickButton.dataset.action === "quick-market-sell-all"){
      prepararVenderTodoMercadoRapido(quickButton.dataset.product || "");
    } else {
      const tipo = quickButton.dataset.action === "quick-market-buy" ? "comprar" : "vender";
      operarMercadoRapido(quickButton.dataset.product || "", tipo);
    }
    return;
  }

  if(event.target.closest(".quick-trade-controls")){
    event.stopPropagation();
  }
}, true);

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if(!button) return;

  const action = button.dataset.action;

  if(action === "new"){
    abrirGestorSaves("new");
  }

  if(action === "load"){
    abrirGestorSaves("load");
  }

  if(action === "continue"){
    continuarUltimaPartida();
  }

  if(action === "refresh-save-slots"){
    renderSaveSlots();
  }

  if(action === "select-save-slot"){
    seleccionarSaveSlot(Number(button.dataset.slot || 1));
  }

  if(action === "save-current-game"){
    simpleNotice("Farm Legacy guarda automáticamente solo al pasar el día.", "info");
  }

  if(action === "settings"){
    simpleNotice("Ajustes estará disponible más adelante.", "info");
  }

  if(action === "exit"){
    simpleNotice("En navegador no se puede cerrar la app automáticamente.", "info");
  }

  if(action === "back-title"){
    mostrarPantalla("title");
  }

  if(action === "choose-character"){
    partidaTemporal.personajeGenero = button.dataset.gender || "";
    mostrarPantalla("name");
    setTimeout(() => document.getElementById("playerName")?.focus(), 80);
  }

  if(action === "back-character"){
    mostrarPantalla("character");
  }

  if(action === "confirm-name"){
    const input = document.getElementById("playerName");
    const nombre = limpiarNombre(input?.value || "");

    if(nombre.length < 2){
      simpleNotice("Escribe un nombre válido para continuar.", "error");
      input?.focus();
      return;
    }

    partidaTemporal.personajeNombre = nombre;
    partidaTemporal.modoAdmin = normalizarUsuarioSave(currentSaveUser) === "admin" || nombre.trim().toLowerCase() === "admin";
    if(partidaTemporal.modoAdmin){
      partidaTemporal.dineroInicial = typeof getBalanceValue === "function" ? getBalanceValue("jugador.dineroAdmin", 100000) : 100000;
    }
    localStorage.setItem("farmLegacy_creacionTemporal", JSON.stringify(partidaTemporal));
    iniciarIntroDonMateo();
  }

  if(action === "next-story"){
    avanzarIntro();
  }

  if(action === "skip-story"){
    detenerTypewriter();
    mostrarPantalla("warehouse");
  }

  if(action === "back-story"){
    iniciarIntroDonMateo();
  }

  if(action === "choose-storage"){
    const tipo = button.dataset.storage;

    if(tipo === "pequeno"){
      const balanceAlmacen = typeof getBalanceAlmacen === "function" ? getBalanceAlmacen("pequeno") : null;
      partidaTemporal.almacenTipo = "pequeno";
      partidaTemporal.espacioTotal = Number(balanceAlmacen?.capacidad || 12);
      partidaTemporal.alquiler = Number(balanceAlmacen?.alquiler || 8);
      partidaTemporal.almacenNivel = 1;
      partidaTemporal.almacenCostoMejora = Number(balanceAlmacen?.costoMejora || 90);
      partidaTemporal.dineroInicial = partidaTemporal.modoAdmin
        ? (typeof getBalanceValue === "function" ? getBalanceValue("jugador.dineroAdmin", 100000) : 100000)
        : Number(balanceAlmacen?.dineroInicial || 120);
    }

    if(tipo === "grande"){
      const balanceAlmacen = typeof getBalanceAlmacen === "function" ? getBalanceAlmacen("grande") : null;
      partidaTemporal.almacenTipo = "grande";
      partidaTemporal.espacioTotal = Number(balanceAlmacen?.capacidad || 30);
      partidaTemporal.alquiler = Number(balanceAlmacen?.alquiler || 14);
      partidaTemporal.almacenNivel = 1;
      partidaTemporal.almacenCostoMejora = Number(balanceAlmacen?.costoMejora || 130);
      partidaTemporal.dineroInicial = partidaTemporal.modoAdmin
        ? (typeof getBalanceValue === "function" ? getBalanceValue("jugador.dineroAdmin", 100000) : 100000)
        : Number(balanceAlmacen?.dineroInicial || 120);
    }

    localStorage.setItem("farmLegacy_creacionTemporal", JSON.stringify(partidaTemporal));
    if(currentSaveUser){ guardarPartidaEnSlot(currentSaveUser, currentSaveSlot); }

    actualizarDashboard();
    mostrarPantalla("main-game");
  }

  if(action === "open-section"){
    const section = button.dataset.section || "";

    if(section === "market"){
      renderMercadoTrading();
      mostrarPantalla("market");
      return;
    }

    if(section === "corrales"){
      abrirCorrales();
      return;
    }

    if(section === "storage"){
      mostrarResumenAlmacen();
      return;
    }

    if(section === "production"){
      if(typeof abrirCentroProduccion === "function"){
        abrirCentroProduccion();
      }else{
        simpleNotice("Centro de Producción no está disponible todavía.", "info");
      }
      return;
    }

    if(section === "contracts"){
      abrirContratos();
      return;
    }

    const nombres = {
      machinery: "Maquinarias",
      production: "Producción",
      missions: "Misiones",
      contracts: "Contratos"
    };
    simpleNotice(`${nombres[section] || "Sección"}: esta pantalla se conectará en un próximo parche.`, "info");
  }

  if(action === "go-title-menu"){
    showGameConfirm({
      title: "¿Volver al menú?",
      icon: "🏡",
      tone: "warning",
      confirmText: "IR AL MENÚ",
      cancelText: "CANCELAR",
      message: `<p>Volverás al menú principal.</p><p class="dialog-muted"><strong>Guardado:</strong> los cambios importantes quedan guardados al pasar el día.</p>`,
      onConfirm: () => {
        cerrarModalMercado();
        cerrarModalCorral();
        actualizarDashboard();
        mostrarPantalla("title");
      }
    });
    return;
  }

  if(action === "back-main"){
    cerrarModalMercado();
    actualizarDashboard();
    mostrarPantalla("main-game");
  }

  if(action === "filter-market-category"){
    mercadoCategoriaActiva = button.dataset.category || "todos";
    renderMercadoTrading();
  }

  if(action === "open-market-product"){
    abrirProductoMercado(button.dataset.product || "");
  }

  if(action === "close-market-modal"){
    cerrarModalMercado();
  }

  if(action === "trade-plus"){
    mercadoTrading.cantidad = Math.min(999, mercadoTrading.cantidad + 1);
    actualizarPreviewTrade();
  }

  if(action === "trade-minus"){
    mercadoTrading.cantidad = Math.max(1, mercadoTrading.cantidad - 1);
    actualizarPreviewTrade();
  }

  if(action === "quick-market-buy" || action === "quick-market-sell" || action === "quick-market-sell-all"){
    return;
  }

  if(action === "market-buy"){
    operarMercado("comprar");
  }

  if(action === "market-sell"){
    operarMercado("vender");
  }

  if(action === "market-sell-all"){
    const producto = mercadoTrading.productoActivo;
    if(producto) venderTodoMercadoRapido(producto.id, true);
  }

  if(action === "manage-corral"){
    abrirDetalleCorral(button.dataset.corral || "gallinas");
  }

  if(action === "back-corrals"){
    abrirCorrales();
  }

  if(action === "corral-buy"){
    abrirModalCorral("comprar");
  }

  if(action === "corral-upgrade"){
    abrirModalCorral("mejora");
  }

  if(action === "corral-slaughter"){
    abrirModalCorral("matadero");
  }

  if(action === "close-corral-modal"){
    cerrarModalCorral();
  }

  if(action === "open-storage-upgrade"){
    abrirPopupMejoraAlmacen();
  }

  if(action === "close-game-dialog"){
    closeGameDialog();
  }

  if(action === "confirm-game-dialog"){
    const cb = gameDialogConfirmCallback;
    closeGameDialog();
    if(typeof cb === "function") cb();
  }

  if(action === "confirm-corral-modal"){
    confirmarAccionCorral();
  }

  if(action === "accept-contract"){
    aceptarContrato(button.dataset.contractId || "");
    return;
  }

  if(action === "deliver-contract"){
    entregarContrato(button.dataset.contractId || "");
    return;
  }

  if(action === "next-day-demo"){
    avanzarSiguienteDia();
  }
});

document.addEventListener("input", (event) => {
  if(event.target?.id === "saveUserName"){
    renderSaveSlots();
  }

  if(event.target?.id === "tradeAmount"){
    mercadoTrading.cantidad = leerCantidadMercado(event.target.value, mercadoTrading.cantidad);
    actualizarPreviewTrade();
  }

  if(event.target?.id === "corralBuyAmount"){
    actualizarPreviewCompraAnimal();
  }

  if(event.target?.id === "slaughterAmount" || event.target?.id === "slaughterAge"){
    actualizarPreviewMatadero();
  }
});

document.addEventListener("keydown", (event) => {
  if(event.key === "Escape"){
    cerrarModalMercado();
    cerrarModalCorral();
    return;
  }

  if(event.key !== "Enter" && event.key !== " ") return;

  const nameScreen = document.querySelector('[data-screen="name"].active');
  if(nameScreen){
    event.preventDefault();
    document.querySelector('[data-action="confirm-name"]')?.click();
    return;
  }

  const storyScreen = document.querySelector('[data-screen="story"].active');
  if(storyScreen){
    event.preventDefault();
    avanzarIntro();
  }
});
