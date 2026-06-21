// ===== FILE INDUK =====
import { loadJobs, initMainEvents } from './js/main.js';
import { initInbox } from './js/inbox.js';
import { initExplore } from './js/explore.js';

function initApp() {
    console.log('🚀 Loker Kendari - Inisialisasi...');
    loadJobs();
    initMainEvents();
    initInbox();
    initExplore();

    // ===== NAVIGASI =====
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    // Set active state berdasarkan URL
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Cek apakah link mengarah ke halaman yang sedang aktif
        const isActive = (href === '/' && currentPath === '/') ||
                         (href.startsWith('/#') && currentPath === '/' && window.location.hash === href.substring(1)) ||
                         (href === '/upload/' && currentPath.startsWith('/upload')) ||
                         (href !== '/' && href !== '/upload/' && currentPath === href);

        if (isActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Event listener untuk setiap link (update active state saat diklik)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Biarkan link berfungsi normal (tidak preventDefault)
            // Hanya update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Tutup menu mobile saat link diklik
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('open');
            }
        });
    });

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('open');
            // Toggle class active pada hamburger untuk animasi
            this.classList.toggle('active');
        });

        // Tutup menu saat klik di luar (mobile)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                const isClickInside = navMenu.contains(e.target) || hamburger.contains(e.target);
                if (!isClickInside && navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    hamburger.classList.remove('active');
                }
            }
        });
    }

    console.log('✅ Loker Kendari siap!');
}

// === Cek apakah komponen sudah dimuat ===
function isAppReady() {
    const app = document.getElementById('app');
    return app && app.children.length > 0;
}

// === Strategi Loading ===
if (isAppReady()) {
    console.log('✅ Komponen sudah siap, langsung init');
    initApp();
} else {
    console.log('⏳ Menunggu event components-loaded...');
    document.addEventListener('components-loaded', function(e) {
        console.log('📦 Event components-loaded diterima', e.detail);
        initApp();
    });

    // Fallback polling
    let attempts = 0;
    const maxAttempts = 50;
    const fallbackTimer = setInterval(() => {
        attempts++;
        if (isAppReady()) {
            clearInterval(fallbackTimer);
            console.log('📦 Fallback: komponen terdeteksi');
            initApp();
        } else if (attempts >= maxAttempts) {
            clearInterval(fallbackTimer);
            console.error('❌ Gagal memuat komponen HTML setelah 5 detik.');
        }
    }, 100);
}