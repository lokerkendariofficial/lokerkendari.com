// ============================================================
// JOBS.JS - Komponen Daftar Lowongan (Grid & Card)
// ============================================================

export const jobs = `
    <section class="jobs-section">
        <div class="container">
            <div class="jobs-grid" id="jobsGrid"></div>
            <div class="jobs-loading" id="loadingIndicator">
                <div class="spinner"></div>
                <p>Memuat lowongan...</p>
            </div>
            <div class="jobs-empty" id="emptyState" style="display:none;">
                <div class="empty-icon">🔍</div>
                <h3>Tidak ada lowongan ditemukan</h3>
                <p>Coba ubah kata kunci atau filter pencarian.</p>
            </div>
        </div>
    </section>
`;