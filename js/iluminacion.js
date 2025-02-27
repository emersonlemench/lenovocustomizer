import { cotizacion } from "./index.js";
import { db } from "./index.js";
import { calculadora } from "./calculadora.js"; // Importa calculadora

export let calculoIluminacion = 0; // Inicializa calculoIluminacion a 0
export let calculoIluminacion2 = 0; // Inicializa calculoIluminacion2 a 0
export let calculoIluminacion3 = 0; // Inicializa calculoIluminacion3 a 0

const iluminati = document.getElementById("iluminati");

let mas1 = 1;

document.getElementById("masIluminacion").addEventListener("click", () => {
  materialIluminacion();

  mas1++;

  let card = document.createElement("section");

  card.innerHTML = `
      <div class="titulo">
          <h2>Iluminación</h2>
        </div>
        <div class="caja">
          <h3>seleccione la iluminacion</h3>
        </div>
        <div class="opciones">
          <select name="" id="iluminacion${mas1}">
            <option value="null">Seleccione una opción</option>
            <option value="neon">neon</option>
            <option value="rgb">rgb</option>
            <option value="pixel">pixel</option>
            <option value="tira_led">tira_led</option>
            <option value="tira_led_rgb">tira_led_rgb</option>
            <option value="tira_led_pixel">tira_led_pixel</option>
            <option value="neon_360">neon_360</option>
            <option value="tubos">tubos</option>
            <option value="liston_aluminio_led">liston_aluminio_led</option>
            <option value="manguera_siliconada_cuadrada">manguera_siliconada_cuadrada</option>
          </select>
        </div>
        <div class="medicion">
          <div class="entrada">
            <label for="">metro lineal de iluminacion</label>
            <input type="number" id="metroLinealIluminacion${mas1}">
          </div>
        </div>
        <div class="entrada">
          <label>
            <hr>Precio Material:
            <p id="subIluminacion${mas1}">wait...</p>
            <hr>
          </label>
        </div>`;

  iluminati.appendChild(card);

  // Agregar eventos a los nuevos elementos

  const nuevaIluminacion = document.getElementById(`iluminacion${mas1}`);
  const nuevoMetroLinealIluminacion = document.getElementById(`metroLinealIluminacion${mas1}`);

  if (nuevaIluminacion === document.getElementById("iluminacion3")) {
    document.getElementById("masIluminacion").style.display = "none";
  }

  if (nuevaIluminacion) {
    nuevaIluminacion.addEventListener("change", () => {
      calcularValoresDinamico(nuevaIluminacion, `subIluminacion${mas1}`);
    });
  }

  if (nuevoMetroLinealIluminacion) {
    nuevoMetroLinealIluminacion.addEventListener("input", () => {
      calcularValoresDinamico(nuevaIluminacion, `subIluminacion${mas1}`);
    });
  }
});

// ____________________________________________---

