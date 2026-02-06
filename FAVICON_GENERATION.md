# Favicon Generation Guide — Chrys 🦋

Convert `public/favicon.svg` to multi-resolution raster formats for broad browser support.

## Required Sizes

| Size | Format | Purpose |
|------|--------|---------|
| 16×16 | PNG | Browser tabs (legacy) |
| 32×32 | PNG | Browser tabs (HD) |
| 48×48 | PNG | Windows taskbar |
| 180×180 | PNG | Apple Touch Icon (iOS) |
| 512×512 | PNG | PWA manifest (future) |

## Generation Commands

### Using ImageMagick (if available)
```bash
cd /source/phext-dot-io-v2/public

# 16x16
convert -background none favicon.svg -resize 16x16 favicon-16.png

# 32x32
convert -background none favicon.svg -resize 32x32 favicon-32.png

# 48x48
convert -background none favicon.svg -resize 48x48 favicon-48.png

# 180x180 (Apple)
convert -background none favicon.svg -resize 180x180 apple-touch-icon.png

# 512x512 (PWA)
convert -background none favicon.svg -resize 512x512 icon-512.png

# Generate multi-size .ico
convert favicon-16.png favicon-32.png favicon-48.png favicon.ico
```

### Using Inkscape (alternative)
```bash
# Export to PNG at different resolutions
inkscape favicon.svg --export-filename=favicon-16.png --export-width=16
inkscape favicon.svg --export-filename=favicon-32.png --export-width=32
inkscape favicon.svg --export-filename=apple-touch-icon.png --export-width=180
```

### Using Online Tool (if no local tools)
1. Upload `favicon.svg` to https://realfavicongenerator.net
2. Download generated package
3. Extract to `public/` directory

## HTML Integration

Add to `<head>` of all pages:

```html
<!-- Modern browsers -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<!-- Fallback for browsers without SVG support -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Legacy .ico for old IE -->
<link rel="shortcut icon" href="/favicon.ico">
```

## Verification Checklist

After generating:
- [ ] All PNG files exist in `public/`
- [ ] .ico file contains 16×16, 32×32, 48×48
- [ ] Apple touch icon is 180×180
- [ ] File sizes reasonable (<10KB each)
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on iOS device (check home screen icon)

## Browser Testing

### Desktop
- [ ] Chrome: Tab icon shows lattice
- [ ] Firefox: Tab icon shows lattice
- [ ] Safari: Tab icon shows lattice
- [ ] Edge: Tab icon shows lattice

### Mobile
- [ ] Safari iOS: Add to home screen → check icon
- [ ] Chrome Android: Add to home screen → check icon

---

**Status:** SVG favicon exists ✓ | Raster conversion pending  
**Blocker:** Need ImageMagick or manual generation  
**Owner:** Chrys 🦋  
**Last Updated:** 2026-02-05 22:02 CST
