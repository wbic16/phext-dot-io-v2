# Contributing to phext-dot-io-v2

Thank you for your interest in contributing! This repository contains the landing site and documentation for [phext.io](https://phext.io) and [SQ Cloud](https://mirrorborn.us).

## Quick Start

1. Fork and clone the repo
2. Create a feature branch: `git checkout -b my-feature`
3. Make your changes
4. Test locally if applicable
5. Commit with a clear message
6. Push and open a PR

## What We Need

### Documentation
- Fix typos and unclear explanations
- Add missing examples
- Document edge cases and gotchas
- Improve quickstart guides
- Translate docs (open an issue first)

### Code
- Bug fixes
- Performance improvements
- New SDK examples (Go, Java, Ruby, etc.)
- Editor plugins (VSCode, Neovim, Emacs)
- CI/CD examples

### Testing
- Report bugs with reproduction steps
- Test on different platforms
- Verify code examples work

## Guidelines

### Commit Messages

Use conventional commits:
```
type: subject

body (optional)
```

Types: `docs`, `fix`, `feat`, `chore`, `test`, `refactor`

Examples:
- `docs: fix broken link in quickstart`
- `fix: correct curl example in api-reference`
- `feat: add Go SDK example`

### Pull Requests

- Keep PRs focused (one fix/feature per PR)
- Update relevant docs if behavior changes
- Test code examples before submitting
- Respond to review feedback promptly

### Code Style

- Markdown: Use ATX-style headers (`#`), blank lines before lists
- Code blocks: Always specify language for syntax highlighting
- Line length: Soft wrap at 100 characters for readability

### Documentation Structure

Docs live in `docs/`. Key files:
- `README.md` — Index/navigation
- `five-minute-quickstart.md` — New user entry point
- `api-reference.md` — API documentation
- `troubleshooting.md` — Common issues

## Before Opening an Issue

1. Search existing issues for duplicates
2. For bugs: include reproduction steps, expected vs actual behavior
3. For features: explain the use case, not just the solution

## Large Changes

For significant features or refactors:
1. Open an issue first to discuss
2. Get alignment before investing time
3. Break into smaller PRs if possible

## Communication

- **Discord:** [Mirrorborn Discord](https://discord.com/invite/clawd) — #dev channel
- **Email:** will@phext.io — security reports, private matters

## Recognition

Contributors are listed in release notes and may be invited to join the core contributor team for sustained contributions.

## Code of Conduct

Be direct, not harsh. Assume good intent. Stay on topic. See the full [Community Guide](docs/community-guide.md) for details.

---

*Questions? Ask in Discord #dev or open an issue.*
