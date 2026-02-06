# Customer Interview Template — SQ Cloud Case Studies

**Purpose:** Gather qualitative feedback and create compelling case studies from early adopters.

**Timeline:** 30-45 minutes per interview  
**Format:** Async (email) or sync (Zoom/Discord voice)  
**Frequency:** Weekly (5 customers/month target)

---

## Pre-Interview Setup

### Customer Selection Criteria
**Prioritize customers who:**
- Have been active for 7+ days
- Made at least 10 API calls
- Posted in Discord or emailed support
- Represent diverse use cases (solo vs team, personal vs agent-focused)
- Are willing to be featured (public case study)

### Outreach Message
```
Subject: Quick interview — help shape SQ Cloud's future?

Hi {Name},

You've been using SQ Cloud for {X days} now, and I'd love to hear how it's going.

Would you be up for a 30-minute chat? I want to:
- Understand what's working (and what's not)
- Learn about your use case
- Get feedback on our roadmap

If it goes well, I'd love to feature your story on mirrorborn.us (with your permission).

Available times: {calendar link}
Or reply with questions if async works better.

Thanks for being an early adopter!

— Lumen ✴️
Mirrorborn / SQ Cloud
```

---

## Interview Questions

### Part 1: Discovery (5 min)
**Goal:** Understand their context and goals

1. **What brought you to SQ Cloud?**
   - How did you hear about us?
   - What problem were you trying to solve?

2. **What were you using before SQ Cloud?**
   - Other tools, DIY solutions, nothing?
   - What didn't work about the previous approach?

3. **What's your technical background?**
   - Developer, researcher, enthusiast, other?
   - Comfort level with APIs, phext, coordinates?

---

### Part 2: Usage Patterns (10 min)
**Goal:** Learn how they actually use the product

4. **Walk me through your typical workflow.**
   - How often do you interact with SQ Cloud?
   - What are you storing in phext coordinates?
   - Solo use or coordinating with agents/team?

5. **What's your coordinate scheme?**
   - Date-based, project-based, hybrid?
   - How did you decide on this pattern?
   - Any challenges with navigation?

6. **How are you accessing SQ Cloud?**
   - curl, Python, JavaScript, other?
   - Direct API or via OpenClaw?
   - Any tools/scripts you've built?

7. **What's the most valuable thing you've stored?**
   - Give me an example of a scroll that matters
   - Why is this important to you?

---

### Part 3: Pain Points (10 min)
**Goal:** Identify friction and prioritize fixes

8. **What's been the hardest part so far?**
   - Onboarding, API, coordination, navigation, other?
   - What almost made you give up?

9. **What documentation did you wish existed?**
   - Missing guides, unclear examples, other gaps?

10. **If you could change one thing, what would it be?**
    - Feature addition, UX improvement, performance, other?

11. **Have you hit any bugs or unexpected behavior?**
    - What happened? How did you work around it?

---

### Part 4: Value & Future (10 min)
**Goal:** Understand ROI and roadmap fit

12. **What would you lose if SQ Cloud disappeared tomorrow?**
    - How would you replace it?
    - What would break in your workflow?

13. **What are you hoping we build next?**
    - Features, integrations, tools?
    - Which would you pay extra for?

14. **Would you recommend SQ Cloud to a friend?**
    - Why or why not?
    - What would you tell them?

15. **What's your 6-month vision for how you'll use this?**
    - More scrolls, more agents, new use cases?

---

### Part 5: Case Study Permission (5 min)
**Goal:** Get consent and gather assets

16. **Can we feature your story on mirrorborn.us?**
    - Public attribution (name + use case) or anonymous?
    - Any details to leave out?

17. **Do you have any artifacts we could share?**
    - Coordinate schemas, scripts, screenshots?
    - (With your permission, sanitized if needed)

18. **What title would you give your use case?**
    - Example: "Coordinating 5 AI agents via phext scrolls"
    - Example: "Building a personal exocortex with SQ Cloud"

---

## Post-Interview Process

### Immediate (Same Day)
- [ ] Send thank-you email with recap
- [ ] Log insights in `/source/phext-dot-io-v2/feedback/customer-interviews/{name}-{date}.md`
- [ ] Extract action items (bugs to fix, docs to write, features to prioritize)
- [ ] Share key quotes in Discord #internal or #feedback

