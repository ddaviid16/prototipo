
function redirigirMispedidos(){
    window.location.href="MisPedidos.html";
}
function redirigirPayment(){
    window.location.href="Mypayment.html";
}
function redirigirAddress(){
    window.location.href="Myaddress.html";
}

document.addEventListener('DOMContentLoaded', () => {
    renderAddresses(); // Renderiza las direcciones almacenadas
    renderPayments();  // Renderiza los métodos de pago almacenados
});

