// js/dia.js

import { estado } from './state.js';
import { texto, mostrarPantalla, actualizarTodo } from './ui.js';
import { mercado } from './mercado.js';
import {
    envejecerGallinas,
    producirHuevos,
    envejecerVacas,
    producirLeche
} from './animales.js';
import { guardarPartida } from './save.js';
import { calcularCostoSobrecapacidad } from './almacen.js';

export function siguienteDia(){

    const gallinasMuertasHoy = envejecerGallinas();
    const huevosProducidosHoy = producirHuevos();

    const vacasMuertasHoy = envejecerVacas();
    const lecheProducidaHoy = producirLeche();

    const multaSobrecapacidad = calcularCostoSobrecapacidad();
    estado.dinero = Number((estado.dinero - estado.alquiler - multaSobrecapacidad).toFixed(2));
    estado.dia += 1;

    mercado.actualizarPrecioHuevo();
    mercado.actualizarPanelHuevo();

    texto("gastoAlquiler", "Alquiler: -" + estado.alquiler + "€");
    texto("saldoFinal", "Dinero actual: " + estado.dinero.toFixed(2) + "€");

    texto("ingresosTexto", "Ingresos: +" + estado.ingresosDia.toFixed(2) + "€");
    texto("gastosTexto", "Gastos compras: -" + estado.gastosDia.toFixed(2) + "€");

    texto("produccionHuevosTexto", "Huevos producidos: +" + huevosProducidosHoy);
    texto("gallinasMuertasTexto", "Gallinas muertas: " + gallinasMuertasHoy);

    texto("produccionLecheTexto", "Leche producida: +" + lecheProducidaHoy);
    texto("vacasMuertasTexto", "Vacas muertas: " + vacasMuertasHoy);

    texto("almacenResumenHuevos", "Huevos guardados: " + estado.huevos);
    texto("almacenResumenEspacio", "Espacio usado: " + estado.espacioUsado + "/" + estado.espacioTotal);

    actualizarTodo();

    estado.ingresosDia = 0;
    estado.gastosDia = 0;

    guardarPartida();

    mostrarPantalla("resumen");
}