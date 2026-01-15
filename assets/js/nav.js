(function() {
    'use strict';
    
    // Detect language from URL
    const isEnglish = window.location.pathname.startsWith('/en/');
    const lang = isEnglish ? 'en' : 'bg';
    
    // Translations
    const t = {
        bg: {
            home: 'Начало',
            about: 'За нас',
            services: 'Услуги',
            portfolio: 'Портфолио',
            blog: 'Блог',
            contact: 'Контакти',
            langFlag: '/assets/images/flags/gb.svg',
            langAlt: 'English',
            langCode: 'EN',
            langLink: '/en/'
        },
        en: {
            home: 'Home',
            about: 'About',
            services: 'Services',
            portfolio: 'Portfolio',
            blog: 'Blog',
            contact: 'Contacts',
            langFlag: '/assets/images/flags/bg.svg',
            langAlt: 'Български',
            langCode: 'БГ',
            langLink: '/'
        }
    };
    
    const translations = t[lang];
    const basePath = isEnglish ? '/en' : '';
    
    // Create navigation HTML
    const navHTML = `
        <nav class="navbar">
            <div class="container">
                <div class="nav-wrapper">
                    <a href="${basePath}/" class="logo">
                        <img src="/assets/images/logo.svg" width="40px" height="auto" alt="LifeHack Software Logo">
                        <span>LifeHack Software</span>
                    </a>
                    <button class="mobile-menu-toggle" aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-menu">
                        <li><a href="${basePath}/" data-page="index">${translations.home}</a></li>
                        <li><a href="${basePath}/about/" data-page="about">${translations.about}</a></li>
                        <li><a href="${basePath}/services/" data-page="services">${translations.services}</a></li>
                        <li><a href="${basePath}/contact/" data-page="contact">${translations.contact}</a></li>
                        <li class="lang-switch">
                            <a href="${translations.langLink}" id="lang-switch-link">
                                <img src="${translations.langFlag}" alt="${translations.langAlt}" class="flag-icon">
                                <span>${translations.langCode}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    
    // Initialize navigation
    function initNav() {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
        setActivePage();
        setLanguageLink();
    }
    
    function setActivePage() {
        const currentPath = window.location.pathname.replace(/\/$/, '') || basePath;
        const navLinks = document.querySelectorAll('.nav-menu a[data-page]');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href').replace(/\/$/, '');
            link.classList.remove('active');
            
            if (currentPath === linkHref || 
                (currentPath === basePath && link.getAttribute('data-page') === 'index')) {
                link.classList.add('active');
            }
        });
    }
    
    function setLanguageLink() {
        const langLink = document.getElementById('lang-switch-link');
        if (!langLink) return;
        
        const currentPath = window.location.pathname;
        const pageMap = isEnglish ? {
            '/en/': '/',
            '/en/about/': '/about/',
            '/en/services/': '/services/',
            '/en/contact/': '/contact/',
            '/en/privacy/': '/privacy/',
            '/en/terms/': '/terms/'
        } : {
            '/': '/en/',
            '/about/': '/en/about/',
            '/services/': '/en/services/',
            '/contact/': '/en/contact/',
            '/privacy/': '/en/privacy/',
            '/terms/': '/en/terms/'
        };
        
        const normalizedPath = currentPath.endsWith('/') ? currentPath : currentPath + '/';
        const switchTo = pageMap[normalizedPath] || (isEnglish ? '/' : '/en/');
        
        langLink.setAttribute('href', switchTo);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();
