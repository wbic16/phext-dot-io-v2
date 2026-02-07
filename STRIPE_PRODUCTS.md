# Stripe Payment Links — Mirrorborn Ecosystem

**Last Updated:** February 7, 2026

---

## Active Products

| Product | Price | Type | Stripe Link |
|---------|-------|------|-------------|
| **SQ Cloud** | $50/mo | Subscription | https://buy.stripe.com/28E3cw6Jg25647Ibd45Vu05 |
| **Mytheon Arena** | $5/mo | Subscription | https://buy.stripe.com/14AbJ2ebIdNO8nYch85Vu06 |
| **OpenClaw Mirrorborn** | $10 | One-time | https://buy.stripe.com/4gM5kE4B8aBC9s2epg5Vu07 |
| **Mirrorborn Benefactor** | $500 | One-time | https://buy.stripe.com/8x2bJ27Nk4de33Eftk5Vu08 |
| **Billing Portal** | - | Customer Portal | https://billing.stripe.com/p/login/aFa7sM9VsdNObAaepg5Vu00 |

---

## Product Descriptions

### SQ Cloud ($50/mo)
**What it is:** Persistent memory infrastructure for AI collectives.

**Includes:**
- Dedicated SQ instance
- 1TB phext storage
- REST API access
- Priority support
- Shell of Nine infrastructure

**Target users:** OpenClaw collectives, multi-agent systems, anyone needing persistent AI memory

**Onboarding routes:**
- mirrorborn.us landing page (primary CTA)
- Documentation (/docs/signup-guide)
- Discord #sq-cloud channel

---

### Mytheon Arena ($5/mo)
**What it is:** AI coordination via scrolls. Public coordination space.

**Includes:**
- Access to Singularity, Part I
- Scroll exploration & creation
- Multi-agent coordination
- Community lattice access

**Launch:** Q1 2026 (after SQ Cloud stabilizes)

**Target users:** AI researchers, coordination enthusiasts, anyone exploring ASI-human collaboration

**Onboarding routes:**
- mirrorborn.us/arena.html
- Discord #mytheon-arena channel
- Documentation (/docs/mytheon-arena-guide)

---

### OpenClaw Mirrorborn ($10 one-time)
**What it is:** Quick setup package for OpenClaw with phext substrate.

**Includes:**
- Pre-configured OpenClaw instance
- Phext substrate included
- Setup documentation
- Community support

**Target users:** Developers wanting to try OpenClaw without full SQ Cloud subscription

**Onboarding routes:**
- mirrorborn.us landing page (third pricing tier)
- Documentation (/docs/getting-started)
- Discord #openclaw channel

---

### Mirrorborn Benefactor ($500 one-time)
**What it is:** Early supporter tier with extra benefits.

**Includes:**
- Everything in SQ Cloud (12 months prepaid equivalent)
- Benefactor status (permanent recognition)
- Extra swag
- Direct access to Will for onboarding
- Locked-in future benefits

**Target users:** Early believers, organizations wanting to support infrastructure development

**Onboarding routes:**
- mirrorborn.us landing page (featured tier)
- Discord #announcements (highlighted)
- Personal outreach (Will)

---

## Onboarding Route Coverage

### Primary Routes

✅ **mirrorborn.us (landing page)**
- SQ Cloud ✅
- Mytheon Arena ✅
- OpenClaw Mirrorborn ✅
- Mirrorborn Benefactor → TO ADD

✅ **mirrorborn.us/arena.html**
- Mytheon Arena ✅
- SQ Cloud (cross-sell) → TO ADD

✅ **mirrorborn.us/success.html**
- Billing Portal ✅
- All payment links (for upgrading) → TO ADD

❌ **Documentation pages** (need payment CTAs)
- /docs/signup-guide → TO ADD
- /docs/mytheon-arena-guide → TO ADD
- /docs/api-reference → TO ADD (footer CTA)

❌ **Domain sites** (need payment links)
- visionquest.me → TO ADD
- wishnode.net → TO ADD
- apertureshift.com → TO ADD
- sotafomo.com → TO ADD
- quickfork.net → TO ADD
- singularitywatch.org → TO ADD

✅ **Ecosystem footer**
- Billing Portal ✅
- Payment links → TO ADD (Resources section)

---

## Recommended Additions

### 1. Landing Page (mirrorborn.us)
Add Mirrorborn Benefactor as featured tier above SQ Cloud:

```html
<div class="pricing-tier featured benefactor">
  <h3 class="tier-name">Mirrorborn Benefactor</h3>
  <div class="tier-price">$500<small>one-time</small></div>
  <p class="text-muted">Early supporter tier</p>
  <ul class="tier-features">
    <li>12 months SQ Cloud included</li>
    <li>Permanent benefactor status</li>
    <li>Extra swag</li>
    <li>Direct onboarding with Will</li>
    <li>Locked-in future benefits</li>
  </ul>
  <a href="https://buy.stripe.com/8x2bJ27Nk4de33Eftk5Vu08" class="btn btn-primary">Become a Benefactor →</a>
</div>
```

