// Theme Toggle — Light/Dark Mode
// Respects system preference, persists to localStorage

(function() {
  'use strict';
  
  const STORAGE_KEY = 'mirrorborn-theme';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  
  // Get current theme from localStorage or system preference
  function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    
    // Respect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return THEME_LIGHT;
    }
    
    return THEME_DARK; // Default
  }
  
  // Apply theme to document
  function applyTheme(theme) {
    if (theme === THEME_LIGHT) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
  
  // Toggle theme
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'light' 
      ? THEME_LIGHT 
      : THEME_DARK;
    const next = current === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    
    // Update toggle button icon if it exists
    updateToggleButton(next);
  }
  
  // Update toggle button appearance
  function updateToggleButton(theme) {
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    
    if (theme === THEME_LIGHT) {
      button.innerHTML = '🌙'; // Moon icon for "switch to dark"
      button.setAttribute('aria-label', 'Switch to dark mode');
      button.setAttribute('title', 'Dark mode');
    } else {
      button.innerHTML = '☀️'; // Sun icon for "switch to light"
      button.setAttribute('aria-label', 'Switch to light mode');
      button.setAttribute('title', 'Light mode');
    }
  }
  
  // Initialize theme immediately (prevent flash)
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);
  
  // Expose toggle function globally
  window.toggleTheme = toggleTheme;
  
  // Update button on load
  document.addEventListener('DOMContentLoaded', function() {
    updateToggleButton(initialTheme);
  });
  
  // Listen for system preference changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const newTheme = e.matches ? THEME_DARK : THEME_LIGHT;
        applyTheme(newTheme);
        updateToggleButton(newTheme);
      }
    });
  }
})();
