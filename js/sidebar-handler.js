// ============================================================
// SIDEBAR-HANDLER.JS - Logika Sidebar (Toggle & Navigasi)
// ============================================================

export function initSidebar() {
    const sidebar = document.getElementById('sidebarLeft');
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const mainContent = document.getElementById('app');

    // ===== FUNGSI BUKA/TUTUP SIDEBAR (Mobile) =====
    function toggleSidebar() {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open');
        }
    }

    function closeSidebar() {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    }

    // ===== EVENT: TOMBOL TOGGLE =====
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    // ===== EVENT: KLIK DI LUAR SIDEBAR (Tutup) =====
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
            const isInside = sidebar.contains(e.target) || toggleBtn?.contains(e.target);
            if (!isInside) {
                closeSidebar();
            }
        }
    });

    // ===== EVENT: TOMBOL ESC (Tutup) =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar?.classList.contains('open')) {
            closeSidebar();
        }
    });

    // ===== EVENT: KLIK LINK SIDEBAR =====
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Ambil halaman tujuan dari atribut data-page
            const page = this.dataset.page;
            if (!page) return;

            // Update active state
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Tutup sidebar di mobile
            closeSidebar();

            // Panggil fungsi navigasi
            navigateTo(page);
        });
    });

    // ===== FUNGSI NAVIGASI =====
    function navigateTo(page) {
        console.log(`📄 Navigasi ke halaman: ${page}`);

        // Sembunyikan semua konten
        const allPages = document.querySelectorAll('.page-content');
        allPages.forEach(p => p.style.display = 'none');

        // Tampilkan konten yang dipilih
        const targetPage = document.getElementById(`page-${page}`);
        if (targetPage) {
            targetPage.style.display = 'block';
        } else {
            // Jika belum ada, tampilkan pesan
            showPlaceholder(page);
        }
    }

    // ===== PLACEHOLDER UNTUK HALAMAN YANG BELUM DIBUAT =====
    function showPlaceholder(page) {
        const pageNames = {
            profile: 'Halaman Profil',
            preferences: 'Halaman Preferensi Kerja',
            applied: 'Halaman Riwayat Lamaran',
            saved: 'Halaman Lowongan Disimpan',
            help: 'Halaman Bantuan',
            logout: 'Anda akan keluar...'
        };

        const title = pageNames[page] || page;
        alert(`🔄 Halaman "${title}" sedang dalam pengembangan.`);
    }

    // ===== SET ACTIVE STATE BERDASARKAN URL =====
    function setActiveFromUrl() {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === hash) {
                    link.classList.add('active');
                }
            });
        }
    }

    setActiveFromUrl();

    console.log('✅ Sidebar handler siap!');
}