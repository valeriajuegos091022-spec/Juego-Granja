// js/state.js
// Estado global único del juego.
// Todos los módulos importan y modifican este mismo objeto.

export const estado = {
    dinero: 100,
    dia: 1,

    // Productos
    huevos: 0,
    leche: 0,
    carnePollo: 0,
    carneVaca: 0,
    paquetePollo: 0,
    lana: 0,

    // Animales
    gallinas: [],
    vacas: [],

    gallinaSeleccionada: -1,
    vacaSeleccionada: -1,

    matadero: {
    tipo: null
    
    },

    huevosPendientes: 0,
    lechePendiente: 0,

    // Almacén
    espacioUsado: 0,
    espacioTotal: 10,
    costoSobrecapacidad: 0,

    // Mercado
    precioHuevo: 0.50,
    historialHuevo: [0.50],

    precioLeche: 0.80,
    historialLeche: [0.80],

    precioCarne: 8,
    precioCarneVaca: 35,

    // Costos
    alquiler: 10,
    costoAmpliacion: 60,

    ingresosDia: 0,
    gastosDia: 0,

    // Corrales / edificios de animales
    corrales: {
        gallinas: {
            comprado: true,
            nivel: 1,
            capacidad: 10,
            costoMejora: 80
        },

        vacas: {
            comprado: false,
            nivel: 0,
            capacidad: 0,
            costoCompra: 150,
            costoMejora: 220
        },

        ovejas: {
            comprado: false,
            nivel: 0,
            capacidad: 0,
            costoCompra: 90,
            costoMejora: 140
        }
    }
};