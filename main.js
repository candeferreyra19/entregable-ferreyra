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

let pedido = {
  tipoCafe: "",
  tamaño: "",
  extras: [],
  total: 0,
};

// Función para elegir tipo de café
function elegirCafe() {
  let tipo = prompt("¿Qué tipo de café querés?\n- latte\n- espresso\n- capuccino").toLowerCase();
  if (preciosCafe[tipo]) {
    pedido.tipoCafe = tipo;
    pedido.total += preciosCafe[tipo];
  } else {
    alert("Opción no válida. Intentá de nuevo.");
    elegirCafe();
  }
}

// Función para elegir tamaño
function elegirTamaño() {
  let tamaño = prompt("¿Qué tamaño querés?\n- chico\n- mediano\n- grande").toLowerCase();
  if (preciosTamaño[tamaño] !== undefined) {
    pedido.tamaño = tamaño;
    pedido.total += preciosTamaño[tamaño];
  } else {
    alert("Tamaño inválido. Probá otra vez.");
    elegirTamaño();
  }
}

// Función para agregar extras
function agregarExtras() {
  for (let i = 0; i < extrasDisponibles.length; i++) {
    let confirmar = confirm(`¿Querés agregar ${extrasDisponibles[i]}? (+$${precioExtra})`);
    if (confirmar) {
      pedido.extras.push(extrasDisponibles[i]);
      pedido.total += precioExtra;
    }
  }
}

// Función para mostrar resumen
function mostrarResumen() {
  let resumen = `☕ Pedido confirmado:\n
- Café: ${pedido.tipoCafe}
- Tamaño: ${pedido.tamaño}
- Extras: ${pedido.extras.length > 0 ? pedido.extras.join(", ") : "ninguno"}
- Total a pagar: $${pedido.total}
\n¡Gracias por tu compra!`;

  alert(resumen);
  console.log(pedido);
}

// Llamadas a las funciones (flujo principal)
elegirCafe();
elegirTamaño();
agregarExtras();
mostrarResumen();
