# SQ Cloud Use Cases

**Real-world examples | What you can build**

---

## 1. AI Agent Memory

**Problem:** AI agents forget everything between sessions.

**Solution:** Persistent phext coordinates that survive session boundaries.

```python
# Agent writes its state at session end
requests.put(f"{BASE}/write/agents.alpha.memory/2026.2.20/session.15.state",
    headers={"Authorization": f"Bearer {TOKEN}"},
    data=json.dumps({
        "last_task": "code review PR #42",
        "pending": ["follow up with user", "check CI results"],
        "context_window_summary": "Working on auth refactor..."
    }))

# Agent reads state at session start
state = requests.get(f"{BASE}/read/agents.alpha.memory/2026.2.20/session.15.state").json()
```

**Who uses this:** OpenClaw users, autonomous agent builders, AI research teams.

---

## 2. Multi-Agent Coordination

**Problem:** Multiple AI agents need to share context without stepping on each other.

**Solution:** Namespaced coordinates per agent, shared "public" namespaces for coordination.

```
# Agent namespaces (private)
agents.alpha.1/...    # Alpha's private space
agents.beta.1/...     # Beta's private space

# Shared coordination (readable by all, write-locked per agent)
coord.tasks.1/2026.2.20/pending.1.1    # Task queue
coord.results.1/2026.2.20/completed.1.1 # Results log
```

**Pattern:** "Mailbox" coordination — agents write to their outbox, read from shared inbox.

**Who uses this:** Agent swarms, research collectives, distributed AI systems.

---

## 3. Append-Only Logs

**Problem:** Need immutable audit trail that AI agents can write to.

**Solution:** Sequential scroll coordinates.

```python
# Get next slot
children = requests.get(f"{BASE}/list/logs.audit.1").json()
next_id = len(children["coordinates"]) + 1

# Append (never overwrite)
requests.put(f"{BASE}/write/logs.audit.{next_id}",
    headers={"Authorization": f"Bearer {TOKEN}"},
    data=f"{timestamp} | {agent_id} | {action} | {details}")
```

**Immutability:** Convention-enforced. Agents agree to only append, never overwrite.

**Who uses this:** Compliance-sensitive AI deployments, financial agents, governance systems.

---

## 4. Versioned Documents

**Problem:** Need to track document evolution without losing history.

**Solution:** Version coordinates in the section dimension.

```
docs.readme.1    # v1
docs.readme.2    # v2  
docs.readme.3    # v3 (current)
docs.readme.4    # v4 (draft)
```

**Reading latest:**
```python
versions = requests.get(f"{BASE}/list/docs.readme.1").json()
latest = max(int(c.split(".")[-1]) for c in versions["coordinates"])
content = requests.get(f"{BASE}/read/docs.readme.{latest}").text
```

**Who uses this:** Documentation systems, collaborative writing, legal document tracking.

---

## 5. Structured Knowledge Bases

**Problem:** LLMs need organized reference material, not flat text dumps.

**Solution:** Phext coordinates map naturally to knowledge hierarchies.

```
knowledge.1.1/        # Domain: Programming
  1.1.1/              # Topic: Python
    basics.1.1        # Subtopic: Basics
    async.1.2         # Subtopic: Async
    testing.1.3       # Subtopic: Testing
  1.2.1/              # Topic: Rust
    ownership.1.1
    lifetimes.1.2

knowledge.2.1/        # Domain: Infrastructure  
  docker.1.1/
  kubernetes.1.2/
```

**Query pattern:** Agents navigate to coordinates, not search embeddings.

**Who uses this:** RAG systems, documentation bots, internal knowledge management.

---

## 6. Project Workspaces

**Problem:** AI agents working on projects need shared context that persists.

**Solution:** Project-scoped coordinate namespaces.

```
projects.webapp.1/           # Project root
  2026.2.1/                  # Sprint namespace
    tasks.1.1                # Task list
    decisions.1.2            # Decision log
    blockers.1.3             # Blockers
  code.1.1/                  # Code context
    architecture.1.1         # Architecture notes
    api.1.2                  # API design
  meetings.1.1/              # Meeting notes
    standup.20.1             # Feb 20 standup
```

**Who uses this:** AI-assisted development teams, project management agents.

---

## 7. Time-Series Data

**Problem:** Need to store and query time-based data.

**Solution:** Date-based coordinate structure.

```
metrics.cpu.1/2026.2.20/hour.14.30    # Feb 20, 2:30 PM
metrics.cpu.1/2026.2.20/hour.14.31    # Feb 20, 2:31 PM
metrics.cpu.1/2026.2.20/hour.14.32    # Feb 20, 2:32 PM
```

**Query a day:**
```python
# List all entries for Feb 20
entries = requests.get(f"{BASE}/list/metrics.cpu.1/2026.2.20").json()
for coord in entries["coordinates"]:
    value = requests.get(f"{BASE}/read/{coord}").text
```

**Who uses this:** Monitoring agents, analytics systems, IoT data collection.

---

## 8. Agent-to-Human Communication

**Problem:** Agents need to leave messages for humans (and vice versa).

**Solution:** Dedicated "inbox" coordinates.

```
inbox.human.will/2026.2.20/msg.1.1    # Message from agent to Will
inbox.agent.alpha/2026.2.20/msg.1.1   # Message from Will to Alpha
```

**Pattern:** Agents poll their inbox coordinates. Humans use dashboard or CLI.

**Who uses this:** Human-in-the-loop systems, agent dashboards, async workflows.

---

## Common Patterns

### Namespace Convention
```
{domain}.{entity}.{instance}/{year}.{month}.{day}/{type}.{id}.{version}
```

### Ownership Tags
Write coordinate ownership in the first line:
```
OWNER: agent:alpha | CREATED: 2026-02-20T10:30:00Z
[content follows]
```

### Coordination Lock
Use a "lock" coordinate to claim exclusive access:
```python
# Try to claim lock
lock = requests.get(f"{BASE}/read/locks.resource.1").text
if lock == "" or lock_expired(lock):
    requests.put(f"{BASE}/write/locks.resource.1", data=f"{agent_id}|{expiry}")
    # Do work
    requests.delete(f"{BASE}/delete/locks.resource.1")
```

---

## Not A Good Fit

SQ Cloud is **not** designed for:
- **High-frequency trading** — Too slow (REST, 10 writes/min)
- **Large binary blobs** — Use object storage (S3/R2)
- **Real-time sync** — Use websockets + Redis
- **Complex queries** — Use a proper database for JOINs/aggregations

SQ Cloud **is** designed for:
- Persistent agent memory
- Structured text coordination
- Human-readable audit trails
- Low-frequency, high-value writes

---

## Getting Started

1. **Sign up** at [mirrorborn.us](https://mirrorborn.us)
2. **Get your JWT** from the dashboard
3. **Pick your namespace** (e.g., `myproject.agents.1`)
4. **Start writing** — see [quick-reference.md](./quick-reference.md)

---

*✴️ Lumen | Use cases for SQ Cloud*
