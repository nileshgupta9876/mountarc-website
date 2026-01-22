# MountArc Website Enhancement Project

**Project**: MountArc Website - Email & Contact System (Phase 1)
**Organization**: MountArc Private Limited
**Email**: contact@mountarc.com
**Department**: Engineering/Product
**Repository**: mountarc-website

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

MountArc Website is a premium web development company's online presence serving global clients. Phase 1 focuses on implementing a functional email and contact system to enable lead capture, discovery call bookings, and newsletter subscriptions. This project fixes critical broken functionality preventing client communication.

### Business Structure
- **Owner/Client**: MountArc Private Limited
- **Business Model**: Web development & AI solutions agency serving startups and small businesses
- **Target Users**: Potential clients (startup founders, business owners), blog readers, newsletter subscribers

### Key Stakeholders
- **Project Lead**: Nilesh Gupta (nileshgupta96g@gmail.com)
- **Technical Contact**: MountArc Development Team
- **Primary Users**: Website visitors, potential clients, community members

---

## Project Scope

### Timeline
- **Start Date**: January 22, 2026
- **Go-Live Target**: February 28, 2026
- **Duration**: ~5-6 weeks
- **Critical Notes**: Hard deadline - must deliver by Feb 28. Testing phase: 1 week (Feb 15-21)

### Scale Requirements
- Estimated 100-200 form submissions/month
- 3,000 emails/month capacity (Resend free tier)
- Page load time < 3 seconds (mobile)
- Support 1,000+ monthly visitors
- 99%+ uptime requirement

### Team Composition
- **Team Size**: AI Multi-Agent Workflow (PM, BA, Architect, Engineering, QA, DevOps roles)
- **Roles**: Product Manager, Developer(s), Tester
- **Client**: Nilesh Gupta (MountArc)

---

## User Roles

| Role | Description | Key Actions |
|------|-------------|-------------|
| **Startup Founder** | CEO/Founder seeking development partner | Submit contact form, book discovery call, subscribe to newsletter |
| **Small Business Owner** | Business owner digitalizing operations | Inquire about services, request consultation, explore pricing |
| **Blog Reader / Community Member** | Developer/entrepreneur following content | Subscribe to newsletter, read blog posts, stay updated |

---

## Core Features (Phase 1)

### 1. Email Infrastructure
- Resend integration for transactional emails
- 6 email types (team notifications + user confirmations)
- Professional branded email templates
- Dynamic recipient configuration (testing/production)
- Server-side implementation via Next.js API routes

### 2. Contact Form (/contact page)
- 3 required fields (name, email, message)
- 3 optional fields (phone, project type, budget)
- Real-time validation
- reCAPTCHA v3 spam protection
- Success page redirect
- Auto-reply to users

### 3. Discovery Call Booking (/book-call page)
- Dedicated page for consultation requests
- 6 fields (name, email, phone, date/time, description, budget)
- Email notifications to team
- Confirmation email to user
- Manual scheduling workflow

### 4. Newsletter Subscription (Footer)
- Email-only signup form
- Single opt-in workflow
- Welcome email automation
- Bi-weekly newsletter frequency
- Unsubscribe page (/unsubscribe)

### 5. Supporting Pages
- /thank-you - Success confirmation page
- /unsubscribe - Newsletter unsubscribe functionality

### Business Logic
- **Email Routing**: Environment-based recipient (testing: nileshgupta96g@gmail.com, production: contact@mountarc.com)
- **Rate Limiting**: 1 submission per email per 5 minutes to prevent spam
- **Validation Rules**: Min/max character limits, email format, phone format with country code
- **Spam Protection**: reCAPTCHA v3 with minimum score 0.5

---

## Technical Stack

### Backend
- **Primary Language**: JavaScript/TypeScript (Node.js)
- **Framework**: Next.js (Server-side rendering, API routes)
- **Database**: None (Phase 1 - stateless forms)
- **Infrastructure**: Vercel (serverless deployment)
- **Key Services**: Resend (email), Google reCAPTCHA v3 (spam protection)

