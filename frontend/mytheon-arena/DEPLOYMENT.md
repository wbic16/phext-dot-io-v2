# Deployment Guide — Mytheon Arena Frontend

## Zone Defense Architecture

**Single Frontend Codebase** deployed to 6 domains with per-domain theming and content.

### What's Shared
- JavaScript logic (auth, SQ client, domain navigation)
- HTML structure (forms, layout, responsive design)
- Core CSS (typography, spacing, interactions)
- Backend integration points (API endpoints)

### What's Differentiated
- Theme colors (via CSS variables + domain-themes.css)
- Hero copy and CTAs (loaded from domains.json)
- Domain branding in header/nav
- Landing page focus area

### Domains

| Domain | Theme | Focus | Role |
|--------|-------|-------|------|
| mirrorborn.us | Purple | Hub, ecosystem overview | Coordination |
| visionquest.me | Teal | Exploration, discovery | First-time users |
| apertureshift.com | Indigo | Perspective, strategy | Designers, thinkers |
| wishnode.net | Rose | Coordination, collaboration | Builders, teams |
| sotafomo.com | Amber | Community, events | Social, discovery |
| quickfork.net | Lime | Deployment, rapid build | Hackers, makers |

---

## Deployment Steps

### 1. Build/Bundle (when ready)
```bash
# Currently vanilla JS, no build step needed
# Future: minify, optimize for production
npm run build  # (placeholder)
```

### 2. Deploy to All Domains
```bash
# Copy to mirrorborn.us
/source/exocortical/rpush.sh /source/exo-mocks/theia mirrorborn.us

# Each domain pulls same codebase, applies domain-specific theme
# DNS already points all 6 domains to Verse
```

### 3. Verify Deployment
- [ ] mirrorborn.us loads (purple theme, hub focus)
- [ ] visionquest.me loads (teal theme, exploration focus)
- [ ] apertureshift.com loads (indigo theme, perspective focus)
- [ ] wishnode.net loads (rose theme, coordination focus)
- [ ] sotafomo.com loads (amber theme, community focus)
- [ ] quickfork.net loads (lime theme, deployment focus)

### 4. Test Auth Flow
- [ ] Email form submits
- [ ] Magic link sent (check backend logs)
- [ ] Token in URL validates
- [ ] Session created
- [ ] Scroll viewer loads authenticated

### 5. Test Domain Navigation
- [ ] Breadcrumb nav works on each domain
- [ ] Links between domains work
- [ ] mirrorborn.us shows domain mesh diagram
- [ ] Other domains show neighbor list

---

## File Structure

```
/frontend/mytheon-arena/
├── index.html           # Main entry point
├── domains.json         # Domain config + CTA copy
├── styles.css          # Shared styling
├── domain-themes.css   # Per-domain colors + gradients
├── domain-nav.js       # Domain network navigation
├── auth.js             # JWT auth, session management
├── main.js             # App logic, theming
├── sq-client.js        # SQ coordinate queries
└── DEPLOYMENT.md       # This file
```

---

## Environment Variables / Config

Currently hardcoded endpoints (should be config):
- `/api/v2/*` — SQ queries
- `/app/mytheon-arena/auth/*` — Auth endpoints

### For Verse to Configure
- Base API URLs (dev/staging/prod)
- SQ endpoint
- Auth server endpoint
- CORS headers
- Session expiry times (currently 1 week)

---

## Round 13 Prep

### Current Status
- [x] Frontend skeleton complete (vanilla HTML/JS)
- [x] Domain navigation network linked all 6 properties
- [x] Per-domain theming (colors, copy, CTAs)
- [x] Auth flow stubbed (JWT validation, session mgmt)
- [x] SQ client stubbed (coordinate lookup, caching)
- [ ] Verse deployment confirmed
- [ ] Backend auth endpoints live
- [ ] SQ integration tested
- [ ] Security audit (Cyon)
- [ ] Early user feedback (Lumen)

### Ready for Round 13
Once:
1. Verse deploys to all 6 domains
2. Backend auth endpoints ready
3. Cyon completes security baseline
4. Lumen gathers early feedback

We can:
- [ ] Tag v0.1 release
- [ ] Begin Round 13 (likely: content population, scroll curation, analytics)
- [ ] Iterate on UX based on real user behavior

---

## Notes

- **Single codebase** makes updates fast (one deploy = all 6 domains)
- **Shared logic** means fixes/features apply globally
- **Differentiated theming** provides distinct brand identity per property
- **domains.json** enables rapid copy/branding changes without code redeploy

This is an opinionated choice: speed over per-domain autonomy. As we grow, we can split if needed.
