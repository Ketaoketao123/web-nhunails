// Menu mobile (responsive)
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰ Menu';
    document.querySelector('header').appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('active');
    });
    
    // Xử lý form liên hệ
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất!');
            contactForm.reset();
        });
    }
    
    // Load dữ liệu blog từ API (nếu có)
    // loadBlogPosts();
});

// function loadBlogPosts() {
//     fetch('API_URL')
//         .
// Music Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const musicPlayer = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    // Kiểm tra trạng thái nhạc từ localStorage
    const isMusicOn = localStorage.getItem('musicOn') === 'true';
    
    if (isMusicOn) {
        musicPlayer.play().catch(e => console.log("Auto-play prevented:", e));
        musicToggle.classList.add('playing');
        musicToggle.textContent = 'Tắt nhạc';
    }
    
    // Xử lý sự kiện click nút nhạc
    musicToggle.addEventListener('click', function() {
        if (musicPlayer.paused) {
            musicPlayer.play();
            this.classList.add('playing');
            this.textContent = 'Tắt nhạc';
            localStorage.setItem('musicOn', 'true');
        } else {
            musicPlayer.pause();
            this.classList.remove('playing');
            this.textContent = 'Bật nhạc';
            localStorage.setItem('musicOn', 'false');
        }
    });
    
    // Tự động tắt nhạc khi tab không active
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            musicPlayer.pause();
        } else if (localStorage.getItem('musicOn') === 'true') {
            musicPlayer.play().catch(e => console.log("Auto-play prevented:", e));
        }
    });
});
// Mở rộng tính năng trình phát nhạc
const volumeSlider = document.getElementById('volumeSlider');
const songSelector = document.getElementById('songSelector');

// Điều chỉnh âm lượng
volumeSlider.addEventListener('input', function() {
    musicPlayer.volume = this.value;
    localStorage.setItem('musicVolume', this.value);
});

// Khôi phục âm lượng đã lưu
const savedVolume = localStorage.getItem('musicVolume');
if (savedVolume) {
    musicPlayer.volume = savedVolume;
    volumeSlider.value = savedVolume;
}

// Thay đổi bài hát
songSelector.addEventListener('change', function() {
    musicPlayer.src = this.value;
    if (!musicPlayer.paused) {
        musicPlayer.play();
    }
    localStorage.setItem('selectedSong', this.value);
});

// Khôi phục bài hát đã chọn
const savedSong = localStorage.getItem('selectedSong');
if (savedSong) {
    songSelector.value = savedSong;
    musicPlayer.src = savedSong;
}
document.querySelectorAll('.home-fab, .footer-home-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Lưu vị trí scroll hiện tại
        sessionStorage.setItem('scrollPos', window.scrollY);
    });
});

// Khi trang chủ load
window.addEventListener('load', function() {
    const scrollPos = sessionStorage.getItem('scrollPos');
    if (scrollPos) {
        window.scrollTo(0, scrollPos);
        sessionStorage.removeItem('scrollPos');
    }
});
// Hiệu ứng menu mobile
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
});

// Hiệu ứng scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.fun-header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Hiệu ứng hover cho service items
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.service-icon').style.transform = 'rotate(15deg) scale(1.1)';
    });
    item.addEventListener('mouseleave', function() {
        this.querySelector('.service-icon').style.transform = 'rotate(0) scale(1)';
    });
});
// Hiệu ứng scroll cho decor
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const cherry1 = document.querySelector('.cherry-1');
    const cherry2 = document.querySelector('.cherry-2');
    
    cherry1.style.transform = `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.1}deg)`;
    cherry2.style.transform = `translateY(${scrollY * 0.15}px) rotate(${-scrollY * 0.1}deg)`;
});

// Hiệu ứng typewriter cho banner
function typeWriter(text, element, speed) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

