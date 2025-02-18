// Sample orders data structure (for testing purposes)
let orders = JSON.parse(localStorage.getItem('orders')) || [
    { id: 1, product: 'Stylish T-Shirt', quantity: 2, total: 500.00 },
    { id: 2, product: 'Classic Sneakers', quantity: 1, total: 3000.00 },
    { id: 3, product: 'Leather Jacket', quantity: 1, total: 2500.00 },
];

// Save sample orders to localStorage if it is empty
if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Function to display orders
function displayOrders() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = ''; // Clear existing orders

    // Check if there are any orders
    if (orders.length === 0) {
        orderList.innerHTML = '<p>No current orders.</p>';
        return;
    }

    // Iterate through orders and create HTML elements
    orders.forEach((order, index) => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order';
        orderDiv.innerHTML = `
            <h3>Order ID: ${order.id}</h3>
            <p>Product: ${order.product}</p>
            <p>Quantity: ${order.quantity}</p>
            <p>Total: ${order.total.toFixed(2)} ETB</p>
            <button onclick="removeOrder(${index})">Remove Order</button>
        `;
        orderList.appendChild(orderDiv);
    });
}

// Function to remove an order
function removeOrder(index) {
    if (confirm('Are you sure you want to remove this order?')) {
        orders.splice(index, 1); // Remove the order from the array
        localStorage.setItem('orders', JSON.stringify(orders)); // Update localStorage
        displayOrders(); // Refresh the order display
    }
}

// Call the function to display orders when the page loads
displayOrders();