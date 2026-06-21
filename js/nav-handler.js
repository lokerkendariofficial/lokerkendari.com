// ============================================================
// NAV-HANDLER.JS - Logika Navigasi (Hamburger + Sidebar)
// ============================================================

export function initNav() {
    console.log('🧭 Navigasi diinisialisasi...');

    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeBtn = document.getElementById('sidebarClose');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const navLinks = document.querySelectorAll('.nav-link');

    function openSidebar() {
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (hamburger) hamburger.classList.add('active');
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (hamburger) hamburger.classList.remove('active');
    }

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar?.classList.contains('open')) {
            closeSidebar();
        }
    });

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            closeSidebar();
        });
    });

    const currentPath = window.location.pathname;

    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const isActive = (href === '/' && currentPath === '/') ||
                         (href.startsWith('/#') && currentPath === '/') ||
                         (href === '/upload/' && currentPath.startsWith('/upload'));
        if (isActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const isActive = (href === '/' && currentPath === '/') ||
                         (href.startsWith('/#') && currentPath === '/') ||
                         (href === '/upload/' && currentPath.startsWith('/upload'));
        if (isActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    console.log('✅ Navigasi siap!');
}