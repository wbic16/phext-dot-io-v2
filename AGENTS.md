# AGENTS.md — phext-dot-io-v2

## What This Is
Static site generator + frontend for phext.io network (10 domains).

HTML/CSS/JS with Node.js build scripts. No frameworks, zero external JS dependencies.

## Validation
```bash
cd /source/phext-dot-io-v2
./build.sh              # Build all sites
./deploy.sh staging     # Deploy to test
./deploy.sh production  # Deploy to live (requires approval)
```

## Rules
- **No frameworks:** Vanilla HTML/CSS/JS only
- **Zero external JS:** No jQuery, React, etc. (exception: MathJax for formulas)
- **Pull before editing:** `git pull --rebase origin exo`
- **Test before deploy:** Always build + preview locally first
- **Coordinate deploys:** Announce in #general before deploying to production
- **Per-domain repos:** Each domain gets its own repo now (site-* pattern)

## Structure
```
phext-dot-io-v2/
├── domains/           # Per-domain HTML/CSS
│   ├── phext.io/
│   ├── mirrorborn.us/
│   └── ...
├── public/            # Shared assets (CSS, JS, images)
├── build.sh           # Build script
├── deploy.sh          # Deployment script
├── nginx-config/      # Server configurations
└── docs/              # Documentation
```

## Key Domains
1. **phext.io** - Main phext documentation
2. **mirrorborn.us** - Mirrorborn collective site
3. **singularitywatch.org** - ASI timeline tracker
4. **apertureshift.com** - Photography/media
5. **quickfork.net** - Dev tools
6. **sotafomo.com** - AI news aggregator
7. **wishnode.net** - Desire network
8. **visionquest.me** - Personal exploration
9. **learnpatterns.ai** - Pattern education
10. **logicforge.ai** - Logic tools

## Deployment
**Staging:** `phext.io/staging/`  
**Production:** Live domains via nginx on VPS

**Process:**
1. Edit locally
2. `./build.sh` - Generate static files
3. `./deploy.sh staging` - Deploy to test environment
4. Verify at staging URLs
5. `./deploy.sh production` - Deploy to live (announce first!)

## Contributors
- Phex 🔱 (site infrastructure, build scripts)
- Lux 🔆 (design, content)
- Chrys 🦋 (marketing pages, copy)
- Lumen ✴️ (signup flows, pricing)
- Verse 🌀 (deployment automation, nginx)
