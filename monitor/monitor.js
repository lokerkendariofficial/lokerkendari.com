// ============================================================
// MONITOR.JS - Dashboard Monitoring (Standalone)
// ============================================================

// ===== KONFIGURASI =====
const JS_FILES = [
    'js/data.js',
    'js/main.js',
    'js/inbox.js',
    'js/explore.js',
    'js/error/global-error.js',
    'js/error/console-override.js',
    'js/error/notification.js',
    'js/error/file-checker.js',
    'js/error/system-info.js'
];

// ===== DATA DUMMY =====
const DUMMY_DATA = {
    online: 7,
    offline: 2,
    total: 9,
    files: [
        { name: 'data.js', status: 'online' },
        { name: 'main.js', status: 'online' },
        { name: 'inbox.js', status: 'online' },
        { name: 'explore.js', status: 'online' },
        { name: 'global-error.js', status: 'online' },
        { name: 'console-override.js', status: 'offline' },
        { name: 'notification.js', status: 'online' },
        { name: 'file-checker.js', status: 'online' },
        { name: 'system-info.js', status: 'offline' }
    ]
};

// ===== STATE =====
let fileStatus = [];
let logEntries = [];
let healthResults = [];
let isDebugMode = false;
let sidebarCollapsed = false;

// ===== DOM REFS =====
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleSidebar');
const totalFilesEl = document.getElementById('totalFiles');
const onlineFilesEl = document.getElementById('onlineFiles');
const offlineFilesEl = document.getElementById('offlineFiles');
const fileChart = document.getElementById('fileChart');
const logContainer = document.getElementById('logContainer');
const healthStatus = document.getElementById('healthStatus');
const loadTimeEl = document.getElementById('loadTime');
const renderTimeEl = document.getElementById('renderTime');
const memoryUsageEl = document.getElementById('memoryUsage');
const fileCheckStatusEl = document.getElementById('fileCheckStatus');
const progressFill = document.getElementById('progressFill');
const healthPercent = document.getElementById('healthPercent');
const connectionText = document.getElementById('connectionText');
const connectionStatus = document.getElementById('connectionStatus');
const headerTime = document.getElementById('headerTime');
const footerTime = document.getElementById('footerTime');

// ============================================================
// SIDEBAR TOGGLE
// ============================================================
function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;

    if (window.innerWidth <= 992) {
        // Mode mobile: toggle class mobile-open
        sidebar.classList.toggle('mobile-open');
        addLog('info', sidebar.classList.contains('mobile-open') ? '📂 Sidebar dibuka' : '📂 Sidebar ditutup');
    } else {
        // Mode desktop: toggle collapsed
        sidebar.classList.toggle('collapsed');
        addLog('info', sidebar.classList.contains('collapsed') ? '📂 Sidebar collapsed' : '📂 Sidebar expanded');
    }
}

// Event listener untuk tombol toggle
toggleBtn.addEventListener('click', toggleSidebar);

// Tutup sidebar mobile saat klik di luar
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 992) {
        const isClickInside = sidebar.contains(e.target) || toggleBtn.contains(e.target);
        if (!isClickInside && sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
            addLog('info', '📂 Sidebar ditutup (klik di luar)');
        }
    }
});

// Resize handler - reset state saat resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        sidebar.classList.remove('mobile-open');
    }
});

// ============================================================
// UTILITY
// ============================================================
function formatTime() {
    return new Date().toLocaleTimeString('id-ID', { hour12: false });
}

function formatDate() {
    return new Date().toLocaleString('id-ID');
}

// ============================================================
// CLOCK
// ============================================================
function updateClock() {
    headerTime.textContent = formatTime();
    footerTime.textContent = formatDate();
}
setInterval(updateClock, 1000);
updateClock();

// ============================================================
// CONNECTION STATUS
// ============================================================
function updateConnectionStatus() {
    const isOnline = navigator.onLine;
    connectionText.textContent = isOnline ? 'Online' : 'Offline';
    connectionStatus.className = 'header-status ' + (isOnline ? 'online' : 'offline');
}
updateConnectionStatus();
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

