// Enhanced Animated Hero Background for LifeHack Software
(function() {
    'use strict';
    
    // Configuration
    const config = {
        svgPath: '../images/vectorstock/vectorstock.svg',
        version: 'v2', // 'v1' or 'v2'
        enableParticles: true,
        particleCount: 6
    };
    
    // Initialize when DOM is ready
    function initHeroBackground() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Create background container
        const backgroundDiv = document.createElement('div');
        backgroundDiv.className = config.version === 'v2' ? 'hero-background-v2' : 'hero-background';
        
        // Create 3 SVG instances for parallax/depth effect
        for (let i = 0; i < 3; i++) {
            const svgObject = document.createElement('object');
            svgObject.type = 'image/svg+xml';
            svgObject.data = config.svgPath;
            svgObject.style.pointerEvents = 'none';
            backgroundDiv.appendChild(svgObject);
        }
        
        // Insert background as first child of hero
        hero.insertBefore(backgroundDiv, hero.firstChild);
        
        // Add particles if enabled (v2 only)
        if (config.enableParticles && config.version === 'v2') {
            addParticles(hero);
        }
        
        // Add scroll parallax effect
        addScrollParallax();
    }
    
    // Add particle elements
    function addParticles(hero) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'hero-particles';
        
        for (let i = 0; i < config.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particlesContainer.appendChild(particle);
        }
        
        hero.appendChild(particlesContainer);
    }
    
    // Add scroll parallax effect
    function addScrollParallax() {
        const background = document.querySelector('.hero-background, .hero-background-v2');
        if (!background) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (!hero) return;
            
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            
            // Only apply parallax while hero is in view
            if (scrolled < heroBottom) {
                background.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroBackground);
    } else {
        initHeroBackground();
    }
})();
