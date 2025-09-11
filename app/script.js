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
      const mtbUser = document.getElementById("mtbUser");// Cambiado aquí --> karen (intente resplicar las funciones de modal carrito para motar de registro y login)
      const mtbAdmin = document.getElementById("mtbAdmin");
      const mtbInSesion= document.getElementById("mtbInSesion"); 

    if (mtbUser && mtbAdmin && mtbInSesion) {
      mtbOpen.addEventListener("click", () => {
        mtbUser.style.display = "inline-block";
      });
      mtbClose.addEventListener("click", () => {
        mtbBox.style.display = "none";
      });
    }
    }
    
    if (!localStorage.getItem("mtb-validarUsuario")) {
      localStorage.setItem("mtb-validarUsuario", JSON.stringify([
          {
              id: null,
              nombre: null,
              correo: null,
              password: null,
              role: null,
              verification: false
          },
      ]))};
    actualizarPanelUsuario();
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
function handleUserButton() { //Cambio la funcion  mostrarAdmin()-->scrpt.js por handleUser() -->scriptRegistro.js
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

function actualizarPanelUsuario() {
  const validarUsuario = JSON.parse(localStorage.getItem("mtb-validarUsuario")) || [{ verification: false, role: null }];
  const usuario = validarUsuario[0];

  const panel1 = document.querySelector('.mtb-panel.panel-1');
  const panel2 = document.querySelector('.mtb-panel.panel-2');
  const panel3 = document.querySelector('.mtb-panel.panel-3');

  // Oculta todas las cajas primero
  if (panel1) panel1.style.display = "none";
  if (panel2) panel2.style.display = "none";
  if (panel3) panel3.style.display = "none";

  // Muestra la caja correspondiente
  if (!usuario.verification) {
    if (panel1) panel1.style.display = "block";
  } else if (usuario.verification && usuario.role === "user") {
    if (panel2) {
      panel2.style.display = "block";
      // Actualiza el nombre si existe
      const nombreSpan = panel2.querySelector("#nombre-login");
      if (nombreSpan) nombreSpan.textContent = usuario.nombre || "";
    }
  } else if (usuario.verification && usuario.role === "admin") {
    if (panel3) {
      panel3.style.display = "block";
      // Actualiza el nombre si existe
      const nombreSpan = panel3.querySelector("#nombre-login");
      if (nombreSpan) nombreSpan.textContent = usuario.nombre || "";
    }
  }
}


function logOut() {
    // Limpia el usuario actual
    localStorage.setItem("mtb-validarUsuario", JSON.stringify([{
        id: null,
        nombre: null,
        correo: null,
        password: null,
        role: null,
        verification: false
    }]));
    // Actualiza los paneles de usuario
    window.location.href = 'index.html';
    actualizarPanelUsuario();
}


