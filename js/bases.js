// bases.js
import { cotizacion } from "./index.js";
import { db } from "./index.js";
import { calculadora } from "./calculadora.js"; // Importa calculadora

export let calculoBase = 0; // Inicializa calculoBase a 0
export let calculoBase2 = 0; // Inicializa calculoBase a 0
export let calculoBase3 = 0; // Inicializa calculoBase a 0
// ____________________________________________________---

const baselicius = document.getElementById('baselicius');

let mas1 = 1;

document.getElementById('agregarBases').addEventListener('click', () => {

  materialBase()

  
  mas1++;

  let card = document.createElement('section');

  card.innerHTML = `
    <div class="titulo">
          <h2>material base</h2>
        </div>

        <div class="caja">
          <h3>seleccione el material base</h3>
        </div>
        <div class="opciones">
          <select name="" id="bases${mas1}">
            <option value="null">Seleccione una opción</option>
            <option value="acrilico">acrilico</option>
            <option value="pvc">pvc</option>
            <option value="mdf">mdf</option>
            <option value="polyfan">polyfan</option>
            <option value="espejado">espejado</option>
            <option value="acrilico-color">acrilico-color</option>
            <option value="chapa">chapa</option>
            <option value="alucobond">alucobond</option>
          </select>
        </div>
        <div class="medicion">
          <div class="entrada">
            <label for="">ancho</label>
            <input type="number" id="ancho${mas1}">
          </div>
          <div class="entrada">
            <label for="">alto</label>
            <input type="number" id="alto${mas1}">
          </div>

        </div>
        <div class="entrada">
          <label>
            <hr>Precio Material:
            <p id="subAcrilico${mas1}"> wait...</p>
            <hr>
          </label>
        </div>`;
  baselicius.appendChild(card);

  

  // Agregar eventos a los nuevos elementos
  const nuevaBase = document.getElementById(`bases${mas1}`);

  if(nuevaBase === document.getElementById('bases3')){

    document.getElementById('agregarBases').style.display = 'none'
  }

  if (nuevaBase) {
    nuevaBase.addEventListener('change', () => {
      calcularValoresDinamico(nuevaBase, `subAcrilico${mas1}`);
    });
  }else{
    console.log('no hay mas bases')
  }
});

// ____________________________________________---

export async function materialBase() {
  // Conexión a la base de datos y obtención de la cotización
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.bases; // Extrae solo la categoría "bases"

  // Lectura de elementos del DOM
  const lecturaBase = document.getElementById("bases");
  const lecturaAncho = document.getElementById("ancho");
  const lecturaAlto = document.getElementById("alto");

  const lecturaBase2 = document.getElementById("bases2");
  const lecturaAncho2 = document.getElementById("ancho2");
  const lecturaAlto2 = document.getElementById("alto2");

  const lecturaBase3 = document.getElementById("bases3");
  const lecturaAncho3 = document.getElementById("ancho3");
  const lecturaAlto3 = document.getElementById("alto3");

  // Variables globales
  let baseSeleccionada;
  let ancho = 0;
  let alto = 0;

  let baseSeleccionada2;
  let ancho2 = 0;
  let alto2 = 0;

  let baseSeleccionada3;
  let ancho3 = 0;
  let alto3 = 0;

  // Capturar cambios en los elementos de entrada
  lecturaBase.addEventListener("change", () => {
    baseSeleccionada = lecturaBase.value; // Asumimos que el valor es el ID de la base
    calcularValores();
  });

  lecturaAncho.addEventListener("input", () => {
    ancho = parseFloat(lecturaAncho.value) || 0; // Asegúrate de que sea un número
    calcularValores();
  });

  lecturaAlto.addEventListener("input", () => {
    alto = parseFloat(lecturaAlto.value) || 0; // Asegúrate de que sea un número
    calcularValores();
  });

  // ______________________________---
if (lecturaBase2) {
  lecturaBase2.addEventListener("change", () => {
    baseSeleccionada2 = lecturaBase2.value; // Asumimos que el valor es el ID de la base
    calcularValores2();
  });

  lecturaAncho2.addEventListener("input", () => {
    ancho2 = parseFloat(lecturaAncho2.value) || 0; // Asegúrate de que sea un número
    calcularValores2();
  });

  lecturaAlto2.addEventListener("input", () => {
    alto2 = parseFloat(lecturaAlto2.value) || 0; // Asegúrate de que sea un número
    calcularValores2();
  });}

  // --_____________________________--



    // ______________________________---
if (lecturaBase3) {
    lecturaBase3.addEventListener("change", () => {
      baseSeleccionada3 = lecturaBase3.value; // Asumimos que el valor es el ID de la base
      calcularValores3();
    });
  
    lecturaAncho3.addEventListener("input", () => {
      ancho3 = parseFloat(lecturaAncho3.value) || 0; // Asegúrate de que sea un número
      calcularValores3();
    });
  
    lecturaAlto3.addEventListener("input", () => {
      alto3 = parseFloat(lecturaAlto3.value) || 0; // Asegúrate de que sea un número
      calcularValores3();
    });}
    // --_____________________________--


  function calcularValores() {
    const area = ancho * alto;
    const precioBase = document.getElementById('subAcrilico');

    if (costos.hasOwnProperty(baseSeleccionada)) {
      const precioMaterial = costos[baseSeleccionada]; // Obtener el precio del material
      calculoBase = (precioMaterial * area * dolar) / 10000; // Cálculo del costo
      precioBase.textContent = calculoBase.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
    }
  }

  // _______________________________---
  function calcularValores2() {
    const area2 = ancho2 * alto2;
    const precioBase2 = document.getElementById('subAcrilico2');

    if (costos.hasOwnProperty(baseSeleccionada2)) {
      const precioMaterial2 = costos[baseSeleccionada2]; // Obtener el precio del material
      calculoBase2 = (precioMaterial2 * area2 * dolar) / 10000; // Cálculo del costo
      precioBase2.textContent = calculoBase2.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
    }
  }
  // __________________________________---


  function calcularValores3() {
    const area3 = ancho3 * alto3;
    const precioBase3 = document.getElementById('subAcrilico3');

    if (costos.hasOwnProperty(baseSeleccionada3)) {
      const precioMaterial3 = costos[baseSeleccionada3]; // Obtener el precio del material
      calculoBase3 = (precioMaterial3 * area3 * dolar) / 10000; // Cálculo del costo
      precioBase3.textContent = calculoBase3.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
    }
  }
  // __________________________________---
}

async function calcularValoresDinamico(baseElement, subBaseId) {
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.alimentacion; // Extrae solo la categoría "alimentacion"

  const baseSeleccionada = baseElement.value;
  if (costos.hasOwnProperty(baseSeleccionada)) {
    const precioBase = costos[baseSeleccionada]; // Obtener el precio del material
    const calculoBase = (precioBase * dolar); // Cálculo del costo
    const subBase = document.getElementById(subBaseId);

    // Formatear el valor y asignarlo al DOM
    subBase.textContent = calculoBase.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    
    calculadora(); // Llama a calculadora para mostrar el nuevo valor
  } else {
    console.error("⚠️ Error: La base seleccionada no existe en la base de datos.");
  }
}
