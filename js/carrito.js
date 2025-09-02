let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const lista = document.getElementById("listaCarrito");
const totalEl = document.getElementById("total");

function renderCarrito() {
  lista.innerHTML = "";
  let total = 0;
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio} x ${item.cantidad} = $${
      item.precio * item.cantidad
    }`;
    const btnQuitar = document.createElement("button");
    btnQuitar.textContent = "❌";
    btnQuitar.addEventListener("click", () => quitarDelCarrito(item.id));
    li.appendChild(btnQuitar);
    lista.appendChild(li);
    total += item.precio * item.cantidad;
  });
  totalEl.textContent = `Total: $${total}`;
}

function quitarDelCarrito(id) {
  let index = carrito.findIndex((p) => p.id === id);
  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
    } else {
      carrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  }
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
