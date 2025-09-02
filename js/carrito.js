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
    btnQuitar.textContent = "X";
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

    Toastify({
      text: "Producto eliminado del carrito X",
      duration: 2000,
      gravity: "bottom",
      position: "right",
      style: {
        background: "linear-gradient(to right, #d32f2f, #b71c1c)",
        borderRadius: "8px",
      },
    }).showToast();
  }
}

document.getElementById("vaciar").addEventListener("click", () => {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();

  Toastify({
    text: "Carrito vaciado",
    duration: 2000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "linear-gradient(to right, #ff7043, #e64a19)",
      borderRadius: "8px",
    },
  }).showToast();
});

document.getElementById("finalizar").addEventListener("click", () => {
  Toastify({
    text: "¡Gracias por tu compra! Disfrutá tu café",
    duration: 3000,
    gravity: "top",
    position: "center",
    style: {
      background: "linear-gradient(to right, #4caf50, #388e3c)",
      borderRadius: "8px",
    },
  }).showToast();

  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
});

renderCarrito();
