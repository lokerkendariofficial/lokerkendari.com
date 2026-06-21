// ============================================================
// SCRIPT.JS - FILE INDUK (Entry Point)
// ============================================================

import { loadJobs, initMainEvents } from './js/app-main.js';
import { initInbox } from './js/inbox.js';
import { initExplore } from './js/explore.js';
import { initNav } from './js/nav-handler.js';

function initApp() {
    console.log('🚀 Loker Kendari - Inisialisasi...');

    loadJobs();
    initMainEvents();
    initInbox();
    initExplore();
    initNav();

    // ===== SIDEBAR TOGGLE (Mobile) =====
    const sidebar = document.getElementById('sidebarLeft');
    const sidebarToggle = document.getElementById('sidebarToggle');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }

    // Tutup sidebar saat klik di luar (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
            const isInside = sidebar.contains(e.target) || sidebarToggle?.contains(e.target);
            if (!isInside) {
                sidebar.classList.remove('open');
            }
        }
    });

    console.log('✅ Loker Kendari siap!');
}

// === CEK APAKAH KOMPONEN SUDAH DIMUAT ===
function isAppReady() {
    const app = document.getElementById('app');
    return app && app.children.length > 0;
}

// === STRATEGI LOADING ===
if (isAppReady()) {
    console.log('✅ Komponen sudah siap, langsung init');
    initApp();
} else {
    console.log('⏳ Menunggu event components-loaded...');
    document.addEventListener('components-loaded', function(e) {
        console.log('📦 Event components-loaded diterima', e.detail);
        initApp();
    });

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