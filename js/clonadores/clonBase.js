import { contenedorBase } from "./clonador"; // Asegúrate de que en 'clonador.js' exportas contenedorBase correctamente

// Clonar el nodo y su contenido
const clon = contenedorBase.cloneNode(true); // true para clonar hijos también

// Insertar en otro lugar del DOM
document.body.appendChild(clon); // O cualquier otro contenedor donde quieras insertarlo
