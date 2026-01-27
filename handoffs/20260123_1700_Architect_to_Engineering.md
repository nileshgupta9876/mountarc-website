# Handoff: Architect → Engineering

**Date:** 2026-01-23 17:00
**From:** Solution Architect
**To:** Engineering Team

---

## Summary

Architecture work is complete. The codebase has been analyzed, technical decisions documented, and specifications created. Ready for implementation.

---

## Work Completed

### Documents Created

| Document | Location | Purpose |
|----------|----------|---------|
| Codebase Analysis | `decisions/architect/20260123_codebase-analysis.md` | Analysis of existing code |
| Program-Level Decisions | `decisions/architect/20260123_program-level-architecture-decisions.md` | Architectural principles |
| Technical Specification | `architecture/technical-specification.md` | Implementation blueprint |

### Key Findings

1. **Contact form exists but is BROKEN** - Only logs to console, no email sending
2. **No API routes exist** - Need to create `/api/send-email`
3. **Missing pages:** /book-call, /thank-you, /unsubscribe
4. **Missing in footer:** Newsletter subscription form
5. **Tech stack confirmed:** Next.js 14, React 18, TypeScript, Tailwind CSS

---

## What Engineering Needs to Do

### Phase 1: Setup (30 min)

```bash
cd src/mountarc-website-FINAL

# Install dependencies
npm install resend react-hook-form zod @hookform/resolvers react-google-recaptcha-v3

# Create environment file
# Add: RESEND_API_KEY, RECIPIENT_EMAIL, RECAPTCHA_SECRET_KEY, NEXT_PUBLIC_RECAPTCHA_SITE_KEY
```

### Phase 2: Build (Priority Order)

| Priority | Task | Est. Time |
|----------|------|-----------|
| 1 | Create `lib/` folder with validation schemas, Resend client, rate limiter | 1 hour |
| 2 | Create `/api/send-email` API route | 1 hour |
| 3 | Create form components (ContactForm, DiscoveryCallForm, NewsletterForm) | 1.5 hours |
| 4 | Update `/contact` page to use new ContactForm | 30 min |
| 5 | Create `/book-call` page | 45 min |
| 6 | Create `/thank-you` page | 30 min |
| 7 | Create `/unsubscribe` page | 30 min |
| 8 | Add reCAPTCHA provider to layout | 15 min |
| 9 | Add NewsletterForm to Footer | 30 min |
| 10 | Test all flows | 1 hour |

**Total Estimated:** 7-8 hours

---

## Key Technical Decisions

### API Design
- Single endpoint `/api/send-email` handles all form types
- Request includes `type` field: 'contact' | 'discovery' | 'newsletter' | 'unsubscribe'
- Server-side reCAPTCHA validation
- Server-side Zod validation
- Rate limiting per email address

### Form Handling
- Use React Hook Form + Zod (replace existing useState pattern)
- Real-time validation with error messages
- Character counter on textarea fields
- Loading states on submit buttons

### Email
- Resend for sending (already specified in PRD)
- 6 email templates (see PRD for exact content)
- Dynamic recipient based on environment variable

### Styling
- Follow existing patterns (btn-primary, hero-gradient, container-custom)
- Use existing color scheme (mint, teal, navy)
- Match existing form input styles from contact page

---

## Files to Reference

| File | Why |
|------|-----|
| `architecture/technical-specification.md` | Full technical spec |
| `requirements/PRD.md` | Email templates, field specs, validation rules |
| `src/mountarc-website-FINAL/app/contact/page.tsx` | Existing form pattern to improve |
| `src/mountarc-website-FINAL/app/layout.tsx` | Footer to modify |
| `src/mountarc-website-FINAL/app/globals.css` | Existing CSS classes |
| `src/mountarc-website-FINAL/tailwind.config.js` | Brand colors |

---

## Environment Variables Needed

```env
# Get from Resend dashboard
RESEND_API_KEY=re_xxxxxxxxxx

# Testing phase
RECIPIENT_EMAIL=nileshgupta96g@gmail.com

# Get from Google reCAPTCHA console
RECAPTCHA_SECRET_KEY=xxxxxxxxxx
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxxxxxxxxx
```

**Note:** Engineering will need access to:
1. Resend account (create at resend.com)
2. Google reCAPTCHA console (create v3 keys)

---

## Existing Patterns to Follow

### Component Pattern
```tsx
'use client'
import { useState } from 'react'
// Component code
```

### Styling Pattern
```tsx
<button className="btn-primary">Submit</button>
<section className="hero-gradient pt-32 pb-20">
<div className="container-custom">
```

### Form Input Pattern (existing - to improve with React Hook Form)
```tsx
<input
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy"
/>
```

---

## Success Criteria

Before marking complete:

- [ ] All 3 forms submit successfully
- [ ] All 6 email types send correctly
- [ ] Forms show validation errors
- [ ] Rate limiting works
- [ ] reCAPTCHA blocks bots
- [ ] All pages mobile responsive
- [ ] No console errors
- [ ] Follows existing code patterns

---

## Open Questions

None. All decisions documented. Proceed with implementation.

---

## Contact

If questions arise during implementation:
- Check PRD first (`requirements/PRD.md`)
- Check Technical Spec (`architecture/technical-specification.md`)
- Ask PM if business logic unclear
- Document any implementation decisions in `decisions/engineering/`

---

*Handoff complete. Ready for development.*