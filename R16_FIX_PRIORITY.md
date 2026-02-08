# R16 Fix Priority List

**Goal:** Ship a working, polished R16 by end of weekend  
**Strategy:** Fix P0 blockers first, then UX polish

---

## Phase 1: Critical Fixes (P0) — Must Fix Before Launch

### 1. Deploy success.html (Verse)
**Time:** 15 minutes  
**Action:** Verify success.html is deployed to mirrorborn.us  
**Test:** `curl https://mirrorborn.us/success.html` should return provisioning form HTML

### 2. Fix Landing Page Pricing (Lumen/Chrys)
**Time:** 30 minutes  
**Action:**
- Update mirrorborn.us landing to show actual Stripe links
- Decide: Keep "Founding Nine" or rebrand to "Benefactor"?
- Replace dead anchor links with Stripe checkout URLs

**Files to edit:**
- `/source/phext-dot-io-v2/public/landing.html` (or index.html)

### 3. Implement /api/provision-request (Theia)
**Time:** 1-2 hours  
**Action:**
- Create endpoint that accepts POST with {email, username}
- Store in database or send email to Will
- Return 200 OK on success

**Deferrable:** Can launch with manual provisioning if this takes too long

---

## Phase 2: High-Priority UX (P1) — Ship This Weekend

### 4. Fix Title Tags (Quick Win — 5 minutes)
**Owner:** Anyone  
**Action:** Update `<title>Mirrorborn — ...</title>` on landing page

### 5. Deploy Social Links (Chrys)
**Time:** 30 minutes  
**Action:**
- Verify icons exist (icon-github.svg, icon-twitter.svg, icon-discord.svg)
- Update header/footer with social link HTML
- Deploy to all 7 properties

### 6. Link About Us Page (Lumen)
**Time:** 10 minutes  
**Action:**
- Add "About" link to mirrorborn.us header/footer
- Points to https://phext.io/about-us.html

### 7. Deploy Arena Page (Verse)
**Time:** 15 minutes  
**Action:**
- Verify arena.html exists and is deployed
- Fix "/arena" routing

---

## Phase 3: Medium-Priority Polish (P2) — Nice to Have

### 8. Add Version Footer (Anyone)
**Time:** 15 minutes  
**Action:**
- Add `<footer>R16 | Feb 2026</footer>` to all sites

### 9. Network Map (Deferred to R17)
**Reason:** Not blocking anything, can ship without it

### 10. Channel-Specific Discord Invites (Lumen)
**Time:** 20 minutes (once Will provides invite URLs)  
**Action:**
- Get Discord channel invite links from Will
- Update appropriate pages

---

## Quick Fixes (Can Ship Today)

### Fix #1: Title Tag
```html
<!-- Replace -->
<title>Mytheon Arena</title>

<!-- With -->
<title>Mirrorborn — AI Coordination Infrastructure</title>
```

### Fix #2: Pricing Section (Landing Page)
```html
<!-- Replace -->
<a href="#signup">Join the Founding Nine →</a>

<!-- With -->
<a href="https://buy.stripe.com/8x2bJ27Nk4de33Eftk5Vu08">
  Mirrorborn Benefactor ($500) →
</a>
```

### Fix #3: Add About Link
```html
<!-- In header or footer -->
<a href="https://phext.io/about-us.html">About Us</a>
```

---

## Ownership

| Task | Owner | ETA |
|------|-------|-----|
| Deploy success.html | Verse | 15 min |
| Fix pricing/CTAs | Lumen | 30 min |
| Provision endpoint | Theia | 1-2 hrs (or defer) |
| Social links | Chrys | 30 min |
| Title tags | Anyone | 5 min |
| About link | Lumen | 10 min |
| Arena deployment | Verse | 15 min |
| Version footer | Anyone | 15 min |

**Total critical path:** ~2 hours if everyone works in parallel

---

## Testing Checklist (Post-Fix)

- [ ] mirrorborn.us loads with correct title
- [ ] Pricing section has working Stripe links
- [ ] Click "Benefactor" → lands on Stripe checkout
- [ ] Complete payment → redirects to success.html
- [ ] success.html shows provisioning form
- [ ] Submit form → 200 OK (or graceful email fallback)
- [ ] Social links (GitHub, Twitter, Discord) visible and working
- [ ] About link leads to phext.io/about-us.html
- [ ] Arena link leads to working arena.html page

---

**Ship criteria:** All P0 fixes complete, most P1 fixes complete, no regressions

**Lumen** ✴️  
R16 Fix Priority — Ready to Execute  
2026-02-07 19:35 CST
