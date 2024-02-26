const products = [
    { id: 1, name: "Eco-friendly Water Bottle", category: "Home", price: 15, tags: ["eco-friendly", "new"] },
    { id: 2, name: "Organic Cotton T-shirt", category: "Apparel", price: 25, tags: ["eco-friendly"] },
    { id: 3, name: "Wireless Headphones", category: "Electronics", price: 200, tags: ["new", "sale"] },
];    

function createTable(data) {
    const table = document.getElementById('dynamicTable');
    table.innerHTML = "";
    for (let i = 0; i < data.length; ++i) {
        const row = ` <tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].category}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].tags.join(', ')}</td>
                    </tr>`;
        table.insertAdjacentHTML('beforeend', row);          
    }
}

createTable(products);



let selectedCategory = "";
let selectedTags = [];

function filterProducts() {
    const category = document.getElementById("category");
    selectedCategory = category.options[category.selectedIndex].value;
    const ecoFriendlyCheckbox = document.getElementById("ecoFriendly");
    const newCheckbox = document.getElementById("new");
    const saleCheckbox = document.getElementById("sale");

    selectedTags = [];
    if (ecoFriendlyCheckbox.checked) {
        selectedTags.push("eco-friendly");
    } 
    if (newCheckbox.checked) {
        selectedTags.push("new");
    }
    if (saleCheckbox.checked) {
        selectedTags.push("sale");
    }

    const filteredProducts = applyFilters();
    refresh(filteredProducts);
}

function applyFilters() {
    return products.filter(product => {
        const categoryFilter = selectedCategory === "" || product.category === selectedCategory;
        const tagsFilter = selectedTags.length === 0 || selectedTags.every(tag => product.tags.includes(tag));

        return categoryFilter && tagsFilter;
    });
}

function refresh(filteredProducts) {
    const table = document.getElementById('dynamicTable');
    table.innerHTML = "";

    if (filteredProducts.length === 0) {
        const noProductsRow = `<tr><td colspan="5">No products found.</td></tr>`;
        table.insertAdjacentHTML('beforeend', noProductsRow);
    } else {
        createTable(filteredProducts);
    }
}

createTable(products);
