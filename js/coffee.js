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
const btnIniciar = document.getElementById("btnIniciar");

btnIniciar.addEventListener("click", () => {
  const nombre = document.getElementById("nombreInput").value.trim();
  if (nombre.length < 2 || !isNaN(nombre)) {
    alert("Por favor ingresá un nombre válido.");
    return;
  }
  const saludo = document.createElement("h2");
  saludo.textContent = `Hola ${nombre}, bienvenido a Moka Coffee ☕`;
  document.body.insertBefore(saludo, menuDiv);
  mostrarMenu();
});

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
  let item = carrito.find((p) => p.id === cafe.id);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...cafe, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
