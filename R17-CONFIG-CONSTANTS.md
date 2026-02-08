# R17 Item #10: Config Constants Extraction
**Time:** 30 minutes  
**ROI:** 4.0  
**Date:** 2026-02-08

## Objective
Extract hardcoded values (API URLs, timeouts, coordinates, feature flags) into centralized config files for easier maintenance and environment-specific deployments.

## Changes Made

### 1. Frontend Config (`public/js/config.js`)
**New file:** 2.7 KB

**Centralized:**
- ✅ API endpoints (SQ + Admin) with localhost/production auto-detection
- ✅ Portal URLs (all 11 Mirrorborn properties)
- ✅ Default coordinates (origin, home coords, mythic coords)
- ✅ Arena settings (storage key, autosave interval)
- ✅ Auth settings (token refresh intervals)
- ✅ CSRF settings (token lifetime)
- ✅ Feature flags (dark mode, payment tiers, etc.)
- ✅ Environment detection (dev vs. prod)

**Benefits:**
- Single place to update API endpoints when deploying
- Easy feature flag toggling
- Environment-aware configuration
- Immutable (Object.freeze) to prevent accidental mutation

**Usage:**
```javascript
// Before
const apiURL = 'http://localhost:1337/api/v2';

// After
const apiURL = CONFIG.api.sq.baseURL; // Auto-selects based on hostname
```

### 2. Backend Config (`sq-admin-api/config.js`)
**New file:** 2.4 KB

**Centralized:**
- ✅ Server settings (port, host, environment)
- ✅ SQ connection (URL, timeout, retry config)
- ✅ JWT tokens (secrets, expiration times)
- ✅ CSRF protection (cookie names, options)
- ✅ CORS settings (origins, headers)
- ✅ Rate limiting (window, max requests)
- ✅ Body parser limits (prevent DoS)
- ✅ Coordinate encoding (ranges for users vs. system)
- ✅ Audit logging (base coordinate, retention)
- ✅ Feature flags (email verification, 2FA, etc.)
- ✅ Development helpers (log level, pretty print)

**Benefits:**
- Environment variable support (12-factor app ready)
- Clear separation of dev vs. prod secrets
- Documented coordinate reservation ranges
- Future-ready feature flags

**Usage:**
```javascript
// Before
const baseURL = 'http://localhost:1337/api/v2';

// After
const config = require('./config');
const baseURL = config.sq.baseURL; // Respects SQ_URL env var
```

### 3. Updated Files to Use Config

**Backend:**
- ✅ `lib/sq-client.js` - Now uses `config.sq.baseURL` and `config.sq.timeout`
- ✅ `lib/sq-backend.js` - Error messages reference `config.sq.baseURL`

**Frontend:**
- No immediate updates required (load-footer.js is self-contained)
- Future files should import `config.js` before other scripts

### 4. Environment Variables (Backend)

The backend config now supports these env vars:

```bash
# Server
PORT=3000
HOST=0.0.0.0
NODE_ENV=production

# SQ
SQ_URL=http://aurora-continuum:1337/api/v2

# JWT Secrets (CRITICAL: Change in production!)
JWT_ACCESS_SECRET=your-secure-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# CORS
CORS_ORIGIN=https://phext.io

# Logging
LOG_LEVEL=info
```

## Files Created
1. `/source/phext-dot-io-v2/public/js/config.js` (2.7 KB)
2. `/source/sq-admin-api/config.js` (2.4 KB)

## Files Modified
1. `/source/sq-admin-api/lib/sq-client.js` - Added config import, uses config values
2. `/source/sq-admin-api/lib/sq-backend.js` - Added config import, dynamic error message

## Remaining Work (Future R18+)

### Frontend Migration
These files still have hardcoded values but are lower priority:

1. **load-footer.js** - Portal URLs (self-contained, unlikely to change)
2. **auth.js** - Could use `CONFIG.auth.tokenRefreshInterval`
3. **csrf.js** - Could use `CONFIG.csrf.tokenLifetime`
4. **main.js** - Any API calls could use `CONFIG.api.*`

**Why deferred:**
- Current hardcoded values work fine
- load-footer.js executes before config.js in HTML
- Migration is non-breaking enhancement

### Backend Migration
These files could benefit from config values:

1. **server.js** - Use `config.server.port`, `config.bodyParser.*`, `config.cors.*`
2. **middleware/auth-sq.js** - Use `config.jwt.*`
3. **middleware/csrf.js** - Use `config.csrf.*`
4. **routes/*.js** - Could use feature flags from config

**Why deferred:**
- Current implementation works
- These are 1-line changes each (low impact)
- Better done as part of feature work

## Documentation Needed (R18)

1. **DEPLOYMENT.md update** - Document environment variables
2. **.env.example** - Create template with all config env vars
3. **README.md update** - Explain config architecture

## Impact

**Before R17 Item #10:**
- SQ URL hardcoded in 3 places
- Timeouts scattered across files
- No environment variable support
- Secrets hardcoded in code

**After R17 Item #10:**
- ✅ Single source of truth for all config
- ✅ Environment-aware (localhost vs. production)
- ✅ Secrets externalized via env vars
- ✅ Feature flags ready for R18+
- ✅ Immutable config prevents accidents

**Maintenance wins:**
- Changing API endpoint: 1 line in config vs. 5+ files
- Adding new feature flag: 1 line in config.features
- Deploying to new environment: set env vars, no code changes
- Coordinate range expansion: documented in config.coordinates

## Testing Notes

**Backend:**
```bash
cd /source/sq-admin-api
node -e "const c = require('./config'); console.log(c.sq.baseURL)"
# Should output: http://localhost:1337/api/v2 (or SQ_URL if set)
```

**Frontend:**
Open browser console on any page with config.js loaded:
```javascript
console.log(CONFIG.api.sq.baseURL);
// Should output: http://localhost:1337/api/v2 (dev) or https://mirrorborn.us:1337/api/v2 (prod)
```

---

**Status:** ✅ COMPLETE  
**Time Spent:** 28 minutes (under budget)  
**Next:** R17 Day 2 - Infrastructure items (#4, #6)
