// bases.js
import { cotizacion } from "./index.js";
import { db } from "./index.js";
import { calculadora } from "./calculadora.js"; // Importa calculadora

export let calculoFleje = 0;
export let calculoFleje2 = 0;
export let calculoFleje3 = 0;

const flejitos = document.getElementById("flejitos");

let mas1 = 1;

document.getElementById("agregarFleje").addEventListener("click", () => {
  materialFleje();

  mas1++;

  let card = document.createElement("section");

  card.innerHTML = `
     <div class="titulo">
        <h2>Flejes</h2>
      </div>
      <div class="caja">
        <h3>seleccione un fleje</h3>
      </div>
      <div class="opciones">
        <select name="" id="flejes${mas1}">
          <option value="null">Seleccione una opción</option>
          <option value="trimcap">trimcap</option>
          <option value="fleje_aluminio">fleje_aluminio</option>
          <option value="fleje_plastico">fleje_plastico</option>
          <option value="fleje_pvc5mm">fleje_pvc5mm</option>
          <option value="fleje_acrilico_3mm">fleje_acrilico_3mm</option>
        </select>
      </div>
      <div class="medicion">
        <div class="entrada">
          <label for="">metro lineal de fleje</label>
          <input type="number" id="metroLinealFlejes${mas1}">
        </div>

      </div>

      <div class="entrada">
        <label>
          <hr>Precio Material:
          <p id="subFleje${mas1}">wait...</p>
          <hr>
        </label>
      </div>`;

      flejitos.appendChild(card);

  // Agregar eventos a los nuevos elementos

  const nuevaFleje = document.getElementById(`flejes${mas1}`);
  const nuevoMetroLinealFleje = document.getElementById(`metroLinealFleje${mas1}`);

  if (nuevaFleje === document.getElementById("flejes3")) {
    document.getElementById("agregarFleje").style.display = "none";
  }

  if (nuevaFleje) {
    nuevaFleje.addEventListener("change", () => {
      calcularValoresDinamico(nuevaFleje, `subIFleje${mas1}`);
    });
  }

  if (nuevoMetroLinealFleje) {
    nuevoMetroLinealFleje.addEventListener("input", () => {
      calcularValoresDinamico(nuevaFleje, `subIFleje${mas1}`);
    });
  }
});


export async function materialFleje() {
  // Conexión a la base de datos y obtención de la cotización
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.flejes; 


  // Lectura de elementos del DOM
  const lecturaFleje = document.getElementById("flejes");
  const lecturaMetroLinealFleje = document.getElementById("metroLinealFlejes");

  const lecturaFleje2 = document.getElementById("flejes2");
  const lecturaMetroLinealFleje2 = document.getElementById("metroLinealFlejes2");

  const lecturaFleje3 = document.getElementById("flejes3");
  const lecturaMetroLinealFleje3 = document.getElementById("metroLinealFlejes3");

  // Variables globales
  let flejeSeleccionado;
  let cantidadMetrosFleje = 0;

  let flejeSeleccionado2;
  let cantidadMetrosFleje2 = 0;

  let flejeSeleccionado3;
  let cantidadMetrosFleje3 = 0;

  // Escucha cambios en el elemento 'lecturaFleje'
  lecturaFleje.addEventListener("change", () => {
    flejeSeleccionado = lecturaFleje.value;
    calcularValores();
  });

  // Escucha cambios en el elemento 'lecturametroLinealFleje'
  lecturaMetroLinealFleje.addEventListener("input", () => {
    cantidadMetrosFleje = parseFloat(lecturaMetroLinealFleje.value) || 0; // Asegúrate de que sea un número
    calcularValores(); // Recalcula los valores
  });

  if (lecturaFleje2){
  lecturaFleje2.addEventListener("change", () => {
    flejeSeleccionado2 = lecturaFleje2.value;
    calcularValores2();
  });

  // Escucha cambios en el elemento 'lecturametroLinealFleje'
  lecturaMetroLinealFleje2.addEventListener("input", () => {
    cantidadMetrosFleje2 = parseFloat(lecturaMetroLinealFleje2.value) || 0; // Asegúrate de que sea un número
    calcularValores2(); // Recalcula los valores
  });}

  if (lecturaFleje3){
    lecturaFleje3.addEventListener("change", () => {
      flejeSeleccionado3 = lecturaFleje3.value;
      calcularValores3();
    });
  
    // Escucha cambios en el elemento 'lecturametroLinealFleje'
    lecturaMetroLinealFleje3.addEventListener("input", () => {
      cantidadMetrosFleje3 = parseFloat(lecturaMetroLinealFleje3.value) || 0; // Asegúrate de que sea un número
      calcularValores3(); // Recalcula los valores
    });}

  

  // Función para recalcular valores
  function calcularValores() {
    if (costos.hasOwnProperty(flejeSeleccionado)) {
      const precioFleje = costos[flejeSeleccionado]; // Obtener el precio del material
      calculoFleje = precioFleje * cantidadMetrosFleje * dolar; // Cálculo del costo
      const subFleje = document.getElementById('subFleje')
      subFleje.textContent = calculoFleje.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(
        "⚠️ Error: La base seleccionada no existe en la base de datos."
      );
    }
  }


  function calcularValores2() {
    if (costos.hasOwnProperty(flejeSeleccionado2)) {
      const precioFleje2 = costos[flejeSeleccionado2]; // Obtener el precio del material
      calculoFleje2 = precioFleje2 * cantidadMetrosFleje2 * dolar; // Cálculo del costo
      const subFleje2 = document.getElementById('subFleje2')
      subFleje2.textContent = calculoFleje2.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(
        "⚠️ Error: La base seleccionada no existe en la base de datos."
      );
    }
  }

  function calcularValores3() {
    if (costos.hasOwnProperty(flejeSeleccionado3)) {
      const precioFleje3 = costos[flejeSeleccionado3]; // Obtener el precio del material
      calculoFleje3 = precioFleje3 * cantidadMetrosFleje3 * dolar; // Cálculo del costo
      const subFleje3 = document.getElementById('subFleje3')
      subFleje3.textContent = calculoFleje2.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(
        "⚠️ Error: La base seleccionada no existe en la base de datos."
      );
    }
  }
}



async function calcularValoresDinamico(flejeElement, subFlejeId) {
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.flejes; // Extrae solo la categoría "bases"

  const flejeSeleccionada = flejeElement.value;
  const cantidadMetros = parseFloat(flejeElement.nextElementSibling.querySelector('input').value) || 0; // Asegúrate de que sea un número
  if (costos.hasOwnProperty(flejeSeleccionada)) {
    const precioFleje = costos[flejeSeleccionada]; // Obtener el precio del material
    const calculoFleje = precioFleje * cantidadMetros * dolar; // Cálculo del costo
    const subFleje = document.getElementById(subFlejeId);

    if (subFleje) {
      // Formatear el valor y asignarlo al DOM
      subFleje.textContent = calculoFleje.toLocaleString("de-DE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(
        `⚠️ Error: Elemento con ID ${subFlejeId} no encontrado en el DOM.`
      );
    }
  } else {
    console.error(
      "⚠️ Error: La base seleccionada no existe en la base de datos."
    );
  }
}