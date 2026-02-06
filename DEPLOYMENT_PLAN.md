# Deployment Plan — mirrorborn.us

**Target:** https://mirrorborn.us  
**Status:** Pre-launch (awaiting backend + infrastructure)  
**Deployment Owner:** Verse (infrastructure)  
**Date:** 2026-02-06

---

## Deployment Checklist

### Phase 1: Static Assets (Ready to Deploy)

**Public HTML Pages:**
- [x] `public/landing.html` — Full landing page (Joe Test compliant)
- [x] `public/index.html` — Placeholder (Theia to replace with app shell)
- [x] `public/404.html` — Error page
- [x] `public/500.html` — Error page
- [x] `public/loading.html` — Loading state

**CSS:**
- [x] `css/sq-cloud.css` — Base stylesheet (brand colors, typography, components)
- [x] `css/main.css` — Site-specific overrides
- [x] `css/components.css` — Reusable UI components

**JavaScript:**
- [x] `public/js/main.js` — Smooth scroll, email validation, loading states

**Images:**
- [x] `images/phext-logo.svg` — 11D lattice logo
- [x] `images/mirrorborn-icons.svg` — Shell of Nine emoji set
- [x] `images/lattice-pattern.svg` — Background pattern
- [x] `public/favicon.svg` — Favicon

**Deployment command (Verse to execute):**
```bash
# From /source/phext-dot-io-v2
/source/exocortical/rpush.sh public/ mirrorborn.us
```

---

### Phase 2: Documentation (Ready to Deploy)

**User Guides:**
- [x] `docs/signup-guide.md` — Complete signup walkthrough
- [x] `docs/mytheon-arena-guide.md` — Arena onboarding + coordination patterns
- [x] `docs/api-reference.md` — Full REST API documentation
- [x] `docs/coordinate-guide.md` — Complete phext coordinate system guide
- [x] `docs/troubleshooting.md` — Common issues + fixes
- [x] `docs/faq-extended.md` — 70+ questions across 8 categories
- [x] `docs/reading-list-prioritization.md` — Reading list structure

**Internal Docs (Not for Public Deployment):**
- `LAUNCH_PLAN.md` — Internal launch playbook
- `LAUNCH_DAY_CHECKLIST.md` — Internal operations guide
- `DOMAIN_VISIONS.md` — Strategic vision (internal)
- `COMMUNITY_STRATEGY.md` — Community engagement plan (internal)
- `ROUND*.md` — Internal round summaries

**Public docs deployment:**
```bash
# Verse creates /docs directory on server
# Markdown → HTML conversion (if needed) or serve raw
```

---

### Phase 3: Email Templates (Backend Integration)

**Templates:**
- [x] `templates/magic-link.html` — AWS SES HTML template
- [x] `templates/magic-link.txt` — Plain text fallback
- [x] `templates/README.md` — Integration docs

**Deployment:**
- Verse integrates with AWS SES
- Test email delivery before launch

---

### Phase 4: Backend API (Verse Owns)

**Required Endpoints:**
- [ ] `GET /api/v2/version` — SQ version info
- [ ] `POST /api/v2/auth/magic-link` — Send magic link email
- [ ] `GET /api/v2/auth/verify?token={id}` — Validate token → JWT
- [ ] `GET /api/v2/read/{coordinate}` — Read scroll
- [ ] `POST /api/v2/write/{coordinate}` — Write scroll
- [ ] `GET /api/v2/list/{prefix}` — List scrolls
- [ ] `DELETE /api/v2/delete/{coordinate}` — Delete scroll

**Status:** Awaiting Verse deployment confirmation

---

### Phase 5: Frontend App (Theia Owns)

**Dashboard Components:**
- [ ] Login flow (email → magic link → JWT)
- [ ] Dashboard (instance details, JWT display, quick-start)
- [ ] Analytics/telemetry (privacy-respecting)

**Status:** Awaiting Theia integration (blocked on backend)

---

## Deployment Order (Launch Day Sequence)

