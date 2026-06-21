// ============================================================
// NOTIFICATION.JS - Menampilkan Notifikasi di Pojok Kanan Bawah
// ============================================================

export function showNotification(message, type = 'info') {
    // Hanya tampilkan di development (localhost)
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return;
    }

    const existing = document.querySelector('.debug-notification');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = 'debug-notification';
    const colors = {
        error: '#ef4444',
        warn: '#f59e0b',
        info: '#3b82f6',
        success: '#22c55e'
    };
    const bgColor = colors[type] || colors.info;

    notif.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: ${bgColor};
        color: #fff;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-family: 'Inter', sans-serif;
        max-width: 400px;
        z-index: 9999;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
        cursor: pointer;
    `;
    notif.textContent = message;
    notif.title = 'Klik untuk tutup';
    notif.onclick = function() { this.remove(); };

    // Tambahkan style animasi jika belum ada
    if (!document.getElementById('debug-style')) {
        const style = document.createElement('style');
        style.id = 'debug-style';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .debug-notification:hover { opacity: 0.9; }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notif);

    // Auto hilang setelah 8 detik
    setTimeout(() => {
        if (notif.parentNode) notif.remove();
    }, 8000);
}