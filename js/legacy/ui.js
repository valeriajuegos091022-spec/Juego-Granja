// js/ui.js
// Navegación, sonidos, mensajes y actualizaciones visuales generales.

import { estado } from './state.js';

export function reproducirClick(){
    const sonido = document.getElementById("sonidoClick");
    if(!sonido) return;

    sonido.currentTime = 0;
    sonido.play().catch(() => {});
}

export function reproducirMonedas(){
    const sonido = document.getElementById("sonidoMonedas");
    if(!sonido) return;

    sonido.currentTime = 0;
    sonido.play().catch(() => {});
}

export function mostrarMensaje(texto){
    const mensaje = document.getElementById("mensajeFlotante");
    if(!mensaje) return;

    mensaje.innerHTML = texto;
    mensaje.style.display = "block";

    setTimeout(() => {
        mensaje.style.opacity = "1";
        mensaje.style.transform = "translateX(-50%) scale(1)";
    }, 10);

    setTimeout(() => {
        mensaje.style.opacity = "0";
        mensaje.style.transform = "translateX(-50%) scale(0.8)";
    }, 1200);

    setTimeout(() => {
        mensaje.style.display = "none";
    }, 1500);
}

export function texto(id, valor){
    const elemento = document.getElementById(id);
    if(elemento){
        elemento.innerHTML = valor;
    }
}

export function mostrarPantalla(idPantalla){
    const pantallas = document.querySelectorAll(".pantalla");

    // Portada sin HUD superior; pantallas de juego con HUD.
    document.body.classList.toggle("modoPortada", idPantalla === "inicio");

    pantallas.forEach((pantalla) => {
        pantalla.style.display = "none";
    });

    const pantalla = document.getElementById(idPantalla);
    if(pantalla){
        pantalla.style.display = "block";
    }
}

export function actualizarBarraSuperior(){
    texto("dinero", "🪙 " + estado.dinero.toFixed(2) + "€");
    texto("dia", "📆 " + estado.dia);
    texto("espacio", "📦 " + estado.espacioUsado + "/" + estado.espacioTotal);
}

export function actualizarInventarioVisual(){
    texto("tusHuevos", estado.huevos);
    texto("almacenHuevos", "🥚 Huevos: " + estado.huevos);

    texto("tuCarneTexto", estado.carnePollo);
    texto("almacenCarne", "🍗 Carne de pollo: " + estado.carnePollo);

    texto("espacio", "📦 " + estado.espacioUsado + "/" + estado.espacioTotal);
    texto("espacioAlmacen", "📦 Espacio: " + estado.espacioUsado + "/" + estado.espacioTotal);
}

export function actualizarTodo(){

    actualizarBarraSuperior();

    actualizarInventarioVisual();

    texto(
        "almacenLeche",
        "🥛 Leche: " + estado.leche
    );

    texto(
        "huevosPendientesTexto",
        "Huevos pendientes: " + estado.huevosPendientes
    );

    texto(
        "textoGallinas",
        "Tienes: " + estado.gallinas.length
    );

    texto(
        "precioHuevo",
        estado.precioHuevo.toFixed(2) + "€"
    );

    texto(
        "precioCarneTexto",
        estado.precioCarne + "€"
    );

}

// --- Navegación global del juego ---

export function nuevaPartida(){
    mostrarPantalla("almacenes");
}

export function elegirPequeno(){
    estado.dinero = 5000;
    estado.espacioTotal = 10;
    estado.alquiler = 10;

    actualizarTodo();
    mostrarPantalla("principal");
}

export function elegirGrande(){
    estado.dinero = 5000;
    estado.espacioTotal = 30;
    estado.alquiler = 18;

    actualizarTodo();
    mostrarPantalla("principal");
}

export function abrirTienda(){
    mostrarPantalla("tienda");
}

export function volverPrincipal(){
    mostrarPantalla("principal");
}

export function abrirProductos(){
    mostrarPantalla("productos");
}

export function volverTienda(){
    mostrarPantalla("tienda");
}

export function abrirAlmacen(){
    mostrarPantalla("almacenPantalla");
}

export function volverPrincipalDesdeAlmacen(){
    mostrarPantalla("principal");
}

export function abrirCorrales(){
    mostrarPantalla("corralesPantalla");
}

export function volverPrincipalDesdeCorrales(){
    mostrarPantalla("principal");
}

export function cerrarResumen(){
    mostrarPantalla("principal");
}
