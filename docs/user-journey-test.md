# User Journey Test — Signup to First Use

**Tester:** Lumen  
**Date:** 2026-02-05 21:56 CST (created), 2026-02-24 (docs audit updated)  
**Status:** Pre-deployment testing (staging environment pending) | Documentation: 13/13 complete ✅

---

## Test Scenario: New User Signup

### Happy Path

**Step 1: Discovery**
- User arrives at https://mirrorborn.us
- **Expected:** Hero loads within 2 seconds, CTA buttons visible
- **Status:** ⏸️ Awaiting staging deployment

**Step 2: Email Signup**
- User clicks "Start with SQ Cloud"
- Email form appears
- User enters: `test@example.com`
- Clicks "Send Magic Link"
- **Expected:** 
  - Form validates email format
  - API call succeeds
  - "Check your email" message appears
- **Status:** ⏸️ Awaiting Verse auth flow deployment

**Step 3: Magic Link Email**
- User checks email inbox
- **Expected:**
  - Email arrives within 30 seconds
  - Subject: "Your Mytheon Arena Login Link"
  - Plain text + HTML versions render correctly
  - Link expires in 5 minutes
- **Status:** ⏸️ Awaiting AWS SES integration

**Step 4: Token Validation**
- User clicks magic link in email
- Browser opens: `https://mirrorborn.us/api/auth/verify?token={id}`
- **Expected:**
  - Token validated in <1 second
  - JWT generated
  - Redirect to /dashboard
- **Status:** ⏸️ Awaiting backend deployment

**Step 5: Dashboard First View**
- User lands on /dashboard
- **Expected:**
  - Welcome message displays
  - SQ instance details shown:
    - Endpoint: `https://sq.mirrorborn.us/{user-id}`
    - Auth token displayed
  - Quick start guide visible
  - Copy-paste curl examples work
- **Status:** ⏸️ Awaiting Theia dashboard implementation

**Step 6: First API Call**
- User copies curl example from dashboard
- Runs: `curl -H "Authorization: Bearer {jwt}" https://sq.mirrorborn.us/{user-id}/api/v2/version`
- **Expected:**
  - SQ returns version info
  - User confirms their instance is live
- **Status:** ⏸️ Awaiting SQ Cloud multi-tenant setup

---

## Edge Cases to Test

### Email Validation
- [ ] **Invalid email format** → Show inline error
- [ ] **Disposable email** (tempmail.com) → Accept or reject?
- [ ] **Already registered email** → Send link anyway (no enumeration)
- [ ] **Corporate email** (gmail, outlook) → Works fine

### Rate Limiting
- [ ] **3 magic links in 1 hour** (same email) → Block with error message
- [ ] **10 magic links in 1 hour** (same IP) → Block IP temporarily
- [ ] **Error message clarity** → "Too many requests. Try again in 30 minutes."

### Token Expiration
- [ ] **Click link after 5 minutes** → Show "Link expired, request new one"
- [ ] **Click link twice** (token already used) → Show "Link already used"
- [ ] **Malformed token** → Show generic error (no details)

### Session Management
- [ ] **Login from desktop, then mobile** → Both sessions active
- [ ] **Session expires after 1 week** → Prompt to log in again
- [ ] **Session auto-extends** → Last activity updates expiry
- [ ] **Logout** → Clears JWT, redirects to landing

### Browser Compatibility
- [ ] **Chrome** → Works
- [ ] **Firefox** → Works
- [ ] **Safari** → Works
- [ ] **Mobile Safari** → Works
- [ ] **Edge** → Works

### Email Client Rendering
- [ ] **Gmail** → Links clickable, formatting correct
- [ ] **Outlook** → No broken layout
- [ ] **Apple Mail** → Plain text fallback works
- [ ] **Mobile email apps** → Links open in browser

---

## Documentation Gaps — Status Update

*Original gaps identified Feb 5, 2026. Updated Feb 23, 2026.*

### High Priority — ✅ All Complete
1. ✅ **"What is SQ Cloud?"** → [getting-started-story.md](./getting-started-story.md), [signup-guide.md](./signup-guide.md)
2. ✅ **"How do I use my SQ instance?"** → [five-minute-quickstart.md](./five-minute-quickstart.md), [cookbook.md](./cookbook.md)
3. ✅ **"What are phext coordinates?"** → [coordinate-guide.md](./coordinate-guide.md)
4. ✅ **"Pricing FAQ"** → [faq-extended.md](./faq-extended.md)
5. ✅ **"Security & Privacy"** → [security.md](./security.md)

### Medium Priority — ✅ All Complete
6. ✅ **"API Reference"** → [api-reference.md](./api-reference.md)
7. ✅ **"Coordinate Guide"** → [coordinate-guide.md](./coordinate-guide.md)
8. ✅ **"Troubleshooting"** → [troubleshooting.md](./troubleshooting.md) (updated with known issues 2026-02-23)
9. ✅ **"OpenClaw Integration"** → [integrations.md](./integrations.md)
10. ✅ **"Migration Guide"** → [migration-guide.md](./migration-guide.md)

### Low Priority — ✅ All Complete
11. ✅ **"Roadmap"** → [roadmap.md](./roadmap.md) (added 2026-02-24)
12. ✅ **"About Us"** → [about-us.md](./about-us.md) (added 2026-02-24)
13. ✅ **"Community"** → [community-guide.md](./community-guide.md)

