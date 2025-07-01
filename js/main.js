// Variables y constantes
const preciosCafe = {
  latte: 500,
  espresso: 400,
  capuccino: 550,
};

const preciosTamaño = {
  chico: 0,
  mediano: 100,
  grande: 200,
};

const extrasDisponibles = ["leche vegetal", "jarabe de vainilla", "crema"];
const precioExtra = 100;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  const resultadoDiv = document.getElementById('resultado');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let pedido = {
      tipoCafe: "",
      tamaño: "",
      extras: [],
      total: 0,
    };

    // Obtener selección de tipo de café
    let tipoCafe = document.getElementById('tipoCafe').value;
    if (preciosCafe[tipoCafe]) {
      pedido.tipoCafe = tipoCafe;
      pedido.total += preciosCafe[tipoCafe];
    }

    // Obtener selección de tamaño
    let tamaño = document.getElementById('tamañoCafe').value;
    if (preciosTamaño[tamaño] !== undefined) {
      pedido.tamaño = tamaño;
      pedido.total += preciosTamaño[tamaño];
    }

    // Obtener extras
    let extrasSeleccionados = [];
    if (document.getElementById('extra1').checked) extrasSeleccionados.push('leche vegetal');
    if (document.getElementById('extra2').checked) extrasSeleccionados.push('jarabe de vainilla');
    if (document.getElementById('extra3').checked) extrasSeleccionados.push('crema');

    pedido.extras = extrasSeleccionados;
    pedido.total += extrasSeleccionados.length * precioExtra;

    // Mostrar resumen en el DOM
    resultadoDiv.innerHTML = `
      <p><strong>Café:</strong> ${pedido.tipoCafe}</p>
      <p><strong>Tamaño:</strong> ${pedido.tamaño}</p>
      <p><strong>Extras:</strong> ${pedido.extras.length > 0 ? pedido.extras.join(", ") : "Ninguno"}</p>
      <p><strong>Total a pagar:</strong> $${pedido.total}</p>
    `;

    // Guardar en LocalStorage
    localStorage.setItem('ultimoPedido', JSON.stringify(pedido));

    // Resetear formulario
    form.reset();
  });
});