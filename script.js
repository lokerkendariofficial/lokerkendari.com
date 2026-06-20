// ===== DATA LOWONGAN (langsung di sini, tanpa JSON) =====
const defaultJobs = [
    {
        id: 1,
        title: "Commercial Sales",
        company: "Triputra Visi Energi (TRIVE)",
        location: "Kendari, Sultra",
        category: "Marketing & Sales",
        salary: "Rp 5.000.000 - 8.000.000",
        description: "Mencari kandidat berpengalaman di bidang penjualan komersial dengan latar belakang Business Administration dan GPA min. 3.00.",
        posted: "2026-05-13",
        logo: "🏢"
    },
    {
        id: 2,
        title: "Sales Executive",
        company: "PT INISIATIF SEMUA BISA",
        location: "Kendari, Sultra",
        category: "Marketing & Sales",
        salary: "Rp 4.500.000 - 6.500.000",
        description: "Melakukan mapping dan canvassing ke target market (toko kelontong, sembako, konter pulsa, dll) serta pelaporan.",
        posted: "2026-05-02",
        logo: "📊"
    },
    {
        id: 3,
        title: "Pengawas Lapangan",
        company: "Perusahaan Mining & Oil Gas",
        location: "Kendari, Sultra",
        category: "Teknik & Konstruksi",
        salary: "Rp 6.000.000 - 9.000.000",
        description: "Mengawasi operasional lapangan di industri mining dan oil & gas. Memiliki SIM dan bersedia perjalanan dinas.",
        posted: "2026-03-15",
        logo: "⛏️"
    },
    {
        id: 4,
        title: "Admin Officer",
        company: "PT SUCOFINDO",
        location: "Kendari, Sultra",
        category: "Administrasi",
        salary: "Rp 4.000.000 - 5.500.000",
        description: "Posisi kontrak untuk mendukung administrasi operasional laboratorium dan koordinasi dengan tim preparasi.",
        posted: "2026-04-12",
        logo: "📋"
    },
    {
        id: 5,
        title: "B2C Marketing Officer",
        company: "PT Serasi Autoraya (SERA)",
        location: "Kendari, Sultra",
        category: "Marketing & Sales",
        salary: "Rp 4.000.000 - 6.000.000",
        description: "Memiliki SIM menjadi nilai tambah. Bertanggung jawab atas strategi pemasaran B2C di wilayah Kendari.",
        posted: "2026-06-08",
        logo: "🚗"
    },
    {
        id: 6,
        title: "Inventory Staff",
        company: "Mandiri Utama Finance (MUF)",
        location: "Kendari, Sultra",
        category: "Keuangan & Perbankan",
        salary: "Rp 4.500.000 - 6.000.000",
        description: "Mengelola inventaris dan administrasi gudang. Minimal D3 dengan pengalaman di bidang logistik.",
        posted: "2026-06-01",
        logo: "📦"
    },
    {
        id: 7,
        title: "Teknisi HVAC",
        company: "PT Borwita Citra Prima",
        location: "Kadia, Kendari",
        category: "Teknik & Konstruksi",
        salary: "Rp 3.400.000 - 3.500.000",
        description: "Bertanggung jawab atas instalasi, perawatan, dan perbaikan sistem HVAC di berbagai proyek.",
        posted: "2026-06-02",
        logo: "❄️"
    },
    {
        id: 8,
        title: "Guru Informatika",
        company: "Sekolah Swasta Kendari",
        location: "Kendari, Sultra",
        category: "Pendidikan",
        salary: "Rp 3.300.000 - 5.000.000",
        description: "Mengajar mata pelajaran informatika untuk tingkat SMP/SMA. Kandidat harus memiliki pengalaman mengajar.",
        posted: "2026-05-11",
        logo: "💻"
    },
    {
        id: 9,
        title: "Frontliner (CS & Teller)",
        company: "Bank BRI (PKSS)",
        location: "Kendari, Sultra",
        category: "Keuangan & Perbankan",
        salary: "Rp 4.000.000 - 5.500.000",
        description: "Walk in interview untuk posisi Frontliner, Business Support, Field Collection, dan Satpam.",
        posted: "2026-04-29",
        logo: "🏦"
    },
    {
        id: 10,
        title: "Staff Service",
        company: "PT Electronic City Indonesia",
        location: "Kendari, Sultra",
        category: "Teknologi & IT",
        salary: "Rp 3.800.000 - 5.200.000",
        description: "Memberikan layanan pelanggan dan dukungan teknis untuk produk elektronik.",
        posted: "2026-06-03",
        logo: "🖥️"
    },
    {
        id: 11,
        title: "Sales Advisor",
        company: "Perusahaan Retail Kendari",
        location: "Kadia, Kendari",
        category: "Marketing & Sales",
        salary: "Rp 2.800.000 - 3.100.000",
        description: "Memberikan konsultasi penjualan kepada pelanggan dan mencapai target penjualan.",
        posted: "2026-06-02",
        logo: "🛒"
    },
    {
        id: 12,
        title: "Kurir / Driver Area",
        company: "PT Tridaya Dimensi Indonesia",
        location: "Kendari, Sultra",
        category: "Logistik & Transportasi",
        salary: "Rp 1.500.000 - 3.000.000",
        description: "Mengantarkan barang ke pelanggan di area Kendari. Memiliki SIM dan kendaraan sendiri menjadi nilai tambah.",
        posted: "2026-06-01",
        logo: "🚚"
    }
];

