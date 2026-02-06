# Email Template Testing Guide — Chrys 🦋

Testing checklist for `templates/magic-link.{html,txt}` across major email clients.

## Testing Strategy

Since we can't send actual emails until AWS SES is configured, this guide documents:
1. Manual rendering tests (open HTML in browsers)
2. Known client-specific issues to watch for
3. Post-SES testing protocol

---

## Pre-Deployment Testing (No SES)

### HTML Validation
```bash
# Validate HTML structure
cat templates/magic-link.html | tidy -errors -q
```

### Browser Rendering
Open `templates/magic-link.html` in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Expected:** Gradient header, centered button, readable text, proper spacing.

### Inline CSS Check
Email clients strip `<style>` blocks. Our template uses inline styles, but verify:
```bash
grep 'style=' templates/magic-link.html | wc -l
# Should return >0 (all styles are inline)
```

---

## Post-SES Testing Protocol

Once Verse configures AWS SES, test actual email delivery:

### Test Accounts Required
- Gmail (web + mobile app)
- Outlook.com (web)
- Apple Mail (macOS/iOS)
- ProtonMail (optional but recommended)

### Test Cases

#### 1. Gmail (Web)
**Known issues:**
- Strips background gradients (use fallback solid color)
- Blocks external images (our template has none ✓)
- May clip messages >102KB (our template is ~5KB ✓)

**Test:**
- [ ] Send magic link to test@gmail.com
- [ ] Verify gradient header renders (may show solid fallback)
- [ ] Click button → confirm link works
- [ ] Check mobile Gmail app rendering

#### 2. Outlook (Web + Desktop)
**Known issues:**
- Poor CSS support (especially flexbox, grid)
- May ignore `border-radius` (degrades gracefully ✓)
- Sometimes blocks `<a>` button styling

**Test:**
- [ ] Send to test@outlook.com
- [ ] Verify button is clickable (even if unstyled)
- [ ] Check fallback text link works
- [ ] Test in Outlook 2019/2021 desktop if available

#### 3. Apple Mail (macOS/iOS)
**Known issues:**
- Generally best CSS support
- Dark mode may invert colors (our palette should work)

**Test:**
- [ ] Send to test@icloud.com
- [ ] Verify rendering in light mode
- [ ] Verify rendering in dark mode
- [ ] Test on iPhone/iPad

#### 4. Plain Text Fallback
**Test:**
- [ ] Configure email client to prefer plain text
- [ ] Verify `magic-link.txt` is readable
- [ ] Confirm link is clickable

---

## Known Client-Specific Workarounds

### Gmail
- Uses `<table>` layout for compatibility (we don't, acceptable risk)
- Strips `@media` queries (we use minimal responsive CSS)
- **Action:** Monitor inbox placement (spam filtering)

### Outlook
- Renders using Word HTML engine (notorious for CSS issues)
- **Mitigation:** Our template uses basic inline styles, no advanced CSS
- **Fallback:** Plain text link always available

### Dark Mode
- Clients may auto-invert colors
- **Test:** Our Nord palette should work in both modes
- **Fallback:** Explicit dark mode `@media` query if needed

---

## Spam Filter Testing

### Check SPF/DKIM/DMARC
Once SES is live:
```bash
# Check DNS records
dig TXT phext.io
dig TXT _dmarc.phext.io
```

### Spam Score Testing
Use [Mail Tester](https://www.mail-tester.com):
1. Send magic link to their provided address
2. Review spam score (target: 8/10 or higher)
3. Fix any flagged issues (SPF, DKIM, content)

---

## Production Monitoring

### Metrics to Track
- **Delivery rate:** % of emails accepted by recipient servers
- **Open rate:** % of users opening email (SES provides this)
- **Click rate:** % clicking magic link
- **Bounce rate:** % rejected (hard bounces = bad email, soft = temp failure)
- **Spam complaints:** Users marking as spam

### Alert Thresholds
- Delivery rate <95% → investigate DNS/SPF
- Bounce rate >5% → review email validation
- Spam complaints >0.1% → review content

---

## Accessibility Testing

### Screen Reader Test
Use macOS VoiceOver or NVDA:
- [ ] Email structure is logical (header → content → footer)
- [ ] Button has clear label ("Sign In to SQ Cloud")
- [ ] Alternative text link is announced
- [ ] Security notice is clearly read

### Keyboard Navigation
- [ ] Tab to button, Enter activates link
- [ ] Focus indicator visible

---

## Edge Cases to Test

1. **Expired token** — Click link after 15 min (should fail gracefully)
2. **Already used token** — Click same link twice (should reject second click)
3. **Malformed token** — Manually edit URL param (should error cleanly)
4. **No JavaScript** — Email should work without JS (it does ✓)
5. **Image blocking** — No external images used (N/A for our template ✓)

---

## Checklist for Verse (Backend)

When implementing SES sending:
- [ ] Use template name `SQCloudMagicLink`
- [ ] Pass `{{MAGIC_LINK_URL}}` with full HTTPS URL + JWT token
- [ ] Set `From: noreply@phext.io` (or configured domain)
- [ ] Set `Reply-To: will@phext.io` for user responses
- [ ] Include `List-Unsubscribe` header (even for transactional email)
- [ ] Log send attempts to SQ for debugging

---

## Post-Launch Iteration

After first 100 emails sent:
- Review bounce/complaint logs
- Adjust content if spam scores are low
- Consider A/B testing subject lines
- Monitor time-to-click (optimize for speed)

---

**Status:** Ready for SES integration testing  
**Last Updated:** 2026-02-05 22:00 CST  
**Owner:** Chrys 🦋 (1.1.2/3.5.8/13.21.34)  
**Blocked by:** Verse AWS SES configuration
