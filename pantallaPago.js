// Simulación del total del carrito de compras
const totalCarrito = 123.45; // Este valor debería ser dinámico en una aplicación real
document.getElementById('total-amount').textContent = `$${totalCarrito.toFixed(2)}`;
document.addEventListener("DOMContentLoaded", () => {
    const totalPrice = localStorage.getItem("totalPrice");
    if (totalPrice) {
        const totalPriceContainer = document.createElement("p");
        totalPriceContainer.textContent = `Total a pagar: $${totalPrice}`;
        document.querySelector(".login-container").appendChild(totalPriceContainer);
    }
});

function procesarPago() {
    const cardHolder = document.getElementById('card-holder').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    const errorMsg = document.getElementById('error-msg');

    // Validar nombre del titular de la tarjeta
    const cardHolderRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!cardHolderRegex.test(cardHolder)) {
        errorMsg.textContent = 'Nombre del titular de la tarjeta inválido. Debe contener al menos nombre y apellido.';
        return;
    }

    // Validar número de tarjeta (16 dígitos)
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
        errorMsg.textContent = 'Número de tarjeta inválido. Debe contener 16 dígitos.';
        return;
    }

    // Validar fecha de vencimiento (MM/AA)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDateRegex.test(expiryDate)) {
        errorMsg.textContent = 'Fecha de vencimiento inválida. Debe estar en formato MM/AA.';
        return;
    }

    // Validar CVV (3 dígitos)
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
        errorMsg.textContent = 'CVV inválido. Debe contener 3 dígitos.';
        return;
    }

    // Simular procesamiento de pago
    const totalPrice = localStorage.getItem("totalPrice");
    errorMsg.textContent = `Pago de $${totalPrice} procesado exitosamente.`;
    // Esperar 5 segundos y redirigir a tenkiu.html
setTimeout(() => {
    window.location.href = "tenkiu.html";
}, 5000);
}
