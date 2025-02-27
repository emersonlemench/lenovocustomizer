export function agregarMas() {
  // Bases
  const agregarBase = document.getElementById('agregarBase');
  agregarBase.addEventListener('click', () => {
    const contenedor = document.getElementById('contenedorBase');
    const original = document.querySelector('#contenedorBase'); // Selecciona el primer elemento con clase "base"
    
    if (original) {
      const clon = original.cloneNode(true); // Clonar el elemento original
      contenedor.appendChild(clon); // Agregar al contenedor
    }
  });
}

let contador = 1; // Para generar IDs únicos

document.getElementById('agregarBase').addEventListener('click', () => {
  contador++;
  
  const contenedor = document.getElementById('contenedor');
  const original = document.querySelector('.base'); // Selecciona el primer elemento con clase "base"
  
  if (original) {
    const clon = original.cloneNode(true); // Clonar el elemento original
    clon.id = `base-${contador}`; // Asignar nuevo ID único
    clon.textContent = `Contenido duplicado ${contador}`; // Modificar el contenido
    contenedor.appendChild(clon); // Agregar al contenedor
  }
});