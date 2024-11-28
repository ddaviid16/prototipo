
function formatZip(input) {
    let value = input.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
    zipRegex = /^\d{5}$/;
    input.value = value;
}

function guardarDomicilio() {
    const calle = document.getElementById('calle').value;
    const numero = document.getElementById('numero').value;
    const ciudad = document.getElementById('ciudad').value;
    const estado = document.getElementById('estado').value;
    const zip = document.getElementById('zip').value;
    const errorMsg = document.getElementById('error-msg');

    // Validar calle y colonia
    const calleRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!calleRegex.test(calle)) {
        errorMsg.textContent = 'Calle y número inválidos, ingresa al menos dos palabras.';
        return;
    }
    // Validar que todos los campos esten completos
    if (!calle || !numero || !ciudad || !estado || !zip) {
        errorMsg.textContent = 'Por favor, complete todos los campos.';
        return;
    }

    if (!zipRegex.test(zip)) {
        errorMsg.textContent = 'Código postal inválido. Debe contener 5 dígitos.';
        return;
    }

    // Simular almacenamiento de datos del domicilio
    localStorage.setItem('domicilio', JSON.stringify({ calle, numero, ciudad, estado, zip }));
    errorMsg.textContent = `Domicilio guardado exitosamente.`;
    
    window.location.href = 'pantallaPago.html';
}