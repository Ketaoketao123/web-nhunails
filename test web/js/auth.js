// Lưu trữ tạm thời (sau này thay bằng database)
let users = JSON.parse(localStorage.getItem('nhuNailsUsers')) || [];
let admins = [
    { email: 'admin@nhunails.com', password: 'Admin@123', name: 'Quản trị viên' }
];

// Xử lý đăng ký
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = {
        id: Date.now(),
        name: document.getElementById('regName').value,
        phone: document.getElementById('regPhone').value,
        email: document.getElementById('regEmail').value,
        dob: document.getElementById('regDob').value,
        password: document.getElementById('regPassword').value,
        points: 0,
        isAdmin: false
    };
    
    // Kiểm tra email đã tồn tại
    if (users.some(u => u.email === user.email)) {
        alert('Email đã được đăng ký!');
        return;
    }
    
    users.push(user);
    localStorage.setItem('nhuNailsUsers', JSON.stringify(users));
    alert('Đăng ký thành công!');
    window.location.href = 'login.html';
});

// Xử lý đăng nhập
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailOrPhone = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const isAdmin = new URLSearchParams(window.location.search).has('admin');
    
    // Kiểm tra admin
    if (isAdmin) {
        const admin = admins.find(a => a.email === emailOrPhone && a.password === password);
        if (admin) {
            localStorage.setItem('nhuNailsAdmin', JSON.stringify(admin));
            window.location.href = '../admin/dashboard.html';
            return;
        }
        alert('Thông tin đăng nhập admin không đúng!');
        return;
    }
    
    // Kiểm tra user thường
    const user = users.find(u => 
        (u.email === emailOrPhone || u.phone === emailOrPhone) && 
        u.password === password
    );
    
    if (user) {
        // Ghi nhớ đăng nhập nếu được chọn
        if (document.getElementById('rememberMe').checked) {
            localStorage.setItem('nhuNailsUser', JSON.stringify(user));
        } else {
            sessionStorage.setItem('nhuNailsUser', JSON.stringify(user));
        }
        
        // Kiểm tra sinh nhật
        checkBirthday(user);
        
        window.location.href = '../index.html';
    } else {
        alert('Email/SĐT hoặc mật khẩu không đúng!');
    }
});

// Kiểm tra sinh nhật
function checkBirthday(user) {
    const today = new Date();
    const dob = new Date(user.dob);
    
    if (today.getMonth() === dob.getMonth() && today.getDate() === dob.getDate()) {
        // Tạo voucher sinh nhật
        const voucher = {
            code: 'BIRTHDAY' + today.getFullYear(),
            discount: 20, // 20%
            expires: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
        };
        
        if (!user.vouchers) user.vouchers = [];
        user.vouchers.push(voucher);
        
        // Cập nhật user
        const index = users.findIndex(u => u.id === user.id);
        users[index] = user;
        localStorage.setItem('nhuNailsUsers', JSON.stringify(users));
        
        // Thông báo
        alert(`Chúc mừng sinh nhật! Bạn nhận được voucher giảm ${voucher.discount}% (${voucher.code})`);
    }
}
// Xử lý đăng nhập
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailOrPhone = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === '1';
    
    // KIỂM TRA ADMIN TRƯỚC
    if (isAdmin) {
        const adminAccount = {
            email: 'admin@nhunails.com', 
            password: 'Admin@123',
            name: 'Quản Trị Viên',
            role: 'admin'
        };
        
        if (emailOrPhone === adminAccount.email && password === adminAccount.password) {
            localStorage.setItem('nhuNailsAdmin', JSON.stringify(adminAccount));
            window.location.href = '../admin/dashboard.html';
            return;
        } else {
            alert('Thông tin đăng nhập admin không đúng!');
            return;
        }
    }
    
    // Nếu không phải admin, kiểm tra user thường
    const users = JSON.parse(localStorage.getItem('nhuNailsUsers')) || [];
    const user = users.find(u => 
        (u.email === emailOrPhone || u.phone === emailOrPhone) && 
        u.password === password
    );
    
    if (user) {
        if (document.getElementById('rememberMe').checked) {
            localStorage.setItem('nhuNailsUser', JSON.stringify(user));
        } else {
            sessionStorage.setItem('nhuNailsUser', JSON.stringify(user));
        }
        window.location.href = '../index.html';
    } else {
        alert('Email/SĐT hoặc mật khẩu không đúng!');
    }
});
// Khi đăng nhập thành công
function handleLoginSuccess(user, remember) {
    if (remember) {
        localStorage.setItem('nhuNailsUser', JSON.stringify(user));
    } else {
        sessionStorage.setItem('nhuNailsUser', JSON.stringify(user));
    }
    
    // Hiển thị tên người dùng trên tất cả trang
    document.querySelectorAll('.user-name').forEach(el => {
        el.textContent = user.name.split(' ')[0];
    });
    
    // Chuyển hướng hoặc làm mới trang
    if (window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
    } else {
        window.location.reload();
    }
}