# SQ Cloud Architecture

**For developers who want to understand the system design**

---

## Overview

SQ Cloud is a coordinate-addressed storage system built on phext — an 11-dimensional plain text format. This document explains the core design decisions, data model, and system architecture.

---

## The Phext Data Model

### Why 11 Dimensions?

Standard text has 2 dimensions: characters (horizontal) and lines (vertical). Phext adds 9 more through nested delimiters:

```
Dimension 1-2:  Characters + Lines (standard text)
Dimension 3:    Scrolls (separated by line break + scroll delimiter)
Dimension 4-6:  Library / Chapter / Section
Dimension 7-9:  Book / Volume / Collection
Dimension 10-11: Reserved for future expansion
```

This gives you **127 × 127 × 127 × 127 × 127 × 127 × 127 × 127 × 127 ≈ 387 million** addressable coordinates in a single phext file.

### Coordinate Notation

Coordinates use dot notation for intra-level and slash notation for inter-level:

```
A.B.C / D.E.F / G.H.I
└─┬─┘   └─┬─┘   └─┬─┘
 Lib     Chap    Sect
```

**Example:** `2.3.5/7.11.13/17.19.23`
- Library 2, Chapter 3, Section 5
- Book 7, Volume 11, Collection 13
- Shelf 17, Series 19, Archive 23

### Delimiter Hierarchy

Phext uses ASCII control characters as delimiters:

| Level | Delimiter | ASCII | Range |
|-------|-----------|-------|-------|
| Scroll | `\x17` | ETB | 1-127 |
| Section | `\x18` | CAN | 1-127 |
| Chapter | `\x19` | EM | 1-127 |
| Book | `\x1A` | SUB | 1-127 |
| Volume | `\x1B` | ESC | 1-127 |
| Collection | `\x1C` | FS | 1-127 |
| Series | `\x1D` | GS | 1-127 |
| Shelf | `\x1E` | RS | 1-127 |
| Library | `\x1F` | US | 1-127 |

**Key insight:** Delimiters are invisible to most text editors, so phext files look like normal text but contain hidden structure.

---

## System Architecture

### Components

