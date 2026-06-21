// ============================================================
// NAV-HANDLER.JS - Logika Hamburger Menu (Mobile)
// ============================================================

export function initNav() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!hamburger || !mobileMenu) {
        console.warn('⚠️ Hamburger atau mobileMenu tidak ditemukan!');
        return;
    }

    // Buat overlay jika belum ada
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }

    function openMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===== KLIK HAMBURGER =====
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // ===== KLIK OVERLAY =====
    overlay.addEventListener('click', closeMenu);

    // ===== KLIK LINK DI MENU =====
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // ===== TOMBOL ESC =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    console.log('✅ Nav handler siap!');
}