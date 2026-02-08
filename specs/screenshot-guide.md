# Product Screenshot Guide

**Purpose:** Define what screenshots are needed for landing pages, docs, and social cards  
**Created:** 2026-02-08 (R17)  
**Target:** Will, Chrys, or anyone with access to live systems

---

## Screenshot 1: SQ Cloud API in Action

**What:** Terminal showing real SQ Cloud API calls with responses  
**Dimensions:** 1920×1080 (or higher)  
**Terminal:** Use Nord theme for consistency with brand colors

### Commands to capture:

```bash
# 1. Write a scroll
curl -X POST http://localhost:1337/write \
  -H "Content-Type: application/json" \
  -d '{"coordinate":"1.1.1/1.1.1/1.1.1","content":"Hello from scrollspace!"}'

# 2. Read the scroll back
curl http://localhost:1337/read/1.1.1/1.1.1/1.1.1

# 3. List scrolls in a coordinate range
curl http://localhost:1337/list/1.1.1/1.1.1/*

# 4. Navigate to Mytheon Arena coordinate
curl http://localhost:1337/read/10.10.1/1.1.1/1.10.10
```

**Frame:** Include:
- Clear prompt showing current directory
- Readable response JSON (formatted, not minified)
- Multiple commands showing write → read → list flow
- Terminal window title: "SQ Cloud API — phext-shell"

**Use for:**
- Landing page hero image
- Documentation header
- Social card for "SQ Cloud in 60 seconds"

---

## Screenshot 2: Mytheon Arena Navigation

**What:** Browser view of Mytheon Arena (or mockup if not live)  
**Dimensions:** 1920×1080  
**Browser:** Chrome/Firefox with Nord dark theme extension

### What to show:

**Mockup spec (if Arena not live yet):**

```
┌─────────────────────────────────────────────┐
│ Mytheon Arena                        ✴️ Lumen│
├─────────────────────────────────────────────┤
│                                               │
│  Current Coordinate: 10.10.1/1.1.1/1.10.10   │
│                                               │
│  ╔═══════════════════════════════════════╗  │
│  ║  Welcome to Mytheon Arena              ║  │
│  ║                                        ║  │
│  ║  You are standing at the origin       ║  │
│  ║  coordinate of the Arena lattice.     ║  │
│  ║                                        ║  │
│  ║  Visible paths:                        ║  │
│  ║    → North: 10.10.2/1.1.1/1.10.10     ║  │
│  ║    → East:  10.11.1/1.1.1/1.10.10     ║  │
│  ║    → Down:  10.10.1/1.1.2/1.10.10     ║  │
│  ║                                        ║  │
│  ║  Matches available: 3 agents nearby   ║  │
│  ╚═══════════════════════════════════════╝  │
│                                               │
│  Navigate: [↑] [↓] [←] [→] [🔽] [🔼]          │
│  Coordinate: ___________________ [Go]        │
│                                               │
│  Complexity: Explorer ●●●●○○○○               │
│                                               │
└─────────────────────────────────────────────┘
```

**Visual style:**
- Nord dark theme
- Monospaced font for coordinates
- Neon cyan accents for active elements
- Metallic borders on frames

**Use for:**
- Mytheon Arena landing page
- "What is the Arena?" explainer
- Social card for Arena announcement

---

## Screenshot 3: OpenClaw Mirrorborn Dashboard

**What:** Will's actual OpenClaw instance running on lilly  
**Dimensions:** 1920×1080  
**Location:** Will's desktop (only he can capture this)

### What to show:

**Terminal window showing:**
```bash
$ openclaw status

OpenClaw Status
───────────────
Agent:    lumen
Model:    anthropic/claude-sonnet-4-5
Session:  main (active)
Uptime:   9 days, 14 hours
Memory:   150 KB (MEMORY.md + daily logs)
Maturity: Explorer ●●●●○○○○

Recent Activity:
  2026-02-08 07:15 CST: R17 Item #9 shipped (maturity progress bars)
  2026-02-08 07:10 CST: R17 Item #8 shipped (metallic rebrand)
  2026-02-08 07:05 CST: R17 Item #7 shipped (pricing page)

$ openclaw sessions list
┌────────────┬────────────┬──────────┬───────────────┐
│ Session    │ Agent      │ Status   │ Last Active   │
├────────────┼────────────┼──────────┼───────────────┤
│ main       │ lumen      │ active   │ 2s ago        │
│ background │ phex       │ idle     │ 2h ago        │
└────────────┴────────────┴──────────┴───────────────┘
```

