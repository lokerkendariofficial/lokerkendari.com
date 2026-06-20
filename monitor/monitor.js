// ============================================================
// MONITOR.JS - Enterprise Dashboard
// Sistem monitoring kompleks dengan visualisasi data
// ============================================================

// ===== KONFIGURASI =====
const CONFIG = {
    autoRefreshInterval: 30000,
    healthCheckInterval: 60000,
    maxLogs: 100,
    maxChartItems: 10
};

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
let state = {
    fileStatus: [],
    logEntries: [],
    healthResults: [],
    isDebugMode: false,
    sidebarCollapsed: false,
    isMobile: window.innerWidth <= 992,
    uptimeSeconds: 0,
    startTime: Date.now()
};

// ===== DOM REFS =====
const DOM = {
    sidebar: document.getElementById('sidebar'),
    overlay: document.getElementById('sidebarOverlay'),
    toggleBtn: document.getElementById('toggleSidebar'),
    connectionText: document.getElementById('connectionText'),
    connectionStatus: document.getElementById('connectionStatus'),
    uptimeText: document.getElementById('uptimeText'),
    headerTime: document.getElementById('headerTime'),
    footerTime: document.getElementById('footerTime'),

    // Stats
    totalFiles: document.getElementById('totalFiles'),
    onlineFiles: document.getElementById('onlineFiles'),
    offlineFiles: document.getElementById('offlineFiles'),
    errorCount: document.getElementById('errorCount'),
    activityCount: document.getElementById('activityCount'),
    totalFiles2: document.getElementById('totalFiles2'),
    onlineFiles2: document.getElementById('onlineFiles2'),
    offlineFiles2: document.getElementById('offlineFiles2'),
    uptimePercent: document.getElementById('uptimePercent'),

    // Charts
    fileChart: document.getElementById('fileChart'),

    // Logs
    logContainer: document.getElementById('logContainer'),
    logCount: document.getElementById('logCount'),

    // Health
    healthStatus: document.getElementById('healthStatus'),
    healthRing: document.getElementById('healthRing'),
    healthPercent: document.getElementById('healthPercent'),
    serviceCount: document.getElementById('serviceCount'),
    systemUptime: document.getElementById('systemUptime'),
    responseTime: document.getElementById('responseTime'),

    // Performance
    loadTime: document.getElementById('loadTime'),
    renderTime: document.getElementById('renderTime'),
    memoryUsage: document.getElementById('memoryUsage'),
    fileCheckStatus: document.getElementById('fileCheckStatus'),
    jsHeap: document.getElementById('jsHeap'),
    domNodes: document.getElementById('domNodes'),
    cpuProgress: document.getElementById('cpuProgress'),
    cpuValue: document.getElementById('cpuValue'),
    memoryProgress: document.getElementById('memoryProgress'),
    memoryValue: document.getElementById('memoryValue'),
    healthProgress: document.getElementById('healthProgress'),
    healthValue: document.getElementById('healthValue'),

    // System Info
    browserInfo: document.getElementById('browserInfo'),
    osInfo: document.getElementById('osInfo'),
    screenInfo: document.getElementById('screenInfo'),
    langInfo: document.getElementById('langInfo'),
    tzInfo: document.getElementById('tzInfo'),
    connInfo: document.getElementById('connInfo')
};

// ============================================================
// UTILITY
// ============================================================
function formatTime() {
    return new Date().toLocaleTimeString('id-ID', { hour12: false });
}
function formatDate() {
    return new Date().toLocaleString('id-ID');
}
function formatUptime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============================================================
// CLOCK & UPTIME
// ============================================================
function updateClock() {
    DOM.headerTime.textContent = formatTime();
    DOM.footerTime.textContent = formatDate();
    state.uptimeSeconds = (Date.now() - state.startTime) / 1000;
    DOM.uptimeText.textContent = formatUptime(state.uptimeSeconds);
}
setInterval(updateClock, 1000);
updateClock();

// ============================================================
// CONNECTION STATUS
// ============================================================
function updateConnectionStatus() {
    const isOnline = navigator.onLine;
    DOM.connectionText.textContent = isOnline ? 'Online' : 'Offline';
    DOM.connectionStatus.className = 'header-status ' + (isOnline ? 'online' : 'offline');
}
updateConnectionStatus();
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

// ============================================================
// SIDEBAR TOGGLE
// ============================================================
function toggleSidebar() {
    if (state.isMobile) {
        DOM.sidebar.classList.toggle('mobile-open');
        DOM.overlay.classList.toggle('active');
        addLog('info', state.sidebar.classList.contains('mobile-open') ? '📂 Sidebar opened' : '📂 Sidebar closed');
    } else {
        state.sidebarCollapsed = !state.sidebarCollapsed;
        DOM.sidebar.classList.toggle('collapsed');
        addLog('info', state.sidebarCollapsed ? '📂 Sidebar collapsed' : '📂 Sidebar expanded');
    }
}
DOM.toggleBtn.addEventListener('click', toggleSidebar);

