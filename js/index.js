// conexiones //
export async function cotizacion() {


  const response = await fetch("https://dolarapi.com/v1/dolares/oficial");
  const data = await response.json();
  return data.venta;}

export async function db() {
  const respuesta = await fetch("../precios.json");
  const datos = await respuesta.json();
  return datos;
}

// function nombreCliente(){
// let cliente = document.getElementById('cliente')
//   cliente.textContent = prompt('Ingrese el nombre del Cliente')
//   return
// }


// nombreCliente()


import { materialBase } from "./bases.js"; // Importa materialBase
import { materialIluminacion } from "./iluminacion.js"; // Importa materialBase
import { materialIntervencion } from "./intervencion.js";
import { amperajeAlimentacion } from "./alimentacion.js";
import { materialEstructura } from "./estructura.js";
import { materialFleje } from "./flejes.js";
import { materialAdicional } from "./adicionales.js";
import { valoresAccesorios } from "./accesorios.js";

import { calculadora } from "./calculadora.js"; // Importa calculadora

async function iniciarCalculadora() {
  const resultado =  await materialBase();
  await  materialIluminacion();
  await  materialIntervencion();
  await  amperajeAlimentacion();
  await  materialEstructura();
  await  materialFleje();
  await  materialAdicional()
  await  valoresAccesorios()
   calculadora(); 
}

// Llama a iniciarCalculadora para comenzar el proceso
iniciarCalculadora();

console.log('cofas')