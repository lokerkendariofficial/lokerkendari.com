// ============================================================
// LOADER.JS - Memuat Komponen HTML dari folder components/
// ============================================================

const components = [
    'navbar',
    'sidebar',        // ← TAMBAHKAN INI!
    'filter',
    'jobs',
    'inbox',
    'explore',
    'footer'
];

async function loadComponents() {
    const app = document.getElementById('app');
    if (!app) {
        console.error('❌ Elemen #app tidak ditemukan!');
        return;
    }

    let html = '';
    let successCount = 0;
    let failCount = 0;

    for (const comp of components) {
        try {
            const response = await fetch(`components/${comp}.html`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} - ${response.statusText}`);
            }
            const content = await response.text();
            html += content;
            successCount++;
            console.log(`✅ ${comp}.html dimuat`);
        } catch (error) {
            failCount++;
            console.warn(`⚠️ Gagal memuat ${comp}.html:`, error.message);
        }
    }

    app.innerHTML = html;
    console.log(`✅ Komponen dimuat: ${successCount} berhasil, ${failCount} gagal`);

    document.dispatchEvent(new CustomEvent('components-loaded', {
        detail: { successCount, failCount }
    }));
}

loadComponents();