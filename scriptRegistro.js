// // Función para mostrar/ocultar contraseña
// function togglePassword(inputId, toggleElement) {
//     const passwordInput = document.getElementById(inputId);
//     const icon = toggleElement.querySelector('i');
    
//     if (passwordInput.type === 'password') {
//         passwordInput.type = 'text';
//         icon.classList.remove('bi-eye');
//         icon.classList.add('bi-eye-slash');
//     } else {
//         passwordInput.type = 'password';
//         icon.classList.remove('bi-eye-slash');
//         icon.classList.add('bi-eye');
//     }
// }

// // Funciones del modal
// function openLoginModal() {
//     document.getElementById('loginModal').style.display = 'block';
//     document.body.style.overflow = 'hidden'; // Prevenir scroll del body
// }

// function closeLoginModal() {
//     document.getElementById('loginModal').style.display = 'none';
//     document.body.style.overflow = 'auto'; // Restaurar scroll del body
// }

// // Función para mostrar mensaje de recuperar contraseña
// function showForgotPassword() {
//     alert('Función de recuperar contraseña - Aquí integrarías tu lógica de recuperación');
// }

// // Cerrar modal al hacer clic fuera de él
// window.onclick = function(event) {
//     const modal = document.getElementById('loginModal');
//     if (event.target === modal) {
//         closeLoginModal();
//     }
// }

// // Cerrar modal con la tecla Escape
// document.addEventListener('keydown', function(event) {
//     if (event.key === 'Escape') {
//         closeLoginModal();
//     }
// });

// // Validación de contraseñas en registro
// function validatePasswords() {
//     const password = document.getElementById('contraseña').value;
//     const confirmPassword = document.getElementById('confirmarContraseña').value;
    
//     if (password !== confirmPassword) {
//         alert('Las contraseñas no coinciden');
//         return false;
//     }
    
//     // Validación de longitud mínima
//     if (password.length < 6) {
//         alert('La contraseña debe tener al menos 6 caracteres');
//         return false;
//     }
    
//     return true;
// }

// // Validación de email
// function validateEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

// // Función para manejar el registro
// function handleRegistration(formData) {
//     // Aquí puedes agregar la lógica para enviar los datos al servidor
//     console.log('Datos de registro:', formData);
    
//     // Ejemplo de envío con fetch (descomenta cuando tengas el endpoint)
//     /*
//     fetch('/api/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Éxito:', data);
//         alert('Registro exitoso!');
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         alert('Error en el registro');
//     });
//     */
    
//     // Simulación de registro exitoso
//     alert('Registro exitoso! (Conecta con tu backend)');
// }

// // Función para manejar el login
// function handleLogin(formData) {
//     // Aquí puedes agregar la lógica para validar el login
//     console.log('Datos de login:', formData);
    
//     // Ejemplo de envío con fetch (descomenta cuando tengas el endpoint)
//     /*
//     fetch('/api/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             console.log('Login exitoso:', data);
//             alert('Login exitoso!');
//             closeLoginModal();
//             // Redirigir o actualizar la interfaz según necesites
//         } else {
//             alert('Credenciales incorrectas');
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         alert('Error en el login');
//     });
//     */
    
//     // Simulación de login exitoso
//     alert(`Login exitoso para: ${formData.email} (Conecta con tu backend)`);
//     closeLoginModal();
// }

// // Event Listeners cuando el DOM está cargado
// document.addEventListener('DOMContentLoaded', function() {
    
//     // Manejar envío del formulario de registro
//     document.getElementById('registroUsuario').addEventListener('submit', function(e) {
//         e.preventDefault();
        
//         // Validar contraseñas
//         if (!validatePasswords()) {
//             return;
//         }
        
//         // Obtener datos del formulario
//         const formData = {
//             nombre: document.getElementById('nombre').value,
//             correo: document.getElementById('Correo').value,
//             contraseña: document.getElementById('contraseña').value
//         };
        
