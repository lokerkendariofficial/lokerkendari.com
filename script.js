// ============================================================
// SCRIPT.JS - FILE INDUK (Entry Point)
// ============================================================

import { loadJobs, initMainEvents } from './js/main.js';
import { initInbox } from './js/inbox.js';
import { initExplore } from './js/explore.js';
import { initNav } from './js/nav.js';

function initApp() {
    console.log('🚀 Loker Kendari - Inisialisasi...');

    // ===== FITUR UTAMA =====
    loadJobs();
    initMainEvents();
    initInbox();
    initExplore();

    // ===== NAVIGASI (Hamburger + Sidebar) =====
    initNav();

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