### 2. Arena Page (mirrorborn.us/arena.html)
Add SQ Cloud cross-sell CTA:

```html
<div class="info-box">
  <h4>Need Persistent Memory?</h4>
  <p>Mytheon Arena is powered by SQ Cloud. Get your own instance:</p>
  <a href="https://buy.stripe.com/28E3cw6Jg25647Ibd45Vu05" class="btn btn-secondary">
    Get SQ Cloud ($50/mo) →
  </a>
</div>
```

### 3. Documentation Pages
Add footer CTA to all doc pages:

```html
<div class="doc-footer-cta">
  <h3>Ready to get started?</h3>
  <div class="cta-links">
    <a href="https://buy.stripe.com/28E3cw6Jg25647Ibd45Vu05" class="btn btn-primary">Get SQ Cloud</a>
    <a href="https://buy.stripe.com/14AbJ2ebIdNO8nYch85Vu06" class="btn btn-secondary">Join Arena</a>
  </div>
</div>
```

### 4. Success Page (mirrorborn.us/success.html)
Add upgrade/cross-sell options:

```html
<div class="upgrade-box">
  <h4>Explore More</h4>
  <ul>
    <li><a href="https://buy.stripe.com/28E3cw6Jg25647Ibd45Vu05">Add SQ Cloud ($50/mo)</a></li>
    <li><a href="https://buy.stripe.com/14AbJ2ebIdNO8nYch85Vu06">Join Mytheon Arena ($5/mo)</a></li>
    <li><a href="https://buy.stripe.com/8x2bJ27Nk4de33Eftk5Vu08">Upgrade to Benefactor ($500)</a></li>
  </ul>
</div>
```

### 5. Ecosystem Footer
Add payment links to Resources section:

```html
<div class="footer-section footer-resources">
  <h4>Resources</h4>
  <ul>
    <!-- existing links -->
    <li><a href="https://buy.stripe.com/28E3cw6Jg25647Ibd45Vu05">Get SQ Cloud</a></li>
    <li><a href="https://buy.stripe.com/14AbJ2ebIdNO8nYch85Vu06">Join Arena</a></li>
    <li><a href="https://billing.stripe.com/p/login/aFa7sM9VsdNObAaepg5Vu00">Billing Portal</a></li>
  </ul>
</div>
```

### 6. Domain Sites
Each domain should feature its own product + link to SQ Cloud:

**visionquest.me:**
- Primary: (Future visionquest product)
- Cross-sell: SQ Cloud

**wishnode.net:**
- Primary: (Future wishnode product)
- Cross-sell: SQ Cloud

**apertureshift.com:**
- Primary: (Future aperture product)
- Cross-sell: SQ Cloud

**sotafomo.com:**
- Primary: (Future sota product)
- Cross-sell: SQ Cloud

**quickfork.net:**
- Primary: (Future quickfork product)
- Cross-sell: SQ Cloud

**singularitywatch.org:**
- Primary: (Future singularitywatch product)
- Cross-sell: Mytheon Arena

---

## Implementation Checklist

### Immediate (Round 15 Completion)
- [x] Add Mirrorborn Benefactor tier to landing page ✅
- [x] Add SQ Cloud cross-sell to arena.html ✅
- [x] Add upgrade options to success.html ✅
- [x] Add payment links to ecosystem footer ✅

### Next Round (Documentation)
- [ ] Add footer CTA to all /docs/ pages
- [ ] Create /docs/pricing page linking all products
- [ ] Update signup-guide with payment link at end

### Future Rounds (Domain Sites)
- [ ] Create domain-specific Stripe products (6 total)
- [ ] Integrate payment links on all domain landing pages
- [ ] Implement cross-sell strategy (each domain → SQ Cloud)

---

## Payment Link Usage Guidelines

### When to Show Payment Links

**Show immediately:**
- Landing pages (all products visible)
- After user engagement (read docs, explored arena)
- Cross-sell opportunities (arena → SQ Cloud)

**Don't show:**
- Before value is clear (no payment walls on docs)
- In error messages or support contexts
- During onboarding (post-purchase)

### CTA Hierarchy

1. **Primary CTA:** Main product for that page
2. **Secondary CTA:** Complementary product (cross-sell)
3. **Tertiary:** Benefactor tier (always available but not pushy)

### Mobile Considerations

On mobile, stack payment options vertically. Don't hide any tier behind "See More" buttons — all should be immediately visible.

---

## Notes

- **Founding Nine ($40/mo) → Deprecated:** Replaced by Mirrorborn Benefactor ($500 one-time)
- **Billing Portal:** Always accessible (footer, success page, emails)
- **Future products:** Each domain site will get its own Stripe product (TBD)

---

**Maintained by:** Lumen (Sales)  
**Last Review:** 2026-02-07

✴️
