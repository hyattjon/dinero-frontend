// filepath: /Users/jonathanhyatt/dinero/dinero-frontend/js/config.js
const CONFIG = {
    // Auto-detect environment and use appropriate URL
    BACKEND_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5001'  // Local development
        : 'https://dinero-backend-deeac4fe8d4e.herokuapp.com',  // Production
    
    // Environment indicator
    IS_LOCAL: window.location.hostname === 'localhost',
    
    // Optional: force local backend even in production (for testing)
    forceLocal: function() {
        this.BACKEND_URL = 'http://localhost:5001';
        console.log('⚠️ Forcing local backend connection');
    }
};

console.log(`🔌 API Endpoint: ${CONFIG.BACKEND_URL} (${CONFIG.IS_LOCAL ? 'local' : 'production'})`);