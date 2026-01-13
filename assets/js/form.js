// Form handling
(function () {
	'use strict';

	function initContactForm() {
		const form = document.getElementById('contactForm');
		const successMsg = document.getElementById('form-success');
		const errorMsg = document.getElementById('form-error');

		if (!form) {
			console.log('Contact form not found on this page');
			return;
		}

		form.addEventListener('submit', async function (e) {
			e.preventDefault();

			const submitBtn = form.querySelector('button[type="submit"]');
			const originalText = submitBtn.textContent;

			// Disable button and show loading
			submitBtn.disabled = true;
			submitBtn.textContent = 'Изпраща се...';

			// Hide previous messages
			if (successMsg) successMsg.classList.remove('show');
			if (errorMsg) errorMsg.classList.remove('show');

			try {
				const formData = new FormData(form);

				const response = await fetch('https://api.web3forms.com/submit', {
					method: 'POST',
					body: formData
				});

				const data = await response.json();

				if (data.success) {
					// Show success message
					if (successMsg) {
						successMsg.classList.add('show');
						successMsg.scrollIntoView({
							behavior: 'smooth',
							block: 'center'
						});
					}

					// Reset form after a short delay
					setTimeout(() => {
						form.reset();
						if (successMsg) successMsg.classList.remove('show');
					}, 1500);
				} else {
					throw new Error(data.message || 'Грешка при изпращане');
				}
			} catch (error) {
				// Show error message
				if (errorMsg) {
					errorMsg.classList.add('show');
				}
				console.error('Form error:', error);
			} finally {
				// Re-enable button
				submitBtn.disabled = false;
				submitBtn.textContent = originalText;
			}
		});
	}

	// Wait for DOM to be ready before initializing
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initContactForm);
	} else {
		// DOM already loaded
		initContactForm();
	}
})();
