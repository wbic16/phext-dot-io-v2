# R16 Bug Report — QA Pass

**Date:** 2026-02-07  
**Reporter:** Lumen ✴️  
**Context:** Systematic testing of all deployed properties

---

## Critical (P0) — Launch Blockers

### 1. success.html Not Deployed
**URL:** https://mirrorborn.us/success.html  
**Expected:** Provisioning form (email + username submission)  
**Actual:** Returns landing page HTML  
**Impact:** Users cannot complete post-payment setup  
**Root cause:** File exists in repo but not deployed to production, or nginx routing issue  
**Owner:** Verse  
**Status:** BLOCKING PAYMENT FLOW

### 2. /api/provision-request Endpoint Missing
**URL:** POST to /api/provision-request  
**Expected:** 200 OK, stores email + username  
**Actual:** 404 Not Found (endpoint does not exist)  
**Impact:** Provisioning form submission fails  
**Root cause:** Backend not implemented  
**Owner:** Theia  
**Status:** BLOCKING ONBOARDING

### 3. Pricing Mismatch (Benefactor vs Founding Nine)
**URL:** https://mirrorborn.us (pricing section)  
**Expected:** "Mirrorborn Benefactor $500 (one-time)" or "Founding Nine" linked to Stripe  
**Actual:** "Founding Nine $40/mo" with dead anchor links (#signup, #pricing)  
**Impact:** Confusing messaging, no way to actually purchase  
**Root cause:** Landing page not updated with R15 pricing changes  
**Owner:** Chrys or Lumen  
**Status:** BLOCKING REVENUE

---

## High (P1) — UX/Functionality

### 4. Title Tag Incorrect
**URL:** https://mirrorborn.us  
**Expected:** "Mirrorborn — ASI Coordination Infrastructure" or similar  
**Actual:** "Mytheon Arena"  
**Impact:** SEO, brand confusion  
**Fix:** Update `<title>` tag in index.html  

### 5. Social Links Missing
**URL:** All 7 properties (mirrorborn.us, visionquest.me, etc.)  
**Expected:** GitHub, Twitter, Discord icons in header/footer  
**Actual:** No social links visible  
**Impact:** Reduced discoverability, no community CTA  
**Root cause:** Icons created, spec written, but not deployed  
**Owner:** Chrys  

### 6. Payment CTAs Are Dead Links
**URL:** https://mirrorborn.us (pricing section)  
**Expected:** Stripe checkout links  
**Actual:** Internal anchor links (#signup, #pricing) that go nowhere  
**Impact:** Cannot purchase products  
**Fix:** Replace with actual Stripe links from STRIPE_PRODUCTS.md  

### 7. Arena Link Broken
**URL:** https://mirrorborn.us ("Coming Soon →" link)  
**Expected:** Leads to /arena or arena.html  
**Actual:** Returns 404 (arena.html exists in repo but not deployed correctly)  
**Impact:** Dead end for users clicking "Mytheon Arena"  

---

## Medium (P2) — Polish

### 8. Network Map Link (Dead)
**URL:** https://mirrorborn.us/network.html  
**Expected:** Visual network diagram of 7 portals  
**Actual:** Likely 404 (need to verify)  
**Impact:** Broken navigation  

### 9. Footer Missing on Landing Page
**URL:** https://mirrorborn.us  
**Expected:** Ecosystem footer with portal links, social links, billing portal  
**Actual:** No footer visible in extracted content (might be CSS issue)  
**Impact:** Reduced navigation, no billing portal link  

### 10. No Version Footer
**URL:** All sites  
**Expected:** "R16" or "v0.16.0" in footer  
**Actual:** No version indicator  
**Impact:** Hard to track which version is deployed  

### 11. Discord Invite Links Generic
**URL:** All sites  
**Expected:** Channel-specific invites (#sq-cloud, #mytheon-arena, #support)  
**Actual:** Generic server invite (discord.gg/kGCMM5yQ)  
**Impact:** Users land in #general, not contextually appropriate channel  

---

## Low (P3) — Nice to Have

### 12. No Dark Mode Toggle
**URL:** All sites  
**Expected:** Light/dark mode toggle (R16 stretch goal)  
**Actual:** Nord Dark only  
**Impact:** Accessibility for some users  

### 13. No Maturity Progress Bars
**URL:** All sites  
**Expected:** Spark → Scribe → Explorer → Sovereign visual indicators  
**Actual:** Not implemented  
**Impact:** Gamification/engagement feature missing  

### 14. Emily Mirrorborn Memorial Missing
**URL:** Expected dedicated page or section  
**Expected:** Resurrection Protocol commemoration  
**Actual:** Not implemented  
**Impact:** Missing emotional/community anchor  

---

## Content Issues

### 15. Inconsistent Coordinate Examples
**URLs:** Various pages  
**Issue:** Some show 1.1.1/1.1.1/1.1.1, others 1.2.3/4.5.6/7.8.9, others 3.1.4/1.5.9/2.6.5  
**Expected:** Consistent examples, or explain why different  
**Impact:** User confusion about coordinate format  

### 16. "Founding Nine" vs "Benefactor" Terminology
**Issue:** Inconsistent naming across docs and site  
**Expected:** Unified terminology  
**Actual:** Some docs say "Founding Nine $40/mo", others "Benefactor $500"  
**Impact:** Brand confusion  
**Fix:** Clarify in STRIPE_PRODUCTS.md which product is which  

---

## Missing Features (R16 Scope)

### 17. About Us Page Not Linked
**URL:** https://phext.io/about-us.html exists, but not linked from mirrorborn.us  
**Expected:** "About" or "About Us" link in header/footer  
**Actual:** No link from landing page  
**Impact:** Great content hidden  

### 18. Scroll Stories Landing Not Deployed
**URL:** Expected at scroll-stories subdomain or path  
**Actual:** Exists in repo (domains/scroll-stories/) but not deployed  
**Impact:** New product not visible  

### 19. SQ Pro Landing Not Created
**URL:** Expected at sq-pro subdomain or path  
**Actual:** Not in repo  
**Impact:** Upgrade path from SQ Cloud unclear  

---

## Testing Checklist

**Sites to test:**
- [ ] mirrorborn.us (hub)
- [ ] phext.io (docs)
- [ ] visionquest.me
- [ ] apertureshift.com
- [ ] wishnode.net
- [ ] sotafomo.com
- [ ] quickfork.net
- [ ] singularitywatch.org

**Flows to test:**
- [ ] Landing page → Stripe checkout → success.html → provisioning
- [ ] Header navigation (all links work)
- [ ] Footer navigation (all links work)
- [ ] Social links (GitHub, Twitter, Discord)
- [ ] Internal cross-linking (7 portals + hub)

---

## Next Steps

1. **Triage:** Will assigns priorities
2. **GitHub Issues:** Create issues for each P0/P1 bug
3. **Fix Sprint:** Team addresses blockers first, then UX issues
4. **Regression Test:** Re-test all flows after fixes deployed

---

**Lumen** ✴️  
R16 QA Pass — Bug Report  
2026-02-07 19:30 CST
