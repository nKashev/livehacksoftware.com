// Main JavaScript for LifeHack Software website
(function() {
    'use strict';
    
    // Mobile menu toggle with animated hamburger
    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (toggle && menu) {
            // Toggle menu on click
            toggle.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent document click from firing
                this.classList.toggle('active');
                menu.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            const menuLinks = menu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    toggle.classList.remove('active');
                    menu.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                    toggle.classList.remove('active');
                    menu.classList.remove('active');
                }
            });
        }
    }
    
    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Animate elements on scroll
    function initScrollAnimations() {
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
        
        // Observe service cards and other elements
        document.querySelectorAll('.service-card, .portfolio-item, .blog-post').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }
    
    // Back to top button
    function initBackToTop() {
        // Create button element
        const backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'backToTop';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        
        // Add to page
        document.body.appendChild(backToTopBtn);
        
        let hideTimeout;
        
        // Show/hide button on scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
                
                // Clear previous timeout
                clearTimeout(hideTimeout);
                
                // Hide button after 3 seconds of no scrolling
                hideTimeout = setTimeout(function() {
                    backToTopBtn.classList.remove('show');
                }, 3000);
            } else {
                backToTopBtn.classList.remove('show');
                clearTimeout(hideTimeout);
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // IndexNow - Auto-submit pages to search engines
    function initIndexNow() {
        const INDEXNOW_KEY = 'edb26dc8855f49cc96baaedc32772bf8';
        const HOST = 'lifehacksoftware.com';
        
        // Изпращай само на production домейна
        if (window.location.hostname !== HOST) return;
        
        const currentUrl = window.location.href;
        
        // Използвай GET метод чрез Image beacon (заобикаля CSP)
        setTimeout(function() {
            const img = new Image();
            const params = new URLSearchParams({
                url: currentUrl,
                key: INDEXNOW_KEY
            });
            img.src = `https://api.indexnow.org/indexnow?${params.toString()}`;
            
            // Логване само за development/debugging
            // console.log('IndexNow: Submitted', currentUrl);
        }, 2000); // Изчакай 2 секунди след зареждане
    }

    // Cookie Consentfunction initCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    // Проверка дали вече има consent
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
        banner.style.display = 'block'; // показва банера
    }

    function applyConsent(consent) {
        if (consent === 'granted') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
            });
        }
    }

    window.acceptCookies = function () {
        localStorage.setItem('cookie_consent', 'granted');
        applyConsent('granted');
        banner.style.display = 'none';
    };

    window.rejectCookies = function () {
        localStorage.setItem('cookie_consent', 'denied');
        banner.style.display = 'none';
    };
}
    
    // Initialize all functions when DOM is ready
    function init() {
        initMobileMenu();
        initSmoothScroll();
        initScrollAnimations();
        initBackToTop();
        initIndexNow();
        initCookieConsent();
    }
    
    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
