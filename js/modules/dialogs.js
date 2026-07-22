// FARM LEGACY - Diálogos, avisos y formato
function ensureGameDialog(){
  let modal = document.getElementById("gameDialogModal");
  if(modal) return modal;
  modal = document.createElement("div");
  modal.id = "gameDialogModal";
  modal.className = "game-dialog";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="game-dialog-backdrop" data-action="close-game-dialog"></div>
    <section class="game-dialog-card" role="dialog" aria-modal="true">
      <button class="game-dialog-close" data-action="close-game-dialog" aria-label="Cerrar">×</button>
      <div id="gameDialogIcon" class="game-dialog-icon">ℹ️</div>
      <h2 id="gameDialogTitle">Aviso</h2>
      <div id="gameDialogBody" class="game-dialog-body"></div>
      <div id="gameDialogActions" class="game-dialog-actions"></div>
    </section>`;
  document.body.appendChild(modal);
  return modal;
}

let gameDialogConfirmCallback = null;

function closeGameDialog(){
  const modal = document.getElementById("gameDialogModal");
  if(modal){
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
  gameDialogConfirmCallback = null;
}

function showGameNotice({ title = "Aviso", message = "", icon = "ℹ️", tone = "info", button = "Aceptar" } = {}){
  const modal = ensureGameDialog();
  document.getElementById("gameDialogIcon").textContent = icon;
  document.getElementById("gameDialogTitle").textContent = title;
  document.getElementById("gameDialogBody").innerHTML = message;
  const actions = document.getElementById("gameDialogActions");
  actions.innerHTML = `<button class="game-dialog-btn ok ${tone}" data-action="close-game-dialog">${button}</button>`;
  modal.className = `game-dialog active ${tone}`;
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => actions.querySelector(".game-dialog-btn")?.focus(), 30);
}

function showGameConfirm({ title = "Confirmar", message = "", icon = "⚠️", tone = "warning", confirmText = "Confirmar", cancelText = "Cancelar", onConfirm = null } = {}){
  const modal = ensureGameDialog();
  gameDialogConfirmCallback = onConfirm;
  document.getElementById("gameDialogIcon").textContent = icon;
  document.getElementById("gameDialogTitle").textContent = title;
  document.getElementById("gameDialogBody").innerHTML = message;
  const actions = document.getElementById("gameDialogActions");
  actions.innerHTML = `
    <button class="game-dialog-btn cancel" data-action="close-game-dialog">${cancelText}</button>
    <button class="game-dialog-btn confirm ${tone}" data-action="confirm-game-dialog">${confirmText}</button>`;
  modal.className = `game-dialog active ${tone}`;
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => {
    const focusSelector = tone === "warning" || tone === "danger" ? ".game-dialog-btn.cancel" : ".game-dialog-btn.confirm";
    actions.querySelector(focusSelector)?.focus();
  }, 30);
}

function simpleNotice(text, tone = "info"){
  const presets = {
    success: { title: "Listo", icon: "✅" },
    error: { title: "No se puede hacer", icon: "❌" },
    warning: { title: "Atención", icon: "⚠️" },
    info: { title: "Aviso", icon: "ℹ️" }
  };
  const preset = presets[tone] || presets.info;
  showGameNotice({
    title: preset.title,
    icon: preset.icon,
    tone,
    message: `<p>${text}</p>`
  });
}

function formatoEuro(valor){
  return `${Number(valor).toFixed(2).replace(".00", "")} €`;
}
