// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Active navigation link
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    // Increase offset tolerance for section detection to ensure smooth transition
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Use a smaller offset for active detection
        if (scrollY >= (sectionTop - 300)) { 
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.2s';
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all elements that should fade in
document.querySelectorAll('.panel, .project-card, .certificate-slider').forEach(el => {
    observer.observe(el);
});

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic typing effect for hero tagline
const tagline = document.querySelector('.hero-tagline');
const originalText = tagline.textContent;
let index = 0;

function typeWriter() {
    if (index < originalText.length) {
        tagline.textContent = originalText.slice(0, index + 1);
        index++;
        setTimeout(typeWriter, 30);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    tagline.textContent = '';
    setTimeout(typeWriter, 1500);
});

// Add click effect to buttons
document.querySelectorAll('.cta-button, .contact-btn, .project-link').forEach(button => {
    button.addEventListener('click', function (e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => {
            ripple.remove();
        }, 300);
    });
});

/* CERTIFICATE SLIDER LOGIC (NEW) */
function certificateSlider() {
    const cards = document.querySelectorAll('.cert-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevCertBtn');
    const nextBtn = document.getElementById('nextCertBtn');
    let currentIndex = 0;

    if (cards.length === 0) return; // Exit if no certificates found

    function updateSlider() {
        // Remove active class from all
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current
        cards[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === cards.length - 1;
    }

    // Handle Previous button click
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Handle Next button click
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Handle Dot click
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = parseInt(e.target.dataset.slideTo);
            currentIndex = slideTo;
            updateSlider();
        });
    });

    // Initial load
    updateSlider();
}

// Run slider script after the document loads
window.addEventListener('load', certificateSlider);