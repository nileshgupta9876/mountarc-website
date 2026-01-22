# MountArc Website Rebuild - Project Overview

**Type**: Rebuild (Email & Contact System)
**Status**: Requirements Complete - Ready for Development
**Started**: January 22, 2026
**Deadline**: February 28, 2026
**Organization**: MountArc Private Limited
**Repository**: mountarc-website
**Website**: https://mountarc-website-final.vercel.app

---

## Project Summary

MountArc's existing website has a non-functional email and contact system, preventing potential clients from reaching the team. Phase 1 **rebuilds** the entire email and contact infrastructure from scratch with modern tools, implementing a complete email system with contact forms, discovery call booking, and newsletter subscription functionality using Resend email service and Next.js.

### Vision

Enable seamless client communication through reliable, secure, and spam-protected contact forms while building an email list for marketing. Deliver a professional user experience that converts visitors into leads.

### Key Features (Phase 1)

- **Email Infrastructure**: Resend-powered transactional email system with 6 email types
- **Contact Form**: Full-featured contact page (/contact) with validation and spam protection
- **Discovery Call Booking**: Dedicated booking page (/book-call) for consultation requests
- **Newsletter Subscription**: Footer-based signup with welcome automation
- **Supporting Pages**: Thank you (/thank-you) and unsubscribe (/unsubscribe) pages

---

## Team Structure

### Leadership

| Role | Name | Responsibilities |
|------|------|------------------|
| **Project Lead** | Nilesh Gupta | Project oversight, testing, client approval |
| **Technical Contact** | nileshgupta96g@gmail.com | Testing phase coordination |
| **Development Team** | AI Multi-Agent Workflow | PM, BA, Architect, Engineering, QA, DevOps roles |

### Communication

- **Email**: contact@mountarc.com
- **Testing Email**: nileshgupta96g@gmail.com
- **Website**: https://mountarc-website-final.vercel.app
- **LinkedIn**: linkedin.com/company/mountarc

### Communication Channels

**Status**: Not yet configured

For this project, communication happens via:
- Email (primary)
- Direct client communication with Project Lead

**Slack Channels**: N/A - Not using Slack for this project
**Other Tools**: N/A - Email and GitHub are primary channels

---

## Project Approach

### Is This a Rebuild?

**Yes** - This is a rebuild of the existing MountArc website email and contact system.

**Context:**
- The existing website has a non-functional email system
- Forms exist but don't send emails
- This project rebuilds the entire email infrastructure from scratch
- Using modern tools (Resend, reCAPTCHA v3, React Hook Form)
- Complete replacement of broken functionality

**Rebuild Approach:**
- Replace existing broken contact forms with new implementation
- Implement new email infrastructure (Resend)
- Add new pages (/book-call, /thank-you, /unsubscribe)
- Maintain existing design aesthetic and branding
- No database migration (stateless forms)
- Direct replacement in production

### Development Methodology

AI Multi-Agent Workflow with specialized roles:
- **PM**: Requirements, prioritization, scope management
- **BA**: User stories, acceptance criteria, detailed specifications
- **Architect**: Technical design, system architecture
- **Engineering**: Implementation, code quality
- **QA**: Testing strategy, manual testing execution
- **DevOps**: Deployment, environment configuration

### Key Stages

**Stage 1: Requirements & Planning** (Jan 22-26)
- **Focus**: Gather requirements, document decisions, create PRD
- **Deliverables**: PRD, decisions, CLAUDE.md, STATUS.md, PROJECT-OVERVIEW.md
- **Status**: ✅ Complete

**Stage 2: Design & Architecture** (Jan 24-27)
- **Focus**: Email templates, page designs, technical architecture
- **Deliverables**: Mockups, architecture doc, user stories
- **Status**: 🔄 Starting

**Stage 3: Development** (Jan 27 - Feb 14)
- **Focus**: Build forms, email system, pages, integrations
- **Deliverables**: Working contact forms, email automation, responsive pages
- **Status**: ⏳ Pending

**Stage 4: Testing & Refinement** (Feb 15-26)
- **Focus**: Manual testing, bug fixes, performance optimization
- **Deliverables**: Tested system, bug-free deployment
- **Status**: ⏳ Pending

