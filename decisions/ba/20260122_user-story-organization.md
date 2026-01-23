# BA Decision: User Story Organization Structure

**Date:** 2026-01-22
**Role:** Business Analyst
**Status:** Accepted
**Impact:** High (affects all epics and stories)

---

## Decision

Organize user stories by epic in co-located folder structure, with epic README and stories together.

---

## Context

Need to organize 5 epics and 16+ user stories in a way that is:
- Easy to navigate
- Clear for Engineering
- Scalable for future work
- Standard Agile practice

---

## Options Considered

### Option 1: Flat Structure
```
/requirements
├── epics/
│   ├── epic-1-email.md
│   ├── epic-2-contact-form.md
│   └── ...
└── user-stories/
    ├── US-001-resend-integration.md
    ├── US-002-email-templates.md
    └── ... (all 16 stories in one folder)
```

**Pros:** Simple, all stories in one place
**Cons:** Hard to find related stories, doesn't scale well

### Option 2: Stories by Epic (Separate Trees)
```
/requirements
├── epics/
│   └── epic-1-email.md
└── user-stories/
    └── epic-1-email/
        ├── US-001-resend-integration.md
        └── ...
```

**Pros:** Stories grouped by epic
**Cons:** Epic and stories in different places

### Option 3: Co-located Structure ✅ **CHOSEN**
```
/requirements/epics/
├── epic-1-email/
│   ├── README.md (epic overview)
│   ├── US-001-resend-integration.md
│   ├── US-002-email-templates.md
│   └── US-003-email-api-route.md
├── epic-2-contact-form/
│   ├── README.md
│   ├── US-004-contact-form-page.md
│   └── ...
└── ...
```

**Pros:**
- Epic and stories together (co-located)
- Easy to navigate (one folder per epic)
- Engineering can grab entire epic folder
- Scalable for future epics
- README.md is standard practice

**Cons:** Slightly deeper folder hierarchy

---

## Chosen Approach

**Option 3: Co-located Structure**

---

## Rationale

1. **Co-location Principle:** Related files should be together
2. **Engineering Workflow:** Eng can work on one epic at a time, all files in one place
3. **Scalability:** Adding new epics doesn't clutter existing structure
4. **Standard Practice:** README.md for folder overview is common
5. **User Approved:** Client approved this structure before implementation

---

## Implementation

**Folder Structure:**
```
requirements/
├── PRD.md
├── business-rules.md
├── epics/
│   ├── epic-1-email/          (3 stories)
│   ├── epic-2-contact-form/   (4 stories)
│   ├── epic-3-discovery-call/ (3 stories)
│   ├── epic-4-newsletter/     (3 stories)
│   └── epic-5-supporting/     (3 stories)
├── user-flows/                (4 flows)
└── data-requirements/         (3 docs)
```

**Epic Folder Contents:**
- `README.md` - Epic overview, scope, success criteria
- `US-XXX-xxx.md` - Individual user stories

**Total:** 5 epics, 16 user stories

---

## Trade-offs

**Advantages:**
- ✅ Intuitive navigation
- ✅ Clear organization
- ✅ Easy to find related work
- ✅ Engineering-friendly

**Disadvantages:**
- ⚠️ Deeper folder nesting
- ⚠️ Need to navigate into folders

**Mitigation:** Clear naming conventions, good README files

---

## Alternatives Rejected

- **Option 1 (Flat):** Too hard to navigate with 16+ stories
- **Option 2 (Separate Trees):** Epic and stories not co-located

---

## Success Criteria

- [x] All epics have dedicated folders
- [x] README.md in each epic folder
- [x] Stories numbered sequentially (US-001 through US-016)
- [x] Clear relationship between epic and stories
- [x] Easy for Engineering to navigate

---

## Related Decisions

- PM's folder structure approval
- Document organization standards (CLAUDE.md)

---

## Review Date

Not needed - structure is working well

---

**Decision Made By:** Business Analyst (with client approval)
**Approved By:** Client (during folder structure discussion)
**Implementation:** Complete
**Version:** 1.0