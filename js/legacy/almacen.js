// js/almacen.js
// Almacén, capacidad y ampliaciones.

import { estado } from './state.js';
import { mostrarMensaje, actualizarTodo, texto } from './ui.js';

export function ampliarAlmacen(){
    if(estado.dinero < estado.costoAmpliacion){
        alert("No tienes suficiente dinero");
        return;
    }

    estado.dinero = Number((estado.dinero - estado.costoAmpliacion).toFixed(2));
    estado.gastosDia = Number((estado.gastosDia + estado.costoAmpliacion).toFixed(2));

    estado.espacioTotal += 5;
    estado.alquiler += 4;
    estado.costoAmpliacion = Math.round(estado.costoAmpliacion * 1.30);

    texto("costoAmpliacionTexto", "Costo: " + estado.costoAmpliacion + "€");
    mostrarMensaje("📦 Almacén ampliado");
    actualizarTodo();
}


// ALMACEN V2 - LOTES + SOBRECAPACIDAD
export const ALMACEN_LOTES = {
    huevos: 10,
    leche: 5,
    lana: 5,
    queso: 2,
    carnePollo: 2,
    carneVaca: 1,
    carneOveja: 1,
    paquetePollo: 2
};

export function calcularEspacioUsadoAlmacen(){
    const productos = [
        { cantidad: estado.huevos, lote: ALMACEN_LOTES.huevos },
        { cantidad: estado.leche, lote: ALMACEN_LOTES.leche },
        { cantidad: estado.lana, lote: ALMACEN_LOTES.lana },
        { cantidad: estado.carnePollo, lote: ALMACEN_LOTES.carnePollo },
        { cantidad: estado.carneVaca, lote: ALMACEN_LOTES.carneVaca },
        { cantidad: estado.paquetePollo, lote: ALMACEN_LOTES.paquetePollo }
    ];

    let total = 0;
    productos.forEach((producto) => {
        const cantidad = Math.max(0, Number(producto.cantidad || 0));
        if(cantidad > 0){
            total += Math.ceil(cantidad / producto.lote);
        }
    });

    estado.espacioUsado = total;
    return total;
}

export function calcularSobrecapacidadAlmacen(){
    return Math.max(0, calcularEspacioUsadoAlmacen() - estado.espacioTotal);
}

export function calcularCostoSobrecapacidad(){
    const exceso = calcularSobrecapacidadAlmacen();
    let costo = 0;

    for(let i = 1; i <= exceso; i++){
        if(i <= 2) costo += 2;
        else if(i <= 5) costo += 4;
        else costo += 8;
    }

    estado.costoSobrecapacidad = costo;
    return costo;
}
