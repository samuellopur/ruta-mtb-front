let data = JSON.parse(localStorage.getItem("infoCatalogo"));
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(dataId) {
  // Busca el producto por id en el array data
  const index = data.find(item => item.id == dataId);
  const cantidadInput = document.getElementById(`cantidadMtb-${dataId}`);
  const cantidad = parseInt(cantidadInput.value);
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

function aumentarCantidad(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito[index].cantidad += 1;
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
//   const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("carritoProductos");
  

//   cartCount.textContent = carrito.length;
  cartItems.innerHTML = "";

  if (carrito.length === 0) {
    cartItems.innerHTML =
      '<p>Carrito vacío</p>';
    return;
  }

  carrito.forEach((producto, index) => {
    const productoCarrito = document.createElement("div");
    productoCarrito.innerHTML = `
      <img style="width:52px;" src="${producto.img}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p>$<span>${producto.price.toLocaleString('es-CO')}</span></p>
      <button onclick="reducirCantidad()" class="botonSencillo">-</button>
      <button onclick="aumentarCantidad(${producto.cantidad})" class="botonSencillo">+</button>
      <input type="number" class="cantidadMtb" min="1" value="1">
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