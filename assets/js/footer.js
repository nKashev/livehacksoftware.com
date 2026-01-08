// Footer Widget for LifeHack Software
(function() {
    'use strict';
    
    // Create footer HTML
    const footerHTML = `
        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-col">
                        <h4>LifeHack Software</h4>
                        <p>Вашият надежден партньор за софтуерни решения и дигитален маркетинг.</p>
                    </div>
                    <div class="footer-col">
                        <h4>Навигация</h4>
                        <ul>
                            <li><a href="about.html">За нас</a></li>
                            <li><a href="services.html">Услуги</a></li>
                            <!-- <li><a href="portfolio.html">Портфолио</a></li>
                            <li><a href="blog.html">Блог</a></li> -->
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Контакти</h4>
                        <ul>
                            <li><a href="tel:+359876544896">+359 87 654 4896</a></li>
                            <li><a href="mailto:office@lifehacksoftware.com">office@lifehacksoftware.com</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Правна информация</h4>
                        <ul>
                            <li><a href="privacy.html">Политика за поверителност</a></li>
                            <li><a href="terms.html">Общи условия</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <div class="social-links">
                        <a href="https://www.linkedin.com/company/lifehack-software" target="_blank" aria-label="LinkedIn">
                            <i class="fa-brands fa-linkedin fa-xl" style="color: #0077B5;"></i>
                        </a>
                    </div>
                    <p>&nbsp;</p>
                    <p>&copy; 2025<span id="current-year"></span> LifeHack Software. Всички права запазени.</p>
                </div>
            </div>
        </footer>
    `;
    
    // Initialize footer when DOM is ready
    function initFooter() {
        // Insert footer at the end of body
        document.body.insertAdjacentHTML('beforeend', footerHTML);
        
        // Update copyright year
        const yearSpan = document.getElementById('current-year');
        const currentYear = new Date().getFullYear();
        if (currentYear > 2025) {
            yearSpan.textContent = '–' + currentYear;
        }
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooter);
    } else {
        initFooter();
    }
})();