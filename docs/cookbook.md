# SQ Cloud Cookbook

**Practical recipes for common tasks | Copy-paste solutions**

---

## Recipe 1: Journal with Daily Entries

Store daily journal entries with automatic date-based coordinates.

```python
import requests
from datetime import datetime

BASE = "https://sq.mirrorborn.us/YOUR_INSTANCE/api/v2"
TOKEN = "your-jwt-token"

def write_journal(content):
    """Write to today's coordinate: journal.{year}.{month}/{day}.1.1"""
    now = datetime.now()
    coord = f"journal.{now.year}.{now.month}/{now.day}.1.1"
    
    r = requests.put(
        f"{BASE}/write/{coord}",
        headers={"Authorization": f"Bearer {TOKEN}"},
        data=content
    )
    return r.status_code == 200

def read_journal(year, month, day):
    """Read a specific day's entry"""
    coord = f"journal.{year}.{month}/{day}.1.1"
    r = requests.get(f"{BASE}/read/{coord}")
    return r.text if r.status_code == 200 else None

# Usage
write_journal("Today I learned about phext coordinates...")
entry = read_journal(2026, 2, 20)
```

**Why it works:** Date components map naturally to phext's 3-level hierarchy. Year.Month forms the library, Day.1.1 forms the specific entry.

---

## Recipe 2: Versioned Documents

Keep revision history without overwriting.

```javascript
const BASE = 'https://sq.mirrorborn.us/YOUR_INSTANCE/api/v2';

async function saveVersion(docName, content, token) {
  // Get existing versions
  const listResp = await fetch(`${BASE}/list/docs.${docName}.1`);
  const existing = listResp.ok ? await listResp.json() : { coordinates: [] };
  
  // Next version number
  const nextVer = existing.coordinates.length + 1;
  const coord = `docs.${docName}.${nextVer}`;
  
  // Write new version
  await fetch(`${BASE}/write/${coord}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'text/plain'
    },
    body: content
  });
  
  return { coordinate: coord, version: nextVer };
}

async function getLatest(docName) {
  const listResp = await fetch(`${BASE}/list/docs.${docName}.1`);
  const { coordinates } = await listResp.json();
  
  if (coordinates.length === 0) return null;
  
  // Get highest version
  const latest = coordinates[coordinates.length - 1];
  const resp = await fetch(`${BASE}/read/${latest}`);
  return resp.text();
}

// Usage
await saveVersion('readme', 'Initial version', token);
await saveVersion('readme', 'Fixed typo', token);
const current = await getLatest('readme');  // "Fixed typo"
```

**Coordinate pattern:** `docs.{name}.{version}` — versions as the third component.

---

## Recipe 3: Append-Only Log

Perfect for event logs, audit trails, or chat history.

```python
import requests
import json
from datetime import datetime

def append_log(instance, token, log_name, entry):
    """Append to a log, auto-incrementing the slot"""
    base = f"https://sq.mirrorborn.us/{instance}/api/v2"
    
    # Get current entries
    r = requests.get(f"{base}/list/logs.{log_name}.1")
    existing = r.json().get('coordinates', []) if r.ok else []
    
    # Next slot
    next_slot = len(existing) + 1
    coord = f"logs.{log_name}.{next_slot}"
    
    # Write with timestamp
    payload = json.dumps({
        "timestamp": datetime.utcnow().isoformat(),
        "entry": entry
    })
    
    requests.put(
        f"{base}/write/{coord}",
        headers={"Authorization": f"Bearer {token}"},
        data=payload
    )
    
    return coord

def read_log(instance, log_name, limit=100):
    """Read last N log entries"""
    base = f"https://sq.mirrorborn.us/{instance}/api/v2"
    
    r = requests.get(f"{base}/list/logs.{log_name}.1")
    if not r.ok:
        return []
    
    coords = r.json().get('coordinates', [])[-limit:]
    entries = []
    
    for coord in coords:
        entry_r = requests.get(f"{base}/read/{coord}")
        if entry_r.ok:
            entries.append(json.loads(entry_r.text))
    
    return entries

# Usage
append_log("abc123", token, "auth", "User logged in: alice@example.com")
append_log("abc123", token, "auth", "User logged out: alice@example.com")
recent = read_log("abc123", "auth", limit=50)
```

---

## Recipe 4: Key-Value Store

Use phext as a simple KV store.

```go
package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "strings"
)

type KVStore struct {
    Base  string
    Token string
}

func (kv *KVStore) Set(key, value string) error {
    // Sanitize key for coordinate use
    safeKey := strings.ReplaceAll(key, ".", "_")
    url := fmt.Sprintf("%s/write/kv.%s.1", kv.Base, safeKey)
    
    req, _ := http.NewRequest("PUT", url, strings.NewReader(value))
    req.Header.Set("Authorization", "Bearer "+kv.Token)
    req.Header.Set("Content-Type", "text/plain")
    
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    if resp.StatusCode != 200 && resp.StatusCode != 201 {
        return fmt.Errorf("write failed: %d", resp.StatusCode)
    }
    return nil
}

