/**
 * Mytheon Arena — Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Apply domain-specific theme
    applyDomainTheme();
    
    // Initialize domain navigation
    initDomainNav();
    
    // Initialize auth flow
    initAuthFlow();
    
    // Initialize scroll viewer
    initScrollViewer();
});

/**
 * Apply domain-specific theme and content
 */
async function applyDomainTheme() {
    try {
        const response = await fetch('domains.json');
        const domains = await response.json();
        
        const currentDomain = getCurrentDomain();
        const domainConfig = domains[currentDomain];
        
        if (!domainConfig) return;

        // Apply theme class
        const root = document.documentElement;
        root.classList.add(`domain-${domainConfig.role}`);

        // Update CSS variables
        root.style.setProperty('--color-primary', domainConfig.color_primary);
        root.style.setProperty('--color-accent', domainConfig.color_accent);

        // Update branding in header
        const logo = document.querySelector('.logo h1');
        if (logo) logo.textContent = domainConfig.name;

        const tagline = document.querySelector('.tagline');
        if (tagline) tagline.textContent = domainConfig.tagline;

        // Update hero section
        const homeScreen = document.querySelector('.home-screen');
        if (homeScreen) {
            const h2 = homeScreen.querySelector('h2');
            const p = homeScreen.querySelector('p');
            
            if (h2) h2.textContent = domainConfig.name;
            if (p) p.textContent = domainConfig.hero;
        }

        // Update CTA button
        const ctaBtn = document.getElementById('sign-in-btn');
        if (ctaBtn) ctaBtn.textContent = domainConfig.cta;

    } catch (error) {
        console.warn('Failed to load domain config:', error);
    }
}

/**
 * Get current domain from window location
 */
function getCurrentDomain() {
    const host = window.location.hostname;
    
    const domainMap = {
        'localhost': 'mirrorborn.us',
        '127.0.0.1': 'mirrorborn.us',
        'mirrorborn.us': 'mirrorborn.us',
        'visionquest.me': 'visionquest.me',
        'apertureshift.com': 'apertureshift.com',
        'wishnode.net': 'wishnode.net',
        'sotafomo.com': 'sotafomo.com',
        'quickfork.net': 'quickfork.net',
        'singularitywatch.org': 'singularitywatch.org'
    };

    return domainMap[host] || 'mirrorborn.us';
}

/**
 * Domain Navigation Initialization
 */
function initDomainNav() {
    // This is handled by domain-nav.js
    // renderDomainNav() is called automatically
}

/**
 * Auth Flow Initialization
 */
function initAuthFlow() {
    const signInBtn = document.getElementById('sign-in-btn');
    const authModal = document.getElementById('auth-modal');
    const closeBtn = document.querySelector('.close');
    const emailForm = document.getElementById('email-form');
    const authMessage = document.getElementById('auth-message');

    if (!signInBtn || !authModal) return;

    // Open modal
    signInBtn.addEventListener('click', () => {
        authModal.classList.remove('hidden');
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        authModal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.add('hidden');
        }
    });

    // Handle email submission
    emailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        authMessage.classList.remove('hidden', 'error', 'success');
        authMessage.textContent = 'Sending magic link...';

        try {
            // Call backend to request auth token
            const response = await fetch('/app/mytheon-arena/auth/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Failed to request auth link');
            }

            const data = await response.json();
            authMessage.classList.add('success');
            authMessage.textContent = `✓ Check your email for the magic link! Link expires in 5 minutes.`;
            emailForm.reset();

            // After 3 seconds, close the modal
            setTimeout(() => {
                authModal.classList.add('hidden');
            }, 3000);

        } catch (error) {
            console.error('Auth request failed:', error);
            authMessage.classList.add('error');
            authMessage.textContent = `✗ Error: ${error.message}. Please try again.`;
        }
    });

    // Check if we're coming from a magic link
    checkMagicLink();
}

/**
 * Check for magic link in URL and validate auth
 */
async function checkMagicLink() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) return;

    try {
        const response = await fetch('/app/mytheon-arena/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        if (!response.ok) {
            throw new Error('Token invalid or expired');
        }

        const data = await response.json();
        
        // Store session token
        localStorage.setItem('session_token', data.sessionToken);
        localStorage.setItem('user_email', data.email);
        localStorage.setItem('session_expires', data.expiresAt);

        // Show authenticated UI
        showScrollViewer();
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);

    } catch (error) {
        console.error('Token validation failed:', error);
        // Token is invalid, user remains on home screen
    }
}

