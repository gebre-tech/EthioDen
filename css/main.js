let users = [];
let loggedInUser = null;  // Track the logged-in user
let cart = [];

// Checks login status on page load
window.onload = function() {
    loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.textContent === 'Login' || link.textContent === 'Register') {
                link.style.display = 'none'; // Hide login/register links if logged in
            }
        });
    }
};