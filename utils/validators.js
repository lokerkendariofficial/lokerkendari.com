// ============================================================
// VALIDATORS.JS - Fungsi Validasi
// ============================================================

/**
 * Validasi alamat email
 * @param {string} email - Email yang divalidasi
 * @returns {boolean} - true jika valid
 */
export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validasi nomor telepon Indonesia (08xx-xxxx-xxxx)
 * @param {string} phone - Nomor telepon
 * @returns {boolean} - true jika valid
 */
export function isValidPhone(phone) {
    const regex = /^08[1-9][0-9]{7,11}$/;
    return regex.test(phone.replace(/[\s\-]/g, ''));
}

/**
 * Validasi URL
 * @param {string} url - URL yang divalidasi
 * @returns {boolean} - true jika valid
 */
export function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validasi panjang minimal
 * @param {string} text - Teks yang divalidasi
 * @param {number} min - Panjang minimal
 * @returns {boolean} - true jika >= min
 */
export function isMinLength(text, min) {
    return text.length >= min;
}

/**
 * Validasi panjang maksimal
 * @param {string} text - Teks yang divalidasi
 * @param {number} max - Panjang maksimal
 * @returns {boolean} - true jika <= max
 */
export function isMaxLength(text, max) {
    return text.length <= max;
}

/**
 * Validasi angka
 * @param {*} value - Nilai yang divalidasi
 * @returns {boolean} - true jika angka
 */
export function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Validasi tanggal (format YYYY-MM-DD)
 * @param {string} date - Tanggal yang divalidasi
 * @returns {boolean} - true jika valid
 */
export function isValidDate(date) {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d);
}

/**
 * Validasi apakah nilai ada di dalam array
 * @param {*} value - Nilai yang dicek
 * @param {Array} array - Array yang menjadi acuan
 * @returns {boolean} - true jika ada
 */
export function isInArray(value, array) {
    return array.includes(value);
}