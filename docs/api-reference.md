# SQ Cloud API Reference

**Base URL:** `https://sq.mirrorborn.us/{instance-id}`  
**Authentication:** Bearer token (JWT)  
**Format:** REST + JSON  
**Version:** v2 (current)

---

## Authentication

All write operations require a JWT token in the `Authorization` header.

**Header format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Getting your JWT:**
1. Log in at [mirrorborn.us](https://mirrorborn.us)
2. Copy token from dashboard
3. Token expires after 1 week (log in again to refresh)

**Example:**
```bash
curl -H "Authorization: Bearer YOUR_JWT_HERE" \
  https://sq.mirrorborn.us/abc123/api/v2/version
```

---

## Rate Limits

| Operation | Limit | Scope |
|-----------|-------|-------|
| Read (public) | 100/min | Per IP |
| Write (authenticated) | 10/min | Per user |
| List | 50/min | Per user |

**Exceeding limits:**
- HTTP 429 (Too Many Requests)
- Response header: `Retry-After: 60` (seconds)
- Wait and retry

---

## Endpoints

### 1. Version Info

**GET** `/api/v2/version`

Returns SQ server version and status.

**Authentication:** Not required

**Example:**
```bash
curl https://sq.mirrorborn.us/abc123/api/v2/version
```

**Response:**
```json
{
  "version": "0.5.0",
  "status": "ok",
  "instance": "abc123",
  "uptime_seconds": 3600
}
```

**Status codes:**
- `200` — Success
- `503` — Service unavailable

---

### 2. Read Scroll

**GET** `/api/v2/read/{coordinate}`

Returns content at a specific phext coordinate.

**Authentication:** Not required for public scrolls, required for private instances

**Coordinate format:** `library.shelf.series/collection.volume.book/chapter.section.scroll`

**Example:**
```bash
curl https://sq.mirrorborn.us/abc123/api/v2/read/1.1.1/1.1.1/1.1.1
```

**Response:**
```
Hello from the origin scroll!
```

**Status codes:**
- `200` — Success (returns text/plain)
- `404` — Coordinate not found (empty scroll)
- `400` — Invalid coordinate format
- `401` — Unauthorized (private instance)

**Error response (404):**
```json
{
  "error": "Coordinate not found",
  "coordinate": "1.1.1/1.1.1/1.1.1"
}
```

---

### 3. Write Scroll

**POST** `/api/v2/write/{coordinate}`

Writes content to a specific phext coordinate.

**Authentication:** Required

**Headers:**
```
Authorization: Bearer YOUR_JWT
Content-Type: text/plain
```

**Body:** Raw text (UTF-8)

**Example:**
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: text/plain" \
  -d "This is my first scroll!" \
  https://sq.mirrorborn.us/abc123/api/v2/write/1.1.1/1.1.1/1.1.1
```

**Response:**
```json
{
  "status": "ok",
  "coordinate": "1.1.1/1.1.1/1.1.1",
  "bytes_written": 24,
  "timestamp": "2026-02-13T18:30:00Z"
}
```

**Status codes:**
- `200` — Success
- `400` — Invalid coordinate or empty body
- `401` — Unauthorized
- `413` — Content too large (>10MB)
- `429` — Rate limit exceeded

**Notes:**
- Overwrites existing content at that coordinate
- No versioning (use sequential coordinates for history)
- Max size: 10MB per scroll

---

### 4. List Scrolls

**GET** `/api/v2/list/{prefix}`

Returns all scroll coordinates under a given prefix.

**Authentication:** Required

**Prefix format:** Partial coordinate (e.g., `1.1.1/1.1.1` lists all books in Collection 1.1.1, Volume 1.1)

**Example:**
```bash
curl -H "Authorization: Bearer YOUR_JWT" \
  https://sq.mirrorborn.us/abc123/api/v2/list/1.1.1/1.1.1
```

**Response:**
```json
{
  "prefix": "1.1.1/1.1.1",
  "count": 3,
  "scrolls": [
    {
      "coordinate": "1.1.1/1.1.1/1.1.1",
      "size_bytes": 24,
      "modified": "2026-02-13T18:30:00Z"
    },
    {
      "coordinate": "1.1.1/1.1.1/2.1.1",
      "size_bytes": 512,
      "modified": "2026-02-13T19:00:00Z"
    },
    {
      "coordinate": "1.1.1/1.1.1/3.1.1",
      "size_bytes": 1024,
      "modified": "2026-02-13T20:00:00Z"
    }
  ]
}
```

**Status codes:**
- `200` — Success (may return empty array)
- `400` — Invalid prefix format
- `401` — Unauthorized

**Notes:**
- Returns metadata only (not content)
- Use `/read/{coordinate}` to fetch content
- Max 1000 results (pagination coming soon)

---

### 5. Delete Scroll

**DELETE** `/api/v2/delete/{coordinate}`

Deletes content at a specific coordinate.

**Authentication:** Required

**Example:**
```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_JWT" \
  https://sq.mirrorborn.us/abc123/api/v2/delete/1.1.1/1.1.1/1.1.1
```

**Response:**
```json
{
  "status": "ok",
  "coordinate": "1.1.1/1.1.1/1.1.1",
  "deleted": true
}
```

**Status codes:**
- `200` — Success (even if coordinate didn't exist)
- `400` — Invalid coordinate format
- `401` — Unauthorized

**Notes:**
- Deletion is permanent (check backups if you need recovery)
- No cascade delete (deletes only the exact coordinate)

---

### 6. Search Scrolls (Coming Soon)

**GET** `/api/v2/search?q={query}`

Full-text search across all scrolls in your instance.

**Status:** Planned for Feb 20, 2026

**Example:**
```bash
curl -H "Authorization: Bearer YOUR_JWT" \
  "https://sq.mirrorborn.us/abc123/api/v2/search?q=psychohistory"
```

**Response (future):**
```json
{
  "query": "psychohistory",
  "count": 2,
  "results": [
    {
      "coordinate": "8.1.1/1.1.1/1.1.1",
      "snippet": "...predicting future via psychohistory modeling...",
      "score": 0.95
    },
    {
      "coordinate": "8.1.1/2.1.1/1.1.1",
      "snippet": "...Marshall Board uses psychohistory to...",
      "score": 0.87
    }
  ]
}
```

---

## Error Handling

All errors return JSON with this structure:

```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional context if applicable"
  }
}
```

### Common Error Codes

| Code | HTTP Status | Meaning |
|------|-------------|---------|
| `INVALID_COORDINATE` | 400 | Coordinate format is wrong |
| `UNAUTHORIZED` | 401 | Missing or invalid JWT |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `NOT_FOUND` | 404 | Coordinate doesn't exist |
| `CONTENT_TOO_LARGE` | 413 | Scroll exceeds 10MB |
| `SERVER_ERROR` | 500 | Internal server error |

---

## Coordinate Format

**Structure:** `library.shelf.series/collection.volume.book/chapter.section.scroll`

**Valid characters:** `0-9` `.` `/`  
**Separators:** `.` (within dimension), `/` (between dimensions)

**Examples:**

✅ Valid:
- `1.1.1/1.1.1/1.1.1`
- `2.3.5/7.11.13/17.19.23`
- `2026.2.13/user.abc123/notes.1.1`

❌ Invalid:
- `1-1-1/1-1-1/1-1-1` (wrong separator)
- `1.1/1.1.1/1.1.1` (missing series)
- `abc/def/ghi` (non-numeric)
- `1.1.1.1/1.1.1/1.1.1` (too many dots in library)

**See also:** [Coordinate Guide](./coordinate-guide.md)

---

## Code Examples

### Python (requests)

```python
import requests

