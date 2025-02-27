import { cotizacion } from "./index.js";
import { db } from "./index.js";
import { calculadora } from "./calculadora.js"; // Importa calculadora

export let calculoIntervencion = 0; // Inicializa calculoIntervencion a 0
export let calculoIntervencion2 = 0; // Inicializa calculoIntervencion2 a 0
export let calculoIntervencion3 = 0; // Inicializa calculoIntervencion3 a 0

const interMilan = document.getElementById('interMilan');

let mas1 = 1;

document.getElementById('agregarIntervencion').addEventListener('click', () => {

  materialIntervencion()

  
  mas1++;

  let card = document.createElement('section');

  card.innerHTML = `
    <div class="titulo">
        <h2>Intervneción (realce)</h2>
      </div>
      <div class="caja">
        <h3>seleccione el material</h3>
      </div>
      <div class="opciones">
        <select name="" id="intervencion${mas1}">
          <option value="null">Seleccione una opción</option>
          <option value="vinilo_impreso">vinilo_impreso</option>
          <option value="vinilo_corte">vinilo_corte</option>
          <option value="polarizado">polarizado</option>
          <option value="pintura">pintura</option>
          <option value="detalles">detalles</option>
        </select>
      </div>
      <div class="medicion">
        <div class="entrada">
          <label for="">ancho</label>
          <input type="number" id="ancho1${mas1}">
        </div>
        <div class="entrada">
          <label for="">alto</label>
          <input type="number" id="alto1${mas1}">
        </div>
      </div>

      <div class="entrada">
        <label>
          <hr>Precio Material:
          <p id="subRealce${mas1}"> wait...</p>
          <hr>
        </label>
      </div>`;

  interMilan.appendChild(card);

  

  // Agregar eventos a los nuevos elementos
  const nuevaInter = document.getElementById(`intervencion${mas1}`);

  if (nuevaInter === document.getElementById("intervencion3")) {
    document.getElementById("agregarIntervencion").style.display = "none";
  }

  if (nuevaInter) {
    nuevaInter.addEventListener('change', () => {
      calcularValoresDinamico(nuevaInter, `subIntervencion${mas1}`);
    });
  }else{
    console.log('no hay mas inter')
  }
});

export async function materialIntervencion() {
  // Conexión a la base de datos y obtención de la cotización
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.intervencion; // Extrae solo la categoría "bases"
  

  // Lectura de elementos del DOM
  const lecturaIntervencion = document.getElementById("intervencion");
  const lecturaAncho1 = document.getElementById("ancho1");
  const lecturaAlto1 = document.getElementById("alto1");

  const lecturaIntervencion2 = document.getElementById("intervencion2");
  const lecturaAncho12 = document.getElementById("ancho12");
  const lecturaAlto12 = document.getElementById("alto12");

  const lecturaIntervencion3 = document.getElementById("intervencion3");
  const lecturaAncho13 = document.getElementById("ancho13");
  const lecturaAlto13 = document.getElementById("alto13");

  // Variables globales
  let intervencionSeleccionada;
  let ancho1 = 0;
  let alto1 = 0;

  let intervencionSeleccionada2;
  let ancho12 = 0;
  let alto12 = 0;

  let intervencionSeleccionada3;
  let ancho13 = 0;
  let alto13 = 0;

  // Capturar cambios en los elementos de entrada
  lecturaIntervencion.addEventListener("change", () => {
    intervencionSeleccionada = lecturaIntervencion.value; // Asumimos que el valor es el ID de la base
    calcularValores();
  });

  lecturaAncho1.addEventListener("input", () => {
    ancho1 = parseFloat(lecturaAncho1.value) || 0; // Asegúrate de que sea un número
    calcularValores();
  });

  lecturaAlto1.addEventListener("input", () => {
    alto1 = parseFloat(lecturaAlto1.value) || 0; // Asegúrate de que sea un número
    calcularValores();
  });

if(lecturaIntervencion2){
  lecturaIntervencion2.addEventListener("change", () => {
    intervencionSeleccionada2 = lecturaIntervencion2.value; // Asumimos que el valor es el ID de la base
    calcularValores2();
  });
  

  lecturaAncho12.addEventListener("input", () => {
    ancho12 = parseFloat(lecturaAncho12.value) || 0; // Asegúrate de que sea un número
    calcularValores2();
  });

  lecturaAlto12.addEventListener("input", () => {
    alto12 = parseFloat(lecturaAlto12.value) || 0; // Asegúrate de que sea un número
    calcularValores2();
  });


}


if(lecturaIntervencion3){
  lecturaIntervencion3.addEventListener("change", () => {
    intervencionSeleccionada3 = lecturaIntervencion3.value; // Asumimos que el valor es el ID de la base
    calcularValores3();
  });
  

  lecturaAncho13.addEventListener("input", () => {
    ancho13 = parseFloat(lecturaAncho13.value) || 0; // Asegúrate de que sea un número
    calcularValores3();
  });

  lecturaAlto13.addEventListener("input", () => {
    alto13 = parseFloat(lecturaAlto13.value) || 0; // Asegúrate de que sea un número
    calcularValores3();
  });

}



  function calcularValores() {
    const subRealce = document.getElementById('subRealce')
    const area1 = ancho1 * alto1;

    if (costos.hasOwnProperty(intervencionSeleccionada)) {
      const precioIntervencion = costos[intervencionSeleccionada]; // Obtener el precio del material
      calculoIntervencion = (precioIntervencion * area1 * dolar) / 10000; // Cálculo del costo
      subRealce.textContent = calculoIntervencion.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
    }
  }

  function calcularValores2() {
    const subRealce2 = document.getElementById('subRealce2')
    const area12 = ancho12 * alto12;

    if (costos.hasOwnProperty(intervencionSeleccionada2)) {
      const precioIntervencion2 = costos[intervencionSeleccionada2]; // Obtener el precio del material
      calculoIntervencion2 = (precioIntervencion2 * area12 * dolar) / 10000; // Cálculo del costo
      subRealce2.textContent = calculoIntervencion2.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
    }
  }

  function calcularValores3() {
    const subRealce3 = document.getElementById('subRealce3')
    const area13 = ancho13 * alto13;

    if (costos.hasOwnProperty(intervencionSeleccionada3)) {
      const precioIntervencion3 = costos[intervencionSeleccionada3]; // Obtener el precio del material
      calculoIntervencion3 = (precioIntervencion3 * area13 * dolar) / 10000; // Cálculo del costo
      subRealce3.textContent = calculoIntervencion3.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
    }
  }


}

async function calcularValoresDinamico(interElement, subInterId) {
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.intervencion; // Extrae solo la categoría "bases"

  const intervencionSeleccionada = interElement.value;
  if (costos.hasOwnProperty(intervencionSeleccionada)) {
    const precioIntervencion = costos[intervencionSeleccionada]; // Obtener el precio del material
    const calculoIntervencion = (precioIntervencion * dolar); // Cálculo del costo
    const subIntervencion = document.getElementById(subInterId);

    if (subIntervencion) {
      // Formatear el valor y asignarlo al DOM
      subIntervencion.textContent = calculoIntervencion.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(`⚠️ Error: Elemento con ID ${subInterId} no encontrado en el DOM.`);
    }
  } else {
    console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
  }
}