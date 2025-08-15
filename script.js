fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("mtbNavbar").innerHTML = data;
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
function mostrarMenu() {
  document.getElementById("hamburguesa").classList.toggle("active");
}
