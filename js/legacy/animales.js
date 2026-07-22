// js/animales.js
// Gallinas, producción, huevos pendientes y matadero.

import { estado } from './state.js';
import { reproducirClick, reproducirMonedas, mostrarMensaje, texto, actualizarTodo } from './ui.js';
import { calcularEspacioUsadoAlmacen } from './almacen.js';

export function actualizarEdadesGallinas(){

    let jovenes = 0;
    let adultas = 0;
    let viejas = 0;

    for(let i = 0; i < estado.gallinas.length; i++){

        const edad = estado.gallinas[i].edad;

        if(edad >= 0 && edad <= 3){
            jovenes++;
        }
        else if(edad >= 4 && edad <= 16){
            adultas++;
        }
        else{
            viejas++;
        }
    }

    texto(
        "edadesGallinas",
        "🐣 Jóvenes: " + jovenes + "<br>" +
        "🐔 Adultas: " + adultas + "<br>" +
        "🐓 Viejas: " + viejas + "<br><br>" +
        "Total: " +
        estado.gallinas.length +
        "/" +
        estado.corrales.gallinas.capacidad
    );

    texto(
        "textoGallinas",
        "Tienes: " + estado.gallinas.length
    );
}

export function comprarGallina(){
    reproducirMonedas();
    const capacidad =
estado.corrales.gallinas.capacidad;

if(estado.gallinas.length >= capacidad){
    alert("El corral está lleno");
    return;
}

    if(estado.dinero < 10){
        alert("No tienes suficiente dinero");
        return;
    }

    estado.gallinas.push({ edad: 0 });
    estado.dinero = Number((estado.dinero - 10).toFixed(2));
    estado.gastosDia = Number((estado.gastosDia + 10).toFixed(2));

    mostrarMensaje("🐔 Nueva gallina");
    actualizarEdadesGallinas();
    actualizarTodo();
}

export function recogerHuevos(){
    reproducirClick();

    if(estado.huevosPendientes <= 0){
        alert("No hay huevos pendientes");
        return;
    }


    estado.huevos += estado.huevosPendientes;
    estado.huevosPendientes = 0;
    calcularEspacioUsadoAlmacen();

    texto("huevosPendientesTexto", "Huevos pendientes: 0");
    mostrarMensaje("🥚 Huevos recogidos");
    actualizarTodo();
}

export function abrirMatadero(indice){
    estado.gallinaSeleccionada = indice;
    const popup = document.getElementById("popupMatadero");
    if(popup) popup.style.display = "block";
}

export function cerrarMatadero(){
    const popup = document.getElementById("popupMatadero");
    if(popup) popup.style.display = "none";
}

export function confirmarMatadero(){
    reproducirClick();

    if(estado.dinero < 5){
        alert("No tienes suficiente dinero para pagar el matadero");
        return;
    }

    if(estado.gallinaSeleccionada < 0){
        alert("No hay gallina seleccionada");
        return;
    }

    if(!estado.gallinas[estado.gallinaSeleccionada]){
        alert("Esa gallina ya no existe");
        estado.gallinaSeleccionada = -1;
        cerrarMatadero();
        return;
    }

    estado.dinero = Number((estado.dinero - 5).toFixed(2));
    estado.gastosDia = Number((estado.gastosDia + 5).toFixed(2));

    estado.gallinas.splice(estado.gallinaSeleccionada, 1);
    estado.carnePollo += 2;
    calcularEspacioUsadoAlmacen();
    estado.gallinaSeleccionada = -1;

    cerrarMatadero();
    mostrarMensaje("🍗 Carne obtenida");
    actualizarEdadesGallinas();
    actualizarTodo();
}

export function adminGallinasViejas(){
    if(estado.gallinas.length <= 0){
        alert("No tienes gallinas");
        return;
    }

    for(let i = 0; i < estado.gallinas.length; i++){
        estado.gallinas[i].edad = 17;
    }

    actualizarEdadesGallinas();
    alert("Todas las gallinas ahora son viejas");
}

export function envejecerGallinas(){
    let gallinasMuertasHoy = 0;

    for(let i = estado.gallinas.length - 1; i >= 0; i--){
        estado.gallinas[i].edad++;

        if(estado.gallinas[i].edad >= 21){
            estado.gallinas.splice(i, 1);
            gallinasMuertasHoy++;
        }
    }

    actualizarEdadesGallinas();

    return gallinasMuertasHoy;
}

