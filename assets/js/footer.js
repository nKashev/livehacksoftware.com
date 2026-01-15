// Footer Widget for LifeHack Software
(function () {
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
                            <li><a href="/about/" data-page="about">За нас</a></li>
                            <li><a href="/services/" data-page="services">Услуги</a></li>
                            <!-- <li><a href="/portfolio/" data-page="portfolio">Портфолио</a></li>
                            <li><a href="/blog/" data-page="blog">Блог</a></li> -->
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
                            <li><a href="/privacy/" data-page="privacy">Политика за поверителност</a></li>
                            <li><a href="/terms/" data-page="terms">Общи условия</a></li>
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
                    <p>© 2025<span id="current-year"></span> LifeHack Software. Всички права запазени.</p>
                    <p>&nbsp;</p>
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
  "name": "LifeHack Software",
  "url": "https://lifehacksoftware.com",
  "logo": "https://lifehacksoftware.com/assets/images/logo_no_bg.png",
  "description": "LifeHack Software предоставя софтуерна разработка, уеб дизайн и изработка на сайтове, QA тестване, SEO оптимизация и дигитален маркетинг за бизнес клиенти.",
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





