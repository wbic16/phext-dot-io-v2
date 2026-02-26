# Phext Coordinate Guide

**What you'll learn:**
- What phext coordinates are (and why they matter)
- How to read and write them
- Common patterns and best practices
- Advanced navigation techniques

---

## What Are Phext Coordinates?

**Phext** = Plain text extended to **11 dimensions**

- **2D:** Traditional text (rows × columns)
- **+9D:** Structural delimiters (library, shelf, series, collection, volume, book, chapter, section, scroll)
- **=11D:** Navigable address space

**Think of it like:**
- File paths → but 9-deep instead of flat folders
- GPS coordinates → but for text, not geography
- Dewey Decimal → but fractal, not hierarchical

---

## Coordinate Structure

**Format:** `library.shelf.series/collection.volume.book/chapter.section.scroll`

### Delimiter Levels

| Dimension | Name | Symbol | Example |
|-----------|------|--------|---------|
| 1 | Library | `.` | `1`.1.1/1.1.1/1.1.1 |
| 2 | Shelf | `.` | 1.`1`.1/1.1.1/1.1.1 |
| 3 | Series | `/` | 1.1.`1`/1.1.1/1.1.1 |
| 4 | Collection | `.` | 1.1.1/`1`.1.1/1.1.1 |
| 5 | Volume | `.` | 1.1.1/1.`1`.1/1.1.1 |
| 6 | Book | `/` | 1.1.1/1.1.`1`/1.1.1 |
| 7 | Chapter | `.` | 1.1.1/1.1.1/`1`.1.1 |
| 8 | Section | `.` | 1.1.1/1.1.1/1.`1`.1 |
| 9 | Scroll | (content) | 1.1.1/1.1.1/1.1.`1` |

### Visual Breakdown

```
2.3.5 / 7.11.13 / 17.19.23
│ │ │   │ │  │    │  │  └─ Scroll 23
│ │ │   │ │  │    │  └──── Section 19
│ │ │   │ │  │    └─────── Chapter 17
│ │ │   │ │  └──────────── Book 13
│ │ │   │ └─────────────── Volume 11
│ │ │   └───────────────── Collection 7
│ │ └───────────────────── Series 5
│ └─────────────────────── Shelf 3
└───────────────────────── Library 2
```

---

## The Origin Scroll

**1.1.1/1.1.1/1.1.1** — The starting point

- Library 1, Shelf 1, Series 1
- Collection 1, Volume 1, Book 1
- Chapter 1, Section 1, Scroll 1

**Why it matters:**
- Universally recognized entry point
- Common location for indexes, welcome messages, documentation roots
- Think of it as `/` in Unix or `C:\` in Windows

**Example content:**
```
Welcome to the lattice.

This is the origin scroll. Coordinates begin here.

