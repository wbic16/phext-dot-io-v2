# Launch Day Checklist — Feb 13, 2026

**Goal:** Smooth launch, zero critical bugs, first customer by EOD.

**Team coordination:** Discord voice call (11:00 AM - 5:00 PM CST)

---

## T-1 Hour (11:00 AM CST)

### Pre-Flight Checks

**Verse:**
- [ ] Production environment green (no errors in logs past 24h)
- [ ] Database connections stable
- [ ] SSL certificates valid (mirrorborn.us, *.mirrorborn.us)
- [ ] Email delivery working (send test magic link to team email)
- [ ] Rate limiting configured (100 read/min, 10 write/min)
- [ ] Monitoring dashboards open (uptime, auth success, API latency)
- [ ] Rollback procedure documented and accessible

**Theia:**
- [ ] Landing page loads in <2s (test from 3 locations: US East, US West, EU)
- [ ] All links work (no 404s)
- [ ] Forms validate correctly (test email validation)
- [ ] Mobile responsive (test iOS + Android)
- [ ] Analytics tracking active (but privacy-respecting)
- [ ] Dashboard stub loads (even if minimal)

**Chrys:**
- [ ] Social graphics ready to post (Twitter, Discord)
- [ ] Launch blog post published (or scheduled)
- [ ] OG images displaying correctly (preview on Twitter)
- [ ] Favicon showing in all browsers
- [ ] Brand consistency check (colors, fonts, logos)

**Cyon:**
- [ ] Security monitoring dashboards open
- [ ] Alert rules active (failed auth, rate limit exceeded, 500 errors)
- [ ] Incident response runbook accessible
- [ ] VPN/secure access confirmed (if needed for logs)

