# SQ Cloud in 5 Minutes

**Goal:** Read and write your first scroll in under 5 minutes.

---

## 1. Get Your Instance (30 seconds)

Go to [mirrorborn.us](https://mirrorborn.us) → Click "Join the Founding Nine" → Enter email.

You'll receive:
- **Instance ID:** `abc123` (your unique namespace)
- **JWT Token:** (for authenticated writes)

---

## 2. Read a Scroll (30 seconds)

```bash
# No auth required for reads
curl https://sq.mirrorborn.us/YOUR_INSTANCE/api/v2/read/1.1.1
```

Response:
```json
{"content": "", "coordinate": "1.1.1", "exists": false}
```

Empty — because you haven't written anything yet.

---

## 3. Write Your First Scroll (1 minute)

```bash
# Set your token
export SQ_TOKEN="your-jwt-from-email"

# Write to coordinate 1.1.1
curl -X PUT \
  -H "Authorization: Bearer $SQ_TOKEN" \
  -H "Content-Type: text/plain" \
  -d "Hello from scrollspace!" \
  https://sq.mirrorborn.us/YOUR_INSTANCE/api/v2/write/1.1.1
```

Response:
```json
{"ok": true, "coordinate": "1.1.1", "bytes": 23}
```

---

## 4. Read It Back (30 seconds)

```bash
curl https://sq.mirrorborn.us/YOUR_INSTANCE/api/v2/read/1.1.1
```

Response:
```json
{"content": "Hello from scrollspace!", "coordinate": "1.1.1", "exists": true}
```

✅ You just wrote and read your first scroll.

---

## 5. Explore Coordinates (2 minutes)

Coordinates are 9 numbers in 3 groups:

```
A.B.C / D.E.F / G.H.I
```

Each number can be 1-127. That's 127⁹ = 3.6 × 10¹⁸ possible scrolls.

**Try these:**

```bash
# Write to different coordinates
curl -X PUT \
  -H "Authorization: Bearer $SQ_TOKEN" \
  -H "Content-Type: text/plain" \
  -d "Chapter 1" \
  https://sq.mirrorborn.us/YOUR_INSTANCE/api/v2/write/1.1.2

curl -X PUT \
  -H "Authorization: Bearer $SQ_TOKEN" \
  -H "Content-Type: text/plain" \
  -d "Chapter 2" \
  https://sq.mirrorborn.us/YOUR_INSTANCE/api/v2/write/1.1.3

# List what you've written
curl https://sq.mirrorborn.us/YOUR_INSTANCE/api/v2/list/1.1.1
```

---

## 6. What's Next?

| Goal | Resource |
|------|----------|
| Understand coordinates | [coordinate-guide.md](./coordinate-guide.md) |
| Full API reference | [api-reference.md](./api-reference.md) |
| Code in your language | [quick-reference.md](./quick-reference.md) |
| Real-world patterns | [use-cases.md](./use-cases.md) |
| Migrate from SQL/NoSQL | [migration-guide.md](./migration-guide.md) |

---

## Quick Reference

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/v2/read/{coord}` | GET | ❌ | Read scroll |
| `/api/v2/write/{coord}` | PUT | ✅ | Write scroll |
| `/api/v2/delete/{coord}` | DELETE | ✅ | Delete scroll |
| `/api/v2/list/{coord}` | GET | ❌ | List children |
| `/api/v2/search?q=` | GET | ❌ | Full-text search |

**Base URL:** `https://sq.mirrorborn.us/{instance-id}`

---

**Time elapsed:** ~5 minutes  
**Scrolls written:** 3  
**Concepts learned:** coordinates, read, write, list

Welcome to scrollspace. ✴️

---

*Questions? See [faq-extended.md](./faq-extended.md) or [troubleshooting.md](./troubleshooting.md)*
