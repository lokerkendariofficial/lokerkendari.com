// ===== LOADER JS =====
// Memuat semua komponen HTML dari folder components/ ke dalam #app

const components = [
    'navbar',
    'hero',
    'stats',
    'filter',
    'jobs',
    'about',
    'inbox',
    'explore',
    'footer'
];

async function loadComponents() {
    const app = document.getElementById('app');
    let html = '';

    for (const comp of components) {
        try {
            const response = await fetch(`components/${comp}.html`);
            if (!response.ok) throw new Error(`Gagal memuat ${comp}.html`);
            const content = await response.text();
            html += content;
        } catch (error) {
            console.warn(`⚠️ Komponen ${comp} tidak ditemukan, dilewati.`);
        }
    }

    app.innerHTML = html;
    console.log('✅ Semua komponen HTML telah dimuat.');
}

// Jalankan loader
loadComponents();