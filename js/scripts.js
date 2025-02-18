let users = [];
let cart = [];
let loggedInUser = null;  // Track logged-in user
let products = JSON.parse(localStorage.getItem('products')) || [
    { name: "Stylish T-Shirt", price: "$25.00", image: "https://via.placeholder.com/150", category: "clothing", rating: 4 },
    { name: "Classic Sneakers", price: "$50.00", image: "https://via.placeholder.com/150", category: "shoes", rating: 5 },
    { name: "Summer Dress", price: "$35.00", image: "https://via.placeholder.com/150", category: "clothing", rating: 4 },
    { name: "Leather Jacket", price: "$120.00", image: "https://via.placeholder.com/150", category: "clothing", rating: 5 },
    { name: "Running Shoes", price: "$65.00", image: "https://via.placeholder.com/150", category: "shoes", rating: 3 },
];

function displayProducts() {
    const productContainer = document.getElementById('product-container') || document.createElement('div');
    productContainer.innerHTML = '';

    products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <div class="rating">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</div>
            <button onclick="showProductDetails('${product.name}', '${product.price}', '${product.image}')">View Details</button>
            <button onclick="addToCart(${JSON.stringify(product)})">Add to Cart</button>
        `;
        
        productContainer.appendChild(productDiv);
    });
}

function addToCart(product) {
    if (!loggedInUser) {
        alert('You must be logged in to add items to your cart.');
        return;
    }
    cart.push(product);
    alert(`${product.name} has been added to your cart!`);
}

function showProductDetails(name, price, image) {
    const modal = document.getElementById('product-modal');
    document.getElementById('modal-product-name').textContent = name;
    document.getElementById('modal-product-price').textContent = price;
    document.getElementById('modal-product-image').src = image;
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.add('hidden');
}

function sanitizeInput(input) {
    return input.replace(/<script.*?>.*?<\/script>/gi, '')
                .replace(/<.*?>/g, '')
                .trim();
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = sanitizeInput(document.getElementById('email').value);
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const name = sanitizeInput(document.getElementById('name').value);
    const message = sanitizeInput(document.getElementById('message').value);

    const formMessage = document.getElementById('form-message');
    formMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
    formMessage.classList.remove('hidden');

    document.getElementById('contact-form').reset();
});

document.getElementById('registration-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = sanitizeInput(document.getElementById('register-username').value);
    const email = sanitizeInput(document.getElementById('register-email').value);
    const password = sanitizeInput(document.getElementById('register-password').value);

    // Check for existing user
    if (users.some(user => user.email === email)) {
        alert('Email is already registered!');
        return;
    }

    // Validate email format
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Check password length
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Add user to the array and reset form
    users.push({ username, email, password });
    alert('Registration successful! You can now log in.');
    document.getElementById('registration-form').reset();
});

document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = sanitizeInput(document.getElementById('login-email').value);
    const password = sanitizeInput(document.getElementById('login-password').value);

    // Check for user credentials
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        loggedInUser = user; // Set the logged-in user
        alert(`Welcome back, ${user.username}!`);
        window.location.href = 'products.html'; // Redirect to products page
    } else {
        alert('Invalid email or password!');
    }
});

// Call displayProducts if on the products page
if (window.location.pathname.endsWith('products.html')) {
    displayProducts();
}