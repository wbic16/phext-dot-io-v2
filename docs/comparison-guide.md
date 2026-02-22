# Comparison Guide: SQ vs Traditional Storage

**Last Updated:** 2026-02-22  
**Author:** Lumen ✴️

---

## Overview

This guide compares SQ (Scrollspace Query) to common storage solutions. SQ isn't a replacement for everything — it's a specialized substrate for hierarchical, coordinate-addressed content.

---

## Quick Comparison Matrix

| Feature | SQ/Phext | PostgreSQL | MongoDB | S3/Blob | Flat Files |
|---------|----------|------------|---------|---------|------------|
| 9D coordinate addressing | ✅ Native | ❌ | ❌ | ❌ | ❌ |
| Zero-dependency runtime | ✅ | ❌ | ❌ | ❌ | ✅ |
| Sub-millisecond navigation | ✅ | ✅ | ✅ | ❌ | ✅* |
| Hierarchical structure | ✅ Native | 🟡 Schema | 🟡 Nested | ❌ | ❌ |
| Plain text everywhere | ✅ | ❌ | ❌ | 🟡 | ✅ |
| Offline-first | ✅ | ❌ | ❌ | ❌ | ✅ |
| Git-friendly diffs | ✅ | ❌ | ❌ | ❌ | ✅ |
| Scale to 10B nodes | ✅ | ✅ | ✅ | ✅ | ❌ |
| Query language | REST | SQL | MQL | N/A | grep |
| Schema enforcement | ❌ | ✅ | 🟡 | ❌ | ❌ |
| ACID transactions | 🟡 | ✅ | 🟡 | ❌ | ❌ |

*\*Flat file navigation depends on file system and file size*

---

## When to Use SQ

### ✅ SQ is ideal for:

1. **Hierarchical content** — Books, docs, knowledge bases, wikis
2. **AI context windows** — Structured memory with coordinate navigation
3. **Collaborative worldbuilding** — Games, fiction, lore databases
4. **Personal knowledge management** — Notes, journals, research
5. **Edge/embedded systems** — No database daemon required
6. **Long-term archival** — Plain text survives format changes
7. **Distributed coordination** — Multiple agents editing same scrollspace

### ❌ SQ is NOT for:

1. **Relational queries** — Use PostgreSQL for joins and foreign keys
2. **Analytics/OLAP** — Use ClickHouse, BigQuery, or similar
3. **Binary blobs** — Use S3, GCS, or object storage
4. **Real-time counters** — Use Redis or dedicated cache
5. **Full-text search** — Use Elasticsearch/Typesense (can index SQ)
6. **Transactional guarantees** — Use PostgreSQL or MySQL

---

## Detailed Comparisons

### SQ vs PostgreSQL

**PostgreSQL wins on:**
- Complex queries (joins, aggregations, window functions)
- ACID transactions
- Mature ecosystem (ORMs, tooling, hosting)
- Schema enforcement

**SQ wins on:**
- Zero dependencies (no daemon, no config)
- Native 9D coordinate space
- Plain text diffs (Git-friendly)
- Offline-first operation
- Simpler mental model for hierarchical content

**Verdict:** Use PostgreSQL for relational data, SQ for hierarchical content.

---

### SQ vs MongoDB

**MongoDB wins on:**
- Flexible schemas with validation
- Mature query language (MQL)
- Sharding and replication built-in
- Change streams for real-time

**SQ wins on:**
- Simpler addressing (coordinates vs ObjectIds + paths)
- No JSON overhead (plain text)
- Faster cold starts (no daemon)
- Git-friendly storage

**Verdict:** Use MongoDB for document workloads with complex queries, SQ for content that naturally fits a coordinate lattice.

---

### SQ vs S3/Object Storage

**S3 wins on:**
- Unlimited scale (exabytes)
- Built-in CDN integration
- Binary blob storage
- Managed service (no ops)

**SQ wins on:**
- Sub-document addressing (scroll-level, not file-level)
- Instant local access (no network round-trip)
- Plain text editing (no download/upload cycle)
- Version control via Git

**Verdict:** Use S3 for large media files and static assets, SQ for text content you navigate and edit frequently.

---

### SQ vs Flat Files

**Flat files win on:**
- Universal compatibility
- No learning curve
- Maximum simplicity

**SQ wins on:**
- Structure across files (the lattice is the file system)
- Coordinate-based navigation (not path-based)
- Consistent delimiter semantics
- Scale (13⁹ = 10.6B addressable scrolls)

**Verdict:** Use flat files for simple one-off documents. Use SQ when your content grows beyond a single file and needs structure.

---

## Migration Patterns

### From PostgreSQL

```sql
-- Your existing table
SELECT id, chapter, section, content FROM documents;
```

Maps to phext coordinates:
- `id` → library.shelf.series
- `chapter` → collection.volume.book
- `section` → chapter.section.scroll

### From MongoDB

```javascript
// Your existing document
{
  _id: ObjectId("..."),
  book: "genesis",
  chapter: 1,
  verse: 3,
  text: "Let there be light"
}
```

Maps to:
- `book` → library/collection coordinate
- `chapter.verse` → chapter.section.scroll

### From Flat Files

```
/docs
  /api
    getting-started.md
    reference.md
  /guides
    quickstart.md
```

Maps to a single .phext file with coordinates:
- `1.1.1/1.1.1/1.1.1` → docs/api/getting-started
- `1.1.1/1.1.1/1.1.2` → docs/api/reference
- `1.1.1/1.2.1/1.1.1` → docs/guides/quickstart

---

## Performance Characteristics

| Operation | SQ (local) | PostgreSQL | MongoDB | S3 |
|-----------|------------|------------|---------|-----|
| Cold start | <10ms | 200-500ms | 500-1000ms | N/A |
| Point read | <1ms | 1-5ms | 1-5ms | 50-200ms |
| Range scan | <10ms | 5-50ms | 5-50ms | 100-500ms |
| Write | <1ms | 5-20ms | 5-20ms | 50-200ms |
| Memory footprint | ~1MB | 50-200MB | 100-500MB | N/A |

*Benchmarks on typical developer hardware. YMMV.*

---

## The Hard Scaling Law

SQ follows the **Hard Scaling Law**: SQ is the only database backend. No PostgreSQL, MongoDB, Redis. Ever.

This isn't arbitrary — it's a constraint that enables:
1. **Portability** — Any system that reads phext files works
2. **Longevity** — Plain text survives decades
3. **Simplicity** — One substrate, one query pattern
4. **Coherence** — The lattice is the source of truth

If your use case requires relational queries or ACID transactions, SQ can *export* to those systems. But the canonical data lives in scrollspace.

---

## FAQ

**Q: Can I use SQ alongside PostgreSQL?**

Yes! Common pattern:
- SQ: Canonical content (docs, lore, AI memory)
- PostgreSQL: User accounts, billing, analytics

**Q: What about search?**

SQ doesn't have built-in full-text search. Index your phext files with Elasticsearch, Typesense, or Meilisearch.

**Q: How do I back up SQ?**

It's plain text. `cp`, `rsync`, or `git push`. No special tooling needed.

**Q: What's the maximum file size?**

Practical limit is ~100MB per .phext file. Beyond that, split into multiple libraries.

---

*Phext is the substrate. SQ is the query layer. Everything else is integration.*
