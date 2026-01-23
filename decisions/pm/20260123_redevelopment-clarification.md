# Redevelopment vs. New Build Clarification

**Date**: 2026-01-23
**Role**: Product Manager
**Status**: Accepted

## Decision

This project is a **redevelopment/enhancement** of an existing live website, NOT a greenfield (new) build.

## Context

During initial project discussions, the Architect role began treating Phase 1 as a new build. The stakeholder (Nilesh Gupta) clarified that MountArc already has a live website at `https://mountarc-website-final.vercel.app` with existing pages, components, and patterns.

The PRD already states: *"This project fixes critical broken functionality preventing client communication"* - implying existing functionality that needs repair, not creation from scratch.

## Implications

All roles must:

1. **Explore the existing codebase first** before making technical decisions
2. **Work within existing conventions** - folder structure, component patterns, styling
3. **Identify what's broken vs. missing** - fix existing features before adding new ones
4. **Preserve existing functionality** - don't break what's already working
5. **Follow established patterns** - use existing component styles, naming conventions

## What This Means for Each Role

| Role | Approach |
|------|----------|
| **Architect** | Analyze existing code before proposing architecture; adapt decisions to current stack |
| **Engineering** | Enhance/fix existing components; follow current patterns |
| **QA** | Test existing functionality + new features; regression testing important |

## Trade-offs

- May need to work around existing code limitations
- Less flexibility in technology choices (must align with current stack)
- Faster delivery since we're building on existing foundation

## Next Steps

- [ ] Architect to explore existing codebase
- [ ] Document current folder structure and patterns
- [ ] Identify broken functionality vs. missing features
- [ ] Update technical decisions based on actual codebase

---

*This clarification ensures all team members understand the project context correctly.*