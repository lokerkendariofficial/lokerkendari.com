// ============================================================
// FORM.JS - Logika Form (Preview, Submit, Validasi)
// ============================================================

import { addInfoItem } from './data.js';
import { escapeHtml, renderList } from './render.js';
import { showToast } from './toast.js';

// DOM REFS
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
const form = document.getElementById('uploadForm');

// Get form data
export function getFormData() {
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

// Preview informasi
export function previewInfo() {
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
}

// Submit form
export function submitForm(e) {
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

    // Simpan data
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

    addInfoItem(newItem);
    renderList();

    // Reset form & preview
    form.reset();
    previewSection.style.display = 'none';
    previewBox.innerHTML = '';

    // Toast sukses + redirect
    showToast('✅ Informasi berhasil dikirim! Sedang diproses...', 'success');

    // Redirect ke beranda setelah 2 detik
    setTimeout(() => {
        window.location.href = 'https://lokerkendariofficial.github.io/lokerkendari.com/';
    }, 2000);
}