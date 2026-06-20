// ===== FILE INDUK =====
import { loadJobs, initMainEvents } from './js/main.js';
import { initInbox } from './js/inbox.js';
import { initExplore } from './js/explore.js';

// ===== TUNGGU KOMPONEN HTML DIMUAT OLEH LOADER.JS =====
// Loader.js akan memicu event 'components-loaded' setelah selesai
// Jika komponen sudah dimuat sebelum event listener dipasang, langsung inisialisasi

function initApp() {
    console.log('🚀 Loker Kendari - Inisialisasi...');

    // Load data dan render jobs
    loadJobs();
    
    // Inisialisasi event listener untuk filter/search
    initMainEvents();
    
    // Inisialisasi fitur Inbox
    initInbox();
    
    // Inisialisasi fitur Explore
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

// ===== CEK APAKAH KOMPONEN SUDAH DIMUAT =====
function isAppReady() {
    const app = document.getElementById('app');
    // Jika app sudah memiliki anak elemen (komponen telah dimuat)
    return app && app.children.length > 0;
}

// ===== STRATEGI LOADING =====
// 1. Jika komponen sudah dimuat (loader.js selesai lebih cepat), langsung init
if (isAppReady()) {
    initApp();
} else {
    // 2. Jika belum, tunggu event 'components-loaded' dari loader.js
    document.addEventListener('components-loaded', function() {
        console.log('📦 Event components-loaded diterima');
        initApp();
    });

    // 3. Fallback: jika event tidak terpancar, coba polling setiap 100ms
    // (untuk jaga-jaga jika ada error di loader.js)
    let attempts = 0;
    const maxAttempts = 50; // 5 detik (50 x 100ms)
    const fallbackTimer = setInterval(() => {
        attempts++;
        if (isAppReady()) {
            clearInterval(fallbackTimer);
            console.log('📦 Fallback: komponen terdeteksi');
            initApp();
        } else if (attempts >= maxAttempts) {
            clearInterval(fallbackTimer);
            console.error('❌ Gagal memuat komponen HTML. Periksa loader.js dan folder components/');
        }
    }, 100);
}

