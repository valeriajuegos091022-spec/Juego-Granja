// FARM LEGACY - Intro Don Mateo / historia
// PATCH 44.17: la intro mantiene las mismas funciones publicas,
// pero mejora narrativa, progreso visual y presentacion de escenas.
const escenasIntro = [
  {
    titulo: "El regreso",
    nota: "La finca vuelve a abrir sus puertas.",
    imagen: "assets/images/story/intro_01.png",
    texto: "Volviste al camino de tierra cuando el sol empezaba a caer.\nLa granja de Don Mateo seguía allí, silenciosa, esperando una nueva mano que la levantara.\nNo parecía una simple herencia. Parecía una promesa."
  },
  {
    titulo: "El sobre sellado",
    nota: "Una carta esperó el momento exacto.",
    imagen: "assets/images/story/intro_02.png",
    texto: "En el viejo buzón encontraste un sobre gastado por los años.\nEl sello llevaba una M marcada en cera roja.\nDon Mateo había preparado este momento antes de marcharse."
  },
  {
    titulo: "El legado",
    nota: "La granja será tuya, pero el futuro hay que ganarlo.",
    imagen: "assets/images/story/intro_03.png",
    texto: "La carta no hablaba solo de tierras ni de edificios viejos.\nHablaba de trabajo, paciencia y orgullo.\nAhora la finca es tuya. Cuídala, mejórala y conviértela en un legado."
  }
];

let escenaActual = 0;
let typewriterTimer = null;
let escribiendo = false;
let textoCompletoActual = "";

function mostrarPantalla(nombre){
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === nombre);
  });
}

function limpiarNombre(nombre){
  return nombre.trim().replace(/\s+/g, " ");
}

function detenerTypewriter(){
  if(typewriterTimer){
    clearInterval(typewriterTimer);
    typewriterTimer = null;
  }
  escribiendo = false;
}

function escribirTexto(texto){
  const cajaTexto = document.getElementById("storyText");
  if(!cajaTexto) return;

  detenerTypewriter();

  textoCompletoActual = texto;
  cajaTexto.textContent = "";
  escribiendo = true;

  let i = 0;
  typewriterTimer = setInterval(() => {
    cajaTexto.textContent += textoCompletoActual.charAt(i);
    i++;

    if(i >= textoCompletoActual.length){
      detenerTypewriter();
    }
  }, 18);
}

function completarTextoActual(){
  const cajaTexto = document.getElementById("storyText");
  if(!cajaTexto) return;

  detenerTypewriter();
  cajaTexto.textContent = textoCompletoActual;
}

function actualizarProgresoHistoria(indice){
  document.querySelectorAll(".story-dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === indice);
    dot.classList.toggle("done", dotIndex < indice);
  });
}

function cargarEscenaIntro(indice){
  const escena = escenasIntro[indice];
  if(!escena) return;

  const imagen = document.getElementById("storyImage");
  const contador = document.getElementById("storyCounter");
  const titulo = document.getElementById("storyTitle");
  const nota = document.getElementById("storySceneNote");
  const botonTexto = document.getElementById("nextStoryText");

  if(imagen){
    imagen.style.opacity = "0";
    setTimeout(() => {
      imagen.src = escena.imagen;
      imagen.alt = escena.titulo;
      imagen.onload = () => imagen.style.opacity = "1";
    }, 120);
  }

  if(contador) contador.textContent = `ESCENA ${indice + 1}/${escenasIntro.length}`;
  if(titulo) titulo.textContent = escena.titulo;
  if(nota) nota.textContent = escena.nota || "";
  if(botonTexto) botonTexto.textContent = indice === escenasIntro.length - 1 ? "ELEGIR ALMACÉN" : "SIGUIENTE";

  actualizarProgresoHistoria(indice);
  escribirTexto(escena.texto);
}

function iniciarIntroDonMateo(){
  escenaActual = 0;
  mostrarPantalla("story");
  cargarEscenaIntro(escenaActual);
}

function avanzarIntro(){
  if(escribiendo){
    completarTextoActual();
    return;
  }

  escenaActual++;

  if(escenaActual >= escenasIntro.length){
    mostrarPantalla("warehouse");
    return;
  }

  cargarEscenaIntro(escenaActual);
}
