import { estado } from "./state.js";
import { actualizarTodo, mostrarPantalla } from "./ui.js";

const CLAVE_GUARDADO = "granjaTycoon_partida_local";

function mostrarIndicadorGuardado(){

    const indicador = document.getElementById("indicadorGuardado");
    const texto = document.getElementById("textoGuardado");
    const progreso = document.getElementById("progresoGuardado");

    if(!indicador || !texto || !progreso){
        return;
    }

    texto.innerHTML = "💾 Guardando partida...";
    progreso.style.width = "0%";

    indicador.style.display = "block";

    setTimeout(function(){
        indicador.style.opacity = "1";
        indicador.style.transform = "translateY(0px) scale(1)";
        progreso.style.width = "100%";
    }, 30);

    setTimeout(function(){
        texto.innerHTML = "✅ Partida guardada";
    }, 1200);

    setTimeout(function(){
        indicador.style.opacity = "0";
        indicador.style.transform = "translateY(25px) scale(0.95)";
    }, 2600);

    setTimeout(function(){
        indicador.style.display = "none";
        progreso.style.width = "0%";
    }, 3100);
}

export function guardarPartida(){

    localStorage.setItem(
        CLAVE_GUARDADO,
        JSON.stringify(estado)
    );

    console.log("Partida guardada");

    mostrarIndicadorGuardado();
}
export function cargarPartida(){

    let partidaGuardada =
    localStorage.getItem(CLAVE_GUARDADO);

    if(partidaGuardada === null){
        return false;
    }

    let datos =
    JSON.parse(partidaGuardada);

    Object.assign(estado, datos);

    console.log("Partida cargada");

    return true;
}

export function borrarPartida(){

    localStorage.removeItem(CLAVE_GUARDADO);

    console.log("Partida borrada");
}

export function continuarPartida(){

    let cargada = cargarPartida();

    if(cargada === false){
        alert("No hay partida guardada");
        return;
    }

    actualizarTodo();

    mostrarPantalla("principal");

    console.log("Continuando partida");
}