// Abrir la base de datos IndexedDB
const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('miBaseDeDatos', 1);  // Asegúrate de que el nombre y la versión sean correctos

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };

        // Crear el esquema de la base de datos si no existe
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('pedidos')) {
                db.createObjectStore('pedidos', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
};

// Guardar un pedido en IndexedDB
const guardarPedido = async (pedido) => {
    const db = await openDatabase();
    const transaction = db.transaction('pedidos', 'readwrite');
    const store = transaction.objectStore('pedidos');
    store.add(pedido);
};