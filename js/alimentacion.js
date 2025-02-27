// bases.js
import { cotizacion } from "./index.js";
import { db } from "./index.js";
import { calculadora } from "./calculadora.js"; // Importa calculadora




//________________________________________

const energy = document.getElementById('energia');

let mas1 = 1;

document.getElementById('duplicarFuentes').addEventListener('click', () => {

  amperajeAlimentacion()
  mas1++;

  let card = document.createElement('section');

  card.innerHTML = `
    <div class="titulo">
      <h2>Fuente</h2>
    </div>
    <div class="caja">
      <h3>Seleccione la fuente</h3>
    </div>
    <div class="opciones" id="selectFuente${mas1}">
      <select name="" id="fuente${mas1}">
        <option value="null" id="fuenteAutoasiganada${mas1}">Seleccione una opción</option>
        <option value="sin_fuente">sin_fuente</option>
        <option value="fuente2">fuente2</option>
        <option value="fuente5">fuente5</option>
        <option value="fuente10">fuente10</option>
        <option value="fuente20">fuente20</option>
        <option value="fuente30">fuente30</option>
        <option value="fuente40">fuente40</option>
        <option value="fuente60">fuente60</option>
      </select>
    </div>
    <div class="entrada">
      <label>
        <hr>Precio Material:
        <p id="subFuente${mas1}"> wait...</p>
        <hr>
      </label>
    </div>`;

  energy.appendChild(card);

  

  // Agregar eventos a los nuevos elementos
  const nuevaFuente = document.getElementById(`fuente${mas1}`);

  
  if(nuevaFuente === document.getElementById('fuente3')){

    document.getElementById('duplicarFuentes').style.display = 'none'
  }

  if (nuevaFuente) {
    nuevaFuente.addEventListener('change', () => {
      calcularValoresDinamico(nuevaFuente, `subFuente${mas1}`);
    });
  }
});

export let calculoIAlimentacion = 0; // Inicializa calculoIAlimentacion a 0
export let calculoIAlimentacion2 = 0; // Inicializa calculoIAlimentacion a 0
export let calculoIAlimentacion3 = 0; // Inicializa calculoIAlimentacion a 0

//___________________________________________________

export async function amperajeAlimentacion() {
  // Conexión a la base de datos y obtención de la cotización
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.alimentacion; // Extrae solo la categoría "alimentacion"

  // Lectura de elementos del DOM
  const lecturaAlimentacion = document.getElementById("fuente");
  const lecturaAlimentacion2 = document.getElementById("fuente2");
  const lecturaAlimentacion3 = document.getElementById("fuente3");

  // Variables globales
  let alimentacionSeleccionada;
  let alimentacionSeleccionada2;
  let alimentacionSeleccionada3;

  // Capturar cambios en los elementos de entrada
  if (lecturaAlimentacion) {
    lecturaAlimentacion.addEventListener("change", () => {
      alimentacionSeleccionada = lecturaAlimentacion.value; // Asumimos que el valor es el ID de la base
      calcularValores();
    });
  }
  if (lecturaAlimentacion2) {
    lecturaAlimentacion2.addEventListener("change", () => {
      alimentacionSeleccionada2 = lecturaAlimentacion2.value; // Asumimos que el valor es el ID de la base
      calcularValores2();
    });
  }
  if (lecturaAlimentacion3) {
    lecturaAlimentacion3.addEventListener("change", () => {
      alimentacionSeleccionada3 = lecturaAlimentacion3.value; // Asumimos que el valor es el ID de la base
      calcularValores3();
    });
  }

  function calcularValores() {
    if (costos.hasOwnProperty(alimentacionSeleccionada)) {
      const precioAlimentacion = costos[alimentacionSeleccionada]; // Obtener el precio del material
      calculoIAlimentacion = (precioAlimentacion * dolar); // Cálculo del costo
      const subFuente = document.getElementById('subFuente');

      // Formatear el valor y asignarlo al DOM
      subFuente.textContent = calculoIAlimentacion.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
    }
  }

  function calcularValores2() {
    if (costos.hasOwnProperty(alimentacionSeleccionada2)) {
      const precioAlimentacion2 = costos[alimentacionSeleccionada2]; // Obtener el precio del material
      calculoIAlimentacion2 = (precioAlimentacion2 * dolar); // Cálculo del costo
      const subFuente2 = document.getElementById('subFuente2');

      // Formatear el valor y asignarlo al DOM
      subFuente2.textContent = calculoIAlimentacion2.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
    }
  }

  function calcularValores3() {
    if (costos.hasOwnProperty(alimentacionSeleccionada3)) {
      const precioAlimentacion3 = costos[alimentacionSeleccionada3]; // Obtener el precio del material
      calculoIAlimentacion3 = (precioAlimentacion3 * dolar); // Cálculo del costo
      const subFuente3 = document.getElementById('subFuente3');

      // Formatear el valor y asignarlo al DOM
      subFuente3.textContent = calculoIAlimentacion3.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
    }
  }
}

// Función para calcular valores dinámicamente para nuevas fuentes
async function calcularValoresDinamico(fuenteElement, subFuenteId) {
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.alimentacion; // Extrae solo la categoría "alimentacion"

  const alimentacionSeleccionada = fuenteElement.value;
  if (costos.hasOwnProperty(alimentacionSeleccionada)) {
    const precioAlimentacion = costos[alimentacionSeleccionada]; // Obtener el precio del material
    const calculoIAlimentacion = (precioAlimentacion * dolar); // Cálculo del costo
    const subFuente = document.getElementById(subFuenteId);

    // Formatear el valor y asignarlo al DOM
    subFuente.textContent = calculoIAlimentacion.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    
    calculadora(); // Llama a calculadora para mostrar el nuevo valor
  } else {
    console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
  }
}

