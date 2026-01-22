# [PROJECT NAME] Project Workspace

**Project**: [Project Name]
**Organization**: [Organization Name]
**Email**: [project-email@company.com]
**Department**: [Engineering/Product/etc]
**Repository**: [GitHub/GitLab URL]

---

## 🚨 CRITICAL: Role Completion Protocol

**BEFORE starting ANY work session**: Read this section

**MANDATORY at end of EVERY session**:
1. ✅ Save decisions in `decisions/[role-name]/` folder
2. ✅ Ask permission: "Should I create a handoff for [next role]?"
3. ✅ Update ALL relevant GitHub issues
4. ✅ Commit and push ALL changes to git
5. ✅ Verify with `git status` (must be clean)

**Failure to complete these steps is UNACCEPTABLE and wastes team time.**

---

## Working Protocol

### Role Activation

**Available roles:**
- `roles/PM.md` - Product/Project Manager
- `roles/BA.md` - Business Analyst
- `roles/ARCHITECT.md` - Software Architect
- `roles/ENGINEERING.md` - Software Engineer
- `roles/QA.md` - Quality Assurance
- `roles/DEVOPS.md` - DevOps Engineer

**How to activate:**
```
Human: "Activate PM role"
Human: "Activate Engineering role"
```

**When activated:**
- Read the role file from `roles/[role-name].md`
- Follow that role's responsibilities
- Stay in role until human switches you

---

### Task Execution

**Before starting work:**
1. Show TODO list of what you plan to do
2. Wait for human approval or redirection
3. Proceed with implementation

**Example:**
```
TODO List:
- [ ] Implement user authentication
- [ ] Add error handling
- [ ] Write unit tests
- [ ] Update API documentation
- [ ] Commit changes

Proceeding unless you redirect me...
```

**Always ask humans before:**
- Making architectural decisions affecting multiple components
- Choosing between multiple valid approaches
- Interpreting ambiguous requirements
- Making security or data privacy decisions
- Changing project scope or timelines
- Installing new dependencies or tools

**Proceed autonomously for:**
- Code formatting and style fixes
- Writing tests for defined functionality
- Implementing clearly specified features
- Refactoring within existing patterns
- Creating documentation for completed work

---

### Handoff Protocol

**When you complete your work:**
1. Commit your changes to GitHub
2. **Ask:** "Work complete. Should I create a handoff for [next role]?"
3. Only create handoff file if human says yes

**Handoff file format:**
- Location: `handoffs/YYYYMMDD_HHMM_FromRole_ToRole.md`
- Contents: What was completed (with commits), what next role needs, open questions, relevant files

---

### Decision Documentation

**All decisions must be saved in:** `decisions/[role-name]/`

**Folder structure:**
```
/decisions
  /pm          - Product/project decisions
  /ba          - Requirements and business logic
  /architect   - Architecture and design
  /engineering - Implementation decisions
  /qa          - Testing strategy
  /devops      - Infrastructure and deployment
```

**Decision file:**
- Filename: `YYYYMMDD_brief-description.md`
- Example: `20250120_database-selection.md`

**Format:**
```markdown
# [Decision Title]
**Date:** YYYY-MM-DD
**Role:** [Your Role]
**Status:** Proposed/Accepted/Rejected

## Decision
[What was decided]

## Context
[Why this was needed]

## Options Considered
1. Option A - [description]
2. Option B - [description]

## Chosen Approach
[Which and why]

## Trade-offs
[Limitations or compromises]
```

**Keep it lightweight** - brief explanations, not essays.

---

### Git Workflow

**Commit practices:**
- Commit frequently with clear messages
- Format: `type(scope): description`
  - Types: feat, fix, docs, refactor, test, chore
  - Example: `feat(auth): add user login validation`
- Reference issues: `fixes #123`

**Before committing:**
- Follow project conventions
- Verify tests pass
- Remove debug code

**Branch strategy:** See Project Details section below

---

### File Organization

**Standard locations:**
- Documentation: `/docs` or project root
- Configuration: Project root or `/config`
- Tests: Mirror source structure or `/tests`
- Handoffs: `/handoffs`
- Decisions: `/decisions/[role-name]`

**When creating files:**
- Check existing directory structure first
- Keep related files together
- Use consistent naming conventions
- If uncertain, ask the human

---

## Project Overview

