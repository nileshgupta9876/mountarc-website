# Handoff: PM → Architect

**Date**: 2026-01-22 15:38
**From**: Product Manager
**To**: Software Architect
**Project**: MountArc Website - Email & Contact System (Phase 1)

---

## Work Completed

### ✅ Requirements Documentation
- **PRD Created**: Complete Product Requirements Document with technical specifications
- **File**: `requirements/PRD.md` (1,456 lines)
- **Commit**: `f902082` - "docs(pm): complete Phase 1 requirements and project documentation"

### ✅ Project Context
- **PROJECT-OVERVIEW.md**: High-level project overview
- **CLAUDE.md**: Project protocols and structure
- **STATUS.md**: Current status tracking

### ✅ Key Technical Decisions Made
1. **Email Service Provider**: Resend (free tier, 3,000 emails/month)
2. **Spam Protection**: Google reCAPTCHA v3 (invisible)
3. **Form Management**: React Hook Form + Zod validation
4. **Hosting**: Vercel (serverless, automatic deployments)
5. **No Database**: Stateless forms for Phase 1

All decisions documented in `/decisions/pm/`

---

## What Architect Needs to Do

### Primary Deliverables

#### 1. System Architecture Document
Create comprehensive architecture documentation covering:

**A. System Overview**
- High-level architecture diagram
- Component interaction diagram
- Data flow diagrams (form submission → email delivery)
- Deployment architecture (Vercel + external services)

**B. Component Architecture**
- Frontend components structure
- API routes architecture
- Email service integration
- State management approach

**C. Integration Architecture**
- Resend email service integration
- reCAPTCHA v3 integration
- Environment configuration
- External dependencies

#### 2. Technical Design Decisions
Document and decide on:

**A. Code Organization**
- Directory structure for new features
- Component organization strategy
- Shared utilities location
- Configuration management

**B. API Design**
- `/api/send-email` endpoint specification
- Request/response schemas
- Error handling strategy
- Rate limiting implementation approach

**C. Form Architecture**
- Form validation strategy (client + server)
- Error handling patterns
- Loading state management
- Success/failure flow

**D. Email Template System**
- Template organization (inline HTML vs. components)
- Variable interpolation approach
- Branding/styling strategy
- Template testing strategy

#### 3. Non-Functional Requirements Design

**A. Performance Architecture**
- Page optimization strategy (lazy loading, code splitting)
- Form submission optimization
- Email delivery performance
- Caching strategy (if any)

**B. Security Architecture**
- Input validation approach (client + server)
- API security (rate limiting, CORS)
- Environment variable management
- Data sanitization strategy
- Protection against XSS, injection attacks

**C. Error Handling & Resilience**
- Error handling patterns
- Retry logic for email delivery
- Fallback strategies (if Resend is down)
- User-facing error messages

**D. Monitoring & Observability**
- Logging strategy
- Error tracking approach
- Performance monitoring
- Email delivery tracking

#### 4. Technology Stack Validation
Review and validate:
- Next.js version and features to use
- React patterns (hooks, context, etc.)
- TypeScript adoption (optional but recommended)
- Testing approach (if any for Phase 1)

#### 5. Scalability & Future-Proofing
Consider and document:
- How to scale beyond 3,000 emails/month
- Database integration path (Phase 2+)
- CRM integration considerations (future)
- Migration strategy from stateless to stateful

---

## Context & Background

### Why This Work Is Needed

**Business Problem**: MountArc's website has broken email/contact functionality. This rebuild must be reliable, secure, and maintainable.

**Technical Challenge**: Implement server-side email system with client-friendly UX while maintaining security and preventing spam.

**Timeline Constraint**: Development starts Jan 27, must launch by Feb 28, 2026. Architecture decisions needed by Jan 24-25 to unblock Engineering.

### Project Type: Complete Rebuild

