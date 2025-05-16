window.onload = function() {
    alert("Hola que bueno verte de bueno.");
  };

  document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm'); // Asegúrate de que tu formulario tenga id="loginForm"

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();


            alert("¡Inicio de sesión exitoso!");
            localStorage.setItem('isUserLoggedIn', 'true'); // <-- ¡NUEVO! Marca al usuario como logueado
            window.location.href = 'Página principal.html';
        });
        
    } else {
        console.error('El formulario de inicio de sesión (loginForm) no fue encontrado.');
    }
});