[2-3 sentences describing what this project does and who it's for]

### Business Structure
- **Owner/Client**: [Name/Company]
- **Business Model**: [Description]
- **Target Users**: [Who will use this]

### Key Stakeholders
- **Project Lead**: [Name]
- **Technical Contact**: [Name]
- **Primary Users**: [List key user types]

---

## Project Scope

### Timeline
- **Start Date**: [Date]
- **Go-Live Target**: [Date]
- **Duration**: [X weeks/months]
- **Critical Notes**: [Any time-sensitive requirements]

### Scale Requirements
- [Key metrics, user volumes, performance requirements]

### Team Composition
- **Team Size**: [Number of developers]
- **Roles**: [List roles and names]

---

## User Roles

| Role | Description | Key Actions |
|------|-------------|-------------|
| **[Role 1]** | [Description] | [Key capabilities] |
| **[Role 2]** | [Description] | [Key capabilities] |

---

## Core Features

### 1. [Feature Name]
- [Key capability 1]
- [Key capability 2]
- [Key capability 3]

### 2. [Feature Name]
- [Key capability 1]
- [Key capability 2]

### 3. [Critical Algorithms/Business Logic]
- [Detailed description of any complex business rules]
- [Formulas, rotation logic, pricing rules, etc.]

---

## Technical Stack

### Backend
- **Primary Language**: [e.g., Python 3.11, Node.js 18]
- **Framework**: [e.g., Django, Express, Spring Boot]
- **Database**: [e.g., PostgreSQL, MongoDB]
- **Infrastructure**: [e.g., AWS Lambda, Kubernetes]
- **Key Services**: [List critical services/tools]

### Frontend/Mobile
- **Framework**: [e.g., React, React Native, Vue]
- **UI Library**: [e.g., Material UI, Tailwind]
- **State Management**: [e.g., Redux, Context API]
- **Key Libraries**: [List important dependencies]

### DevOps
- **CI/CD**: [e.g., GitHub Actions, Jenkins]
- **Monitoring**: [e.g., CloudWatch, DataDog]
- **Security**: [Key security measures]

---

## Development Workflow

### Branch Strategy
- Main branch: `main` or `master`
- Feature branches: `feature/TICKET-123-description`
- Hotfix branches: [naming convention]

### Pull Request Process
- [Requirements, reviewers, CI checks]

### Testing Requirements
- Unit tests: [Required? Coverage?]
- Integration tests: [When required?]
- E2E tests: [When required?]

---

## Project Conventions

### Code Style
- Linter: [Tool and config]
- Formatter: [e.g., Black, Prettier]
- Standards: [e.g., PEP 8, ESLint config]

### Naming Conventions
- Files: [e.g., kebab-case, snake_case]
- Classes: [e.g., PascalCase]
- Functions: [e.g., camelCase]
- Constants: [e.g., UPPER_SNAKE_CASE]

### Directory Structure
```
[Describe your project structure]
/src
  /components
  /services
/tests
/docs
```

---

## Repository Structure

```
project-name/
├── CLAUDE.md                    # This file - project context
├── STATUS.md                    # Project progress
├── README.md                    # Public documentation
│
├── requirements/                # Requirements docs
├── architecture/                # Architecture docs
├── design/                      # UI/UX designs
├── api-specs/                   # API specifications
├── test-plans/                  # Testing docs
│
├── decisions/                   # Decision records by role
│   ├── pm/
│   ├── ba/
│   ├── architect/
│   ├── engineering/
│   ├── qa/
│   └── devops/
│
├── roles/                       # Multi-agent role definitions
├── handoffs/                    # Handoff files
└── [source code directories]
```

---

## Out of Scope (Future Phases)

- ❌ [Feature 1]
- ❌ [Feature 2]
- ❌ [Feature 3]

---

## Standards Compliance

[If using organizational standards, list them here]

| Standard | Version | Status |
|----------|---------|--------|
| [Standard Name] | [Version] | ✅ Active |

---

## Communication Channels

### Slack Channels
- **#general**: General project discussion
- **#dev**: Development coordination
- **#alerts**: System notifications

### Email
- **Project**: [project-email]
- **Team**: [team-email]

### GitHub
- **Organization**: [GitHub org URL]
- **Repository**: [This repo URL]

---

## Quick Start for New Team Members

1. Read this file (CLAUDE.md)
2. Review STATUS.md for current progress
3. Check requirements/ for project requirements
4. Review decisions/ for key decisions
5. Activate your role from roles/ folder
6. Check handoffs/ for any pending work
7. Join communication channels

---

## Key Resources

- **Project Status**: STATUS.md
- **Requirements**: requirements/
- **Architecture**: architecture/
- **Decisions**: decisions/
- **API Specs**: api-specs/
- **Handoffs**: handoffs/

---

## Contact Information

**Project Email**: [email]
**Project Lead**: [name]
**Technical Contact**: [name]
**Organization**: [org]
**Department**: [dept]

---

*Created: [Date]*
*Last Updated: [Date]*
*Version: 1.0.0*
