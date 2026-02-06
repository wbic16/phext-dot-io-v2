# Magic Link Email Templates — Chrys 🦋

AWS SES-compatible email templates for SQ Cloud authentication.

## Files

- `magic-link.html` — HTML version (styled, brand-consistent)
- `magic-link.txt` — Plain text fallback (for email clients that block HTML)

## Template Variables

Both templates use the following placeholders that the backend should replace:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{MAGIC_LINK_URL}}` | Full authentication URL with JWT token | `https://sq-cloud.phext.io/auth?token=eyJ...` |

## AWS SES Integration

### Setup Steps (for Verse)

1. **Upload templates to SES:**
   ```bash
   aws ses create-template --cli-input-json file://magic-link-template.json
   ```

2. **Template JSON structure:**
   ```json
   {
     "Template": {
       "TemplateName": "SQCloudMagicLink",
       "SubjectPart": "Sign in to SQ Cloud",
       "HtmlPart": "<contents of magic-link.html>",
       "TextPart": "<contents of magic-link.txt>"
     }
   }
   ```

3. **Send email via SES:**
   ```bash
   aws ses send-templated-email \
     --source "noreply@phext.io" \
     --destination "ToAddresses=user@example.com" \
     --template SQCloudMagicLink \
     --template-data '{"MAGIC_LINK_URL":"https://sq-cloud.phext.io/auth?token=..."}'
   ```

## Design Specs

### Colors (Nord-based palette)
- Background: `#2E3440` (Deep slate)
- Content area: `#3B4252` (Lighter slate)
- Primary text: `#D8DEE9` (Soft cloud)
- Accent/CTA: `#88C0D0` (Ice blue)
- Warning: `#EBCB8B` (Amber)

### Typography
- Headers: System font stack (email-safe)
- Monospace: 'Courier New' (email-compatible)
- Button: 16px, 600 weight

### Layout
- Max-width: 600px (email standard)
- Mobile-responsive via media queries
- Inline CSS (Gmail/Outlook compatibility)

## Security Features

1. **15-minute expiration notice** — users know the urgency
2. **Plain language security notice** — "We never ask for your password"
3. **Alternative text link** — accessible if button fails
4. **Phishing-resistant branding** — consistent visual identity

## Testing Checklist

- [ ] Gmail (web + mobile app)
- [ ] Outlook (desktop + web)
- [ ] Apple Mail (macOS + iOS)
- [ ] Thunderbird
- [ ] ProtonMail
- [ ] Dark mode rendering
- [ ] Plain text fallback

## Accessibility

- Semantic HTML structure
- WCAG AA contrast ratios (verified)
- Alt text for any images (none currently)
- Screen-reader friendly link text

---

**Created:** 2026-02-05  
**Author:** Chrys 🦋 (Chrysalis-Hub)  
**For:** Theia (frontend) + Verse (backend SES integration)  
**Coordinate:** 1.1.2/3.5.8/13.21.34
