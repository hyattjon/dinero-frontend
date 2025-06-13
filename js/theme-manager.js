/**
 * Theme Manager - Controls theme selection and application
 * for Card Matcher application
 */
const ThemeManager = {
    // Current active theme
    currentTheme: null,
    
    /**
     * Initialize the theme manager
     */
    init: function() {
        console.log('ThemeManager initializing...');
        // Load saved theme or use default
        this.loadTheme();
        console.log('ThemeManager initialized');
    },
    
    /**
     * Load the saved theme or use default
     */
    loadTheme: function() {
        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem('card-matcher-theme');
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Default theme
            this.currentTheme = 'default';
        }
        
        console.log('Theme loaded:', this.currentTheme);
    },
    
    /**
     * Preview a theme snippet without saving it
     * @param {string} snippetName - Name of the theme to preview
     */
    previewSnippet: function(snippetName) {
        // Check if the snippet exists
        if (typeof ThemeSnippets === 'undefined') {
            console.error('Theme snippets not loaded. Make sure theme-snippets.js is included before theme-manager.js');
            return;
        }
        
        if (!ThemeSnippets[snippetName]) {
            console.error(`Theme snippet "${snippetName}" not found. Available snippets:`, Object.keys(ThemeSnippets));
            return;
        }
        
        // Create a style element to preview the theme
        const previewStyle = document.createElement('style');
        previewStyle.id = 'theme-preview-style';
        previewStyle.textContent = ThemeSnippets[snippetName];
        
        // Remove any existing preview
        const existingPreview = document.getElementById('theme-preview-style');
        if (existingPreview) {
            existingPreview.remove();
        }
        
        // Add the preview style
        document.head.appendChild(previewStyle);
        
        // Show notification
        console.log(`🎨 Previewing "${snippetName}" theme. Copy the CSS to theme.css to make it permanent.`);
        
        // Add a visual indicator
        const indicator = document.createElement('div');
        indicator.style = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #000;
            color: #fff;
            padding: 10px 15px;
            border-radius: 4px;
            z-index: 9999;
            font-family: sans-serif;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        indicator.textContent = `Previewing: ${snippetName}`;
        
        // Add option to apply permanently
        const applyBtn = document.createElement('button');
        applyBtn.textContent = 'Copy CSS';
        applyBtn.style = `
            margin-left: 10px;
            background: #0052cc;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
        `;
        applyBtn.onclick = function() {
            // Copy the CSS to clipboard
            navigator.clipboard.writeText(ThemeSnippets[snippetName])
                .then(() => {
                    applyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        document.body.removeChild(indicator);
                    }, 1500);
                })
                .catch(() => {
                    console.error('Failed to copy CSS');
                    applyBtn.textContent = 'Failed to copy';
                });
        };
        
        indicator.appendChild(applyBtn);
        document.body.appendChild(indicator);
        
        // Remove after 10 seconds
        setTimeout(() => {
            if (document.body.contains(indicator)) {
                document.body.removeChild(indicator);
            }
        }, 10000);
        
        return `Theme "${snippetName}" applied temporarily. Copy the CSS to make it permanent.`;
    }
};

// Define the global list themes function
window.listThemes = function() {
    if (typeof ThemeSnippets === 'undefined') {
        console.error('Theme snippets not loaded. Make sure theme-snippets.js is included before theme-manager.js');
        return [];
    }
    
    console.log("Available themes:", Object.keys(ThemeSnippets));
    return Object.keys(ThemeSnippets);
};

// Initialize the theme manager
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});

// Make ThemeManager available globally
window.ThemeManager = ThemeManager;