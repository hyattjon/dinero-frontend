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
    },

    // Additional configuration
    PLAID_ENV: "sandbox",
    APP_NAME: "Card Matcher",

    // Google API configuration
    GOOGLE_CLIENT_ID: "532917175955-6juljj8mjulvtmotmb2ga25q73qnl1a0.apps.googleusercontent.com"  // Your Google client ID
};

console.log(`🔌 API Endpoint: ${CONFIG.BACKEND_URL} (${CONFIG.IS_LOCAL ? 'local' : 'production'})`);