export function initExplore() {
    const exploreModal = document.getElementById('exploreModal');
    const closeExplore = document.getElementById('closeExplore');
    const navExplore = document.getElementById('navExplore');

    if (!exploreModal || !closeExplore || !navExplore) return;

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
}