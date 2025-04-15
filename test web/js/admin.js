// Kiểm tra đăng nhập admin
const admin = JSON.parse(localStorage.getItem('nhuNailsAdmin'));
if (!admin) {
    window.location.href = '../auth/login.html?admin=1';
} else {
    document.getElementById('adminName').textContent = admin.name;
    
    // Load dữ liệu
    loadDashboard();
}

// Xử lý đăng xuất
document.getElementById('logoutAdmin').addEventListener('click', function() {
    localStorage.removeItem('nhuNailsAdmin');
    window.location.href = '../auth/login.html?admin=1';
});

// Load dữ liệu dashboard
function loadDashboard() {
    const users = JSON.parse(localStorage.getItem('nhuNailsUsers')) || [];
    const today = new Date();
    
    // Thống kê
    document.getElementById('totalMembers').textContent = users.length;
    
    const birthdayMembers = users.filter(user => {
        const dob = new Date(user.dob);
        return dob.getMonth() === today.getMonth() && dob.getDate() === today.getDate();
    }).length;
    
    document.getElementById('birthdayMembers').textContent = birthdayMembers;
    
    // Hiển thị thành viên mới nhất (5 người)
    const recentMembers = users.slice(-5).reverse();
    const tbody = document.querySelector('#membersTable tbody');
    tbody.innerHTML = '';
    
    recentMembers.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${formatDate(user.dob)}</td>
            <td>${user.points || 0}</td>
        `;
        tbody.appendChild(tr);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}