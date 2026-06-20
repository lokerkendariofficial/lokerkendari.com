// ============================================================
// MAIN.JS - Inisialisasi & Event Listeners
// ============================================================

import { loadInfoList } from './data.js';
import { renderList } from './render.js';
import { previewInfo, submitForm } from './form.js';
import { showToast } from './toast.js';

// DOM REFS
const form = document.getElementById('uploadForm');
const previewBtn = document.getElementById('previewBtn');
const date = document.getElementById('date');

// Set default date
date.value = new Date().toISOString().split('T')[0];

// Event listeners
previewBtn.addEventListener('click', previewInfo);
form.addEventListener('submit', submitForm);

// Hapus item (di-expose ke global untuk onclick)
import { deleteInfoItem } from './data.js';
import { renderList } from './render.js';

window.deleteItem = function(index) {
    if (!confirm('Hapus informasi ini?')) return;
    const success = deleteInfoItem(index);
    if (success) {
        renderList();
        showToast('Informasi dihapus.', 'info');
    }
};

// ===== INIT =====
export function initUpload() {
    loadInfoList();
    renderList();
    console.log('📤 Upload module ready!');
}

// Jalankan init
initUpload();