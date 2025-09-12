import { products } from './products.js'; 
//Funcionalidad Catálogo
document.addEventListener("DOMContentLoaded", () => {
  let data = JSON.parse(localStorage.getItem("infoCatalogo")) || [];
  let validation = JSON.parse(localStorage.getItem("mtb-validarUsuario"));
  if (!data || data.length === 0) {
    data = products;
    localStorage.setItem("infoCatalogo", JSON.stringify(data));
  }

  // * Selecciona "div" de cards, limpia existentes y luego renderiza
  const contenedor = document.getElementById("mtbCatalogo"); 
  document.querySelectorAll(".cardMtb").forEach(card => card.remove());
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