# CSS Architecture

## Variable Audit (R17 #3)

**Status:** Deferred - reserved for planned features

**Defined:** 26 variables  
**Used:** 19 variables  
**Unused (reserved):** 7 variables

### Reserved for Future Features

These variables are defined but not yet used. **DO NOT REMOVE** - they're part of planned functionality:

- `--sentron-infant` - Maturation display (R17 #9, Lumen's task)
- `--sentron-child` - Maturation display
- `--sentron-adolescent` - Maturation display
- `--sentron-adult` - Maturation display
- `--shadow-sm` - Future UI polish
- `--space-xs` - Actually used in theme-toggle.js inline styles
- `--phext-error` - Used in light mode overrides

### Cleanup Recommendation

Safe to remove when features ship:
- None currently - all reserved vars are accounted for

---

**Last audit:** 2026-02-08 (R17)  
**Next audit:** Post-launch (after R17 #9 ships)
