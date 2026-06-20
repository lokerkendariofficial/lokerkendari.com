// ===== FILE CHECKER =====
// Memeriksa apakah file-file penting ada

import { showNotification } from './notification.js';

(function() {
    const files = [
        'style.css',
        'script.js',
        'loader.js',
        'js/data.js',
        'js/main.js',
        'js/inbox.js',
        'js/explore.js'
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
            });
    });
})();