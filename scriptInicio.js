
// Obtener ID desde la URL
const params = new URLSearchParams(window.location.search);
const productoId = parseInt(params.get("id"));


// Cargar productos desde JSON
fetch("data/productos.json")
  .then(res => res.json())
  .then(productos => {
    const producto = productos.find(p => p.id === productoId);
    const contenedor = document.getElementById("detalle-producto");

    if (producto) {
      contenedor.innerHTML = `
        <div class="col-md-6">
          <img src="${producto.imagen}" class="img-fluid rounded shadow" alt="${producto.nombre}">
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <h2>${producto.nombre}</h2>
          <p class="text-muted">ID: ${producto.id}</p>
          <h4 class="text-success">$${producto.precio.toLocaleString()}</h4>
          <p class="mt-3">Este es un producto destacado de nuestra tienda. Aquí podrías mostrar la descripción más detallada, tallas, colores o especificaciones técnicas.</p>
          <button class="btn btn-dark mt-3">Añadir al carrito</button>
          <a href="inicio.html" class="btn btn-outline-secondary mt-2">Volver</a>
        </div>
      `;
    } else {
      contenedor.innerHTML = `<p class="text-danger">Producto no encontrado.</p>`;
    }
  })
  .catch(err => console.error("Error cargando producto:", err));
  
  
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/productos.json")
    .then(response => response.json())
    .then(productos => {
      productos.forEach(prod => {
        // busca la card que tenga ese data-id
        const card = document.querySelector(`.card[data-id="${prod.id}"]`);
        if (card) {
          card.querySelector(".card-img-top").src = prod.imagen;
          card.querySelector(".producto-nombre").textContent = prod.nombre;
          card.querySelector(".producto-descripcion").textContent = prod.descripcion;
          card.querySelector(".producto-precio").textContent = `$ ${prod.precio.toLocaleString()}`;
          card.querySelector(".btn").href = `detalleProducto.html?id=${prod.id}`;
        }
      });
    })
    .catch(error => console.error("Error cargando productos:", error));
});





