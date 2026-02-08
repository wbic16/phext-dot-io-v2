/**
 * Bug #3 Fix: Token Rotation Client Helper
 * 
 * Handles:
 * - Access token storage
 * - Refresh token storage (httpOnly cookie preferred)
 * - Automatic token refresh on 401
 * - Logout
 */

(function() {
  'use strict';
  
  const AUTH_STORAGE_KEY = 'auth_tokens';
  
  // Get tokens from localStorage
  function getTokens() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error('Failed to parse auth tokens:', err);
      return null;
    }
  }
  
  // Store tokens
  function setTokens(accessToken, refreshToken) {
    const tokens = { accessToken, refreshToken };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
  }
  
  // Clear tokens (logout)
  function clearTokens() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
  
  // Refresh access token using refresh token
  async function refreshAccessToken() {
    const tokens = getTokens();
    if (!tokens || !tokens.refreshToken) {
      throw new Error('No refresh token available');
    }
    
    try {
      const response = await window._originalFetch('/api/auth/refresh', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ refreshToken: tokens.refreshToken })
      });
      
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
      
      const data = await response.json();
      setTokens(data.accessToken, tokens.refreshToken);
      return data.accessToken;
      
    } catch (err) {
      // Refresh failed - clear tokens and redirect to login
      clearTokens();
      throw err;
    }
  }
  
  // Store original fetch if not already stored
  if (!window._originalFetch) {
    window._originalFetch = window.fetch;
  }
  
  // Override fetch to include auth token and handle token refresh
  window.fetch = async function(url, options = {}) {
    // Only add auth for same-origin API requests
    if (typeof url === 'string' && url.startsWith('/api/') && url !== '/api/auth/refresh') {
      const tokens = getTokens();
      
      if (tokens && tokens.accessToken) {
        options.headers = options.headers || {};
        options.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
      }
    }
    
    // Make request
    let response = await window._originalFetch(url, options);
    
    // If 401 and we have a refresh token, try to refresh and retry
    if (response.status === 401 && typeof url === 'string' && url.startsWith('/api/')) {
      try {
        const data = await response.json();
        
        if (data.code === 'TOKEN_EXPIRED') {
          console.log('Access token expired, refreshing...');
          
          // Refresh token
          const newAccessToken = await refreshAccessToken();
          
          // Retry original request with new token
          options.headers = options.headers || {};
          options.headers['Authorization'] = `Bearer ${newAccessToken}`;
          response = await window._originalFetch(url, options);
          
          console.log('✅ Token refreshed, request retried');
        }
      } catch (err) {
        console.error('Token refresh failed:', err);
        // Redirect to login
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login?expired=true';
        }
      }
    }
    
    return response;
  };
  
  // Public API
  window.auth = {
    setTokens,
    getTokens,
    clearTokens,
    
    async logout() {
      const tokens = getTokens();
      if (tokens && tokens.refreshToken) {
        try {
          await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ refreshToken: tokens.refreshToken })
          });
        } catch (err) {
          console.error('Logout API call failed:', err);
        }
      }
      clearTokens();
      window.location.href = '/';
    },
    
    isAuthenticated() {
      const tokens = getTokens();
      return !!(tokens && tokens.accessToken);
    }
  };
  
  console.log('✅ Token rotation active');
})();
