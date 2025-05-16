document.addEventListener('DOMContentLoaded', function() {
    const purchaseForm = document.getElementById('purchaseForm');

    if (purchaseForm) {
        purchaseForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            localStorage.setItem('mostrarConfirmacionCompra', 'true');

            window.location.href = 'Página principal.html';
        });
        
    } else {
        console.error('El formulario con id "purchaseForm" no fue encontrado.');
    }
});

function soloNumeros(campo) {
      campo.value = campo.value.replace(/[^0-9]/g, '');
    }