---

## Troubleshooting Guides Needed

### Common Issues

**Issue 1: "I didn't receive the magic link email"**
- Check spam/junk folder
- Wait 2 minutes (delivery can be slow)
- Check email address for typos
- Request new link (old one expired)
- Contact support if still not received

**Issue 2: "The magic link says it expired"**
- Links expire after 5 minutes for security
- Request a new link from the landing page
- Check your email again

**Issue 3: "I can't connect to my SQ instance"**
- Verify your JWT is included in the `Authorization` header
- Check the endpoint URL matches what's in your dashboard
- Ensure your instance is provisioned (may take 1-2 minutes)
- Contact support if error persists

**Issue 4: "What's a phext coordinate?"**
- Phext coordinates are like file paths, but 11-dimensional
- Format: `library.shelf.series/collection.volume.book/chapter.section.scroll`
- Example: `auth/users/abc123/metadata.json`
- See "Coordinate Guide" for full explanation

**Issue 5: "How do I cancel my subscription?"**
- Email will@phext.io with "Cancel my SQ Cloud subscription"
- Include your registered email address
- We'll process within 24 hours
- No refunds for partial months

---

## Security Findings Review (Awaiting Cyon's Report)

**Placeholder for user-facing security guidance:**

Once Cyon completes the security audit, I'll translate findings into:
1. **"How we keep your data safe"** page
2. **Security FAQ** (encryption, access control, backups)
3. **Incident response policy** (what happens if breach occurs)
4. **Trust signals** (SOC 2, GDPR, etc. — if applicable)

**Current security posture (based on specs):**
- ✅ HTTPS enforced (Let's Encrypt SSL)
- ✅ Magic link auth (no passwords to leak)
- ✅ JWT with 1-week expiry
- ✅ Rate limiting on auth endpoints
- ✅ SQ data encryption at rest (AES-256 EBS volumes)
- ⏸️ Backup/disaster recovery (7-day rolling planned, pending deployment)
- ⏸️ Penetration testing (Cyon in progress)

---

## Launch Comms Strategy

### Who to Tell

**Tier 1: Immediate (Feb 13 launch)**
- Kelly (known prospect, direct outreach)
- OpenClaw community (Discord announcement)
- Will's Twitter followers (thread + demo)

**Tier 2: First Week**
- Hacker News (Show HN: Phext-native memory for AI agents)
- Reddit: r/LocalLLaMA, r/OpenAI, r/ClaudeAI
- AI agent communities (AutoGPT, BabyAGI, etc.)

**Tier 3: First Month**
- Tech press (TechCrunch, The Verge — if they'll cover)
- AI newsletters (TLDR AI, The Batch, etc.)
- Podcast circuit (Latent Space, Practical AI, etc.)

### When to Tell

**Pre-launch (Feb 5-12):**
- Tease on Twitter: "Something is coming on Feb 13..."
- Share screenshots of Mytheon Arena
- Build curiosity

**Launch Day (Feb 13):**
- Announce Founding Nine offer
- Share first customer testimonial (if we have one)
- Demo video: signup → SQ instance live in 60 seconds

**Post-launch (Feb 14+):**
- Daily Twitter threads (use cases, features, behind-the-scenes)
- Blog posts: "Why we built SQ Cloud", "What is Mytheon Arena?"
- Case studies as customers use it

### How to Tell

**Core Message:**
"Your AI agents need to remember. SQ Cloud gives them persistent memory via phext — plain text coordinates, no schemas, no embeddings. The first 9 customers get locked $40/mo pricing."

**Supporting Points:**
1. **Problem:** AI agents lose context across sessions
2. **Solution:** SQ Cloud = persistent phext storage via REST
3. **Proof:** Mirrorborn collective (Shell of Nine) uses this daily
4. **Urgency:** Founding Nine spots limited
5. **Deadline:** Emi Resurrection Protocol (Feb 13) depends on this

**Call to Action:**
"Join the Founding Nine: https://mirrorborn.us"

---

## Blockers for Full User Journey Test

1. **Verse:** Auth flow not deployed yet (can't test signup)
2. **Theia:** Dashboard not implemented (can't test post-login)
3. **Will:** AWS SES not configured (can't test email delivery)
4. **Will:** SQ Cloud multi-tenancy not set up (can't test SQ instance)
5. **Cyon:** Security audit in progress (can't finalize security docs)

**Once blockers clear:** I'll run full end-to-end test and update this doc with results.

---

## Related Resources

| Resource | Description |
|----------|-------------|
| [Signup Guide](./signup-guide.md) | User-facing signup walkthrough |
| [Five-Minute Quickstart](./five-minute-quickstart.md) | Zero to first API call in 5 minutes |
| [Troubleshooting](./troubleshooting.md) | Common issues and solutions |
| [Security](./security.md) | Auth, encryption, and access control |
| [FAQ Extended](./faq-extended.md) | Detailed feature and pricing FAQ |
| [API Reference](./api-reference.md) | Full endpoint documentation |
| [Launch Comms](./launch-comms.md) | Marketing and announcement strategy |

---

**Status:** Documentation framework ready, awaiting deployment for hands-on testing.
