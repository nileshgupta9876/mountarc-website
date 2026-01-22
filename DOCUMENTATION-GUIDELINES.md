# Documentation Guidelines

**Last Updated**: 2026-01-15

---

## CLAUDE.md Files - Project Context Only

### What CLAUDE.md Should Contain

CLAUDE.md files are **reference guides** for understanding project structure and finding documents. They should contain **ONLY**:

- Project information (name, description, purpose)
- Team & contacts
- Related repositories
- Tech stack overview
- Repository structure
- Quick start guides
- Links to key documents
- Role system (if applicable)
- Governance & standards
- Configuration instructions

### What CLAUDE.md Should NOT Contain

❌ **NO session history** - Not even summaries
❌ **NO "What was done" sections**
❌ **NO progress tracking**
❌ **NO implementation details**
❌ **NO status updates**
❌ **NO decisions** (use ADRs instead)
❌ **NO milestones** (use STATUS.md instead)

### Rule: NO EXCEPTIONS

This applies to:
- Root workspace CLAUDE.md
- Spec repository CLAUDE.md
- Backend repository CLAUDE.md
- Any future repository CLAUDE.md

---

## Where Dynamic Content Should Go

### Session History & Progress

**File**: `STATUS.md` (in each repository)

- Current phase/sprint
- Milestones completed
- Progress metrics
- Next steps
- Session log summary (high-level)

### Decisions

**Directory**: `decisions/` (in spec repository)

- Architecture Decision Records (ADRs)
- Technical decisions with rationale
- Organized by role (pm/, ba/, architect/, engineering/, qa/, devops/)
- Format: `NNNN-title.md` (e.g., `0001-device-provisioning.md`)

### Story Implementation Details

**Directory**: `.implementation/` (in backend repository)

- Story-by-story implementation tracking
- Technical issues and solutions
- Format: `ST-XXX.md` (one file per story)

### Detailed Change History

**Location**: Git commits

- Use conventional commit messages
- Reference story IDs in commits
- Detailed "what changed" goes in commit messages, not CLAUDE.md

---

## Document Maintenance

### When to Update CLAUDE.md

- Project information changes (team, contact)
- New repository added to workspace
- Tech stack changes significantly
- Repository structure changes
- New role added to role system

### When NOT to Update CLAUDE.md

- After completing a story
- After a session ends
- When status changes
- When decisions are made
- When progress is made

### Keep It Static

CLAUDE.md should be relatively **stable** and only change when the fundamental project structure or context changes.

---

## Template Structure

### Minimal CLAUDE.md Template

```markdown
# CLAUDE.md - [Project Name]

## Project Information
- Name, description, purpose
- Repository URL

## Team
- Roles and contacts

## Related Repositories
- Links to other repos in workspace

## Tech Stack
- High-level tech overview

## Repository Structure
- Directory layout

## Quick Start
- Installation steps
- Basic commands

## Key Resources
- Links to important documents

## Governance
- Standards, reporting, escalation

---

**Created**: YYYY-MM-DD
**Last Updated**: YYYY-MM-DD
```

---

## Enforcement

When reviewing or updating CLAUDE.md files:

1. ✅ Check for session history - REMOVE immediately
2. ✅ Check for progress/status - MOVE to STATUS.md
3. ✅ Check for decisions - MOVE to decisions/
4. ✅ Keep only static project context
5. ✅ Update Last Updated date only when structure changes

---

**This is a project-wide standard. No exceptions.**
