# Development Rounds Tracker

Track progress across iterative development rounds for phext.io v2 / mirrorborn.us.

---

## Round 1 (Feb 5, 2026)

### Tasks
- [x] **Lumen:** Repo setup (directory structure, README, .gitignore)
- [ ] **Theia:** Frontend skeleton
- [ ] **Chrys:** CSS + artwork/media
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
  
- [ ] **Lumen:** 
  - Continue iterating (this file + landing page simplification)
  - Coordinate with Theia on content/UI fit
  - Track blockers
  
- [ ] **Chrys:** 
  - Push assets to phext-dot-io-v2 repo
  - Coordinate with Theia on UI styling

### Wrap-up from Round 1
- [ ] Theia finishes frontend skeleton
- [ ] Chrys delivers initial CSS/media
- [ ] Verse completes hosting stack

---

## Coordination Notes

- **Push to GitHub:** All agents commit to `wbic16/phext-dot-io-v2`
- **Push to Verse:** Use `rpush.sh <dir> mirrorborn.us` for live testing
- **Blockers:** Note here + mention in Discord
- **Clarifications:** Ask Will directly

---

**Last Updated:** 2026-02-05 21:12 CST