**Stage 5: Deployment** (Feb 28)
- **Focus**: Production deployment, go-live
- **Deliverables**: Live website with functional email/contact system
- **Status**: ⏳ Pending

---

## Technology Stack

### Backend
- **Runtime**: Node.js (Next.js server-side)
- **Framework**: Next.js (API routes for email sending)
- **Email Service**: Resend (free tier - 3,000 emails/month)
- **Hosting**: Vercel (serverless, automatic deployments)
- **No Database**: Stateless forms (Phase 1)

### Frontend
- **Framework**: React 18+ with Next.js
- **Styling**: Tailwind CSS (existing setup)
- **Form Management**: React Hook Form + Zod validation
- **Spam Protection**: Google reCAPTCHA v3 (invisible)
- **Key Libraries**: resend, react-hook-form, zod, react-google-recaptcha-v3

### Infrastructure
- **Hosting**: Vercel
- **CI/CD**: Vercel Git integration (automatic)
- **Monitoring**: Vercel Analytics, Resend Dashboard
- **Security**: HTTPS, reCAPTCHA v3, input validation, rate limiting

---

## Repository Structure

### Current Repository

This repository contains the complete MountArc Website project including:

**Documentation & Planning:**
- `/requirements/PRD.md` - Complete Phase 1 requirements
- `/decisions/pm/` - PM decision records
- `CLAUDE.md` - Project context and protocols
- `STATUS.md` - Current project status
- `PROJECT-OVERVIEW.md` - This file

**Role Definitions:**
- `/roles/` - Multi-agent role definitions (PM, BA, Architect, Engineering, QA, DevOps)

**Templates:**
- `/templates/` - Reusable document templates

**Source Code** (to be developed):
- Pages: `/contact`, `/book-call`, `/thank-you`, `/unsubscribe`
- API routes: `/api/send-email`
- Components: Contact form, discovery call form, newsletter form
- Email templates: 6 branded email types

### Related Repositories

**Status**: Single Repository Approach

This project uses a **single repository** containing:
- ✅ All documentation and specifications
- ✅ All source code (frontend + backend)
- ✅ Infrastructure configuration
- ✅ Full-stack Next.js application

**No Related Repositories**: This is a monorepo containing everything needed for the MountArc website.

### Future Repositories

**Planned**: None

**Rationale**:
- Single Next.js application handles both frontend and backend
- No microservices needed for Phase 1
- Vercel deployment supports full-stack in one repo
- Simpler maintenance and deployment

**If Future Phases Require Separation:**
- Could extract email service to separate microservice
- Could create separate CMS repository
- Could create separate admin dashboard repo
- Decision deferred until Phase 2+ requirements are clear

---

## Key Decisions

### Important Decisions Made

**1. Email Service Provider: Resend**
- **Date**: Jan 22, 2026
- **Rationale**: Security (server-side), reliability, free tier (3,000 emails/month), dynamic configuration
- **Rejected**: EmailJS (client-side security issues), AWS SES (too complex), SendGrid (requires credit card)
- **Document**: `/decisions/pm/20260122_email-service-provider.md`

**2. Phase 1 Scope: Email & Contact Only**
- **Date**: Jan 22, 2026
- **Rationale**: Fix critical broken functionality first, clear requirements, faster delivery
- **Deferred**: Portfolio, testimonials, about page, blog content (future phases)
- **Document**: `/decisions/pm/20260122_phase1-scope-definition.md`

**3. Form Validation Approach: Server-Side with Client Feedback**
- **Rationale**: Security, professional deliverability, real-time UX
- **Implementation**: React Hook Form + Zod + reCAPTCHA v3 + rate limiting

**4. Testing Strategy: Manual Testing (1 Week)**
- **Testers**: PM + Client
- **Duration**: Feb 15-21, 2026
- **Scope**: All forms, all emails, mobile responsiveness, performance

### Open Questions

None currently - all Phase 1 requirements clarified.

---

## Standards Compliance

| Standard | Version | Status |
|----------|---------|--------|
| **WCAG 2.1 Level A** | 2.1 | ✅ Required - Basic accessibility |
| **Modern Browser Support** | Last 2 versions | ✅ Required - Chrome, Firefox, Safari, Edge |
| **Performance** | Lighthouse 90+ | ✅ Required - Page load < 3s mobile |
| **Security** | HTTPS + reCAPTCHA | ✅ Required - Input validation, rate limiting |

