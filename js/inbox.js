export function initInbox() {
    const inboxPopup = document.getElementById('inboxPopup');
    const closeInbox = document.getElementById('closeInbox');
    const navInbox = document.getElementById('navInbox');

    if (!inboxPopup || !closeInbox || !navInbox) return;

    navInbox.addEventListener('click', function(e) {
        e.preventDefault();
        inboxPopup.classList.toggle('show');
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });

    closeInbox.addEventListener('click', function() {
        inboxPopup.classList.remove('show');
    });
}