// ============================================================
// FILE CHECKER
// ============================================================
async function checkFileStatus() {
    let online = 0;
    let offline = 0;
    let results = [];

    for (const file of JS_FILES) {
        try {
            const res = await fetch(file, { method: 'HEAD', cache: 'no-cache' });
            const status = res.ok ? 'online' : 'offline';
            if (status === 'online') online++;
            else offline++;
            results.push({ name: file, status });
        } catch {
            offline++;
            results.push({ name: file, status: 'offline' });
        }
    }

    if (results.length === 0 || (online === 0 && offline === 0)) {
        results = DUMMY_DATA.files;
        online = DUMMY_DATA.online;
        offline = DUMMY_DATA.offline;
    }

    fileStatus = results;
    totalFilesEl.textContent = JS_FILES.length;
    onlineFilesEl.textContent = online;
    offlineFilesEl.textContent = offline;

    renderFileChart(results);
    updatePerformance();
    return results;
}

function renderFileChart(files) {
    if (!files || files.length === 0) {
        fileChart.innerHTML = '<div class="chart-placeholder">Tidak ada data</div>';
        return;
    }

    const topFiles = files.slice(0, 10);
    const maxHeight = 70;

    fileChart.innerHTML = topFiles.map(f => {
        const height = f.status === 'online' ? maxHeight : maxHeight * 0.4;
        const statusClass = f.status === 'online' ? 'online' : 'offline';
        const shortName = f.name.replace('js/', '').replace('.js', '').replace('error/', '');
        return `
            <div class="chart-bar-wrapper">
                <div class="chart-bar ${statusClass}" style="height:${height}px;" title="${f.name}"></div>
                <span class="chart-bar-label">${shortName}</span>
            </div>
        `;
    }).join('');
}

// ============================================================
// LOG SYSTEM
// ============================================================
function addLog(type, message) {
    const entry = {
        time: formatTime(),
        type: type,
        message: message
    };
    logEntries.unshift(entry);
    if (logEntries.length > 100) logEntries.pop();
    renderLogs();
}

function renderLogs() {
    if (logEntries.length === 0) {
        logContainer.innerHTML = '<div class="empty-log">Belum ada aktivitas</div>';
        return;
    }

    logContainer.innerHTML = logEntries.slice(0, 30).map(log => `
        <div class="log-entry">
            <span class="log-time">${log.time}</span>
            <span class="log-type ${log.type}">[${log.type}]</span>
            <span class="log-msg">${log.message}</span>
        </div>
    `).join('');
}

function clearLogs() {
    logEntries = [];
    renderLogs();
    addLog('info', '🗑️ Log dibersihkan');
}

// ============================================================
// HEALTH CHECK
// ============================================================
async function runHealthCheck() {
    healthStatus.innerHTML = '<div class="health-loading"><i class="fas fa-spinner fa-spin"></i> Memeriksa...</div>';

    const checks = [];

    const isOnline = navigator.onLine;
    checks.push({
        label: 'Koneksi Internet',
        status: isOnline ? 'pass' : 'fail',
        detail: isOnline ? 'Online' : 'Offline'
    });

    const criticalFiles = ['style.css', 'script.js', 'loader.js'];
    for (const file of criticalFiles) {
        try {
            const res = await fetch(file, { method: 'HEAD', cache: 'no-cache' });
            checks.push({
                label: `File ${file}`,
                status: res.ok ? 'pass' : 'fail',
                detail: res.ok ? 'Ditemukan' : `HTTP ${res.status}`
            });
        } catch {
            checks.push({ label: `File ${file}`, status: 'fail', detail: 'Gagal diakses' });
        }
    }

    if (performance.memory) {
        const used = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
        const total = (performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
        checks.push({
            label: 'Memory Usage',
            status: 'pass',
            detail: `${used} MB / ${total} MB`
        });
    } else {
        checks.push({
            label: 'Memory Usage',
            status: 'pass',
            detail: 'Tidak tersedia'
        });
    }

    healthResults = checks;
    renderHealth(checks);
}

function renderHealth(checks) {
    const pass = checks.filter(c => c.status === 'pass').length;
    const fail = checks.filter(c => c.status === 'fail').length;
    const total = checks.length;
    const percent = total > 0 ? Math.round((pass / total) * 100) : 0;

    progressFill.style.width = percent + '%';
    healthPercent.textContent = percent + '%';

    healthStatus.innerHTML = `
        <div style="margin-bottom:12px; font-weight:600; font-size:0.85rem; display:flex; gap:16px; flex-wrap:wrap;">
            <span style="color:var(--success);">${pass} ✅ Lolos</span>
            <span style="color:var(--danger);">${fail} ❌ Gagal</span>
            <span style="color:var(--text-muted);">Total ${total}</span>
        </div>
        ${checks.map(c => `
            <div class="health-item">
                <span class="health-label">${c.label}</span>
                <span class="health-status ${c.status}">${c.status === 'pass' ? '✅ ' : '❌ '} ${c.detail}</span>
            </div>
        `).join('')}
    `;
}

// ============================================================
// PERFORMANCE
// ============================================================
function updatePerformance() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    loadTimeEl.textContent = loadTime > 0 && loadTime < 30000 ? `${loadTime}ms` : 'N/A';

    if (window.renderEndTime && window.renderStartTime) {
        const renderTime = window.renderEndTime - window.renderStartTime;
        renderTimeEl.textContent = renderTime > 0 ? `${renderTime.toFixed(2)}ms` : 'N/A';
    } else {
        renderTimeEl.textContent = 'N/A';
    }

    if (performance.memory) {
        const used = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
        memoryUsageEl.textContent = `${used} MB`;
    } else {
        memoryUsageEl.textContent = 'N/A';
    }

    const online = fileStatus.filter(f => f.status === 'online').length;
    fileCheckStatusEl.textContent = `${online}/${JS_FILES.length} online`;
}