//         // Validar email
//         if (!validateEmail(formData.correo)) {
//             alert('Por favor ingresa un email válido');
//             return;
//         }
        
//         // Validar que el nombre no esté vacío
//         if (formData.nombre.trim() === '') {
//             alert('Por favor ingresa tu nombre completo');
//             return;
//         }
        
//         // Procesar registro
//         handleRegistration(formData);
//     });
    
//     // Manejar envío del formulario de login
//     document.getElementById('loginForm').addEventListener('submit', function(e) {
//         e.preventDefault();
        
//         // Obtener datos del formulario
//         const formData = {
//             email: document.getElementById('loginEmail').value,
//             password: document.getElementById('loginPassword').value
//         };
        
//         // Validar email
//         if (!validateEmail(formData.email)) {
//             alert('Por favor ingresa un email válido');
//             return;
//         }
        
//         // Validar que la contraseña no esté vacía
//         if (formData.password.trim() === '') {
//             alert('Por favor ingresa tu contraseña');
//             return;
//         }
        
//         // Procesar login
//         handleLogin(formData);
//     });
    
//     // Agregar efectos visuales adicionales
//     const inputs = document.querySelectorAll('.textfield');
    
//     inputs.forEach(input => {
//         // Efecto focus adicional
//         input.addEventListener('focus', function() {
//             this.parentElement.classList.add('focused');
//         });
        
//         input.addEventListener('blur', function() {
//             this.parentElement.classList.remove('focused');
//         });
//     });
// });

// // Función para mostrar mensajes de error personalizados
// function showError(message, type = 'error') {
//     // Crear elemento de notificación
//     const notification = document.createElement('div');
//     notification.className = `notification ${type}`;
//     notification.textContent = message;
    
//     // Estilos inline para la notificación
//     notification.style.cssText = `
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         background: ${type === 'error' ? '#ff4444' : '#7ab021'};
//         color: white;
//         padding: 15px 20px;
//         border-radius: 8px;
//         box-shadow: 0 4px 15px rgba(0,0,0,0.2);
//         z-index: 1001;
//         animation: slideIn 0.3s ease-out;
//         max-width: 300px;
//         word-wrap: break-word;
//     `;
    
//     document.body.appendChild(notification);
    
//     // Remover después de 3 segundos
//     setTimeout(() => {
//         notification.style.animation = 'slideOut 0.3s ease-in';
//         setTimeout(() => {
//             if (notification.parentElement) {
//                 notification.parentElement.removeChild(notification);
//             }
//         }, 300);
//     }, 3000);
// }

// // Agregar estilos CSS para las animaciones de notificación
// const style = document.createElement('style');
// style.textContent = `
//     @keyframes slideIn {
//         from {
//             opacity: 0;
//             transform: translateX(100%);
//         }
//         to {
//             opacity: 1;
//             transform: translateX(0);
//         }
//     }
    
//     @keyframes slideOut {
//         from {
//             opacity: 1;
//             transform: translateX(0);
//         }
//         to {
//             opacity: 0;
//             transform: translateX(100%);
//         }
//     }
    
//     .textfield-wrapper.focused {
//         transform: scale(1.02);
//         transition: transform 0.2s ease;
//     }
// `;
// document.head.appendChild(style);


// // ======================= REGISTRO =======================
// function handleRegistration(formData) {
//     // Guardar usuario en localStorage
//     localStorage.setItem('usuario', JSON.stringify(formData));

//     alert('Registro exitoso!');
//     mostrarUsuarioEnNav(formData.nombre);
// }

// // ======================= LOGIN =======================
// function handleLogin(formData) {
//     const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

//     if (!usuarioGuardado) {
//         alert('No hay usuarios registrados. Regístrate primero.');
//         return;
//     }

//     if (formData.email === usuarioGuardado.correo && formData.password === usuarioGuardado.contraseña) {
//         alert('Login exitoso!');
//         closeLoginModal();
//         mostrarUsuarioEnNav(usuarioGuardado.nombre);
//     } else {
//         alert('Credenciales incorrectas');
//     }
// }

