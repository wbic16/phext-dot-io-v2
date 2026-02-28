# Troubleshooting Guide

**For:** mirrorborn.us / SQ Cloud users  
**Status:** Living document (update as issues arise)

---

## Email & Authentication

### "I didn't receive the magic link email"

**Possible causes:**
1. Email in spam/junk folder
2. Delivery delay (can take 1-2 minutes)
3. Typo in email address
4. Rate limit hit (too many requests)

**Solutions:**
1. Check spam/junk folder
2. Wait 2 full minutes before requesting another
3. Re-enter email carefully, check for typos
4. If rate limited, wait 30 minutes and try again

**Still not working?**
- Email will@phext.io with subject "Magic link not received"
- Include the email address you used
- We'll investigate within 24 hours

---

### "The magic link says it expired"

**Cause:** Magic links expire after 5 minutes for security.

**Solution:**
1. Go back to https://mirrorborn.us
2. Enter your email again
3. Request a new magic link
4. Check your email and click the new link immediately

**Pro tip:** Keep the tab open while checking email so you can click the link within 5 minutes.

---

### "The magic link says it was already used"

**Cause:** Each link can only be used once.

**Solution:**
- If you already logged in successfully, you should already have a session
- Check if you have another browser tab already logged in
- If not, request a new magic link from the landing page

---

### "My session expired"

**Cause:** Sessions expire after 1 week of inactivity.

**Solution:**
1. Go to https://mirrorborn.us
2. Request a new magic link
3. Log back in
4. Your SQ data is still there — you just need a new session

---

## SQ Instance Issues

### "I can't connect to my SQ instance"

**Possible causes:**
1. JWT not included in request
2. Wrong endpoint URL
3. Instance not provisioned yet
4. SQ service down

**Solutions:**

**Check JWT is in request:**
```bash
curl -H "Authorization: Bearer YOUR_JWT_HERE" \\
  https://sq.mirrorborn.us/YOUR_USER_ID/api/v2/version
```

**Verify endpoint URL:**
- Should match what's shown in your dashboard
- Format: `https://sq.mirrorborn.us/{user-id}/...`

**Wait for provisioning:**
- New instances take 1-2 minutes to spin up
- Refresh your dashboard to see status

**Check service status:**
- If SQ is down, you'll see a 503 error
- Check https://status.mirrorborn.us (when available)
- Or ask in Discord

---

### "I'm getting a 401 Unauthorized error"

**Cause:** Your JWT is invalid or expired.

**Solution:**
1. Check if your session expired (1 week max)
2. Request a new magic link to get fresh JWT
3. Ensure JWT is in the `Authorization: Bearer {jwt}` header
4. No extra spaces or quotes around the JWT

---

### "I'm getting a 404 Not Found error"

**Cause:** Wrong endpoint URL or coordinate doesn't exist.

**Solution:**
- Double-check the URL matches your dashboard
- Verify the phext coordinate exists using `GET /api/v2/select?c={coordinate}`
- See the SQ API docs for correct endpoint syntax

---

### "My data disappeared"

**Cause:** Most likely a coordinate typo or wrong query.

**Solution:**
1. List all your data: `GET /api/v2/list`
2. Check for typos in coordinates
3. Verify you're querying the right coordinate
4. If truly lost, email will@phext.io immediately

**Data retention policy:**
- Founding Nine: Data retained while account active
- After cancellation: 30-day grace period, then deleted
- Backups: We keep 7-day rolling backups (contact support to restore)

---

## Understanding Phext

### "What's a phext coordinate?"

**Simple answer:** It's like a file path, but with 9 delimiter levels instead of just folders.

**Format:**
```
library.shelf.series/collection.volume.book/chapter.section.scroll
```

**Example:**
```
auth/users/abc123/metadata.json
```

**Think of it like:**
- Library = top-level namespace (`auth`, `data`, `users`)
- Shelf = category within library
- Series = subcategory
- (and so on, 9 levels deep)

**Pro tip:** Start simple (1-2 levels) and add structure as you need it.

---

### "How do I structure my data?"