// Close sidebar on overlay click
DOM.overlay.addEventListener('click', () => {
    DOM.sidebar.classList.remove('mobile-open');
    DOM.overlay.classList.remove('active');
});

// Close sidebar on nav link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        addLog('info', `📂 Navigated to ${this.textContent.trim()}`);
        if (state.isMobile) {
            DOM.sidebar.classList.remove('mobile-open');
            DOM.overlay.classList.remove('active');
        }
    });
});

// Resize handler
window.addEventListener('resize', () => {
    state.isMobile = window.innerWidth <= 992;
    if (!state.isMobile) {
        DOM.sidebar.classList.remove('mobile-open');
        DOM.overlay.classList.remove('active');
    }
});

// ============================================================
// FULLSCREEN
// ============================================================
document.getElementById('fullscreenBtn')?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen().catch(() => {});
    }
});

// ============================================================
// FILE CHECKER
// ============================================================
async function checkFileStatus() {
    let online = 0, offline = 0, results = [];

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

    state.fileStatus = results;
    const total = results.length;
    const uptime = total > 0 ? Math.round((online / total) * 100) : 0;

    // Update stats
    DOM.totalFiles.textContent = total;
    DOM.onlineFiles.textContent = online;
    DOM.offlineFiles.textContent = offline;
    DOM.totalFiles2.textContent = total;
    DOM.onlineFiles2.textContent = online;
    DOM.offlineFiles2.textContent = offline;
    DOM.uptimePercent.textContent = uptime + '%';

    renderFileChart(results);
    updatePerformance();
    return results;
}

function renderFileChart(files) {
    if (!files || files.length === 0) {
        DOM.fileChart.innerHTML = `
            <div class="chart-placeholder">
                <i class="fas fa-database"></i>
                <span>No data available</span>
            </div>
        `;
        return;
    }

    const topFiles = files.slice(0, CONFIG.maxChartItems);
    const maxHeight = 70;

    DOM.fileChart.innerHTML = topFiles.map(f => {
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
    state.logEntries.unshift(entry);
    if (state.logEntries.length > CONFIG.maxLogs) state.logEntries.pop();
    renderLogs();
}

function renderLogs(filter = 'all') {
    let entries = state.logEntries;
    if (filter !== 'all') {
        entries = entries.filter(e => e.type === filter);
    }

    if (entries.length === 0) {
        DOM.logContainer.innerHTML = `
            <div class="empty-log">
                <i class="fas fa-inbox"></i>
                <span>No activity logs yet</span>
                <small>System events will appear here</small>
            </div>
        `;
        DOM.logCount.textContent = '0 events';
        return;
    }

    DOM.logContainer.innerHTML = entries.slice(0, 30).map(log => `
        <div class="log-entry">
            <span class="log-time">${log.time}</span>
            <span class="log-type ${log.type}">${log.type}</span>
            <span class="log-msg">${log.message}</span>
        </div>
    `).join('');

    DOM.logCount.textContent = `${entries.length} events`;
}

function clearLogs() {
    state.logEntries = [];
    renderLogs();
    addLog('info', '🗑️ Logs cleared');
}

// Log filter buttons
document.querySelectorAll('.log-filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.log-filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderLogs(this.dataset.filter);
    });
});