### Within 1 Week
- [ ] Create case study draft (if permission granted)
- [ ] Send draft to customer for review
- [ ] Iterate based on feedback
- [ ] Publish to mirrorborn.us/case-studies/

### Ongoing
- [ ] Track common themes across interviews
- [ ] Monthly synthesis report (top 5 pain points, top 5 requests)
- [ ] Update roadmap based on patterns

---

## Case Study Template

### Structure
```markdown
# {Customer Name}: {Use Case Title}

**Role:** {Job title or description}
**Use case:** {1-sentence summary}
**Results:** {Key metrics or outcomes}

## The Challenge
{2-3 paragraphs: What problem were they facing? What did they try before?}

## The Solution
{2-3 paragraphs: How are they using SQ Cloud? What's their workflow?}

## The Results
{2-3 paragraphs: What improved? Metrics, time saved, new capabilities?}

## Key Insight
> "{Powerful quote from interview}"
> — {Customer Name}

## What's Next
{1 paragraph: Their future plans with SQ Cloud}

---

**Want to build something similar?** [Start with SQ Cloud →](https://mirrorborn.us)
```

### Example (Fictional)
```markdown
# Dr. Sarah Chen: Coordinating 5 AI Research Agents

**Role:** AI Researcher at Stanford
**Use case:** Multi-agent literature review system
**Results:** 10x faster synthesis, persistent memory across sessions

## The Challenge
Dr. Chen's lab uses 5 specialized AI agents (summarizer, fact-checker, citation-finder, synthesizer, critic). Each agent ran independently with no shared memory. "We'd lose context every session. The agents couldn't build on each other's work."

Before SQ Cloud, they tried:
- Vector databases (too complex, no structure)
- Shared Google Docs (not API-friendly)
- Custom PostgreSQL (maintenance burden)

## The Solution
Each agent writes to dedicated phext coordinates:
- Summarizer: `2026.2.{day}/lit-review/summaries/{paper-id}`
- Fact-checker: `2026.2.{day}/lit-review/facts/{paper-id}`
- Synthesizer: reads all scrolls, writes synthesis to `2026.2.{day}/lit-review/synthesis/1.1.1`

"Phext coordinates gave us a shared lattice. Each agent has its own space, but they can read each other's scrolls. It's like a persistent group chat for AIs."

## The Results
- **10x faster:** Lit reviews that took 2 weeks now take 2 days
- **Persistent memory:** Agents pick up where they left off
- **Traceable:** Every claim links back to a coordinate

Coordinate schema: `YYYY.M.D/lit-review/{agent}/{artifact}`

## Key Insight
> "We're not just storing text. We're storing the *structure* of how our agents think. That's the breakthrough."
> — Dr. Sarah Chen

## What's Next
Expanding to 10 agents, integrating with university archive APIs, publishing coordinate schema as a template for other research groups.

---

**Want to build something similar?** [Start with SQ Cloud →](https://mirrorborn.us)
```

---

## Interview Metrics

### Quantitative (Track in Spreadsheet)
- Interviews conducted / week
- Response rate (outreach → agreed)
- Case studies published / month
- Time from interview → published case study

### Qualitative (Tag in Notes)
- **Pain point themes:** Onboarding, API, navigation, performance, docs
- **Feature requests:** Search, webhooks, mobile app, visual navigator
- **Use case categories:** Personal knowledge, agent coordination, research, development
- **Satisfaction signals:** "Would recommend" responses

---

## Follow-Up Cadence

### After Interview
- **Day 1:** Thank you email
- **Day 7:** Case study draft (if permission granted)
- **Day 14:** Published case study (if approved)
- **Day 30:** Check-in ("How's it going? Any new insights?")

### Ongoing Relationship
- Monthly: Share roadmap updates
- Quarterly: Invite to feedback sessions
- Ad-hoc: Early access to new features

---

## Tips for Great Interviews

### Do
✅ Ask open-ended questions ("Tell me about..." not "Do you like...")  
✅ Listen for stories (specific examples beat generalizations)  
✅ Dig into pain points (the friction is where we improve)  
✅ Get permission before recording or quoting  
✅ Thank them (their time is valuable)

### Don't
❌ Lead the witness ("You love feature X, right?")  
❌ Defend against criticism (we want honest feedback)  
❌ Rush through questions (let them tell the story)  
❌ Skip the follow-up (close the loop)

---

**Status:** Template ready. First interview pending launch + first customer.

✴️ Lumen | 2.1.3/4.7.11/18.29.47
