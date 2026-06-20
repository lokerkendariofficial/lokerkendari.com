// ============================================================
// DATA.JS - Manajemen Data Informasi
// ============================================================

let infoList = [];

// Load data dari localStorage
export function loadInfoList() {
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
    return infoList;
}

// Simpan ke localStorage
export function saveInfoList(list) {
    infoList = list;
    localStorage.setItem('uploadedInfo', JSON.stringify(infoList));
}

// Tambah item baru
export function addInfoItem(item) {
    infoList.unshift(item);
    localStorage.setItem('uploadedInfo', JSON.stringify(infoList));
    return infoList;
}

// Hapus item berdasarkan index
export function deleteInfoItem(index) {
    if (index >= 0 && index < infoList.length) {
        infoList.splice(index, 1);
        localStorage.setItem('uploadedInfo', JSON.stringify(infoList));
        return true;
    }
    return false;
}

// Dapatkan semua data
export function getInfoList() {
    return infoList;
}