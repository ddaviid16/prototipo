// Función para obtener los pedidos de IndexedDB
const obtenerPedidos = async () => {
    const db = await openDatabase();
    const transaction = db.transaction('pedidos', 'readonly');
    const store = transaction.objectStore('pedidos');
    return new Promise((resolve, reject) => {
        const request = store.getAll();  // Obtiene todos los pedidos
        request.onsuccess = function () {
            resolve(request.result);
        };
        request.onerror = function () {
            reject(request.error);
        };
    });
};



// Función para mostrar los pedidos en "Mis Pedidos"
// Función para mostrar los pedidos en "Mis Pedidos"
const mostrarPedidos = async () => {
    try {
        // Obtén los pedidos desde IndexedDB
        const pedidos = await obtenerPedidos();
        const container = document.getElementById('mis-pedidos');
        
        // Si no hay pedidos, muestra un mensaje
        if (pedidos.length === 0) {
            container.innerHTML = '<p>No tienes pedidos aún.</p>';
            return;
        }

        // Recorre los pedidos y agrega cada uno al contenedor
        pedidos.forEach((pedido) => {
            const pedidoElement = document.createElement('div');
            pedidoElement.classList.add('pedido');

            // Verifica si 'pedido.timestamp' está presente. Si no, usa la fecha actual.
            const fecha = pedido.timestamp ? new Date(pedido.timestamp) : new Date(); 
            const fechaFormateada = isNaN(fecha.getTime()) ? "Fecha inválida" : fecha.toLocaleDateString();

            pedidoElement.innerHTML = `
                <div class="pedido-header">
                    <h5>Pedido #${pedido.id}</h5>
                   <p><strong>Fecha:</strong> ${fechaFormateada}</p>
                </div>
                <div class="pedido-details">
                    <p><strong>Dirección de Envío:</strong> ${pedido.address}</p>
                    <p><strong>Método de Pago:</strong> ${pedido.payment}</p>
                    <p><strong>Fecha de Entrega:</strong> ${pedido.deliveryDate}</p>
                </div>
                <div class="pedido-products">
                    <h6><strong>Productos Comprados:</strong></h6>
                    ${pedido.products.map(p => `
                        <div class="product-item">
                            <img src="${p.img}" alt="${p.name}" class="product-image" />
                            <div class="product-info">
                                <p><strong>${p.name}</strong></p>
                                <p><strong>Precio:</strong> ${p.price}</p>
                                <p><strong>Cantidad:</strong> ${p.quantity}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(pedidoElement);
        });
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
    }
};

