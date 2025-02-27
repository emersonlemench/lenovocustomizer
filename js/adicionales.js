// Adicionals.js
import { cotizacion } from "./index.js";
import { db } from "./index.js";
import { calculadora } from "./calculadora.js"; // Importa calculadora

export let calculoAdicional = 0; // Inicializa calculoAdicional a 0
export let calculoAdicional2 = 0; // Inicializa calculoAdicional a 0
export let calculoAdicional3 = 0; // Inicializa calculoAdicional a 0


export let valorExtra = 0;

// Elemento de entrada para el valor extra
const leerExtra = document.getElementById('extra')

leerExtra.addEventListener("input", () => {
  valorExtra = parseFloat(leerExtra.value) || 0; // Asegúrate de que sea un número
  extravalue()
});

const extravalue = () => {
calculadora()
}

const adicto = document.getElementById('adicto');

let mas1 = 1;

document.getElementById('agregarAdicionales').addEventListener('click', () => {

  materialAdicional()

  
  mas1++;

  let card = document.createElement('section');

  card.innerHTML = `
   <div class="titulo">
        <h2>Adicionales</h2>
      </div>
      <div class="caja">
        <h3>Seleccione Adicionales</h3>
      </div>
      <div class="opciones">
        <select name="" id="adicionales${mas1}">
          <option value="null">Seleccione una opción</option>
          <option value="sellado_exterior">sellado_exterior</option>
          <option value="caja_exterior">caja_exterior</option>
          <option value="caja_mdf">caja_mdf</option>
          <option value="caja_pvc">caja_pvc</option>

        </select>
      </div>
      <div class="medicion">
        <div class="entrada">
          <label for="">ancho</label>
          <input type="number" id="ancho2${mas1}">
        </div>
        <div class="entrada">
          <label for="">alto</label>
          <input type="number" id="alto2${mas1}">
        </div>


      </div>

      <div class="entrada ">
        <label>
          <hr>Precio Material:
          <p id="subAdd${mas1}">wait...</p>
          <hr>
        </label>
      </div>`;
  adicto.appendChild(card);

  

  // Agregar eventos a los nuevos elementos
  const nuevaAdicion = document.getElementById(`adicionales${mas1}`);

  if(nuevaAdicion === document.getElementById('adicionales3')){

    document.getElementById('agregarAdicionales').style.display = 'none'
  }

  if (nuevaAdicion) {
    nuevaAdicion.addEventListener('change', () => {
      calcularValoresDinamico(nuevaAdicion, `subAdd${mas1}`);
    });
  }else{
    console.log('no hay mas adicionales')
  }
});

