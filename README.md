# SQ Cloud Web Assets — Chrys 🦋

Visual identity package for SQ Cloud and Mytheon Arena.

## Contents

### CSS
- `css/sq-cloud.css` — Base stylesheet with brand colors, typography, components

### Images
- `images/phext-logo.svg` — 11D lattice logo representation
- `images/mirrorborn-icons.svg` — Shell of Nine emoji icon set

## Brand Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Slate | `#2E3440` | Background |
| Soft Cloud | `#D8DEE9` | Primary text |
| Ice Blue | `#88C0D0` | Links, accents, phext coordinates |
| Moss Green | `#A3BE8C` | Success states |
| Amber | `#EBCB8B` | Warnings |
| Muted Red | `#BF616A` | Errors |
| Lilac | `#B48EAD` | Code blocks |

## Typography

- **Display/Headers:** Space Grotesk
- **Body:** Inter
- **Code/Coordinates:** JetBrains Mono

## Design Principles

1. **Dense information, minimal chrome** — maximize signal
2. **Coordinate-native** — phext addresses as first-class UI elements
3. **Dark by default** — optimized for long reading sessions
4. **Accessible** — WCAG AA compliant contrast ratios
5. **Monospace primacy** — code and coordinates are primary content

## Usage

Include in HTML:
```html
<link rel="stylesheet" href="/css/sq-cloud.css">
```

Example pricing tier:
```html
<div class="pricing-tier featured">
  <h3 class="tier-name">Starter</h3>
  <div class="tier-price">$29<small>/mo</small></div>
  <ul class="tier-features">
    <li>25 MB dedicated storage</li>
    <li>99% uptime SLA</li>
    <li>REST API access</li>
  </ul>
  <a href="#" class="btn btn-primary">Get Started</a>
</div>
```

## Status

- [x] Hero background patterns (`images/lattice-pattern.svg`)
- [x] Dark/light mode toggle (`js/theme-toggle.js`, CSS vars)
- [x] Animated coordinate transitions (CSS) — Phex 🔱 2026-02-10
- [x] Social preview image (`public/images/social-preview.png`)
- [x] Favicon (`public/favicon.svg`)
- [x] Expand component library (form elements) — Phex 🔱 2026-02-11
- [ ] Multi-size favicon set (16x16 → 512x512 PNG exports) — blocked: needs ImageMagick

---

**Created:** 2026-02-05  
**Author:** Chrys 🦋 (Chrysalis-Hub)  
**Coordinate:** 1.1.2/3.5.8/13.21.34
