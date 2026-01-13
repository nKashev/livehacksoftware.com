// Navigation Widget for LifeHack Software (English)
(function() {
    'use strict';
    
    // Create navigation HTML
    const navHTML = `
        <!-- Navigation -->
        <nav class="navbar">
            <div class="container">
                <div class="nav-wrapper">
                    <a href="/en/" class="logo">
                        <img src="../assets/images/bimi-svg-tiny-12-ps.svg" width="40px" height="auto" alt="LifeHack Software Logo">
                        <span>LifeHack Software</span>
                    </a>
                    <button class="mobile-menu-toggle" aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-menu">
                        <li><a href="/en/" data-page="index">Home</a></li>
                        <li><a href="about.html" data-page="about">About</a></li>
                        <li><a href="services.html" data-page="services">Services</a></li>
                        <!-- <li><a href="portfolio.html" data-page="portfolio">Portfolio</a></li>
                        <li><a href="blog.html" data-page="blog">Blog</a></li> -->
                        <li><a href="contact.html" data-page="contact">Contact</a></li>
                        <li class="lang-switch"><a href="/" id="lang-switch-link"><img src="../assets/images/flags/bg.svg" alt="Български" class="flag-icon"><span>БГ</span></a></li>
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
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Get all nav links
        const navLinks = document.querySelectorAll('.nav-menu a[data-page]');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            const linkHref = link.getAttribute('href');
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Check if this is the current page - EXACT MATCH ONLY
            if (
                // Homepage checks
                (currentPage === 'index.html' && linkPage === 'index') ||
                (currentPage === '' && linkPage === 'index') ||
                (currentPath === '/en/' && linkPage === 'index') ||
                (currentPath === '/en/index.html' && linkPage === 'index') ||
                // Exact page match
                (linkHref === currentPage) ||
                // Page name match (e.g., about.html matches about)
                (currentPage === linkPage + '.html')
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
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Page mapping for language switch (EN → BG)
        const pageMap = {
            'index.html': '/',
            '': '/',
            'about.html': '/about.html',
            'services.html': '/services.html',
            'portfolio.html': '/portfolio.html',
            'blog.html': '/blog.html',
            'contact.html': '/contact.html',
            'privacy.html': '/privacy.html',
            'terms.html': '/terms.html'
        };
        
        // Set the link based on current page
        if (pageMap[currentPage]) {
            langLink.setAttribute('href', pageMap[currentPage]);
        } else {
            // Fallback: try to construct the path
            if (currentPage && currentPage !== '/') {
                langLink.setAttribute('href', '/' + currentPage);
            } else {
                langLink.setAttribute('href', '/');
            }
        }
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();

