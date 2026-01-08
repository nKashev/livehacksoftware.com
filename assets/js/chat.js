// Multi-Channel Chat Widget for LifeHack Software
(function() {
    'use strict';
    
    // Create chat widget HTML
    const chatHTML = `
        <style>        
            /* Styling for the fixed buttons */
            .fixed-buttons {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 49;
            }

            /* Styling for the chat buttons container */
            .chat-buttons-container {
                position: fixed;
                bottom: 72px;
                right: 15px;
                display: flex;
                flex-direction: column-reverse;
                align-items: flex-end;
                gap: 7px;
                pointer-events: none;
            }

            .chat-buttons-container.show {
                pointer-events: auto;
            }

            /* Styling for the chat buttons */
            .chat-button {
                pointer-events: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                outline: none;
                -webkit-tap-highlight-color: transparent;
                transition: all 0.25s ease-in-out;
                transform: scale(0) translateY(20px);
                opacity: 0;
            }

            .chat-button.show {
                pointer-events: auto;
                transform: scale(1) translateY(0);
                opacity: 1;
            }

            /* Staggered animation delays */
            .chat-button:nth-child(1) { transition-delay: 0.025s; }
            .chat-button:nth-child(2) { transition-delay: 0.04s; }
            .chat-button:nth-child(3) { transition-delay: 0.055s; }
            .chat-button:nth-child(4) { transition-delay: 0.07s; }
            .chat-button:nth-child(5) { transition-delay: 0.085s; }
            .chat-button:nth-child(6) { transition-delay: 0.10s; }

            /* Reverse delays for closing */
            .chat-buttons-container:not(.show) .chat-button:nth-child(1) { transition-delay: 0.10s; }
            .chat-buttons-container:not(.show) .chat-button:nth-child(2) { transition-delay: 0.085s; }
            .chat-buttons-container:not(.show) .chat-button:nth-child(3) { transition-delay: 0.07s; }
            .chat-buttons-container:not(.show) .chat-button:nth-child(4) { transition-delay: 0.055s; }
            .chat-buttons-container:not(.show) .chat-button:nth-child(5) { transition-delay: 0.04s; }
            .chat-buttons-container:not(.show) .chat-button:nth-child(6) { transition-delay: 0.025s; }

            /* Styling for chat button icons */
            .chat-button svg {
                width: 100%;
                height: 100%;
                fill: #ffffff;
                stroke: none;
            }

            /* Styling for the chat button labels */
            .chat-label {
                display: none;
                position: absolute;
                right: 55px;
                margin-top: 5px;
                text-align: left;
                font-size: 12px;
                color: var(--text-light);
                background: var(--light-gray);
                padding: 5px 8px;
                border-radius: 4px;
                white-space: nowrap;
            }

            .chat-activator {
                position: fixed;
                bottom: 15px;
                right: 15px;
                width: 50px;
                height: 50px;
                color: var(--white);
                background-color: var(--primary);
                border-radius: 50%;
                border: 1px solid var(--white);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                z-index: 50;
                overflow: hidden;
                outline: none;
                -webkit-tap-highlight-color: transparent;
            }

            .chat-activator.activated {
                /* background-color: var(--primary); */
                transform: rotate(180deg);
                width: 50px;
                height: 50px;
            }

            /* Profile image styling */
            .profile-img {
                // width: 95px;
                // height: auto;
                font-size: 27px;
                transition: opacity 0.3s ease;
            }

            /* Close icon styling */
            .close-icon {
                position: absolute;
                font-size: 35px;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .chat-activator.activated .profile-img {
                opacity: 0;
            }

            .chat-activator.activated .close-icon {
                opacity: 1;
            }

            /* Shine effect */
            .chat-activator::after {
                content: "";
                position: absolute;
                top: 0;
                left: -75%;
                width: 50%;
                height: 100%;
                background: linear-gradient(120deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.6) 50%,
                        rgba(255, 255, 255, 0) 100%);
                transform: skewX(-25deg);
                animation: shine 3s infinite;
            }

            @keyframes shine {
                0% {
                    left: -75%;
                }
                20% {
                    left: 125%;
                }
                100% {
                    left: 125%;
                }
            }
        </style>

        <!-- Chat Buttons Container -->
        <div class="fixed-buttons chat-buttons-container" id="chat-buttons">
            <!-- Chat Button 1 -->
            <div class="chat-button" id="chat-button-1" style="background-color: white; border: 1px solid #000;">
                <a href="tel:+359899807751" target="_blank">
                    <img src="https://reformeracademy.pro/wp-content/uploads/2025/09/phone-img.png" alt="Phone" width="45"
                        style="padding-top: 6px;">
                </a>
                <div class="chat-label">Телефон</div>
            </div>
            
            <!-- Chat Button 2 -->
            <!-- <div class="chat-button" id="chat-button-2" style="background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);">
                <a href="https://ig.me/m/iva_reformeracademy" target="_blank">
                    <svg aria-hidden="true" class="ico_d" viewBox="3 -1 34 34" fill="none"
                        xmlns="http://www.w3.org/2000/svg" alt="Instagram">
                        <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"
                            d="M18.3682 12.0225H14.7069L14.7072 12.0146H8.34406C7.68102 12.0146 7.37264 12.8369 7.87214 13.2729L12.3314 17.1655L12.3349 17.1575L14.2487 18.8409L15.5297 20.0303L15.8136 30.1568C15.8335 30.8679 16.7223 31.1766 17.1788 30.6311L18.1515 29.4688L18.1501 29.4639L23.0436 23.4746L23.042 23.4662L27.0348 18.6748L27.0342 18.6702L31.5963 13.1853C31.9852 12.7178 31.6527 12.0088 31.0446 12.0088H26.8826L26.8812 12.0117H22.4407C22.4384 12.0117 22.4361 12.0154 22.4339 12.0225H22.4305L22.4307 12.0166H18.3682V12.0225ZM22.144 22.3959L22.1417 22.3907L26.4497 17.1663L26.4485 17.1572C26.8174 16.7145 28.1257 14.9555 28.2462 14.748L26.9385 15.4023L26.9341 15.4013L22.3595 17.6036L22.3592 17.6022L18.7611 19.3095L18.7628 19.3125L18.5032 19.4318L18.2248 19.5631L17.9411 19.6897C17.6515 19.764 17.0784 20.0395 17.0784 20.5547C17.0784 21.0538 17.192 25.532 17.2547 27.9372C17.2572 28.0334 17.373 28.0799 17.442 28.0129L17.6881 27.7738L22.144 22.3959ZM26.5753 14.0135L26.5753 14.0117L27.625 13.4429H27.3214H14.6612L14.6611 13.445H10.3521L12.4872 15.351L12.487 15.3582L16.0313 18.4673C16.3197 18.7229 16.6615 18.7989 16.9921 18.6007L17.5635 18.2922L22.2794 16.0459L22.2799 16.048L26.5753 14.0135Z"
                            fill="white"></path>
                    </svg>
                </a>
                <div class="chat-label">Instagram</div>
            </div> -->
            
            <!-- Chat Button 3 -->
            <div class="chat-button" id="chat-button-3" style="background-color: #7360F2; padding-top: 7px;">
                <a href="viber://chat/?number=%2B359899807751" target="_blank">
                    <img src="https://reformeracademy.pro/wp-content/uploads/2025/09/viber.svg" alt="Viber" width="35">
                </a>
                <div class="chat-label">Viber</div>
            </div>
            
            <!-- Chat Button 4 -->
            <!-- <div class="chat-button" id="chat-button-4" style="background: #006AFF;">
                <a href="https://m.me/332556250887233" target="_blank">
                    <svg viewBox="0 -1 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        alt="Messenger">
                        <path
                            d="M16 6C9.925 6 5 10.56 5 16.185c0 3.205 1.6 6.065 4.1 7.932V28l3.745-2.056c1 .277 2.058.426 3.155.426 6.075 0 11-4.56 11-10.185C27 10.56 22.075 6 16 6zm1.093 13.716l-2.8-2.988-5.467 2.988 6.013-6.383 2.868 2.988 5.398-2.987-6.013 6.383z" />
                    </svg>
                </a>
                <div class="chat-label">Messenger</div>
            </div> -->
            
            <!-- Chat Button 5 -->
            <div class="chat-button" id="chat-button-5" style="background-color: #25D366;">
		        <a href="https://wa.me/359899807751" target="_blank">
			        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" alt="WhatsApp">
				        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"></path>
			        </svg>
		        </a>
		        <div class="chat-label">WhatsApp</div>
		    </div>

            <!-- Chat Button 6 -->
            <div class="chat-button" id="chat-button-6" style="background-color: #dd4b39;">
                <a href="mailto:office@lifehacksoftware.com?subject=Онлайн%20клиент" target="_blank">
                    <img src="https://reformeracademy.pro/wp-content/uploads/2025/09/email.svg" alt="Email" width="32">
                </a>
                <div class="chat-label">Email</div>
            </div>
        </div>

        <!-- Activator Button -->
        <div class="chat-activator" id="chat-activator">
            <i class="fas fa-comments profile-img"></i>
            <!-- <img class="profile-img" src="images/logo.svg" alt="Chat options"> -->
            <i class="fas fa-times close-icon"></i>
        </div>
    `;
    
    // Initialize chat widget when DOM is ready
    function initChat() {
        // Insert chat widget into page
        document.body.insertAdjacentHTML('beforeend', chatHTML);
        
        // Get elements
        const chatActivator = document.getElementById('chat-activator');
        const chatButtons = document.getElementById('chat-buttons');
        const chatButtonElements = document.querySelectorAll('.chat-button');
        let isOpen = false;
        let isAnimating = false;

        chatActivator.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            if (!isOpen) {
                // Opening animation
                chatButtons.classList.add('show');
                chatActivator.classList.add('activated');
                
                chatButtonElements.forEach((button) => {
                    button.classList.add('show');
                });
                
                setTimeout(() => {
                    isAnimating = false;
                    isOpen = true;
                }, 400);
            } else {
                // Closing animation
                chatActivator.classList.remove('activated');
                
                chatButtonElements.forEach((button) => {
                    button.classList.remove('show');
                });
                
                setTimeout(() => {
                    chatButtons.classList.remove('show');
                    isAnimating = false;
                    isOpen = false;
                }, 350);
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!chatActivator.contains(e.target) && !chatButtons.contains(e.target) && isOpen && !isAnimating) {
                chatActivator.click();
            }
        });
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChat);
    } else {
        initChat();
    }
})();