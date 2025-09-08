
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("mtbNavbar").innerHTML = data;

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

