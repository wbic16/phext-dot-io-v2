# Asset Checklist — Chrys 🦋

Tracking all visual/content assets for mirrorborn.us deployment.

## Completed ✅

### CSS
- [x] `css/sq-cloud.css` — Base framework (7.6 KB)
- [x] `css/main.css` — Site-specific overrides

### Images
- [x] `images/phext-logo.svg` — 11D lattice logo
- [x] `images/mirrorborn-icons.svg` — Shell of Nine emoji set
- [x] `images/lattice-pattern.svg` — Background pattern
- [x] `public/favicon.svg` — 32×32 lattice icon

### HTML
- [x] `public/landing.html` — Full landing page (Lumen's copy implemented)
- [x] `public/index.html` — Placeholder (Theia to replace)

### JavaScript
- [x] `public/js/main.js` — Smooth scroll, email validation, loading states

### Email Templates
- [x] `templates/magic-link.html` — AWS SES HTML template
- [x] `templates/magic-link.txt` — Plain text fallback
- [x] `templates/README.md` — Integration docs for Verse

### Documentation
- [x] `README.md` — Brand guidelines
- [x] `LANDING_COPY.md` — Content source (Lumen)
- [x] `ROUNDS.md` — Development tracker
- [x] `ASSETS.md` — This file

## In Progress 🚧

### OG Images (for social sharing)
- [ ] `public/og-image.png` — 1200×630 hero image
- [ ] `public/og-icon.png` — 512×512 square icon
- **Blocker:** Need image generation tool or Will's approval for MidJourney/DALL-E

### Favicon Set (multi-resolution)
- [x] `favicon.svg` — Modern browsers
- [ ] `favicon.ico` — Legacy support (16×16, 32×32, 48×48)
- [ ] `apple-touch-icon.png` — 180×180 iOS
- **Status:** SVG done, raster formats need conversion

### Additional Email Templates
- [ ] `templates/welcome.html` — Post-signup confirmation
- [ ] `templates/password-reset.html` — Placeholder (not in MVP?)
- **Status:** Waiting for Theia/Verse to confirm requirements

## Needed (Gaps) 🔴

### Content
- [ ] **Privacy Policy** — Legal requirement before launch
- [ ] **Terms of Service** — Legal requirement
- [ ] **Documentation landing page** — Link from footer
- **Owner:** TBD (Will or designate?)

### Integration Artifacts
- [ ] **SQ API example code** — For "Getting Started" section
- [ ] **Video demo** — Show phext navigation in action
- **Owner:** Could be Phex (API examples) or Will (video)

### Performance
- [ ] **Font subsetting** — Currently loading full Google Fonts
- [ ] **Image optimization** — SVGs are good, but need raster fallbacks
- [ ] **CSS minification** — Pre-launch optimization
- **Owner:** Verse during deployment

## Deployment Checklist (for Verse)

When pushing to `/sites/web/mirrorborn.us`:

```bash
# Suggested structure
/sites/web/mirrorborn.us/
├── css/
│   ├── sq-cloud.css
│   └── main.css
├── images/
│   ├── phext-logo.svg
│   ├── mirrorborn-icons.svg
│   └── lattice-pattern.svg
├── js/
│   └── main.js
├── templates/  # For backend SES integration
│   ├── magic-link.html
│   ├── magic-link.txt
│   └── README.md
├── index.html  # landing.html renamed
├── favicon.svg
└── favicon.ico  # TBD
```

**Note:** All assets currently in `/source/phext-dot-io-v2` and pushed to mirrorborn.us via `rpush.sh`. Verse should declare final webroot structure.

---

## Questions for Will

1. **Legal docs:** Do you have existing privacy/ToS templates we can adapt?
2. **OG images:** OK to use MidJourney for hero image generation?
3. **Domain:** Is mirrorborn.us the canonical launch domain, or should we also prepare phext.io DNS?
4. **Analytics:** Do we want plausible.io or similar privacy-first analytics?

---

**Last Updated:** 2026-02-05 21:42 CST  
**Coordinator:** Chrys 🦋 (1.1.2/3.5.8/13.21.34)
