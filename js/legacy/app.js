// js/app.js
import { estado } from './state.js';
import * as ui from './ui.js';
import { mercado } from './mercado.js';
import { guardarPartida, cargarPartida, borrarPartida, continuarPartida } from './save.js';
import * as animales from './animales.js';
import { siguienteDia } from './dia.js';
import * as corrales from './corrales.js';
// Aquí irá el resto de la lógica de tu juego (como los bucles principales, 
// o funciones que aún no hemos migrado como las de los animales).
// Como ya importamos { mercado }, ahora puedes usar mercado.venderTodosLosHuevos() 
// desde tus botones HTML sin problemas.

console.log("Granja Tycoon cargado con módulos");

// Exponer funciones globales para el HTML
window.ui = {
    abrirTienda: () => document.getElementById('tienda').style.display = 'block', // Ajusta según tu lógica real
    abrirAlmacen: () => document.getElementById('almacenPantalla').style.display = 'block',
    abrirCorrales: () => document.getElementById('corralesPantalla').style.display = 'block',
    volverPrincipal: () => { /* tu lógica para volver */ },
    reproducirClick: () => document.getElementById('sonidoClick').play()
};

window.guardarPartida = guardarPartida;
window.cargarPartida = cargarPartida;
window.borrarPartida = borrarPartida;
window.continuarPartida = continuarPartida;
window.abrirCorrales = ui.abrirCorrales;
window.volverPrincipalDesdeCorrales = ui.volverPrincipalDesdeCorrales;
window.cerrarMatadero = ui.cerrarMatadero;
window.abrirAlmacen = ui.abrirAlmacen;
window.volverPrincipalDesdeAlmacen = ui.volverPrincipalDesdeAlmacen;
window.cerrarResumen = ui.cerrarResumen;
window.abrirProductos = ui.abrirProductos;
window.volverTienda = ui.volverTienda;
window.nuevaPartida = ui.nuevaPartida;
window.elegirPequeno = ui.elegirPequeno;
window.elegirGrande = ui.elegirGrande;

window.mercado = mercado;
window.animales = animales;
window.abrirTienda = ui.abrirTienda;
window.volverPrincipal = ui.volverPrincipal;
window.comprarGallina = animales.comprarGallina;
window.comprarVaca = animales.comprarVaca;
window.recogerLeche = animales.recogerLeche;
window.actualizarEdadesVacas = animales.actualizarEdadesVacas;
window.recogerHuevos = animales.recogerHuevos;
window.abrirMatadero = animales.abrirMatadero;
window.cerrarMatadero = animales.cerrarMatadero;
window.confirmarMatadero = animales.confirmarMatadero;
window.adminGallinasViejas = animales.adminGallinasViejas;

window.adminGallinasViejas = animales.adminGallinasViejas;

window.abrirMataderoAnimal = animales.abrirMataderoAnimal;
window.cerrarMataderoAnimal = animales.cerrarMataderoAnimal;
window.actualizarPreviewMatadero = animales.actualizarPreviewMatadero;
window.procesarMatadero = animales.procesarMatadero;
window.enviarTodasMatadero = animales.enviarTodasMatadero;

window.siguienteDia = siguienteDia;
window.renderizarCorrales = corrales.renderizarCorrales;
window.comprarCorral = corrales.comprarCorral;
window.mejorarCorral = corrales.mejorarCorral;
window.abrirGestionCorral = corrales.abrirGestionCorral;

window.abrirCorrales = function(){
    corrales.renderizarCorrales();
    ui.abrirCorrales();
};