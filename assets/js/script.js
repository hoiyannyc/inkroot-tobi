// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-item__question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-item__answer');
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-item__answer');
                    
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.classList.remove('active');
                }
            });

            // Toggle current FAQ item
            question.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact__form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData);
            
            // Simple form validation
            const requiredFields = ['name', 'email'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                if (!formValues[field] || !formValues[field].trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--error-500)';
                } else {
                    input.style.borderColor = 'var(--neutral-200)';
                }
            });
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = contactForm.querySelector('[name="email"]');
            if (formValues.email && !emailPattern.test(formValues.email)) {
                isValid = false;
                emailInput.style.borderColor = 'var(--error-500)';
            }
            
            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    alert('Thank you for your message! We\'ll get back to you soon.');
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1000);
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
});

// Navigation Bar Background on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', handleScroll);
});

// Intersection Observer for Animation Triggers
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.service-card, .testimonial, .gallery-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});