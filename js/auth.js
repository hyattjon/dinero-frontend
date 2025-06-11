// Authentication related functionality

document.addEventListener('DOMContentLoaded', function() {
    // Setup event listeners safely
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            fetch(`${CONFIG.BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => {
                return response.json().then(data => {
                    return { ...data, status: response.status };
                });
            })
            .then(data => {
                if (data.success) {
                    localStorage.setItem('auth_token', data.token);
                    localStorage.setItem('user_name', data.name);
                    window.location.href = 'dashboard.html';
                } else {
                    let errorMessage = data.error || "Login failed";
                    
                    // Handle specific error cases
                    if (errorMessage.includes("Email not confirmed")) {
                        errorMessage = "Please confirm your email address before logging in. Check your inbox for a confirmation link.";
                    }
                    
                    document.getElementById('login-message').innerHTML = 
                        `<div class="alert alert-danger">${errorMessage}</div>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('login-message').innerHTML = 
                    `<div class="alert alert-danger">Login failed. Please try again.</div>`;
            });
        });
    }
    
    const registerToggle = document.getElementById('register-toggle');
    if (registerToggle) {
        registerToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
            registerModal.show();
        });
    }
    
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;
            
            if (password !== confirmPassword) {
                document.getElementById('register-message').innerHTML = 
                    `<div class="alert alert-danger">Passwords do not match</div>`;
                return;
            }

            if (password.length < 6) {
                document.getElementById('register-message').innerHTML = 
                    `<div class="alert alert-danger">Password should be at least 6 characters.</div>`;
                return;
            }
            
            fetch(`${CONFIG.BACKEND_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            })
            .then(response => {
                // Log the raw response for debugging
                console.log('Registration response status:', response.status);
                
                return response.json().then(data => {
                    console.log('Registration response data:', data);
                    return { ...data, status: response.status, ok: response.ok };
                }).catch(err => {
                    console.error('Error parsing JSON response:', err);
                    return { error: 'Invalid server response', status: response.status, ok: false };
                });
            })
            .then(data => {
                if (data.ok && data.success) {
                    document.getElementById('register-message').innerHTML = 
                        `<div class="alert alert-success">Registration successful! You can now sign in.</div>`;
                    
                    // Close modal after 2 seconds
                    setTimeout(() => {
                        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
                        document.getElementById('email').value = email;
                        document.getElementById('password').value = '';
                    }, 2000);
                } else {
                    // Show the error message from the server if available
                    const errorMessage = data.error || "Registration failed. Please try again.";
                    document.getElementById('register-message').innerHTML = 
                        `<div class="alert alert-danger">${errorMessage}</div>`;
                }
            })
            .catch(error => {
                console.error('Registration error:', error);
                document.getElementById('register-message').innerHTML = 
                    `<div class="alert alert-danger">Registration failed. Please try again later.</div>`;
            });
        });
    }

    checkAuthStatus();
});

// Function to check authentication status
function checkAuthStatus() {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
        // If we're on the login page but already logged in, redirect to dashboard
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        // If not logged in and trying to access protected pages
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'login.html';
        }
    }
}

// Expose the function globally so Google can call it
window.handleGoogleSignIn = function(response) {
    // Send the ID token to your backend
    const id_token = response.credential;
    
    fetch(`${CONFIG.BACKEND_URL}/auth/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: id_token })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store token and redirect
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('user_name', data.name);
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('login-message').innerHTML = 
                `<div class="alert alert-danger">${data.error || 'Authentication failed'}</div>`;
        }
    })
    .catch(error => {
        document.getElementById('login-message').innerHTML = 
            `<div class="alert alert-danger">Sign-in failed. Please try again.</div>`;
        console.error('Error:', error);
    });
};

// Logout functionality
function logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    window.location.href = 'login.html';
}

