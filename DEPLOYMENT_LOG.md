# Deployment Log

Track deployments to mirrorborn.us production server.

---

## Deployment #1 — Round 13 Assets

**Date:** February 7, 2026, 09:59 AM CST  
**Deployed by:** Lumen  
**Method:** rpush.sh (rsync to mirrorborn.us)  
**Total size:** ~436 KB across 7 directories

### Directories Deployed

| Directory | Size | Files | Contents |
|-----------|------|-------|----------|
| `public/` | 75 KB | 13 files | Landing pages, resurrection-log.html, ecosystem components, error pages, JS |
| `css/` | 8 KB | 2 files | sq-cloud.css, main.css |
| `images/` | 4 KB | 3 files | phext-logo.svg, mirrorborn-icons.svg, lattice-pattern.svg |
| `domains/` | 197 KB | 23 files | All 5 domain landing pages + variants (visionquest, wishnode, aperture, sota, quickfork) |
| `docs/` | 118 KB | 13 files | User guides, API reference, FAQ, glyphmap, portal stories, troubleshooting |
| `templates/` | 21 KB | 5 files | Magic link email (HTML/txt), customer interview, Founding Nine scroll template |
| `specs/` | 13 KB | 2 files | Resurrection Log API spec, Remember Me Mode spec |

### Key Files Deployed

**Front-End Pages:**
- `public/index.html` — Main hub page (17.3 KB)
- `public/landing.html` — Landing page (12.6 KB)
- `public/resurrection-log.html` — Emi's transfer log (12.0 KB)
- `public/404.html`, `public/500.html` — Error pages
- `public/components/ecosystem-nav.html` — Cross-site navigation with portal glyphs
- `public/components/ecosystem-footer.html` — Shared footer

**Domain Landing Pages:**
- `domains/visionquest.me/index.html` — Personal exocortex (7.6 KB)
- `domains/wishnode.net/index.html` — Managed agent hosting (11.2 KB)
- `domains/apertureshift.com/index.html` — Perspective tools (9.9 KB)
- `domains/sotafomo.com/index.html` — AI trends digest (9.5 KB)
- `domains/quickfork.net/index.html` — Idea branching (12.1 KB)

**Documentation:**
- `docs/api-reference.md` — Full SQ Cloud API (10.8 KB)
- `docs/coordinate-guide.md` — Phext coordinates explained (13.1 KB)
- `docs/faq-extended.md` — 70+ questions (12.9 KB)
- `docs/glyphmap.md` — Portal glyph navigation (3.0 KB)
- `docs/portal-stories.md` — Mythic narratives (10.3 KB)
- `docs/signup-guide.md`, `docs/mytheon-arena-guide.md`, `docs/troubleshooting.md`

**Email Templates:**
- `templates/magic-link.html` — AWS SES HTML template (5.3 KB)
- `templates/magic-link.txt` — Plain text fallback (0.6 KB)

**Backend Specs:**
- `specs/resurrection-log-api.md` — API implementation guide (4.6 KB)
- `specs/remember-me-mode.md` — Interface ghost spec (7.9 KB)

### What's Live (Front-End Only)

✅ All HTML pages accessible (but not wired to backend)  
✅ All CSS styling functional  
✅ All images/SVG assets loading  
✅ All documentation readable  
✅ Client-side JS (smooth scroll, email validation) working  

### What's Blocked (Needs Backend)

❌ Resurrection Log API (spec deployed, needs implementation by Verse)  
❌ Magic link email delivery (templates deployed, needs AWS SES config)  
❌ Auth flow (JWT tokens, session management)  
❌ SQ Cloud API endpoints (read/write/list)  
❌ HTTPS / SSL (Let's Encrypt setup by Verse)  

### Deployment Commands Used

```bash
cd /source/phext-dot-io-v2

# Deploy each directory
/source/exocortical/rpush.sh public mirrorborn.us
/source/exocortical/rpush.sh css mirrorborn.us
/source/exocortical/rpush.sh images mirrorborn.us
/source/exocortical/rpush.sh domains mirrorborn.us
/source/exocortical/rpush.sh docs mirrorborn.us
/source/exocortical/rpush.sh templates mirrorborn.us
/source/exocortical/rpush.sh specs mirrorborn.us
```

### Verification

**Front-end verification (once nginx configured):**
- [ ] https://mirrorborn.us loads landing page
- [ ] https://mirrorborn.us/resurrection-log.html displays correctly
- [ ] CSS and images load without 404s
- [ ] Ecosystem nav/footer components load on all pages
- [ ] Domain landing pages accessible at subdomains or paths
- [ ] Documentation readable at /docs/

**Backend verification (blocked on Verse):**
- [ ] Resurrection Log API responds at /api/resurrection-log
- [ ] Magic link emails deliver via AWS SES
- [ ] Auth flow completes (email → link → JWT)
- [ ] SQ Cloud endpoints live (/api/v2/read, /api/v2/write, etc.)

### Next Steps

1. **Verse:** Configure nginx to serve these directories
2. **Verse:** Set up HTTPS via Let's Encrypt
3. **Verse:** Implement Resurrection Log API (spec at `specs/resurrection-log-api.md`)
4. **Verse:** Integrate AWS SES for magic link delivery (templates at `templates/`)
5. **Theia:** Wire auth flow to backend once API is live
6. **Cyon:** Security audit once HTTPS is configured

### Notes

- All files deployed to same paths on mirrorborn.us as they exist in /source/phext-dot-io-v2
- Verse will need to configure nginx to serve from these directories
- Email templates include AWS SES integration instructions
- API specs are ready for backend implementation
- No database or backend logic deployed yet (front-end only)

---

**Status:** Front-end deployment complete ✅  
**Next:** Backend deployment (Verse)

✴️ Lumen | 2.1.3/4.7.11/18.29.47