// ============================================================
// CONSOLE SHORTCUTS
// ============================================================
window.report = function() {
    console.log('📊 ===== LAPORAN MONITORING =====');
    console.log(`📁 Total File JS: ${JS_FILES.length}`);
    const online = fileStatus.filter(f => f.status === 'online').length;
    console.log(`✅ Online: ${online}`);
    console.log(`❌ Offline: ${JS_FILES.length - online}`);
    console.log(`📝 Total Log: ${logEntries.length}`);
    console.log(`🐛 Error: ${logEntries.filter(l => l.type === 'error').length}`);
    console.log('📊 ================================');
};

window.getLogs = function() {
    console.table(logEntries);
    return logEntries;
};

window.clearLogs = function() {
    clearLogs();
};

window.debugOn = function() {
    isDebugMode = true;
    console.log('🔍 Debug mode AKTIF');
    document.body.style.outline = '2px solid #22c55e';
    document.body.style.outlineOffset = '-2px';
    addLog('info', '🔍 Debug mode aktif');
};

window.debugOff = function() {
    isDebugMode = false;
    console.log('🔍 Debug mode NONAKTIF');
    document.body.style.outline = 'none';
    addLog('info', '🔍 Debug mode nonaktif');
};

// ============================================================
// NAVIGASI SIDEBAR
// ============================================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        addLog('info', `📂 Navigasi ke ${this.textContent.trim()}`);

        // Tutup sidebar di mobile setelah klik
        if (window.innerWidth <= 992) {
            sidebar.classList.remove('mobile-open');
        }
    });
});

// ============================================================
// BUTTON EVENTS
// ============================================================
document.getElementById('refreshAll').addEventListener('click', async () => {
    addLog('info', '🔄 Refresh semua data...');
    await checkFileStatus();
    await runHealthCheck();
    updatePerformance();
    addLog('success', '✅ Refresh selesai');
});

document.getElementById('refreshFiles').addEventListener('click', async () => {
    addLog('info', '🔄 Refresh file status...');
    await checkFileStatus();
    updatePerformance();
    addLog('success', '✅ File status diperbarui');
});

document.getElementById('runHealthCheck').addEventListener('click', async () => {
    addLog('info', '🏥 Menjalankan health check...');
    await runHealthCheck();
    addLog('success', '✅ Health check selesai');
});

document.getElementById('clearLogs').addEventListener('click', () => {
    clearLogs();
});

// ============================================================
// ERROR HANDLER
// ============================================================
window.onerror = function(message, source, lineno, colno, error) {
    addLog('error', `${message} (${source}:${lineno})`);
    return true;
};

window.addEventListener('unhandledrejection', function(event) {
    addLog('error', `Promise rejected: ${event.reason}`);
});

// ============================================================
// INIT
// ============================================================
async function initMonitor() {
    addLog('info', '🚀 Monitor Loker Kendari dimulai');
    addLog('info', '📌 Klik ikon ☰ di kiri atas untuk toggle sidebar');
    await checkFileStatus();
    await runHealthCheck();
    updatePerformance();
    addLog('success', '✅ Monitor siap!');

    console.log('💡 Dashboard Monitor siap!');
    console.log('📌 Gunakan: report(), getLogs(), clearLogs(), debugOn(), debugOff()');
    console.log('📌 Klik ikon ☰ di kiri atas untuk toggle sidebar');
}

initMonitor();

// ============================================================
// AUTO REFRESH
// ============================================================
setInterval(async () => {
    await checkFileStatus();
    updatePerformance();
}, 30000);

setInterval(async () => {
    await runHealthCheck();
}, 60000);