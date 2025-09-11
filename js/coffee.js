let cafes = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const menuDiv = document.getElementById("menu");
const btnIniciar = document.getElementById("btnIniciar");

fetch("data/cafes.json")
  .then((res) => res.json())
  .then((data) => {
    cafes = data;
  })
  .catch((err) => console.error("Error cargando cafés:", err));

btnIniciar.addEventListener("click", () => {
  const nombre = document.getElementById("nombreInput").value.trim();
  if (nombre.length < 2 || !isNaN(nombre)) {
    Toastify({
      text: "Por favor ingresá un nombre válido",
      duration: 2000,
      gravity: "top",
      position: "center",
      style: {
        background: "linear-gradient(to right, #d32f2f, #b71c1c)",
        borderRadius: "8px",
      },
    }).showToast();
    return;
  }

  const saludo = document.createElement("h2");
  saludo.textContent = `Hola ${nombre}, bienvenido a Moka Coffee`;
  document.body.insertBefore(saludo, menuDiv);

  const filtrosDiv = document.createElement("div");
  filtrosDiv.className = "filters";
  filtrosDiv.innerHTML = `
    <input type="text" id="busqueda" placeholder="Buscar café..." />
    <select id="categoria">
      <option value="">Todas las categorías</option>
      <option value="espresso">Espresso</option>
      <option value="latte">Latte</option>
      <option value="capuccino">Capuccino</option>
      <option value="otros">Otros</option>
    </select>
    <select id="orden">
      <option value="">Ordenar</option>
      <option value="precio-asc">Precio: Menor a Mayor</option>
      <option value="precio-desc">Precio: Mayor a Menor</option>
    </select>
  `;
  menuDiv.parentNode.insertBefore(filtrosDiv, menuDiv);

  const busquedaInput = document.getElementById("busqueda");
  const categoriaSelect = document.getElementById("categoria");
  const ordenSelect = document.getElementById("orden");
  busquedaInput.addEventListener("input", filtrar);
  categoriaSelect.addEventListener("change", filtrar);
  ordenSelect.addEventListener("change", filtrar);

  mostrarMenu(cafes);
});

function mostrarMenu(lista) {
  menuDiv.innerHTML = "<h2>Elige tu café:</h2>";
  lista.forEach((cafe) => {
    const card = document.createElement("div");
    card.className = "cafe-card";

    const img = document.createElement("img");
    img.src = cafe.imagen;
    img.alt = cafe.nombre;

    const nombre = document.createElement("p");
    nombre.textContent = cafe.nombre;

    const precio = document.createElement("p");
    precio.textContent = `$${cafe.precio}`;

    const btn = document.createElement("button");
    btn.textContent = "Agregar al carrito";
    btn.addEventListener("click", () => agregarAlCarrito(cafe));

    card.appendChild(img);
    card.appendChild(nombre);
    card.appendChild(precio);
    card.appendChild(btn);
    menuDiv.appendChild(card);
  });
}

function agregarAlCarrito(cafe) {
  let item = carrito.find((p) => p.id === cafe.id);
  if (item) item.cantidad++;
  else carrito.push({ ...cafe, cantidad: 1 });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  Toastify({
    text: `${cafe.nombre} agregado al carrito`,
    duration: 2000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "linear-gradient(to right, #6d4c41, #4e342e)",
      borderRadius: "8px",
    },
  }).showToast();
}

function filtrar() {
  let listaFiltrada = [...cafes];
  const texto = document.getElementById("busqueda").value.toLowerCase();
  const categoria = document.getElementById("categoria").value;
  const orden = document.getElementById("orden").value;
  if (texto)
    listaFiltrada = listaFiltrada.filter((c) =>
      c.nombre.toLowerCase().includes(texto)
    );
  if (categoria)
    listaFiltrada = listaFiltrada.filter((c) => c.categoria === categoria);
  if (orden === "precio-asc") listaFiltrada.sort((a, b) => a.precio - b.precio);
  if (orden === "precio-desc")
    listaFiltrada.sort((a, b) => b.precio - a.precio);
  mostrarMenu(listaFiltrada);
}
