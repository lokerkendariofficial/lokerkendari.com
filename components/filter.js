// ============================================================
// FILTER.JS - Komponen Filter & Pencarian
// ============================================================

export const filter = `
    <section class="filter-section" id="jobs">
        <div class="container">
            <div class="filter-header">
                <h2 class="section-title">📋 Daftar Lowongan Kerja</h2>
                <p class="section-subtitle">Temukan lowongan yang sesuai dengan kualifikasi dan minatmu.</p>
            </div>
            <div class="filter-bar">
                <div class="search-wrapper">
                    <input type="text" id="searchInput" placeholder="Cari lowongan, perusahaan, atau lokasi..." />
                    <button id="searchBtn" class="btn btn-search">🔍 Cari</button>
                </div>
                <div class="filter-options">
                    <select id="categoryFilter">
                        <option value="all">Semua Kategori</option>
                        <option value="Administrasi">Administrasi</option>
                        <option value="Marketing & Sales">Marketing & Sales</option>
                        <option value="Teknologi & IT">Teknologi & IT</option>
                        <option value="Keuangan & Perbankan">Keuangan & Perbankan</option>
                        <option value="Pendidikan">Pendidikan</option>
                        <option value="Kesehatan">Kesehatan</option>
                        <option value="Teknik & Konstruksi">Teknik & Konstruksi</option>
                        <option value="Logistik & Transportasi">Logistik & Transportasi</option>
                    </select>
                    <select id="sortFilter">
                        <option value="terbaru">Terbaru</option>
                        <option value="terlama">Terlama</option>
                        <option value="gaji-tertinggi">Gaji Tertinggi</option>
                        <option value="gaji-terendah">Gaji Terendah</option>
                    </select>
                </div>
            </div>
        </div>
    </section>
`;