// Simple component loader
document.addEventListener('DOMContentLoaded', async function() {
    // Load components
    async function loadComponent(elementId, componentPath, authRequired = false) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        // Check authentication if required
        if (authRequired && !localStorage.getItem('auth_token')) {
            window.location.href = 'login.html';
            return;
        }
        
        try {
            const response = await fetch(componentPath);
            if (response.ok) {
                element.innerHTML = await response.text();
                
                // Execute scripts in the component
                const scripts = element.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.text = script.innerHTML;
                    document.body.appendChild(newScript);
                    script.remove();
                });
                
                // Initialize Bootstrap components after loading
                setTimeout(() => {
                    if (typeof bootstrap !== 'undefined') {
                        // Initialize dropdowns
                        const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
                        dropdownElementList.forEach(function (dropdownToggleEl) {
                            new bootstrap.Dropdown(dropdownToggleEl);
                        });
                    }
                }, 100);
            }
        } catch (error) {
            console.error(`Error loading component from ${componentPath}:`, error);
        }
    }
    
    // Determine which header to load based on authentication status
    const hasAuthToken = localStorage.getItem('auth_token') !== null;
    
    if (hasAuthToken) {
        await loadComponent('header-container', 'components/auth-header.html', true);
    } else {
        await loadComponent('header-container', 'components/public-header.html');
    }
    
    // Load footer for all pages
    await loadComponent('footer-container', 'components/footer.html');
});