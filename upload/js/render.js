import { getInfoList } from './upload-data.js';

export function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

export function renderList() {
    const uploadedItems = document.getElementById('uploadedItems');
    const listCount = document.getElementById('listCount');
    const infoList = getInfoList();

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

    const categoryLabel = {
        lowongan: 'Lowongan Kerja',
        pengumuman: 'Pengumuman',
        beasiswa: 'Beasiswa',
        pelatihan: 'Pelatihan',
        lainnya: 'Lainnya'
    };

    const itemsHtml = infoList.map((item, index) => {
        const label = categoryLabel[item.category] || item.category;
        return `
            <div class="upload-item" data-index="${index}">
                <div class="item-title">${escapeHtml(item.title)}</div>
                <div class="item-meta">
                    <span>${label}</span>
                    <span>${item.date || '-'}</span>
                    ${item.company ? `<span>🏢 ${escapeHtml(item.company)}</span>` : ''}
                    ${item.location ? `<span>📍 ${escapeHtml(item.location)}</span>` : ''}
                </div>
                <div class="item-desc">${escapeHtml(item.description)}</div>
                ${item.contact ? `<div style="font-size:0.8rem; color:var(--gray-500);">📧 ${escapeHtml(item.contact)}</div>` : ''}
                <div class="item-actions">
                    <button class="btn-delete" onclick="window.deleteItem(${index})"><i class="fas fa-trash"></i> Hapus</button>
                </div>
            </div>
        `;
    }).join('');

    uploadedItems.innerHTML = itemsHtml;
    listCount.textContent = `${infoList.length} item`;
}