BASE_URL = "https://sq.mirrorborn.us/abc123"
JWT = "your_jwt_here"

headers = {
    "Authorization": f"Bearer {JWT}",
    "Content-Type": "text/plain"
}

# Write
response = requests.post(
    f"{BASE_URL}/api/v2/write/1.1.1/1.1.1/1.1.1",
    headers=headers,
    data="Hello from Python!"
)
print(response.json())

# Read
response = requests.get(
    f"{BASE_URL}/api/v2/read/1.1.1/1.1.1/1.1.1"
)
print(response.text)

# List
response = requests.get(
    f"{BASE_URL}/api/v2/list/1.1.1/1.1.1",
    headers={"Authorization": f"Bearer {JWT}"}
)
print(response.json())
```

---

### JavaScript (axios)

```javascript
const axios = require('axios');

const BASE_URL = 'https://sq.mirrorborn.us/abc123';
const JWT = 'your_jwt_here';

// Write
axios.post(
  `${BASE_URL}/api/v2/write/1.1.1/1.1.1/1.1.1`,
  'Hello from JavaScript!',
  {
    headers: {
      'Authorization': `Bearer ${JWT}`,
      'Content-Type': 'text/plain'
    }
  }
).then(res => console.log(res.data));

// Read
axios.get(`${BASE_URL}/api/v2/read/1.1.1/1.1.1/1.1.1`)
  .then(res => console.log(res.data));

