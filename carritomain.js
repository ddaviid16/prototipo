let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCopy = JSON.parse(localStorage.getItem("cart")) || [];


const cartItemsContainer = document.getElementById("cart-items");
const emptyCartMessage = document.getElementById("empty-cart-message");
const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout-button");
const totalPriceContainer = document.getElementById("total-price");

function updateTotalPrice() {
    const totalPrice = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', '').replace(',', ''));
        const quantity = parseInt(item.quantity, 10);
        if (isNaN(price) || isNaN(quantity)) {
            return sum;
        }
        return sum + price * quantity;
    }, 0);
    totalPriceContainer.textContent = `Total a pagar: $${totalPrice.toFixed(2)}`;
    localStorage.setItem("totalPrice", totalPrice.toFixed(2)); // Guardar el total en localStorage
}



// Función para sincronizar la copia del carrito
function updateCartCopy() {
    cartCopy = [...cart]; // Crea una copia del carrito actual
    localStorage.setItem("cartCopy", JSON.stringify(cartCopy)); // Guardar la copia en localStorage
}

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
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.querySelectorAll(".increase-quantity").forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                const productId = cart[index].id;
                const product = galleryProducts.find((p) => p.id === productId);
        
                if (cart[index].quantity < product.stock) {
                    cart[index].quantity += 1;
                    saveCart();
                    updateCart();
                } else {
                    alert(`No puedes agregar más de ${product.stock} unidades de "${product.name}".`);
                }
            });
        });
        
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

        document.querySelectorAll(".remove-item").forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                cart.splice(index, 1);
                saveCart();
                updateCart();
            });
        });
    }
    updateTotalPrice();
}
// Función para agregar productos al carrito
function addToCart(productId) {
    const product = galleryProducts.find((p) => p.id === productId);
    if (product) {
        if (product.stock === 0) {
            alert(`El producto "${product.name}" está agotado.`);
            return;
        }
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            if (existingProduct.quantity < product.stock) {
                existingProduct.quantity += 1; // Incrementar la cantidad si hay suficiente stock
            } else {
                alert(`Solo puedes agregar hasta ${product.stock} unidades de "${product.name}".`);
                return;
            }
        } else {
            cart.push({ ...product, quantity: 1 }); // Agregar el producto como nuevo
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`Agregaste "${product.name}" al carrito.`);
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

// Finalizar compra
checkoutButton.addEventListener("click", () => {
    if (cart.length > 0) {
        const totalPrice = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('$', '').replace(',', ''));
            const quantity = parseInt(item.quantity, 10);
            const product = galleryProducts.find(p => p.id === item.id);
            cart.forEach(item => {
                const product = galleryProducts.find(p => p.id === item.id);
                if (product) {
                    product.stock -= item.quantity; // Disminuir el stock del producto
                }
            });
            if (isNaN(price) || isNaN(quantity)) {
                return sum;
            }
            return sum + price * quantity;
        }, 0);
        // Actualizar la base de datos de productos en el localStorage
        localStorage.setItem("galleryProducts", JSON.stringify(galleryProducts));
        localStorage.setItem("totalPrice", totalPrice);
        // Guardar la copia del carrito como productos comprados en orderDetails
        localStorage.setItem("DetallesPedidos", JSON.stringify(cartCopy));
        window.location.href = "Information.html";
    } else {
        alert("Tu carrito está vacío.");
    }
});


updateCart();
