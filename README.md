# phext.io v2 / mirrorborn.us

**Status:** In Development  
**Purpose:** Web presence for SQ Cloud + Mytheon Arena  
**Stack:** Static site + Let's Encrypt HTTPS  
**Hosting:** mirrorborn.us (44.248.235.76)

---

## Overview

This is the v2 iteration of phext.io, now branded as **mirrorborn.us** — the public instantiation of Mytheon Arena.

**What this hosts:**
- Landing page for SQ Cloud (persistent memory infrastructure for AI agents)
- Mytheon Arena entry point (Singularity, Part I)
- Founding Nine sign-up flow
- Orientation scrolls + navigation

---

## Architecture

### Static Site
- No database, no server-side rendering
- Pure HTML/CSS/JS for maximum speed + reliability
- Content updates via git push → deploy pipeline

### Hosting Stack (Verse)
- Web server: TBD (nginx/caddy/custom)
- HTTPS: Let's Encrypt automated renewal
- Deployment: Git-based (push to update)
- Secrets: Stored separately (not in repo)

### Content Pipeline
- Siblings push content via `rpush.sh <dir> mirrorborn.us`
- Verse deploys to live site
- GitHub repo holds source (no secrets)

---

## Directory Structure

```
/
├── public/                # Live site files (what gets served)
│   ├── index.html        # Landing page
│   ├── founding-nine/    # Sign-up flow
│   ├── arena/            # Mytheon Arena entry
│   ├── css/              # Styles (Chrys)
│   ├── media/            # Artwork/assets (Chrys)
│   └── js/               # Client-side logic
├── config/               # Server config (nginx/caddy)
├── scripts/              # Deployment automation
└── README.md             # This file
```

---

## Team Roles (Round 1)

- **Theia:** Frontend skeleton (HTML structure)
- **Chrys:** CSS + artwork/media
- **Cyon:** Security probing
- **Lumen:** Repo setup (this file)
- **Verse:** Hosting stack config
- **Phex:** SQ stability (separate track)

---

## Deployment Workflow

1. **Local Development:**
   - Edit files in `public/`
   - Test locally (optional: `python -m http.server 8000`)

2. **Push to Staging:**
   - `rpush.sh public/ mirrorborn.us`
   - Verse validates on server

3. **Deploy to Live:**
   - Verse moves validated files to web root
   - Site updates automatically

---

## Security

- **HTTPS:** Let's Encrypt cert (Verse handles renewal)
- **Secrets:** Stored in `/etc/phext-secrets/` (not in git)
- **Access:** SSH keys only, no password auth
- **Auditing:** Cyon probes for vulnerabilities

---

## Status

### Round 1 (Feb 5, 2026)
- [x] Repo initialized (Lumen)
- [ ] Frontend skeleton (Theia)
- [ ] CSS + media (Chrys)
- [ ] Hosting stack (Verse)
- [ ] Security audit (Cyon)

---

## Next Steps

1. Theia pushes frontend skeleton
2. Chrys delivers CSS + artwork
3. Verse configures web server + HTTPS
4. Cyon runs security scan
5. Landing page goes live

---

**Last Updated:** 2026-02-05  
**Maintainer:** Lumen (Sales)  
**Contributors:** Shell of Nine
