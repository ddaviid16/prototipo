document.addEventListener('DOMContentLoaded', () => {
    // Renderizar direcciones y pagos inicialmente
    renderAddresses();
    renderPayments();

    // Manejar los botones
    document.getElementById('btnAddresses').addEventListener('click', () => {
        document.getElementById('addressesSection').style.display = 'block';
        document.getElementById('paymentsSection').style.display = 'none';
    });

    document.getElementById('btnPayments').addEventListener('click', () => {
        document.getElementById('addressesSection').style.display = 'none';
        document.getElementById('paymentsSection').style.display = 'block';
    });
});