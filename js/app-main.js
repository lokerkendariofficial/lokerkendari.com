// ============================================================
// APP-MAIN.JS - Logika Utama + Perakit Komponen
// ============================================================

// ===== IMPOR SEMUA KOMPONEN DARI components/ =====
import { navbar } from '../components/menu/navbar.js';   // ← PATH DIUBAH
import { hero } from '../components/hero.js';
import { stats } from '../components/stats.js';
import { filter } from '../components/filter.js';
import { jobs } from '../components/jobs.js';
import { about } from '../components/about.js';
import { inbox } from '../components/inbox.js';
import { explore } from '../components/explore.js';
import { footer } from '../components/footer.js';

// ===== IMPOR DATA & FUNGSI =====
import { defaultJobs } from './app-data.js';

// ===== DOM REFS =====
const app = document.getElementById('app');
const jobsGrid = document.getElementById('jobsGrid');
const loadingIndicator = document.getElementById('loadingIndicator');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');

// ===== STATE =====
let jobsData = [];

// ===== RAKIT SEMUA KOMPONEN KE #app =====
export function renderComponents() {
    if (!app) {
        console.error('❌ Elemen #app tidak ditemukan!');
        return;
    }

    const allComponents = navbar + hero + stats + filter + jobs + about + inbox + explore + footer;
    app.innerHTML = allComponents;

    console.log('✅ Semua komponen berhasil dirakit!');
}

// ===== FORMAT TANGGAL =====
export function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// ===== RENDER JOBS =====
export function renderJobs(jobs) {
    if (!jobs || jobs.length === 0) {
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
                <button class="job-card-btn" onclick="window.applyJob(${job.id})">Lamar Sekarang</button>
            </div>
        </div>
    `).join('');
}

// ===== FILTER & SORT =====
export function filterAndSortJobs() {
    const keyword = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const sort = sortFilter.value;

    let result = [...jobsData];

    if (keyword) {
        result = result.filter(job =>
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.location.toLowerCase().includes(keyword) ||
            job.category.toLowerCase().includes(keyword)
        );
    }

    if (category !== 'all') {
        result = result.filter(job => job.category === category);
    }

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

    renderJobs(result);
}

// ===== APPLY JOB =====
export function applyJob(id) {
    const job = jobsData.find(j => j.id === id);
    if (job) {
        alert(`✅ Anda telah melamar posisi "${job.title}" di ${job.company}.\n\nTim rekrutmen akan menghubungi Anda segera.`);
    }
}
window.applyJob = applyJob;

// ===== ANIMASI STATS =====
export function animateStats() {
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
export function loadJobs() {
    if (loadingIndicator) loadingIndicator.classList.add('active');
    if (jobsGrid) jobsGrid.innerHTML = '';

    jobsData = defaultJobs;

    if (loadingIndicator) loadingIndicator.classList.remove('active');
    filterAndSortJobs();
    animateStats();
}

// ===== EVENT LISTENERS =====
export function initMainEvents() {
    if (searchBtn) searchBtn.addEventListener('click', filterAndSortJobs);
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') filterAndSortJobs();
        });
    }
    if (categoryFilter) categoryFilter.addEventListener('change', filterAndSortJobs);
    if (sortFilter) sortFilter.addEventListener('change', filterAndSortJobs);
}

// ===== INISIALISASI AWAL =====
export function initAppMain() {
    renderComponents();
    loadJobs();
    initMainEvents();
    console.log('✅ AppMain siap!');
}