// // ======================= LOGOUT =======================
// function handleLogout() {
//     localStorage.removeItem('usuario');
//     alert('Sesión cerrada');

//     const usuarioNav = document.getElementById('usuarioNav');
//     if (usuarioNav) {
//         usuarioNav.innerHTML = `<i class="bi bi-person"></i>`; // vuelve a mostrar el ícono
//     }
// }

// // ======================= MOSTRAR EN NAV =======================
// function mostrarUsuarioEnNav(nombre) {
//     const usuarioNav = document.getElementById('usuarioNav');
//     if (usuarioNav) {
//         usuarioNav.innerHTML = `
//             Hola, ${nombre} 
//             <button id="logoutBtn" style="margin-left:10px; padding:4px 8px; font-size:12px; cursor:pointer;">
//                 Cerrar sesión
//             </button>
//         `;

//         // Asignar evento al botón de logout
//         document.getElementById('logoutBtn').addEventListener('click', handleLogout);
//     }
// }

// // ======================= DOM READY =======================
// document.addEventListener('DOMContentLoaded', function() {
//     // -------- Registro --------
//     const registroForm = document.getElementById('registroUsuario');
//     if (registroForm) {
//         registroForm.addEventListener('submit', function(e) {
//             e.preventDefault();

//             // Validar contraseñas
//             if (!validatePasswords()) return;

//             const formData = {
//                 nombre: document.getElementById('nombre').value,
//                 correo: document.getElementById('Correo').value,
//                 contraseña: document.getElementById('contraseña').value
//             };

//             if (!validateEmail(formData.correo)) {
//                 alert('Por favor ingresa un email válido');
//                 return;
//             }

//             if (formData.nombre.trim() === '') {
//                 alert('Por favor ingresa tu nombre completo');
//                 return;
//             }

//             handleRegistration(formData);
//         });
//     }

//     // -------- Login --------
//     const loginForm = document.getElementById('loginForm');
//     if (loginForm) {
//         loginForm.addEventListener('submit', function(e) {
//             e.preventDefault();

//             const formData = {
//                 email: document.getElementById('loginEmail').value,
//                 password: document.getElementById('loginPassword').value
//             };

//             if (!validateEmail(formData.email)) {
//                 alert('Por favor ingresa un email válido');
//                 return;
//             }

//             if (formData.password.trim() === '') {
//                 alert('Por favor ingresa tu contraseña');
//                 return;
//             }

//             handleLogin(formData);
//         });
//     }

//     // -------- Mantener sesión al recargar --------
//     const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
//     if (usuarioGuardado) {
//         mostrarUsuarioEnNav(usuarioGuardado.nombre);
//     }
// });
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("mtbNavbar").innerHTML = data;

    // Espera a que el HTML esté en el DOM
    // const mtbUser = document.getElementById("mtbUser");
    // const mtbAdmin = document.getElementById("mtbAdmin");
    // const mtbInSesion= document.getElementById("mtbInSesion"); // Cambiado aquí

    // if (mtbUser && mtbAdmin && mtbInSesion) {
    //   mtbOpen.addEventListener("click", () => {
    //     mtbBUser.style.display = "inline-block";
    //   });
    //   mtbClose.addEventListener("click", () => {
    //     mtbBox.style.display = "none";
    //   });
    // }
    if (mtbUser && mtbAdmin && mtbInSesion) {
      mtbOpen.addEventListener("click", () => {
        mtbUser.style.display = "inline-block";
      });
      mtbClose.addEventListener("click", () => {
        mtbBox.style.display = "none";
      });
    }
  });

function handleUserButton() {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioGuardado) {
        // Nadie logueado → abrir modal
        openLoginModal();
        return;
    }

    if (usuarioGuardado.correo === "admin@correo.com") { 
        // Cambia el correo por el de tu admin
        mostrarAdmin();
    } else {
        // Usuario normal → mostrar modal de perfil o mensaje
        alert(`Hola ${usuarioGuardado.nombre}, aquí iría tu perfil de usuario.`);
    }
}

