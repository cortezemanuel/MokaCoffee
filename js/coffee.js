function iniciarSimulador() {
  const nombre = prompt("¡Bienvenido! ¿Cuál es tu nombre?");
  if (!nombre) return;
  alert(`Hola ${nombre}, Bienvenido a Moka Coffee.`);
  procesarPedido();
  finalizarCompra(nombre);
}

const cafes = [
  { nombre: "Espresso", precio: 3000 },
  { nombre: "Latte", precio: 4000 },
  { nombre: "Capuccino", precio: 4500 },
  { nombre: "Chocolate", precio: 4700 },
  { nombre: "Flat White", precio: 5000 },
  { nombre: "Cafe del día", precio: 2500 },
];

let carrito = [];
let total = 0;

function mostrarMenu() {
  let menu = "Elige tu café:\n";
  cafes.forEach((cafe, index) => {
    menu += `${index + 1}. ${cafe.nombre} - $${cafe.precio}\n`;
  });
  menu += "0. Finalizar compra";
  return menu;
}

function procesarPedido() {
  let opcion;
  do {
    opcion = parseInt(prompt(mostrarMenu()));
    if (opcion >= 1 && opcion <= cafes.length) {
      const cafeElegido = cafes[opcion - 1];
      carrito.push(cafeElegido);
      total += cafeElegido.precio;
      alert(
        `Agregaste ${cafeElegido.nombre} al carrito. Total actual: $${total}`
      );
    } else if (opcion !== 0) {
      alert("Opción inválida. Intenta nuevamente.");
    }
  } while (opcion !== 0);
}

function finalizarCompra(nombreCliente) {
  if (carrito.length === 0) {
    alert("No seleccionaste ningún café.");
    return;
  }

  let resumen = `Gracias, ${nombreCliente}. Has comprado:\n`;
  carrito.forEach((cafe, i) => {
    resumen += `- ${cafe.nombre}: $${cafe.precio}\n`;
  });

  const confirmacion = confirm(resumen + "\n\n¿Deseás confirmar tu compra?");
  if (confirmacion) {
    alert(`¡Gracias por tu compra, ${nombreCliente}! Disfrutá tu café`);
    console.log("Compra confirmada:", carrito);
  } else {
    alert("Compra cancelada.");
    console.log("Compra cancelada.");
  }
}
