# MountArc Website

**Status**: Planning  
**Version**: 0.1.0

---

## Overview

MountArc Website project repository.

[Add 2-3 paragraphs describing the MountArc Website, its purpose, and key objectives]

---

## Getting Started

### Prerequisites
- [Add required software/tools]
- [Add required dependencies]

### Installation
```bash
# Clone the repository
git clone [repo-url]

# Install dependencies
[installation commands]

# Run the project
[run commands]
```

---

## Project Documentation

### Core Documents
- **[CLAUDE.md](CLAUDE.md)** - Complete AI development context and workflows
- **[PROJECT-OVERVIEW.md](PROJECT-OVERVIEW.md)** - Quick reference project summary
- **[STATUS.md](STATUS.md)** - Current project status and progress
- **[PROJECT_FOLDER_STRUCTURE.md](PROJECT_FOLDER_STRUCTURE.md)** - Repository structure guide
- **[DOCUMENTATION-GUIDELINES.md](DOCUMENTATION-GUIDELINES.md)** - Documentation standards

### Project Resources
- **[requirements/](requirements/)** - Product requirements and user stories
- **[architecture/](architecture/)** - System architecture and design
- **[api-specs/](api-specs/)** - API specifications
- **[test-plans/](test-plans/)** - Test plans and test cases
- **[decisions/](decisions/)** - Architecture decision records (ADRs)

---

## Development Workflow

This project uses an **AI-assisted multi-agent development workflow** with specialized roles:

1. **PM Role** ([roles/PM.md](roles/PM.md)) - Requirements gathering and project management
2. **BA Role** ([roles/BA.md](roles/BA.md)) - Detailed specifications and business analysis
3. **Architect Role** ([roles/ARCHITECT.md](roles/ARCHITECT.md)) - System design and architecture
4. **Engineering Role** ([roles/ENGINEERING.md](roles/ENGINEERING.md)) - Implementation and coding
5. **QA Role** ([roles/QA.md](roles/QA.md)) - Testing and quality assurance
6. **DevOps Role** ([roles/DEVOPS.md](roles/DEVOPS.md)) - Deployment and infrastructure

### Role Activation
```
Human: "Activate PM role"
AI: [Reads roles/PM.md and operates as Product Manager]
```

### Handoff Protocol
Each role completes work, commits changes, and creates handoffs for the next role in `handoffs/` folder.

---

## Repository Structure

```
mountarc-website/
├── CLAUDE.md                      # AI development context
├── PROJECT-OVERVIEW.md            # Project summary
├── STATUS.md                      # Project status
├── README.md                      # This file
│
├── roles/                         # AI role definitions
├── templates/                     # Document templates
├── decisions/                     # Decision records by role
├── handoffs/                      # Role handoff documents
│
├── requirements/                  # Requirements docs
├── architecture/                  # Architecture docs
├── design/                        # UI/UX designs
├── api-specs/                     # API specifications
├── test-plans/                    # Test documentation
├── docs/                          # Additional docs
└── scripts/                       # Utility scripts
```

---

## Quick Start for Team Members

1. **Read Core Documents**
   - Start with [PROJECT-OVERVIEW.md](PROJECT-OVERVIEW.md)
   - Then read [CLAUDE.md](CLAUDE.md)
   - Check [STATUS.md](STATUS.md) for current progress

2. **Understand Your Role**
   - Review your role file in [roles/](roles/)
   - Understand handoff protocols

3. **Follow Workflow**
   - Activate your role when working
   - Save decisions in `decisions/[role-name]/`
   - Create handoffs when transitioning

4. **Use Templates**
   - All document templates in [templates/](templates/)
   - Use appropriate template for each document type

---

## Contributing

### Git Workflow
- Commit frequently with clear messages
- Use conventional commit format: `type(scope): description`
- Reference issues: `fixes #123`

### Before Committing
- Follow project conventions
- Verify tests pass (when applicable)
- Remove debug code

### Documentation
- Keep CLAUDE.md static (project context only)
- Update STATUS.md after each session
- Document decisions in `decisions/` folder
- Follow DOCUMENTATION-GUIDELINES.md

---

## Technology Stack

### Backend
[Add backend technologies]

### Frontend
[Add frontend technologies]

### Infrastructure
[Add infrastructure details]

---

## Team

**Project Lead**: [Name]  
**Technical Lead**: [Name]  
**Email**: [project-email]

---

## License

[Add license information]

---

## Contact

For questions or issues, please contact:
- **Email**: [project-email]
- **Slack**: #proj-mountarc-general

---

**Next Steps:**
1. Fill in PROJECT-OVERVIEW.md using PROJECT-OVERVIEW-QUESTIONNAIRE.md
2. Complete CLAUDE.md with project-specific details
3. Activate PM role to begin requirements gathering
4. Set up development environment
5. Define technical stack

---

*Created: [Date]*  
*Repository: MountArc Website*  
*AI Multi-Agent Workflow: v1.0*