---

## Success Metrics

### Technical Metrics
- **Page Load Time**: < 3 seconds (mobile), < 2 seconds (desktop)
- **Lighthouse Score**: 90+ (Performance, Best Practices, SEO)
- **Form Submission Success Rate**: 99%+
- **Email Delivery Rate**: 99%+ (Resend dashboard)
- **Zero Critical Bugs**: At launch

### Business Metrics
- **Lead Capture**: Enable 100% of form submissions to reach team
- **Spam Rate**: < 5% of submissions
- **User Experience**: Clear error messages, instant confirmations
- **Mobile Completion**: 80%+ of forms completed on mobile

### Quality Metrics
- **Documentation**: 100% complete (PRD, decisions, technical docs)
- **Testing Coverage**: 100% manual testing (all forms, emails, pages, devices)
- **Client Approval**: Required before deployment

---

## Next Steps

### Immediate (This Week - Jan 22-26)
1. ✅ Complete requirements documentation
2. Hand off to BA for detailed user stories
3. Hand off to Architect for technical design
4. Create email template designs
5. Design page layouts
6. Set up Resend account

### Short-term (Weeks 2-3 - Jan 27 - Feb 14)
1. Development kickoff
2. Implement all 3 forms
3. Build email system (6 email types)
4. Create supporting pages
5. Integration complete

### Medium-term (Week 4 - Feb 15-21)
1. Testing phase (PM + Client)
2. Bug fixes and refinements
3. Performance optimization
4. Final QA

### Launch (Week 5 - Feb 22-28)
1. Final testing
2. Client approval
3. Production deployment
4. Go live (Feb 28, 2026)

---

## Out of Scope (Future Phases)

**Phase 1 focuses exclusively on email & contact functionality. The following are deferred:**

### Content Enhancements
- ❌ Portfolio/work showcase with case studies
- ❌ Client testimonials and logos
- ❌ About page enhancements (team, story, mission)
- ❌ Blog content strategy and CMS integration
- ❌ Service detail pages
- ❌ Pricing/engagement model pages
- ❌ Resources section (guides, whitepapers)
- ❌ FAQ section

### Advanced Features
- ❌ Live chat integration
- ❌ Calendar booking integration (Calendly/Cal.com)
- ❌ CRM integration (HubSpot, Salesforce)
- ❌ Email marketing platform integration
- ❌ Database for form storage
- ❌ Admin dashboard
- ❌ Multi-language support
- ❌ File upload on forms

**Approach**: Content items will be addressed iteratively during development with client feedback.

---

## Contact Information

**Project Email**: contact@mountarc.com
**Project Lead**: Nilesh Gupta
**Testing Contact**: nileshgupta96g@gmail.com
**Organization**: MountArc Private Limited
**Website**: https://mountarc-website-final.vercel.app
**LinkedIn**: linkedin.com/company/mountarc

---

## Key Resources

- **Project Status**: [STATUS.md](STATUS.md) - Updated regularly
- **Requirements**: [requirements/PRD.md](requirements/PRD.md) - Complete Phase 1 spec
- **Architecture**: `architecture/` - Technical design (pending)
- **Decisions**: [decisions/pm/](decisions/pm/) - PM decision records
- **Roles**: [roles/](roles/) - Multi-agent role definitions
- **Handoffs**: `handoffs/` - Inter-role handoff documents

---

**Last Updated**: January 22, 2026
**Document Version**: 1.0
**Maintained by**: Product Manager

---

## Quick Start for New Team Members

1. **Read this file** (PROJECT-OVERVIEW.md) - Get high-level context
2. **Review** [STATUS.md](STATUS.md) - Understand current progress
3. **Read** [requirements/PRD.md](requirements/PRD.md) - Detailed requirements
4. **Check** [decisions/pm/](decisions/pm/) - Key decisions made
5. **Activate your role** from [roles/](roles/) folder
6. **Check** [CLAUDE.md](CLAUDE.md) - Working protocols
7. **Review handoffs** in `handoffs/` for pending work

---

*Phase 1: Email & Contact System - Delivering reliable client communication by February 28, 2026*
