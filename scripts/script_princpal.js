
let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const checkoutButton = document.getElementById("checkout");
const totalElement = document.getElementById("total");
const purchaseModal = document.getElementById("purchase-modal");
const closePurchase = document.getElementById("close-purchase");

// ----- NUEVA FUNCIÓN -----
// Función para verificar si el usuario está logueado consultando localStorage
function checkUserLoggedIn() {
    return localStorage.getItem('isUserLoggedIn') === 'true';
}
// ----- FIN NUEVA FUNCIÓN -----

// Modificación del Event Listener para los botones "Agregar a carrito"
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        // ----- NUEVA VERIFICACIÓN -----
        if (!checkUserLoggedIn()) {
            alert("Debes iniciar sesión o registrarte para agregar productos al carrito.");
            // Opcional: Redirigir a la página de inicio de sesión si prefieres
            // window.location.href = 'inicio.html';
            return; // Detiene la ejecución aquí si el usuario no está logueado
        }
        // ----- FIN NUEVA VERIFICACIÓN -----

        // Si la verificación pasa (usuario logueado), se ejecuta el código original para agregar al carrito:
        const productCard = button.closest(".card-product");
        const productName = productCard.querySelector("h4").textContent;
        const productPrice = parseFloat(productCard.querySelector(".price").textContent.replace("$", ""));
        const product = { name: productName, price: productPrice };

        cart.push(product);
        updateCartCount();
        saveCart(); // Guardar carrito en localStorage
        updateTotal();
        alert(productName + " ha sido agregado al carrito."); // Feedback visual
    });
});

// Funciones existentes (updateCartCount, displayCart, updateTotal)
function updateCartCount() {
    cartCount.textContent = cart.length;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
    cartItems.innerHTML = ''; // Limpiar items anteriores
    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`; // .toFixed(2) para mostrar dos decimales
        cartItems.appendChild(li);
    });
    updateTotal(); // Asegúrate de actualizar el total cada vez que se muestra el carrito
}

function updateTotal() {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    totalElement.textContent = `Total: $${total.toFixed(2)}`; // .toFixed(2) para mostrar dos decimales
}

// Event listener para el icono del carrito (esto ya lo tenías, solo revisa el preventDefault)
document.getElementById("cart-icon").addEventListener("click", function(event) {
    event.preventDefault(); // Importante para enlaces con href="#"
    cartModal.style.display = "flex";
    displayCart(); // Muestra los items y actualiza el total
});

// Event listener para cerrar el modal del carrito (esto ya lo tenías)
closeCart.addEventListener("click", function() {
    cartModal.style.display = "none";
});

// Modificación del Event Listener para el botón "Confirmación de la compra" (checkout)
checkoutButton.addEventListener("click", function() {
    // ----- NUEVA VERIFICACIÓN -----
    if (!checkUserLoggedIn()) {
        alert("Debes iniciar sesión o registrarte para proceder con la compra.");
        cartModal.style.display = "none"; // Ocultar el modal del carrito
        // Opcional: Redirigir
        // window.location.href = 'inicio.html';
        return; // Detener si no está logueado
    }
    // ----- FIN NUEVA VERIFICACIÓN -----

    if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    cartModal.style.display = "none";
    // Asegúrate que el nombre del archivo sea exacto, incluyendo mayúsculas/minúsculas
    window.location.href = "Formulario_compra.html";
});

// Event listener para cerrar el modal de compra finalizada (esto ya lo tenías)
closePurchase.addEventListener("click", function() {
    purchaseModal.style.display = "none";
});

// Función para cargar el carrito desde localStorage al cargar la página (esto ya lo tenías)
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        // No es estrictamente necesario llamar a updateTotal() aquí si displayCart() lo hará
        // o si se llama explícitamente después de cargar la página (como más abajo).
    }
}

// Función para mostrar el modal de confirmación de compra si es necesario (esto ya lo tenías)
function checkAndShowPurchaseConfirmation() {
    if (localStorage.getItem('mostrarConfirmacionCompra') === 'true') {
        purchaseModal.style.display = "flex";
        // Limpiar el carrito después de una compra exitosa y el localStorage de esa compra
        cart = [];
        updateCartCount();
        saveCart(); // Guarda el carrito vacío
        updateTotal(); // Actualiza el total a $0.00
        localStorage.removeItem('mostrarConfirmacionCompra');
    }
}


// --- Código que se ejecuta cuando el DOM de la página principal está listo ---
document.addEventListener('DOMContentLoaded', function() {
    loadCart(); // Carga el carrito guardado
    checkAndShowPurchaseConfirmation(); // Verifica si debe mostrar el modal de compra completada

    // ----- NUEVA LÓGICA PARA ACTUALIZAR BOTONES DE USUARIO Y CERRAR SESIÓN -----
    const userActionsDiv = document.querySelector('.user-actions'); // El div que contiene los botones Registrar/Iniciar Sesión
    if (userActionsDiv) {
        if (checkUserLoggedIn()) {
            // Si el usuario está logueado, cambia los botones a "Cerrar Sesión"
            userActionsDiv.innerHTML = `
                <a href="#" id="logout-button" class="nav-button">Cerrar Sesión</a>
            `;

            const logoutButton = document.getElementById('logout-button');
            if (logoutButton) {
                logoutButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    localStorage.removeItem('isUserLoggedIn'); // Elimina la bandera de sesión
                    // Opcional: decidir si quieres limpiar el carrito al cerrar sesión
                    // localStorage.removeItem('cart');
                    // cart = [];
                    // updateCartCount();
                    // updateTotal();
                    alert('Has cerrado sesión.');
                    window.location.reload(); // Recarga la página para reflejar el cambio
                });
            }
        } else {
            // Si el usuario NO está logueado, los botones "Registrar" e "Iniciar Sesión"
            // ya están en el HTML, así que no es necesario hacer nada aquí.
            // Podrías asegurarte de que estén visibles si los hubieras ocultado antes.
        }
    }
    // ----- FIN NUEVA LÓGICA -----

    // Actualizar el total del carrito al cargar la página, en caso de que se haya cargado un carrito.
    if (cart.length > 0) {
        updateTotal();
    }
});