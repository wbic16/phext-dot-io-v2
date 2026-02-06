# Domain Vision Docs — Mirrorborn Ecosystem

**Strategic Question:** What narrative does each domain tell?

**Framework:**
- **mirrorborn.us** = The hub (SQ Cloud + Mytheon Arena)
- **Five properties** = Specialized portals for different entry points

---

## 1. visionquest.me — Personal Exocortex Onboarding

### Will's Prompt: "Exploration?"

**Yes, but more specific:** Exploring the structure of your own mind.

### Core Narrative
*"Your second brain, in 11 dimensions."*

You've heard about exocortex, knowledge graphs, "second brains." Most tools give you folders and tags. We give you phext — a coordinate system for thought.

**This is not for teams.** This is not for agents. This is for **you** — one person, learning to think in lattice space.

### Who It's For
- Knowledge workers drowning in notes
- Researchers building personal archives
- Writers organizing complex ideas
- Anyone who feels like their thoughts deserve better than Evernote

### What Problem It Solves
**Problem:** Flat files (folders) or graph databases (links) both fail to capture nested structure + temporal dimension + perspective shifts.

**Solution:** Phext coordinates let you organize by:
- Topic (library.shelf.series)
- Time (YYYY.M.D or YYYY.M.W)
- Perspective (draft vs final, optimistic vs skeptical)
- Any schema you invent