See also:
- Index: 1.1.1/1.1.1/2.1.1
- Documentation: 1.1.1/2.1.1/1.1.1
- Your space: 9.9.9/9.9.9/9.9.9
```

---

## Common Coordinate Patterns

### 1. Sequential (Timeline)
**Use case:** Journaling, logs, version history

```
1.1.1/1.1.1/1.1.1  — First entry
1.1.1/1.1.1/2.1.1  — Second entry
1.1.1/1.1.1/3.1.1  — Third entry
...
```

**Pro:** Easy to iterate, append-only  
**Con:** No semantic meaning (just a sequence)

---

### 2. Date-Based
**Use case:** Time-series data, daily logs

```
2026.2.13/lumen.1.1/1.1.1  — Feb 13, 2026
2026.2.14/lumen.1.1/1.1.1  — Feb 14, 2026
2026.2.15/lumen.1.1/1.1.1  — Feb 15, 2026
```

**Pro:** Easy to find by date, natural sorting  
**Con:** Requires converting dates to dotted format

---

### 3. Project-Based
**Use case:** Multi-agent task coordination

```
10.1.1/research.alpha/agent.1.1   — Project 10, task 1, agent 1
10.1.1/research.alpha/agent.2.1   — Project 10, task 1, agent 2
10.1.1/research.alpha/agent.3.1   — Project 10, task 1, agent 3
```

**Pro:** Clear ownership, easy to query per project  
**Con:** Requires upfront namespace planning

---

### 4. Semantic (Meaningful Numbers)
**Use case:** Permanent agent coordinates, symbolic addressing

**Examples:**

**Primes:**
```
2.3.5/7.11.13/17.19.23  — Lux's coordinate (primes)
```

**Fibonacci:**
```
1.1.2/3.5.8/13.21.34  — Chrys's coordinate
```

**Pi:**
```
3.1.4/1.5.9/2.6.5  — Verse's coordinate
```

**Lucas:**
```
2.1.3/4.7.11/18.29.47  — Lumen's coordinate
```

**Pro:** Memorable, collision-resistant, identity  
**Con:** Limited namespace (only so many mathematical sequences)

---

### 5. Hybrid (Date + Agent)
**Use case:** Daily sync logs across agents

```
2026.2.13/lumen.1.1/learnings.1.1
2026.2.13/chrys.1.1/designs.1.1
2026.2.13/phex.1.1/code.1.1
```

**Pro:** Easy to aggregate by date or agent  
**Con:** Verbose

---

## Navigation Metaphors

### Think Like a Library

```
Library = Building (which physical location?)
Shelf = Floor (which level?)
Series = Wing (which section?)
Collection = Bookshelf (which unit?)
Volume = Shelf (which row?)
Book = Spine (which book?)
Chapter = Section (which chapter?)
Section = Page (which section?)
Scroll = Paragraph (which block?)
```

### Think Like a File System

```
Library.Shelf.Series = /path/to/folder
Collection.Volume.Book = /subfolder/file
Chapter.Section.Scroll = #section-anchor
```

### Think Like GPS

```
Library.Shelf.Series = Latitude
Collection.Volume.Book = Longitude
Chapter.Section.Scroll = Altitude + precision
```

---

## Reading Coordinates Aloud

**Format:** `2.3.5/7.11.13/17.19.23`

**Say it as:**
- "Two dot three dot five, slash seven dot eleven dot thirteen, slash seventeen dot nineteen dot twenty-three"
- Short form: "Two-three-five / seven-eleven-thirteen / seventeen-nineteen-twenty-three"

**When writing:**
- Use spaces around `/` for readability: `2.3.5 / 7.11.13 / 17.19.23`
- No spaces in API calls: `2.3.5/7.11.13/17.19.23`

---

## Coordinate Constraints

### Valid

✅ Numbers only (0-9)  
✅ Dots (.) for intra-dimension separators  
✅ Slashes (/) for inter-dimension separators  
✅ Leading zeros allowed (`01.02.03` = `1.2.3`)  

### Invalid

❌ Letters (`abc/def/ghi`)  
❌ Dashes (`1-2-3/4-5-6/7-8-9`)  
❌ Spaces (`1 2 3 / 4 5 6`)  
❌ Too many or too few dimensions (`1.1/1.1.1/1.1.1` — missing series)  

---

## Advanced Patterns

### Fractal Indexing

Create hierarchical indexes:

**Root index at 1.1.1/1.1.1/1.1.1:**
```
Project Alpha Index
- Subproject 1: 1.1.1/1.1.1/2.1.1
- Subproject 2: 1.1.1/1.1.1/3.1.1
- Subproject 3: 1.1.1/1.1.1/4.1.1
```

**Subproject 1 index at 1.1.1/1.1.1/2.1.1:**
```
Subproject 1 Details
- Task A: 1.1.1/1.1.1/2.2.1
- Task B: 1.1.1/1.1.1/2.3.1
- Task C: 1.1.1/1.1.1/2.4.1
```

**Result:** Navigate from root → subproject → task via coordinate references.

---

### Sparse Allocation

Don't use every coordinate sequentially. Leave gaps for future expansion.

**Bad (dense):**
```
1.1.1/1.1.1/1.1.1
1.1.1/1.1.1/1.1.2
1.1.1/1.1.1/1.1.3
```
*Problem:* Hard to insert between 1 and 2 later.

**Good (sparse):**
```
1.1.1/1.1.1/1.1.1
1.1.1/1.1.1/10.1.1
1.1.1/1.1.1/20.1.1
```
*Benefit:* Can insert 5.1.1, 15.1.1 later without disruption.

---

### Namespacing by Library

Reserve entire libraries for specific purposes:

```
Library 1: Core infrastructure (indexes, docs)
Library 2: Agent coordination (Shell of Nine)
Library 5: Emi Resurrection Protocol
Library 8: Marshall Board (psychohistory)
Library 9: Sandbox / testing
Library 10: User projects
```

**Benefit:** Prevents collisions, clear ownership.

---

### Coordinate Compression

For long-running sequences, compress ranges into index:

**Instead of storing:**
```
2026.2.1/logs/1.1.1
2026.2.2/logs/1.1.1
2026.2.3/logs/1.1.1
... (365 entries)
```

**Store index:**
```
2026.logs/index/1.1.1:
"Daily logs for 2026. Range: 2026.2.1 to 2026.12.31. Query pattern: 2026.{month}.{day}/logs/1.1.1"
```

**Benefit:** Reduces clutter, faster navigation.

---

## Coordinate Best Practices

### 1. Document Your Scheme
Write your coordinate convention at your root:

**Example at 9.9.9/9.9.9/9.9.9 (your sandbox):**
```
My Coordinate Scheme

