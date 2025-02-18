// Initialize user data with an admin account if it doesn't exist
const users = JSON.parse(localStorage.getItem('users')) || [];
if (!users.some(user => user.username === 'admin')) {
    users.push({ username: 'admin', email: 'admin@example.com', password: 'admin123', role: 'admin' });
    localStorage.setItem('users', JSON.stringify(users));
}

let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;

// Sanitize user input
function sanitizeInput(input) {
    return input.trim();
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Registration form handling
document.getElementById('registration-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = sanitizeInput(document.getElementById('register-username').value);
    const email = sanitizeInput(document.getElementById('register-email').value);
    const password = sanitizeInput(document.getElementById('register-password').value);

    if (users.some(user => user.email === email)) {
        alert('Email is already registered!');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    const newUser = { username, email, password, role: 'user' }; // Default role for new users
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! You can now log in.');
    document.getElementById('registration-form').reset();
});

// Login form handling
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = sanitizeInput(document.getElementById('login-email').value);
    const password = sanitizeInput(document.getElementById('login-password').value);

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        loggedInUser = user;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert(`Welcome back, ${user.username}!`);

        // Redirect based on user role
        if (user.role === 'admin') {
            window.location.href = 'dashboard.html'; // Admin dashboard
        } else {
            window.location.href = 'index.html'; // Regular user home page
        }
    } else {
        alert('Invalid email or password!');
        window.location.href = 'login.html'; // Redirect back to login
    }
});