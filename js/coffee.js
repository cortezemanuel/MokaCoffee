const cafes = [
  { id: 1, nombre: "Espresso", precio: 3000 },
  { id: 2, nombre: "Latte", precio: 4000 },
  { id: 3, nombre: "Capuccino", precio: 4500 },
  { id: 4, nombre: "Chocolate", precio: 4700 },
  { id: 5, nombre: "Flat White", precio: 5000 },
  { id: 6, nombre: "Cafe del día", precio: 2500 },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const menuDiv = document.getElementById("menu");

function iniciarSimulador() {
  const nombre = prompt("¡Bienvenido! ¿Cuál es tu nombre?");
  if (!nombre) return;
  const saludo = document.createElement("h2");
  saludo.textContent = `Hola ${nombre}, bienvenido a Moka Coffee ☕`;
  document.body.insertBefore(saludo, menuDiv);
  mostrarMenu();
}

function mostrarMenu() {
  menuDiv.innerHTML = "<h2>Elige tu café:</h2>";
  cafes.forEach((cafe) => {
    const btn = document.createElement("button");
    btn.textContent = `${cafe.nombre} - $${cafe.precio}`;
    btn.addEventListener("click", () => agregarAlCarrito(cafe));
    menuDiv.appendChild(btn);
  });
}

function agregarAlCarrito(cafe) {
  carrito.push(cafe);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${cafe.nombre} agregado al carrito`);
}
