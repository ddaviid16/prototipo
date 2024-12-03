// Base de datos de productos para la galería
let galleryProducts = JSON.parse(localStorage.getItem("galleryProducts")) || [
    { id: 1, name: "Vestido esmeralda de XV", description:'Este vestido esmeralda es perfecto para tu fiesta de XV...', price: "$7,000", category: "XV", size: "M", color: "Esmeralda", img: "imagenes/producto1.jpg",stock: 5 },
    { id: 2, name: "Vestido Moderno de XV", description: 'Un vestido moderno y elegante para tu fiesta de XV...', price: "$8,000", category: "XV", size: "S", color: "Rojo", img: "imagenes/producto3.jpg", stock: 5 },
    { id: 3, name: "Vestido de Novia Moderno", description: 'Un vestido blanco, elegante y moderno para novias...', price: "$10,000", category: "Novias", size: "L", color: "Blanco", img: "imagenes/producto2.jpg", stock: 5 },
    { id: 4, name: "Vestido de XV Oro", description: 'Vestido de XV en color oro, perfecto para destacar...', price: "$9,000", category: "XV", size: "M", color: "Oro", img: "imagenes/producto4.jpg", stock: 5 }
];

document.addEventListener("DOMContentLoaded", displayProducts);

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
            <a href="detallemain.html?id=${product.id}">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p>${product.price}</p>
                <p>Disponibles: ${product.stock}</p>
            </a>
        `;
        gallery.appendChild(item);
    });
    document.getElementById('product-detail').innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="product-info">
        <h2>${product.name}</h2>
        <p class="description">${product.description}</p>
        <p class="price">$${product.price}</p>
        <p>Talla: ${product.size}</p>
        <p>Color: ${product.color}</p>
        <p>Categoría: ${product.category}</p>
        <p>Disponible: ${product.stock} unidades</p>
        <button onclick="addToCart(${product.id})">Agregar al carrito</button>
    </div>
`;


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

/*// Base de datos de productos para detalles
const detailProducts = [
    {
        id: 1,
        name: 'Vestido esmeralda de XV',
        description: 'Este vestido esmeralda es perfecto para tu fiesta de XV...',
        size: 'M',
        color: 'Esmeralda',
        category: 'XV',
        price: 7000,
        image: 'imagenes/producto1.jpg'
    },
    {
        id: 2,
        name: 'Vestido Moderno de XV',
        description: 'Un vestido moderno y elegante para tu fiesta de XV...',
        size: 'S',
        color: 'Rojo',
        category: 'XV',
        price: 8000,
        image: 'imagenes/producto3.jpg'
    },
    {
        id: 3,
        name: 'Vestido de Novia Moderno',
        description: 'Un vestido blanco, elegante y moderno para novias...',
        size: 'L',
        color: 'Blanco',
        category: 'Novias',
        price: 10000,
        image: 'imagenes/producto2.jpg'
    },
    {
        id: 4,
        name: 'Vestido de XV Oro',
        description: 'Vestido de XV en color oro, perfecto para destacar...',
        size: 'M',
        color: 'Oro',
        category: 'XV',
        price: 9000,
        image: 'imagenes/producto4.jpg'
    
    }
];*/

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

    const product = galleryProducts.find(p => p.id === parseInt(productId));

    if (product) {
        document.getElementById('product-detail').innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p class="description">${product.description}</p>
                <p class="price">${product.price}</p>
                <p>Talla: ${product.size}</p>
                <p>Color: ${product.color}</p>
                <p>Categoría: ${product.category}</p>
                <p>Disponible: ${product.stock} unidades</p>
                <button onclick="addToCart(${product.id})">Agregar al carrito</button>
            </div>
        `;
    } else {
        document.getElementById('product-detail').innerHTML = '<p>Producto no encontrado.</p>';
    }
}

// Llamada a la función cuando la página cargue
window.onload = displayProductDetails;

