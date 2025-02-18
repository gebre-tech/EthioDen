// Check if user is logged in
function checkAuthentication() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('You must be logged in to access this page.');
        window.location.href = 'login.html';
    }
}

// Call this function to enforce authentication
checkAuthentication();

let users = JSON.parse(localStorage.getItem('users')) || [];

// Function to display all users
function displayUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.innerHTML = `
            <h3>Username: ${user.username}</h3>
            <p>Email: ${user.email}</p>
            <button onclick="editUser(${index})">Edit User</button>
        `;
        userList.appendChild(userDiv);
    });
}

// Function to edit user details
function editUser(index) {
    const newUsername = prompt('Enter new username:', users[index].username);
    if (newUsername) {
        users[index].username = newUsername;
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    }
}

// Initial display of users
displayUsers();