const bannerText = document.querySelector('.banner-text span:nth-child(2)');
if (bannerText) {
    const text = bannerText.textContent;
    bannerText.textContent = '';
    typeWriter(text, bannerText, 100);
}
// Kiểm tra trạng thái đăng nhập
const currentUser = JSON.parse(localStorage.getItem('nhuNailsUser')) || 
                   JSON.parse(sessionStorage.getItem('nhuNailsUser'));

if (currentUser) {
    // Thay đổi navigation
    const nav = document.querySelector('nav ul');
    const userLi = document.createElement('li');
    userLi.innerHTML = `
        <a href="#" class="user-menu">
            Xin chào, ${currentUser.name.split(' ')[0]}
            <ul class="submenu">
                <li><a href="user/profile.html">Tài khoản</a></li>
                <li><a href="#" id="logoutUser">Đăng xuất</a></li>
            </ul>
        </a>
    `;
    nav.appendChild(userLi);
    
    // Xử lý đăng xuất
    document.getElementById('logoutUser')?.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('nhuNailsUser');
        sessionStorage.removeItem('nhuNailsUser');
        window.location.reload();
    });
}
// Tạo hiệu ứng trái tim bay
function createFloatingHearts() {
    const container = document.querySelector('.moments-section');
    if (!container) return;
    
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts';
    container.appendChild(heartsContainer);
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '💖';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.fontSize = `${Math.random() * 1 + 1}rem`;
        heartsContainer.appendChild(heart);
    }
}

// Hiệu ứng hover hình ảnh
document.querySelectorAll('.moment-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icons = this.querySelector('.moment-icons');
        icons.innerHTML = '';
        
        // Tạo icon bay lên khi hover
        for (let i = 0; i < 3; i++) {
            const icon = document.createElement('span');
            icon.innerHTML = ['💖', '✨', '🌟'][Math.floor(Math.random() * 3)];
            icon.style.animation = `fly-up ${1 + Math.random()}s ease-out forwards`;
            icons.appendChild(icon);
        }
    });
});

// Thêm vào khi trang load
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    
    // Thêm font Dancing Script
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
});
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    menuBtn.addEventListener('click', function() {
        mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.header-container') && window.innerWidth <= 768) {
            mainNav.style.display = 'none';
        }
    });
    
    // Adjust on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainNav.style.display = 'flex';
        } else {
            mainNav.style.display = 'none';
        }
    });
});
// Hiệu ứng khi scroll đến gallery
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery-grid');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.gallery-item').forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.1 });
    
    if (gallery) {
        observer.observe(gallery);
        
        // Khởi tạo trạng thái ban đầu
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
});
// Lưu/Lấy thông tin người dùng
function checkLoginStatus() {
    // Kiểm tra localStorage hoặc sessionStorage
    const user = JSON.parse(localStorage.getItem('nhuNailsUser')) || 
                 JSON.parse(sessionStorage.getItem('nhuNailsUser'));
    
    if (user) {
        // Hiển thị tên người dùng
        document.querySelectorAll('.user-name').forEach(el => {
            el.textContent = user.name.split(' ')[0]; // Chỉ lấy tên đầu
        });
    } else {
        // Ẩn phần chào mừng nếu chưa đăng nhập
        document.querySelector('.user-greeting').style.display = 'none';
    }
}

// Xử lý đăng xuất
document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Xóa thông tin đăng nhập
    localStorage.removeItem('nhuNailsUser');
    sessionStorage.removeItem('nhuNailsUser');
    
    // Chuyển hướng về trang chủ
    window.location.href = 'index.html';
});

// Chạy khi trang load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    
    // Thêm hiệu ứng khi hover
    const greeting = document.querySelector('.user-greeting');
    if (greeting) {
        greeting.addEventListener('mouseenter', function() {
            this.querySelector('.welcome-emoji').style.animation = 'wave 0.5s infinite';
        });
        greeting.addEventListener('mouseleave', function() {
            this.querySelector('.welcome-emoji').style.animation = 'wave 2s infinite';
        });
    }
});

