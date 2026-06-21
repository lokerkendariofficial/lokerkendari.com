// ============================================================
// FILE-CHECKER.JS - Memeriksa File Penting (Peta 2.0)
// ============================================================

import { showNotification } from './notification.js';

(function() {
    const files = [
        // Root
        'style.css',
        'script.js',
        'index.html',

        // Core JS
        'js/core/error-handler.js',

        // Main JS modules
        'js/app-data.js',
        'js/app-main.js',
        'js/nav-handler.js',
        'js/inbox.js',
        'js/explore.js',

        // Error modules
        'js/error/global-error.js',
        'js/error/console-override.js',
        'js/error/notification.js',
        'js/error/file-checker.js',
        'js/error/system-info.js'
    ];

    console.log('%c📁 Cek file penting...', 'background: #3b82f6; color: #fff; padding: 4px 8px; border-radius: 4px;');

    files.forEach(file => {
        fetch(file, { method: 'HEAD' })
            .then(res => {
                if (res.ok) {
                    console.log(`%c✅ ${file} ditemukan`, 'color: #22c55e;');
                } else {
                    console.log(`%c❌ ${file} TIDAK DITEMUKAN (${res.status})`, 'color: #ef4444;');
                    showNotification(`❌ File ${file} tidak ditemukan!`, 'error');
                }
            })
            .catch(() => {
                console.log(`%c❌ ${file} gagal diakses`, 'color: #ef4444;');
                showNotification(`❌ File ${file} tidak dapat diakses!`, 'error');
            });
    });
})();