// ============================================
// LANGUAGE SWITCHER
// ============================================
let currentLang = localStorage.getItem('language') || 'en';

function initLanguageSwitcher() {
    console.log('Initializing language switcher. Current language:', currentLang);
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Set initial active state based on current language
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Apply current language on page load
    switchLanguage(currentLang);
    
    // Add click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            console.log('Switching to language:', lang);
            currentLang = lang;
            localStorage.setItem('language', lang);
            switchLanguage(lang);
            
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchLanguage(lang) {
    console.log('Applying language:', lang);
    const elements = document.querySelectorAll('[data-en], [data-gr]');
    console.log('Found', elements.length, 'translatable elements');
    
    elements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            // Handle different element types
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else if (element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    console.log('Language switch complete');
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // Validate required fields
            if (!name || !email || !phone) {
                const errorMsg = currentLang === 'en' 
                    ? 'Please fill in all required fields.'
                    : 'Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία.';
                alert(errorMsg);
                return;
            }
            
            // Show success message
            const successMessage = currentLang === 'en' 
                ? `Thank you ${name}! Your reservation request has been received.\n\nDetails:\n• Date: ${date || 'To be confirmed'}\n• Time: ${time || 'To be confirmed'}\n• Guests: ${guests || '2'}\n\nWe will contact you at ${email} or ${phone} within 24 hours to confirm your reservation.`
                : `Ευχαριστούμε ${name}! Το αίτημα κράτησής σας έχει ληφθεί.\n\nΛεπτομέρειες:\n• Ημερομηνία: ${date || 'Θα επιβεβαιωθεί'}\n• Ώρα: ${time || 'Θα επιβεβαιωθεί'}\n• Άτομα: ${guests || '2'}\n\nΘα επικοινωνήσουμε μαζί σας στο ${email} ή ${phone} εντός 24 ωρών για επιβεβαίωση.`;
            
            alert(successMessage);
            
            // Reset form
            form.reset();
            
            // In a real implementation, you would send this to a server or EmailJS:
            console.log('Form submitted:', { name, email, phone, date, time, guests, message });
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation styles to elements
    const animatedElements = document.querySelectorAll('.dish-card, .menu-item, .value-card, .team-member, .faq-item, .info-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing all functions');
    initLanguageSwitcher();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initActiveNavigation();
    console.log('All functions initialized');
});