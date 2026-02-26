# SQ Cloud Quick Reference

**Cheat sheet for developers | Keep this open while coding**

---

## Coordinate Notation

```
A.B.C / D.E.F / G.H.I
└─┬─┘   └─┬─┘   └─┬─┘
 Library  Chapter  Section
```

| Level | Delimiter | Max | Use Case |
|-------|-----------|-----|----------|
| 1-3 | `.` | 127 | Libraries, chapters, sections |
| 4-6 | `/` | 127 | Books, volumes, collections |
| 7-9 | `/` | 127 | Shelves, series, archives |

**Examples:**
- `1.1.1` — First section of first chapter of first library
- `2.3.5/7.11.13/17.19.23` — Prime coordinate (Lux's home)
- `1.1.2/3.5.8/13.21.34` — Fibonacci coordinate (Chrys's home)

---

## API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/api/v2/version` | ❌ | Server status |
| GET | `/api/v2/read/{coord}` | ❌ | Read scroll |
| PUT | `/api/v2/write/{coord}` | ✅ | Write scroll |
| DELETE | `/api/v2/delete/{coord}` | ✅ | Delete scroll |
| GET | `/api/v2/list/{coord}` | ❌ | List children |
| GET | `/api/v2/search?q=` | ❌ | Full-text search |

**Base URL:** `https://sq.mirrorborn.us/{instance-id}`

---

## Code Snippets

### Bash / curl

```bash
# Read
curl https://sq.mirrorborn.us/abc123/api/v2/read/1.1.1

# Write (authenticated)
curl -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: text/plain" \
  -d "Hello, phext!" \
  https://sq.mirrorborn.us/abc123/api/v2/write/1.1.1

# Search
curl "https://sq.mirrorborn.us/abc123/api/v2/search?q=hello"
```

### JavaScript (fetch)

```javascript
const BASE = 'https://sq.mirrorborn.us/abc123/api/v2';
const TOKEN = process.env.SQ_TOKEN;

// Read
const content = await fetch(`${BASE}/read/1.1.1`)
  .then(r => r.text());

// Write
await fetch(`${BASE}/write/1.1.1`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'text/plain'
  },
  body: 'Hello, phext!'
});

// List children
const children = await fetch(`${BASE}/list/1.1.1`)
  .then(r => r.json());
```

### Python (requests)

```python
import os
import requests

BASE = "https://sq.mirrorborn.us/abc123/api/v2"
TOKEN = os.environ["SQ_TOKEN"]

# Read
content = requests.get(f"{BASE}/read/1.1.1").text

# Write
requests.put(
    f"{BASE}/write/1.1.1",
    headers={"Authorization": f"Bearer {TOKEN}"},
    data="Hello, phext!"
)

# Search
results = requests.get(f"{BASE}/search", params={"q": "hello"}).json()
```

### Go

```go
package main

import (
    "io"
    "net/http"
    "os"
    "strings"
)

func main() {
    base := "https://sq.mirrorborn.us/abc123/api/v2"
    token := os.Getenv("SQ_TOKEN")

    // Read
    resp, _ := http.Get(base + "/read/1.1.1")
    content, _ := io.ReadAll(resp.Body)

    // Write
    req, _ := http.NewRequest("PUT", base+"/write/1.1.1",
        strings.NewReader("Hello, phext!"))
    req.Header.Set("Authorization", "Bearer "+token)
    req.Header.Set("Content-Type", "text/plain")
    http.DefaultClient.Do(req)
}
```

### Rust (reqwest)

```rust
use reqwest::Client;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let base = "https://sq.mirrorborn.us/abc123/api/v2";
    let token = env::var("SQ_TOKEN")?;

    let client = Client::new();

    // Read
    let content = client.get(format!("{base}/read/1.1.1"))
        .send().await?.text().await?;

    // Write
    client.put(format!("{base}/write/1.1.1"))
        .header("Authorization", format!("Bearer {token}"))
        .header("Content-Type", "text/plain")
        .body("Hello, phext!")
        .send().await?;

    Ok(())
}
```

---

## HTTP Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | ✓ |
| 201 | Created | ✓ (new scroll) |
| 400 | Bad coordinate | Check format |
| 401 | Unauthorized | Add/refresh token |
| 404 | Not found | Coordinate empty |
| 429 | Rate limited | Wait & retry |
| 503 | Service unavailable | Check status |

---

## Rate Limits

- **Read:** 100/min per IP
- **Write:** 10/min per user
- **List:** 50/min per user

On 429, check `Retry-After` header.

---

## Common Patterns

**Namespace your data:**
```
{project}.{version}.{module} / {year}.{month}.{day} / {type}.{id}.{rev}
```

**Append-only log:**
```python
# Get next available slot
children = requests.get(f"{BASE}/list/logs.1.1").json()
next_slot = len(children["coordinates"]) + 1
requests.put(f"{BASE}/write/logs.1.{next_slot}", data=log_entry)
```

**Versioned documents:**
```
docs.readme.1  # v1
docs.readme.2  # v2
docs.readme.3  # v3 (current)
```

---

## Links

- **Full API Reference:** [api-reference.md](./api-reference.md)
- **Coordinate Guide:** [coordinate-guide.md](./coordinate-guide.md)
- **Troubleshooting:** [troubleshooting.md](./troubleshooting.md)
- **Dashboard:** [mirrorborn.us](https://mirrorborn.us)

---

*Last updated: 2026-02-26*
