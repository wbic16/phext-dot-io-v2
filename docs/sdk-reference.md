# SDK Reference

**Official and community client libraries for phext/SQ**

---

## Overview

Phext is plain text with delimiters. You can work with it using any language that reads files. These libraries provide convenient APIs for coordinate parsing, navigation, and SQ Cloud integration.

---

## Official Libraries

### Rust — libphext-rs

**Status:** ✅ Production ready  
**Repository:** [github.com/wbic16/libphext-rs](https://github.com/wbic16/libphext-rs)  
**Crates.io:** `phext`

**Install:**
```bash
cargo add phext
```

**Quick example:**
```rust
use phext::{Phext, Coordinate};

// Parse a phext file
let content = std::fs::read_to_string("docs.phext")?;
let phext = Phext::parse(&content)?;

// Navigate to a coordinate
let coord = Coordinate::new(1, 1, 1, 1, 1, 1, 1, 1, 1);
let scroll = phext.select(&coord);
println!("{}", scroll);

// Insert at a coordinate
phext.insert(&coord, "New content");
```

**Features:**
- Zero-copy parsing
- Coordinate arithmetic
- Range queries
- TOC generation
- Streaming support

---

### Node.js — libphext-node

**Status:** ✅ Production ready  
**Repository:** [github.com/wbic16/libphext-node](https://github.com/wbic16/libphext-node)  
**npm:** `phext`

**Install:**
```bash
npm install phext
```

**Quick example:**
```javascript
const { Phext, Coordinate } = require('phext');

// Parse a phext file
const content = fs.readFileSync('docs.phext', 'utf8');
const phext = new Phext(content);

// Navigate to a coordinate
const coord = new Coordinate('1.1.1/1.1.1/1.1.1');
const scroll = phext.select(coord);
console.log(scroll);

// Insert at a coordinate
phext.insert(coord, 'New content');

// Write back
fs.writeFileSync('docs.phext', phext.toString());
```

**Features:**
- TypeScript types included
- Browser-compatible (via bundler)
- Async file operations
- Coordinate validation
- Stream parsing for large files

---

### SQ (Sync Engine)

**Status:** ✅ Production ready  
**Repository:** [github.com/wbic16/SQ](https://github.com/wbic16/SQ)

SQ is the sync engine for phext files. It provides:
- REST API server
- Delta sync between instances
- File watching and auto-reload

**Install:**
```bash
git clone https://github.com/wbic16/SQ
cd SQ
cargo build --release
```

**Run locally:**
```bash
./target/release/sq --port 1337 --phext ./my-data/
```

**API endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v2/version` | Server version |
| GET | `/api/v2/read/:coord` | Read scroll at coordinate |
| PUT | `/api/v2/write/:coord` | Write content to coordinate |
| GET | `/api/v2/list/:prefix` | List scrolls under prefix |
| DELETE | `/api/v2/delete/:coord` | Delete scroll |

See [API Reference](./api-reference.md) for complete endpoint documentation.

---

## Community Libraries

### Python — libphext-py

**Status:** 🟡 Beta  
**Repository:** [github.com/wbic16/libphext-py](https://github.com/wbic16/libphext-py)  
**PyPI:** `phext`

**Install:**
```bash
pip install phext
```

**Quick example:**
```python
from phext import Phext, Coordinate

# Parse
with open('docs.phext', 'r') as f:
    phext = Phext.parse(f.read())

# Navigate
coord = Coordinate.from_string('1.1.1/1.1.1/1.1.1')
scroll = phext.select(coord)
print(scroll)

# Modify
phext.insert(coord, 'New content')
```

**Note:** Beta status. Check repo for latest features and compatibility.

---

### Go — go-phext (Planned)

**Status:** 🔲 Not yet started  
**Looking for maintainer**

If you'd like to build the Go client library, see [contributing guide](./community-guide.md).

---

### Other Languages

We welcome client libraries in any language. Requirements:

1. Parse 9-delimiter phext format
2. Coordinate navigation (select, insert, update, delete)
3. TOC generation
4. MIT license compatible

Submit PRs to be listed here.

---

## SQ Cloud SDK

For SQ Cloud (hosted service), use the REST API directly or wrap with any HTTP client.

### Authentication

All requests require a JWT token:

```bash
curl -H "Authorization: Bearer $SQ_TOKEN" \
  https://sq.mirrorborn.us/YOUR_INSTANCE/api/v2/version
```

### JavaScript Example

```javascript
class SQCloud {
  constructor(instanceId, token) {
    this.baseUrl = `https://sq.mirrorborn.us/${instanceId}/api/v2`;
    this.token = token;
  }

  async read(coord) {
    const res = await fetch(`${this.baseUrl}/read/${coord}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    return res.text();
  }

  async write(coord, content) {
    await fetch(`${this.baseUrl}/write/${coord}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'text/plain'
      },
      body: content
    });
  }

  async list(prefix) {
    const res = await fetch(`${this.baseUrl}/list/${prefix}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    return res.json();
  }
}

// Usage
const sq = new SQCloud('my-instance', process.env.SQ_TOKEN);
const scroll = await sq.read('1.1.1/1.1.1/1.1.1');
```

### Python Example

```python
import os
import requests

class SQCloud:
    def __init__(self, instance_id: str):
        self.base_url = f"https://sq.mirrorborn.us/{instance_id}/api/v2"
        self.token = os.environ["SQ_TOKEN"]
        self.headers = {"Authorization": f"Bearer {self.token}"}

    def read(self, coord: str) -> str:
        resp = requests.get(
            f"{self.base_url}/read/{coord}",
            headers=self.headers
        )
        resp.raise_for_status()
        return resp.text

    def write(self, coord: str, content: str) -> None:
        requests.put(
            f"{self.base_url}/write/{coord}",
            headers={**self.headers, "Content-Type": "text/plain"},
            data=content
        ).raise_for_status()

    def list(self, prefix: str) -> list:
        resp = requests.get(
            f"{self.base_url}/list/{prefix}",
            headers=self.headers
        )
        resp.raise_for_status()
        return resp.json()

# Usage
sq = SQCloud("my-instance")
scroll = sq.read("1.1.1/1.1.1/1.1.1")
```

---

## CLI Tools

### phext-shell

**Repository:** [github.com/wbic16/phext-shell](https://github.com/wbic16/phext-shell)

Command-line tools for phext manipulation:

```bash
# Navigate interactively
phext-shell docs.phext

# Select a coordinate
phext select docs.phext 1.1.1/1.1.1/1.1.1

# List all coordinates
phext toc docs.phext

# Insert content
echo "New content" | phext insert docs.phext 1.1.1/1.1.1/1.1.2
```

### phext-notepad

**Repository:** [github.com/wbic16/phext-notepad](https://github.com/wbic16/phext-notepad)

GUI editor for phext files. Visual coordinate navigation with tree view.

---

## Version Compatibility

| Library | Phext Format | SQ API |
|---------|--------------|--------|
| libphext-rs 0.5+ | v1 | v2 |
| libphext-node 0.4+ | v1 | v2 |
| SQ 0.5+ | v1 | v2 |

All current libraries use Phext Format v1 (9-dimensional, ASCII delimiters 17-25).

---

## Getting Help

- **API issues:** Check [troubleshooting](./troubleshooting.md)
- **Library bugs:** Open issue on respective GitHub repo
- **Questions:** Ask in [Discord #dev](https://discord.com/invite/clawd)

---

*Missing a language? Contribute a library and we'll list it here.*
