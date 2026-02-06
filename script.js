// ============================================
// DIAGNOSTIC VERSION - Restaurant Script
// ============================================
console.log('✓ Script file loaded successfully');
console.log('Current URL:', window.location.href);

// Check if we're on Vercel
if (window.location.hostname.includes('vercel.app')) {
    console.log('✓ Running on Vercel deployment');
}

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ DOM Content Loaded');
    
    // Test 1: Find language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log('TEST 1 - Language buttons found:', langButtons.length);
    
    if (langButtons.length === 0) {
        console.error('❌ ERROR: No language buttons found!');
        console.log('Checking if .language-toggle exists...');
        const langToggle = document.querySelector('.language-toggle');
        console.log('Language toggle element:', langToggle);
    } else {
        console.log('✓ Language buttons OK');
    }
    
    // Test 2: Check translatable elements
    const allElements = document.querySelectorAll('[data-en][data-gr]');
    console.log('TEST 2 - Translatable elements found:', allElements.length);
    
    if (allElements.length === 0) {
        console.error('❌ ERROR: No translatable elements found!');
    } else {
        console.log('✓ Translatable elements OK');
        console.log('Sample element:', allElements[0]);
    }
    
    // Set English as active by default
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === 'en') {
            btn.classList.add('active');
            console.log('✓ Set EN button as active');
        }
    });
    
    // Add click handlers
    langButtons.forEach((btn, index) => {
        console.log(`Adding click handler to button ${index + 1}:`, btn.getAttribute('data-lang'));
        
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            console.log('');
            console.log('======================================');
            console.log('BUTTON CLICKED! Language:', lang);
            console.log('======================================');
            
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            console.log('✓ Updated active button state');
            
            // Switch language
            currentLang = lang;
            applyLanguage(lang);
        });
    });
    
    console.log('✓ All click handlers added');
    
    // Apply default language
    console.log('Applying default language (EN)...');
    applyLanguage('en');
    
    // Initialize other features
    initMobileMenu();
    initContactForm();
    
    console.log('');
    console.log('========================================');
    console.log('✓✓✓ ALL INITIALIZATION COMPLETE ✓✓✓');
    console.log('========================================');
    console.log('');
    console.log('Try clicking the language buttons now.');
    console.log('You should see messages in the console.');
});

function applyLanguage(lang) {
    console.log('');
    console.log('--- APPLYING LANGUAGE:', lang.toUpperCase(), '---');
    
    const allElements = document.querySelectorAll('[data-en][data-gr]');
    console.log('Elements to translate:', allElements.length);
    
    if (allElements.length === 0) {
        console.error('❌ ERROR: No elements to translate!');
        return;
    }
    
    let successCount = 0;
    let failCount = 0;
    
    allElements.forEach((element, index) => {
        const text = element.getAttribute('data-' + lang);
        
        if (!text) {
            console.warn(`⚠ Element ${index} missing data-${lang}:`, element);
            failCount++;
            return;
        }
        
        if (element.tagName === 'INPUT') {
            element.placeholder = text;
        } else if (element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
        
        successCount++;
    });
    
    console.log(`✓ Successfully translated: ${successCount} elements`);
    if (failCount > 0) {
        console.warn(`⚠ Failed to translate: ${failCount} elements`);
    }
    console.log('--- LANGUAGE APPLICATION COMPLETE ---');
    console.log('');
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    console.log('Initializing mobile menu...');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            console.log('Mobile menu toggled');
        });
        
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
        console.log('✓ Mobile menu initialized');
    } else {
        console.log('ℹ Mobile menu elements not found (may not be needed on this page)');
    }
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    console.log('Looking for contact form...');
    const form = document.getElementById('contactForm');
    
    if (form) {
        console.log('✓ Contact form found');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value || 'To be confirmed';
            const time = document.getElementById('time').value || 'To be confirmed';
            const guests = document.getElementById('guests').value || '2';
            
            let message;
            if (currentLang === 'en') {
                message = `Thank you ${name}!\n\nYour reservation request has been received.\n\nDetails:\n• Date: ${date}\n• Time: ${time}\n• Guests: ${guests}\n\nWe will contact you at:\n${email}\n${phone}\n\nWe'll confirm within 24 hours.`;
            } else {
                message = `Ευχαριστούμε ${name}!\n\nΤο αίτημα κράτησής σας έχει ληφθεί.\n\nΛεπτομέρειες:\n• Ημερομηνία: ${date}\n• Ώρα: ${time}\n• Άτομα: ${guests}\n\nΘα επικοινωνήσουμε στο:\n${email}\n${phone}\n\nΘα επιβεβαιώσουμε εντός 24 ωρών.`;
            }
            
            alert(message);
            form.reset();
        });
    } else {
        console.log('ℹ Contact form not found (not on contact page)');
    }
}

// ============================================
// NAVBAR SCROLL
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    }
});

// Final confirmation
console.log('');
console.log('📊 DIAGNOSTIC SCRIPT READY');
console.log('Open this console and click the language buttons');
console.log('You will see detailed logs of what happens');
console.log('');