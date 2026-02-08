#!/bin/bash
# phext.io Build Script - R17 Item #9
# Bundles frontend assets for deployment

set -e

echo "=== phext.io Build Script ==="
echo ""

# Configuration
BUILD_DIR="dist"
PUBLIC_DIR="public"
VERSION=$(date +%Y%m%d-%H%M%S)

# Clean previous build
echo "1. Cleaning previous build..."
rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR

# Copy public assets
echo "2. Copying public assets..."
cp -r $PUBLIC_DIR/* $BUILD_DIR/

# Minify CSS (if uglify-css is installed, otherwise copy as-is)
echo "3. Processing CSS..."
if command -v uglifycss &> /dev/null; then
    for css in $BUILD_DIR/css/*.css; do
        uglifycss $css --output $css
        echo "   Minified: $(basename $css)"
    done
else
    echo "   (uglifycss not found, skipping minification)"
fi

# Minify JS (if uglify-js is installed, otherwise copy as-is)
echo "4. Processing JavaScript..."
if command -v uglifyjs &> /dev/null; then
    for js in $BUILD_DIR/js/*.js; do
        uglifyjs $js -c -m -o $js
        echo "   Minified: $(basename $js)"
    done
else
    echo "   (uglifyjs not found, skipping minification)"
fi

# Generate version file
echo "5. Generating version file..."
cat > $BUILD_DIR/version.txt <<EOF
Build: $VERSION
Date: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Git: $(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
EOF

# Calculate bundle size
echo "6. Bundle statistics..."
TOTAL_SIZE=$(du -sh $BUILD_DIR | cut -f1)
CSS_SIZE=$(du -sh $BUILD_DIR/css 2>/dev/null | cut -f1 || echo "0")
JS_SIZE=$(du -sh $BUILD_DIR/js 2>/dev/null | cut -f1 || echo "0")

echo ""
echo "=== Build Complete ==="
echo "Version: $VERSION"
echo "Total size: $TOTAL_SIZE"
echo "CSS size: $CSS_SIZE"
echo "JS size: $JS_SIZE"
echo "Output: $BUILD_DIR/"
echo ""
echo "To deploy: rsync -avz $BUILD_DIR/ user@server:/var/www/phext.io/"
