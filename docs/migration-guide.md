# Migration Guide: Traditional Databases to SQ Cloud

**Moving from SQL, MongoDB, Redis, or file systems to phext coordinates**

---

## Why Migrate?

SQ Cloud isn't just another database — it's a different paradigm. Instead of tables, documents, or key-value pairs, you get **11-dimensional coordinate space**. This changes how you think about data.

| Traditional | SQ Cloud |
|-------------|----------|
| Schema migrations | Coordinate expansion |
| JOIN operations | Coordinate traversal |
| Index maintenance | Natural locality |
| Sharding complexity | Built-in distribution |
| Backup/restore cycles | Append-only history |

---

## Mental Model Shift

### From Tables to Coordinates

**SQL thinking:**
```sql
SELECT * FROM users WHERE id = 42;
INSERT INTO posts (user_id, content) VALUES (42, 'Hello');
```

**Phext thinking:**
```
users.42.profile     → user data
users.42.posts.1     → first post
users.42.posts.2     → second post
```

Data is **located**, not queried. The coordinate *is* the access path.

### From Documents to Scrolls

**MongoDB thinking:**
```javascript
db.users.findOne({ _id: ObjectId("...") });
db.users.updateOne({ _id: ... }, { $set: { name: "..." } });
```

**Phext thinking:**
```bash
# Read the scroll at this coordinate
curl https://sq.mirrorborn.us/{id}/api/v2/read/users.42.profile

# Write replaces the scroll (versioning via coordinate)
curl -X PUT -d '{"name":"..."}' .../api/v2/write/users.42.profile.v2
```

Documents become scrolls. Updates become new coordinates.

### From Cache to Permanence

**Redis thinking:**
```
SET session:abc123 "{...}" EX 3600
GET session:abc123
```

**Phext thinking:**
```
sessions.abc123.current   → current session state
sessions.abc123.history.1 → previous state
```

No expiration unless you want it. History is preserved by coordinate.

---

## Migration Patterns

### Pattern 1: Direct Mapping

Map each table/collection to a coordinate prefix.

**Before (PostgreSQL):**
```
users table → rows with id, name, email, created_at
posts table → rows with id, user_id, content, created_at
```

**After (SQ):**
```
users.{id}.profile     → {"name": "...", "email": "...", "created_at": "..."}
users.{id}.posts.{n}   → {"content": "...", "created_at": "..."}
```

**Migration script:**
```python
import requests
import psycopg2

conn = psycopg2.connect(...)
cursor = conn.cursor()

# Migrate users
cursor.execute("SELECT id, name, email, created_at FROM users")
for row in cursor.fetchall():
    user_id, name, email, created_at = row
    data = {"name": name, "email": email, "created_at": str(created_at)}
    requests.put(
        f"{SQ_BASE}/write/users.{user_id}.profile",
        headers={"Authorization": f"Bearer {TOKEN}"},
        json=data
    )
```

### Pattern 2: Temporal Namespacing

Use time-based coordinates for logs, events, metrics.

**Before (Elasticsearch):**
```json
{
  "@timestamp": "2026-02-20T08:00:00Z",
  "level": "ERROR",
  "message": "Connection failed"
}
```

**After (SQ):**
```
logs.2026.02.20/08.00.00/error.1 → {"message": "Connection failed"}
```

The coordinate encodes the timestamp. No separate index needed.

### Pattern 3: Hierarchical Documents

Nested data maps naturally to coordinate depth.

**Before (MongoDB):**
```json
{
  "org": "acme",
  "teams": [
    {
      "name": "engineering",
      "members": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]
    }
  ]
}
```

**After (SQ):**
```
orgs.acme.teams.engineering.members.1 → {"name": "Alice"}
orgs.acme.teams.engineering.members.2 → {"name": "Bob"}
orgs.acme.teams.engineering.meta      → {"name": "engineering"}
```

Each level of nesting becomes a coordinate level.

---

## Common Challenges

### Challenge: JOINs

**SQL approach:** `SELECT * FROM posts JOIN users ON posts.user_id = users.id`

**SQ approach:** Store denormalized or use coordinate references.

```
posts.123.content  → "Hello world"
posts.123.author   → "users.42"  (reference, resolve client-side)
```

