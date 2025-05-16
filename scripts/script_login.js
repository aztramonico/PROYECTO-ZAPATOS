
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm'); // Asegúrate de que tu formulario tenga id="registerForm"

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();


            alert("¡Registro exitoso!");
            localStorage.setItem('isUserLoggedIn', 'true'); // <-- ¡NUEVO! Marca al usuario como logueado
            window.location.href = 'Página principal.html';
        });

    } else {
        console.error('El formulario de registro (registerForm) no fue encontrado.');
    }
});

function soloNumeros(campo) {
      campo.value = campo.value.replace(/[^0-9]/g, '');
    }