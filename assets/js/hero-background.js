// Animated Hero Background for LifeHack Software
(function() {
    'use strict';
    
    // SVG path - update this to your actual SVG file path
    const svgPath = '../images/vectorstock/vectorstock.svg';
    
    // Initialize when DOM is ready
    function initHeroBackground() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Create background container
        const backgroundDiv = document.createElement('div');
        backgroundDiv.className = 'hero-background';
        
        // Create 3 SVG instances for parallax effect
        for (let i = 0; i < 3; i++) {
            const svgObject = document.createElement('object');
            svgObject.type = 'image/svg+xml';
            svgObject.data = svgPath;
            svgObject.style.pointerEvents = 'none';
            backgroundDiv.appendChild(svgObject);
        }
        
        // Insert background as first child of hero
        hero.insertBefore(backgroundDiv, hero.firstChild);
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroBackground);
    } else {
        initHeroBackground();
    }
})();
