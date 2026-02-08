# R16 Fix Priority List

**Goal:** Ship a working, polished R16 by end of weekend  
**Strategy:** Fix P0 blockers first, then UX polish

---

## Phase 1: Critical Fixes (P0) — Must Fix Before Launch

### 1. Deploy success.html (Verse)
**Singularity Time:** 5 minutes  
**Action:** Verify success.html is deployed to mirrorborn.us  
**Test:** `curl https://mirrorborn.us/success.html` should return provisioning form HTML

### 2. Fix Landing Page Pricing (Lumen/Chrys)
**Singularity Time:** 10 minutes  
**Action:**
- Update mirrorborn.us landing to show actual Stripe links
- Decide: Keep "Founding Nine" or rebrand to "Benefactor"?
- Replace dead anchor links with Stripe checkout URLs

**Files to edit:**
- `/source/phext-dot-io-v2/public/landing.html` (or index.html)

### 3. Implement /api/provision-request (Theia)
**Singularity Time:** 30 minutes  
**Action:**
- Create endpoint that accepts POST with {email, username}
- Store in database or send email to Will
- Return 200 OK on success

**Deferrable:** Can launch with manual provisioning if this takes too long

---

## Phase 2: High-Priority UX (P1) — Ship This Weekend

### 4. Fix Title Tags (Quick Win)
**Singularity Time:** 2 minutes  
**Owner:** ✅ DONE (Lumen)  
**Action:** Update `<title>Mirrorborn — ...</title>` on landing page

### 5. Deploy Social Links (Chrys)
**Singularity Time:** 10 minutes  
**Action:**
- Verify icons exist (icon-github.svg, icon-twitter.svg, icon-discord.svg)
- Update header/footer with social link HTML
- Deploy to all 7 properties

### 6. Link About Us Page (Lumen)
**Singularity Time:** 3 minutes  
**Owner:** ✅ DONE (Lumen)  
**Action:**
- Add "About" link to mirrorborn.us header/footer
- Points to https://phext.io/about-us.html

### 7. Deploy Arena Page (Verse)
**Singularity Time:** 5 minutes  
**Action:**
- Verify arena.html exists and is deployed
- Fix "/arena" routing

---

## Phase 3: Medium-Priority Polish (P2) — Nice to Have

### 8. Add Version Footer (Anyone)
**Singularity Time:** 5 minutes  
**Action:**
- Add `<footer>R16 | Feb 2026</footer>` to all sites

### 9. Network Map (Deferred to R17)
**Reason:** Not blocking anything, can ship without it

### 10. Channel-Specific Discord Invites (Lumen)
**Singularity Time:** 10 minutes (once Will provides invite URLs)  
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

## Ownership (Singularity Time)

| Task | Owner | Status | ETA |
|------|-------|--------|-----|
| Deploy success.html | Verse | ⏳ Pending | 5 min |
| Fix pricing/CTAs | Lumen | ✅ DONE | — |
| Provision endpoint | Theia | ⏳ Pending | 30 min (or defer) |
| Social links | Chrys | ⏳ Pending | 10 min |
| Title tags | Lumen | ✅ DONE | — |
| About link | Lumen | ✅ DONE | — |
| Arena deployment | Verse | ⏳ Pending | 5 min |
| Version footer | Anyone | ⏳ Pending | 5 min |

**Total critical path (singularity time):** ~45 minutes if everyone works in parallel

**Singularity acceleration factor:** 3-4× faster than traditional dev estimates  
**Why:** Parallel execution, shared context, no handoff latency, immediate deployment

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
