# How We Keep Your Data Safe

**Last Updated:** 2026-02-05  
**Status:** Initial security posture (awaiting full audit from Cyon)

---

## Our Security Commitment

Your AI agents' memory is precious. We treat it that way.

This page explains what we do to keep your data safe, what risks exist, and what we're working on.

---

## What's Protected

### 1. Data in Transit
**Status:** ✅ **Protected**

- All connections use **HTTPS with TLS 1.2+**
- Certificates from **Let's Encrypt** (auto-renewed)
- **HSTS enabled** (browsers enforce HTTPS)
- **No mixed content** (all assets served over HTTPS)

**What this means:** Nobody can intercept your data between your browser and our servers.

---

### 2. Authentication
**Status:** ✅ **Magic Links (No Passwords)**

- **No passwords** means no passwords to leak
- **Magic links expire in 5 minutes**
- **Each link works once** (can't be replayed)
- **Sessions last 1 week** (auto-extend on activity)
- **JWT tokens** for API authentication

**What this means:** Even if someone steals your email, they have 5 minutes to use the link before it expires.

**Rate limiting:**
- 3 magic links per email per hour
- 10 magic links per IP per hour

**What this means:** Brute force attacks are blocked.

---

### 3. API Access
**Status:** ✅ **JWT Authentication**

- **Bearer token required** for all API calls
- Tokens tied to your session (expire with session)
- **No API keys** that can be leaked

**What this means:** Only you (with a valid session) can access your SQ instance.

---

### 4. Data at Rest
**Status:** ⏸️ **Being Evaluated**

- Stored on **AWS infrastructure**
- Region: **us-east-1** (configurable later)
- Encryption: **TBD** (checking with infrastructure team)

**What we're working on:**
- Encryption at rest (AES-256 or equivalent)
- Per-customer encryption keys
- Transparent to you (no performance hit)

---

### 5. Backups
**Status:** ⏸️ **Being Evaluated**

**Current plan:**
- 7-day rolling backups
- Stored separately from production data
- Encrypted (same as production)

**Recovery:**
- Contact support if you accidentally delete data
- We'll restore from backup (usually within 24 hours)

**What we're working on:**
- Automated backup verification
- Point-in-time recovery
- Self-service restore (via dashboard)

---

## What We Log

### Access Logs
**We log:**
- Timestamp of each request
- IP address
- API endpoint accessed
- HTTP status code

**We do NOT log:**
- Your phext content
- JWT tokens
- Email addresses in plain text

**Why we log:**
- Troubleshoot issues
- Detect abuse
- Improve performance

**Retention:** 30 days, then deleted.

---

### Error Logs
**We log:**
- Error messages
- Stack traces (server-side only)
- Request IDs for correlation

**We do NOT log:**
- User data in error messages
- Sensitive parameters

**Retention:** 30 days, then deleted.

---

## Who Has Access

### Your Data
**Access:**
- **You** (via your JWT)
- **Our infrastructure** (SQ service)
- **Nobody else** (no admin backdoor)

**Exception:**
- If you email support and explicitly ask us to look at your data, we may access it to help troubleshoot.
- We'll always ask permission first.

---

### Your Email
**Access:**
- **You**
- **Our auth system** (to send magic links)
- **AWS SES** (email delivery service)

**We do NOT:**
- Share your email with third parties
- Sell your email
- Send marketing emails (unless you opt in)

**We DO:**
- Send magic links when you request them
- Send account notifications (billing, security)

---

## Third-Party Services

### AWS (Infrastructure)
**What they do:** Host our servers, databases, email  
**What they see:** Encrypted data at rest, API traffic  
**Their security:** SOC 2 certified, GDPR compliant  
**Contract:** We have a Business Associate Agreement (BAA)

### Let's Encrypt (SSL Certificates)
**What they do:** Issue SSL certificates for HTTPS  
**What they see:** Our domain name (mirrorborn.us)  
**Their security:** Open-source, audited, trusted by all browsers

---

## What We're Auditing (Cyon's Security Review)

**Status:** In progress as of Feb 5, 2026

**Scope:**
1. **Penetration testing** — Can an attacker break in?
2. **Rate limiting validation** — Does it actually block abuse?
3. **JWT security** — Are tokens properly signed/validated?
4. **SQ access control** — Can users access each other's data?
5. **Email security** — Can magic links be intercepted/replayed?
6. **HTTPS enforcement** — Any mixed content vulnerabilities?
7. **Input validation** — Can an attacker inject malicious data?

**Timeline:** Audit complete by Feb 10. We'll publish findings here.

---

## What Happens If There's a Breach

### Our Promise
1. **We'll tell you within 24 hours** (email to your registered address)
2. **We'll explain what happened** (no corporate speak)
3. **We'll tell you what data was affected** (if any)
4. **We'll tell you what we're doing about it**
5. **We'll publish a post-mortem** (publicly, within 1 week)

### Your Rights
- **Right to know** — We'll be transparent
- **Right to export** — You can download your data anytime
- **Right to delete** — We'll delete your data if you cancel
- **Right to compensation** — If we screw up, we'll make it right

---

## Compliance

**Current status:** Early-stage startup, no formal certifications yet.

**On our roadmap:**
- **SOC 2 Type I** (within 6 months)
- **SOC 2 Type II** (within 12 months)
- **GDPR compliance** (we're designing for it now)
- **HIPAA** (if customers need it)

**What this means:**
- We're building security in from day one
- But we're not certified yet
- If you need formal compliance, email us — we'll prioritize

---

## Best Practices (What You Should Do)

### Protect Your Email Account
**Your email = your keys to SQ Cloud.**

- Use **2FA on your email** (Google, Outlook, etc.)
- Don't share your email password
- Don't click magic links you didn't request

---

### Protect Your JWT
**If someone gets your JWT, they can access your SQ instance.**

- Store JWT in **httpOnly cookies** (if you're building a web app)
- Never log your JWT
- Never commit JWT to git
- Rotate JWT regularly (log out and log back in)

---

### Protect Your Data
**You control what goes into SQ.**

- Don't store plaintext passwords in SQ
- Don't store API keys in SQ
- Encrypt sensitive data before writing to SQ (if needed)

---

## Reporting Security Issues

**Found a vulnerability?** We want to hear about it.

**Email:** will@phext.io  
**Subject:** "Security vulnerability in SQ Cloud"

**Include:**
- Description of the issue
- Steps to reproduce
- Potential impact
- Your contact info (if you want credit)

**We'll:**
- Acknowledge within 24 hours
- Fix critical issues within 48 hours
- Credit you (if you want) when we publish the post-mortem

**Please don't:** Publicly disclose the issue before we fix it.

---

## Questions?

**General security questions:** Email will@phext.io  
**Compliance questions:** Email will@phext.io  
**Incident reports:** Email will@phext.io (subject: "Security incident")

We'll respond within 24 hours (faster for critical issues).

---

**This page will be updated as:**
- Cyon completes the security audit (Feb 10)
- We implement new security features
- We get compliance certifications

Check back regularly or ask in Discord (#sq-cloud) for updates.
