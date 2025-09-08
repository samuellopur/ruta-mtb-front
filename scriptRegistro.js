// ======================= TOGGLE PASSWORD - GLOBAL =======================
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

// ======================= MODALS - GLOBAL =======================
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
    Swal.fire({
        icon: 'info',
        title: 'Recuperar Contraseña',
        text: 'Aquí iría la lógica para enviar un enlace de recuperación a tu correo.'
    });
}

window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    const adminModal = document.getElementById('adminModal');
    if (event.target === modal) closeLoginModal();
    if (event.target === adminModal) closeAdminModal();
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLoginModal();
        closeAdminModal();
    }
});

// ======================= VALIDACIONES =======================
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePasswords() {
    const passwordInput = document.getElementById('contraseña');
    const confirmPasswordInput = document.getElementById('confirmarContraseña');
    if (!passwordInput || !confirmPasswordInput) return false;

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    const isLengthValid = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const passwordsMatch = password === confirmPassword;

    const checklist = {
        length: document.getElementById("check-length"),
        number: document.getElementById("check-number"),
        special: document.getElementById("check-special"),
        uppercase: document.getElementById("check-uppercase"),
        match: document.getElementById("check-match")
    };

    if (checklist.length) checklist.length.innerHTML = `${isLengthValid ? '<span style="color:green">✔️</span>' : '<span style="color:red">❌</span>'} Mínimo 8 caracteres`;
    if (checklist.number) checklist.number.innerHTML = `${hasNumber ? '<span style="color:green">✔️</span>' : '<span style="color:red">❌</span>'} Al menos un número`;
    if (checklist.special) checklist.special.innerHTML = `${hasSpecialChar ? '<span style="color:green">✔️</span>' : '<span style="color:red">❌</span>'} Al menos un carácter especial (!@#$%^&*)`;
    if (checklist.uppercase) checklist.uppercase.innerHTML = `${hasUppercase ? '<span style="color:green">✔️</span>' : '<span style="color:red">❌</span>'} Al menos una mayúscula`;
    if (checklist.match) checklist.match.innerHTML = `${passwordsMatch ? '<span style="color:green">✔️</span>' : '<span style="color:red">❌</span>'} Las contraseñas coinciden`;
    
    return isLengthValid && hasNumber && hasSpecialChar && hasUppercase && passwordsMatch;
}

// ======================= REGISTRO =======================
function handleRegistration(formData) {
    localStorage.setItem('usuario', JSON.stringify(formData));
    Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu usuario ha sido creado correctamente.',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        window.location.href = 'index.html'; 
    });
}

// ======================= LOGIN =======================
function handleLogin(formData) {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioGuardado) {
        Swal.fire({
            icon: 'warning',
            title: 'Sin usuarios registrados',
            text: 'Regístrate primero para iniciar sesión.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (formData.email === usuarioGuardado.correo && formData.password === usuarioGuardado.contraseña) {
        Swal.fire({
            icon: 'success',
            title: '¡Login exitoso!',
            text: `Bienvenido, ${usuarioGuardado.nombre}`,
            confirmButtonText: 'Continuar'
        }).then(() => {
            closeLoginModal();
            window.location.href = 'index.html';
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas',
            text: 'Verifica tu correo y contraseña.',
            confirmButtonText: 'Intentar de nuevo'
        });
    }
}

// ======================= LÓGICA DE EVENTOS (DOM READY) =======================
document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroUsuario');
    const loginForm = document.getElementById('loginForm');
    const passwordInputs = document.querySelectorAll('.password-input');
    const passwordInfo = document.getElementById("passwordInfo");
    
    // Nueva lógica para mostrar/ocultar el checklist flotante
    let passwordFocusCount = 0;
    function showPasswordInfo() {
        if (passwordInfo && window.innerWidth > 700) {
            passwordInfo.style.display = 'block';
            setTimeout(() => passwordInfo.style.opacity = '1', 10);
        }
    }
    function hidePasswordInfo() {
        if (passwordInfo && window.innerWidth > 700) {
            passwordInfo.style.opacity = '0';
            setTimeout(() => passwordInfo.style.display = 'none', 600);
        }
    }
    if (passwordInputs.length > 0) {
        passwordInputs.forEach(input => {
            input.addEventListener('focus', function() {
                passwordFocusCount++;
                showPasswordInfo();
            });
            input.addEventListener('blur', function() {
                // Usamos setTimeout para esperar si el usuario pasa de un campo al otro
                setTimeout(function() {
                    passwordFocusCount--;
                    if (passwordFocusCount <= 0) {
                        hidePasswordInfo();
                        passwordFocusCount = 0;
                    }
                }, 10);
            });
            input.addEventListener('input', validatePasswords);
        });
    }
    
    // Evento de envío del formulario de registro
    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('Correo').value.trim();

            if (nombre === '') {
                Swal.fire({ icon: 'warning', title: 'Nombre vacío', text: 'Por favor, ingresa tu nombre completo.' });
                return;
            }
            if (!validateEmail(correo)) {
                Swal.fire({ icon: 'error', title: 'Email inválido', text: 'Por favor, ingresa un email válido.' });
                return;
            }
            if (!validatePasswords()) {
                Swal.fire({ icon: 'warning', title: 'Contraseña no válida', text: 'Por favor, asegúrate de que tu contraseña cumple con todos los requisitos.' });
                return;
            }

            const formData = {
                nombre: nombre,
                correo: correo,
                contraseña: document.getElementById('contraseña').value
            };
            
            handleRegistration(formData);
        });
    }

    // Evento de envío del formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                email: document.getElementById('loginEmail').value,
                password: document.getElementById('loginPassword').value
            };
            if (!validateEmail(formData.email)) {
                Swal.fire({ icon: 'error', title: 'Email inválido', text: 'Por favor, ingresa un email válido.' });
                return;
            }
            if (formData.password.trim() === '') {
                Swal.fire({ icon: 'warning', title: 'Contraseña vacía', text: 'Por favor, ingresa tu contraseña.' });
                return;
            }
            handleLogin(formData);
        });
    }
});