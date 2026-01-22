# Project Repository Structure

**When to create:** After client onboarding, when you're ready to start development

---

## 📁 Complete Folder Structure

```
project-name/
│
├── CLAUDE.md                              # AI development context (filled from CLAUDE_TEMPLATE.md)
├── PROJECT-OVERVIEW.md                    # Quick reference - project summary (PROJECT-SPECIFIC)
├── STATUS.md                              # Current project status and progress
├── README.md                              # Public project documentation
├── .gitignore                             # Git ignore rules
├── DOCUMENTATION-GUIDELINES.md            # Documentation standards (GENERIC - reference)
├── PROJECT_FOLDER_STRUCTURE.md            # This structure guide (GENERIC - reference)
│
├── roles/                                 # AI role definitions (GENERIC - copy as-is)
│   ├── PM.md                             # Product Manager role
│   ├── BA.md                             # Business Analyst role
│   ├── ARCHITECT.md                      # Software Architect role
│   ├── ENGINEERING.md                    # Software Engineer role
│   ├── QA.md                             # Quality Assurance role
│   └── DEVOPS.md                         # DevOps Engineer role
│
├── templates/                             # Document templates (GENERIC - copy as-is)
│   ├── feature-specification-template.md  # Feature spec template (220 lines)
│   ├── business-rules-template.md         # Business rules template (223 lines)
│   ├── test-plan-template.md              # Test plan template (452 lines)
│   ├── test-case-template.md              # Test case template (377 lines)
│   ├── bug-report-template.md             # Bug report template (360 lines)
│   ├── release-sign-off-template.md       # Release sign-off template (405 lines)
│   └── qa-best-practices.md               # QA best practices guide (456 lines)
│
├── decisions/                             # Architecture Decision Records (PROJECT-SPECIFIC)
│   ├── pm/                               # PM decisions
│   ├── ba/                               # BA decisions
│   ├── architect/                        # Architect decisions (ADRs)
│   ├── engineering/                      # Engineering decisions
│   ├── qa/                               # QA decisions
│   └── devops/                           # DevOps decisions
│
├── handoffs/                              # Role handoff files (PROJECT-SPECIFIC)
│   └── .gitkeep                          # Keep folder in git
│
├── requirements/                          # Requirements documentation (PROJECT-SPECIFIC)
│   ├── PRD.md                            # Product Requirements Document
│   ├── user-stories.md                   # User stories
│   └── use-cases.md                      # Detailed use cases
│
├── architecture/                          # Architecture documentation (PROJECT-SPECIFIC)
│   ├── system-overview.md                # High-level architecture
│   ├── data-model.md                     # Database schema and models
│   ├── api-design.md                     # API architecture
│   └── security-architecture.md          # Security design
│
├── design/                                # UI/UX designs (PROJECT-SPECIFIC)
│   ├── wireframes/                       # Wireframes and mockups
│   ├── style-guide.md                    # Design system/style guide
│   └── user-flows/                       # User flow diagrams
│
├── api-specs/                             # API specifications (PROJECT-SPECIFIC)
│   ├── openapi.yaml                      # OpenAPI 3.0 specification
│   └── postman/                          # Postman collections
│
├── test-plans/                            # Testing documentation (PROJECT-SPECIFIC)
│   ├── test-strategy.md                  # Overall test strategy
│   ├── test-cases/                       # Detailed test cases
│   └── test-reports/                     # Test execution reports
│
├── docs/                                  # Additional documentation (PROJECT-SPECIFIC)
│   ├── setup.md                          # Development setup guide
│   ├── deployment.md                     # Deployment instructions
│   └── troubleshooting.md                # Common issues and solutions
│
├── scripts/                               # Utility scripts (PROJECT-SPECIFIC)
│   ├── setup.sh                          # Project setup script
│   └── deploy.sh                         # Deployment script
│
└── [source-code-folders]                  # Project-specific code structure
    ├── src/                              # Source code
    ├── tests/                            # Test files
    ├── config/                           # Configuration files
    └── ...                               # Other project-specific folders
```

---

## 📂 File Categories

### GENERIC Files (Identical in all repos)
These files are copied as-is from your master templates. They remain the same across all client projects.

**Root Level:**
- `DOCUMENTATION-GUIDELINES.md` - Documentation standards
- `PROJECT_FOLDER_STRUCTURE.md` - This structure guide