// ===== STATE =====
let jobsData = [];
let filteredJobs = [];

// ===== DOM REFS =====
const jobsGrid = document.getElementById('jobsGrid');
const loadingIndicator = document.getElementById('loadingIndicator');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

// Inbox
const inboxPopup = document.getElementById('inboxPopup');
const closeInbox = document.getElementById('closeInbox');
const navInbox = document.getElementById('navInbox');

// Explore
const exploreModal = document.getElementById('exploreModal');
const closeExplore = document.getElementById('closeExplore');
const navExplore = document.getElementById('navExplore');

// Copilot
const navCopilot = document.getElementById('navCopilot');

// ===== FUNCTIONS =====

// Format tanggal
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Render job cards
function renderJobs(jobs) {
    if (jobs.length === 0) {
        jobsGrid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    emptyState.style.display = 'none';

    jobsGrid.innerHTML = jobs.map(job => `
        <div class="job-card" data-id="${job.id}">
            <div class="job-card-header">
                <div>
                    <div class="job-card-title">${job.logo || '💼'} ${job.title}</div>
                    <div class="job-card-company">${job.company} <span>• ${job.location}</span></div>
                </div>
                <span class="job-card-tag">${job.category}</span>
            </div>
            <div class="job-card-details">
                <span>📅 ${formatDate(job.posted)}</span>
                <span>📍 ${job.location}</span>
            </div>
            <div class="job-card-desc">${job.description}</div>
            <div class="job-card-footer">
                <span class="job-card-salary">${job.salary} <small>/bulan</small></span>
                <button class="job-card-btn" onclick="applyJob(${job.id})">Lamar Sekarang</button>
            </div>
        </div>
    `).join('');
}

// Filter dan sort jobs
function filterAndSortJobs() {
    const keyword = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const sort = sortFilter.value;

    let result = [...jobsData];

    // Filter keyword
    if (keyword) {
        result = result.filter(job =>
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.location.toLowerCase().includes(keyword) ||
            job.category.toLowerCase().includes(keyword)
        );
    }

    // Filter kategori
    if (category !== 'all') {
        result = result.filter(job => job.category === category);
    }

    // Sorting
    switch (sort) {
        case 'terbaru':
            result.sort((a, b) => new Date(b.posted) - new Date(a.posted));
            break;
        case 'terlama':
            result.sort((a, b) => new Date(a.posted) - new Date(b.posted));
            break;
        case 'gaji-tertinggi':
            result.sort((a, b) => {
                const salaryA = parseInt(a.salary.replace(/[^0-9]/g, ''));
                const salaryB = parseInt(b.salary.replace(/[^0-9]/g, ''));
                return salaryB - salaryA;
            });
            break;
        case 'gaji-terendah':
            result.sort((a, b) => {
                const salaryA = parseInt(a.salary.replace(/[^0-9]/g, ''));
                const salaryB = parseInt(b.salary.replace(/[^0-9]/g, ''));
                return salaryA - salaryB;
            });
            break;
        default:
            break;
    }

    filteredJobs = result;
    renderJobs(result);
}

// Apply job (simulasi)
function applyJob(id) {
    const job = jobsData.find(j => j.id === id);
    if (job) {
        alert(`✅ Anda telah melamar posisi "${job.title}" di ${job.company}.\n\nTim rekrutmen akan menghubungi Anda segera.`);
    }
}
window.applyJob = applyJob;

// ===== ANIMASI STATS =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(el => {
        const target = parseInt(el.dataset.count);
        let current = 0;
        const increment = Math.ceil(target / 40);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current.toLocaleString();
        }, 30);
    });
}

// ===== LOAD DATA =====
function loadJobs() {
    loadingIndicator.classList.add('active');
    jobsGrid.innerHTML = '';

    // Data langsung dari defaultJobs (tanpa fetch)
    jobsData = defaultJobs;

    loadingIndicator.classList.remove('active');
    filterAndSortJobs();
    animateStats();
}

// ===== EVENT LISTENERS =====
searchBtn.addEventListener('click', filterAndSortJobs);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') filterAndSortJobs();
});
categoryFilter.addEventListener('change', filterAndSortJobs);
sortFilter.addEventListener('change', filterAndSortJobs);

// Hamburger menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

// Inbox
navInbox.addEventListener('click', function(e) {
    e.preventDefault();
    inboxPopup.classList.toggle('show');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
});
closeInbox.addEventListener('click', function() {
    inboxPopup.classList.remove('show');
});

// Explore
navExplore.addEventListener('click', function(e) {
    e.preventDefault();
    exploreModal.classList.add('show');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
});
closeExplore.addEventListener('click', function() {
    exploreModal.classList.remove('show');
});
exploreModal.addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('show');
});

// Copilot
navCopilot.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    alert('🤖 Copilot: Siap membantu Anda menemukan lowongan terbaik di Kendari! Silakan tanyakan apa saja.');
});

// Home active state
document.querySelector('.nav-link[href="#home"]').addEventListener('click', function() {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', loadJobs);