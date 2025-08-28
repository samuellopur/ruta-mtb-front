fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("mtbNavbar").innerHTML = data;

    // Espera a que el HTML esté en el DOM
    const mtbOpen = document.getElementById("mtbOpen");
    const mtbClose = document.getElementById("mtbClose");
    const mtbBox = document.getElementById("mtbBox"); // Cambiado aquí

    if (mtbOpen && mtbClose && mtbBox) {
      mtbOpen.addEventListener("click", () => {
        mtbBox.style.display = "inline-block";
      });
      mtbClose.addEventListener("click", () => {
        mtbBox.style.display = "none";
      });
    }
  });

// Botón de conoce más - página de about us
function mostrarDiv() {
  const div = document.getElementById("texto-oculto-mision-vision");
  if (div.style.display === "none" || div.style.display === "") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}

// Función menú Hambuerguesa

function mostrarAdmin() {
  const mtbLinks = document.querySelector(".mtbUserVisual");
  mtbLinks.classList.toggle("oculto");
}
function mostrarMenu() {
  const mtbLinks = document.querySelector(".hamburguesa");
  mtbLinks.classList.toggle("oculto");
}



let data = JSON.parse(localStorage.getItem("infoCatalogo"));
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(dataId) {
  // Busca el producto por id en el array data
  const index = data.find(item => item.id == dataId);
  const cantidad = 1;
  if (index) {
    // Verifica si ya está en el carrito
    const existe = carrito.find(item => item.id == dataId);
    if (existe) {
      existe.cantidad += cantidad;
    } else {
      carrito.push({ ...index, cantidad });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
  }
}

function aumentarCantidad(mtbId) {
    const index = carrito.find(index => index.id == mtbId);
    index.cantidad += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}
function reducirCantidad(mtbId) {
  const index = carrito.find(index => index.id == mtbId);
    if (index.cantidad > 1) {
      index.cantidad -= 1;
    } else {
      carrito.splice(index, 1)
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}
function borrarCantidad(mtbId) {
    const index = carrito.find(index => index.id == mtbId);
    carrito.splice(index, 1)
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function calcularTotal() {
  return carrito.reduce((total, item) => {
    const precio = parseInt(item.precio.replace(/\D/g, ""));
    return total + precio;
  }, 0);
}

function actualizarCarrito() {
  const cartItems = document.getElementById("carritoProductos");
  cartItems.innerHTML = "";

  if (carrito.length === 0) {
    cartItems.innerHTML =
      '<p>Carrito vacío</p>';
    return;
  }

  carrito.forEach((producto, index) => {
    const productoCarrito = document.createElement("div");
    productoCarrito.className = "productoCarrito";
    const valorAcumulado = producto.price * producto.cantidad;
    productoCarrito.innerHTML = `
      <img src="${producto.img}" alt="${producto.title}">
      <div class="mtbCardContent">
      <h3>${producto.title}</h3>
      <p>Cantidad: <span class="cantidad">${producto.cantidad}</span></p>
      <p>Precio: <span class="precio">${valorAcumulado.toLocaleString('es-CO')}</span></p>
      <button class="mtbCartButton" onclick="aumentarCantidad(${producto.id})"><i class="bi bi-plus-lg"></i></button>
      <button class="mtbCartButton" onclick="reducirCantidad(${producto.id})"><i class="bi bi-dash"></i></button>
      <button class="mtbCartButton" onclick="borrarCantidad(${producto.id})"><i class="bi bi-trash3-fill"></i></button>
      </div>
    `;
    cartItems.appendChild(productoCarrito);
  });

//   const total = calcularTotal();
//   const totalItem = document.createElement("li");
//   totalItem.innerHTML = `<span class="dropdown-item-text fw-bold">Total: $${total.toLocaleString()}</span>`;
//   cartItems.appendChild(totalItem);

//   const vaciarBtnItem = document.createElement("li");
//   vaciarBtnItem.innerHTML = `
//   <button class="dropdown-item text-danger" onclick="vaciarCarrito()">Vaciar carrito</button>
// `;
//   cartItems.appendChild(vaciarBtnItem);

}

actualizarCarrito();