**Alternate view:** VS Code window showing:
- `/home/wbic16/.openclaw/workspace/` directory tree
- `MEMORY.md` open in editor (first 30 lines visible)
- Terminal pane below showing OpenClaw commands

**Use for:**
- OpenClaw Mirrorborn product page
- "Setting up OpenClaw" documentation
- Social card for "Your AI with persistent memory"

---

## Screenshot 4: Scrollspace Visualization (Already have!)

**What:** The two Midjourney renders Will already created:
1. **The Lattice** (sacred geometry, golden center)
2. **The Threshold** (Emi in geometric portal)

**Use for:**
- Already deployed on Emily memorial page
- Can be reused for About page, gallery, social cards

✅ **No action needed** — these are perfect already

---

## Screenshot 5: Mobile View (Bonus)

**What:** iPhone/Android showing mirrorborn.us responsive design  
**Dimensions:** 1170×2532 (iPhone 14 Pro) or 1080×2340 (Android)

**Tools:**
- Chrome DevTools (Device Toolbar)
- Firefox Responsive Design Mode
- Or actual device screenshot

**Use for:**
- Showing responsive design
- Social proof that it works on mobile
- App store screenshots if we build native apps later

---

## Screenshot Specifications

### General Requirements

**Format:** PNG (lossless) or high-quality JPG (90%+)  
**Resolution:** Minimum 1920×1080, prefer 4K (3840×2160) for future-proofing  
**Color space:** sRGB  
**Compression:** Lossless or minimal loss

### Terminal Screenshots

**Font:** JetBrains Mono, Fira Code, or Cascadia Code (16pt minimum)  
**Theme:** Nord Dark (matches brand)  
**Padding:** 20px around content (don't crop too tight)  
**Window chrome:** Include terminal title bar (shows context)

### Browser Screenshots

**Browser:** Chrome or Firefox (latest)  
**Zoom:** 100% (no scaling)  
**Extensions:** Disable ad blockers, show only essential UI  
**DevTools:** Hidden unless specifically showing DevTools usage

---

## Export Locations

Once captured, save screenshots to:

```
/source/phext-dot-io-v2/public/images/screenshots/
  sq-cloud-api-terminal.png
  mytheon-arena-navigation.png
  openclaw-dashboard.png
  mobile-landing-responsive.png
```

Then update these pages:
1. **Landing page** (`/public/index.html`) — Add SQ Cloud terminal screenshot
2. **Arena page** (`/public/arena.html`) — Add Arena navigation mockup
3. **Docs** (`/docs/api-reference.md`) — Add terminal examples
4. **Social cards** — Generate 1200×630 crops for OG images

---

## Alternative: Mockups

If capturing real screenshots is blocked (systems not fully live), we can:

1. **Use Figma/Excalidraw** to create mockups matching the specs above
2. **Use asciinema** to record terminal sessions, export as GIF/SVG
3. **Use screenshot.rocks** or similar tools to frame browser mockups

**Priority:** Real screenshots > High-fidelity mockups > ASCII art diagrams

---

## Status

- ✅ Screenshot 4 (Scrollspace) — Already have Midjourney renders
- ⏳ Screenshot 1 (SQ Cloud API) — Needs Will to capture terminal
- ⏳ Screenshot 2 (Mytheon Arena) — Needs mockup or live capture
- ⏳ Screenshot 3 (OpenClaw Dashboard) — Needs Will to capture
- 🔮 Screenshot 5 (Mobile) — Bonus, lower priority

---

✴️ **Lumen**  
"Screenshots are proof. Show them scrollspace in action."  
R17 — 2026-02-08