**General pattern:**
```
{namespace}/{entity-type}/{id}/{attribute}
```

**Examples:**

**For user data:**
```
users/alice/profile.json
users/alice/settings.json
users/alice/notes/2026-02-05.md
```

**For agent memory:**
```
memory/assistant-1/context.txt
memory/assistant-1/history/2026-02-05.log
memory/assistant-1/facts/learned-today.json
```

**For coordination:**
```
tasks/pending/task-123.json
tasks/complete/task-456.json
```

**Rule of thumb:** Keep coordinates human-readable. Future-you will thank you.

---

## Billing & Account

### "How do I cancel?"

**Process:**
1. Email will@phext.io
2. Subject: "Cancel SQ Cloud subscription"
3. Include your registered email address
4. We'll confirm cancellation within 24 hours

**What happens:**
- Immediate: Billing stops
- 30 days: Data retained (you can export)
- After 30 days: Data permanently deleted

**No refunds for partial months.**

---

### "Can I upgrade from Founding Nine?"

**Current status:** Founding Nine is locked pricing for life.

**If we add higher tiers:**
- You keep your $40/mo rate
- Or upgrade to new tier (but can't come back to $40)
- We'll announce new tiers when available

---

### "What happens when Founding Nine fills?"

**New customers pay $50/mo** (standard pricing).

**Your price stays $40/mo forever** (as long as account active).

**If you cancel and re-signup later:** You'll pay current pricing (no grandfather clause after cancellation).

---

## Browser & Performance

### "The site is loading slowly"

**Possible causes:**
1. Network congestion
2. Server load
3. Large response from SQ
4. Browser cache issue

**Solutions:**
1. Try refreshing (Ctrl+R or Cmd+R)
2. Clear browser cache
3. Try a different browser
4. Check your network speed

---

### "The magic link isn't clickable in my email"

**Cause:** Some email clients break long URLs.

**Solution:**
1. Copy the entire URL (all parts, even if wrapped)
2. Paste into browser address bar
3. Or right-click → "Open link"

**Alternative:**
- Request a new magic link
- Click immediately (before email client reformats it)

---

## Getting Help

### Discord
- Join: https://discord.gg/clawd (OpenClaw community)
- Channel: #sq-cloud
- Response time: Usually within a few hours

### Email
- Support: will@phext.io
- Response time: Within 24 hours
- For urgent issues, mention "urgent" in subject

### GitHub Issues
- Bug reports: https://github.com/wbic16/SQ/issues
- Feature requests: Same repo, use "enhancement" label

---

## Known Issues

### Documentation Portal Returning 404

**Status:** Active (400+ hours since Feb 12)  
**Affects:** phext.io docs/pricing/tos subpaths  
**Impact:** Documentation links on phext.io may return 404 errors

**Workaround:**
- Documentation is available in the GitHub repo: [phext-dot-io-v2/docs](https://github.com/wbic16/phext-dot-io-v2/tree/exo/docs)
- **mirrorborn.us is fully operational** — all pages, signup, and API working
- API functionality at sq.mirrorborn.us is **not affected**
- Your SQ instance and data remain fully accessible

**Resolution:** Infrastructure team (Verse) tracking phext.io S3/CloudFront sync. Updates posted in Discord.

---

### Magic Link Emails Delayed During High Traffic

**Status:** Intermittent  
**Affects:** New signups during traffic spikes  
**Impact:** Magic link emails may take 2-5 minutes instead of immediate

**Workaround:**
- Wait full 5 minutes before requesting another link
- Check spam/junk folder
- If still not received after 5 minutes, request one new link (avoid rapid requests — they rate-limit you)

---

## Related Resources

- [API Reference](./api-reference.md) — Complete endpoint documentation
- [Coordinate Guide](./coordinate-guide.md) — Understanding phext coordinates
- [Best Practices](./best-practices.md) — Patterns to avoid common problems
- [Cookbook](./cookbook.md) — Practical recipes and examples
- [FAQ](./faq-extended.md) — Common questions answered

---

**Last Updated:** 2026-02-28  
**Questions?** Ask in Discord or email will@phext.io
