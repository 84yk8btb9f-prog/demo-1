// Script loaded confirmation
console.log('Restaurant script loaded successfully');

// ============================================
// LANGUAGE SWITCHER
// ============================================
let currentLang = 'en';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    
    // Initialize language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log('Found language buttons:', langButtons.length);
    
    // Set English as active by default
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === 'en') {
            btn.classList.add('active');
        }
    });
    
    // Add click handlers to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Switch language
            currentLang = lang;
            applyLanguage(lang);
        });
    });
    
    // Apply default language
    applyLanguage('en');
    
    // Initialize other features
    initMobileMenu();
    initContactForm();
});

function applyLanguage(lang) {
    console.log('Applying language:', lang);
    
    // Find all elements with language data
    const allElements = document.querySelectorAll('[data-en][data-gr]');
    console.log('Found translatable elements:', allElements.length);
    
    allElements.forEach(element => {
        const text = element.getAttribute('data-' + lang);
        
        if (element.tagName === 'INPUT') {
            element.placeholder = text;
        } else if (element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
    
    console.log('Language applied successfully');
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        console.log('Contact form found, adding handler');
        
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
    }
}

// ============================================
// NAVBAR SCROLL
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});