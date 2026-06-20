// ===== GLOBAL ERROR =====
// Menangkap error runtime dan promise rejection

import { showNotification } from './notification.js';

(function() {
    // Error runtime
    window.onerror = function(message, source, lineno, colno, error) {
        console.groupCollapsed('%c⚠️ ERROR DETEKSI', 'background: #ef4444; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
        console.error('📌 Pesan:', message);
        console.error('📁 File:', source);
        console.error('📍 Baris:', lineno, 'Kolom:', colno);
        if (error) console.error('🔍 Detail:', error);
        console.groupEnd();

        showNotification('❌ Terjadi error: ' + message, 'error');
        return true;
    };

    // Promise rejection
    window.addEventListener('unhandledrejection', function(event) {
        console.groupCollapsed('%c⚠️ PROMISE REJECTION', 'background: #ef4444; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
        console.error('📌 Alasan:', event.reason);
        if (event.reason?.stack) console.error('🔍 Stack:', event.reason.stack);
        console.groupEnd();
        showNotification('⚠️ Promise gagal: ' + (event.reason?.message || event.reason), 'warn');
    });
})();