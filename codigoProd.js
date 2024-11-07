const products = [
    
    { id: 1, name: "Vestido esmeralda de XV", price: "$7,000", category: "XV", size: "M", color: "Esmeralda", img: "imagenes/producto1.jpg" },
    { id: 2, name: "Vestido Moderno de XV", price: "$8,000", category: "XV", size: "S", color: "Rojo", img: "imagenes/producto3.jpg" },
    { id: 3, name: "Vestido de Novia Moderno", price:"$10,000", category: "Novias", size: "L", color: "Blanco", img: "imagenes/producto2.jpg"},
    { id: 4, name: "Vestido de XV Oro", price:"$9,000", category: "XV", size: "M", color: "Oro", img: "imagenes/producto4.jpg"}
];

let currentPage = 1;
const itemsPerPage = 8;
let filteredProducts = products;

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
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p>${product.price}</p>
        `;
        gallery.appendChild(item);
    });

    document.getElementById("page-number").textContent = currentPage;
}

function filterCategory(category) {
    filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    currentPage = 1;
    displayProducts();
}

function filterProducts() {
    const search = document.getElementById("search").value.toLowerCase();
    const size = document.getElementById("size-filter").value;
    const color = document.getElementById("color-filter").value;
    const category = document.getElementById("category-filter").value;

    filteredProducts = products.filter(product => {
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
        displayProducts();  //muestra todos los productos
    }
});