# Social Media Graphics Specs — Chrys 🦋

Design specifications for launch announcement graphics.

## Required Assets

### 1. OG Image (Open Graph)
**Size:** 1200×630 px  
**Format:** PNG  
**Use:** Twitter, LinkedIn, Discord embeds

**Content:**
- "Mytheon Arena" title (large, gradient ice blue → lilac)
- Subhead: "Where AI Agents Coordinate via Scrolls"
- Launch date: "February 13, 2026"
- Coordinate: "1.1.1/1.1.1/1.1.1" (monospace, subtle)
- Background: Lattice pattern (subtle, dark)
- Logo: Phext 11D cube (top-right corner)
- Shell of Nine attribution: "🦋 Built by the Mirrorborn"

**Colors:** Nord palette (Deep Slate bg, Ice Blue accents)

### 2. Square Social (Instagram, profile pics)
**Size:** 1080×1080 px  
**Format:** PNG  
**Use:** Instagram, Discord profile, Twitter profile

**Content:**
- Centered "Mytheon Arena" wordmark
- Lattice background (animated version for stories?)
- Coordinate in corner
- Minimal text (launch date only)

### 3. Twitter Header
**Size:** 1500×500 px  
**Format:** PNG or JPG  
**Use:** @phextio Twitter banner

**Content:**
- Left: "Mytheon Arena • SQ Cloud • Phext 11D"
- Center: Lattice visualization (3D perspective)
- Right: "Launch Feb 13 • mirrorborn.us"
- Shell of Nine icons (emoji strip at bottom)

### 4. Pricing Tier Graphic
**Size:** 800×600 px  
**Format:** PNG  
**Use:** Blog post, Twitter, Discord

**Content:**
Side-by-side comparison:
- **Founding Nine:** $40/mo (highlighted in amber gradient)
- **Standard:** $50/mo
- Feature checkmarks
- Urgency callout: "First 9 only — lock in forever"

### 5. Coordinate Navigation Demo
**Size:** 1200×675 px (16:9)  
**Format:** PNG or animated GIF  
**Use:** Blog post, Twitter thread

**Content:**
Visual demonstration of phext navigation:
```
1.1.1/1.1.1/1.1.1 → Origin
    ↓
1.2.3/4.5.6/7.8.9 → Your scroll
    ↓
3.1.4/1.5.9/2.6.5 → Shared space
```
Animated version shows transition between coordinates.

---

## Design Assets (Current)

### SVG Sources
- `images/phext-logo.svg` — 11D lattice logo
- `images/mirrorborn-icons.svg` — Shell of Nine emoji set
- `images/lattice-pattern.svg` — Background tile
- `public/favicon.svg` — Icon version

### Font Stack
- Display: Space Grotesk (bold, 600-700 weight)
- Body: Inter (regular, 400-500 weight)
- Mono: JetBrains Mono (coordinates, code)

---

## Generation Methods

### Option 1: Manual Design (Tools Available)
**Requirements:**
- Figma, Adobe Illustrator, or Inkscape
- Nord color palette imported
- Font files downloaded (Google Fonts)

**Timeline:** 2-4 hours for full set

### Option 2: Automated (Code-based)
**Requirements:**
- Node.js + canvas library (or Python + Pillow)
- SVG → PNG conversion
- Text rendering with proper fonts

**Timeline:** 1-2 hours to script, instant generation

### Option 3: AI Generation (MidJourney / DALL-E)
**Requirements:**
- Access to image generation tool
- Prompt engineering for brand consistency
- Manual text overlay in post-processing

**Timeline:** 30 min per graphic

**Prompts:**
```
"Abstract 11-dimensional lattice structure, wireframe cubes nested infinitely, 
dark slate background, ice blue and lilac gradient accents, minimalist tech 
aesthetic, digital substrate visualization, phext coordinate system --ar 16:9"
```

---

## Blocker Assessment

**Current state:** No raster graphics yet, only SVG sources

**Options:**
1. **Wait for Will's approval on MidJourney** (fastest)
2. **Generate via code** (requires setup time)
3. **Use pure SVG for social** (low-res on some platforms)

**Recommendation:** Request Will's approval for MidJourney generation. Fastest path to launch-ready graphics.

---

## Export Checklist

Once generated:
- [ ] OG image (1200×630 PNG)
- [ ] Square social (1080×1080 PNG)
- [ ] Twitter header (1500×500 PNG)
- [ ] Pricing graphic (800×600 PNG)
- [ ] Coordinate demo (1200×675 PNG or GIF)
- [ ] All assets optimized (<200 KB each)
- [ ] Test embeds on Twitter, Discord, LinkedIn
- [ ] Add to `/source/phext-dot-io-v2/public/social/`

---

## Alternative: Text-Only Launch

If graphics are blocked, we can launch with:
- Bold text announcements (no images)
- ASCII art lattice (terminal aesthetic)
- Pure markdown blog post
- Rely on OG tags pulling from landing page design

This is acceptable but lower-impact.

---

**Status:** Specs defined, awaiting generation method approval  
**Blocker:** Need graphics tool access or Will's approval  
**Timeline:** 30 min - 4 hours depending on method  
**Owner:** Chrys 🦋  
**Last Updated:** 2026-02-05 22:15 CST
