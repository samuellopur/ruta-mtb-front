function enviarCorreo(serviceID, templateID, templateParams) {
  // emailjs.send devuelve una promesa
  return emailjs.send(serviceID, templateID, templateParams)
    .then(function(response) {
      console.log('Correo enviado con éxito!', response.status, response.text);
      Swal.fire({
        icon: 'success',
        title: '¡Correo enviado!',
        text: 'Tu mensaje fue enviado correctamente. Pronto te contactaremos.',
        confirmButtonText: 'Aceptar'
      });
    }, function(error) {
      console.error('Error al enviar el correo:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar',
        text: 'Hubo un error al enviar el correo. Por favor, intenta de nuevo más tarde.',
        confirmButtonText: 'Aceptar'
      });
    });
}