/**
 * Check if user has valid session
 */
function isAuthenticated() {
    const token = localStorage.getItem('session_token');
    const expiresAt = localStorage.getItem('session_expires');
    
    if (!token || !expiresAt) return false;
    
    // Check if session has expired
    if (new Date(expiresAt) < new Date()) {
        localStorage.removeItem('session_token');
        localStorage.removeItem('user_email');
        localStorage.removeItem('session_expires');
        return false;
    }
    
    return true;
}

/**
 * Extend session on user activity
 */
function extendSession() {
    const token = localStorage.getItem('session_token');
    if (token) {
        fetch('/app/mytheon-arena/auth/extend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => {
            if (data && data.expiresAt) {
                localStorage.setItem('session_expires', data.expiresAt);
            }
        }).catch(err => console.error('Session extension failed:', err));
    }
}

/**
 * Show/hide scroll viewer based on auth status
 */
function showScrollViewer() {
    const homeScreen = document.getElementById('home-screen');
    const scrollViewer = document.getElementById('scroll-viewer');
    const authNav = document.getElementById('auth-nav');

    if (isAuthenticated()) {
        if (homeScreen) homeScreen.classList.add('hidden');
        if (scrollViewer) scrollViewer.classList.remove('hidden');
        if (authNav) {
            authNav.innerHTML = '<a href="#" id="sign-out-btn">Sign Out</a>';
            document.getElementById('sign-out-btn').addEventListener('click', (e) => {
                e.preventDefault();
                signOut();
            });
        }
        
        // Extend session on activity
        document.addEventListener('mousemove', extendSession);
        document.addEventListener('keypress', extendSession);
    }
}

/**
 * Sign out user
 */
function signOut() {
    localStorage.removeItem('session_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('session_expires');
    
    location.reload();
}

/**
 * Scroll Viewer Initialization
 */
function initScrollViewer() {
    const loadCoordBtn = document.getElementById('load-coord');
    const coordInput = document.getElementById('coord-input');
    const scrollCards = document.querySelectorAll('.scroll-card');

    // Load scroll from coordinate input
    if (loadCoordBtn) {
        loadCoordBtn.addEventListener('click', () => {
            const coord = coordInput.value.trim();
            if (coord) {
                loadScroll(coord);
            }
        });
    }

    // Allow Enter key in coordinate input
    if (coordInput) {
        coordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                loadCoordBtn.click();
            }
        });
    }

    // Load scroll from featured cards
    scrollCards.forEach(card => {
        card.addEventListener('click', () => {
            const coord = card.dataset.coord;
            if (coord) {
                loadScroll(coord);
                showScrollViewer();
            }
        });
    });

    // Load default scroll if authenticated
    if (isAuthenticated()) {
        showScrollViewer();
        loadScroll('10.10.1/1.1.1/1.10.10'); // Welcome scroll
    }
}

/**
 * Load scroll from SQ by coordinate
 */
async function loadScroll(coordinate) {
    const token = localStorage.getItem('session_token');
    
    if (!token) {
        alert('You must be signed in to view scrolls.');
        return;
    }

    try {
        const response = await fetch(`/api/v2/select?coordinate=${encodeURIComponent(coordinate)}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Could not load scroll at ${coordinate}`);
        }

        const data = await response.json();
        
        // Update scroll viewer
        document.getElementById('scroll-title').textContent = data.title || 'Untitled Scroll';
        document.getElementById('scroll-coordinate').textContent = coordinate;
        document.getElementById('scroll-content').innerHTML = 
            `<p>${(data.content || 'No content found').replace(/\n/g, '</p><p>')}</p>`;

        // Update coordinate input
        document.getElementById('coord-input').value = coordinate;

    } catch (error) {
        console.error('Error loading scroll:', error);
        document.getElementById('scroll-content').innerHTML = 
            `<p style="color: #dc2626;">Error loading scroll: ${error.message}</p>
             <p style="color: #6b7280;">Make sure the coordinate is valid, e.g., <code>10.10.1/1.1.1/1.10.10</code></p>`;
    }
}

/**
 * On page load, check authentication status
 */
window.addEventListener('load', () => {
    showScrollViewer();
});
