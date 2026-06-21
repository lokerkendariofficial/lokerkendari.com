// ============================================================
// SYSTEM-INFO.JS - Menampilkan Informasi Sistem di Console
// ============================================================

(function() {
    const colors = {
        success: 'background: #22c55e; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
        info: 'background: #3b82f6; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
    };

    console.log('%c🚀 Loker Kendari - Debug Mode Aktif', colors.success);
    console.log('%c📦 Versi:', 'font-weight: bold;', '2.0.0');
    console.log('%c🕒 Waktu:', 'font-weight: bold;', new Date().toLocaleString());
    console.log('%c🌐 URL:', 'font-weight: bold;', window.location.href);
    console.log('%c🖥️ Browser:', 'font-weight: bold;', navigator.userAgent);
    console.log('%c📱 Resolusi:', 'font-weight: bold;', `${window.innerWidth}x${window.innerHeight}`);

    // Deteksi mode mobile
    if (window.innerWidth < 768) {
        console.log('%c📱 Mode Mobile terdeteksi', colors.info);
    }

    // Deteksi koneksi
    if (navigator.onLine) {
        console.log('%c✅ Koneksi: Online', colors.success);
    } else {
        console.log('%c❌ Koneksi: Offline', 'color: #ef4444; font-weight: bold;');
    }
})();