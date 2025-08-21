//function toggleFormulario() {
      //let form = document.getElementById("adminAgregar");
      // alternar entre mostrar y ocultar
      form.style.display = (form.style.display === "block") ? "none" : "block";
//    }
function abrirModal() {
      document.getElementById("modalProducto").style.display = "flex";
    }
 
function cerrarModal() {
      document.getElementById("modalProducto").style.display = "none";
    }