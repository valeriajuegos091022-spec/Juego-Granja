// js/corrales.js
import { estado } from './state.js';
import { mostrarMensaje, actualizarTodo, mostrarPantalla } from './ui.js';

export function renderizarCorrales(){

    const contenedor = document.getElementById("listaCorrales");

    if(!contenedor){
        return;
    }

    contenedor.innerHTML = "";

    crearTarjetaCorral("gallinas", "🐔", "Corral de Gallinas", "Gallinas");
    crearTarjetaCorral("vacas", "🐄", "Establo de Vacas", "Vacas");
    crearTarjetaCorral("ovejas", "🐑", "Corral de Ovejas", "Ovejas");

}

function crearTarjetaCorral(tipo, icono, nombre, etiqueta){

    const contenedor = document.getElementById("listaCorrales");
    const corral = estado.corrales[tipo];

    let cantidadAnimales = 0;

    if(tipo === "gallinas"){
        cantidadAnimales = estado.gallinas.length;
    }

    if(tipo === "vacas"){
        cantidadAnimales = estado.vacas.length;
    }

    let html = "";

    if(corral.comprado){

        html = `
        <div class="tarjetaCorral">
            <div class="iconoCorral">${icono}</div>

            <div class="infoCorral">
                <h2>${nombre}</h2>
                <p>Nivel: ${corral.nivel}</p>
                <p>Capacidad: ${cantidadAnimales}/${corral.capacidad}</p>
            </div>

            <div class="accionesCorral">
                <button onclick="abrirGestionCorral('${tipo}')">
                    GESTIONAR
                </button>

                <button onclick="mejorarCorral('${tipo}')">
                    MEJORAR (${corral.costoMejora}€)
                </button>
            </div>
        </div>
        `;

    } else {

        html = `
        <div class="tarjetaCorral bloqueado">
            <div class="iconoCorral">${icono}</div>

            <div class="infoCorral">
                <h2>${nombre}</h2>
                <p>No comprado</p>
                <p>Desbloquea ${etiqueta}</p>
            </div>

            <div class="accionesCorral">
                <button onclick="comprarCorral('${tipo}')">
                    COMPRAR (${corral.costoCompra}€)
                </button>
            </div>
        </div>
        `;
    }

    contenedor.innerHTML += html;
}

export function comprarCorral(tipo){

    const corral = estado.corrales[tipo];

    if(corral.comprado){
        alert("Ya tienes este corral");
        return;
    }

    if(estado.dinero < corral.costoCompra){
        alert("No tienes suficiente dinero");
        return;
    }

    estado.dinero -= corral.costoCompra;

    corral.comprado = true;
    corral.nivel = 1;

    if(tipo === "vacas"){
        corral.capacidad = 5;
    }

    if(tipo === "ovejas"){
        corral.capacidad = 10;
    }

    mostrarMensaje("🏗️ Corral comprado");

    actualizarTodo();
    renderizarCorrales();
}

export function mejorarCorral(tipo){

    const corral = estado.corrales[tipo];

    if(!corral.comprado){
        alert("Primero debes comprar este corral");
        return;
    }

    if(estado.dinero < corral.costoMejora){
        alert("No tienes suficiente dinero");
        return;
    }

    estado.dinero -= corral.costoMejora;

    corral.nivel += 1;
    corral.capacidad += 5;
    corral.costoMejora = Math.round(corral.costoMejora * 1.35);

    mostrarMensaje("⬆️ Corral mejorado");

    actualizarTodo();
    renderizarCorrales();
}

export function abrirGestionCorral(tipo){

    if(tipo === "gallinas"){
        mostrarPantalla("gestionGallinasPantalla");
    }

    if(tipo === "vacas"){
        mostrarPantalla("gestionVacasPantalla");
    }

    if(tipo === "ovejas"){
        alert("Las ovejas estarán disponibles más adelante");
    }

}