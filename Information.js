// Formato del código postal
function formatZip(input) {
    input.value = input.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
}
const addressList = document.getElementById('address-list');
const paymentList = document.getElementById('payment-list');
const formModal = document.getElementById('form-modal');
const dynamicForm = document.getElementById('dynamic-form');
const modalTitle = document.getElementById('modal-title');
const saveBtn = document.getElementById('save-btn');
let editingType = ''; // 'address' o 'payment'

// Manejo del almacenamiento local
const saveToLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

// Función para renderizar las direcciones
function renderAddresses() {
    const addresses = getAddresses();
    addressList.innerHTML = ''; // Limpiar la lista de direcciones antes de renderizar
    addresses.forEach((address, index) => {
        const item = document.createElement('div');
        item.className = 'selectable-item';
        item.innerHTML = `
            <span>${address.calle}, ${address.numero}, ${address.ciudad}, ${address.estado}, ${address.zip}</span>
            <button onclick="deleteItem('addresses', ${index})" class="btn red-btn">Eliminar</button>
        `;
        item.addEventListener('click', () => selectItem(item, 'address'));
        addressList.appendChild(item);
    });
}

// Función para renderizar los pagos
function renderPayments() {
    const payments = getPayments();
    paymentList.innerHTML = ''; // Limpiar la lista de pagos antes de renderizar
    payments.forEach((payment, index) => {
        const item = document.createElement('div');
        item.className = 'selectable-item';
        item.innerHTML = `
            <span>${payment.cardHolder} - **** **** **** ${payment.cardNumber.slice(-4)}</span>
            <button onclick="deleteItem('payments', ${index})" class="btn red-btn">Eliminar</button>
        `;
        item.addEventListener('click', () => selectItem(item, 'payment'));
        paymentList.appendChild(item);
    });
}

function selectItem(element, type) {
    // Verifica si el elemento ya está seleccionado
    if (element.classList.contains('selected')) {
        // Si está seleccionado, lo deselecciona
        element.classList.remove('selected');
    } else {
        // Deseleccionar todos los elementos del mismo tipo
        const items = document.querySelectorAll(`#${type}-list .selectable-item`);
        items.forEach((item) => item.classList.remove('selected'));

        // Seleccionar el elemento actual
        element.classList.add('selected');
    }
}


// Agregar nuevas direcciones
document.getElementById('add-address-btn').addEventListener('click', () => {
    editingType = 'address';
    modalTitle.textContent = 'Agregar nueva dirección';
    dynamicForm.innerHTML = `
         <input type="text" id="calle" placeholder="Calle y Colonia" required>
         <input type="text" id="numero" placeholder="Número Exterior">
         <input type="text" id="ciudad" placeholder="Ciudad">
         <input type="text" id="estado" placeholder="Estado">
         <input type="text" id="zip" placeholder="Código Postal" maxlength="5" required oninput="formatZip(this)">
        <div id="error-msg" class="error"></div>
         `;
    formModal.classList.remove('hidden');
});

// Función para guardar una dirección
saveBtn.addEventListener('click', () => {
    if (editingType === 'address') {
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

        const newAddress = { calle, numero, ciudad, estado, zip };
        const addresses = getAddresses();
        addresses.push(newAddress);
        saveToLocalStorage('addresses', addresses);
        formModal.classList.add('hidden');
        renderAddresses();
    }
});

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
// Agregar nueva tarjeta
document.getElementById('add-payment-btn').addEventListener('click', () => {
    editingType = 'payment';
    modalTitle.textContent = 'Agregar nueva tarjeta';
    dynamicForm.innerHTML = `
        <input type="text" id="card-holder" placeholder="Nombre del titular de la tarjeta" required pattern="^[a-zA-Z]+ [a-zA-Z]+$">
        <input type="text" id="card-number" placeholder="Número de tarjeta" maxlength="16" required pattern="\d{16}" oninput="this.value = this.value.replace(/\D/g, '')">
        <input type="text" id="expiry-date" placeholder="Fecha de vencimiento (MM/AA)" maxlength="5" required oninput="formatExpiryDate(this)">
        <input type="text" id="cvv" placeholder="CVV" maxlength="3" required oninput="formatCVV(this)">
        <div id="error-msg" class="error"></div> 
        `;
    formModal.classList.remove('hidden');
});

// Función para guardar un método de pago
saveBtn.addEventListener('click', () => {
    if (editingType === 'payment') {
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

        const newPayment = { cardHolder, cardNumber, expiryDate, cvv };
        const payments = getPayments();
        payments.push(newPayment);
        saveToLocalStorage('payments', payments);
        formModal.classList.add('hidden');
        renderPayments();
    }
});

