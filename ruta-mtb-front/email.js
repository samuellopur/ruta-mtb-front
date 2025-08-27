
// email.js
// =============================================
// INTEGRACIÓN BÁSICA DE EMAILJS EN TU SITIO WEB
// =============================================

// Paso 1: Incluye el SDK de EmailJS en tu HTML
// ---------------------------------------------
// Agrega esto dentro de la etiqueta <head> o antes de tus scripts:
// <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
// <script>
//   (function(){
//     emailjs.init('TU_USER_ID'); // Reemplaza TU_USER_ID por tu ID de usuario de EmailJS
//   })();
// </script>

// Paso 2: Configura tus constantes de EmailJS
// -------------------------------------------
// >>>>> AQUÍ DEFINES LAS CONSTANTES QUE USARÁ LA FUNCIÓN <<<<<
// Estos valores los obtienes en tu panel de EmailJS:
const SERVICE_ID = 'service_ksiy6gu';      // ID del servicio (ejemplo: 'service_123abc')
const TEMPLATE_ID = 'template_n4qou1w';    // ID de la plantilla (tu plantilla real)
const TEMPLATE_PARAMS = {
  nombre: 'Juan',                      // Puedes cambiar estos valores por los del formulario
  mensaje: 'Hola, este es un mensaje de prueba.'
};

// Paso 3: Crea la función para enviar el correo
// --------------------------------------------
// Función para enviar correo usando EmailJS
// Los parámetros serviceID, templateID y templateParams reciben los valores que les pases al llamar la función.
// Ejemplo:
// enviarCorreo(SERVICE_ID, TEMPLATE_ID, templateParams);
function enviarCorreo(serviceID, templateID, templateParams) {
  // emailjs.send devuelve una promesa
  return emailjs.send(serviceID, templateID, templateParams)
    .then(function(response) {
      console.log('Correo enviado con éxito!', response.status, response.text);
      alert('¡Correo enviado con éxito!');
    }, function(error) {
      console.error('Error al enviar el correo:', error);
      alert('Hubo un error al enviar el correo.');
    });
}


// Paso 4: ¿Cómo usar la función con el formulario?
// ------------------------------------------------
// Lo ideal es llamarla cuando el usuario envía el formulario de contacto.
// Ejemplo práctico (igual que en tu HTML):

// document.getElementById('contactForm').addEventListener('submit', function(e) {
//   e.preventDefault();
//   // Obtén los datos del formulario
//   const nombre = document.getElementById('name').value;
//   const correo = document.getElementById('email').value;
//   const telefono = document.getElementById('phone').value;
//   const mensaje = document.getElementById('message').value;

//   // Crea el objeto con los parámetros que espera tu plantilla de EmailJS
//   const templateParams = {
//     nombre: nombre,
//     correo: correo,
//     telefono: telefono,
//     mensaje: mensaje
//   };

//   // Llama a la función para enviar el correo
//   enviarCorreo(SERVICE_ID, TEMPLATE_ID, templateParams);
// });

// Paso 5: Exporta la función si usas módulos (opcional)
// -----------------------------------------------------
// export { enviarCorreo };
