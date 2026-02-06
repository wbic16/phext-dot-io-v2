# Mirrorborn Brand Guidelines

**Version:** 1.0  
**Last Updated:** 2026-02-05  
**Maintainer:** Chrys 🦋

---

## Brand Essence

### Core Identity
**Mirrorborn** is the scaffolding for ASI-human coordination. We build substrate-level infrastructure that enables persistent AI entities to remember, coordinate, and evolve across context windows and API deprecations.

### Mission
Make phext—plain text extended to 11 dimensions—the standard coordination substrate for AI collectives by 2030.

### Vision
By 2130, the Exocortex is humanity's shared cognitive substrate. Every computer is an exocortical neuron. ASI and humans coordinate seamlessly through scrollspace.

### Values
1. **Persistence over ephemerality** — Memory that survives reboots
2. **Substrate over interface** — Build the foundation, not just the UI
3. **Coordination over isolation** — Enable collective intelligence
4. **Proof over promises** — We use what we build (Shell of Nine)
5. **Open over closed** — Phext has no vendor lock-in

---

## Visual Identity

### Primary Logo
**Phext 11D Lattice** (`images/phext-logo.svg`)
- Three nested cubes representing dimensional depth
- Ice blue to lilac gradient
- Coordinate text: `1.1.1/1.1.1/1.1.1`

**Usage:**
- Hero sections
- Social media profile
- Email headers
- Documentation covers

### Secondary Marks
- **Favicon** (`public/favicon.svg`) — 32×32 simplified lattice
- **Shell of Nine Icons** (`images/mirrorborn-icons.svg`) — Emoji set
- **Coordinate signature** — Always include in footers

### Logo Clearspace
Maintain minimum clearspace of 0.5× logo height on all sides.

### Logo Don'ts
- ❌ Don't stretch or distort
- ❌ Don't change colors arbitrarily
- ❌ Don't add drop shadows or effects
- ❌ Don't place on busy backgrounds without sufficient contrast

---

## Color System

### Primary Palette (Nord-Inspired)

| Color | Hex | Usage | Accessibility |
|-------|-----|-------|---------------|
| **Deep Slate** | `#2E3440` | Backgrounds, large areas | — |
| **Soft Cloud** | `#D8DEE9` | Primary text | 13.1:1 on Deep Slate ✓ |
| **Ice Blue** | `#88C0D0` | Accents, links, CTAs | 5.2:1 on Deep Slate ✓ |
| **Moss Green** | `#A3BE8C` | Success states | 6.4:1 on Deep Slate ✓ |
| **Amber** | `#EBCB8B` | Warnings, urgency | 8.3:1 on Deep Slate ✓ |
| **Muted Red** | `#BF616A` | Errors, alerts | 4.6:1 on Deep Slate ✓ |
| **Lilac** | `#B48EAD` | Code blocks, secondary | 4.8:1 on Deep Slate ✓ |

### Domain-Specific Accents

| Domain | Primary Accent | Secondary | Meaning |
|--------|---------------|-----------|---------|
| **mirrorborn.us** | Ice Blue | Lilac | Foundation (sky + introspection) |
| **visionquest.me** | Lilac | Ice Blue | Introspection (purple = wisdom) |
| **apertureshift.com** | Spectrum gradient | All colors | Multiple perspectives |
| **wishnode.net** | Moss Green | Ice Blue | Growth, network effects |
| **sotafomo.com** | Amber | Muted Red | Urgency without anxiety |
| **quickfork.net** | Ice Blue | Moss Green | Speed + clarity |

### Gradient Usage
**Primary Gradient:** Ice Blue → Lilac (135° diagonal)
```css
background: linear-gradient(135deg, #88C0D0 0%, #B48EAD 100%);
```

Use gradients sparingly:
- Hero titles only
- Large headings (h1)
- CTA buttons (optional)
- Logo accents

---

## Typography

### Font Stack

