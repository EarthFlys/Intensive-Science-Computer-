// ==========================================
// Mobile Menu & Dropdown (整合版)
// ==========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const body = document.body;

// ฟังก์ชันเปิด/ปิดเมนูหลัก
function toggleMainMenu(force) {
    navToggle.classList.toggle('active', force);
    navMenu.classList.toggle('active', force);
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMainMenu();
});

// ฟังก์ชันปิดเมนูทั้งหมด
function closeAllMenus() {
    toggleMainMenu(false);
    document.querySelectorAll('.nav-dropdown.active').forEach(el => {
        el.classList.remove('active');
    });
}

// จัดการ dropdown บนมือถือ (คลิกที่ "เกี่ยวกับแผนการเรียน")
document.querySelectorAll('.nav-dropdown > a[href="#about"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            const parent = link.closest('.nav-dropdown');
            // ปิด dropdown อื่นที่เปิดอยู่
            document.querySelectorAll('.nav-dropdown.active').forEach(el => {
                if (el !== parent) el.classList.remove('active');
            });
            parent.classList.toggle('active');
        }
    });
});

// คลิกลิงก์ในเมนู (ยกเว้น dropdown parent บนมือถือ) ให้ปิดเมนู
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // ถ้าเป็นมือถือและคลิกที่ dropdown parent ให้ข้ามไป (จัดการข้างบนแล้ว)
        if (window.innerWidth <= 768 && link.closest('.nav-dropdown') && link.getAttribute('href') === '#about') {
            return;
        }
        closeAllMenus();
    });
});

// คลิกนอกเมนูเพื่อปิด (มือถือ)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeAllMenus();
        }
    }
});

// เมื่อ resize หน้าจอ ถ้ากลับไปเป็น desktop ให้ปิดเมนูและรีเซ็ต
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeAllMenus();
        body.style.overflow = '';
    }
});

// ==========================================
// Smooth Scroll (เลื่อนเรียบ)
// ==========================================
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // ป้องกันการเลื่อนถ้าเป็น dropdown บนมือถือ (จัดการไปแล้ว)
        if (window.innerWidth <= 768 && this.closest('.nav-dropdown') && this.getAttribute('href') === '#about') {
            e.preventDefault();
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Navbar Scroll Effect with Smooth Animation
// ==========================================
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

let lastScrollY = 0;
let ticking = false;

function updateNavbar() {
    const scrollY = window.scrollY;

    // Add scrolled class for styling
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    lastScrollY = scrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// ==========================================
// Back to Top
// ==========================================
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// Particles Animation
// ==========================================
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 15000);
    }

    for (let i = 0; i < 50; i++) {
        setTimeout(createParticle, i * 100);
    }
    setInterval(createParticle, 300);
}

// ==========================================
// Typing Effect
// ==========================================
const typingText = document.getElementById('typingText');

if (typingText) {
    const phrases = [
        'Python Programming...',
        'Web Development...',
        'Graphics Design...',
        'Algorithm...',
        'Robotics...',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();
}

// ==========================================
// Curriculum Tabs
// ==========================================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// ==========================================
// Counter Animation (trigger once)
// ==========================================
const counters = document.querySelectorAll('.stat-num');
let counted = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
};

const statsSection = document.querySelector('.hero-stats-row');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                animateCounters();
                counted = true;
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// ==========================================
// Form Handling
// ==========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check"></i> <span>ส่งสำเร็จ!</span>';
        btn.style.background = 'linear-gradient(135deg, #228B22, #2E8B57)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            contactForm.reset();
        }, 2000);
    });
}

// ==========================================
// Active Nav Link on Scroll
// ==========================================
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Simple Fade In on Scroll (lightweight)
// ==========================================
const fadeElements = document.querySelectorAll('.feature-card, .subject-card, .activity-block, .teacher-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
});

// ==========================================
// Activity Blocks Interaction
// ==========================================
// ==========================================
// Activity Blocks – Mobile Click Toggle
// ==========================================
const activityBlocks = document.querySelectorAll('.activity-block');

activityBlocks.forEach(block => {
    // Desktop: tilt effect
    block.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = block.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            block.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        }
    });

    block.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            block.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        }
    });

    // Mobile: first tap shows details, second tap opens link
    block.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (block.classList.contains('active')) {
                // Second tap: allow default navigation to link
                return;
            }
            
            // First tap: show details, prevent navigation
            e.preventDefault();
            e.stopPropagation();

            // Close other active blocks
            activityBlocks.forEach(b => {
                if (b !== block && b.classList.contains('active')) {
                    b.classList.remove('active');
                }
            });

            block.classList.add('active');
        }
    });
});

// Close active activity on outside click (mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (e.target.closest('.activity-block')) return;
        activityBlocks.forEach(b => b.classList.remove('active'));
    }
});
// ==========================================
// Section Reveal Animation
// ==========================================
const sections = document.querySelectorAll('.section');
const cards = document.querySelectorAll('.feature-card, .subject-card, .activity-block, .teacher-card');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

// alumni-card แสดงทันที ไม่ผ่าน observer
document.querySelectorAll('.alumni-card').forEach(card => {
    card.classList.add('visible');
});

sections.forEach(section => sectionObserver.observe(section));
cards.forEach(card => cardObserver.observe(card));

// ==========================================
// Smooth Parallax Effect for Hero
// ==========================================
const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');

if (hero && heroVisual) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;

        if (scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    }, { passive: true });
}

// ==========================================
// Magnetic Button Effect
// ==========================================
const magneticBtns = document.querySelectorAll('.btn-glow, .nav-cta');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ==========================================
// Auto Slideshow for about-image
// ==========================================
let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow-fade');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

if (slides.length > 0) {
    showSlide(0);
    setInterval(nextSlide, 3000);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        slideIndex = index;
        showSlide(slideIndex);
    });
});