// Base de datos de productos para la galería
const galleryProducts = [
    { id: 1, name: "Vestido esmeralda de XV", price: "$7,000", category: "XV", size: "M", color: "Esmeralda", img: "imagenes/producto1.jpg" },
    { id: 2, name: "Vestido Moderno de XV", price: "$8,000", category: "XV", size: "S", color: "Rojo", img: "imagenes/producto3.jpg" },
    { id: 3, name: "Vestido de Novia Moderno", price: "$10,000", category: "Novias", size: "L", color: "Blanco", img: "imagenes/producto2.jpg" },
    { id: 4, name: "Vestido de XV Oro", price: "$9,000", category: "XV", size: "M", color: "Oro", img: "imagenes/producto4.jpg" }
];

let currentPage = 1;
const itemsPerPage = 8;
let filteredProducts = galleryProducts;

function displayProducts() {
    const gallery = document.getElementById("product-gallery");
    gallery.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProducts = filteredProducts.slice(start, end);

    pageProducts.forEach(product => {
        const item = document.createElement("div");
        item.className = "product-item";
        item.innerHTML = `
            <a href="detalle-producto.html?id=${product.id}">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p>${product.price}</p>
            </a>
        `;
        gallery.appendChild(item);
    });

    document.getElementById("page-number").textContent = currentPage;
}

function filterCategory(category) {
    filteredProducts = category === 'all' ? galleryProducts : galleryProducts.filter(p => p.category === category);
    currentPage = 1;
    displayProducts();
}

function filterProducts() {
    const search = document.getElementById("search").value.toLowerCase();
    const size = document.getElementById("size-filter").value;
    const color = document.getElementById("color-filter").value;
    const category = document.getElementById("category-filter").value;

    filteredProducts = galleryProducts.filter(product => {
        return (
            product.name.toLowerCase().includes(search) &&
            (size === "" || product.size === size) &&
            (color === "" || product.color === color) &&
            (category === "" || product.category === category)
        );
    });

    currentPage = 1;
    displayProducts();
}

function nextPage() {
    if (currentPage * itemsPerPage < filteredProducts.length) {
        currentPage++;
        displayProducts();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
}

document.addEventListener("DOMContentLoaded", displayProducts);
document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.substring(1);

    if (hash === "Novias" || hash === "XV") {
        filterCategory(hash);
    } else {
        displayProducts();  // Muestra todos los productos
    }
});

// Base de datos de productos para detalles
const detailProducts = [
    {
        id: 1,
        name: 'Vestido esmeralda de XV',
        description: 'Este vestido esmeralda es perfecto para tu fiesta de XV...',
        price: 5000,
        image: 'imagenes/producto1.jpg'
    },
    {
        id: 2,
        name: 'Vestido Moderno de XV',
        description: 'Un vestido moderno y elegante para tu fiesta de XV...',
        price: 6000,
        image: 'imagenes/producto3.jpg'
    },
    {
        id: 3,
        name: 'Vestido de Novia Moderno',
        description: 'Un vestido blanco, elegante y moderno para novias...',
        price: 7000,
        image: 'imagenes/producto2.jpg'
    },
    {
        id: 4,
        name: 'Vestido de XV Oro',
        description: 'Vestido de XV en color oro, perfecto para destacar...',
        price: 7500,
        image: 'imagenes/producto4.jpg'
    }
];

// Función para obtener parámetros de la URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Mostrar los detalles del producto
function displayProductDetails() {
    const productId = getQueryParameter('id');
    if (!productId) {
        document.getElementById('product-detail').innerHTML = '<p>Producto no encontrado.</p>';
        return;
    }

    const product = detailProducts.find(p => p.id === parseInt(productId));

    if (product) {
        document.getElementById('product-detail').innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price}</p>
                <button class="btn">Agregar al carrito</button>
            </div>
        `;
    } else {
        document.getElementById('product-detail').innerHTML = '<p>Producto no encontrado.</p>';
    }
}

// Llamada a la función cuando la página cargue
window.onload = displayProductDetails;