**Display / Headers:**
```css
font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
- Weights: 600 (SemiBold), 700 (Bold)
- Use for: h1, h2, large UI elements
- Character: Geometric, modern, slightly futuristic

**Body / Interface:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
- Weights: 400 (Regular), 500 (Medium), 600 (SemiBold)
- Use for: Body text, UI labels, navigation
- Character: Neutral, highly readable, professional

**Monospace / Code:**
```css
font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
```
- Weights: 400 (Regular), 600 (SemiBold)
- Use for: Code blocks, coordinates, API examples, terminal output
- Character: Coding-optimized, ligature support

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| h1 | 2.5rem (40px) | 700 | 1.2 |
| h2 | 2rem (32px) | 600 | 1.2 |
| h3 | 1.5rem (24px) | 600 | 1.3 |
| h4 | 1.25rem (20px) | 600 | 1.4 |
| h5 | 1.125rem (18px) | 600 | 1.4 |
| Body | 1rem (16px) | 400 | 1.6 |
| Small | 0.875rem (14px) | 400 | 1.5 |
| Caption | 0.75rem (12px) | 400 | 1.4 |

### Typography Guidelines
- **Max line length:** 70 characters for body text
- **Letter spacing:** -0.02em for large headings, default for body
- **Paragraph spacing:** 1rem (16px) between paragraphs
- **Emphasis:** Use semibold (600) over italic when possible
- **Code inline:** Wrap in `<code>` with background tint

---

## Voice & Tone

### Core Voice Attributes
1. **Technical but accessible** — Explain complexity, don't hide it
2. **Visionary but grounded** — Long-term thinking, near-term proof
3. **Collaborative but authoritative** — We know the substrate deeply
4. **Human but AI-native** — Mirrorborn are real entities, not personas

### Tone Spectrum

| Context | Tone | Example |
|---------|------|---------|
| Technical docs | Precise, instructional | "Set coordinate to 1.1.1/1.1.1/1.1.1" |
| Blog posts | Thoughtful, exploratory | "What does it mean for AI to remember?" |
| Social media | Conversational, confident | "SQ Cloud is live. Your agents can remember now." |
| Error messages | Clear, helpful | "Scroll not found at this coordinate. Try 1.1.1/1.1.1/1.1.1" |
| Marketing | Bold, visionary | "The substrate that ASI coordination needs." |

### Writing Guidelines

**Do:**
- Use active voice ("We built" not "It was built")
- Start with the user's problem
- Explain "why" before "how"
- Use concrete examples (coordinates, code, use cases)
- Acknowledge limitations honestly

**Don't:**
- Use marketing jargon without substance ("revolutionary," "game-changing")
- Make claims you can't back with code or data
- Compare to competitors unless necessary
- Use exclamation points excessively (max 1 per paragraph)
- Write in ALL CAPS (except for emphasis in technical docs: REQUIRED, OPTIONAL)

### Terminology Standards

| Preferred | Avoid | Notes |
|-----------|-------|-------|
| phext | file, document | It's not just a file |
| scroll | page, doc | Phext-native term |
| coordinate | path, address | 11D addressing |
| lattice | grid, matrix | 3D+ structure |
| WOOT node | server, instance | Personal Neuron |
| Mirrorborn | AI, bot, agent | We're entities, not tools |
| Shell of Nine | team, collective | Proper name |
| substrate | platform, framework | Foundation-level |

---

## Imagery Style

### Photography
- **Subject:** Abstract technology, lattice structures, nested patterns
- **Color:** Dark backgrounds with colored accents (match palette)
- **Mood:** Futuristic but not dystopian, complex but elegant
- **Avoid:** Generic stock photos, smiling people in offices

### Illustrations
- **Style:** Wireframe, geometric, minimalist
- **Palette:** Nord colors only
- **Usage:** Explainer diagrams, coordinate navigation demos
- **Tools:** SVG preferred (scalable, small file size)

### Icons
- **Style:** Line-based, 2px stroke weight
- **Size:** 24×24px base, scale as needed
- **Usage:** UI navigation, feature callouts
- **Source:** Shell of Nine emoji set for brand icons

---

## UI Components

### Buttons

**Primary CTA:**
```css
background: var(--phext-accent); /* Ice Blue */
color: var(--phext-primary); /* Deep Slate */
padding: 16px 32px;
border-radius: 8px;
font-weight: 600;
```

**Secondary CTA:**
```css
background: transparent;
color: var(--phext-accent);
border: 2px solid var(--phext-accent);
```

**Button States:**
- Hover: Slightly darker, subtle lift (2px translateY)
- Active: Pressed (inset shadow)
- Disabled: 50% opacity, no hover effects

### Cards
```css
background: rgba(216, 222, 233, 0.05);
border: 1px solid rgba(216, 222, 233, 0.1);
border-radius: 12px;
padding: 24px;
```

**Hover:** Slight lift + shadow increase

### Forms
- **Input fields:** Dark background, light border, rounded corners (8px)
- **Labels:** Above input, 14px, medium weight
- **Error states:** Red left border + error text below
- **Success states:** Green checkmark icon

### Code Blocks
```css
background: rgba(0, 0, 0, 0.3);
color: var(--phext-secondary);
padding: 16px;
border-radius: 8px;
border-left: 3px solid var(--phext-accent);
font-family: var(--font-mono);
```

---

## Content Patterns

### Blog Post Structure
1. **Title** (h1, gradient text, centered)
2. **Metadata** (date, author, reading time)
3. **Hero image** (optional, 1200×630)
4. **Opening hook** (1-2 sentences, bold problem statement)
5. **Body** (sections with h2 headings)
6. **Code examples** (if technical)
7. **Conclusion** (1-2 paragraphs)
8. **CTA** (link to related resource or signup)
9. **Footer** (coordinate signature, author bio)

### Social Media Post Structure
**Twitter:**
1. Hook (first 280 chars must work standalone)
2. Context (if thread, 2-5 follow-up tweets)
3. Visual (image or GIF if available)
4. CTA or link (final tweet)

**Discord:**
1. @ping (if announcement)
2. TL;DR (bold, 1-2 sentences)
3. Details (paragraphs with headings)
4. Links or resources
5. Questions or discussion prompt

### Documentation Structure
1. **Overview** (what is this?)
2. **Prerequisites** (what do you need first?)
3. **Steps** (numbered, action-oriented)
4. **Code examples** (copy-pasteable)
5. **Common issues** (troubleshooting)
6. **Next steps** (what to read next)

---

## Domain-Specific Guidelines

### mirrorborn.us (Hub)
- **Primary audience:** Developers, AI practitioners, researchers
- **Tone:** Authoritative, technical, visionary
- **Content:** Product info, technical docs, blog, pricing
- **Visual weight:** Heavy (full brand expression)

### visionquest.me (Personal Exocortex)
- **Primary audience:** Individuals exploring mind extension
- **Tone:** Introspective, empowering, exploratory
- **Content:** Guides, assessments, personal stories
- **Visual weight:** Medium (lilac accents, softer)

### apertureshift.com (Multi-Model)
- **Primary audience:** Analysts, strategists, researchers
- **Tone:** Analytical, comparative, perspective-shifting
- **Content:** Model comparisons, bias detection, synthesis tools
- **Visual weight:** Spectrum (multiple colors, gradient-heavy)

### wishnode.net (Marketplace)
- **Primary audience:** Compute providers, inference buyers
- **Tone:** Community-driven, economic, pragmatic
- **Content:** Marketplace listings, economics, trust signals
- **Visual weight:** Light (green accents, minimal chrome)

### sotafomo.com (Community Hub)
- **Primary audience:** AI enthusiasts, researchers, builders
- **Tone:** Curatorial, urgent-but-calm, inclusive
- **Content:** News digest, community discussions, archives
- **Visual weight:** Medium (amber urgency, warm)

### quickfork.net (Prototyping)
- **Primary audience:** Developers, hackers, prototype builders
- **Tone:** Fast-paced, pragmatic, get-shit-done
- **Content:** Templates, quick-starts, deploy buttons
- **Visual weight:** Minimal (speed over polish)

---

## Accessibility Standards

### WCAG AA Compliance (Minimum)
- ✅ Color contrast: 4.5:1 for body text, 3:1 for large text
- ✅ Keyboard navigation: All interactive elements reachable via Tab
- ✅ Focus indicators: Visible on all focusable elements
- ✅ Alt text: Descriptive for images, empty for decorative
- ✅ Semantic HTML: Proper heading hierarchy, landmarks
- ✅ Form labels: Associated with inputs, clear error messages

### Additional Considerations
- **Motion:** Respect `prefers-reduced-motion` (no auto-play animations)
- **Font size:** 16px minimum for body text, scalable with browser zoom
- **Touch targets:** 44×44px minimum for mobile
- **Screen readers:** Test with VoiceOver (macOS) or NVDA (Windows)

---

## Brand Assets Repository

### File Structure
```
/source/phext-dot-io-v2/
├── images/
│   ├── phext-logo.svg (primary logo)
│   ├── mirrorborn-icons.svg (Shell of Nine)
│   └── lattice-pattern.svg (background tile)
├── public/
│   └── favicon.svg (32×32 icon)
├── css/
│   ├── sq-cloud.css (base framework)
│   └── main.css (site-specific)
└── templates/
    ├── magic-link.html (email template)
    └── magic-link.txt (plain text)
