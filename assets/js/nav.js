// Navigation Widget for LifeHack Software (Bulgarian)
(function() {
    'use strict';
    
    // Create navigation HTML
    const navHTML = `
        <!-- Navigation -->
        <nav class="navbar">
            <div class="container">
                <div class="nav-wrapper">
                    <a href="/" class="logo">
                        <img src="/assets/images/logo.svg" width="40px" height="auto" alt="LifeHack Software Logo">
                        <span>LifeHack Software</span>
                    </a>
                    <button class="mobile-menu-toggle" aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-menu">
                        <li><a href="/" data-page="index">Начало</a></li>
                        <li><a href="/about/" data-page="about">За нас</a></li>
                        <li><a href="/services/" data-page="services">Услуги</a></li>
                        <!-- <li><a href="/portfolio/" data-page="portfolio">Портфолио</a></li>
                        <li><a href="/blog/" data-page="blog">Блог</a></li> -->
                        <li><a href="/contact/" data-page="contact">Контакти</a></li>
                        <li class="lang-switch"><a href="/en/" id="lang-switch-link"><img src="/assets/images/flags/en.svg" alt="English" class="flag-icon"><span>EN</span></a></li>
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
    }
    
    // Function to set active page based on current URL
    function setActivePage() {
        const currentPath = window.location.pathname;
        
        // Normalize path - remove trailing slash for comparison
        const normalizedPath = currentPath.replace(/\/$/, '') || '';
        
        // Get all nav links
        const navLinks = document.querySelectorAll('.nav-menu a[data-page]');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            const linkHref = link.getAttribute('href').replace(/\/$/, '');
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Check if this is the current page
            if (
                // Homepage checks
                ((normalizedPath === '' || normalizedPath === '/index') && linkPage === 'index') ||
                // Exact URL match
                (normalizedPath === linkHref) ||
                // Page name match
                (normalizedPath === '/' + linkPage)
            ) {
                link.classList.add('active');
            }
        });
    }
    
    // Function to set language switch link based on active page
    function setLanguageLink() {
        const langLink = document.getElementById('lang-switch-link');
        if (!langLink) return;
        
        const currentPath = window.location.pathname;
        
        // Page mapping for language switch (BG → EN)
        const pageMap = {
            '/': '/en/',
            '/index/': '/en/',
            '/about/': '/en/about/',
            '/services/': '/en/services/',
            '/portfolio/': '/en/portfolio/',
            '/blog/': '/en/blog/',
            '/contact/': '/en/contact/',
            '/privacy/': '/en/privacy/',
            '/terms/': '/en/terms/'
        };
        
        // Normalize current path
        const normalizedPath = currentPath.endsWith('/') ? currentPath : currentPath + '/';
        
        // Set the link based on current page
        if (pageMap[normalizedPath]) {
            langLink.setAttribute('href', pageMap[normalizedPath]);
        } else {
            // Fallback: add /en/ prefix
            langLink.setAttribute('href', '/en' + currentPath);
        }
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();