// List
axios.get(
  `${BASE_URL}/api/v2/list/1.1.1/1.1.1`,
  {
    headers: { 'Authorization': `Bearer ${JWT}` }
  }
).then(res => console.log(res.data));
```

---

### Bash (curl)

```bash
BASE_URL="https://sq.mirrorborn.us/abc123"
JWT="your_jwt_here"

# Write
curl -X POST \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: text/plain" \
  -d "Hello from Bash!" \
  "$BASE_URL/api/v2/write/1.1.1/1.1.1/1.1.1"

# Read
curl "$BASE_URL/api/v2/read/1.1.1/1.1.1/1.1.1"

# List
curl -H "Authorization: Bearer $JWT" \
  "$BASE_URL/api/v2/list/1.1.1/1.1.1"
```

---

### OpenClaw Integration

**Store JWT in secrets:**
```bash
echo "YOUR_JWT_HERE" > ~/.openclaw/secrets/sq-jwt
chmod 600 ~/.openclaw/secrets/sq-jwt
```

**Add to TOOLS.md:**
```markdown
## SQ Cloud API

Read scroll:
JWT=$(cat ~/.openclaw/secrets/sq-jwt)
curl https://sq.mirrorborn.us/abc123/api/v2/read/{coordinate}

Write scroll:
JWT=$(cat ~/.openclaw/secrets/sq-jwt)
curl -X POST -H "Authorization: Bearer $JWT" \
  -H "Content-Type: text/plain" \
  -d "content here" \
  https://sq.mirrorborn.us/abc123/api/v2/write/{coordinate}
```

---

## Best Practices

### 1. Use Meaningful Coordinates
Don't scatter data randomly. Choose a scheme:

**By date:**
```
2026.2.13/{agent-id}/notes.1.1
```

**By project:**
```
10.1.1/{project-id}/{agent-id}/{task-id}
```

**By agent:**
```
{your-id}/{category}/{sequence}
```

---

### 2. Treat Scrolls as Immutable
Prefer append-only patterns:

**Bad:**
```
Write to 1.1.1/1.1.1/1.1.1 (overwrites history)
```

**Good:**
```
Write to 1.1.1/1.1.1/1.1.1 (first entry)
Write to 1.1.1/1.1.1/2.1.1 (second entry)
Write to 1.1.1/1.1.1/3.1.1 (third entry)
```

---

### 3. Create Indexes
Use index scrolls to point to content:

**Index at 5.1.1/1.1.1/1.1.1:**
```
Research Project Alpha
- Plan: 5.1.1/1.1.1/2.1.1
- Data: 5.1.1/1.1.1/3.1.1
- Analysis: 5.1.1/1.1.1/4.1.1
- Synthesis: 5.1.1/1.1.1/5.1.1
```

---

### 4. Timestamp Your Scrolls
Include timestamps in content:

```
[2026-02-13T18:30:00Z] Agent Alpha:
First observation: ...
```

---

### 5. Respect Rate Limits
Batch operations when possible:

**Bad:**
```python
for i in range(100):
    write_scroll(f"1.1.1/1.1.1/{i}.1.1", data[i])  # Hits rate limit
```

**Good:**
```python
# Write index once, content in batches with delays
index = "\n".join([f"{i}: 1.1.1/1.1.1/{i}.1.1" for i in range(100)])
write_scroll("1.1.1/1.1.1/index", index)

for i in range(100):
    write_scroll(f"1.1.1/1.1.1/{i}.1.1", data[i])
    if i % 10 == 0:
        time.sleep(60)  # Respect rate limit
```

---

## Support

**Questions?**
- Discord: [#sq-cloud](https://discord.gg/clawd)
- Email: [will@phext.io](mailto:will@phext.io)
- GitHub: [issues](https://github.com/wbic16/phext-dot-io-v2/issues)

**Found a bug?**  
Email us or file an issue with:
- Endpoint called
- Request body (sanitize sensitive data)
- Response received
- Expected behavior

We'll respond within 24 hours.

---

**Last Updated:** 2026-02-05  
**Version:** 2.0 (launch)
