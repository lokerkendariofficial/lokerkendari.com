// ============================================================
// UPLOAD.JS - Form Upload Informasi
// ============================================================

// ===== DOM REFS =====
const form = document.getElementById('uploadForm');
const title = document.getElementById('title');
const category = document.getElementById('category');
const date = document.getElementById('date');
const company = document.getElementById('company');
const location = document.getElementById('location');
const contact = document.getElementById('contact');
const description = document.getElementById('description');
const previewBtn = document.getElementById('previewBtn');
const previewSection = document.getElementById('previewSection');
const previewBox = document.getElementById('previewBox');
const uploadedItems = document.getElementById('uploadedItems');
const listCount = document.getElementById('listCount');

// ===== STATE =====
let infoList = [];

// ===== LOAD DATA =====
function loadInfoList() {
    try {
        const stored = localStorage.getItem('uploadedInfo');
        if (stored) {
            infoList = JSON.parse(stored);
        } else {
            // Data dummy untuk demo
            infoList = [
                {
                    id: Date.now() - 3600000,
                    title: 'Lowongan Staff Administrasi',
                    category: 'lowongan',
                    date: '2026-06-20',
                    company: 'PT Sukses Bersama',
                    location: 'Kendari',
                    contact: 'hr@sukses.com',
                    description: 'Dibutuhkan staff administrasi berpengalaman. Kirim CV ke email.',
                    createdAt: new Date(Date.now() - 3600000).toISOString()
                }
            ];
            localStorage.setItem('uploadedInfo', JSON.stringify(infoList));
        }
    } catch (e) {
        infoList = [];
    }
    renderList();
}

// ===== RENDER LIST =====
function renderList() {
    if (infoList.length === 0) {
        uploadedItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>Belum ada informasi yang dikirim.</p>
                <small>Gunakan form di atas untuk mengirim informasi.</small>
            </div>
        `;
        listCount.textContent = '0 item';
        return;
    }

    const itemsHtml = infoList.map((item, index) => {
        const categoryLabel = {
            lowongan: 'Lowongan Kerja',
            pengumuman: 'Pengumuman',
            beasiswa: 'Beasiswa',
            pelatihan: 'Pelatihan',
            lainnya: 'Lainnya'
        }[item.category] || item.category;

        return `
            <div class="upload-item" data-index="${index}">
                <div class="item-title">${escapeHtml(item.title)}</div>
                <div class="item-meta">
                    <span>${categoryLabel}</span>
                    <span>${item.date || '-'}</span>
                    ${item.company ? `<span>🏢 ${escapeHtml(item.company)}</span>` : ''}
                    ${item.location ? `<span>📍 ${escapeHtml(item.location)}</span>` : ''}
                </div>
                <div class="item-desc">${escapeHtml(item.description)}</div>
                ${item.contact ? `<div style="font-size:0.8rem; color:var(--gray-500);">📧 ${escapeHtml(item.contact)}</div>` : ''}
                <div class="item-actions">
                    <button class="btn-delete" onclick="deleteItem(${index})"><i class="fas fa-trash"></i> Hapus</button>
                </div>
            </div>
        `;
    }).join('');

    uploadedItems.innerHTML = itemsHtml;
    listCount.textContent = `${infoList.length} item`;
}

// ===== ESCAPE HTML =====
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== DELETE ITEM =====
window.deleteItem = function(index) {
    if (!confirm('Hapus informasi ini?')) return;
    infoList.splice(index, 1);
    localStorage.setItem('uploadedInfo', JSON.stringify(infoList));
    renderList();
    showToast('Informasi dihapus.', 'info');
};

// ===== PREVIEW =====
previewBtn.addEventListener('click', function() {
    const data = getFormData();
    if (!data.title || !data.category || !data.description) {
        showToast('Isi judul, kategori, dan deskripsi terlebih dahulu.', 'error');
        return;
    }

    const categoryLabel = {
        lowongan: 'Lowongan Kerja',
        pengumuman: 'Pengumuman',
        beasiswa: 'Beasiswa',
        pelatihan: 'Pelatihan',
        lainnya: 'Lainnya'
    }[data.category] || data.category;

    previewBox.innerHTML = `
        <div class="preview-meta">
            <span>${categoryLabel}</span>
            <span>📅 ${data.date || '-'}</span>
            ${data.company ? `<span>🏢 ${escapeHtml(data.company)}</span>` : ''}
            ${data.location ? `<span>📍 ${escapeHtml(data.location)}</span>` : ''}
        </div>
        <strong>${escapeHtml(data.title)}</strong>
        <p style="margin-top:4px;">${escapeHtml(data.description)}</p>
        ${data.contact ? `<div style="font-size:0.8rem; color:var(--gray-500);">📧 ${escapeHtml(data.contact)}</div>` : ''}
    `;
    previewSection.style.display = 'block';
    previewSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('Preview berhasil dimuat.', 'info');
});

// ===== GET FORM DATA =====
function getFormData() {
    return {
        title: title.value.trim(),
        category: category.value,
        date: date.value,
        company: company.value.trim(),
        location: location.value.trim(),
        contact: contact.value.trim(),
        description: description.value.trim()
    };
}

// ===== SUBMIT FORM (DENGAN REDIRECT) =====
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const data = getFormData();

    // Validasi
    if (!data.title) { showToast('Judul harus diisi.', 'error'); title.focus(); return; }
    if (!data.category) { showToast('Pilih kategori.', 'error'); category.focus(); return; }
    if (!data.description) { showToast('Deskripsi harus diisi.', 'error'); description.focus(); return; }
    if (data.description.length < 10) { showToast('Deskripsi minimal 10 karakter.', 'error'); description.focus(); return; }

    // Nonaktifkan tombol submit & tampilkan loading
    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

    // Simpan ke localStorage
    const newItem = {
        id: Date.now(),
        title: data.title,
        category: data.category,
        date: data.date || new Date().toISOString().split('T')[0],
        company: data.company,
        location: data.location,
        contact: data.contact,
        description: data.description,
        createdAt: new Date().toISOString()
    };

    infoList.unshift(newItem);
    localStorage.setItem('uploadedInfo', JSON.stringify(infoList));
    renderList();

    // Reset form & preview
    form.reset();
    previewSection.style.display = 'none';
    previewBox.innerHTML = '';

    // Toast sukses + proses
    showToast('✅ Informasi berhasil dikirim! Sedang diproses...', 'success');

    // Redirect ke beranda setelah 2 detik
    setTimeout(() => {
        window.location.href = 'https://lokerkendariofficial.github.io/lokerkendari.com/';
    }, 2000);
});

// ===== TOAST SYSTEM =====
function showToast(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    toast.innerHTML = `<i class="fas ${icons[type] || 'fa-info-circle'}"></i> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ===== SET DEFAULT DATE =====
date.value = new Date().toISOString().split('T')[0];

// ===== INIT =====
loadInfoList();