// Export logs
document.getElementById('exportLogs')?.addEventListener('click', exportLogs);
window.exportLogs = exportLogs;
function exportLogs() {
    const data = JSON.stringify(state.logEntries, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addLog('info', '📥 Logs exported');
}

// ============================================================
// HEALTH CHECK
// ============================================================
async function runHealthCheck() {
    DOM.healthStatus.innerHTML = `
        <div class="health-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Scanning system...</span>
        </div>
    `;

    const checks = [];
    const isOnline = navigator.onLine;
    checks.push({
        label: 'Internet Connection',
        status: isOnline ? 'pass' : 'fail',
        detail: isOnline ? 'Connected' : 'Disconnected'
    });

    const criticalFiles = ['style.css', 'script.js', 'loader.js'];
    for (const file of criticalFiles) {
        try {
            const res = await fetch(file, { method: 'HEAD', cache: 'no-cache' });
            checks.push({
                label: `File: ${file}`,
                status: res.ok ? 'pass' : 'fail',
                detail: res.ok ? 'Found' : `HTTP ${res.status}`
            });
        } catch {
            checks.push({ label: `File: ${file}`, status: 'fail', detail: 'Unreachable' });
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
    }

    state.healthResults = checks;
    renderHealth(checks);
}

function renderHealth(checks) {
    const pass = checks.filter(c => c.status === 'pass').length;
    const fail = checks.filter(c => c.status === 'fail').length;
    const total = checks.length;
    const percent = total > 0 ? Math.round((pass / total) * 100) : 0;

    // Update health ring
    const circumference = 2 * Math.PI * 32;
    const offset = circumference - (percent / 100) * circumference;
    DOM.healthRing.setAttribute('stroke-dashoffset', offset);
    DOM.healthPercent.textContent = percent + '%';

    // Update progress
    DOM.healthProgress.style.width = percent + '%';
    DOM.healthValue.textContent = percent + '%';

    // Update details
    DOM.serviceCount.textContent = `${pass}/${total}`;
    DOM.systemUptime.textContent = formatUptime(state.uptimeSeconds);
    DOM.responseTime.textContent = getRandomInt(12, 45) + 'ms';

    DOM.healthStatus.innerHTML = `
        <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:12px; font-size:0.8rem;">
            <span style="color:var(--success); font-weight:700;">${pass} ✅ Passed</span>
            <span style="color:var(--danger); font-weight:700;">${fail} ❌ Failed</span>
            <span style="color:var(--text-muted);">Total ${total} checks</span>
        </div>
        ${checks.map(c => `
            <div class="health-item">
                <span class="health-label">${c.label}</span>
                <span class="health-status ${c.status}">${c.status === 'pass' ? '✅' : '❌'} ${c.detail}</span>
            </div>
        `).join('')}
    `;
}

// ============================================================
// PERFORMANCE
// ============================================================
function updatePerformance() {
    // Page load
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    DOM.loadTime.textContent = loadTime > 0 && loadTime < 30000 ? `${loadTime}ms` : 'N/A';

    // Render time
    if (window.renderEndTime && window.renderStartTime) {
        const renderTime = window.renderEndTime - window.renderStartTime;
        DOM.renderTime.textContent = renderTime > 0 ? `${renderTime.toFixed(2)}ms` : 'N/A';
    } else {
        DOM.renderTime.textContent = 'N/A';
    }

    // Memory
    if (performance.memory) {
        const used = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
        const total = (performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
        DOM.memoryUsage.textContent = `${used} MB`;
        DOM.jsHeap.textContent = `${used} / ${total} MB`;
    } else {
        DOM.memoryUsage.textContent = 'N/A';
        DOM.jsHeap.textContent = 'N/A';
    }

    // DOM nodes
    DOM.domNodes.textContent = document.querySelectorAll('*').length;

    // File check status
    const online = state.fileStatus.filter(f => f.status === 'online').length;
    DOM.fileCheckStatus.textContent = `${online}/${JS_FILES.length} online`;

    // CPU & Memory progress (simulasi)
    const cpu = getRandomInt(15, 55);
    DOM.cpuProgress.style.width = cpu + '%';
    DOM.cpuValue.textContent = cpu + '%';

    const mem = getRandomInt(40, 75);
    DOM.memoryProgress.style.width = mem + '%';
    DOM.memoryValue.textContent = mem + '%';
}

// ============================================================
// SYSTEM INFO
// ============================================================
function updateSystemInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';

    DOM.browserInfo.textContent = browser;
    DOM.osInfo.textContent = navigator.platform;
    DOM.screenInfo.textContent = `${window.screen.width}×${window.screen.height}`;
    DOM.langInfo.textContent = navigator.language;
    DOM.tzInfo.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
    DOM.connInfo.textContent = navigator.onLine ? 'Online' : 'Offline';
}

// ============================================================
// CONSOLE SHORTCUTS
// ============================================================
window.report = function() {
    const online = state.fileStatus.filter(f => f.status === 'online').length;
    const errors = state.logEntries.filter(l => l.type === 'error').length;
    console.log('📊 ===== ENTERPRISE MONITOR REPORT =====');
    console.log(`📁 Files: ${JS_FILES.length} total, ${online} online, ${JS_FILES.length - online} offline`);
    console.log(`📝 Logs: ${state.logEntries.length} entries, ${errors} errors`);
    console.log(`⏱️ Uptime: ${formatUptime(state.uptimeSeconds)}`);
    console.log(`💾 Memory: ${DOM.memoryUsage.textContent}`);
    console.log('📊 =========================================');
};
window.getLogs = function() {
    console.table(state.logEntries);
    return state.logEntries;
};
window.clearLogs = clearLogs;
window.debugOn = function() {
    state.isDebugMode = true;
    document.body.style.outline = '2px solid #22c55e';
    document.body.style.outlineOffset = '-2px';
    addLog('info', '🔍 Debug mode enabled');
};
window.debugOff = function() {
    state.isDebugMode = false;
    document.body.style.outline = 'none';
    addLog('info', '🔍 Debug mode disabled');
};
window.exportLogs = exportLogs;

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
    addLog('info', '🚀 Enterprise Monitor starting...');
    addLog('info', '📌 Click ☰ to toggle sidebar')