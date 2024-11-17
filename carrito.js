let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const emptyCartMessage = document.getElementById("empty-cart-message");
const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout-button");


function updateCart() {
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
    } else {
        emptyCartMessage.style.display = "none";
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Precio: ${item.price}</p>
                    <div class="quantity">
                        <button class="decrease-quantity" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Añadir eventos para modificar cantidades y eliminar productos
        document.querySelectorAll(".decrease-quantity").forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                saveCart();
                updateCart();
            });
        });

        document.querySelectorAll(".increase-quantity").forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                cart[index].quantity += 1;
                saveCart();
                updateCart();
            });
        });

        document.querySelectorAll(".remove-item").forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                cart.splice(index, 1);
                saveCart();
                updateCart();
            });
        });
    }
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Vaciar carrito
clearCartButton.addEventListener("click", () => {
    cart = [];
    saveCart();
    updateCart();
});

// Finalizar compra (simulado xd)
checkoutButton.addEventListener("click", () => {
    if (cart.length > 0) {
        alert("Gracias por tu compra. ¡Pedido realizado!");
        cart = [];
        saveCart();
        updateCart();
    } else {
        alert("Tu carrito está vacío.");
    }
});


updateCart();