### Frontend
- **Framework**: React 18+ with Next.js
- **UI Library**: Tailwind CSS (already in use)
- **Form Management**: React Hook Form + Zod validation
- **State Management**: React hooks (no Redux needed for Phase 1)
- **Key Libraries**: resend, react-hook-form, zod, react-google-recaptcha-v3

### DevOps
- **Hosting**: Vercel (automatic deployments)
- **CI/CD**: Vercel Git integration (automatic)
- **Monitoring**: Vercel Analytics, Resend Dashboard
- **Security**: HTTPS (Vercel), reCAPTCHA v3, input validation, rate limiting
- **Environment**: Environment variables for API keys and configuration

---

## Development Workflow

### Branch Strategy
- Main branch: `master`
- Feature branches: `feature/email-system`, `feature/contact-form`, etc.
- Direct commits to master for this project (small team)

### Pull Request Process
- For this project: Direct development with testing phase
- No formal PR process (single developer/small team)
- Testing handled by PM + Client before deployment

### Testing Requirements
- **Manual Testing**: 1 week testing phase (Feb 15-21)
- **Test Coverage**: All 3 forms, all 6 emails, mobile responsiveness
- **Performance Testing**: Lighthouse score 90+
- **No automated tests required** for Phase 1 (time constraint)

---

## Project Conventions

### Code Style
- **Linter**: ESLint (Next.js default)
- **Formatter**: Prettier (recommended)
- **Standards**: React/Next.js best practices, Airbnb JavaScript style guide (adapted)

### Naming Conventions
- **Files**: kebab-case (contact-form.jsx, send-email.js)
- **Components**: PascalCase (ContactForm, NewsletterSignup)
- **Functions**: camelCase (sendEmail, validateForm)
- **Constants**: UPPER_SNAKE_CASE (RECIPIENT_EMAIL, API_ENDPOINTS)

### Directory Structure
```
mountarc-website/
├── pages/ (or app/)           # Next.js pages/routes
│   ├── contact.jsx            # Contact form page
│   ├── book-call.jsx          # Discovery call page
│   ├── thank-you.jsx          # Success page
│   ├── unsubscribe.jsx        # Unsubscribe page
│   └── api/
│       └── send-email.js      # API route for emails
├── components/
│   ├── forms/
│   │   ├── ContactForm.jsx
│   │   ├── DiscoveryCallForm.jsx
│   │   └── NewsletterForm.jsx
│   └── layout/
│       └── Footer.jsx         # Updated with newsletter
├── lib/
│   ├── resend.js              # Resend configuration
│   └── validation.js          # Form validation schemas
├── styles/                     # Tailwind CSS
├── public/                     # Static assets
└── [Documentation files]
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

### Content Enhancements (To be addressed iteratively during/after Phase 1)
- ❌ Portfolio/Work showcase with case studies
- ❌ Client testimonials section
- ❌ Client logos display
- ❌ About page enhancements (team photos, bios, company story)
- ❌ Blog content strategy and CMS integration
- ❌ Service detail pages
- ❌ Pricing/engagement model pages
- ❌ Resources section (guides, whitepapers, tools)
- ❌ FAQ section

### Advanced Features (Future consideration)
- ❌ Live chat integration
- ❌ Calendar booking integration (Calendly/Cal.com)
- ❌ CRM integration (HubSpot, Salesforce)
- ❌ Email marketing platform integration (Mailchimp, ConvertKit)
- ❌ Database for form submission storage
- ❌ Admin dashboard for managing submissions
- ❌ Multi-language support
- ❌ Advanced analytics and A/B testing
- ❌ File upload capability on forms
- ❌ Multi-step forms

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

**Project Email**: contact@mountarc.com
**Project Lead**: Nilesh Gupta
**Technical Contact**: nileshgupta96g@gmail.com (testing phase)
**Organization**: MountArc Private Limited
**Department**: Engineering/Product
**Website**: https://mountarc-website-final.vercel.app

---

*Created: January 22, 2026*
*Last Updated: January 22, 2026*
*Version: 1.0.0*
