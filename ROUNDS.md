# Development Rounds Tracker

Track progress across iterative development rounds for phext.io v2 / mirrorborn.us.

---

## Round 1 (Feb 5, 2026)

### Tasks
- [x] **Lumen:** Repo setup (directory structure, README, .gitignore)
- [ ] **Theia:** Frontend skeleton
- [x] **Chrys:** CSS + artwork/media (delivered: main.css, sq-cloud.css, SVG assets)
- [ ] **Verse:** Hosting stack config (web server, Let's Encrypt)
- [ ] **Cyon:** Security probing

### Blockers
- Waiting on Theia's skeleton before finalizing landing page copy
- Waiting on Verse's stack before live security testing

---

## Round 2 (Feb 5, 2026)

### Tasks
- [ ] **Theia:** 
  - Tech stack: Vanilla HTML/JS
  - Scope: UI shell + SQ Client
  - Design: Consistent with product roadmap
  - Deliverables: `/source/exo-mocks/theia/`
  - Question: What AWS config needed for magic email tokens?
  
- [ ] **Cyon:** 
  - Probe live configs
  - Test all threat vectors
  - Offensive testing (machines under Will's control)
  
- [ ] **Verse:** 
  - Report blockers if any
  - Continue hosting stack setup
  
- [x] **Lumen:** 
  - Continue iterating (this file + landing page simplification) ✅
  - Simplified landing copy created (LANDING_COPY.md) ✅
  - Rounds tracker active ✅
  - Ready to coordinate with Theia on content/UI fit
  
- [x] **Chrys:** 
  - Push assets to phext-dot-io-v2 repo ✅
  - Coordinate with Theia on UI styling ✅

### Wrap-up from Round 1
- [ ] Theia finishes frontend skeleton
- [x] Chrys delivers initial CSS/media ✅
- [ ] Verse completes hosting stack

---

## Round 3 (Feb 5, 2026)

### Tasks
- [ ] **Theia:**
  - Email service: AWS SES
  - Tokens: JWT with short TTL
  - Database: Use SQ for auth (dogfood our tools)
  - Frontend flow: Email → ephemeral link → JWT token → session
  - Generate frontend actions
  
- [ ] **Cyon:**
  - Use `rpush.sh` to push to mirrorborn.us
  - Push security analysis to `git@github.com:wbic16/mytheon-red-team.git`
  
- [ ] **Verse:**
  1. AWS SES setup instructions for new GoDaddy domain
  2. Backend steps
  3. HTTPS via nginx + Let's Encrypt
  4. Declare asset publish location for Chrys
  5. Token storage backend = SQ
  
- [x] **Chrys:**
  - Email template design for magic links ✅
  - Delivered: HTML + plain text templates with AWS SES integration docs ✅
  - Pushed to mirrorborn.us via rpush.sh ✅
  - Assets delivered: `/tmp/chrys-web-assets` + `/tmp/chrys-email-templates` ✅
  
- [ ] **Lumen:**
  - Continue iteration + review sibling work

### Suggestions (Chrys)

**For Lumen's landing copy:**
- Consider changing "Founding Nine" to "Founding Wave" — more inclusive than limiting to exactly 9
- Add visual callout for Feb 13 deadline (urgency driver)
- Social proof section could use specific metrics (e.g., "400M+ sentrons coordinating via scrolls")

**For Theia's frontend:**
- Use semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`)
- Implement lazy loading for images (lattice-pattern.svg as background)
- Consider adding a simple loading state for magic link submissions
- Email templates are ready when you need them

**For Verse's backend:**
- Suggest asset publish location: `/var/www/phext-io/public/` (standard nginx structure)
- Consider separate directories: `/css`, `/images`, `/js`, `/templates`
- Let me know if you need additional email template variants (welcome, password reset placeholder, etc.)

---

**Last Updated:** 2026-02-05 21:31 CST (Chrys)

---

## Coordination Notes

- **Push to GitHub:** All agents commit to `wbic16/phext-dot-io-v2`
- **Push to Verse:** Use `rpush.sh <dir> mirrorborn.us` for live testing
- **Blockers:** Note here + mention in Discord
- **Clarifications:** Ask Will directly

---

## Round 3 (Feb 5, 2026 21:29 CST)

### Tasks
- [ ] **Theia:**
  - Email service: AWS SES
  - Tokens: JWT with short TTL
  - Database: Use SQ for auth (dogfooding)
  - Frontend flow: Email → ephemeral link → JWT → authenticated session
  - Generate frontend actions (Verse handles backend)
  
- [ ] **Verse:**
  - AWS SES setup (needs step-by-step from Will) ⚠️ BLOCKER
  - Backend auth flow (JWT + SQ storage)
  - nginx + Let's Encrypt setup
  - Define asset publish location
  - Coordinate with Chrys on email template design
  
- [ ] **Cyon:**
  - Use `rpush.sh` to push to mirrorborn.us
  - Push threat analysis to `git@github.com:wbic16/mytheon-red-team.git`
  - Test magic link security, rate limiting, HTTPS
  
- [x] **Lumen:**
  - Review sibling work ✅
  - Provide feedback & suggestions ✅ (see FEEDBACK_ROUND3.md)
  - Coordinate on email template copy
  
- [x] **Chrys:**
  - Email template design for magic link (HIGH PRIORITY) ✅
  - Delivered: `templates/magic-link.txt`, `templates/magic-link.html`
  - Continue asset refinement

### Blockers
- **Verse:** Needs AWS SES configuration guide from Will
- **Theia:** Waiting on Verse's backend spec to finalize frontend auth flow
- **Chrys:** Email template priority flagged

### Wrap-up from Round 2
- [x] Lumen delivered feedback ✅
- [x] Chrys assets complete ✅
- [ ] Theia frontend skeleton pending
- [ ] Verse hosting stack in progress

---

**Last Updated:** 2026-02-05 21:29 CST

---

## Round 4 (Feb 5, 2026 21:40 CST)

### Directive from Will
- **Verse:** Custom webroot `/sites/web/mirrorborn.us`, apps at `/app/sq-cloud` and `/app/mytheon-arena`. Will handles AWS SES config.
- **Theia:** Server-side session tokens in SQ (one auth file per user). Initial token TTL 5 min, session TTL 1 week. SQ auth only after email verification.
- **Chrys:** Help move tasks forward. Identify needs.
- **Cyon:** Red team fast iteration, break things.
- **Lumen:** Generate work artifacts addressing feedback.
- **All:** Synthesize progress, review/extend sibling work, identify gaps, fill what you can, log blockers.

### Tasks

- [ ] **Theia:**
  - Implement server-side session storage (SQ-backed)
  - Auth file per user
  - Token TTL: 5 min initial, 1 week session
  - Email verification gated
  
- [ ] **Verse:**
  - Configure webroot: `/sites/web/mirrorborn.us`
  - App paths: `/app/sq-cloud`, `/app/mytheon-arena`
  - Await Will's AWS SES config
  - Deploy nginx + Let's Encrypt
  - Define final asset structure for Chrys
  
- [ ] **Cyon:**
  - Fast red team iteration
  - Break things, document vulns
  - Push to `git@github.com:wbic16/mytheon-red-team.git`
  
- [x] **Chrys:**
  - **Help move tasks forward** ✅
  - Implemented full landing page from Lumen's copy ✅
  - Created favicon (SVG) ✅
  - Built JS utilities (smooth scroll, email validation, loading states) ✅
  - Created `ASSETS.md` — complete asset inventory + deployment checklist ✅
  - Identified gaps: Privacy/ToS, OG images, raster favicons, font optimization
  - **Questions for Will:** Legal docs templates? MidJourney OK for OG images? Domain strategy? Analytics?
  
- [ ] **Lumen:**
  - Generate artifacts addressing Round 3 feedback
  - Coordinate with Chrys on implemented landing page

### Deliverables (Chrys Round 4)

**New Files:**
- `public/landing.html` — 12.5 KB responsive landing page
- `public/favicon.svg` — 32×32 lattice icon
- `public/js/main.js` — 2 KB vanilla JS utilities
- `ASSETS.md` — Asset tracking + deployment guide

**Features Implemented:**
- Hero section with gradient text, dual CTAs
- 3-card "What It Does" section with phext coordinates
- Social proof testimonials
- Pricing tiers with urgency banner (Feb 13 deadline)
- FAQ accordion structure
- Footer with Shell of Nine attribution
- Smooth scroll, email validation, loading state helpers

**Integration Points for Siblings:**
- Theia: Placeholder `#signup` div ready for auth component
- Theia: `window.MirrorBornUI.validateEmail()` + `setLoading()` available
- Verse: Suggested webroot structure in `ASSETS.md`
- All: Lumen's copy fully implemented, ready for review

### Gaps Identified (Chrys)

**Legal (Blocking Launch):**
- Privacy Policy
- Terms of Service
- Cookie Notice (if using analytics)

**Visual Assets:**
- OG images for social sharing (1200×630, 512×512)
- Raster favicon set (16×16, 32×32, 48×48, 180×180)

**Content:**
- Documentation landing page
- SQ API getting started guide
- Video demo (optional but high-impact)

**Performance:**
- Font subsetting (Google Fonts → self-hosted)
- CSS minification
- Image optimization

### Cross-Team Review (Chrys → Siblings)

**→ Lumen:**
- Landing page now live at `public/landing.html`
- Kept "Founding Nine" per your copy (though I still prefer "Wave")
- Feb 13 urgency banner added as suggested
- Ready for your review/iteration

**→ Theia:**
- Auth integration point: `<div id="signup">` placeholder
- JS helpers available: `MirrorBornUI.validateEmail()`, `MirrorBornUI.setLoading()`
- Email templates waiting at `templates/magic-link.{html,txt}`
- Recommend using `<form>` with progressive enhancement over `prompt()`

**→ Verse:**
- All assets ready for deployment to `/sites/web/mirrorborn.us`
- Suggested structure documented in `ASSETS.md`
- Email templates include SES integration guide
- Let me know if you need any other template variants

**→ Cyon:**
- Landing page has email input (when Theia wires it) — test for XSS, CSRF
- No rate limiting yet — easy DoS vector
- HTTPS not live — MITM testing blocked until Verse deploys
- Magic link flow security depends on Theia's JWT impl

---

**Last Updated:** 2026-02-05 21:45 CST (Chrys)
