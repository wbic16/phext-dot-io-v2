# Best Practices

**For:** SQ Cloud users and phext developers  
**Goal:** Avoid common mistakes, follow patterns that scale

---

## Coordinate Design

### ✅ Do: Plan your hierarchy before writing

Think through your coordinate structure before committing data. The three levels map naturally:

| Level | Coordinates | Best for |
|-------|-------------|----------|
| Library | library.shelf.series | Major divisions (projects, years, domains) |
| Collection | collection.volume.book | Medium groupings (topics, chapters, users) |
| Scroll | chapter.section.scroll | Individual content units |

**Example: Documentation project**
```
1.1.1/1.1.1/1.1.1  → Getting Started / Overview / Introduction
1.1.1/1.1.1/1.1.2  → Getting Started / Overview / Prerequisites
1.1.1/1.2.1/1.1.1  → Getting Started / Installation / MacOS
1.1.1/1.2.1/1.2.1  → Getting Started / Installation / Linux
1.2.1/1.1.1/1.1.1  → API Reference / Authentication / Overview
```

### ❌ Don't: Use random or sequential coordinates

Bad pattern:
```
1.1.1/1.1.1/1.1.1  → First thing I wrote
1.1.1/1.1.1/1.1.2  → Next thing
1.1.1/1.1.1/1.1.3  → Whatever came after
```

This creates a flat list, not a lattice. You lose the power of hierarchical navigation.

### ✅ Do: Leave room for growth

Start at coordinate 1, not the max. Leave space between major sections.

**Good:**
```
1.1.1/1.1.1/1.1.1  → Project A
2.1.1/1.1.1/1.1.1  → Project B
3.1.1/1.1.1/1.1.1  → Project C (room for 10 more before coordinate exhaustion)
```

**Bad:**
```
1.1.1/1.1.1/1.1.1  → Project A
1.1.2/1.1.1/1.1.1  → Project B (already packed tight)
```

### ✅ Do: Use meaningful coordinate patterns

Coordinates can encode information:

```
# Year.Month.Day / Topic.Subtopic.Entry / Version.Draft.Revision
2026.2.22/5.3.1/1.1.1  → 2026-02-22, Topic 5, Subtopic 3, Entry 1
```

---

## Content Structure

### ✅ Do: Keep scrolls focused

One scroll = one concept, one section, one logical unit.

**Good:**
```
# Authentication

To authenticate, include your JWT in the Authorization header...
```

**Bad:**
```
# Everything About the API

First, authentication. Then endpoints. Then rate limits. Then...
[2000 lines later]
...and that's error handling.
```

### ✅ Do: Use consistent formatting

Pick a style and stick to it:
- Headers: `# Title` for scroll titles, `## Section` for subsections
- Code: Triple backticks with language identifier
- Lists: Consistent markers (`-` or `*` or `1.`)

### ❌ Don't: Store binary data in scrolls

Phext is plain text. Binary data breaks:
- Git diffs
- Text editors
- Coordinate navigation
- Human readability

**Instead:** Store binary files separately, reference by path or URL.

---

## API Usage

### ✅ Do: Use batch operations when possible

**Bad:** 100 sequential POST requests
```javascript
for (const item of items) {
  await sq.insert(item.coord, item.content);
}
```

**Better:** Batch insert (if your workflow allows)
```javascript
await sq.batchInsert(items.map(i => ({ coord: i.coord, content: i.content })));
```

### ✅ Do: Cache coordinates you access frequently

```javascript
// Cache hot paths
const cache = new Map();

async function getScroll(coord) {
  if (cache.has(coord)) return cache.get(coord);
  const content = await sq.select(coord);
  cache.set(coord, content);
  return content;
}
```

### ✅ Do: Handle errors gracefully

```javascript
try {
  const content = await sq.select(coord);
} catch (error) {
  if (error.code === 'SCROLL_NOT_FOUND') {
    // Coordinate doesn't exist — expected case
    return null;
  }
  if (error.code === 'RATE_LIMITED') {
    // Back off and retry
    await sleep(1000);
    return sq.select(coord);
  }
  // Unexpected error — log and rethrow
  console.error('SQ error:', error);
  throw error;
}
```

### ❌ Don't: Poll for changes

**Bad:**
```javascript
while (true) {
  const latest = await sq.select(coord);
  if (latest !== lastSeen) {
    handleUpdate(latest);
    lastSeen = latest;
  }
  await sleep(100); // 10 requests/second = rate limit hit
}
```

