// Menu Hamburger
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Animation des barres de progression
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Observer pour l'animation des compétences
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
}

// Formulaire de contact
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('.btn');
        const originalText = btn.textContent;
        
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;
        
        // Simulation d'envoi
        setTimeout(() => {
            alert('Merci ! Votre message a été envoyé avec succès.');
            this.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    });
}

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation au scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.project-card, .skills-card, .experience-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialiser les animations
document.addEventListener('DOMContentLoaded', function() {
    // Préparer les éléments pour l'animation
    const animatedElements = document.querySelectorAll('.project-card, .skills-card, .experience-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Déclencher les animations initiales
    setTimeout(() => {
        handleScrollAnimations();
    }, 100);
    
    // Écouter le scroll
    window.addEventListener('scroll', handleScrollAnimations);
});

// Fermer le menu en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active') && 
        !e.target.closest('.nav-menu') && 
        !e.target.closest('.hamburger')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});