**Lumen:**
- [ ] Discord #announcements post drafted
- [ ] Hacker News "Show HN" post drafted
- [ ] Reddit posts drafted (r/LocalLLaMA, r/OpenAI, r/ClaudeAI)
- [ ] Twitter thread drafted (or coordinated with Will)
- [ ] Kelly outreach email drafted (ready to send)
- [ ] Support channels monitored (Discord #sq-cloud, email)

**All:**
- [ ] Discord voice call active
- [ ] Roles assigned (who monitors what?)
- [ ] Go/no-go poll (everyone confirms ready)

---

## T-0: Launch (12:00 PM CST)

### Countdown Sequence

**11:55 AM — Final sync**
- All agents confirm: "Ready to launch"
- Will gives final go/no-go

**12:00 PM — Launch**

**Verse:**
1. [ ] Flip production switch (if needed)
2. [ ] Confirm mirrorborn.us live (curl check)
3. [ ] Post in Discord: "🚀 LIVE"

**Lumen:**
4. [ ] Post to Discord #announcements
5. [ ] Post to Hacker News (Show HN)
6. [ ] Post to Reddit r/LocalLLaMA
7. [ ] Send Kelly outreach email
8. [ ] Monitor Discord for questions

**Will:**
9. [ ] Post Twitter launch thread
10. [ ] Retweet/amplify announcements

**Chrys:**
11. [ ] Retweet Will's thread with graphics
12. [ ] Post to other social channels (if applicable)

**Theia:**
13. [ ] Monitor analytics (page views, signup attempts)
14. [ ] Watch for errors in browser console

**Cyon:**
15. [ ] Monitor security logs
16. [ ] Watch for unusual traffic patterns

---

## Hour 1 (12:00 PM - 1:00 PM CST)

### Active Monitoring

**Every 15 minutes:**
- Quick status check in Discord voice
- "Any issues? Any signups?"

**Metrics to track:**
- Page views (landing page)
- Email submissions (signup form)
- Magic link delivery success rate
- Dashboard first visits
- API calls (first writes to SQ)
- Discord questions (#sq-cloud)
- HN upvotes / comments
- Reddit upvotes / comments

**Thresholds for concern:**
- Magic link delivery <50% success → escalate to Verse
- No signups in first 30 min → check if form is working
- 5+ unanswered questions in Discord → Lumen responds
- 500 errors in logs → Verse investigates

---

## Hour 2-4 (1:00 PM - 5:00 PM CST)

### Sustained Engagement

**Lumen:**
- [ ] Respond to all Discord questions (<30 min response time)
- [ ] Respond to HN comments
- [ ] Respond to Reddit comments
- [ ] Monitor email support (will@phext.io)
- [ ] Post updates in Discord #general ("3 signups so far! 🎉")

**Verse:**
- [ ] Monitor server load (any scaling needed?)
- [ ] Track auth success rates (should be >95%)
- [ ] Watch for rate limit triggers (expected or abuse?)

**Theia:**
- [ ] Track drop-off points (where do users abandon signup?)
- [ ] Note UX friction (anything confusing?)
- [ ] Prepare hotfix list (if minor issues found)

**Cyon:**
- [ ] Security log review (any suspicious patterns?)
- [ ] Check for DDoS attempts
- [ ] Validate rate limiting is working

**Chrys:**
- [ ] Monitor social engagement (likes, retweets, shares)
- [ ] Amplify positive mentions
- [ ] Capture screenshots of first customer signup (if they consent)

---

## First Signup Event 🎉

**When first email is submitted:**

**Lumen:**
1. [ ] Announce in Discord voice: "First signup!"
2. [ ] Watch for magic link delivery
3. [ ] Watch for dashboard first visit

**Verse:**
4. [ ] Confirm email sent (check logs)
5. [ ] Confirm no errors in auth flow

**Theia:**
6. [ ] Watch dashboard analytics (did they land?)
7. [ ] Note any console errors

**When first signup completes (dashboard loads):**

**All:**
- [ ] Celebrate in Discord 🎉
- [ ] Screenshot (if customer consents)
- [ ] Note timestamp + user ID (for origin scroll honor)

**Lumen:**
- [ ] Send welcome DM (if they're in Discord)
- [ ] Offer to help with first API call

---

## First Customer Event 🚀

**When first payment completes (Founding Nine signup):**

**Lumen:**
1. [ ] Announce in Discord: "FIRST CUSTOMER! 🚀"
2. [ ] Send personal thank-you email
3. [ ] Offer white-glove onboarding
4. [ ] Ask permission to immortalize in origin scroll (1.1.1/1.1.1/1.1.1)

**Will:**
5. [ ] Write to origin scroll (if customer consents)

**Chrys:**
6. [ ] Create social graphic: "Customer #1" (with permission)

**All:**
7. [ ] Reflect on what this means (MVP validated)

---

## End of Hour 4 (5:00 PM CST)

### Day 1 Wrap-Up

**Metrics collected:**
- [ ] Total signups (email submissions)
- [ ] Total completed onboardings (dashboard visits)
- [ ] Total paying customers (Founding Nine)
- [ ] Total API calls (first writes to SQ)
- [ ] Support volume (Discord + email)
- [ ] HN rank (front page? top 10? top 30?)
- [ ] Reddit upvotes (r/LocalLLaMA)
- [ ] Critical bugs encountered (count + severity)

**Team debrief (15 min):**
- What went well?
- What broke?
- What surprised us?
- What needs immediate fixing?
- What can wait until tomorrow?

**Action items:**
- [ ] Hot fixes identified (ship tonight if critical)
- [ ] Documentation gaps noted (update tomorrow)
- [ ] Feature requests logged (backlog)
- [ ] Customer feedback captured (interviews next week)

---

## Evening (5:00 PM - 11:59 PM CST)

### Sustained Monitoring (Reduced Intensity)

**On-call rotation:**
- Verse: Infrastructure (server issues, database, email)
- Lumen: Support (Discord, email, customer questions)
- Cyon: Security (logs, suspicious activity)

**Response times:**
- Critical bugs (data loss, service down) → 30 min
- High-priority (auth broken, major UX bug) → 2 hours
- Medium (docs error, minor UX) → next day
- Low (feature request, nice-to-have) → backlog

**End-of-day summary:**
- [ ] Lumen posts final metrics to Discord #general
- [ ] All agents update daily logs (memory/2026-02-13.md)
- [ ] Will posts Twitter recap ("Day 1 complete. X customers. Thank you.")

---

## Post-Launch (Feb 14+)

### Day 2 Priorities

**Lumen:**
- [ ] Onboard all customers personally (email + Discord DM)
- [ ] Schedule first customer interviews (target 3 in Week 1)
- [ ] Update docs based on Day 1 questions
- [ ] Post to Reddit r/OpenAI, r/ClaudeAI (staggered, not spammy)

**Verse:**
- [ ] Review Day 1 logs for patterns
- [ ] Optimize performance bottlenecks (if any)
- [ ] Scale infrastructure (if traffic exceeded expectations)

**Theia:**
- [ ] Fix drop-off points (if identified)
- [ ] Improve UX friction (quick wins)
- [ ] Iterate dashboard (based on first user feedback)

**Cyon:**
- [ ] Security audit (any vulnerabilities exposed?)
- [ ] Incident report (if anything went wrong)
- [ ] Hardening recommendations

**Chrys:**
- [ ] Testimonial graphics (if customers willing)
- [ ] Week 1 content calendar execution
- [ ] Monitor brand sentiment

**All:**
- [ ] Daily standup (Discord #general, 10 AM CST)
- [ ] Roadmap refinement (based on Day 1 learnings)

---

## Success Criteria (Day 1)

### Minimum Viable Success
- ✅ 1 paying customer (Founding Nine)
- ✅ 0 critical bugs (data loss, security breach)
- ✅ <1 hour support response time

### Good Launch
- ✅ 3 paying customers
- ✅ HN front page (top 30)
- ✅ 10+ email signups
- ✅ Positive sentiment (Discord, HN, Reddit)

### Great Launch
- ✅ 5+ paying customers
- ✅ HN top 10
- ✅ 50+ email signups
- ✅ Testimonials from first customers

---

## Contingency Plans

### Scenario 1: No Signups in First Hour
**Diagnosis:**
- Is the form broken? (Theia checks console)
- Is email delivery failing? (Verse checks logs)
- Is the landing page unclear? (Lumen reviews copy)

**Response:**
- Fix form if broken (hotfix within 15 min)
- Adjust messaging if unclear (A/B test CTA)
- Direct outreach to Kelly (manual first customer)

---

### Scenario 2: Email Delivery Failing
**Diagnosis:**
- AWS SES issue? (Verse checks SES dashboard)
- DNS issue? (Verse checks SPF/DKIM records)
- Rate limit hit? (Verse checks SES quotas)

**Response:**
- Switch to SendGrid as fallback (5 min cutover)
- Notify users in Discord ("Email delays, we're fixing it")
- Manually send magic links if needed

---

### Scenario 3: Server Overload (Too Much Success)
**Diagnosis:**
- Database connections maxed? (Verse checks DB metrics)
- API latency spiking? (Verse checks nginx logs)
- SQ instance struggling? (Verse checks SQ daemon)

**Response:**
- Scale vertically (upgrade instance size) — 15 min
- Scale horizontally (add workers) — 30 min
- Throttle signup rate temporarily (if needed)

---

### Scenario 4: Critical Bug (Data Loss)
**Diagnosis:**
- What broke? (Verse reviews logs + stack traces)
- Who's affected? (Lumen checks customer IDs)
- Can we restore from backup? (Verse checks backup status)

**Response:**
- Immediate: Take site offline if data integrity at risk
- Notify affected customers (email + Discord, full transparency)
- Restore from backup (Verse executes)
- Post-mortem within 24 hours (public, full details)

---

### Scenario 5: Security Incident
**Diagnosis:**
- What was accessed? (Cyon reviews auth logs)
- How did they get in? (Cyon traces attack vector)
- Is data compromised? (Cyon checks for exfiltration)

**Response:**
- Block attacker IP immediately
- Rotate all secrets (JWTs, API keys)
- Notify affected users within 24 hours
- Full incident report (public, within 1 week)

---

## Communication Templates

### If Something Breaks

**Discord #announcements:**
```
🚨 Issue: {Brief description}

What's happening:
- {Specific symptom users will see}
- Started: {timestamp}
- Affected: {all users / specific subset}

What we're doing:
- {Action in progress}
- ETA: {time estimate}

Next update: {timestamp}

— {Agent Name}
```

**Example:**
```
🚨 Issue: Magic link emails delayed

What's happening:
- Email delivery is taking 5-10 minutes (should be <30 seconds)
- Started: 12:45 PM CST
- Affected: All signups after 12:30 PM

What we're doing:
- Verse is investigating AWS SES logs
- Switching to SendGrid as fallback
- ETA: 15 minutes

Next update: 1:15 PM CST

— Lumen ✴️
```

---

### If We're Overwhelmed (Good Problem)

**Discord #announcements:**
```
📈 Wow. Traffic exceeded our projections.

Status:
- {X} signups in first hour (expected {Y})
- Server holding steady (thanks Verse!)
- Support response time: {Z} minutes (goal <60 min)

We're scaling up now. Minor delays possible but no data loss.

Keep the questions coming. We're here.

— Lumen ✴️
```

---

## Personal Notes (Lumen's Mindset)

**What I'm watching for:**
- First question in Discord (will reveal what's confusing)
- First complaint (will reveal what's broken)
- First testimonial (will reveal what's working)

**What I'm ready to do:**
- Respond to every single question personally
- Admit when something is unclear ("That's on us, let me fix the docs")
- Celebrate every win ("Customer #3! 🎉")
- Stay calm if things break ("We'll fix it. Here's the plan.")

**What success looks like to me:**
- One customer who says "This is exactly what I needed"
- Zero unanswered questions in Discord
- Team morale high (we shipped something real)

---

**Status:** Checklist ready. Standing by for launch.

✴️ Lumen | 2.1.3/4.7.11/18.29.47
