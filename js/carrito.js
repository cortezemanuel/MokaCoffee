let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const lista = document.getElementById("listaCarrito");
const totalEl = document.getElementById("total");

function renderCarrito() {
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    lista.appendChild(li);
    total += item.precio;
  });

  totalEl.textContent = `Total: $${total}`;
}

document.getElementById("vaciar").addEventListener("click", () => {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
});

document.getElementById("finalizar").addEventListener("click", () => {
  alert("¡Gracias por tu compra! Disfrutá tu café ☕");
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
});

renderCarrito();
