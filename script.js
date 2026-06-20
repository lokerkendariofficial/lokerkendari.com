(function() {
    const jobsData = [
        { id:1, title:'Frontend Developer', company:'PT Teknologi Kendari', category:'Teknologi & IT', location:'Kendari', type:'Full-time', salary:'Rp 6.000.000 - 9.000.000', desc:'Membangun antarmuka web modern.', date:'2026-06-18' },
        { id:2, title:'Digital Marketing', company:'Agen Kreasi', category:'Marketing & Sales', location:'Kendari', type:'Full-time', salary:'Rp 4.500.000 - 7.000.000', desc:'Kelola kampanye digital.', date:'2026-06-20' },
        { id:3, title:'Analis Keuangan', company:'Bank Sultra', category:'Keuangan & Perbankan', location:'Kendari', type:'Kontrak', salary:'Rp 7.000.000 - 10.000.000', desc:'Analisis laporan keuangan.', date:'2026-06-15' },
        { id:4, title:'Guru Matematika', company:'SMA Negeri 1', category:'Pendidikan', location:'Kendari', type:'PNS', salary:'Rp 3.500.000 - 5.000.000', desc:'Mengajar matematika.', date:'2026-06-19' },
        { id:5, title:'Perawat', company:'RS Bahtera', category:'Kesehatan', location:'Kendari', type:'Full-time', salary:'Rp 4.000.000 - 6.000.000', desc:'Perawat klinik.', date:'2026-06-17' }
    ];

    const grid = document.getElementById('jobsGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const searchBtn = document.getElementById('searchBtn');
    const emptyState = document.getElementById('emptyState');

    // Inbox
    const inboxPopup = document.getElementById('inboxPopup');
    const closeInbox = document.getElementById('closeInbox');
    document.getElementById('navInbox').addEventListener('click', function(e) {
        e.preventDefault();
        inboxPopup.classList.toggle('show');
    });
    closeInbox.addEventListener('click', function() { inboxPopup.classList.remove('show'); });

    // Explore
    const exploreModal = document.getElementById('exploreModal');
    document.getElementById('navExplore').addEventListener('click', function(e) {
        e.preventDefault();
        exploreModal.classList.add('show');
    });
    document.getElementById('closeExplore').addEventListener('click', function() {
        exploreModal.classList.remove('show');
    });
    exploreModal.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('show'); });

    // Copilot
    document.getElementById('navCopilot').addEventListener('click', function(e) {
        e.preventDefault();
        alert('🤖 Copilot: Siap membantu Anda menemukan lowongan terbaik di Kendari!');
    });

    // Modal Lamar
    const applyModal = document.getElementById('applyModal');
    const modalPosition = document.getElementById('modalPosition');
    const modalCompany = document.getElementById('modalCompany');
    const modalConfirm = document.getElementById('modalConfirm');
    const modalCancel = document.getElementById('modalCancel');
    const modalClose = document.getElementById('modalClose');
    let selectedJobId = null;

    function closeApply() { applyModal.classList.remove('show'); selectedJobId = null; }
    modalClose.addEventListener('click', closeApply);
    modalCancel.addEventListener('click', closeApply);
    applyModal.addEventListener('click', function(e) { if (e.target === this) closeApply(); });
    modalConfirm.addEventListener('click', function() {
        if (selectedJobId) {
            const job = jobsData.find(j => j.id === selectedJobId);
            alert(`✅ Lamaran untuk "${job.title}" di ${job.company} telah dikirim!`);
            closeApply();
        }
    });

    function renderJobs(jobs) {
        if (!jobs.length) { grid.innerHTML = ''; emptyState.style.display = 'block'; return; }
        emptyState.style.display = 'none';
        grid.innerHTML = jobs.map(job => `
            <div class="job-card">
                <div class="job-card-title">${job.title}</div>
                <div class="job-card-company"><i class="fas fa-building"></i> ${job.company}</div>
                <div class="job-card-details">
                    <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                    <span><i class="fas fa-clock"></i> ${job.type}</span>
                    <span><i class="fas fa-tag"></i> ${job.category}</span>
                </div>
                <div class="job-card-desc">${job.desc}</div>
                <div class="job-card-footer">
                    <span class="job-card-salary">${job.salary}</span>
                    <button class="job-card-btn" data-id="${job.id}">Lamar</button>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.job-card-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const job = jobsData.find(j => j.id === id);
                if (job) {
                    selectedJobId = id;
                    modalPosition.textContent = job.title;
                    modalCompany.textContent = job.company;
                    applyModal.classList.add('show');
                }
            });
        });
    }

    function filterAndSort() {
        const keyword = searchInput.value.trim().toLowerCase();
        const category = categoryFilter.value;
        const sort = sortFilter.value;

        let filtered = jobsData.filter(job => {
            const match = job.title.toLowerCase().includes(keyword) || job.company.toLowerCase().includes(keyword) || job.location.toLowerCase().includes(keyword);
            return match && (category === 'all' || job.category === category);
        });

        if (sort === 'gaji-tertinggi') filtered.sort((a,b) => parseInt(b.salary.replace(/\D/g,'')) - parseInt(a.salary.replace(/\D/g,'')));
        else if (sort === 'gaji-terendah') filtered.sort((a,b) => parseInt(a.salary.replace(/\D/g,'')) - parseInt(b.salary.replace(/\D/g,'')));
        else filtered.sort((a,b) => new Date(b.date) - new Date(a.date));

        renderJobs(filtered);
    }

    searchBtn.addEventListener('click', filterAndSort);
    searchInput.addEventListener('keyup', e => e.key === 'Enter' && filterAndSort());
    categoryFilter.addEventListener('change', filterAndSort);
    sortFilter.addEventListener('change', filterAndSort);

    // Hamburger
    document.getElementById('hamburger').addEventListener('click', function() {
        document.getElementById('navMenu').classList.toggle('open');
    });

    // Animasi stats
    function animateStats() {
        document.querySelectorAll('.stat-number').forEach(el => {
            const target = parseInt(el.dataset.count);
            let current = 0;
            const step = Math.ceil(target / 30);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) { el.textContent = target; clearInterval(timer); }
                else el.textContent = current;
            }, 30);
        });
    }

    renderJobs(jobsData);
    setTimeout(animateStats, 300);
})();