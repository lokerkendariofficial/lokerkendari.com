// ============================================================
// CONSOLE-OVERRIDE.JS - Override console.error
// ============================================================

import { showNotification } from './notification.js';

(function() {
    const originalError = console.error;

    console.error = function(...args) {
        originalError.apply(console, args);
        const message = args.join(' ');
        if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
            showNotification('⚠️ ' + message.substring(0, 100), 'error');
        }
    };
})();