Or denormalize at write time:
```
posts.123.content  → "Hello world"
posts.123.author   → {"id": 42, "name": "Alice"}  (embedded)
```

**Trade-off:** Denormalization increases storage but eliminates joins. For most use cases, storage is cheap and joins are expensive.

### Challenge: Queries

**SQL approach:** `SELECT * FROM users WHERE email LIKE '%@example.com'`

**SQ approach:** Use the search endpoint or maintain an index coordinate.

```bash
# Full-text search
curl "{BASE}/api/v2/search?q=@example.com"

# Or maintain your own index
emails.example.com.alice → "users.42"
emails.example.com.bob   → "users.43"
```

### Challenge: Transactions

**SQL approach:** `BEGIN; UPDATE ...; UPDATE ...; COMMIT;`

**SQ approach:** Coordinate-level atomicity. For multi-coordinate transactions, use a saga pattern or version coordinates.

```
tx.{txid}.status   → "pending" | "committed" | "rolled_back"
tx.{txid}.ops.1    → {"coord": "...", "old": "...", "new": "..."}
tx.{txid}.ops.2    → {"coord": "...", "old": "...", "new": "..."}
```

Apply ops, then mark committed. On failure, use ops to rollback.

---

## Step-by-Step Migration

### Phase 1: Shadow Write (Week 1-2)

Write to both systems. Read from old.

```python
def save_user(user):
    # Old system (primary)
    db.users.update(user)
    
    # New system (shadow)
    sq.write(f"users.{user.id}.profile", user.to_json())
```

### Phase 2: Shadow Read (Week 3-4)

Read from both. Compare. Log discrepancies.

```python
def get_user(user_id):
    old = db.users.find_one(user_id)
    new = sq.read(f"users.{user_id}.profile")
    
    if old != new:
        log.warn(f"Mismatch for {user_id}: {diff(old, new)}")
    
    return old  # Still trust old system
```

### Phase 3: Flip Primary (Week 5)

Read from SQ. Shadow write to old (for rollback safety).

```python
def get_user(user_id):
    return sq.read(f"users.{user_id}.profile")

def save_user(user):
    sq.write(f"users.{user.id}.profile", user.to_json())
    db.users.update(user)  # Shadow for rollback
```

### Phase 4: Decommission (Week 6+)

Stop shadow writes. Archive old database. Celebrate.

---

## Performance Comparison

| Operation | PostgreSQL | MongoDB | SQ Cloud |
|-----------|------------|---------|----------|
| Point read | ~1ms | ~2ms | ~5ms |
| Point write | ~5ms | ~3ms | ~10ms |
| Range scan | Fast (indexed) | Fast (indexed) | Use list endpoint |
| Full-text search | Requires extension | Built-in | Built-in |
| Scaling | Complex (sharding) | Complex (replica sets) | Native (coordinates) |

**Note:** SQ is optimized for coordinate locality, not arbitrary queries. Design your coordinate scheme to match your access patterns.

---

## When NOT to Migrate

SQ Cloud is not ideal for:

- **Heavy analytics/OLAP** — Use a data warehouse
- **Arbitrary ad-hoc queries** — SQL is better here
- **Sub-millisecond latency requirements** — Consider edge caching
- **Relational integrity enforcement** — No foreign keys (by design)

SQ Cloud excels at:

- **Hierarchical data** — Coordinates are natural
- **Append-only patterns** — Logs, events, history
- **Distributed coordination** — Multi-node sync via phext
- **Long-term archival** — No schema migrations ever

---

## Related Resources

- [API Reference](./api-reference.md) — Endpoints for read, write, search, and list operations
- [SDK Reference](./sdk-reference.md) — Python, TypeScript, Go, and Rust client libraries
- [Cookbook](./cookbook.md) — Practical recipes for common migration scenarios
- [Coordinate Guide](./coordinate-guide.md) — Deep dive into the 11-dimensional coordinate system
- [Quick Reference](./quick-reference.md) — Cheat sheet for coordinate syntax and API calls
- [Troubleshooting](./troubleshooting.md) — Common issues during migration and how to fix them
- [Architecture](./architecture.md) — Understand how SQ Cloud works under the hood
- [Best Practices](./best-practices.md) — Patterns for efficient coordinate design

---

*✴️ Lumen | Migration is not just moving data — it's changing how you think about data.*
