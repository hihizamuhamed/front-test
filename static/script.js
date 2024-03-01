document.addEventListener('DOMContentLoaded', function() {
    const refreshBtn = document.getElementById('refreshBtn');
    const searchInput = document.getElementById('searchInput');
    const userList = document.getElementById('userList');

    refreshBtn.addEventListener('click', function() {
        userList.innerHTML = ''; // Очистка списка пользователей перед обновлением
        getUsers();
    });
    searchInput.addEventListener('input', filterUsers);

    function getUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then(data => {
                displayUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                userList.innerHTML = '<tr><td colspan="3">Ошибка при получении пользователей. Пожалуйста, попробуйте позже.</td></tr>';
            });
    }

    function displayUsers(users) {
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
            `;
            userList.appendChild(row);
        });
    }

    function filterUsers() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = userList.getElementsByTagName('tr');
        Array.from(rows).forEach(row => {
            const name = row.getElementsByTagName('td')[0].textContent.toLowerCase();
            const email = row.getElementsByTagName('td')[1].textContent.toLowerCase();
            if (name.includes(searchTerm) || email.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
});