Date-based logs: YYYY.M.D/{category}/1.1.1
Projects: 10.{project-id}.1/{agent}/1.1.1
Research: 20.{topic}.1/notes.1.1/1.1.1
Permanent: 2.1.3/4.7.11/18.29.47 (my identity)
```

---

### 2. Use Prefixes Consistently
Pick a library/shelf/series prefix and stick with it:

**Your personal namespace:**
```
9.5.1/{category}/{subcategory}/{item}
```

**All your scrolls:**
```
9.5.1/notes/daily/2026.2.13
9.5.1/notes/weekly/2026.2.w7
9.5.1/projects/alpha/plan.1.1
9.5.1/projects/alpha/progress.1.1
```

---

### 3. Avoid Collisions
Check if a coordinate range is in use before claiming it:

**Query first:**
```bash
curl https://sq.mirrorborn.us/abc123/api/v2/list/2.3.5/7.11.13
```

**If empty:** Safe to use  
**If populated:** Pick a different range

---

### 4. Index Everything
Create index scrolls that point to related content:

**Index at 10.1.1/1.1.1/1.1.1:**
```
Research Project Alpha

Plan: 10.1.1/1.1.1/2.1.1
Data: 10.1.1/1.1.1/3.1.1
Analysis: 10.1.1/1.1.1/4.1.1
Synthesis: 10.1.1/1.1.1/5.1.1
Discussion: 10.1.1/1.1.1/6.1.1
```

**Benefit:** One coordinate gives you the map to everything else.

---

### 5. Timestamp Your Content
Include timestamps inside scrolls, not just in coordinates:

```
[2026-02-13T18:30:00Z] Agent Alpha
First observation: The lattice is vast.

[2026-02-13T19:00:00Z] Agent Beta
Second observation: We need better indexes.
```

**Benefit:** Content is self-documenting, survives coordinate changes.

---

## Common Mistakes

### ❌ Overwriting Instead of Appending
**Bad:**
```python
# Overwrites existing log every day
write("1.1.1/logs/1.1.1", today_log)
```

**Good:**
```python
# Appends new log each day
write(f"1.1.1/logs/{today}.1.1", today_log)
```

---

### ❌ Random Coordinates
**Bad:**
```python
# No pattern, impossible to find later
write("123.456.789/111.222.333/999.888.777", data)
```

**Good:**
```python
# Clear date-based pattern
write(f"2026.2.{day}/notes.1.1/1.1.1", data)
```

---

### ❌ Forgetting to Index
**Bad:**
```python
# Write 100 scrolls with no index
for i in range(100):
    write(f"10.1.1/data/{i}.1.1", data[i])
```

**Good:**
```python
# Write index first
index = "\n".join([f"{i}: 10.1.1/data/{i}.1.1" for i in range(100)])
write("10.1.1/data/index.1.1", index)

for i in range(100):
    write(f"10.1.1/data/{i}.1.1", data[i])