// Función para recuperar las direcciones del localStorage
function getAddresses() {
    return getFromLocalStorage('addresses');
}

// Función para recuperar los pagos del localStorage
function getPayments() {
    return getFromLocalStorage('payments');
}

function procesarPago() {
    // Verificar si hay una dirección seleccionada
    const selectedAddress = document.querySelector('#address-list .selected');
    if (!selectedAddress) {
        alert('Por favor, selecciona una dirección de envío.');
        return;
    }

    // Verificar si hay un método de pago seleccionado
    const selectedPayment = document.querySelector('#payment-list .selected');
    if (!selectedPayment) {
        alert('Por favor, selecciona un método de pago.');
        return;
    }

    // Obtener los datos de la dirección seleccionada
    const selectedAddressText = selectedAddress.querySelector('span').textContent;

    // Obtener los datos del pago seleccionado
    const selectedPaymentText = selectedPayment.querySelector('span').textContent;

    // Calcular la fecha de entrega (4 días después de la fecha actual)
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 4); // Sumar 4 días
    const deliveryDate = currentDate.toLocaleDateString(); // Formato: dd/mm/yyyy

    // Obtener el carrito de compras
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Si no hay productos en el carrito, detener el proceso
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de continuar.');
        return;
    }

    // Guardar los detalles del pedido en un objeto
    const orderDetails = {
        address: selectedAddressText,
        payment: selectedPaymentText,
        deliveryDate: deliveryDate, // Fecha calculada
        products: cart // Guardar los productos comprados
    };

    // Llamar a la función guardarPedido para almacenar el pedido
    guardarPedido(orderDetails);

    // Guardar los detalles del pedido en localStorage (por ejemplo, para mostrarlos en la página de agradecimiento)
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Vaciar el carrito
    try {
        localStorage.removeItem('cart');  // Elimina el carrito del localStorage
        console.log("Carrito vaciado correctamente.");
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
    }

    // Redirigir a la página de agradecimiento
    setTimeout(() => {
        window.location.href = "tenkiu.html";
    }, 3000);
}




// Función para actualizar la información del pedido, incluido el cálculo del IVA
function actualizarPedido() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtener el carrito desde localStorage
    
    // Calcular el total de los productos
    const totalProductos = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', '').replace(',', ''));
        const quantity = parseInt(item.quantity, 10);
        if (isNaN(price) || isNaN(quantity)) {
            return sum;
        }
        return sum + price * quantity;
    }, 0);

    // Calcular el IVA (suponiendo un IVA del 21%)
    const iva = totalProductos * 0.16;  // Cambia el 0.21 por el porcentaje de IVA que desees
    const totalConIva = iva;

    const Envioo = 99.00;
    const TotalPedido=  totalConIva + Envioo + totalProductos;

    // Obtener la etiqueta de "Productos"
    const productosElement = document.querySelector(".right-section p:nth-of-type(1)"); // Seleccionar el <p> Productos
    if (productosElement) {
        productosElement.textContent = `Productos: $${totalProductos.toFixed(2)}`;
    }

    // Obtener la etiqueta del envio
    const Envio = document.querySelector(".right-section p:nth-of-type(2)"); // Seleccionar el <p> Total (IVA incluido)
    if (Envio) {
        Envio.innerHTML = `Envio: $${Envioo.toFixed(2)}`;
    }

    // Obtener la etiqueta del "Total (IVA incluido)"
    const totalIvaElement = document.querySelector(".right-section p:nth-of-type(3)"); // Seleccionar el <p> Total (IVA incluido)
    if (totalIvaElement) {
        totalIvaElement.innerHTML = `<strong>Total (IVA incluido 16%): $${totalConIva.toFixed(2)}</strong>`;
    }
    
    //Obtener la etiqueta del "Total"
    const PrecioFinal = document.querySelector(".right-section p:nth-of-type(4)"); // Seleccionar el <p> Total (IVA incluido)
    if (PrecioFinal) {
        PrecioFinal.innerHTML = `Total: $${TotalPedido.toFixed(2)}`;
    }
}

// Llamar a la función para actualizar la información cuando se cargue la página
document.addEventListener("DOMContentLoaded", actualizarPedido);

// Cerrar modal
document.getElementById('close-btn').addEventListener('click', () => {
    formModal.classList.add('hidden');
});

// Eliminar elementos
function deleteItem(key, index) {
    const data = getFromLocalStorage(key);
    data.splice(index, 1);
    saveToLocalStorage(key, data);
    key === 'addresses' ? renderAddresses() : renderPayments();
}

// Inicializar
renderAddresses();
renderPayments();