**roles/** folder (6 files):
- `PM.md` (35 lines)
- `BA.md` (270 lines)
- `ARCHITECT.md` (35 lines)
- `ENGINEERING.md` (151 lines)
- `QA.md` (433 lines)
- `DEVOPS.md` (36 lines)

**templates/** folder (7 files):
- `feature-specification-template.md` (220 lines)
- `business-rules-template.md` (223 lines)
- `test-plan-template.md` (452 lines)
- `test-case-template.md` (377 lines)
- `bug-report-template.md` (360 lines)
- `release-sign-off-template.md` (405 lines)
- `qa-best-practices.md` (456 lines)

### PROJECT-SPECIFIC Files
These files are created fresh or filled in for each client project.

**Root Level:**
- `CLAUDE.md` - Filled from CLAUDE_TEMPLATE.md with client details (complete AI context)
- `PROJECT-OVERVIEW.md` - Quick reference summary (one-page project overview)
- `STATUS.md` - Project progress tracking
- `README.md` - Public project documentation
- `.gitignore` - Tech-stack specific git ignore rules

**Content Folders:**
- `decisions/` - All decision records by role
- `handoffs/` - Role transition documents
- `requirements/` - Requirements and user stories
- `architecture/` - Architecture documentation
- `design/` - UI/UX designs
- `api-specs/` - API specifications
- `test-plans/` - Test plans and test cases
- `docs/` - Additional documentation
- `scripts/` - Utility and deployment scripts
- `[source-code]/` - Actual project source code

---

## 📋 Setup Checklist

### Phase 1: Repository Creation

- [ ] Create new repository in GitHub/GitLab
- [ ] Clone repository locally
- [ ] Create all folders from structure above

### Phase 2: Copy Generic Files

**Root Level:**
- [ ] Copy `DOCUMENTATION-GUIDELINES.md`
- [ ] Copy `PROJECT_FOLDER_STRUCTURE.md`
- [ ] Copy `CLAUDE_TEMPLATE.md` → `CLAUDE.md` (will fill in Phase 3)

**roles/ folder:**
- [ ] Copy `PM.md`
- [ ] Copy `BA.md`
- [ ] Copy `ARCHITECT.md`
- [ ] Copy `ENGINEERING.md`
- [ ] Copy `QA.md`
- [ ] Copy `DEVOPS.md`

**templates/ folder:**
- [ ] Copy `feature-specification-template.md`
- [ ] Copy `business-rules-template.md`
- [ ] Copy `test-plan-template.md`
- [ ] Copy `test-case-template.md`
- [ ] Copy `bug-report-template.md`
- [ ] Copy `release-sign-off-template.md`
- [ ] Copy `qa-best-practices.md`

### Phase 3: Fill Project-Specific Content

- [ ] Complete `CLAUDE.md` with client/project details
- [ ] Create `PROJECT-OVERVIEW.md` with project summary
- [ ] Create `STATUS.md` with initial status
- [ ] Create `README.md` with project overview
- [ ] Add `.gitignore` for your tech stack

### Phase 4: Create Empty Folders

- [ ] Create all `decisions/[role-name]/` folders with `.gitkeep`
- [ ] Create `handoffs/` folder with `.gitkeep`
- [ ] Create `requirements/` folder
- [ ] Create `architecture/` folder
- [ ] Create `design/wireframes/` and `design/user-flows/` folders
- [ ] Create `api-specs/postman/` folder
- [ ] Create `test-plans/test-cases/` and `test-plans/test-reports/` folders
- [ ] Create `docs/` folder
- [ ] Create `scripts/` folder

### Phase 5: Initial Commit

- [ ] Add all files to git: `git add .`
- [ ] Commit with message: `git commit -m "chore: initial project setup"`
- [ ] Push to remote repository: `git push origin main`

### Phase 6: Start Development

- [ ] Activate PM role and begin requirements gathering
- [ ] Follow workflow: PM → BA → Architect → Engineering → QA → DevOps

---

## 📝 Initial Files to Create

### 1. CLAUDE.md
**Source:** Fill `CLAUDE_TEMPLATE.md` with client-specific details
**Status:** Must complete before starting development

**What to fill in:**
- Project name and description
- Client/organization information
- Team members and contacts
- Technical stack details
- Project scope and timeline
- User roles and features
- Repository structure
- Development workflow
- Communication channels

### 2. PROJECT-OVERVIEW.md
**Purpose:** Quick reference summary - one-page project overview
**Status:** Create fresh for each project

**Template:**
```markdown
# [Project Name] - Project Overview

**Status**: [Active/Planning/On Hold/Completed]
**Started**: [Date]
**Organization**: [Organization Name]
**Repository**: [GitHub URL]

---

## Project Summary

[2-3 sentences describing what this project does and its purpose]

### Vision
[What are you building and why? What problems does it solve?]

### Key Features
- **Feature 1**: [Description]
- **Feature 2**: [Description]
- **Feature 3**: [Description]

---

## Team Structure

### Leadership
| Role | Name | Responsibilities |
|------|------|------------------|
| **Project Lead** | [Name] | [Responsibilities] |
| **Technical Lead** | [Name] | [Responsibilities] |
| **Product Owner** | [Name] | [Responsibilities] |

### Communication
- **Email**: [project-email]
- **Slack Channels**:
  - #proj-[name]-general
  - #proj-[name]-dev

---

## Project Approach

### Development Methodology
[Describe your development approach - Agile, AI multi-agent workflow, etc.]

### Key Stages
[List major development stages or phases]

---

## Technology Stack

### Backend
- [Key technologies]

### Frontend/Mobile
- [Key technologies]

### Infrastructure
- [Key technologies]

---

## Repository Structure

### Current Repository
[Description of this repository]

### Related Repositories
- [Links to other repos]

---

## Key Decisions & Open Questions

### Important Decisions
[Link to decisions/ folder or list key decisions]

### Open Questions
[List any pending decisions or questions]

---

## Standards Compliance

| Standard | Version | Status |
|----------|---------|--------|
| [Standard Name] | [Version] | âœ… Active |

---

## Success Metrics

### Technical Metrics
- [Metric 1]
- [Metric 2]

### Business Metrics
- [Metric 1]
- [Metric 2]

---

## Next Steps

### Immediate
1. [Task 1]
2. [Task 2]

### Short-term
1. [Task 1]
2. [Task 2]

---

**Last Updated**: [Date]
**Document Version**: 1.0
**Maintained by**: [Team Name]
```

### 3. STATUS.md
**Template:**
```markdown
# Project Status

**Last Updated:** [Date]
**Current Phase:** [Planning/Development/Testing/Deployment]
**Overall Progress:** [X%]

## Current Sprint

**Sprint:** [Number]
**Duration:** [Start Date] - [End Date]
**Goal:** [Sprint goal]

## Completed
- [ ] Task 1
- [ ] Task 2

## In Progress
- [ ] Task 3
- [ ] Task 4

## Blocked
- [ ] Task 5 (waiting for: [reason])

## Next Up
- [ ] Task 6
- [ ] Task 7

## Metrics
- **Velocity:** [story points]
- **Test Coverage:** [%]
- **Open Bugs:** [count]

## Notes
[Any important notes or updates]
```

### 4. README.md
**Template:**
```markdown
# [Project Name]

[Brief project description]

## Overview

[2-3 paragraphs about the project]

## Getting Started

### Prerequisites
- [Requirement 1]
- [Requirement 2]

### Installation
```bash
# Clone the repository
git clone [repo-url]

# Install dependencies
[installation commands]

# Run the project
[run commands]
```

## Documentation

- **Project Context:** [CLAUDE.md](CLAUDE.md)
- **Project Status:** [STATUS.md](STATUS.md)
- **Requirements:** [requirements/](requirements/)
- **Architecture:** [architecture/](architecture/)
- **API Specs:** [api-specs/](api-specs/)
- **Test Plans:** [test-plans/](test-plans/)

## Workflow

This project uses an AI-assisted multi-agent development workflow:

1. **PM Role** - Requirements gathering
2. **BA Role** - Detailed specifications
3. **Architect Role** - System design
4. **Engineering Role** - Implementation
5. **QA Role** - Testing and validation
6. **DevOps Role** - Deployment

See [roles/](roles/) for role definitions.

## Contributing

[How team members can contribute]

## License

[License information]

## Contact

**Project Lead:** [Name]
**Email:** [Email]
```

### 5. .gitignore
**Template:** Use appropriate template for your tech stack from https://github.com/github/gitignore

Add these custom entries:
```
# Project-specific
*.log
.env
.env.local

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Build artifacts
dist/
build/
*.egg-info/
node_modules/

# Handoffs (if you want to keep them local only)
# handoffs/
```

---

## 🚀 Automation Script

### create-project-structure.sh

Save this script to automate repository setup:

```bash
#!/bin/bash

# Create new project structure
# Usage: ./create-project-structure.sh project-name

PROJECT_NAME=$1

if [ -z "$PROJECT_NAME" ]; then
    echo "Usage: ./create-project-structure.sh project-name"
    exit 1
fi

echo "Creating project structure for: $PROJECT_NAME"

# Create root directory
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# Create folder structure
mkdir -p roles
mkdir -p templates
mkdir -p decisions/{pm,ba,architect,engineering,qa,devops}
mkdir -p handoffs
mkdir -p requirements
mkdir -p architecture
mkdir -p design/{wireframes,user-flows}
mkdir -p api-specs/postman
mkdir -p test-plans/{test-cases,test-reports}
mkdir -p docs
mkdir -p scripts

# Create .gitkeep files for empty folders
touch handoffs/.gitkeep
touch decisions/pm/.gitkeep
touch decisions/ba/.gitkeep
touch decisions/architect/.gitkeep
touch decisions/engineering/.gitkeep
touch decisions/qa/.gitkeep
touch decisions/devops/.gitkeep

# Create placeholder files
touch CLAUDE.md
touch STATUS.md
touch README.md
touch .gitignore

echo "✅ Project structure created successfully!"
echo ""
echo "Next steps:"
echo "1. Copy DOCUMENTATION-GUIDELINES.md to root"
echo "2. Copy PROJECT_FOLDER_STRUCTURE.md to root"
echo "3. Copy all role files to roles/ folder"
echo "4. Copy all template files to templates/ folder"
echo "5. Fill CLAUDE.md with project details"
echo "6. Create PROJECT-OVERVIEW.md with project summary"
echo "7. Create initial STATUS.md"
echo "8. Create README.md"
echo "9. Add .gitignore for your tech stack"
echo "10. Initialize git: git init"
echo "11. First commit: git add . && git commit -m 'chore: initial project setup'"
```

**To use:**
```bash
chmod +x create-project-structure.sh
./create-project-structure.sh client-project-name
```

---

## 📂 Folder Purposes

| Folder | Purpose | Who Uses | Type |
|--------|---------|----------|------|
| `roles/` | Generic AI role definitions | All team members, AI | GENERIC |
| `templates/` | Document templates for deliverables | All roles | GENERIC |
| `decisions/` | Record all decisions by role | All roles | PROJECT-SPECIFIC |
| `handoffs/` | Role transition documents | All roles | PROJECT-SPECIFIC |
| `requirements/` | Product requirements, user stories | PM, BA | PROJECT-SPECIFIC |
| `architecture/` | System design, data models | Architect, BA | PROJECT-SPECIFIC |
| `design/` | UI/UX designs, wireframes | PM, Designer | PROJECT-SPECIFIC |
| `api-specs/` | API documentation | Architect, Engineering | PROJECT-SPECIFIC |
| `test-plans/` | Test strategy, test cases | QA | PROJECT-SPECIFIC |
| `docs/` | General documentation | All team members | PROJECT-SPECIFIC |
| `scripts/` | Utility and automation scripts | DevOps, Engineering | PROJECT-SPECIFIC |

---

## 🔄 Workflow After Setup

1. **Activate PM role** → Create PRD in `requirements/`
2. **Activate BA role** → Create detailed specs in `requirements/` and `architecture/` using templates from `templates/`
3. **Activate Architect role** → Create architecture docs in `architecture/`, save decisions in `decisions/architect/`
4. **Activate Engineering role** → Implement features, save decisions in `decisions/engineering/`
5. **Activate QA role** → Create test plans in `test-plans/` using templates, execute tests
6. **Activate DevOps role** → Setup CI/CD, create deployment docs in `docs/`

**Throughout:** 
- Save all decisions in appropriate `decisions/[role]/` folders
- Use templates from `templates/` folder for consistent documentation
- Follow `DOCUMENTATION-GUIDELINES.md` standards
- Update `STATUS.md` after each session

---

## 🎯 Template Usage Guide

When creating documents, always use the appropriate template:

| Document Type | Template to Use | Created By | Location |
|---------------|----------------|------------|----------|
| Feature Specification | `templates/feature-specification-template.md` | BA | `requirements/features/` |
| Business Rules | `templates/business-rules-template.md` | BA | `requirements/business-rules.md` |
| Test Plan | `templates/test-plan-template.md` | QA | `test-plans/` |
| Test Case | `templates/test-case-template.md` | QA | `test-plans/test-cases/` |
| Bug Report | `templates/bug-report-template.md` | QA | GitHub Issues or `bugs/` |
| Release Sign-off | `templates/release-sign-off-template.md` | QA + PM | `releases/` |

**QA Best Practices:** Reference `templates/qa-best-practices.md` when:
- Planning test strategies
- Designing test cases
- Deciding what to automate
- Reporting bugs effectively
- Conducting exploratory testing

---

## ✅ Verification Checklist

After setup, verify:

**Generic Files Copied:**
- [ ] `DOCUMENTATION-GUIDELINES.md` exists in root
- [ ] `PROJECT_FOLDER_STRUCTURE.md` exists in root
- [ ] All 6 role files are in `roles/` folder
- [ ] All 7 template files are in `templates/` folder

**Project-Specific Files Created:**
- [ ] `CLAUDE.md` is complete and accurate
- [ ] `PROJECT-OVERVIEW.md` has project summary
- [ ] `STATUS.md` has initial status
- [ ] `README.md` has project overview
- [ ] `.gitignore` is appropriate for tech stack

**Folder Structure:**
- [ ] All `decisions/` subfolders exist with `.gitkeep`
- [ ] `handoffs/` folder exists with `.gitkeep`
- [ ] All other project folders exist

**Git:**
- [ ] Git repository is initialized
- [ ] All files are committed
- [ ] Initial commit is pushed to remote

---

## 📊 File Count Summary

**Total Generic Files to Copy: 15**
- Root level: 2 (DOCUMENTATION-GUIDELINES.md, PROJECT_FOLDER_STRUCTURE.md)
- roles/: 6 files
- templates/: 7 files

**Total Project-Specific Files to Create: 4+**
- CLAUDE.md (filled from template)
- PROJECT-OVERVIEW.md (quick reference summary)
- STATUS.md
- README.md
- .gitignore
- (Plus content files as development progresses)

**Total Folders to Create: 19+**
- roles/ (1)
- templates/ (1)
- decisions/ + 6 subfolders (7)
- handoffs/ (1)
- requirements/ (1)
- architecture/ (1)
- design/ + 2 subfolders (3)
- api-specs/ + 1 subfolder (2)
- test-plans/ + 2 subfolders (3)
- docs/ (1)
- scripts/ (1)

---

## 🚨 Important Notes

### Documentation Standards
Always follow `DOCUMENTATION-GUIDELINES.md`:
- **CLAUDE.md** should remain static (project context only) - Full detailed context for AI
- **PROJECT-OVERVIEW.md** is a quick reference - One-page summary for humans
- **NO session history** in CLAUDE.md
- **Progress tracking** goes in STATUS.md
- **Decisions** go in decisions/ folders
- **Implementation details** go in appropriate folders

### CLAUDE.md vs PROJECT-OVERVIEW.md
- **CLAUDE.md**: Complete AI development context with protocols, role system, workflows, technical details
- **PROJECT-OVERVIEW.md**: Quick reference summary - team, approach, tech stack, metrics, next steps

### Template Usage
- Templates in `templates/` folder are **read-only references**
- Create actual documents in appropriate project folders
- Keep templates generic - never modify for specific projects

### Git Best Practices
- Commit frequently with conventional commit messages
- Reference story IDs in commits
- Use `.gitkeep` to preserve empty folders in git
- Consider if you want `handoffs/` in git or local only

---

**You're now ready to create client repositories and start development!**

---

**Document Version:** 2.0  
**Last Updated:** 2026-01-21  
**Changes:** Added templates/ folder, DOCUMENTATION-GUIDELINES.md reference, complete file inventory
