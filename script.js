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

    // Copilot
    const navCopilot = document.getElementById('navCopilot');
    if (navCopilot) {
        navCopilot.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            alert('🤖 Copilot: Siap membantu Anda menemukan lowongan terbaik di Kendari! Silakan tanyakan apa saja.');
        });
    }

    // Home active state
    document.querySelector('.nav-link[href="#home"]')?.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
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