export async function materialIluminacion() {
  // Conexión a la base de datos y obtención de la cotización
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.iluminacion; // Extrae solo la categoría "bases"

  // Lectura de elementos del DOM
  const lecturaIluminacion = document.getElementById("iluminacion");
  const lecturametroLinealIluminacion = document.getElementById(
    "metroLinealIluminacion"
  );

  const lecturaIluminacion2 = document.getElementById("iluminacion2");
  const lecturametroLinealIluminacion2 = document.getElementById(
    "metroLinealIluminacion2"
  );

  const lecturaIluminacion3 = document.getElementById("iluminacion3");
  const lecturametroLinealIluminacion3 = document.getElementById(
    "metroLinealIluminacion3"
  );

  // Variables globales
  let iluminacionSeleccionada;
  let cantidadMetros = 0;

  // Variables globales
  let iluminacionSeleccionada2;
  let cantidadMetros2 = 0;

  // Variables globales
  let iluminacionSeleccionada3;
  let cantidadMetros3 = 0;

  // Escucha cambios en el elemento 'lecturaIluminacion'
  lecturaIluminacion.addEventListener("change", () => {
    iluminacionSeleccionada = lecturaIluminacion.value;
    calcularValores();
  });

  // Escucha cambios en el elemento 'lecturametroLinealIluminacion'
  lecturametroLinealIluminacion.addEventListener("input", () => {
    cantidadMetros = parseFloat(lecturametroLinealIluminacion.value) || 0; // Asegúrate de que sea un número
    calcularValores(); // Recalcula los valores
  });

  // Escucha cambios en el elemento 'lecturaIluminacion'
  if (lecturaIluminacion2) {
    lecturaIluminacion2.addEventListener("change", () => {
      iluminacionSeleccionada2 = lecturaIluminacion2.value;
      calcularValores2();
    });

    // Escucha cambios en el elemento 'lecturametroLinealIluminacion'
    lecturametroLinealIluminacion2.addEventListener("input", () => {
      cantidadMetros2 = parseFloat(lecturametroLinealIluminacion2.value) || 0; // Asegúrate de que sea un número
      calcularValores2(); // Recalcula los valores
    });
  }

  // Escucha cambios en el elemento 'lecturaIluminacion'
  if (lecturaIluminacion3) {
    lecturaIluminacion3.addEventListener("change", () => {
      iluminacionSeleccionada3 = lecturaIluminacion3.value;
      calcularValores3();
    });

    // Escucha cambios en el elemento 'lecturametroLinealIluminacion'
    lecturametroLinealIluminacion3.addEventListener("input", () => {
      cantidadMetros3 = parseFloat(lecturametroLinealIluminacion3.value) || 0; // Asegúrate de que sea un número
      calcularValores3(); // Recalcula los valores
    });
  }

  // Función para recalcular valores
  function calcularValores() {
    const subIluminacion = document.getElementById("subIluminacion");
    if (costos.hasOwnProperty(iluminacionSeleccionada)) {
      const precioIluminacion = costos[iluminacionSeleccionada]; // Obtener el precio del material
      calculoIluminacion = precioIluminacion * cantidadMetros * dolar; // Cálculo del costo
      subIluminacion.textContent =
        calculoIluminacion.toLocaleString("de-DE", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) || 0;
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(
        "⚠️ Error: La base seleccionada no existe en la base de datos."
      );
    }
  }

  function calcularValores2() {
    const subIluminacion2 = document.getElementById("subIluminacion2");
    if (costos.hasOwnProperty(iluminacionSeleccionada2)) {
      const precioIluminacion2 = costos[iluminacionSeleccionada2]; // Obtener el precio del material
      calculoIluminacion2 = precioIluminacion2 * cantidadMetros2 * dolar; // Cálculo del costo
      subIluminacion2.textContent =
        calculoIluminacion2.toLocaleString("de-DE", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) || 0;
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(
        "⚠️ Error: La base seleccionada no existe en la base de datos."
      );
    }
  }

  function calcularValores3() {
    const subIluminacion3 = document.getElementById("subIluminacion3");
    if (costos.hasOwnProperty(iluminacionSeleccionada3)) {
      const precioIluminacion3 = costos[iluminacionSeleccionada3]; // Obtener el precio del material
      calculoIluminacion3 = precioIluminacion3 * cantidadMetros3 * dolar; // Cálculo del costo
      subIluminacion3.textContent =
        calculoIluminacion3.toLocaleString("de-DE", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) || 0;
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(
        "⚠️ Error: La base seleccionada no existe en la base de datos."
      );
    }
  }
}

// ________________________________-
async function calcularValoresDinamico(lightElement, subLightId) {
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.iluminacion; // Extrae solo la categoría "bases"

  const lightSeleccionada = lightElement.value;
  const cantidadMetros = parseFloat(lightElement.nextElementSibling.querySelector('input').value) || 0; // Asegúrate de que sea un número
  if (costos.hasOwnProperty(lightSeleccionada)) {
    const precioLight = costos[lightSeleccionada]; // Obtener el precio del material
    const calculoLight = precioLight * cantidadMetros * dolar; // Cálculo del costo
    const subLight = document.getElementById(subLightId);

    if (subLight) {
      // Formatear el valor y asignarlo al DOM
      subLight.textContent = calculoLight.toLocaleString("de-DE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      calculadora(); // Llama a calculadora para mostrar el nuevo valor
    } else {
      console.error(
        `⚠️ Error: Elemento con ID ${subLightId} no encontrado en el DOM.`
      );
    }
  } else {
    console.error(
      "⚠️ Error: La base seleccionada no existe en la base de datos."
    );
  }
}
