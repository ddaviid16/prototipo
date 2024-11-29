// Formato del código postal
function formatZip(input) {
    input.value = input.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
}

// Guardar domicilio
function guardarDomicilio() {
    const calle = document.getElementById('calle').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const errorMsg = document.getElementById('error-msg');

    // Validar campos
    const calleRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const zipRegex = /^\d{5}$/;

    if (!calle || !numero || !ciudad || !estado || !zip) {
        errorMsg.textContent = 'Por favor, complete todos los campos.';
        return;
    }

    if (!calleRegex.test(calle)) {
        errorMsg.textContent = 'Calle inválida. Ingresa al menos dos palabras.';
        return;
    }

    if (!zipRegex.test(zip)) {
        errorMsg.textContent = 'Código postal inválido. Debe contener 5 dígitos.';
        return;
    }

    // Guardar datos en localStorage
    localStorage.setItem('domicilio', JSON.stringify({ calle, numero, ciudad, estado, zip }));
    errorMsg.textContent = `Domicilio guardado exitosamente.`;
        
    // Redirigir después de 1.5 segundos
        setTimeout(() => {
            window.location.href = "informationCard.html";
        }, 1500);
    
}

function formatCVV(input) {
    input.value = input.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
}
// Formatear fecha de vencimiento
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4); // Agrega la diagonal
    }
    input.value = value;
}

let NumeroPedido = 0;

// Función para procesar el pago y actualizar el número de pedido
function procesarPago() {
    const cardHolder = document.getElementById('card-holder').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const errorMsg = document.getElementById('error-msg');

    // Validar campos
    const cardHolderRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!cardHolderRegex.test(cardHolder)) {
        errorMsg.textContent = 'Nombre del titular de la tarjeta inválido. Debe contener al menos nombre y apellido.';
        return;
    }
    const cardNumberRegex = /^\d{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardHolder || !cardNumber || !expiryDate || !cvv) {
        errorMsg.textContent = 'Por favor, complete todos los campos.';
        return;
    }

    if (!cardHolderRegex.test(cardHolder)) {
        errorMsg.textContent = 'Nombre del titular inválido. Debe contener al menos nombre y apellido.';
        return;
    }

    if (!cardNumberRegex.test(cardNumber)) {
        errorMsg.textContent = 'Número de tarjeta inválido. Debe contener 16 dígitos.';
        return;
    }

    if (!expiryDateRegex.test(expiryDate)) {
        errorMsg.textContent = 'Fecha de vencimiento inválida. Debe estar en formato MM/AA.';
        return;
    }

    const [expMonth, expYear] = expiryDate.split('/').map(Number);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        errorMsg.textContent = 'Fecha de vencimiento inválida. La tarjeta está vencida.';
        return;
    }

    if (!cvvRegex.test(cvv)) {
        errorMsg.textContent = 'CVV inválido. Debe contener 3 dígitos.';
        return;
    }

    try {
        // Vaciar carrito
        cart = [];
        saveCart();
        updateCart();
        console.log("Carrito vaciado correctamente.");
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
    }
    
    // Procesar pago
    const totalPrice = localStorage.getItem('totalPrice') || '0.00';
    
errorMsg.textContent = `Pago de $${totalPrice} procesado exitosamente.`;
    // Esperar 3 segundos y redirigir a tenkiu.html
setTimeout(() => {
    window.location.href = "tenkiu.html";
}, 3000);
}



