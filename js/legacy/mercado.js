// js/mercado.js
import { estado } from './state.js';
import { reproducirMonedas, mostrarMensaje, actualizarTodo } from './ui.js';
import { calcularEspacioUsadoAlmacen } from './almacen.js';

export const mercado = {

    actualizarPrecioHuevo(){

        estado.precioHuevo =
        (Math.random() * (0.80 - 0.30) + 0.30);

        estado.historialHuevo.push(
            Number(estado.precioHuevo.toFixed(2))
        );

        if(estado.historialHuevo.length > 10){
            estado.historialHuevo.shift();
        }

    },

    getPromedioHuevo(){

        let suma = 0;

        estado.historialHuevo.forEach(function(precio){
            suma += precio;
        });

        return suma / estado.historialHuevo.length;

    },

    actualizarPanelHuevo(){

        document.getElementById("detallePrecio").innerHTML =
        estado.precioHuevo.toFixed(2) + "€";

        document.getElementById("detallePromedio").innerHTML =
        mercado.getPromedioHuevo().toFixed(2) + "€";

        let historial =
        document.getElementById("historialTexto");

        if(historial){
            historial.innerHTML = "📈 Gráfico próximamente";
        }

    },

    comprarHuevos(){

        reproducirMonedas();

        let cantidad =
        Number(document.getElementById("cantidadHuevo").value);

        let costoTotal =
        cantidad * estado.precioHuevo;

        if(cantidad <= 0){
            alert("Escribe una cantidad válida");
            return;
        }

        if(costoTotal > estado.dinero){
            alert("No tienes suficiente dinero");
            return;
        }


        estado.dinero =
        Number((estado.dinero - costoTotal).toFixed(2));

        estado.huevos += cantidad;
        calcularEspacioUsadoAlmacen();

        estado.gastosDia =
        Number((estado.gastosDia + costoTotal).toFixed(2));

        mostrarMensaje("🥚 Huevos comprados");
        actualizarTodo();
        mercado.actualizarPanelHuevo();

    },

    venderHuevos(){

        reproducirMonedas();

        let cantidad =
        Number(document.getElementById("cantidadHuevo").value);

        let gananciaTotal =
        cantidad * estado.precioHuevo;

        if(cantidad <= 0){
            alert("Escribe una cantidad válida");
            return;
        }

        if(cantidad > estado.huevos){
            alert("No tienes suficientes huevos");
            return;
        }

        estado.dinero =
        Number((estado.dinero + gananciaTotal).toFixed(2));

        estado.huevos -= cantidad;
        calcularEspacioUsadoAlmacen();

        estado.ingresosDia =
        Number((estado.ingresosDia + gananciaTotal).toFixed(2));

        mostrarMensaje("💰 Huevos vendidos");
        actualizarTodo();
        mercado.actualizarPanelHuevo();

    },

    venderCarne(){

        reproducirMonedas();

        let cantidad =
        Number(document.getElementById("cantidadCarne").value);

        if(cantidad <= 0){
            alert("Escribe una cantidad válida");
            return;
        }

        if(cantidad > estado.carnePollo){
            alert("No tienes suficiente carne de pollo");
            return;
        }

        let ganancia =
        cantidad * estado.precioCarne;

        estado.dinero =
        Number((estado.dinero + ganancia).toFixed(2));

        estado.carnePollo -= cantidad;
        calcularEspacioUsadoAlmacen();

        estado.ingresosDia =
        Number((estado.ingresosDia + ganancia).toFixed(2));

        mostrarMensaje("💰 Carne vendida");
        actualizarTodo();

    },

    seleccionarProducto(producto){

        let filas =
        document.querySelectorAll(".filaMercado");

        filas.forEach(function(fila){
            fila.classList.remove("filaSeleccionada");
        });

        let panel =
        document.querySelector(".panelGraficoMercado");

        if(panel){
            panel.classList.remove("panelAnimado");
            void panel.offsetWidth;
            panel.classList.add("panelAnimado");
        }

        if(producto === "huevo"){

            filas[1].classList.add("filaSeleccionada");

            document.getElementById("detalleIcono").innerHTML =
            "🥚";

            document.getElementById("detalleNombre").innerHTML =
            "HUEVO";

            document.getElementById("detalleDescripcion").innerHTML =
            "Producto básico de la granja";

            document.getElementById("detallePrecio").innerHTML =
            estado.precioHuevo.toFixed(2) + "€";

            document.getElementById("detalleTendencia").innerHTML =
            "📈 Subiendo";

            mercado.actualizarPanelHuevo();

        }

        if(producto === "carne"){

            filas[2].classList.add("filaSeleccionada");

            document.getElementById("detalleIcono").innerHTML =
            "🍗";

            document.getElementById("detalleNombre").innerHTML =
            "CARNE POLLO";

            document.getElementById("detalleDescripcion").innerHTML =
            "Producto obtenido en el matadero";

            document.getElementById("detallePrecio").innerHTML =
            estado.precioCarne + "€";

            document.getElementById("detalleTendencia").innerHTML =
            "📉 Bajando";

            document.getElementById("detallePromedio").innerHTML =
            estado.precioCarne + "€";

        }

    }

};

window.mercado = mercado;

window.comprarHuevos = mercado.comprarHuevos;
window.venderHuevos = mercado.venderHuevos;
window.venderCarne = mercado.venderCarne;
window.seleccionarProducto = mercado.seleccionarProducto;