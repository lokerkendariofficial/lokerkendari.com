// ============================================================
// CONSTANTS.JS - Konstanta Global
// ============================================================

// Kategori Lowongan
export const JOB_CATEGORIES = [
    'Administrasi',
    'Marketing & Sales',
    'Teknologi & IT',
    'Keuangan & Perbankan',
    'Pendidikan',
    'Kesehatan',
    'Teknik & Konstruksi',
    'Logistik & Transportasi'
];

// Tipe Pekerjaan
export const JOB_TYPES = [
    'Full-time',
    'Part-time',
    'Kontrak',
    'Freelance',
    'Magang',
    'PNS'
];

// Status Lamaran
export const APPLICATION_STATUS = {
    PENDING: 'pending',
    REVIEWED: 'reviewed',
    INTERVIEW: 'interview',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected'
};

// Kategori Upload Informasi
export const UPLOAD_CATEGORIES = [
    { value: 'lowongan', label: 'Lowongan Kerja' },
    { value: 'pengumuman', label: 'Pengumuman' },
    { value: 'beasiswa', label: 'Beasiswa' },
    { value: 'pelatihan', label: 'Pelatihan / Kursus' },
    { value: 'lainnya', label: 'Lainnya' }
];

// Warna Status (untuk badge)
export const STATUS_COLORS = {
    pending: '#f59e0b',
    reviewed: '#3b82f6',
    interview: '#8b5cf6',
    accepted: '#22c55e',
    rejected: '#ef4444'
};