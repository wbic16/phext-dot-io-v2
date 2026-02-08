#!/usr/bin/env node
/**
 * Mirrorborn Production Build Script
 * 
 * Minifies CSS and JS, strips console.logs, optimizes for production.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '../public');
const DIST_DIR = path.join(__dirname, '../dist');
const CSS_DIR = path.join(PUBLIC_DIR, 'css');
const JS_DIR = path.join(PUBLIC_DIR, 'js');

console.log('🦋 Mirrorborn Production Build');
console.log('================================\n');

// Create dist directory
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
  console.log('✓ Created dist directory');
}

// Copy public directory structure
console.log('📦 Copying public files...');
execSync(`cp -r ${PUBLIC_DIR}/* ${DIST_DIR}/`, { stdio: 'inherit' });
console.log('✓ Files copied\n');

// Minify CSS
console.log('🎨 Minifying CSS...');
const cssFiles = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
let cssBytes = 0;
let cssMinBytes = 0;

try {
  const CleanCSS = require('clean-css');
  const cleaner = new CleanCSS({ level: 2 });
  
  for (const file of cssFiles) {
    const input = path.join(CSS_DIR, file);
    const output = path.join(DIST_DIR, 'css', file);
    const source = fs.readFileSync(input, 'utf8');
    const result = cleaner.minify(source);
    
    if (result.errors.length > 0) {
      console.error(`✗ Error minifying ${file}:`, result.errors);
      continue;
    }
    
    fs.writeFileSync(output, result.styles);
    cssBytes += source.length;
    cssMinBytes += result.styles.length;
    
    const saved = ((1 - result.styles.length / source.length) * 100).toFixed(1);
    console.log(`  ✓ ${file}: ${(source.length/1024).toFixed(1)}KB → ${(result.styles.length/1024).toFixed(1)}KB (-${saved}%)`);
  }
  
  const totalSaved = ((1 - cssMinBytes / cssBytes) * 100).toFixed(1);
  console.log(`\n  Total CSS: ${(cssBytes/1024).toFixed(1)}KB → ${(cssMinBytes/1024).toFixed(1)}KB (-${totalSaved}%)\n`);
} catch (err) {
  console.warn('⚠ clean-css not installed, skipping CSS minification');
  console.warn('  Run: npm install --save-dev clean-css\n');
}

// Minify JS and strip console.logs
console.log('⚡ Minifying JavaScript...');
const jsFiles = fs.readdirSync(JS_DIR).filter(f => f.endsWith('.js'));
let jsBytes = 0;
let jsMinBytes = 0;

try {
  const { minify } = require('terser');
  
  for (const file of jsFiles) {
    const input = path.join(JS_DIR, file);
    const output = path.join(DIST_DIR, 'js', file);
    const source = fs.readFileSync(input, 'utf8');
    
    minify(source, {
      compress: {
        drop_console: true,  // Strip console.logs
        dead_code: true,
        unused: true
      },
      mangle: false,  // Keep function names for debugging
      format: {
        comments: false  // Strip comments
      }
    }).then(result => {
      if (result.error) {
        console.error(`✗ Error minifying ${file}:`, result.error);
        return;
      }
      
      fs.writeFileSync(output, result.code);
      jsBytes += source.length;
      jsMinBytes += result.code.length;
      
      const saved = ((1 - result.code.length / source.length) * 100).toFixed(1);
      console.log(`  ✓ ${file}: ${(source.length/1024).toFixed(1)}KB → ${(result.code.length/1024).toFixed(1)}KB (-${saved}%)`);
    });
  }
  
  // Wait a bit for async operations
  setTimeout(() => {
    const totalSaved = ((1 - jsMinBytes / jsBytes) * 100).toFixed(1);
    console.log(`\n  Total JS: ${(jsBytes/1024).toFixed(1)}KB → ${(jsMinBytes/1024).toFixed(1)}KB (-${totalSaved}%)\n`);
    
    console.log('✅ Build complete!');
    console.log(`\nOutput: ${DIST_DIR}/`);
    console.log('Deploy: rsync -avz dist/ user@server:/path/to/webroot/\n');
  }, 1000);
  
} catch (err) {
  console.warn('⚠ terser not installed, skipping JS minification');
  console.warn('  Run: npm install --save-dev terser\n');
  
  console.log('✅ Build complete (unminified)!');
  console.log(`\nOutput: ${DIST_DIR}/`);
}
