import { products } from './products.js'; 
//Funcionalidad catalogo
document.addEventListener("DOMContentLoaded", () => {
  // Si no hay productos en localStorage, los inicializa con el array base
  let data = JSON.parse(localStorage.getItem("infoCatalogo"));
  let validation = JSON.parse(localStorage.getItem("mtb-validarUsuario"));
  if (!data || data.length === 0) {
    // products debe estar disponible globalmente (products.js debe cargarse antes)
    data = products;
    localStorage.setItem("infoCatalogo", JSON.stringify(data));
  }

  // Selecciona el contenedor donde se mostrarán las cards
  const contenedor = document.getElementById("mtbCatalogo"); // O usa un div específico si lo prefieres

  // Limpia las cards existentes
  document.querySelectorAll(".cardMtb").forEach(card => card.remove());

  // Renderiza las cards desde el array
  data.forEach(producto => {
    const card = document.createElement("div");
    card.className = "cardMtb";
    card.setAttribute("data-id", producto.id);

    card.innerHTML = `
      <img src="${producto.img}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p>${producto.description}</p>
      <p>$<span>${producto.price.toLocaleString('es-CO')}</span></p>
    `;
    if (validation[0].verification === true && validation[0].role === "user") {
      card.innerHTML += `<button onclick="agregarAlCarrito(${producto.id})" class="btnAgregar" data-id="${producto.id}">Agregar</button>`
    }
    contenedor.appendChild(card);
  });
});