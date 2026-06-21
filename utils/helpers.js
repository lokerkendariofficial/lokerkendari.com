// ============================================================
// HELPERS.JS - Fungsi Bantuan Umum
// ============================================================

/**
 * Format tanggal ke format Indonesia (DD MMMM YYYY)
 * @param {string|Date} date - Tanggal input
 * @returns {string} - Tanggal format Indonesia
 */
export function formatDateIndonesia(date) {
    const d = new Date(date);
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Format tanggal ke format singkat (DD/MM/YYYY)
 * @param {string|Date} date - Tanggal input
 * @returns {string} - Tanggal format DD/MM/YYYY
 */
export function formatDateShort(date) {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

/**
 * Buat slug dari string (untuk URL)
 * @param {string} text - Teks input
 * @returns {string} - Slug URL
 */
export function createSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
}

/**
 * Truncate teks dengan batas karakter
 * @param {string} text - Teks input
 * @param {number} maxLength - Maksimal karakter
 * @param {string} suffix - Akhiran (default: '...')
 * @returns {string} - Teks yang dipotong
 */
export function truncateText(text, maxLength = 100, suffix = '...') {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + suffix;
}

/**
 * Debounce fungsi (mencegah eksekusi terlalu sering)
 * @param {Function} func - Fungsi yang akan di-debounce
 * @param {number} delay - Waktu tunggu (ms)
 * @returns {Function} - Fungsi yang sudah di-debounce
 */
export function debounce(func, delay = 300) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Cek apakah nilai kosong (null, undefined, empty string, empty array)
 * @param {*} value - Nilai yang dicek
 * @returns {boolean} - true jika kosong
 */
export function isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
}

/**
 * Ambil parameter URL
 * @param {string} name - Nama parameter
 * @param {string} url - URL (default: window.location.search)
 * @returns {string|null} - Nilai parameter atau null
 */
export function getQueryParam(name, url = window.location.search) {
    const params = new URLSearchParams(url);
    return params.get(name);
}

/**
 * Random ID (untuk key sementara)
 * @param {number} length - Panjang ID
 * @returns {string} - Random ID
 */
export function generateId(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
}