export function producirHuevos(){
    let huevosProducidosHoy = 0;

    for(let i = 0; i < estado.gallinas.length; i++){
        const edad = estado.gallinas[i].edad;

        if(edad >= 4 && edad <= 8){
            huevosProducidosHoy += 1;
        }

        else if(edad >= 9 && edad <= 16){
            huevosProducidosHoy += 2;
        }

        else if(edad >= 17 && edad <= 20){
            huevosProducidosHoy += 1;
        }
    }

    estado.huevosPendientes += huevosProducidosHoy;
    texto("huevosPendientesTexto", "Huevos pendientes: " + estado.huevosPendientes);

    return huevosProducidosHoy;
}

export function actualizarEdadesVacas(){

    let terneras = 0;
    let adultas = 0;
    let viejas = 0;

    for(let i = 0; i < estado.vacas.length; i++){

        const edad = estado.vacas[i].edad;

        if(edad >= 0 && edad <= 5){
            terneras++;
        }
        else if(edad >= 6 && edad <= 24){
            adultas++;
        }
        else if(edad >= 25){
            viejas++;
        }
    }

    texto("textoVacas", "Tienes: " + estado.vacas.length);

    texto(
        "edadesVacas",
        "🐮 Terneras: " + terneras + "<br>" +
        "🐄 Adultas: " + adultas + "<br>" +
        "🐂 Viejas: " + viejas + "<br><br>" +
        "Total: " + estado.vacas.length + "/" + estado.corrales.vacas.capacidad
    );

    texto(
        "lechePendienteTexto",
        "Leche pendiente: " + estado.lechePendiente
    );
}

export function comprarVaca(){

    reproducirMonedas();

    if(!estado.corrales.vacas.comprado){
        alert("Primero debes comprar el establo de vacas");
        return;
    }

    const capacidad = estado.corrales.vacas.capacidad;

    if(estado.vacas.length >= capacidad){
        alert("El establo está lleno");
        return;
    }

    if(estado.dinero < 30){
        alert("No tienes suficiente dinero");
        return;
    }

    estado.vacas.push({ edad: 0 });

    estado.dinero = Number((estado.dinero - 30).toFixed(2));
    estado.gastosDia = Number((estado.gastosDia + 30).toFixed(2));

    mostrarMensaje("🐄 Nueva vaca");

    actualizarEdadesVacas();
    actualizarTodo();
}

export function envejecerVacas(){

    let vacasMuertasHoy = 0;

    for(let i = estado.vacas.length - 1; i >= 0; i--){

        estado.vacas[i].edad++;

        if(estado.vacas[i].edad >= 35){
            estado.vacas.splice(i, 1);
            vacasMuertasHoy++;
        }
    }

    actualizarEdadesVacas();

    return vacasMuertasHoy;
}

export function producirLeche(){

    let lecheProducidaHoy = 0;

    for(let i = 0; i < estado.vacas.length; i++){

        const edad = estado.vacas[i].edad;

        if(edad >= 6 && edad <= 24){

            const suerte = Math.random();

            if(suerte < 0.75){
                lecheProducidaHoy += 1;
            }
            else if(suerte < 0.95){
                lecheProducidaHoy += 2;
            }
            else{
                lecheProducidaHoy += 3;
            }
        }

        else if(edad >= 25 && edad <= 34){

            const suerte = Math.random();

            if(suerte < 0.80){
                lecheProducidaHoy += 1;
            }
            else{
                lecheProducidaHoy += 2;
            }
        }
    }

    estado.lechePendiente += lecheProducidaHoy;

    texto(
        "lechePendienteTexto",
        "Leche pendiente: " + estado.lechePendiente
    );

    return lecheProducidaHoy;
}

export function recogerLeche(){

    reproducirClick();

    if(estado.lechePendiente <= 0){
        alert("No hay leche pendiente");
        return;
    }


    estado.leche += estado.lechePendiente;
    estado.lechePendiente = 0;
    calcularEspacioUsadoAlmacen();

    texto("lechePendienteTexto", "Leche pendiente: 0");

    mostrarMensaje("🥛 Leche recogida");

    actualizarEdadesVacas();
    actualizarTodo();
}

