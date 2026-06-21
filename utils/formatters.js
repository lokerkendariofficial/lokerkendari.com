// ============================================================
// FORMATTERS.JS - Fungsi Formatting
// ============================================================

/**
 * Format mata uang Rupiah (Rp 1.000.000)
 * @param {number} amount - Jumlah uang
 * @param {string} currency - Simbol mata uang (default: 'Rp')
 * @returns {string} - Format Rupiah
 */
export function formatRupiah(amount, currency = 'Rp') {
    const formatted = new Intl.NumberFormat('id-ID').format(amount);
    return `${currency} ${formatted}`;
}

/**
 * Format angka dengan pemisah ribuan
 * @param {number} number - Angka yang diformat
 * @param {number} decimals - Jumlah desimal
 * @returns {string} - Angka dengan pemisah ribuan
 */
export function formatNumber(number, decimals = 0) {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(number);
}

/**
 * Format tanggal ke format Indonesia (Senin, 20 Juni 2026)
 * @param {string|Date} date - Tanggal input
 * @returns {string} - Tanggal format panjang
 */
export function formatDateLong(date) {
    const d = new Date(date);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Format waktu (HH:MM)
 * @param {string|Date} date - Tanggal input
 * @returns {string} - Waktu format HH:MM
 */
export function formatTime(date) {
    const d = new Date(date);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/**
 * Format selisih waktu (misal: '2 jam yang lalu')
 * @param {string|Date} date - Tanggal input
 * @returns {string} - Selisih waktu
 */
export function timeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return 'baru saja';
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours < 24) return `${hours} jam yang lalu`;
    if (days < 7) return `${days} hari yang lalu`;
    if (weeks < 4) return `${weeks} minggu yang lalu`;
    if (months < 12) return `${months} bulan yang lalu`;
    return `${years} tahun yang lalu`;
}

/**
 * Format ukuran file (Bytes → KB/MB/GB)
 * @param {number} bytes - Ukuran dalam bytes
 * @param {number} decimals - Jumlah desimal
 * @returns {string} - Ukuran format
 */
export function formatFileSize(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}