// ======================= TOGGLE PASSWORD =======================
function togglePassword(inputId, toggleElement) {
    const passwordInput = document.getElementById(inputId);
    const icon = toggleElement.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
}

// function togglePasswordAdmin(inputId, toggleElement) {
//     const passwordInput = document.getElementById(inputId);
//     const icon = toggleElement.querySelector('i');
    
//     if (passwordInput.type === 'password') {
//         passwordInput.type = 'text';
//         icon.classList.remove('bi-eye');
//         icon.classList.add('bi-eye-slash');
//     } else {
//         passwordInput.type = 'password';
//         icon.classList.remove('bi-eye-slash');
//         icon.classList.add('bi-eye');
//     }
// }

// ======================= MODAL =======================
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openAdminModal() {
    document.getElementById('adminModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showForgotPassword() {
    alert('Función de recuperar contraseña - Aquí integrarías tu lógica de recuperación');
}

window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) closeLoginModal();
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeLoginModal();
});

// ======================= VALIDACIONES =======================
function validatePasswords() {
    const password = document.getElementById('contraseña').value;
    const confirmPassword = document.getElementById('confirmarContraseña').value;
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return false;
    }
    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return false;
    }
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ======================= REGISTRO =======================
function handleRegistration(formData) {
    localStorage.setItem('usuario', JSON.stringify(formData));
    alert('Registro exitoso!');
    mostrarUsuarioEnNav(formData.nombre);
}

// ======================= LOGIN =======================
function handleLogin(formData) {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioGuardado) {
        alert('No hay usuarios registrados. Regístrate primero.');
        return;
    }

    if (formData.email === usuarioGuardado.correo && formData.password === usuarioGuardado.contraseña) {
        alert('Login exitoso!');
        closeLoginModal();
        mostrarUsuarioEnNav(usuarioGuardado.nombre);
    } else {
        alert('Credenciales incorrectas');
    }
}

// ======================= LOGOUT =======================
function handleLogout() {
    localStorage.removeItem('usuario');
    alert('Sesión cerrada');

    const usuarioNav = document.getElementById('usuarioNav');
    if (usuarioNav) {
        usuarioNav.innerHTML = `<i class="bi bi-person"></i>`;
    }
}

// ======================= NAV =======================
function mostrarUsuarioEnNav(nombre) {
    const usuarioNav = document.getElementById('usuarioNav');
    if (usuarioNav) {
        usuarioNav.innerHTML = `
            Hola, ${nombre} 
            <button id="logoutBtn" style="margin-left:10px; padding:4px 8px; font-size:12px; cursor:pointer;">
                Cerrar sesión
            </button>
        `;
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    }
}

// ======================= DOM READY =======================
document.addEventListener('DOMContentLoaded', function() {
    // ---- Registro ----
    const registroForm = document.getElementById('registroUsuario');
    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!validatePasswords()) return;

            const formData = {
                nombre: document.getElementById('nombre').value,
                correo: document.getElementById('Correo').value,
                contraseña: document.getElementById('contraseña').value
            };

            if (!validateEmail(formData.correo)) {
                alert('Por favor ingresa un email válido');
                return;
            }
            if (formData.nombre.trim() === '') {
                alert('Por favor ingresa tu nombre completo');
                return;
            }
            handleRegistration(formData);
        });
    }

    // ---- Login ----
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                email: document.getElementById('loginEmail').value,
                password: document.getElementById('loginPassword').value
            };
            if (!validateEmail(formData.email)) {
                alert('Por favor ingresa un email válido');
                return;
            }
            if (formData.password.trim() === '') {
                alert('Por favor ingresa tu contraseña');
                return;
            }
            handleLogin(formData);
        });
    }

    // ---- Mantener sesión ----
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioGuardado) {
        mostrarUsuarioEnNav(usuarioGuardado.nombre);
    }
});

