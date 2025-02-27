// calculadora.js
import { calculoBase, calculoBase2, calculoBase3 } from "./bases.js";
import {
  calculoIluminacion,
  calculoIluminacion2,
  calculoIluminacion3,
} from "./iluminacion.js";
import {
  calculoIntervencion,
  calculoIntervencion2,
  calculoIntervencion3,
} from "./intervencion.js";
import {
  calculoIAlimentacion,
  calculoIAlimentacion2,
  calculoIAlimentacion3,
} from "./alimentacion.js";
import {
  calculoEstructura,
  calculoEstructura2,
  calculoEstructura3,
} from "./estructura.js";
import { calculoFleje, calculoFleje2, calculoFleje3 } from "./flejes.js";
import { calculoAdicional , valorExtra, calculoAdicional3,calculoAdicional2} from "./adicionales.js";
import { calculoAccesorios } from "./accesorios.js";

export function calculadora() {
  // Sumatoria total (asegúrate de definir estas variables en otro lugar)
  let sumatoriaGeneral =
    calculoBase +
    calculoBase2 +
    calculoBase3 +
    calculoIluminacion +
    calculoIluminacion2 +
    calculoIluminacion3 +
    calculoIntervencion +
    calculoIntervencion2 +
    calculoIntervencion3 +
    calculoIAlimentacion +
    calculoIAlimentacion2 +
    calculoIAlimentacion3 +
    calculoEstructura +
    calculoEstructura2 +
    calculoEstructura3 +
    calculoFleje +
    calculoFleje2 +
    calculoFleje3 +
    calculoAdicional + valorExtra + calculoAdicional2 + calculoAdicional3 +
    calculoAccesorios;

  // Obtener valores de los inputs (porcentajes)
  const porcentaje1 =
    parseFloat(document.getElementById("porcentaje1")?.value) || 0;
  const porcentaje2 =
    parseFloat(document.getElementById("porcentaje2")?.value) || 0;

  // Cálculos de ganancia y extras
  const costoTotal = Math.floor(sumatoriaGeneral);
  const ganancia = Math.floor((porcentaje1 * sumatoriaGeneral) / 100);
  const extras = Math.floor((porcentaje2 * sumatoriaGeneral) / 100);

  console.log(`Estoy calculando la suma de ${sumatoriaGeneral}`);

  // Actualizar valores en el DOM
  document.getElementById("costoTotal").textContent =
    costoTotal.toLocaleString();
  document.getElementById("ganancia").textContent = ganancia.toLocaleString();
  document.getElementById("extras").textContent = extras.toLocaleString();

  // Cálculo de totales con IVA y pagos
  const totalEfectivo = costoTotal + ganancia + extras;
  const totalConIVA = Math.floor(totalEfectivo * 1.21);
  const totalIVATC = Math.floor(totalConIVA * 1.15);
  const pagoTC3 = Math.floor(totalIVATC / 3);
  const pagoTC6 = Math.floor(totalIVATC / 6);
  const precioGremio = Math.floor(totalEfectivo * 0.75);

  // Asignar valores al DOM
  document.getElementById("totalEfectivo").textContent =
    totalEfectivo.toLocaleString();
  document.getElementById("totalConIVA").textContent =
    totalConIVA.toLocaleString();
  document.getElementById("totalIVATC").textContent =
    totalIVATC.toLocaleString();
  document.getElementById("pagoTC6").textContent = pagoTC6.toLocaleString();
  document.getElementById("pagoTC3").textContent = pagoTC3.toLocaleString();
  document.getElementById("precioGremio").textContent =
    precioGremio.toLocaleString();

  document.getElementById("totalEfectivoCliente").textContent =
    totalEfectivo.toLocaleString();
  document.getElementById("totalConIVACliente").textContent =
    totalConIVA.toLocaleString();
  document.getElementById("totalIVATCCliente").textContent =
    totalIVATC.toLocaleString();
  document.getElementById("pagoTC6Cliente").textContent =
    pagoTC6.toLocaleString();
  document.getElementById("pagoTC3Cliente").textContent =
    pagoTC3.toLocaleString();
}

// Agregar eventos para actualizar automáticamente cuando cambien los valores
document.addEventListener("DOMContentLoaded", () => {
  const porcentaje1Input = document.getElementById("porcentaje1");
  const porcentaje2Input = document.getElementById("porcentaje2");

  if (porcentaje1Input && porcentaje2Input) {
    porcentaje1Input.addEventListener("input", calculadora);
    porcentaje2Input.addEventListener("input", calculadora);
  }
});
