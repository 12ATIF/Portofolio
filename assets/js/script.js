/**
 * Portfolio Website - Enhanced JavaScript
 * Features: Preloader, Typing Effect, Statistics Counter, Project Filters, Terminal Animation
 */

(function () {
  'use strict';

  // ===== DOM ELEMENT REFERENCES =====
  const elements = {
    preloader: document.getElementById('preloader'),
    mobileToggle: document.getElementById('mobileToggle'),
    navMenu: document.getElementById('navMenu'),
    header: document.getElementById('header'),
    scrollProgress: document.getElementById('scrollProgress'),
    sections: document.querySelectorAll('.section'),
    navLinks: document.querySelectorAll('.nav-link'),
    typingText: document.getElementById('typingText'),
    statNumbers: document.querySelectorAll('.stat-number'),
    certCards: document.querySelectorAll('.cert-card'),
    certDots: document.querySelectorAll('.dot'),
    prevCertBtn: document.getElementById('prevCertBtn'),
    nextCertBtn: document.getElementById('nextCertBtn'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    projectCards: document.querySelectorAll('.project-card')
  };

  // ===== PRELOADER =====
  function initPreloader() {
    if (!elements.preloader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        elements.preloader.classList.add('hidden');
      }, 1500);
    });
  }

  // ===== TYPING EFFECT FOR HERO =====
  function initTypingEffect() {
    if (!elements.typingText) return;

    const roles = [
      'Full-Stack Developer',
      'Cloud Computing Enthusiast',
      'Laravel Specialist',
      'API Architect',
      'Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        elements.typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        elements.typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before new word
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1500);
  }

  // ===== STATISTICS COUNTER ANIMATION =====
  function initStatsCounter() {
    if (elements.statNumbers.length === 0) return;

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const countUp = (element) => {
      const target = parseInt(element.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCount = () => {
        current += step;
        if (current < target) {
          element.textContent = Math.floor(current);
          requestAnimationFrame(updateCount);
        } else {
          element.textContent = target + (target === 999 ? '+' : '+');
        }
      };

      updateCount();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.statNumbers.forEach(stat => observer.observe(stat));
  }

  // ===== PROJECT FILTER =====
  function initProjectFilter() {
    if (elements.filterBtns.length === 0) return;

    elements.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        elements.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter projects
        const filter = btn.dataset.filter;

        elements.projectCards.forEach(card => {
          const category = card.dataset.category;

          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== MOBILE MENU =====
  function initMobileMenu() {
    if (!elements.mobileToggle || !elements.navMenu) return;

    elements.mobileToggle.addEventListener('click', () => {
      elements.navMenu.classList.toggle('active');
      const icon = elements.mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    elements.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        elements.navMenu.classList.remove('active');
        const icon = elements.mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // ===== SCROLL HANDLERS =====
  function handleScroll() {
    const scrollY = window.scrollY;

    if (elements.header) {
      elements.header.classList.toggle('scrolled', scrollY > 100);
    }

    if (elements.scrollProgress) {
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      elements.scrollProgress.style.width = `${scrollPercent}%`;
    }

    let currentSection = '';
    elements.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 300) {
        currentSection = section.getAttribute('id');
      }
    });

    elements.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // ===== SMOOTH SCROLLING =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target && elements.header) {
          const headerHeight = elements.header.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  function initFadeInAnimations() {
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

    document.querySelectorAll('.panel, .project-card, .certificate-slider, .terminal-container').forEach(el => {
      observer.observe(el);
    });
  }

  // ===== PROJECT CARD INTERACTIONS =====
  function initProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // ===== BUTTON RIPPLE EFFECT =====
  function initRippleEffect() {
    document.querySelectorAll('.cta-button, .contact-btn, .project-link, .filter-btn').forEach(button => {
      button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => ripple.remove(), 300);
      });
    });
  }

  // ===== CERTIFICATE SLIDER =====
  function initCertificateSlider() {
    const { certCards, certDots, prevCertBtn, nextCertBtn } = elements;

    if (certCards.length === 0) return;

    let currentIndex = 0;

    function updateSlider() {
      certCards.forEach(card => card.classList.remove('active'));
      certDots.forEach(dot => dot.classList.remove('active'));

      certCards[currentIndex].classList.add('active');
      certDots[currentIndex].classList.add('active');

      if (prevCertBtn) prevCertBtn.disabled = currentIndex === 0;
      if (nextCertBtn) nextCertBtn.disabled = currentIndex === certCards.length - 1;
    }

    if (prevCertBtn) {
      prevCertBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateSlider();
        }
      });
    }

    if (nextCertBtn) {
      nextCertBtn.addEventListener('click', () => {
        if (currentIndex < certCards.length - 1) {
          currentIndex++;
          updateSlider();
        }
      });
    }

    certDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideTo = parseInt(e.target.dataset.slideTo);
        if (!isNaN(slideTo)) {
          currentIndex = slideTo;
          updateSlider();
        }
      });
    });

    updateSlider();
  }

  // ===== TERMINAL TYPING ANIMATION =====
  function initTerminalAnimation() {
    const terminalBody = document.getElementById('terminalBody');
    if (!terminalBody) return;

    const lines = terminalBody.querySelectorAll('.terminal-line, .terminal-output');

    lines.forEach((line, index) => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(10px)';

      setTimeout(() => {
        line.style.transition = 'all 0.3s ease';
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, 300 * index);
    });
  }

  // ===== INITIALIZATION =====
  function init() {
    initPreloader();
    initMobileMenu();
    initSmoothScroll();
    initFadeInAnimations();
    initProjectCards();
    initRippleEffect();
    initCertificateSlider();
    initProjectFilter();
    initStatsCounter();

    window.addEventListener('scroll', handleScroll);
  }

  // Run after window load
  window.addEventListener('load', () => {
    initTypingEffect();
    setTimeout(initTerminalAnimation, 2000);
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();