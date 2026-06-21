// ============================================================
// SCRIPT.JS - FILE INDUK (Entry Point)
// ============================================================

import { initAppMain } from './js/app-main.js';
import { initInbox } from './js/inbox.js';
import { initExplore } from './js/explore.js';
import { initNav } from './js/nav-handler.js';

function initApp() {
    console.log('🚀 Loker Kendari - Inisialisasi...');

    // 1. Rakit komponen & load data
    initAppMain();

    // 2. Fitur interaktif
    initInbox();
    initExplore();
    initNav();

    console.log('✅ Loker Kendari siap!');
}

// === JALANKAN ===
document.addEventListener('DOMContentLoaded', function() {
    // Tunggu sampai DOM siap, lalu jalankan
    // Karena semua komponen sudah di JS, tidak perlu event components-loaded lagi
    initApp();
});