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
