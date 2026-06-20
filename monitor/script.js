// ===== MONITOR.JS =====
// Dashboard monitoring - semua fungsi dalam satu file

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

// ===== STATE =====
let fileStatus = {};
let logEntries = [];
let healthResults = {};
let isDebugMode = false;

// ===== DOM REFS =====
const fileListEl = document.getElementById('fileList');
const logContainer = document.getElementById('logContainer');
const healthStatus = document.getElementById('healthStatus');
const updateTime = document.getElementById('updateTime');
const liveTime = document.getElementById('liveTime');
const connectionText = document.getElementById('connectionText');
const connectionStatus = document.getElementById('connectionStatus');

// Stats
const totalFilesEl = document.getElementById('totalFiles');
const onlineFilesEl = document.getElementById('onlineFiles');
const offlineFilesEl = document.getElementById('offlineFiles');
const errorCountEl = document.getElementById('errorCount');
const activityCountEl = document.getElementById('activityCount');

// Performance
const loadTimeEl = document.getElementById('loadTime');
const renderTimeEl = document.getElementById('renderTime');
const memoryUsageEl = document.getElementById('memoryUsage');
const fileCheckStatusEl = document.getElementById('fileCheckStatus');

// ===== UTILITY =====
function formatTime() {
    return new Date().toLocaleTimeString('id-ID', { hour12: false });
}

function formatDate() {
    return new Date().toLocaleString('id-ID');
}

// ===== CLOCK =====
function updateClock() {
    liveTime.textContent = formatDate();
    updateTime.textContent = formatTime();
}
setInterval(updateClock, 1000);
updateClock();

// ===== CONNECTION STATUS =====
function updateConnectionStatus() {
    const isOnline = navigator.onLine;
    connectionText.textContent = isOnline ? 'Online' : 'Offline';
    connectionStatus.className = 'status-badge ' + (isOnline ? 'online' : 'offline');
}
updateConnectionStatus();
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

// ===== FILE CHECKER =====
async function checkFileStatus() {
    let online = 0;
    let offline = 0;
    let results = [];

    for (const file of JS_FILES) {
        try {
            const res = await fetch(file, { method: 'HEAD' });
            const status = res.ok ? 'online' : 'offline';
            if (status === 'online') online++;
            else offline++;
            results.push({ name: file, status });
        } catch {
            offline++;
            results.push({ name: file, status: 'offline' });
        }
    }

    fileStatus = results;
    totalFilesEl.textContent = JS_FILES.length;
    onlineFilesEl.textContent = online;
    offlineFilesEl.textContent = offline;

    renderFileList(results);
}

function renderFileList(files) {
    fileListEl.innerHTML = files.map(f => `
        <div class="file-item">
            <span class="file-name">
                <i class="fas fa-${f.status === 'online' ? 'check-circle' : 'times-circle'}" 
                   style="color: ${f.status === 'online' ? 'var(--success)' : 'var(--danger)'}"></i>
                ${f.name}
            </span>
            <span class="file-status ${f.status}">${f.status === 'online' ? '✅ Online' : '❌ Offline'}</span>
        </div>
    `).join('');
}

// ===== LOG SYSTEM =====
function addLog(type, message) {
    const entry = {
        time: formatTime(),
        type: type,
        message: message
    };
    logEntries.unshift(entry);
    if (logEntries.length > 100) logEntries.pop();
    renderLogs();
    updateStats();
}

