// Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scroll
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Fermer le menu au clic en dehors
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animation des barres de progression
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
            }
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.skill-progress, .progress-fill, .project-card, .category-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Navigation active au scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = 'none';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Formulaire de contact
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Simulation d'envoi
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simuler un délai d'envoi
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Message de succès
        alert('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
        contactForm.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Animations supplémentaires
function initAnimations() {
    // Animation des statistiques
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
        }, 30);
    });
    
    // Animation au survol des cartes projets
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Tooltips pour les technologies
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const tooltip = icon.getAttribute('data-tooltip');
            if (tooltip) {
                // Vous pouvez ajouter un tooltip personnalisé ici
            }
        });
    });
}

// Initialiser les animations lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    
    // Préchargement des images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Mode sombre optionnel (vous pouvez ajouter un toggle)
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
`;

document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Ajouter des styles pour le mode sombre
const darkModeStyles = `
    body.dark-mode {
        --dark: #f8f9fa;
        --light: #1a1a2e;
        --gray: #adb5bd;
        --gray-light: #2d3047;
        background: #1a1a2e;
        color: #f8f9fa;
    }
    
    body.dark-mode .header {
        background: rgba(26, 26, 46, 0.95);
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    body.dark-mode .nav-link {
        color: #f8f9fa;
    }
    
    body.dark-mode .hero {
        background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
    }
    
    body.dark-mode .project-card,
    body.dark-mode .category-card,
    body.dark-mode .info-card,
    body.dark-mode .contact-form,
    body.dark-mode .timeline-content {
        background: #2d3047;
        color: #f8f9fa;
    }
    
    body.dark-mode .project-card h3,
    body.dark-mode .category-card h3,
    body.dark-mode .info-card h4,
    body.dark-mode .timeline-content h3 {
        color: #f8f9fa;
    }
    
    body.dark-mode .footer {
        background: #0f3460;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);
