// ============================================================
// NAVBAR.JS - Komponen Navigasi
// ============================================================

export const navbar = `
    <header class="navbar">
        <div class="container nav-container">
            <a href="/" class="logo">
                <img src="assets/images/logo.svg" alt="Loker Kendari" width="140" height="35" />
            </a>

            <!-- ID: hamburgerBtn → match dengan nav-handler.js -->
            <button class="hamburger" id="hamburgerBtn">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <!-- ID: mobileMenu → match dengan nav-handler.js -->
            <div class="nav-menu-mobile" id="mobileMenu">
                <a href="/" class="nav-link active">Beranda</a>
                <a href="/#jobs" class="nav-link">Lowongan</a>
                <a href="/#about" class="nav-link">Tentang</a>
                <a href="/upload/" class="nav-link">Upload</a>
                <div class="menu-divider"></div>
                <a href="#profile" class="nav-link"><i class="fas fa-user"></i> Profil</a>
                <a href="#logout" class="nav-link logout"><i class="fas fa-sign-out-alt"></i> Keluar</a>
            </div>
        </div>
    </header>
`;