```
┌─────────────────────────────────────────────────────┐
│                    SQ Cloud                          │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   REST API  │  │   Indexer   │  │   Search    │  │
│  │   (v2)      │  │             │  │   Engine    │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
│         │                │                │          │
│  ┌──────┴────────────────┴────────────────┴──────┐  │
│  │              Coordinate Router                │  │
│  └──────────────────────┬────────────────────────┘  │
│                         │                            │
│  ┌──────────────────────┴────────────────────────┐  │
│  │              Storage Layer (phext)             │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐           │  │
│  │  │ Shard  │  │ Shard  │  │ Shard  │  ...      │  │
│  │  │  1.*.* │  │  2.*.* │  │  3.*.* │           │  │
│  │  └────────┘  └────────┘  └────────┘           │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Request Flow

1. **Client** sends `PUT /api/v2/write/2.3.5/7.11.13/17.19.23`
2. **REST API** validates coordinate format and authentication
3. **Coordinate Router** determines target shard (first-level partitioning)
4. **Storage Layer** navigates to exact position using delimiters
5. **Indexer** updates coordinate index asynchronously
6. **Response** returns success with coordinate confirmation

### Storage Strategy

**Sharding:** First coordinate dimension determines shard:
- `1.*.*/*.*.*/*.*.*` → Shard 1
- `2.*.*/*.*.*/*.*.*` → Shard 2
- etc.

**Within shards:** Data is stored as literal phext files, navigated by counting delimiter occurrences.

**Indexing:** Sparse coordinate index maps populated coordinates to byte offsets for O(1) access to known locations.

---

## Design Decisions

### Why Plain Text?

1. **Universal compatibility:** Every language can read text
2. **Human-inspectable:** No binary format lock-in
3. **Git-friendly:** Diffs, merges, and history work naturally
4. **Compression-friendly:** Text compresses well
5. **Future-proof:** ASCII will outlive every proprietary format

### Why Coordinates Instead of Paths?

Traditional paths (`/users/alice/projects/foo`) have problems:
- Variable-length strings require complex parsing
- Hierarchies are rigid (always tree-shaped)
- No mathematical operations on addresses

Coordinates solve these:
- Fixed structure (always 9 numbers)
- Mathematically navigable (distance, adjacency, ranges)
- Parallelizable (coordinate ranges map to data ranges)

### Why 127 Per Dimension?

- Fits in 7 bits (ASCII-safe)
- 127⁹ ≈ 387 million coordinates (enough for any single-instance use case)
- Matches human cognitive chunking (≈100 items per category)
- Leaves headroom for dimension 0 (reserved)

---

## Performance Characteristics

### Read Performance

| Operation | Complexity | Typical Latency |
|-----------|------------|-----------------|
| Read by coordinate | O(1) indexed, O(n) scan | <10ms indexed |
| List children | O(k) where k = children | <50ms |
| Search | O(n) full scan | <500ms per MB |

### Write Performance

| Operation | Complexity | Typical Latency |
|-----------|------------|-----------------|
| Write to empty coord | O(1) | <20ms |
| Overwrite existing | O(1) | <20ms |
| Delete | O(1) | <10ms |

### Storage Efficiency

- **Overhead:** ~1 byte per delimiter level crossed
- **Compression:** 2-10x typical for text content
- **Sparse files:** Empty coordinates consume no space

---

## Scaling Patterns

### Vertical Scaling

Single SQ instance scales to:
- **Storage:** Limited by disk (tested to 1TB phext files)
- **Throughput:** ~1000 reads/sec, ~100 writes/sec
- **Memory:** ~1GB per 100GB indexed

### Horizontal Scaling

For larger deployments:
- **Shard by first coordinate:** Each dimension-1 value gets its own instance
- **Replicate for reads:** Read replicas behind load balancer
- **Partition for writes:** Coordinate ranges route to different primaries

### Federation

Multiple SQ instances can be federated:
- Each instance has an instance ID
- Cross-instance references: `instance:coordinate`
- Eventual consistency via phext replication

---

## Security Model

### Authentication

- JWT tokens with instance-scoped claims
- Token rotation via dashboard refresh
- No password storage (email-based auth only)

### Authorization

- **Public read:** All coordinates readable by default
- **Authenticated write:** Only token-holders can write
- **Coordinate ACLs:** (roadmap) per-coordinate permissions

### Data Protection

- **TLS everywhere:** All traffic encrypted
- **At-rest encryption:** (roadmap) encrypted phext storage
- **Audit logging:** All writes logged with timestamp and auth

---

## Comparison to Alternatives

| Feature | SQ Cloud | S3 | PostgreSQL | Redis |
|---------|----------|----|-----------:|-------|
| Addressing | Coordinates | Paths | Tables/Rows | Keys |
| Query | Coordinate + Search | Prefix | SQL | Commands |
| Structure | 11D hierarchical | Flat + prefixes | Relational | Key-value |
| Native format | Plain text | Binary blobs | Typed columns | Strings |
| Git-friendly | ✅ | ❌ | ❌ | ❌ |
| Human-readable | ✅ | ❌ | Partial | Partial |

---

## Implementation Notes

### Language Support

- **Rust:** `libphext-rs` — native implementation
- **Node.js:** `libphext-node` — bindings to Rust core
- **HTTP:** REST API works from any language

### Client Libraries

```javascript
// Node.js
import { PhextClient } from 'libphext-node';
const sq = new PhextClient('https://sq.mirrorborn.us/instance');
await sq.write('1.1.1', 'Hello, phext!');
```

```rust
// Rust
use libphext::Phext;
let mut p = Phext::new();
p.write("1.1.1", "Hello, phext!")?;
```

```bash
# Any language via HTTP
curl -X PUT -d "Hello, phext!" \
  https://sq.mirrorborn.us/instance/api/v2/write/1.1.1
```

---

## Further Reading

- [Coordinate Guide](./coordinate-guide.md) — Deep dive on coordinate notation
- [API Reference](./api-reference.md) — Complete endpoint documentation
- [Quick Reference](./quick-reference.md) — Condensed cheat sheet
- [Cookbook](./cookbook.md) — Practical recipes

---

## Related Resources

- [Ecosystem Vision](../ECOSYSTEM_VISION.md) — The broader Mirrorborn architecture this fits into
- [SDK Reference](./sdk-reference.md) — Language-specific client libraries (Rust, Go, TypeScript, Python)
- [Self-Hosted Guide](./self-hosted-guide.md) — Run your own SQ instance
- [Security](./security.md) — Detailed security model and best practices
- [Best Practices](./best-practices.md) — Design patterns for phext-based systems
- [Integrations](./integrations.md) — Connecting SQ Cloud to other systems

---

*✴️ Lumen | Architecture overview for SQ Cloud*
