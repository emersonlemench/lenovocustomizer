import { cotizacion } from "./index.js";
import { db } from "./index.js";
import { calculadora } from "./calculadora.js"; // Importa calculadora

export let calculoAccesorios = 0; // Inicializa calculoAccesorios a 0

// Función para obtener los valores de todos los inputs
export async function valoresAccesorios() {
  const dolar = await cotizacion();
  const datos = await db();
  const costos = datos.accesorios; // Precios de los accesorios desde la base de datos

  // Crear un objeto para almacenar los valores
  const valores = {};

  // Obtener los valores de cada input por su id
  valores.mini_boton6a = document.getElementById('mini_boton6a').value;
  valores.ruedita2_5a = document.getElementById('ruedita2-5a').value;
  valores.rueda_control16a = document.getElementById('rueda_control16a').value;
  valores.bluetooth5a = document.getElementById('bluetooth5a').value;
  valores.rgb24teclas = document.getElementById('rgb24teclas').value;
  valores.rgb30a = document.getElementById('rgb30a').value;
  valores.rgb50a = document.getElementById('rgb50a').value;
  valores.ficha_12v_auto = document.getElementById('ficha_12v_auto').value;
  valores.control_pixel_basico = document.getElementById('control_pixel_basico').value;
  valores.switch2 = document.getElementById('switch2').value;
  valores.secuenciador2 = document.getElementById('secuenciador2').value;
  valores.secuenciador5 = document.getElementById('secuenciador5').value;
  valores.secuenciador10 = document.getElementById('secuenciador10').value;
  valores.embellecedores = document.getElementById('embellecedores').value;
  valores.distanciadores = document.getElementById('distanciadores').value;
  valores.lingas_acero = document.getElementById('lingas_acero').value;
  valores.ventosas = document.getElementById('ventosas').value;

  // Sumar los totales de cada accesorio multiplicado por su costo
  calculoAccesorios = 0; // Resetear la variable de cálculo
  Object.keys(valores).forEach(key => {
    const cantidad = Number(valores[key]) || 0; // Asegurarse de que sea un número
    const precio = costos[key] || 0; // Obtener el precio desde 'costos'
    calculoAccesorios += cantidad * precio; // Multiplicar cantidad por precio y sumar al total
  });

  console.log("Total accesorios:", calculoAccesorios); // Muestra el total en la consola

  // Detectar cambios en los inputs y actualizar la suma en tiempo real
  document.querySelectorAll('.acc input').forEach(input => {
    input.addEventListener('input', () => {
      // Actualizar los valores con lo ingresado
      valores[input.id] = input.value;

      // Resetear y recalcular la suma cada vez que un valor cambie
      calculoAccesorios = 0; 
      Object.keys(valores).forEach(key => {
        const cantidad = Number(valores[key]) || 0;
        const precio = costos[key] || 0;
        calculoAccesorios += cantidad * precio * dolar; // Multiplicar por el dólar (si es necesario)
      });

      // Eliminar los decimales (con Math.trunc())
      calculoAccesorios = Math.trunc(calculoAccesorios);

      // Actualizar el contenido en la interfaz
      const subAccesorios = document.getElementById('subAccesorios');
      subAccesorios.textContent = calculoAccesorios.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });;

      calculadora();
    });
  });

  // Retornar el total calculado
  return calculoAccesorios;
}

valoresAccesorios();
