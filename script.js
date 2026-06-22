// DOM Elements
const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Custom Mouse Cursor
window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    
    cursorOutline.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, {
        duration: 500,
        fill: 'forwards'
    });
});

// Cursor effects on hover
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .social-item, .email-link, .mode-toggle-small');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorDot.style.width = '0px';
        cursorDot.style.height = '0px';
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.borderColor = body.classList.contains('light-mode') ? 'var(--black)' : 'var(--white)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = body.classList.contains('light-mode') ? 'var(--black)' : 'var(--white)';
    });
});

// Dark/Light Mode Toggle
let isLightMode = false;

modeToggle.addEventListener('click', (e) => {
    isLightMode = !isLightMode;
    
    // Create touch effect
    createTouchEffect(e);
    
    if (isLightMode) {
        body.classList.add('light-mode');
        modeToggle.textContent = '☾';
        modeToggle.style.transform = 'rotate(180deg) scale(1.2)';
    } else {
        body.classList.remove('light-mode');
        modeToggle.textContent = '☀';
        modeToggle.style.transform = 'rotate(0deg) scale(1.2)';
    }
    
    // Reset transform after animation
    setTimeout(() => {
        modeToggle.style.transform = '';
    }, 400);
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
    });
});

// Touch Effect Function
function createTouchEffect(event) {
    const touch = document.createElement('div');
    touch.style.position = 'fixed';
    touch.style.width = '60px';
    touch.style.height = '60px';
    touch.style.borderRadius = '50%';
    touch.style.background = isLightMode 
        ? 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%)' 
        : 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)';
    touch.style.pointerEvents = 'none';
    touch.style.zIndex = '9999';
    touch.style.left = `${event.clientX - 30}px`;
    touch.style.top = `${event.clientY - 30}px`;
    touch.style.transform = 'scale(0)';
    touch.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
    
    document.body.appendChild(touch);
    
    // Animate
    setTimeout(() => {
        touch.style.transform = 'scale(1)';
        touch.style.opacity = '1';
    }, 10);
    
    // Fade out and remove
    setTimeout(() => {
        touch.style.opacity = '0';
    }, 200);
    
    setTimeout(() => {
        if (touch.parentNode) {
            document.body.removeChild(touch);
        }
    }, 600);
}

// Add touch effect to interactive elements
interactiveElements.forEach(element => {
    element.addEventListener('click', createTouchEffect);
});

// Scroll animations
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Parallax effect on photo
const photoFrame = document.querySelector('.photo-frame');

window.addEventListener('mousemove', (e) => {
    if (!photoFrame) return;
    
    const x = (e.clientX / window.innerWidth) * 10 - 5;
    const y = (e.clientY / window.innerHeight) * 10 - 5;
    
    photoFrame.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Fade in
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initial scroll animation check
    revealOnScroll();
});