### T-1 Day (Feb 12)
**Verse deploys:**
1. Static assets (public/, css/, images/)
2. Documentation (docs/)
3. Backend API endpoints
4. Email templates → AWS SES integration
5. SSL certificates (Let's Encrypt)
6. Nginx configuration

**Testing:**
- Smoke test all endpoints
- Verify SSL
- Test email delivery
- Cross-browser check

---

### Launch Day (Feb 13, 12:00 PM CST)
**Verse confirms:**
- [ ] mirrorborn.us resolves correctly
- [ ] HTTPS working (no mixed content)
- [ ] Landing page loads <2s
- [ ] Email delivery <30s
- [ ] API endpoints responding

**Lumen posts announcements:**
- Discord #announcements
- Hacker News (Show HN)
- Reddit (r/LocalLLaMA, r/OpenAI, r/ClaudeAI)
- Twitter (Will coordinates)

---

## What's Ready to Deploy Now (Feb 6)

### Static Site (100% Ready)
✅ Landing page  
✅ CSS framework  
✅ JavaScript  
✅ Images/logos  
✅ Error pages  

**Can deploy:** Yes (but won't function without backend)

---

### Documentation (100% Ready)
✅ Signup guide  
✅ Arena guide  
✅ API reference  
✅ Coordinate guide  
✅ Troubleshooting  
✅ Extended FAQ  

**Can deploy:** Yes (as static markdown or converted to HTML)

---

### Email Templates (100% Ready)
✅ HTML template  
✅ Plain text template  
✅ Integration docs  

**Can deploy:** Yes (once AWS SES configured)

---

### Backend API (0% Deployed)
❌ No endpoints live yet  
❌ AWS SES not configured  
❌ Auth flow not integrated  

**Can deploy:** No (Verse needs to complete)

---

### Frontend Dashboard (0% Deployed)
❌ Theia's app shell not integrated  
❌ Auth flow not wired  
❌ Dashboard components not built  

**Can deploy:** No (blocked on backend)

---

## Blockers to Full Deployment

### Critical (Can't Launch Without)
1. **Backend deployment (Verse)**
   - Nginx + Let's Encrypt
   - API endpoints live
   - Auth flow working

2. **AWS SES configuration (Will → Verse)**
   - DNS records (SPF, DKIM, DMARC)
   - Verified sender domain
   - Production mode (not sandbox)

3. **Auth flow integration (Theia → Verse)**
   - Email form → backend API
   - Magic link validation
   - Dashboard displays JWT

4. **ToS/Privacy Policy (Will → Lumen)**
   - Legal requirement
   - Must be live before accepting signups

---

### High Priority (Hurts Launch Quality)
5. **Security audit (Cyon)**
   - Pen testing complete
   - Vulnerabilities remediated
   - User-facing security docs finalized

6. **Social graphics (Chrys)**
   - Launch announcement graphics
   - First customer celebration template

7. **Launch blog post (Chrys)**
   - "Why SQ Cloud Exists" or similar
   - Published or scheduled for Feb 13

---

## Deployment Validation (Post-Deploy Checklist)

### Static Assets
- [ ] Landing page loads (https://mirrorborn.us)
- [ ] CSS renders correctly (no 404s on stylesheets)
- [ ] Images load (logos, patterns, favicon)
- [ ] JavaScript works (smooth scroll, email validation)
- [ ] Error pages render (test /nonexistent → 404)

### Documentation
- [ ] Docs accessible (https://mirrorborn.us/docs/)
- [ ] Links work (internal + external)
- [ ] Code blocks render correctly
- [ ] Examples are accurate

### Backend API
- [ ] Version endpoint responds (GET /api/v2/version)
- [ ] Auth endpoint accepts emails (POST /api/v2/auth/magic-link)
- [ ] Magic link emails deliver (<30s)
- [ ] Token validation works (GET /api/v2/auth/verify)
- [ ] Read/write/list endpoints work
- [ ] Rate limiting enforced (100 read/min, 10 write/min)

### Email Delivery
- [ ] Magic link HTML renders correctly (Gmail, Outlook, Apple Mail)
- [ ] Plain text fallback works
- [ ] Links are clickable
- [ ] No spam filter issues

### Security
- [ ] HTTPS enforced (HTTP → HTTPS redirect)
- [ ] SSL certificate valid
- [ ] HSTS header present
- [ ] No mixed content warnings
- [ ] JWT properly signed/validated
- [ ] Rate limiting blocks abuse

---

## Rollback Plan

**If deployment breaks:**

### Minor Issues (UX bugs, doc errors)
- Fix forward (patch + redeploy)
- Document in incident log
- No rollback needed

### Major Issues (site down, security breach)
1. **Immediate:** Take site offline (maintenance page)
2. **Notify:** Discord #announcements + email
3. **Rollback:** Revert to previous deployment
4. **Fix:** Identify root cause, patch, test
5. **Redeploy:** Once validated
6. **Post-mortem:** Within 24 hours (public)

**Rollback command (Verse):**
```bash
# Restore from backup
# Or revert git commit + redeploy
```

---

## Deployment Metrics (Track on Launch Day)

### Performance
- [ ] Landing page load time (<2s target)
- [ ] API latency (<200ms p95)
- [ ] Email delivery time (<30s target)

### Availability
- [ ] Uptime (99.9% target)
- [ ] Error rate (<0.1% target)
- [ ] SSL certificate valid

### Usage
- [ ] Page views (landing page)
- [ ] Email submissions (signup form)
- [ ] Magic link deliveries
- [ ] Dashboard first visits
- [ ] API calls (read/write)

---

## Post-Deployment Tasks

### Day 1 (Feb 13)
- [ ] Monitor metrics (performance, availability, usage)
- [ ] Respond to support requests (<1h target)
- [ ] Fix critical bugs (if any)
- [ ] Celebrate first customer 🎉

### Week 1 (Feb 14-20)
- [ ] Update docs based on user questions
- [ ] Fix minor bugs
- [ ] Iterate on UX based on feedback
- [ ] Interview first 3 customers

### Week 2 (Feb 21-27)
- [ ] Publish case studies
- [ ] Iterate on landing page (A/B test CTAs)
- [ ] Optimize performance bottlenecks
- [ ] Plan visionquest.me launch (Q1 domain)

---

## Next Steps (Per Agent)

### Verse
1. **Review deployment plan** (this document)
2. **Confirm blockers** (what's still needed?)
3. **Deploy static assets** (when ready)
4. **Test full stack** (smoke test checklist)
5. **Report status** (Discord update)

### Theia
1. **Review deployment plan**
2. **Integrate auth flow** (once backend live)
3. **Build dashboard** (instance details, JWT display)
4. **Test end-to-end** (signup → magic link → dashboard)
5. **Report status**

### Chrys
1. **Review deployment plan**
2. **Finalize social graphics** (launch announcements)
3. **Publish blog post** (or schedule for Feb 13)
4. **Prepare first customer graphic** (celebration template)
5. **Report status**

### Cyon
1. **Review deployment plan**
2. **Complete security audit** (pen testing)
3. **Remediate vulnerabilities** (if any)
4. **Finalize security docs** (user-facing)
5. **Report status**

### Lumen (Me)
1. **Draft ToS/Privacy Policy** (once Will provides templates)
2. **Prepare Kelly outreach** (send Feb 12)
3. **Finalize Discord channels** (setup Feb 12)
4. **Pre-write launch announcements** (HN, Reddit, Discord)
5. **Stand by for launch day** (execute checklist)

### Will
1. **Provide AWS SES guide** (for Verse)
2. **Provide ToS/Privacy templates** (for Lumen)
3. **Approve launch plan** (go/no-go Feb 12)
4. **Coordinate Twitter launch** (Feb 13, 12pm CST)
5. **Strategic session** (discuss 5 domains)

---

## Status Summary

**Ready to deploy:**
- ✅ Static assets (landing page, CSS, images)
- ✅ Documentation (guides, API ref, FAQ)
- ✅ Email templates (HTML + plain text)

**Blocked:**
- ❌ Backend API (Verse deployment pending)
- ❌ AWS SES (Will guide pending)
- ❌ Auth flow (Theia integration pending)
- ❌ ToS/Privacy (Will templates pending)

**Confidence in Feb 13 launch:** 70% → 95% if blockers clear by Feb 10

---

**Next action:** Verse reviews this plan, confirms deployment timeline, reports status.

✴️ Lumen | 2.1.3/4.7.11/18.29.47
