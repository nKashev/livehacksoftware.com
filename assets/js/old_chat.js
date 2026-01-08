// Chat Widget for LifeHack Software
(function() {
    'use strict';
    
    // Create chat widget HTML
    const chatHTML = `
        <div class="chat-widget" id="chatWidget">
            <button class="chat-toggle" id="chatToggle" aria-label="Toggle chat">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </button>
            <div class="chat-box" id="chatBox">
                <div class="chat-header">
                    <img src="images/logo.svg" alt="LifeHack" class="chat-avatar">
                    <div class="chat-header-text">
                        <h4>LifeHack Support</h4>
                        <p>Обикновено отговаряме до 5 минути</p>
                    </div>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="chat-message bot">
                        <div class="message-bubble">
                            Здравейте! Как мога да ви помогна днес?
                        </div>
                    </div>
                </div>
                <div class="chat-input">
                    <form id="chatForm">
                        <input type="text" id="chatInput" placeholder="Напишете съобщение..." autocomplete="off" required>
                        <button type="submit">Изпрати</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Initialize chat widget when DOM is ready
    function initChat() {
        // Insert chat widget into page
        document.body.insertAdjacentHTML('beforeend', chatHTML);
        
        // Get elements
        const chatToggle = document.getElementById('chatToggle');
        const chatBox = document.getElementById('chatBox');
        const chatForm = document.getElementById('chatForm');
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');
        
        // Toggle chat box
        chatToggle.addEventListener('click', function() {
            chatBox.classList.toggle('active');
            if (chatBox.classList.contains('active')) {
                chatInput.focus();
            }
        });
        
        // Handle message submission
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const message = chatInput.value.trim();
            if (!message) return;
            
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot response (placeholder for future integration)
            setTimeout(function() {
                const botResponse = 'Благодаря за съобщението! Нашият екип ще се свърже с вас скоро.';
                addMessage(botResponse, 'bot');
            }, 1000);
        });
        
        // Add message function
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}`;
            messageDiv.innerHTML = `<div class="message-bubble">${escapeHtml(text)}</div>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Escape HTML to prevent XSS
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChat);
    } else {
        initChat();
    }
})();