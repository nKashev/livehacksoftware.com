(function() {
    'use strict';
    
    const INDEXNOW_KEY = 'edb26dc8855f49cc96baaedc32772bf8';
    const HOST = 'lifehacksoftware.com';
    
    // Функция за изпращане на URL към IndexNow
    function submitToIndexNow(url) {
        const endpoint = 'https://api.indexnow.org/indexnow';
        
        const payload = {
            host: HOST,
            key: INDEXNOW_KEY,
            keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
            urlList: [url]
        };
        
        // Не използваме fetch защото CSP може да блокира
        // Вместо това използваме Image beacon метод
        const img = new Image();
        const params = new URLSearchParams({
            url: url,
            key: INDEXNOW_KEY
        });
        img.src = `${endpoint}?${params.toString()}`;
    }
    
    // Автоматично изпращане на текущата страница при зареждане
    function autoSubmitCurrentPage() {
        const currentUrl = window.location.href;
        
        // Изпрати само за production (не за localhost)
        if (window.location.hostname === HOST) {
            // Изчакай 2 секунди след зареждане
            setTimeout(() => {
                submitToIndexNow(currentUrl);
            }, 2000);
        }
    }
    
    // Стартирай при зареждане
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoSubmitCurrentPage);
    } else {
        autoSubmitCurrentPage();
    }
})();