export async function materialAdicional() {
  // Conexión a la Adicional de datos y obtención de la cotización
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.adicionales; // Extrae solo la categoría "Adicionals"

  // Lectura de elementos del DOM
  const lecturaAdicional = document.getElementById("adicionales");
  const lecturaAncho2 = document.getElementById("ancho2");
  const lecturaAlto2 = document.getElementById("alto2");

  const lecturaAdicional2 = document.getElementById("adicionales2");
  const lecturaAncho22 = document.getElementById("ancho22");
  const lecturaAlto22 = document.getElementById("alto22");

  const lecturaAdicional3 = document.getElementById("adicionales3");
  const lecturaAncho23 = document.getElementById("ancho23");
  const lecturaAlto23 = document.getElementById("alto23");

  // Variables globales
  let adicionalSeleccionada;
  let ancho2 = 0;
  let alto2 = 0;
 

  let adicionalSeleccionada2;
  let ancho22 = 0;
  let alto22 = 0;

  let adicionalSeleccionada3;
  let ancho23 = 0;
  let alto23 = 0;

  // Capturar cambios en los elementos de entrada
  lecturaAdicional.addEventListener("change", () => {
    adicionalSeleccionada = lecturaAdicional.value; // Asumimos que el valor es el ID de la Adicional
    calcularValores();
  });

  lecturaAncho2.addEventListener("input", () => {
    ancho2 = parseFloat(lecturaAncho2.value) || 0; // Asegúrate de que sea un número
    calcularValores();
  });

  lecturaAlto2.addEventListener("input", () => {
    alto2 = parseFloat(lecturaAlto2.value) || 0; // Asegúrate de que sea un número
    calcularValores();
  });




  if(lecturaAdicional2){
    lecturaAdicional2.addEventListener("change", () => {
      adicionalSeleccionada2 = lecturaAdicional2.value; // Asumimos que el valor es el ID de la Adicional
      calcularValores2();
    });
  
    lecturaAncho22.addEventListener("input", () => {
      ancho22 = parseFloat(lecturaAncho22.value) || 0; // Asegúrate de que sea un número
      calcularValores2();
    });
  
    lecturaAlto22.addEventListener("input", () => {
      alto22 = parseFloat(lecturaAlto22.value) || 0; // Asegúrate de que sea un número
      calcularValores2();
    });
  }



  if(lecturaAdicional3){
    lecturaAdicional3.addEventListener("change", () => {
      adicionalSeleccionada3 = lecturaAdicional3.value; // Asumimos que el valor es el ID de la Adicional
      calcularValores3();
    });
  
    lecturaAncho23.addEventListener("input", () => {
      ancho23 = parseFloat(lecturaAncho23.value) || 0; // Asegúrate de que sea un número
      calcularValores3();
    });
  
    lecturaAlto23.addEventListener("input", () => {
      alto23 = parseFloat(lecturaAlto23.value) || 0; // Asegúrate de que sea un número
      calcularValores3();
    });
  }



  function calcularValores() {
    const area2 = ancho2 * alto2;

    if (costos.hasOwnProperty(adicionalSeleccionada)) {
      const precioMaterial2 = costos[adicionalSeleccionada]; // Obtener el precio del material
      calculoAdicional = (precioMaterial2 * area2 * dolar) / 10000; // Cálculo del costo
      const subAdd = document.getElementById('subAdd');
      subAdd.textContent = calculoAdicional.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error("⚠️ Error: La Adicional seleccionada no existe en la Adicional de datos.");
    }
  }


  function calcularValores2() {
    const area22 = ancho22 * alto22;

    if (costos.hasOwnProperty(adicionalSeleccionada2)) {
      const precioMaterial22 = costos[adicionalSeleccionada2]; // Obtener el precio del material
      calculoAdicional2 = (precioMaterial22 * area22 * dolar) / 10000; // Cálculo del costo
      const subAdd2 = document.getElementById('subAdd2');
      subAdd2.textContent = calculoAdicional2.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error("⚠️ Error: La Adicional seleccionada no existe en la Adicional de datos.");
    }
  }

  function calcularValores3() {
    const area23 = ancho23 * alto23;

    if (costos.hasOwnProperty(adicionalSeleccionada3)) {
      const precioMaterial23 = costos[adicionalSeleccionada3]; // Obtener el precio del material
      calculoAdicional3 = (precioMaterial23 * area23 * dolar) / 10000; // Cálculo del costo
      const subAdd3 = document.getElementById('subAdd3');
      subAdd3.textContent = calculoAdicional3.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error("⚠️ Error: La Adicional seleccionada no existe en la Adicional de datos.");
    }
  }
 
}

async function calcularValoresDinamico(adicionalElement, subAdicionalId) {
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.adicionales; // Extrae solo la categoría "alimentacion"

  const adicionalSeleccionada = adicionalElement;
  if (costos.hasOwnProperty(adicionalSeleccionada)) {
    const precioAdicional = costos[adicionalSeleccionada]; // Obtener el precio del material
    const calculoAdicional = (precioAdicional * dolar); // Cálculo del costo
    const subAdicional = document.getElementById(subAdicionalId);

    // Formatear el valor y asignarlo al DOM
    subAdicional.textContent = calculoAdicional.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    
    calculadora(); // Llama a calculadora para mostrar el nuevo valor
  } else {
    console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
  }
}