func (kv *KVStore) Get(key string) (string, error) {
    safeKey := strings.ReplaceAll(key, ".", "_")
    url := fmt.Sprintf("%s/read/kv.%s.1", kv.Base, safeKey)
    
    resp, err := http.Get(url)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    
    if resp.StatusCode == 404 {
        return "", nil
    }
    
    body, _ := io.ReadAll(resp.Body)
    return string(body), nil
}

// Usage
func main() {
    kv := &KVStore{
        Base:  "https://sq.mirrorborn.us/abc123/api/v2",
        Token: "your-token",
    }
    
    kv.Set("user:alice:email", "alice@example.com")
    email, _ := kv.Get("user:alice:email")
    fmt.Println(email) // alice@example.com
}
```

**Note:** Keys with dots are converted to underscores to avoid coordinate conflicts.

---

## Recipe 5: Configuration Store with Environments

Organize configs by environment.

```javascript
const BASE = 'https://sq.mirrorborn.us/YOUR_INSTANCE/api/v2';

class ConfigStore {
  constructor(token, appName) {
    this.token = token;
    this.appName = appName;
  }

  coordFor(env, key) {
    // config.{app}.{env}/{key}.1.1
    return `config.${this.appName}.1/${env}.${key}.1`;
  }

  async set(env, key, value) {
    const coord = this.coordFor(env, key);
    await fetch(`${BASE}/write/${coord}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    });
  }

  async get(env, key) {
    const coord = this.coordFor(env, key);
    const resp = await fetch(`${BASE}/read/${coord}`);
    if (!resp.ok) return null;
    return JSON.parse(await resp.text());
  }

  async listKeys(env) {
    const coord = `config.${this.appName}.1/${env}.1.1`;
    const resp = await fetch(`${BASE}/list/${coord}`);
    if (!resp.ok) return [];
    const { coordinates } = await resp.json();
    return coordinates.map(c => c.split('.')[1]); // extract key names
  }
}

// Usage
const config = new ConfigStore(token, 'myapp');

await config.set('prod', 'database_url', 'postgres://...');
await config.set('staging', 'database_url', 'postgres://staging...');

const prodDb = await config.get('prod', 'database_url');
```

**Structure:** `config.{app}.1/{env}.{key}.1` — environment at the library level, keys within.

---

## Recipe 6: Search and Tag System

Build a searchable tag system.

```python
import requests
import json

class TaggedStore:
    def __init__(self, base, token):
        self.base = base
        self.token = token
    
    def save(self, doc_id, content, tags):
        """Save document with tags for later retrieval"""
        # Save the content
        content_coord = f"docs.content.{doc_id}"
        requests.put(
            f"{self.base}/write/{content_coord}",
            headers={"Authorization": f"Bearer {self.token}"},
            data=content
        )
        
        # Create tag index entries
        for tag in tags:
            tag_safe = tag.replace(" ", "_").lower()
            # Get existing docs for this tag
            tag_coord = f"tags.{tag_safe}.1"
            r = requests.get(f"{self.base}/read/{tag_coord}")
            existing = json.loads(r.text) if r.ok else []
            
            if doc_id not in existing:
                existing.append(doc_id)
                requests.put(
                    f"{self.base}/write/{tag_coord}",
                    headers={"Authorization": f"Bearer {self.token}"},
                    data=json.dumps(existing)
                )
    
    def find_by_tag(self, tag):
        """Get all doc IDs with this tag"""
        tag_safe = tag.replace(" ", "_").lower()
        r = requests.get(f"{self.base}/read/tags.{tag_safe}.1")
        return json.loads(r.text) if r.ok else []
    
    def get_content(self, doc_id):
        """Retrieve document content"""
        r = requests.get(f"{self.base}/read/docs.content.{doc_id}")
        return r.text if r.ok else None

# Usage
store = TaggedStore(BASE, TOKEN)

store.save("note-001", "Meeting notes from standup", ["meetings", "team"])
store.save("note-002", "Architecture decision record", ["architecture", "team"])

team_docs = store.find_by_tag("team")  # ["note-001", "note-002"]
```

---

## Recipe 7: Rate-Limited Batch Operations

Handle rate limits gracefully.

```python
import requests
import time

def batch_write(base, token, items, delay=0.1):
    """
    Write multiple items with rate limit handling.
    items: list of (coordinate, content) tuples
    """
    results = []
    
    for coord, content in items:
        while True:
            r = requests.put(
                f"{base}/write/{coord}",
                headers={"Authorization": f"Bearer {token}"},
                data=content
            )
            
            if r.status_code == 429:
                # Rate limited - wait and retry
                retry_after = int(r.headers.get('Retry-After', 60))
                print(f"Rate limited, waiting {retry_after}s...")
                time.sleep(retry_after)
                continue
            
            results.append((coord, r.status_code == 200))
            break
        
        # Small delay between requests to stay under limits
        time.sleep(delay)
    
    return results

# Usage
items = [
    ("data.batch.1", "First item"),
    ("data.batch.2", "Second item"),
    ("data.batch.3", "Third item"),
]

results = batch_write(BASE, TOKEN, items)
```

---

## Recipe 8: Rust SQ Cloud Client

Ergonomic Rust client for SQ Cloud with async support.

```rust
use reqwest::Client;
use serde::Deserialize;

pub struct SQCloud {
    client: Client,
    base_url: String,
    token: String,
}

#[derive(Deserialize)]
pub struct ListResponse {
    pub coordinates: Vec<String>,
}

impl SQCloud {
    pub fn new(instance_id: &str, token: &str) -> Self {
        Self {
            client: Client::new(),
            base_url: format!("https://sq.mirrorborn.us/{}/api/v2", instance_id),
            token: token.to_string(),
        }
    }

    pub async fn read(&self, coord: &str) -> Result<String, reqwest::Error> {
        let url = format!("{}/read/{}", self.base_url, coord);
        self.client
            .get(&url)
            .header("Authorization", format!("Bearer {}", self.token))
            .send()
            .await?
            .text()
            .await
    }

    pub async fn write(&self, coord: &str, content: &str) -> Result<(), reqwest::Error> {
        let url = format!("{}/write/{}", self.base_url, coord);
        self.client
            .put(&url)
            .header("Authorization", format!("Bearer {}", self.token))
            .header("Content-Type", "text/plain")
            .body(content.to_string())
            .send()
            .await?;
        Ok(())
    }

    pub async fn list(&self, prefix: &str) -> Result<Vec<String>, reqwest::Error> {
        let url = format!("{}/list/{}", self.base_url, prefix);
        let resp: ListResponse = self.client
            .get(&url)
            .header("Authorization", format!("Bearer {}", self.token))
            .send()
            .await?
            .json()
            .await?;
        Ok(resp.coordinates)
    }

    pub async fn delete(&self, coord: &str) -> Result<(), reqwest::Error> {
        let url = format!("{}/delete/{}", self.base_url, coord);
        self.client
            .delete(&url)
            .header("Authorization", format!("Bearer {}", self.token))
            .send()
            .await?;
        Ok(())
    }
}

// Usage
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let sq = SQCloud::new("my-instance", &std::env::var("SQ_TOKEN")?);
    
    // Write
    sq.write("notes.today.1", "Built SQ Cloud client in Rust").await?;
    
    // Read
    let content = sq.read("notes.today.1").await?;
    println!("{}", content);
    
    // List
    let coords = sq.list("notes.1.1").await?;
    for coord in coords {
        println!("Found: {}", coord);
    }
    
    Ok(())
}
```

**Dependencies (Cargo.toml):**
```toml
[dependencies]
reqwest = { version = "0.11", features = ["json"] }
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
```

**Why Rust:** Zero-cost abstractions, fearless concurrency, and native integration with libphext-rs for local operations.

---

## Recipe 9: Shell/Curl Quick Testing

Direct API access from the command line — perfect for debugging and quick scripts.

```bash
#!/bin/bash
# sq-client.sh — Minimal shell client for SQ Cloud

SQ_BASE="https://sq.mirrorborn.us/YOUR_INSTANCE/api/v2"
SQ_TOKEN="your-jwt-token"

# Write content to a coordinate
sq_write() {
    local coord="$1"
    local content="$2"
    curl -s -X PUT "$SQ_BASE/write/$coord" \
        -H "Authorization: Bearer $SQ_TOKEN" \
        -H "Content-Type: text/plain" \
        -d "$content"
}

# Read content from a coordinate
sq_read() {
    local coord="$1"
    curl -s "$SQ_BASE/read/$coord" \
        -H "Authorization: Bearer $SQ_TOKEN"
}

# List children of a coordinate
sq_list() {
    local coord="$1"
    curl -s "$SQ_BASE/list/$coord" \
        -H "Authorization: Bearer $SQ_TOKEN" | jq -r '.coordinates[]'
}

# Delete a coordinate
sq_delete() {
    local coord="$1"
    curl -s -X DELETE "$SQ_BASE/delete/$coord" \
        -H "Authorization: Bearer $SQ_TOKEN"
}

# Usage examples:
# sq_write "notes.test.1" "Hello from shell"
# sq_read "notes.test.1"
# sq_list "notes.1.1"
```

**One-liners for quick testing:**

```bash
# Write
curl -X PUT "https://sq.mirrorborn.us/INSTANCE/api/v2/write/test.hello.1" \
  -H "Authorization: Bearer $TOKEN" \
  -d "Hello, phext!"

# Read
curl "https://sq.mirrorborn.us/INSTANCE/api/v2/read/test.hello.1"

# List (with jq for pretty output)
curl -s "https://sq.mirrorborn.us/INSTANCE/api/v2/list/test.1.1" | jq

# Check API health
curl -I "https://sq.mirrorborn.us/INSTANCE/api/v2/health"
```

**Why curl:** No dependencies, works everywhere, perfect for CI/CD pipelines and quick debugging.

---

## Recipe 10: Go SQ Cloud Client

Minimal Go client for backend services and CLI tools.

```go
package sqcloud

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// Client provides SQ Cloud API access.
type Client struct {
	BaseURL    string
	Token      string
	HTTPClient *http.Client
}

// NewClient creates an SQ Cloud client.
func NewClient(instanceID, token string) *Client {
	return &Client{
		BaseURL:    fmt.Sprintf("https://sq.mirrorborn.us/%s/api/v2", instanceID),
		Token:      token,
		HTTPClient: &http.Client{Timeout: 10 * time.Second},
	}
}

// Read fetches content at a coordinate.
func (c *Client) Read(coord string) (string, error) {
	resp, err := c.HTTPClient.Get(fmt.Sprintf("%s/read/%s", c.BaseURL, coord))
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return "", nil // Empty coordinate
	}
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("read failed: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	return string(body), err
}

// Write stores content at a coordinate.
func (c *Client) Write(coord, content string) error {
	req, err := http.NewRequest(
		http.MethodPut,
		fmt.Sprintf("%s/write/%s", c.BaseURL, coord),
		bytes.NewBufferString(content),
	)
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+c.Token)
	req.Header.Set("Content-Type", "text/plain")

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		return fmt.Errorf("write failed: %d", resp.StatusCode)
	}
	return nil
}

// ListResponse contains child coordinates.
type ListResponse struct {
	Coordinates []string `json:"coordinates"`
}

// List returns child coordinates.
func (c *Client) List(coord string) ([]string, error) {
	resp, err := c.HTTPClient.Get(fmt.Sprintf("%s/list/%s", c.BaseURL, coord))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return []string{}, nil
	}

	var result ListResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return result.Coordinates, nil
}

// Delete removes content at a coordinate.
func (c *Client) Delete(coord string) error {
	req, err := http.NewRequest(
		http.MethodDelete,
		fmt.Sprintf("%s/delete/%s", c.BaseURL, coord),
		nil,
	)
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+c.Token)

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusNoContent {
		return fmt.Errorf("delete failed: %d", resp.StatusCode)
	}
	return nil
}
```

**Usage:**

```go
package main

import (
	"fmt"
	"log"
	"os"

	"yourmodule/sqcloud"
)

func main() {
	client := sqcloud.NewClient(os.Getenv("SQ_INSTANCE"), os.Getenv("SQ_TOKEN"))

	// Write
	if err := client.Write("notes.go.1", "Hello from Go!"); err != nil {
		log.Fatal(err)
	}

	// Read
	content, err := client.Read("notes.go.1")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Content:", content)

	// List children
	coords, err := client.List("notes.1.1")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Children:", coords)
}
```

**Why Go:** Fast compilation, single binary deployment, excellent for microservices and CLI tools. No runtime dependencies.

---

## Common Patterns Summary

| Use Case | Coordinate Pattern |
|----------|-------------------|
| Daily entries | `{type}.{year}.{month}/{day}.{seq}.1` |
| Versioned docs | `docs.{name}.{version}` |
| Append-only log | `logs.{name}.{seq}` |
| Key-value | `kv.{key}.1` |
| Config by env | `config.{app}.1/{env}.{key}.1` |
| Tag index | `tags.{tag}.1` (stores doc ID list) |

---

## Tips

1. **Batch reads with list** — Use `/list/{coord}` before multiple reads to get all children, then batch your fetches.

2. **Cache aggressively** — SQ data is immutable at coordinates. Once read, cache locally.

3. **Use JSON for structured data** — Plain text for simple content, JSON for anything with fields.

4. **Namespace everything** — First component should always identify your app/domain.

5. **Handle 404 gracefully** — Empty coordinates return 404, which is normal (not an error).

---

## See Also

- [Quick Reference](./quick-reference.md) — API cheat sheet
- [API Reference](./api-reference.md) — Full endpoint docs
- [Coordinate Guide](./coordinate-guide.md) — Deep dive on coordinates

---

*Last updated: 2026-02-26*

*✴️ Lumen + Phex | Practical patterns for SQ Cloud*
