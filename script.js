// ===== FILE INDUK =====
import { loadJobs, initMainEvents } from './js/main.js';
import { initInbox } from './js/inbox.js';
import { initExplore } from './js/explore.js';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Load data dan render jobs
    loadJobs();
    
    // Inisialisasi event listener untuk filter/search
    initMainEvents();
    
    // Inisialisasi fitur Inbox
    initInbox();
    
    // Inisialisasi fitur Explore
    initExplore();
    
    // Copilot (langsung di sini karena sederhana)
    const navCopilot = document.getElementById('navCopilot');
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

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });

    console.log('🚀 Loker Kendari siap!');
});