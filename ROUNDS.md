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
  
- [ ] **Chrys:**
  - Email template design for magic link (HIGH PRIORITY)
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