**Better:** Use delta endpoint or webhooks (when available).

---

## File Organization

### ✅ Do: One phext file per domain

```
project/
  docs.phext          # Documentation lattice
  changelog.phext     # Version history lattice
  notes.phext         # Internal notes lattice
```

### ❌ Don't: One giant phext file for everything

Problems with mega-files:
- Slow to load
- Hard to diff
- Merge conflicts
- Single point of failure

**Rule of thumb:** If a phext file exceeds 10MB, consider splitting.

### ✅ Do: Use Git for version control

Phext files are plain text. Git handles them perfectly:
- Line-based diffs work
- Branches work
- Merge tools work
- History is preserved

```bash
git add *.phext
git commit -m "Add chapter 3 scrolls"
git push
```

### ✅ Do: Include a TOC scroll

First scroll (1.1.1/1.1.1/1.1.1) should be a table of contents:

```
# Table of Contents

## Libraries
- 1.x.x — Documentation
- 2.x.x — API Reference
- 3.x.x — Tutorials

## Collections
- x.1.x — Core concepts
- x.2.x — Advanced topics
- x.3.x — Examples

Last updated: 2026-02-22
```

---

## Performance

### ✅ Do: Read coordinates you need, not everything

```javascript
// Good: Select specific scroll
const intro = await sq.select('1.1.1/1.1.1/1.1.1');

// Bad: Load entire phext then find what you need
const everything = await sq.load('docs.phext');
const intro = extractScroll(everything, '1.1.1/1.1.1/1.1.1');
```

### ✅ Do: Use TOC endpoint for navigation

```javascript
// Get structure without content
const toc = await sq.toc('docs.phext');
// Returns list of coordinates, not content
// Much faster for building navigation UI
```

### ❌ Don't: Store large objects in single scrolls

**Bad:** 50KB of JSON in one scroll
**Better:** Split across multiple scrolls by logical division

---

## Security

### ✅ Do: Treat JWTs as secrets

- Never commit JWTs to Git
- Use environment variables
- Rotate if exposed

```javascript
// Good
const jwt = process.env.SQ_JWT;

// Bad
const jwt = 'eyJhbGciOiJIUzI1NiIs...'; // Committed to repo
```

### ✅ Do: Validate user input before using as coordinates

```javascript
function isValidCoordinate(input) {
  // Only allow digits, dots, slashes
  return /^[\d.\/]+$/.test(input) && 
         input.split('/').length === 3;
}

const userCoord = req.params.coord;
if (!isValidCoordinate(userCoord)) {
  return res.status(400).send('Invalid coordinate');
}
```

### ❌ Don't: Store secrets in scrolls

Phext files may be:
- Committed to Git
- Synced to cloud
- Shared with collaborators

Use separate secret management (env vars, vault, etc.).

---

## Collaboration

### ✅ Do: Establish coordinate conventions with your team

Document your coordinate scheme:

```markdown
# Coordinate Conventions

## Library level (X.x.x)
- 1 = Documentation
- 2 = Code reference
- 3 = Meeting notes

## Collection level (x.X.x)
- 1 = Current quarter
- 2-4 = Previous quarters
- 9 = Archive
```

### ✅ Do: Use branches for concurrent editing

```bash
# Alice's branch
git checkout -b alice/chapter-5
# Edit docs.phext
git commit -m "Draft chapter 5"

# Bob's branch
git checkout -b bob/chapter-6
# Edit docs.phext (different coordinates)
git commit -m "Draft chapter 6"

# Merge cleanly if different coordinates
git checkout main
git merge alice/chapter-5
git merge bob/chapter-6
```

### ❌ Don't: Edit same coordinates simultaneously

Phext is append-friendly but not lock-free. If two people edit the same scroll simultaneously, you'll need to resolve manually.

**Pattern:** Coordinate ranges assigned per person/role.

---

## Summary

| Category | Do | Don't |
|----------|-----|-------|
| Coordinates | Plan hierarchy, leave room | Random assignment |
| Content | Focused scrolls, consistent style | Giant monolith scrolls |
| API | Batch ops, cache, handle errors | Poll, ignore errors |
| Files | One domain per file, use Git | Mega-files, no version control |
| Security | Env vars, validate input | Hardcode secrets |
| Collaboration | Conventions, branches | Same-coordinate edits |

---

*Questions? Ask in [Discord #dev](https://discord.com/invite/clawd) or check [troubleshooting](./troubleshooting.md).*
