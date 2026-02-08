# Discord Link Standardization - R17 Item #7

## Current State (2026-02-08)

**Found 3 different Discord invite links:**
1. `https://discord.gg/kGCMM5yQ` (most common, 10 uses)
2. `https://discord.gg/YCHRq7Ux` (2 uses in arena.html)
3. `https://discord.com/channels/1288340881023176747/1469771014388056228` (direct channel links, 3 uses)

## Canonical Link Decision

**Primary invite:** `https://discord.gg/clawd` (if available - vanity URL)  
**Fallback:** `https://discord.gg/kGCMM5yQ`  
**Direct server link:** `https://discord.com/invite/kGCMM5yQ`

## Standardization Plan

### Phase 1: Add to config.js ✅
```javascript
discord: {
  invite: 'https://discord.gg/kGCMM5yQ',
  server: 'https://discord.com/invite/kGCMM5yQ',
  serverId: '1288340881023176747'
}
```

### Phase 2: Update all HTML files
**Files to update:**
- 500.html (1 link)
- arena.html (4 links)
- coordinate-signup.html (1 link)
- emily-mural.html (5 links)
- index.html (4 links)
- landing.html (1 link)
- profile-select.html (1 link)
- success.html (1 link)

**Total:** 18 instances across 8 files

### Phase 3: Create shared Discord button component
**File:** `/public/shared-discord-button.html`

```html
<!-- Standard Discord Button - Include via JS -->
<a href="https://discord.gg/kGCMM5yQ" 
   target="_blank" 
   rel="noopener noreferrer"
   class="discord-link"
   aria-label="Join our Discord server">
  <svg class="discord-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
  <span>Join Discord</span>
</a>
```

## Implementation Status

- [x] Document current state
- [x] Add to config.js
- [ ] Update all HTML files (deferred - manual work, can be done in batch)
- [ ] Create shared component (deferred - needs design approval)
- [ ] Update footer loader to include Discord (deferred)

## Notes

**Why standardize:**
- Easier link updates (change in one place)
- Consistent user experience
- Analytics tracking (single utm_source)
- Professional appearance

**Deferred to R18:**
The actual HTML updates are low-risk but time-consuming. Since the current links work, this can wait until we have a design system component library in place.

**Quick win alternative:**
Add canonical Discord link to config.js (done above), use it in new pages going forward.
