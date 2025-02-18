// Sample products data with images
const products = [
    { id: 1, name: 'Habesha Kemis', price: 1500.00, category: 'clothing', description: 'Traditional Ethiopian dress.', image: 'kemis.jpg' },
    { id: 2, name: 'Jordan Shoes', price: 5000.00, category: 'shoes', description: 'Stylish and comfortable Jordan shoes.', image: 'jordan.avif' },
    { id: 3, name: 'Leather Jacket', price: 2500.00, category: 'clothing', description: 'A timeless leather jacket.', image: 'lether.jfif' },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display products
function displayProducts() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" class="product-image" />
            <p>Price: ${product.price.toFixed(2)} ETB</p>
            <button onclick="buyProduct('${product.name}', ${product.price})">Buy Now</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

// Function to buy a product
function buyProduct(productName, productPrice) {
    // Add product to cart
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in localStorage
    document.getElementById('total-price').innerText = `Total: ${calculateTotal()} ETB`;

    // Show payment options
    document.getElementById('payment-options').style.display = 'block';
}

// Function to calculate total price
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
}

// Function to confirm payment
function confirmPayment() {
    const paymentMethod = document.getElementById('payment-method').value;
    if (!paymentMethod) {
        alert('Please select a payment method.');
        return;
    }

    alert(`Payment of ${calculateTotal()} ETB confirmed via ${paymentMethod}.`);
    // Here you would typically handle the payment processing with the selected method
    // Reset cart and UI after payment
    cart = [];
    localStorage.removeItem('cart');
    document.getElementById('total-price').innerText = `Total: 0.00 ETB`;
    document.getElementById('payment-options').style.display = 'none';
}

// Function to search products
function searchProducts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
    displayFilteredProducts(filteredProducts);
}

// Function to filter products by category and price
function filterProducts() {
    const category = document.getElementById('category-select').value;
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    const filteredProducts = products.filter(product => {
        return (category === '' || product.category === category) &&
               (product.price >= minPrice && product.price <= maxPrice);
    });
    displayFilteredProducts(filteredProducts);
}

// Function to display filtered products
function displayFilteredProducts(filteredProducts) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear existing products

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" class="product-image" />
            <p>Price: ${product.price.toFixed(2)} ETB</p>
            <button onclick="buyProduct('${product.name}', ${product.price})">Buy Now</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

// Initial call to display products
displayProducts();