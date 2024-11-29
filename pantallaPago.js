let totalCarrito = 0;
document.getElementById('total-amount').textContent = `$${totalCarrito.toFixed(2)}`;
document.addEventListener("DOMContentLoaded", () => {
    const totalPrice = localStorage.getItem("totalPrice");
    if (totalPrice) {
        const totalPriceContainer = document.createElement("p");
        totalPriceContainer.textContent = `Total a pagar: $${totalPrice}`;
        document.querySelector(".login-container").appendChild(totalPriceContainer);
    }
});

function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4); // Agrega la diagonal
    }
    input.value = value;
}

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
    // Verificar si la fecha de vencimiento es menor a la fecha actual
    const [expMonth, expYear] = expiryDate.split('/').map(Number);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; //Obtener el mes actual
    const currentYear = currentDate.getFullYear() % 100; // Obtener los últimos dos dígitos del año

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        errorMsg.textContent = 'Fecha de vencimiento inválida. La tarjeta está vencida.';
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
    // Esperar 3 segundos y redirigir a tenkiu.html
setTimeout(() => {
    window.location.href = "tenkiu.html";
}, 3000);
}
