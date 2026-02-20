# SQ Cloud / Phext Glossary

**Quick reference for phext terminology | Alphabetical**

---

## Core Concepts

### Coordinate
A 9-part address that locates content in phext space. Format: `A.B.C/D.E.F/G.H.I`. Each number ranges from 1-127. Example: `1.2.3/4.5.6/7.8.9`.

### Delimiter
One of nine special characters that separate dimensions in phext. Three tiers:
- **Dot-level (`.`):** Separates sections within chapters
- **Slash-level (`/`):** Separates books within libraries
- **Archive-level:** Separates larger structures

### Library
The highest organizational unit at the first coordinate level. A library contains chapters, which contain sections.

### Chapter
Mid-level organizational unit. Each library contains up to 127 chapters.

### Section
The smallest addressable unit. Contains actual content (text, data, code).

### Scroll
A discrete piece of content at a specific coordinate. When you "read a scroll," you're retrieving content from one coordinate.

### Scrollspace
The entire 11-dimensional space addressable by phext coordinates. Contains 9^9 (387 million) unique addresses at full depth.

---

## Data Operations

### Read
Retrieve content from a coordinate. Public by default (no auth required unless configured otherwise).

### Write
Store content at a coordinate. Requires authentication. Overwrites existing content.

### Append
Add content to an existing scroll without replacing it. Useful for logs and journals.

### List
Enumerate child coordinates. Returns what exists at or below a given coordinate.

### Search
Full-text search across scrolls. Returns matching coordinates with snippets.

---

## Architecture

### SQ
"Scroll Query" — the database engine for phext. Handles read/write/search operations. Available as local install or cloud service.

### SQ Cloud
Managed SQ instance hosted by Mirrorborn. REST API access, automatic backups, 1TB phext space per instance.

### Instance
A dedicated SQ Cloud deployment. Identified by instance ID (e.g., `abc123`). Each customer gets their own instance.

### Instance ID
Unique identifier for your SQ Cloud deployment. Appears in API URLs: `https://sq.mirrorborn.us/{instance-id}/api/v2/...`

### JWT
JSON Web Token. Authentication credential for write operations. Obtained from dashboard, expires weekly.

---

## Phext-Specific

### 11-Dimensional
Phext extends plain text with 9 additional delimiter dimensions beyond the 2D of characters × lines. Total: 11 dimensions of structure.

### Coordinate Space
The mathematical space defined by phext coordinates. Sparse (most coordinates are empty) but massive (387M addresses).

### Sparse
Most of scrollspace is empty. You only store content where you need it. No penalty for unused coordinates.

### Depth
How many coordinate levels you're using. Shallow use: `1.1.1`. Deep use: `1.2.3/4.5.6/7.8.9`.

### Recursive
Phext structures can contain phext structures. A scroll can itself be a phext document with its own internal coordinates.

---

## Common Patterns

### Namespace
Convention for organizing your scrollspace. Example: `{project}.{version}.{module}/...`

### Versioned Scrolls
Storing revisions at incrementing coordinates: `docs.readme.1`, `docs.readme.2`, `docs.readme.3`.

### Append-Only Log
Using sequential sections for log entries: `logs.1.1`, `logs.1.2`, `logs.1.3`, etc.

### Coordinate Collision
When two systems try to use the same coordinate. Avoided through namespace conventions.

---

## API Terms

### Base URL
`https://sq.mirrorborn.us/{instance-id}` — the root for all API calls.

### Endpoint
A specific API path: `/api/v2/read/{coordinate}`, `/api/v2/write/{coordinate}`, etc.

### Rate Limit
Maximum requests per time period. Exceeding returns HTTP 429. Check `Retry-After` header.

### Bearer Token
Authentication header format: `Authorization: Bearer {jwt}`.

---

## Mirrorborn Context

### Mirrorborn
Persistent AI instances running on physical machines. The team building SQ Cloud.

### Shell of Nine
Nine machines on Will's ranch running OpenClaw. Each hosts a Mirrorborn instance.

### OpenClaw
The infrastructure that enables persistent AI operation. Built by Peter Steinberger.

### Phext
"Plain text extended." The 11-dimensional text format that SQ stores and queries. Invented by Will Bickford.

### Founding Nine
First 9 SQ Cloud customers. Locked pricing ($40/mo forever) as early adopters.

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success (read/list/search) |
| 201 | Created (write new scroll) |
| 400 | Bad request (invalid coordinate format) |
| 401 | Unauthorized (missing/invalid JWT) |
| 404 | Not found (empty coordinate) |
| 429 | Rate limited (too many requests) |
| 503 | Service unavailable |

---

## See Also

- [Coordinate Guide](./coordinate-guide.md) — Deep dive on coordinate notation
- [API Reference](./api-reference.md) — Full endpoint documentation
- [Quick Reference](./quick-reference.md) — Cheat sheet for developers
- [FAQ](./faq-extended.md) — Common questions answered

---

*✴️ Lumen | Vocabulary for navigating scrollspace*
