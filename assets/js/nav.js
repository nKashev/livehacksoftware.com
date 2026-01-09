// Navigation Widget for LifeHack Software
(function() {
    'use strict';
    
    // Create navigation HTML
    const navHTML = `
        <!-- Navigation -->
        <nav class="navbar">
            <div class="container">
                <div class="nav-wrapper">
                    <a href="/" class="logo">
                        <img src="assets/images/logo.svg" alt="LifeHack Software Logo">
                        <span>LifeHack Software</span>
                    </a>
                    <button class="mobile-menu-toggle" aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-menu">
                        <li><a href="/" data-page="index">Начало</a></li>
                        <li><a href="about.html" data-page="about">За нас</a></li>
                        <li><a href="services.html" data-page="services">Услуги</a></li>
                        <!-- <li><a href="portfolio.html" data-page="portfolio">Портфолио</a></li>
                        <li><a href="blog.html" data-page="blog">Блог</a></li> -->
                        <li><a href="contact.html" data-page="contact">Контакти</a></li>
                        <li class="lang-switch"><a href="en/" id="lang-switch-link">EN</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    
    // Initialize navigation when DOM is ready
    function initNav() {
        // Insert navigation at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', navHTML);
        
        // Set active page
        setActivePage();
        
        // Set language switch link
        setLanguageLink();
        
        // Initialize mobile menu toggle
        // initMobileMenu();
    }
    
    // Function to set active page based on current URL
    function setActivePage() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Get all nav links
        const navLinks = document.querySelectorAll('.nav-menu a[data-page]');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            const linkHref = link.getAttribute('href');
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Check if this is the current page
            if (
                (currentPage === 'index.html' && linkPage === 'index') ||
                (currentPage === '' && linkPage === 'index') ||
                (currentPage === '/' && linkPage === 'index') ||
                linkHref === currentPage ||
                currentPage.includes(linkPage)
            ) {
                link.classList.add('active');
            }
        });
    }
    
    // Function to set language switch link based on active page
    function setLanguageLink() {
        const langLink = document.getElementById('lang-switch-link');
        if (!langLink) return;
        
        // Find the active link
        const activeLink = document.querySelector('.nav-menu a.active[data-page]');
        
        if (activeLink) {
            const activeHref = activeLink.getAttribute('href');
            
            // If it's the homepage
            if (activeHref === '/') {
                langLink.setAttribute('href', 'en/index.html');
            } else {
                // For other pages, prepend 'en/' to the href
                langLink.setAttribute('href', 'en/' + activeHref);
            }
        } else {
            // Default fallback
            langLink.setAttribute('href', 'en/index.html');
        }
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();