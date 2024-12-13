function redirigirMispedidos(){
    window.location.href="MisPedidos.html";
}
function redirigirInformation(){
    window.location.href="MyInformation.html";
}


document.addEventListener('DOMContentLoaded', () => {
    renderAddresses(); // Renderiza las direcciones almacenadas
    renderPayments();  // Renderiza los métodos de pago almacenados
});
