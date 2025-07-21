let preciosCafe = {};
const preciosTamaño = { chico: 0, mediano: 100, grande: 200 };
const extrasDisponibles = ["leche vegetal", "jarabe de vainilla", "crema"];
const precioExtra = 100;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  const resultadoDiv = document.getElementById('resultado');
  const selectCafe = document.getElementById('tipoCafe');

  // Cargar datos desde JSON
  fetch('./data/cafes.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(cafe => {
        preciosCafe[cafe.tipo] = cafe.precio;
        const option = document.createElement('option');
        option.value = cafe.tipo;
        option.textContent = cafe.tipo.charAt(0).toUpperCase() + cafe.tipo.slice(1) + ` ($${cafe.precio})`;
        selectCafe.appendChild(option);
      });
    });

  // Función para calcular el precio total
  function calcularPrecio(tipoCafe, tamaño, extras) {
    return preciosCafe[tipoCafe] + preciosTamaño[tamaño] + (extras.length * precioExtra);
  }

  // Función para mostrar el resumen
  function mostrarResumen(pedido) {
    resultadoDiv.innerHTML = `
      <p><strong>Café:</strong> ${pedido.tipoCafe}</p>
      <p><strong>Tamaño:</strong> ${pedido.tamaño}</p>
      <p><strong>Extras:</strong> ${pedido.extras.length > 0 ? pedido.extras.join(", ") : "Ninguno"}</p>
      <p><strong>Total a pagar:</strong> $${pedido.total}</p>
    `;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let pedido = {
      tipoCafe: selectCafe.value,
      tamaño: document.getElementById('tamañoCafe').value,
      extras: [],
      total: 0,
    };

    if (!pedido.tipoCafe || !pedido.tamaño) return;

    if (document.getElementById('extra1').checked) pedido.extras.push('leche vegetal');
    if (document.getElementById('extra2').checked) pedido.extras.push('jarabe de vainilla');
    if (document.getElementById('extra3').checked) pedido.extras.push('crema');

    pedido.total = calcularPrecio(pedido.tipoCafe, pedido.tamaño, pedido.extras);

    mostrarResumen(pedido);

    localStorage.setItem('ultimoPedido', JSON.stringify(pedido));

    Swal.fire({
      title: '¡Pedido enviado!',
      text: `Tu café ${pedido.tipoCafe} estará listo pronto ☕`,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      form.reset();
    });
  });
});