function contarViejas(tipo){

    let lista = [];

    if(tipo === "gallinas"){
        lista = estado.gallinas;
    }

    if(tipo === "vacas"){
        lista = estado.vacas;
    }

    let total = 0;

    for(let i = 0; i < lista.length; i++){

        const edad = lista[i].edad;

        if(tipo === "gallinas" && edad >= 17){
            total++;
        }

        if(tipo === "vacas" && edad >= 25 && edad <= 34){
            total++;
        }
    }

    return total;
}

export function abrirMataderoAnimal(tipo){

    estado.matadero.tipo = tipo;

    const viejas = contarViejas(tipo);

    if(viejas <= 0){
        alert("No tienes animales viejos para enviar al matadero");
        return;
    }

    texto("mataderoCantidadDisponible", "Disponibles: " + viejas);
    texto("mataderoTitulo", tipo === "gallinas" ? "🐓 Matadero de Gallinas" : "🐂 Matadero de Vacas");
    texto("mataderoInfo", tipo === "gallinas"
        ? "1 gallina vieja = 2 carne de pollo | Costo: 5€"
        : "1 vaca vieja = 1 carne de vaca | Costo: 15€"
    );

    const input = document.getElementById("cantidadMatadero");
    if(input){
        input.value = 1;
        input.max = viejas;
    }

    document.getElementById("popupMataderoGeneral").style.display = "block";

    actualizarPreviewMatadero();
}

export function cerrarMataderoAnimal(){
    document.getElementById("popupMataderoGeneral").style.display = "none";
}

export function actualizarPreviewMatadero(){

    const tipo = estado.matadero.tipo;
    const input = document.getElementById("cantidadMatadero");

    if(!tipo || !input){
        return;
    }

    let cantidad = Number(input.value);

    if(cantidad < 0){
        cantidad = 0;
    }

    const costoUnidad = tipo === "gallinas" ? 5 : 15;
    const carneUnidad = tipo === "gallinas" ? 2 : 1;

    texto("mataderoCostoTotal", "Costo total: " + (cantidad * costoUnidad) + "€");

    texto(
        "mataderoProduccion",
        tipo === "gallinas"
            ? "Producción: +" + (cantidad * carneUnidad) + " carne de pollo"
            : "Producción: +" + (cantidad * carneUnidad) + " carne de vaca"
    );
}

export function procesarMatadero(){

    const tipo = estado.matadero.tipo;
    const input = document.getElementById("cantidadMatadero");

    if(!tipo || !input){
        alert("No hay animal seleccionado");
        return;
    }

    let cantidad = Math.floor(Number(input.value));
    const disponibles = contarViejas(tipo);

    if(cantidad <= 0){
        alert("Escribe una cantidad válida");
        return;
    }

    if(cantidad > disponibles){
        alert("No tienes tantos animales viejos");
        return;
    }

    const costoUnidad = tipo === "gallinas" ? 5 : 15;
    const costoTotal = cantidad * costoUnidad;

    if(estado.dinero < costoTotal){
        alert("No tienes suficiente dinero para pagar el matadero");
        return;
    }

    estado.dinero = Number((estado.dinero - costoTotal).toFixed(2));
    estado.gastosDia = Number((estado.gastosDia + costoTotal).toFixed(2));

    let eliminados = 0;

    if(tipo === "gallinas"){

        for(let i = estado.gallinas.length - 1; i >= 0; i--){

            if(estado.gallinas[i].edad >= 17 && eliminados < cantidad){
                estado.gallinas.splice(i, 1);
                eliminados++;
            }
        }

        estado.carnePollo += cantidad * 2;
        calcularEspacioUsadoAlmacen();
    }

    if(tipo === "vacas"){

        for(let i = estado.vacas.length - 1; i >= 0; i--){

            if(estado.vacas[i].edad >= 25 && estado.vacas[i].edad <= 34 && eliminados < cantidad){
                estado.vacas.splice(i, 1);
                eliminados++;
            }
        }

        estado.carneVaca += cantidad;
        calcularEspacioUsadoAlmacen();
    }

    cerrarMataderoAnimal();

    mostrarMensaje("🏭 Matadero completado");

    actualizarEdadesGallinas();
    actualizarEdadesVacas();
    actualizarTodo();
}

export function enviarTodasMatadero(){

    const tipo = estado.matadero.tipo;
    const disponibles = contarViejas(tipo);

    const input = document.getElementById("cantidadMatadero");

    if(input){
        input.value = disponibles;
    }

    actualizarPreviewMatadero();
}