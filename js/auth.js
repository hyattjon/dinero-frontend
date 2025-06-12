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
            
            // Show loading indicator
            document.getElementById('register-message').innerHTML = 
                `<div class="alert alert-info">Creating your account...</div>`;
            
            fetch(`${CONFIG.BACKEND_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            })
            .then(response => {
                return response.json().then(data => {
                    return { ...data, status: response.status, ok: response.ok };
                });
            })
            .then(data => {
                if (data.success) {
                    // Close the registration modal
                    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
                    registerModal.hide();
                    
                    // Show success message on the login page with Google sign-in instructions
                    document.getElementById('login-message').innerHTML = `
                        <div class="alert alert-success">
                            <h5>Account Created Successfully!</h5>
                            <p>You can now sign in with your email and password, or use the Google Sign-In button for faster access.</p>
                            <p>Google Sign-In uses the same email address: <strong>${email}</strong></p>
                        </div>
                    `;
                    
                    // Clear the registration form
                    document.getElementById('register-form').reset();
                    
                    // Optional: Add focus to the email field in the login form with the email pre-filled
                    const loginEmail = document.getElementById('email');
                    if (loginEmail) {
                        loginEmail.value = email;
                        document.getElementById('password').focus();
                    }
                } else {
                    document.getElementById('register-message').innerHTML = 
                        `<div class="alert alert-danger">${data.error || 'Registration failed. Please try again.'}</div>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('register-message').innerHTML = 
                    `<div class="alert alert-danger">An error occurred. Please try again.</div>`;
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
    // Clear any existing messages
    document.getElementById('login-message').innerHTML = '';
    
    // Show loading message
    document.getElementById('login-message').innerHTML = 
        `<div class="alert alert-info">Signing in with Google...</div>`;
    
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
            
            // Check if this is a new user and show welcome message if needed
            if (data.is_new_user) {
                // Store a flag to show welcome message
                localStorage.setItem('show_welcome', 'true');
            }
            
            // Redirect to dashboard or the page they were trying to access
            const redirectTo = localStorage.getItem('redirect_after_login') || 'dashboard.html';
            localStorage.removeItem('redirect_after_login'); // Clean up
            window.location.href = redirectTo;
        } else if (data.is_new_user) {
            // This is a special case where a new user couldn't be created
            document.getElementById('login-message').innerHTML = 
                `<div class="alert alert-warning">
                    <h5>Welcome ${data.name || 'New User'}!</h5>
                    <p>We need to create an account for you first.</p>
                    <button class="btn btn-primary" onclick="createAccountFromGoogle('${data.email}', '${data.name}')">
                        Create Your Account
                    </button>
                </div>`;
        } else {
            document.getElementById('login-message').innerHTML = 
                `<div class="alert alert-danger">${data.error || 'Authentication failed'}</div>`;
        }
    })
    .catch(error => {
        document.getElementById('login-message').innerHTML = 
            `<div class="alert alert-danger">
                <h5>Sign In Error</h5>
                <p>Unable to sign in with Google. Please try again or create an account.</p>
                <a href="register.html" class="btn btn-primary btn-sm">Create Account</a>
            </div>`;
        console.error('Google auth error:', error);
    });
};

// Helper function to create account from Google info
function createAccountFromGoogle(email, name) {
    // Show loading
    document.getElementById('login-message').innerHTML = 
        `<div class="alert alert-info">Creating your account...</div>`;
    
    // Generate a random secure password for backend account
    const password = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);
    
    fetch(`${CONFIG.BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            name: name || 'Card Matcher User',
            email: email, 
            password: password,
            auth_provider: 'google'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('login-message').innerHTML = 
                `<div class="alert alert-success">
                    <p>Account created successfully! You can now sign in with Google.</p>
                    <div id="g_id_onload"
                        data-client_id="532917175955-6juljj8mjulvtmotmb2ga25q73qnl1a0.apps.googleusercontent.com"
                        data-callback="handleGoogleSignIn"
                        data-auto_prompt="true">
                    </div>
                    <div class="g_id_signin"
                        data-type="standard"
                        data-size="large"
                        data-theme="outline"
                        data-text="sign_in_with"
                        data-shape="rectangular"
                        data-logo_alignment="left">
                    </div>
                </div>`;
                
            // Reload Google Sign-In button
            google.accounts.id.initialize({
                client_id: "532917175955-6juljj8mjulvtmotmb2ga25q73qnl1a0.apps.googleusercontent.com",
                callback: handleGoogleSignIn
            });
            google.accounts.id.renderButton(
                document.getElementById("g_id_signin"),
                { theme: "outline", size: "large" }
            );
        } else {
            document.getElementById('login-message').innerHTML = 
                `<div class="alert alert-danger">
                    <p>${data.error || 'Could not create account. Please try again.'}</p>
                    <a href="register.html" class="btn btn-primary btn-sm">Register Manually</a>
                </div>`;
        }
    })
    .catch(error => {
        document.getElementById('login-message').innerHTML = 
            `<div class="alert alert-danger">
                <p>Error creating account. Please try registering manually.</p>
                <a href="register.html" class="btn btn-primary btn-sm">Register Manually</a>
            </div>`;
        console.error('Registration error:', error);
    });
}