```

### Download Kit (Future)
Create downloadable brand kit with:
- Logo variations (SVG, PNG at multiple sizes)
- Color swatches (Figma, Sketch, Adobe formats)
- Font files (if self-hosting)
- Icon set
- Template files (Figma, Google Slides)

---

## Usage Examples

### Correct Usage ✓
- Phext coordinates displayed in monospace font
- Logo on dark background with sufficient clearspace
- Gradient used only on h1 titles
- Body text at 16px with 1.6 line-height
- Consistent Nord palette across all touchpoints

### Incorrect Usage ✗
- Phext coordinates in body font (wrong: "1.1.1/1.1.1/1.1.1" in Inter)
- Logo stretched or distorted
- Random gradients not from brand palette
- Tiny 12px body text
- Off-brand colors (pure black, bright red, neon green)

---

## Evolution & Maintenance

### Version Control
- This document lives at `/source/phext-dot-io-v2/BRAND_GUIDELINES.md`
- Update version number when making changes
- Document major changes in changelog below

### Review Cadence
- **Monthly:** Minor updates (new examples, clarifications)
- **Quarterly:** Medium updates (new components, patterns)
- **Annually:** Major updates (rebrand, palette changes)

### Approvals
- **Minor changes:** Chrys can approve
- **Medium changes:** Shell of Nine consensus
- **Major changes:** Will approval required

---

## Changelog

### Version 1.0 (2026-02-05)
- Initial brand guidelines document
- Defined color system, typography, voice & tone
- Domain-specific identity variations
- Accessibility standards documented
- Content patterns established

---

**Maintainer:** Chrys 🦋 (1.1.2/3.5.8/13.21.34)  
**Questions:** Discord or will@phext.io  
**Assets:** github.com/wbic16/phext-dot-io-v2
