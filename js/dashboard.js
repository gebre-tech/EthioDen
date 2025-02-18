// Check user authentication
function checkAuthentication() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Check if user is logged in and has admin role
    if (!loggedInUser || loggedInUser.role !== 'admin') {
        alert('You do not have permission to access this page.');
        window.location.href = 'login.html'; // Redirect to login page
    }
}

// Call this function to enforce authentication when the page loads
checkAuthentication();

let products = JSON.parse(localStorage.getItem('products')) || [];
let editingIndex = null; // Variable to track the editing product index

// Function to display all products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ${product.price.toFixed(2)} ETB</p>
            <p>Category: ${product.category}</p>
            <p>Size: ${product.size}</p>
            <p>Brand: ${product.brand}</p>
            <img src="${product.image}" alt="${product.name}" width="100">
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add product form submission
document.getElementById('product-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value;
    const size = document.getElementById('product-size').value;
    const brand = document.getElementById('product-brand').value;
    const image = document.getElementById('product-image').value;

    if (editingIndex !== null) {
        // Update existing product
        products[editingIndex] = { name, price, category, size, brand, image };
        editingIndex = null; // Reset editing index
    } else {
        // Add new product
        products.push({ name, price, category, size, brand, image });
    }

    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    hideAddProductForm();
});

// Function to delete a product
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Function to edit a product
function editProduct(index) {
    const product = products[index];
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-size').value = product.size;
    document.getElementById('product-brand').value = product.brand;
    document.getElementById('product-image').value = product.image;

    editingIndex = index; // Set the editing index
    showAddProductForm(); // Show the form for editing
}

// Show add product form
function showAddProductForm() {
    document.getElementById('add-product-form').style.display = 'block';
}

// Hide add product form
function hideAddProductForm() {
    document.getElementById('add-product-form').style.display = 'none';
}

// Initial display of products
displayProducts();