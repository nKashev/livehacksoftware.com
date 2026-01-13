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
                        <p>Your reliable partner for software solutions and digital marketing.</p>
                    </div>
                    <div class="footer-col">
                        <h4>Navigation</h4>
                        <ul>
                            <li><a href="about.html" data-page="about">About</a></li>
                            <li><a href="services.html" data-page="services">Services</a></li>
                            <!-- <li><a href="portfolio.html" data-page="portfolio">Portfolio</a></li>
                            <li><a href="blog.html" data-page="blog">Blog</a></li> -->
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Contacts</h4>
                        <ul>
                            <li><a href="tel:+359876544896">+359 87 654 4896</a></li>
                            <li><a href="mailto:office@lifehacksoftware.com">office@lifehacksoftware.com</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Legal information</h4>
                        <ul>
                            <li><a href="privacy.html" data-page="privacy">Политика за поверителност</a></li>
                            <li><a href="terms.html" data-page="terms">Общи условия</a></li>
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
                    <p>&copy; 2025<span id="current-year"></span> LifeHack Software. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
    
    // Create schema.org structured data
	const schemaHTML = `
<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://lifehacksoftware.com/#organization",
  "inLanguage": "en",
  "name": "LifeHack Software",
  "url": "https://lifehacksoftware.com/en/",
  "logo": "https://lifehacksoftware.com/assets/images/logo_no_bg.png",
  "description": "LifeHack Software provides software development, QA testing, SEO optimization, and digital marketing for business clients.",
  "sameAs": [
    "https://www.linkedin.com/company/lifehack-software"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "telephone": "+359876544896",
    "email": "office@lifehacksoftware.com",
    "areaServed": "BG",
    "availableLanguage": ["bg", "en"]
  }
}
</script>
    `;
    
    // Initialize footer when DOM is ready
    function initFooter() {
        // Insert footer at the end of body
        document.body.insertAdjacentHTML('beforeend', footerHTML);
        document.body.insertAdjacentHTML('beforeend', schemaHTML);
        
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

