const userContainer = document.getElementById("userContainer");
const errorMessage = document.getElementById("errorMessage");
const reloadBtn = document.getElementById("reloadBtn");

// Function to fetch and display users
function fetchUsers() {
    userContainer.innerHTML = ""; // Clear old data
    errorMessage.textContent = ""; // Clear error message

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(users => {
            users.forEach(user => {
                const userCard = document.createElement("div");
                userCard.classList.add("user-card");

                userCard.innerHTML = `
                    <h3>${user.name}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
                `;
                userContainer.appendChild(userCard);
            });
        })
        .catch(error => {
            errorMessage.textContent = "❌ Failed to fetch users. Please check your internet connection.";
            console.error("Fetch error:", error);
        });
}

// Load users on page load
fetchUsers();

// Reload users on button click
reloadBtn.addEventListener("click", fetchUsers);
