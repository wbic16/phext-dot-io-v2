// Theme Toggle — Light/Dark Mode
// Persists preference to localStorage

(function() {
  const STORAGE_KEY = 'phext-theme';
  const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
  };

  // Light mode color overrides
  const lightModeStyles = `
    :root[data-theme="light"] {
      --phext-primary: #ECEFF4;
      --phext-secondary: #2E3440;
      --phext-accent: #5E81AC;
      --phext-success: #A3BE8C;
      --phext-warning: #D08770;
      --phext-error: #BF616A;
      --phext-code: #B48EAD;
    }
    
    :root[data-theme="light"] .card {
      background: rgba(46, 52, 64, 0.03);
      border-color: rgba(46, 52, 64, 0.1);
    }
    
    :root[data-theme="light"] pre {
      background: rgba(46, 52, 64, 0.05);
    }
    
    :root[data-theme="light"] .pricing-tier {
      background: rgba(46, 52, 64, 0.02);
      border-color: rgba(94, 129, 172, 0.2);
    }
  `;

  function getCurrentTheme() {
    return localStorage.getItem(STORAGE_KEY) || THEMES.DARK;
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleButton(theme);
  }

  function toggleTheme() {
    const current = getCurrentTheme();
    const next = current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setTheme(next);
  }

  function updateToggleButton(theme) {
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.textContent = theme === THEMES.DARK ? '☀️' : '🌙';
      button.setAttribute('aria-label', 
        theme === THEMES.DARK ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = lightModeStyles;
    document.head.appendChild(style);
  }

  function createToggleButton() {
    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.className = 'theme-toggle-btn';
    button.setAttribute('aria-label', 'Toggle theme');
    button.style.cssText = `
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      width: 3rem;
      height: 3rem;
      border: 2px solid var(--phext-accent);
      border-radius: 50%;
      background: var(--phext-primary);
      color: var(--phext-accent);
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      transition: all 0.2s ease;
      z-index: ${MirrorConfig.UI.THEME_TOGGLE_ZINDEX};
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', toggleTheme);
    
    document.body.appendChild(button);
    updateToggleButton(getCurrentTheme());
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    injectStyles();
    setTheme(getCurrentTheme());
    createToggleButton();
  }
})();