function renderLogs() {
    if (logEntries.length === 0) {
        logContainer.innerHTML = '<div class="empty-log">Belum ada aktivitas</div>';
        return;
    }

    logContainer.innerHTML = logEntries.map(log => `
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
    updateStats();
    addLog('info', '🗑️ Log dibersihkan');
}

// ===== HEALTH CHECK =====
async function runHealthCheck() {
    healthStatus.innerHTML = '<div class="loading-text"><i class="fas fa-spinner fa-spin"></i> Memeriksa...</div>';

    const checks = [];

    // 1. Koneksi internet
    const isOnline = navigator.onLine;
    checks.push({ 
        label: 'Koneksi Internet', 
        status: isOnline ? 'pass' : 'fail', 
        detail: isOnline ? 'Online' : 'Offline' 
    });

    // 2. Cek file penting
    const criticalFiles = ['style.css', 'script.js', 'loader.js'];
    for (const file of criticalFiles) {
        try {
            const res = await fetch(file, { method: 'HEAD' });
            checks.push({ 
                label: `File ${file}`, 
                status: res.ok ? 'pass' : 'fail',
                detail: res.ok ? 'Ditemukan' : `HTTP ${res.status}`
            });
        } catch {
            checks.push({ label: `File ${file}`, status: 'fail', detail: 'Gagal diakses' });
        }
    }

    // 3. Memory (jika tersedia)
    if (performance.memory) {
        const used = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
        const total = (performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
        checks.push({ 
            label: 'Memory Usage', 
            status: 'pass',
            detail: `${used} MB / ${total} MB`
        });
    }

    healthResults = checks;
    renderHealth(checks);
}

function renderHealth(checks) {
    const pass = checks.filter(c => c.status === 'pass').length;
    const fail = checks.filter(c => c.status === 'fail').length;

    healthStatus.innerHTML = `
        <div style="margin-bottom:12px; font-weight:600; font-size:0.9rem;">
            ${pass} ✅ Lolos &bull; ${fail} ❌ Gagal
        </div>
        ${checks.map(c => `
            <div class="health-item">
                <span class="health-label">${c.label}</span>
                <span class="health-status ${c.status}">${c.status === 'pass' ? '✅ ' : '❌ '} ${c.detail}</span>
            </div>
        `).join('')}
    `;
}

// ===== PERFORMANCE =====
function updatePerformance() {
    // Load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    loadTimeEl.textContent = loadTime > 0 ? `${loadTime}ms` : '-';

    // Render time (dari main.js jika tersedia)
    if (window.renderEndTime && window.renderStartTime) {
        const renderTime = window.renderEndTime - window.renderStartTime;
        renderTimeEl.textContent = renderTime > 0 ? `${renderTime.toFixed(2)}ms` : '-';
    }

    // Memory
    if (performance.memory) {
        const used = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
        memoryUsageEl.textContent = `${used} MB`;
    }

    // File check status
    const online = Object.values(fileStatus).filter(f => f.status === 'online').length;
    fileCheckStatusEl.textContent = `${online}/${JS_FILES.length} online`;
}

// ===== UPDATE STATS =====
function updateStats() {
    const errorCount = logEntries.filter(l => l.type === 'error').length;
    errorCountEl.textContent = errorCount;
    activityCountEl.textContent = logEntries.length;
}

// ===== CONSOLE SHORTCUTS =====
window.report = function() {
    console.log('📊 ===== LAPORAN MONITORING =====');
    console.log(`📁 Total File JS: ${JS_FILES.length}`);
    const online = Object.values(fileStatus).filter(f => f.status === 'online').length;
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

// ===== EVENT LISTENERS =====
document.getElementById('refreshFiles').addEventListener('click', async () => {
    addLog('info', '🔄 Refresh file status...');
    await checkFileStatus();
    updatePerformance();
    addLog('success', '✅ File status diperbarui');
});

document.getElementById('clearLogs').addEventListener('click', () => {
    clearLogs();
});

document.getElementById('runHealthCheck').addEventListener('click', async () => {
    addLog('info', '🏥 Menjalankan health check...');
    await runHealthCheck();
    addLog('success', '✅ Health check selesai');
});

// ===== HAMBURGER / MOBILE =====
// (tidak diperlukan karena monitor adalah halaman terpisah)

// ===== ERROR HANDLER GLOBAL =====
window.onerror = function(message, source, lineno, colno, error) {
    addLog('error', `${message} (${source}:${lineno})`);
    return true;
};

window.addEventListener('unhandledrejection', function(event) {
    addLog('error', `Promise rejected: ${event.reason}`);
});

// ===== INIT =====
async function initMonitor() {
    addLog('info', '🚀 Monitor Loker Kendari dimulai');
    await checkFileStatus();
    await runHealthCheck();
    updatePerformance();
    addLog('success', '✅ Monitor siap!');
    
    console.log('💡 Dashboard Monitor siap!');
    console.log('📌 Gunakan: report(), getLogs(), clearLogs(), debugOn(), debugOff()');
}

// Jalankan
initMonitor();

// Auto refresh setiap 30 detik
setInterval(async () => {
    await checkFileStatus();
    updatePerformance();
}, 30000);

// Auto health check setiap 60 detik
setInterval(async () => {
    await runHealthCheck();
}, 60000);

// Auto update stats setiap 5 detik
setInterval(() => {
    updateStats();
}, 5000);