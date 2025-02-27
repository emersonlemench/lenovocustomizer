// bases.js
import { cotizacion } from "./index.js";
import { db } from "./index.js";
import { calculadora } from "./calculadora.js"; // Importa calculadora

export let calculoEstructura = 0; 
export let calculoEstructura2 = 0; 
export let calculoEstructura3 = 0; 



const fierros = document.getElementById("fierros");

let mas1 = 1;

document.getElementById("agregarEstructura").addEventListener("click", () => {
  materialEstructura();

  mas1++;

  let card = document.createElement("section");

  card.innerHTML = `
       <div class="titulo">
        <h2>Estructuras</h2>
      </div>
      <div class="caja">
        <h3>seleccione la Estructura</h3>
      </div>
      <div class="opciones">
        <select name="" id="estructura${mas1}">
          <option value="null">Seleccione una opción</option>
          <option value="hierro">hierro</option>
          <option value="pvc_revestido_aluminio">pvc_revestido_aluminio</option>
          <option value="mdf_fleje_de_cajas">mdf_fleje_de_cajas</option>
          <option value="acrílico_liston">acrílico_liston</option>
          <option value="mdf_aros">mdf_aros</option>
          <option value="angulo_l_aluminio">angulo_l_aluminio</option>
        </select>
      </div>
      <div class="medicion">
        <div class="entrada">
          <label for="">metro lineal de estructura</label>
          <input type="number" id="metroLinealEstructura${mas1}">
        </div>

      </div>

      <div class="entrada">
        <label>
          <hr>Precio Material:
          <p id="subEstructura${mas1}">wait...</p>
          <hr>
        </label>
      </div>`;

  fierros.appendChild(card);

  // Agregar eventos a los nuevos elementos

  const nuevaEstructura = document.getElementById(`estructura${mas1}`);
  const nuevoMetroLinealEstructura = document.getElementById(`metroLinealEstructura${mas1}`);

  if (nuevaEstructura === document.getElementById("estructura3")) {
    document.getElementById("agregarEstructura").style.display = "none";
  }

  if (nuevaEstructura) {
    nuevaEstructura.addEventListener("change", () => {
      calcularValoresDinamico(nuevaEstructura, `subIEstructura${mas1}`);
    });
  }

  if (nuevoMetroLinealEstructura) {
    nuevoMetroLinealEstructura.addEventListener("input", () => {
      calcularValoresDinamico(nuevaEstructura, `subIEstructura${mas1}`);
    });
  }
});



export async function materialEstructura() {
  // Conexión a la base de datos y obtención de la cotización
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.estructuras; 


  // Lectura de elementos del DOM
  const lecturaEstructura = document.getElementById("estructura");
  const lecturaMetroLinealEstructura = document.getElementById("metroLinealEstructura");

  const lecturaEstructura2 = document.getElementById("estructura2");
  const lecturaMetroLinealEstructura2 = document.getElementById("metroLinealEstructura2");

  const lecturaEstructura3 = document.getElementById("estructura3");
  const lecturaMetroLinealEstructura3 = document.getElementById("metroLinealEstructura3");

  // Variables globales
  let estructuraSeleccionada;
  let cantidadMetrosEstructura = 0;

  let estructuraSeleccionada2;
  let cantidadMetrosEstructura2 = 0;

  let estructuraSeleccionada3;
  let cantidadMetrosEstructura3 = 0;

  // Escucha cambios en el elemento 'lecturaEstructura'
  lecturaEstructura.addEventListener("change", () => {
    estructuraSeleccionada = lecturaEstructura.value;
    calcularValores();
  });

  // Escucha cambios en el elemento 'lecturametroLinealEstructura'
  lecturaMetroLinealEstructura.addEventListener("input", () => {
    cantidadMetrosEstructura = parseFloat(lecturaMetroLinealEstructura.value) || 0; // Asegúrate de que sea un número
    calcularValores(); // Recalcula los valores
  });
  
if (lecturaEstructura2){
  lecturaEstructura2.addEventListener("change", () => {
    estructuraSeleccionada2 = lecturaEstructura2.value;
    calcularValores2();
  });

  // Escucha cambios en el elemento 'lecturametroLinealEstructura'
  lecturaMetroLinealEstructura2.addEventListener("input", () => {
    cantidadMetrosEstructura2 = parseFloat(lecturaMetroLinealEstructura2.value) || 0; // Asegúrate de que sea un número
    calcularValores2(); // Recalcula los valores
  });}

  if (lecturaEstructura3){
    lecturaEstructura3.addEventListener("change", () => {
      estructuraSeleccionada3 = lecturaEstructura3.value;
      calcularValores3();
    });
  
    // Escucha cambios en el elemento 'lecturametroLinealEstructura'
    lecturaMetroLinealEstructura3.addEventListener("input", () => {
      cantidadMetrosEstructura3 = parseFloat(lecturaMetroLinealEstructura3.value) || 0; // Asegúrate de que sea un número
      calcularValores3(); // Recalcula los valores
    });}

  // Función para recalcular valores
  function calcularValores() {
    if (costos.hasOwnProperty(estructuraSeleccionada)) {
      const precioEstructura = costos[estructuraSeleccionada]; // Obtener el precio del material
      calculoEstructura = precioEstructura * cantidadMetrosEstructura * dolar; // Cálculo del costo
      const subEstructura = document.getElementById('subEstructura')
      subEstructura.textContent = calculoEstructura.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });;
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(
        "⚠️ Error: La base seleccionada no existe en la base de datos."
      );
    }
  }

  function calcularValores2() {
    if (costos.hasOwnProperty(estructuraSeleccionada2)) {
      const precioEstructura2 = costos[estructuraSeleccionada2]; // Obtener el precio del material
      calculoEstructura2 = precioEstructura2 * cantidadMetrosEstructura2 * dolar; // Cálculo del costo
      const subEstructura2 = document.getElementById('subEstructura2')
      subEstructura2.textContent = calculoEstructura2.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });;
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(
        "⚠️ Error: La base seleccionada no existe en la base de datos."
      );
    }
  }

  function calcularValores3() {
    if (costos.hasOwnProperty(estructuraSeleccionada3)) {
      const precioEstructura3 = costos[estructuraSeleccionada3]; // Obtener el precio del material
      calculoEstructura3 = precioEstructura3 * cantidadMetrosEstructura3 * dolar; // Cálculo del costo
      const subEstructura3 = document.getElementById('subEstructura3')
      subEstructura3.textContent = calculoEstructura3.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });;
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(
        "⚠️ Error: La base seleccionada no existe en la base de datos."
      );
    }
  }
}
// ________________________________________--
async function calcularValoresDinamico(estructuraElement, subEstructuraId) {
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.estructura; // Extrae solo la categoría "bases"

  const estructuraSeleccionada = estructuraElement.value;
  const cantidadMetros = parseFloat(estructuraElement.nextElementSibling.querySelector('input').value) || 0; // Asegúrate de que sea un número
  if (costos.hasOwnProperty(estructuraSeleccionada)) {
    const precioEstructura = costos[estructuraSeleccionada]; // Obtener el precio del material
    const calculoEstructura = precioEstructura * cantidadMetros * dolar; // Cálculo del costo
    const subEstructura = document.getElementById(subEstructuraId);

    if (subEstructura) {
      // Formatear el valor y asignarlo al DOM
      subEstructura.textContent = calculoEstructura.toLocaleString("de-DE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(
        `⚠️ Error: Elemento con ID ${subEstructuraId} no encontrado en el DOM.`
      );
    }
  } else {
    console.error(
      "⚠️ Error: La base seleccionada no existe en la base de datos."
    );
  }
}