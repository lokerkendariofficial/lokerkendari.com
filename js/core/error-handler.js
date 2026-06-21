// ============================================================
// ERROR-HANDLER.JS - File Induk Error Handler
// ============================================================
// Mengimpor semua modul error dari folder js/error/

// ✅ Path yang benar: naik satu folder (../) dari js/core/ ke js/
import '../error/global-error.js';
import '../error/console-override.js';
import '../error/notification.js';
import '../error/file-checker.js';
import '../error/system-info.js';

console.log('✅ Error handler siap!');