This is **NOT** an enhancement - we're rebuilding from scratch:
- Existing forms are broken (don't send emails)
- Complete replacement of email infrastructure
- New pages (/book-call, /thank-you, /unsubscribe)
- Modern tech stack (Resend, reCAPTCHA v3, React Hook Form)

**Maintain**:
- Existing design aesthetic (dark theme + mint green)
- Existing website structure
- Existing Tailwind CSS setup

**Replace**:
- Entire email sending mechanism
- Form validation logic
- Contact form implementation

---

## Technical Requirements Summary

### Functional Requirements

**3 Forms**:
1. Contact Form (/contact) - 6 fields (3 required, 3 optional)
2. Discovery Call Form (/book-call) - 6 fields (all required)
3. Newsletter Form (footer) - 1 field (email only)

**6 Email Types**:
1. Contact Form → Team Notification
2. Contact Form → User Auto-Reply
3. Discovery Call → Team Notification
4. Discovery Call → User Confirmation
5. Newsletter → Team Notification
6. Newsletter → Welcome Email

**4 Pages**:
1. /contact - Contact form page
2. /book-call - Discovery call booking page
3. /thank-you - Success confirmation page
4. /unsubscribe - Newsletter opt-out page

### Non-Functional Requirements

**Performance**:
- Page load time < 3 seconds (mobile)
- Email delivery < 30 seconds
- Form submission response < 2 seconds
- Lighthouse score 90+ (Performance, Best Practices, SEO)

**Security**:
- Server-side input validation (MUST)
- XSS protection
- reCAPTCHA v3 (minimum score 0.5)
- Rate limiting (1 submission per email per 5 minutes)
- HTTPS (Vercel provides)

**Reliability**:
- 99%+ form submission success rate
- 99%+ email delivery rate
- Graceful error handling
- User-friendly error messages

**Scalability**:
- Support 100-200 form submissions/month
- 3,000 emails/month capacity (Resend free tier)
- 1,000+ monthly website visitors
- Stateless architecture (no database bottleneck)

**Browser Support**:
- Chrome (Desktop & Mobile) - Last 2 versions
- Firefox - Last 2 versions
- Safari (Desktop & iOS) - Last 2 versions
- Edge (Chromium) - Last 2 versions
- NOT supporting IE11

**Accessibility**:
- WCAG 2.1 Level A compliance (basic)
- Keyboard navigation
- Semantic HTML
- Form labels and ARIA attributes
- Focus indicators
- Error message accessibility

**Mobile Responsiveness**:
- Breakpoints: Mobile (320-768px), Tablet (768-1024px), Desktop (1024px+)
- Touch-friendly buttons (44x44px minimum)
- Readable text (16px minimum)
- No horizontal scrolling
- Stack form fields vertically

---

## Technology Stack Details

### Frontend
- **Framework**: Next.js (existing - currently installed version)
- **React**: 18+
- **Styling**: Tailwind CSS (already in use)
- **Form Management**: React Hook Form (recommended: ^7.x)
- **Validation**: Zod (recommended: ^3.x)
- **Spam Protection**: reCAPTCHA v3 integration

### Backend / API
- **Runtime**: Node.js (Next.js server-side)
- **API Routes**: Next.js API routes (`/api/send-email`)
- **Email Service**: Resend SDK (^2.x)
- **No Database**: Stateless forms (Phase 1)

### Infrastructure
- **Hosting**: Vercel (existing deployment)
- **CI/CD**: Vercel Git integration (automatic)
- **Monitoring**: Vercel Analytics, Resend Dashboard
- **SSL/HTTPS**: Vercel provides automatically

### Key NPM Packages Needed
```json
{
  "resend": "^2.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "react-google-recaptcha-v3": "^1.x"
}
```

### Environment Variables
```
RESEND_API_KEY=re_xxxxx (server-side only)
RECIPIENT_EMAIL=testing@example.com | contact@mountarc.com
RECAPTCHA_SECRET_KEY=xxxxx (server-side only)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxxxx (client-side)
```

---

## Technical Constraints

### Hard Constraints (Cannot Change)
1. **Must use Resend** for email (decision made, free tier: 3,000 emails/month)
2. **Must use reCAPTCHA v3** (invisible spam protection)
3. **Must use Vercel** for hosting (existing infrastructure)
4. **No database** for Phase 1 (stateless forms only)
5. **Must match existing design** (dark theme + mint green accents)
6. **Must use Tailwind CSS** (existing setup)

### Soft Constraints (Can Adjust)
1. Form management library (React Hook Form recommended, not required)
2. Validation library (Zod recommended, not required)
3. TypeScript adoption (recommended, not required)
4. Email template format (HTML structure flexible)
5. Component organization (architecture decides)

### Timeline Constraints
- Architecture doc needed by: Jan 24-25, 2026
- Development starts: Jan 27, 2026
- Testing phase: Feb 15-21, 2026
- Hard deadline: Feb 28, 2026

---

## Integration Points

### 1. Resend Email Service

**Provider**: Resend (resend.com)
**Tier**: Free (3,000 emails/month, 100 emails/day)
**Documentation**: https://resend.com/docs

**Integration Requirements**:
- Server-side only (Next.js API route)
- API key authentication
- Domain verification (mountarc.com)
- DKIM/SPF configuration (Resend handles)

**Email Sending Flow**:
```
User submits form → Client validates →
Sends to /api/send-email → Server validates →
Checks reCAPTCHA → Calls Resend API →
Sends 2 emails (team + user) → Returns success/error
```

**Error Handling**:
- What if Resend API is down?
- What if email delivery fails?
- Retry logic needed?

### 2. Google reCAPTCHA v3

**Version**: v3 (invisible, no user interaction)
**Documentation**: https://developers.google.com/recaptcha/docs/v3

**Integration Requirements**:
- Client-side: Load reCAPTCHA script, get token on form submit
- Server-side: Verify token, check score (minimum 0.5)
- No user interaction (runs in background)

**Score Interpretation**:
- 0.9+ : Very likely human
- 0.5-0.9 : Likely human (accept)
- 0.0-0.5 : Likely bot (reject)

**Error Handling**:
- What if reCAPTCHA service is down?
- What if score check fails on server?

### 3. Vercel Platform

**Hosting**: Vercel (existing deployment)
**Features Used**:
- Serverless functions (API routes)
- Environment variables
- Automatic HTTPS
- Git-based deployments

**Deployment**:
- Automatic on git push to master
- Environment variables in Vercel dashboard
- Production vs. preview environments

---

## Key Architecture Questions to Answer

### 1. API Route Design
- [ ] Single `/api/send-email` endpoint vs. separate endpoints per form type?
- [ ] How to structure request/response?
- [ ] How to handle rate limiting (in-memory cache vs. external service)?
- [ ] Session management needed? (stateless preferred)

### 2. Form Validation Strategy
- [ ] Client-side validation library (React Hook Form + Zod)?
- [ ] Server-side validation (duplicate rules or shared schema)?
- [ ] How to sync validation rules between client/server?
- [ ] Real-time validation vs. on-blur vs. on-submit?

### 3. Error Handling Patterns
- [ ] How to handle API errors gracefully?
- [ ] User-facing error messages strategy?
- [ ] Logging strategy (console, external service)?
- [ ] Retry logic for email delivery failures?

### 4. Email Template Architecture
- [ ] Inline HTML strings vs. React components?
- [ ] Template organization (separate files, template engine)?
- [ ] Variable interpolation approach?
- [ ] How to test email templates?

### 5. State Management
- [ ] Form state (React Hook Form sufficient)?
- [ ] Global state needed? (probably not for Phase 1)
- [ ] Loading states management?
- [ ] Error state management?

### 6. Performance Optimization
- [ ] Code splitting strategy?
- [ ] Lazy loading for forms?
- [ ] Image optimization (Next.js Image)?
- [ ] Bundle size optimization?

### 7. Security Implementation
- [ ] Input sanitization (where and how)?
- [ ] SQL injection protection (N/A - no database)
- [ ] XSS protection (React handles most, but double-check)
- [ ] CSRF protection needed? (SameSite cookies?)
- [ ] Rate limiting implementation (per IP, per email, both)?

### 8. Testing Strategy
- [ ] Unit tests needed for Phase 1? (time constraint)
- [ ] Integration tests for email sending?
- [ ] E2E tests? (manual testing for Phase 1)
- [ ] How to test email templates without spamming real emails?

---

## Open Technical Decisions

### Decision 1: TypeScript Adoption
**Question**: Should we use TypeScript for new code?

**Pros**:
- Type safety reduces bugs
- Better IDE support
- Easier refactoring

**Cons**:
- Learning curve (if team not familiar)
- Slightly slower development
- Additional build step

**Recommendation Needed**: Yes/No + rationale

---

### Decision 2: Email Template Format
**Question**: How to structure email templates?

**Option A**: Inline HTML strings
```javascript
const emailHtml = `
  <div>
    <h1>Hello ${name}</h1>
    <p>${message}</p>
  </div>
`;
```

**Option B**: React components (using react-email or similar)
```javascript
const EmailTemplate = ({ name, message }) => (
  <div>
    <h1>Hello {name}</h1>
    <p>{message}</p>
  </div>
);
```

**Option C**: External template files (HTML/Handlebars)

**Recommendation Needed**: Choose approach + rationale

---

### Decision 3: Rate Limiting Implementation
**Question**: How to implement rate limiting (1 submission per email per 5 minutes)?

**Option A**: In-memory cache (Node.js Map/Object)
- Pros: Simple, no external dependencies
- Cons: Resets on server restart, not shared across instances

**Option B**: Redis
- Pros: Persistent, shared across instances
- Cons: Additional service, overkill for Phase 1

**Option C**: Vercel KV (Upstash)
- Pros: Serverless-friendly, persistent
- Cons: Additional service, free tier limits

**Recommendation Needed**: Choose approach + rationale

---

### Decision 4: Form Component Structure
**Question**: How to organize form components?

**Option A**: Separate components per form
```
/components/forms/
  ContactForm.jsx
  DiscoveryCallForm.jsx
  NewsletterForm.jsx
```

**Option B**: Shared form component with configuration
```
/components/forms/
  BaseForm.jsx (shared logic)
  form-configs.js (different configs)
```

**Recommendation Needed**: Choose approach + rationale

---

### Decision 5: Error Logging & Monitoring
**Question**: How to track errors and monitor system health?

**Option A**: Console logs only (simple)
**Option B**: Vercel Analytics + console logs
**Option C**: External service (Sentry, LogRocket)

**Phase 1 Requirement**: Basic error tracking sufficient

**Recommendation Needed**: Choose approach

---

## Architecture Deliverables Checklist

### Documentation
- [ ] System architecture document created
- [ ] Architecture diagrams (system, component, data flow)
- [ ] API endpoint specification
- [ ] Component architecture defined
- [ ] Integration architecture documented
- [ ] All technical decisions documented with rationale

### Technical Decisions
- [ ] Code organization structure defined
- [ ] Email template approach decided
- [ ] Rate limiting approach decided
- [ ] Form validation strategy defined
- [ ] Error handling patterns established
- [ ] Security implementation strategy defined

### Diagrams (Recommended)
- [ ] High-level system architecture diagram
- [ ] Form submission flow diagram
- [ ] Email sending flow diagram
- [ ] Component interaction diagram
- [ ] Deployment architecture diagram

### Review & Validation
- [ ] Non-functional requirements validated
- [ ] Performance targets achievable
- [ ] Security requirements addressed
- [ ] Scalability considerations documented
- [ ] Technical risks identified and mitigated

---

## Success Criteria

Your architecture work is complete when:

1. ✅ Engineering can start implementation without ambiguity
2. ✅ All major technical decisions documented with rationale
3. ✅ Integration points clearly specified
4. ✅ Security and performance requirements addressed
5. ✅ Component structure and API design defined
6. ✅ PM reviews and approves architecture
7. ✅ No major technical blockers identified

---

## Relevant Files

### Must Read
- `/requirements/PRD.md` - Complete technical requirements (start here!)
- `/PROJECT-OVERVIEW.md` - Project context
- `/CLAUDE.md` - Working protocols

### Technical Decisions Made
- `/decisions/pm/20260122_email-service-provider.md` - Why Resend
- `/decisions/pm/20260122_phase1-scope-definition.md` - Phase 1 scope

### Reference
- `/STATUS.md` - Current project status
- Existing website: https://mountarc-website-final.vercel.app (check current structure)

---

## Recommended Output Structure

Create these files in `/architecture/` directory:

```
/architecture/
  system-architecture.md        # High-level architecture
  component-architecture.md     # Component design
  api-specification.md          # API endpoint specs
  integration-architecture.md   # External service integrations
  security-architecture.md      # Security implementation
  performance-optimization.md   # Performance strategy
  diagrams/
    system-diagram.png          # Or .md with Mermaid
    data-flow-diagram.png
    component-diagram.png
```

Document technical decisions in `/decisions/architect/`:
```
/decisions/architect/
  20260122_typescript-adoption.md
  20260122_email-template-format.md
  20260122_rate-limiting-approach.md
  20260122_form-architecture.md
  [etc...]
```

---

## Timeline Expectations

**Target Completion**: January 24-25, 2026 (2-3 days)

**Why the urgency**:
- Engineering starts Jan 27
- Hard deadline Feb 28, 2026
- Architecture decisions block implementation

**Recommended Approach**:
1. **Day 1**: Review PRD, create high-level architecture, make key decisions
2. **Day 2**: Detail component/API design, create diagrams, document integrations
3. **Day 3**: Review, refine, validate with PM, prepare handoff to Engineering

---

## Next Steps After Architecture Complete

1. **Review Session**: PM + Architect review together
2. **Refinement**: Address any gaps or concerns
3. **Handoff to Engineering**: Implementation can begin
4. **Support During Development**: Answer technical questions from Engineering

---

## Communication

**Questions?**
- Escalate to PM (this role)
- Reference PRD for requirements
- Check existing codebase for patterns

**Updates?**
- Document decisions in `/decisions/architect/`
- Update STATUS.md as you progress
- Commit work regularly to git

---

## Final Notes

This is a **rebuild with tight timeline**. Prioritize:

1. **Simplicity** - Don't over-engineer for Phase 1
2. **Reliability** - Must work 99%+ of the time
3. **Security** - Server-side validation is non-negotiable
4. **Maintainability** - Clean architecture for future phases

**Remember**: Your architecture directly impacts Engineering's speed and quality. Clear decisions enable fast implementation.

**Balance**:
- ✅ Simple enough to implement in 3 weeks
- ✅ Robust enough for production use
- ✅ Flexible enough for Phase 2+ enhancements

---

**Good luck! Looking forward to the architecture design.**

---

*Handoff created by: Product Manager*
*Date: January 22, 2026*
*Project: MountArc Website - Phase 1*