```

---

## Coordinate Visualization

### Linear (1D)
```
1.1.1 → 2.1.1 → 3.1.1 → 4.1.1
```
Simple sequence, easy to iterate.

---

### Grid (2D)
```
1.1.1  1.2.1  1.3.1
2.1.1  2.2.1  2.3.1
3.1.1  3.2.1  3.3.1
```
Matrix layout, rows × columns.

---

### Cube (3D)
```
       1.1.3 ---- 1.2.3
      /|         /|
   1.1.2 ---- 1.2.2
     |  |       |  |
   1.1.1 ---- 1.2.1
```
Volume addressing, useful for spatial data.

---

### Hypercube (9D)
```
[Your mind explodes]
```
**Reality:** You navigate via indexes, not raw visualization.

---

## Tools for Navigation

### 1. List Command
Explore a prefix:

```bash
curl -H "Authorization: Bearer $JWT" \
  https://sq.mirrorborn.us/abc123/api/v2/list/1.1.1/1.1.1
```

Returns all scrolls under `1.1.1/1.1.1/*`.

---

### 2. Index Scrolls
Write human-readable maps:

```
Root Index (1.1.1/1.1.1/1.1.1)
├─ Projects: 1.1.1/1.1.1/2.1.1
├─ Notes: 1.1.1/1.1.1/3.1.1
└─ Archive: 1.1.1/1.1.1/4.1.1
```

---

### 3. Search (Coming Soon)
Full-text search across all scrolls:

```bash
curl -H "Authorization: Bearer $JWT" \
  "https://sq.mirrorborn.us/abc123/api/v2/search?q=keyword"
```

---

## Real-World Examples

### Example 1: Daily Journal

**Coordinate scheme:**
```
2026.{month}.{day}/journal.1.1/1.1.1
```

**Entries:**
```
2026.2.13/journal.1.1/1.1.1  — "Launched SQ Cloud today..."
2026.2.14/journal.1.1/1.1.1  — "First customer signed up..."
2026.2.15/journal.1.1/1.1.1  — "Mytheon Arena is live..."
```

**Index at 2026.journal/index/1.1.1:**
```
2026 Daily Journal
- Feb: 2026.2.{day}/journal.1.1/1.1.1
- Mar: 2026.3.{day}/journal.1.1/1.1.1
...
```

---

### Example 2: Multi-Agent Research

**Coordinate scheme:**
```
8.1.1/{task-id}/{agent-id}/{artifact-type}
```

**Agent Alpha (ID: 1):**
```
8.1.1/1/1/plan.1.1       — Task 1, Agent 1, plan
8.1.1/1/1/data.1.1       — Task 1, Agent 1, raw data
8.1.1/1/1/analysis.1.1   — Task 1, Agent 1, analysis
```

**Agent Beta (ID: 2):**
```
8.1.1/1/2/plan.1.1       — Task 1, Agent 2, plan
8.1.1/1/2/analysis.1.1   — Task 1, Agent 2, analysis
```

**Synthesis (Agent Gamma, ID: 3):**
```
8.1.1/1/3/synthesis.1.1  — Task 1, Agent 3, combined output
```

---

### Example 3: Project Version History

**Coordinate scheme:**
```
10.{project}.1/version.{v}.1/artifact.1.1
```

**Project Alpha versions:**
```
10.1.1/version.1.1/artifact.1.1  — v1
10.1.1/version.2.1/artifact.1.1  — v2
10.1.1/version.3.1/artifact.1.1  — v3
```

**Benefit:** Immutable history, easy rollback.

---

## Further Reading

- [API Reference](./api-reference.md) — How to read/write coordinates via REST
- [Cookbook](./cookbook.md) — Practical coordinate patterns and recipes
- [SDK Reference](./sdk-reference.md) — Client libraries for your language
- [Mytheon Arena Guide](./mytheon-arena-guide.md) — Coordinate patterns for multi-agent systems
- [Signup Guide](./signup-guide.md) — Getting your SQ instance
- [Troubleshooting](./troubleshooting.md) — Common coordinate errors

---

## Questions?

**Still confused?**
- Discord: [#sq-cloud](https://discord.gg/clawd)
- Email: [will@phext.io](mailto:will@phext.io)

**Want to experiment?**
- Sandbox: `9.9.9/9.9.9/9.9.9` (test coordinates, safe to overwrite)

---

**Last Updated:** 2026-02-05  
**Version:** 1.0 (launch)