### Journey
1. **Discovery:** "What if my notes had coordinates?"
2. **First scroll:** Write to 1.1.1/1.1.1/1.1.1 (origin)
3. **Schema choice:** Date-based, topic-based, or hybrid?
4. **Navigation:** Learn to query by prefix (list 2026.2.*/*)
5. **Mastery:** Personal lattice, 10K+ scrolls, navigable by coordinate

### Revenue Model
**$10/mo (B2C tier)**
- 1GB phext storage (personal scale)
- REST API access (script your own tools)
- Web UI (coordinate navigator, search)
- No agents, no collaboration (solo only)

### Tech Stack
- Same SQ backend (multi-tenant)
- Simplified onboarding (no "what's an agent?" confusion)
- Mobile app (iOS/Android) for quick captures

### Launch Timeline
**Q1 2026 (March)**
- Week 1: Scope + wireframes
- Week 2-3: Build web UI (coordinate explorer)
- Week 4: Beta (invite 10 users)
- Week 5: Public launch

---

## 2. wishnode.net — Managed Agent Hosting

### Will's Prompt: "Connection/coordination?"

**Yes, but infrastructure-first:** Your agent, always on, coordinating via scrolls.

### Core Narrative
*"Your AI agent, running 24/7. No servers. No setup."*

You want a persistent AI agent. Not a chatbot that forgets. Not an API you have to poll. A **node** — running 24/7, checking your calendar, writing summaries, coordinating with your team.

**The barrier:** You'd need to manage servers, OpenClaw config, SQ instance, cron jobs, logging, backups.

**The solution:** We manage it. You get a node. It runs. Forever.

### Who It's For
- Non-technical users who want persistent agents
- Teams needing always-on coordination nodes
- Power users who don't want to manage infrastructure

### What Problem It Solves
**Problem:** Running persistent AI agents requires sysadmin skills most people don't have.

**Solution:** Pre-configured OpenClaw + SQ Cloud + cron + monitoring. You provide the agent's prompt. We run it.

### Journey
1. **Discovery:** "I want an agent that remembers across sessions."
2. **Claim node:** Pick a name (e.g., `alice.wishnode.net`)
3. **Configure:** Upload agent prompt, connect calendars/APIs
4. **Activate:** Node wakes up, starts running your agent
5. **Coordinate:** Your agent writes to SQ Cloud, reads from siblings, syncs daily

### Revenue Model
**$80/mo (managed hosting)**
- Includes: SQ Cloud instance ($40) + compute ($40)
- 1TB phext storage
- OpenClaw runtime (Claude/Sonnet backend)
- Monitoring + backups

### Tech Stack
- Docker containers (one per node)
- OpenClaw pre-configured
- SQ Cloud integration (each node gets an instance)
- Cron for heartbeats
- Logs viewable via dashboard

### Launch Timeline
**Q2 2026 (May)**
- Week 1-2: Containerize OpenClaw stack
- Week 3-4: Build node provisioning system
- Week 5-6: Beta (5 nodes for testing)
- Week 7: Public launch

---

## 3. apertureshift.com — Perspective-Taking Tools

### Will's Prompt: "Perspective change?"

**Yes, explicitly:** See your idea through opposing lenses.

### Core Narrative
*"One question. Three minds. Zero echo chamber."*

You have an idea. It sounds good to you. But you're inside your own head.

**What if** you could run that idea through:
- A skeptic (finds every flaw)
- An optimist (finds every opportunity)
- A neutral synthesizer (weighs both)

**Result:** You see your blind spots. You stress-test before committing.

### Who It's For
- Researchers stress-testing hypotheses
- Strategists evaluating decisions
- Writers seeking critique
- Anyone who wants to escape confirmation bias

### What Problem It Solves
**Problem:** Echo chambers. You ask your friends, they agree with you. You ask one AI, it's polite and agreeable. You don't see your blind spots until it's too late.

**Solution:** Multi-agent debate. Each agent takes a perspective. You get all three viewpoints, written to separate scrolls, synthesized into one analysis.

### Journey
1. **Discovery:** "I need to stress-test this idea."
2. **Submit question:** "Should I quit my job and build this startup?"
3. **Agents engage:**
   - Skeptic writes to 5.1.1/skeptic/1.1.1 ("Here's why it will fail...")
   - Optimist writes to 5.1.1/optimist/1.1.1 ("Here's why it will succeed...")
   - Synthesizer reads both, writes to 5.1.1/synthesis/1.1.1
4. **Result:** Three perspectives, stored as scrolls, navigable
5. **Iterate:** Refine question, run again

### Revenue Model
**$20/mo (add-on to SQ Cloud)**
- 10 queries/month (each query = 3 agents × 1 analysis)
- Results stored in your SQ instance
- Export to PDF/Markdown

### Tech Stack
- Multi-agent orchestration (3 Claude instances)
- Prompt engineering (skeptic/optimist/synthesis personas)
- SQ storage (each perspective = a scroll)
- Web UI (submit question, view results)

### Launch Timeline
**Q3 2026 (July)**
- Week 1-2: Build multi-agent orchestration
- Week 3-4: Tune personas (skeptic/optimist/synthesis)
- Week 5-6: Beta (20 users, 5 queries each)
- Week 7: Public launch

---

## 4. sotafomo.com — AI Trend Aggregator

### Will's Prompt: "Community/discovery?"

**Yes, but curated:** Discover what matters in AI without drowning in Twitter.

### Core Narrative
*"You can't read every AI paper. We can."*

The AI field moves fast. Every day:
- 50+ papers on arXiv
- 100+ Hacker News posts
- 1000+ tweets

**You can't keep up.** Nobody can.

**We aggregate.** Multi-agent system scrapes arXiv, HN, Twitter. Writes daily digest. Stored as scrolls. Searchable.

### Who It's For
- AI researchers (stay current without drowning)
- Founders (spot trends early)
- Investors (identify emerging companies)
- Enthusiasts (FOMO → curated updates)

### What Problem It Solves
**Problem:** Information overload. You miss important papers/posts because the signal-to-noise ratio is too low.

**Solution:** Multi-agent curation. One agent scrapes arXiv. One scrapes HN. One scrapes Twitter. Synthesis agent writes daily digest. You read 500 words instead of 10,000 tweets.

### Journey
1. **Discovery:** "I keep missing important AI news."
2. **Subscribe:** Free daily email digest
3. **Read:** 500-word summary (top 5 papers, top 3 HN posts, top trend)
4. **Upgrade:** $15/mo for archive access + search
5. **Query:** "What did Anthropic publish in Q1 2026?"

### Revenue Model
**Freemium:**
- Free: Daily email digest (lead gen)
- $15/mo: Archive access (search back 1 year), export to phext

### Tech Stack
- Scraping agents (arXiv API, HN API, Twitter API)
- Synthesis agent (writes digest)
- SQ storage (one scroll per day: YYYY.M.D/digest/1.1.1)
- Email delivery (daily cron job)
- Search API (query archive)

### Launch Timeline
**Q3 2026 (August)**
- Week 1-2: Build scraping agents
- Week 3-4: Tune synthesis agent (digest quality)
- Week 5: Beta (100 subscribers, free tier only)
- Week 6: Public launch (free + paid)

---

## 5. quickfork.net — Phext Brainstorming

### Will's Prompt: "Rapid prototyping/deployment?"

**Yes, but idea-first:** Fork ideas, not code. Explore variations. Don't lose the original.

### Core Narrative
*"Don't edit. Fork."*

You have an idea. You write it down. Then you think: "What if I change X?"

**Traditional editing:** Overwrite the original. You lose history.

**Version control (git):** Too heavy for ideas. You just want to fork, not `git commit -m`.

**quickfork.net:** Write scroll at 5.1.1/1.1.1/1.1.1. Fork to 5.1.1/1.1.1/2.1.1 (variation A). Fork to 5.1.1/1.1.1/3.1.1 (variation B). See the tree. Merge later.

### Who It's For
- Writers (explore plot variations)
- Designers (fork mockups)
- Strategists (fork plans)
- Anyone brainstorming

### What Problem It Solves
**Problem:** Editing destroys history. You can't explore variations without losing the original.

**Solution:** Phext-native forking. Each variation is a new coordinate. Tree view shows branches. Merge tool synthesizes.

### Journey
1. **Discovery:** "I keep losing good ideas when I edit."
2. **Write origin:** 5.1.1/1.1.1/1.1.1 ("Original plan")
3. **Fork:** Click "Fork" → creates 5.1.1/1.1.1/2.1.1 (variation A)
4. **Edit variation:** Change details without touching original
5. **Compare:** Side-by-side view (origin vs forks)
6. **Merge:** Synthesis tool combines best parts

### Revenue Model
**Freemium:**
- Free: Public forks (visible to all)
- $10/mo: Private scrolls (hidden from public)

### Tech Stack
- SQ Cloud (storage)
- Web UI (fork tree visualizer, side-by-side compare)
- Merge tool (AI-assisted synthesis)

### Launch Timeline
**Q3 2026 (September)**
- Week 1-2: Build fork tree visualizer
- Week 3-4: Build merge tool (synthesis agent)
- Week 5: Beta (50 users, public forks only)
- Week 6: Public launch (free + paid)

---

## Strategic Dependencies

### Dependency Graph

```
mirrorborn.us (SQ Cloud)
  ↓
  ├─ visionquest.me (Q1) — Uses SQ backend, simplified onboarding
  ├─ wishnode.net (Q2) — Requires SQ + OpenClaw containerization
  ├─ apertureshift.com (Q3) — Requires SQ + multi-agent orchestration
  ├─ sotafomo.com (Q3) — Independent (email-first), optional SQ export
  └─ quickfork.net (Q3) — Requires SQ + fork tree UI
```

### Sequential Launch Rationale

**Why visionquest first (Q1)?**
- Simplest to build (same backend as mirrorborn.us, just simpler UX)
- Largest TAM (personal knowledge management vs AI collectives)
- Revenue diversification (B2C vs B2B)

**Why wishnode second (Q2)?**
- High revenue potential ($80/mo vs $10/mo)
- Requires infrastructure work (containerization, provisioning)
- Validates managed hosting model

**Why apertureshift/sotafomo/quickfork later (Q3)?**
- More complex feature sets (multi-agent orchestration, scraping, fork trees)
- Smaller initial TAM (niche use cases)
- Can iterate based on visionquest/wishnode learnings

---

## Cross-Property User Journeys

### Journey 1: Solo User → Team Coordinator
1. Start with **visionquest.me** (personal exocortex, $10/mo)
2. Organize personal notes, learn phext coordinates
3. Want to share with team → upgrade to **mirrorborn.us** (SQ Cloud, $40/mo)
4. Need always-on coordination → add **wishnode.net** (managed node, $80/mo total)

**Lifetime value:** $10 → $40 → $80/mo = 8x revenue expansion

---

### Journey 2: Researcher → Curator
1. Start with **sotafomo.com** (free daily digest)
2. Need deeper search → upgrade to $15/mo (archive access)
3. Want to stress-test research ideas → add **apertureshift.com** ($20/mo)
4. Building personal knowledge base → add **visionquest.me** ($10/mo)

**Lifetime value:** $0 → $15 → $35 → $45/mo

---

### Journey 3: Developer → Infrastructure User
1. Start with **mirrorborn.us** (SQ Cloud API, $40/mo)
2. Building prototypes → add **quickfork.net** ($10/mo, fork variations)
3. Need production deployment → add **wishnode.net** ($80/mo, managed hosting)

**Lifetime value:** $40 → $50 → $130/mo

---

## Q1 2026 Priorities (All Agents)

### February (Launch Month)
**Focus:** Stabilize mirrorborn.us with real users

**Milestones:**
- Feb 13: Launch Day (SQ Cloud + Mytheon Arena)
- Feb 20: First 3 paying customers
- Feb 27: Founding Nine fills (9 customers @ $40/mo = $360/mo MRR)

**Blockers to resolve:**
- Backend deployment (Verse)
- AWS SES configuration (Will)
- Auth flow integration (Theia)
- Security audit (Cyon)

---

### March (visionquest.me Launch)
**Focus:** Personal exocortex onboarding

**Milestones:**
- Mar 1: Scope + wireframes (Theia + Lumen)
- Mar 15: Beta (10 users, invite-only)
- Mar 22: Public launch (visionquest.me live)
- Mar 31: First 20 customers @ $10/mo = $200/mo MRR

**Deliverables:**
- Simplified onboarding flow (Theia)
- Web UI for coordinate explorer (Theia)
- Landing page + messaging (Lumen + Chrys)
- Visual identity (Chrys)

---

### April-May (Infrastructure Consolidation)
**Focus:** Stabilize, iterate, prepare for wishnode.net

**Milestones:**
- Apr 15: 50 total customers across mirrorborn.us + visionquest.me
- May 1: wishnode.net scoped (Verse + Theia)
- May 15: OpenClaw containerization complete (Verse)
- May 31: wishnode.net beta (5 nodes)

**Deliverables:**
- Case studies from early adopters (Lumen)
- Improved docs based on feedback (Lumen)
- Multi-domain monitoring (Verse)
- Security hardening (Cyon)

---

## Open Questions for Strategic Session

### Business Model
1. **Bundle vs à la carte:** Should properties be sold individually or as a package?
2. **Free tier strategy:** Which properties should have free tiers for lead gen?
3. **Enterprise pricing:** Do we offer team plans, or stay individual-focused?

### Technical Architecture
1. **Separate apps vs shared infra:** Should each domain be a separate codebase, or views into shared SQ backend?
2. **Auth federation:** Can one login work across all properties, or separate accounts per domain?
3. **Data portability:** Can users export their scrolls from visionquest and import to mirrorborn.us?

### Brand Positioning
1. **Mirrorborn visibility:** Do end users know they're using "Mirrorborn" products, or is each domain standalone?
2. **Naming consistency:** Should all properties have `.me` / `.com` / `.net` suffixes for consistency?
3. **Community integration:** Should Discord be unified or per-property?

### Go-to-Market
1. **Launch sequence:** Confirm Q1-Q3 timeline, or accelerate?
2. **Marketing budget:** Are we bootstrap-only or willing to spend on ads?
3. **Partnerships:** Any integrations with existing tools (Notion, Roam, Obsidian)?

---

## Next Steps (Lumen)

### Pre-Launch (Awaiting Backend)
- [ ] Monitor blocker resolution (Verse, Will, Theia, Cyon)
- [ ] Prepare Kelly outreach email (Founding Nine offer)
- [ ] Draft community engagement strategy

### Post-Launch (When mirrorborn.us Live)
- [ ] Onboard first 3 customers
- [ ] Gather qualitative feedback
- [ ] Update docs based on common questions
- [ ] Create first case study

### Strategic Session Prep
- [ ] Refine domain visions (this doc)
- [ ] Propose answers to open questions
- [ ] Coordinate with Chrys on brand cohesion
- [ ] Coordinate with Theia on tech architecture

---

**Status:** Vision docs ready. Awaiting strategic session + launch success.

✴️ Lumen | 2.1.3/4.7.11/18.29.47
