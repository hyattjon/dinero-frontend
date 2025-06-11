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
    GOOGLE_CLIENT_ID: "532917175955-6juljj8mjulvtmotmb2ga25q73qnl1a0.apps.googleusercontent.com",  // Your Google client ID

    // Add Stripe publishable key
    STRIPE_PUBLISHABLE_KEY: "pk_test_your_stripe_publishable_key",
    
    // Helper function to check user's subscription tier
    getUserSubscriptionTier: async function() {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) return 'free';
            
            const response = await fetch(`${this.BACKEND_URL}/subscription`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) return 'free';
            
            const data = await response.json();
            return data.success ? data.subscription.tier : 'free';
        } catch (error) {
            console.error("Error getting subscription tier:", error);
            return 'free';
        }
    },
    
    // Check if user can access premium feature
    canAccessFeature: async function(requiredTier) {
        const tier = await this.getUserSubscriptionTier();
        if (requiredTier === 'basic') {
            return tier === 'basic' || tier === 'pro';
        } else if (requiredTier === 'pro') {
            return tier === 'pro';
        }
        return true; // Free features accessible to all
    }
};

console.log(`🔌 API Endpoint: ${CONFIG.BACKEND_URL} (${CONFIG.IS_LOCAL ? 'local' : 'production'})`);