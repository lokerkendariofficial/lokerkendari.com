// ============================================================
// UPLOAD-MAIN.JS - Inisialisasi & Event Listeners (Upload)
// ============================================================

import { loadInfoList } from './upload-data.js';
import { renderList } from './render.js';
import { previewInfo, submitForm } from './form.js';
import { showToast } from './toast.js';

const form = document.getElementById('uploadForm');
const previewBtn = document.getElementById('previewBtn');
const date = document.getElementById('date');

date.value = new Date().toISOString().split('T')[0];

previewBtn.addEventListener('click', previewInfo);
form.addEventListener('submit', submitForm);

import { deleteInfoItem } from './upload-data.js';
import { renderList } from './render.js';

window.deleteItem = function(index) {
    if (!confirm('Hapus informasi ini?')) return;
    const success = deleteInfoItem(index);
    if (success) {
        renderList();
        showToast('Informasi dihapus.', 'info');
    }
};

export function initUpload() {
    loadInfoList();
    renderList();
    console.log('📤 Upload module ready!');
}

initUpload();