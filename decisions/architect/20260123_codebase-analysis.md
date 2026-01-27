# Codebase Analysis Report

**Date:** 2026-01-23
**Role:** Solution Architect
**Status:** Accepted

## Executive Summary

The existing MountArc website is a Next.js 14 application using App Router, TypeScript, and Tailwind CSS. The contact form exists but is **non-functional** - it only logs to console without sending emails. Several pages required by Phase 1 do not exist.

---

## Current Tech Stack

| Technology | Version | Notes |
|------------|---------|-------|
| Next.js | 14.0.4 | App Router |
| React | 18.2.0 | - |
| TypeScript | 5.0.0 | - |
| Tailwind CSS | 3.3.0 | Custom theme configured |
| Fonts | Outfit, Space Mono | Google Fonts |

## Brand Colors

```javascript
colors: {
  'mint': '#7FCCC1',   // Primary accent
  'teal': '#5BB5A8',   // Secondary accent
  'navy': '#1A2332',   // Primary dark
  'dark': '#0F1419',   // Darkest
}
```

---

## Existing Structure

### Pages (Exist)

| Route | File | Status |
|-------|------|--------|
| `/` | `app/page.tsx` | Working |
| `/about` | `app/about/page.tsx` | Working |
| `/blog` | `app/blog/page.tsx` | Working |
| `/contact` | `app/contact/page.tsx` | **BROKEN** - No email sending |
| `/services` | `app/services/page.tsx` | Working |
| `/work` | `app/work/page.tsx` | Working |

### Components (Exist)

| Component | Location | Purpose |
|-----------|----------|---------|
| Navigation | `app/layout.tsx` | Header navigation |
| Footer | `app/layout.tsx` | Footer (no newsletter) |
| Icons | `app/components/Icons.tsx` | SVG icons |

### API Routes

**None exist.** No `app/api/` directory found.

---

## What's Broken

### Contact Form (`/contact`)

**Problem:** Form submission only logs to console, no email is sent.

```typescript
// Current broken implementation (line 17-48 in contact/page.tsx)
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  // TODO: Integrate with Formspree or similar service
  // Example Formspree integration:
  // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {...})

  console.log('Form submitted:', formData)  // <-- Only logs, doesn't send
  setSubmitted(true)
  // ...
}
```

**Current Form Fields:**
- name (required)
- email (required)
- company (optional)
- projectType (required)
- budget (optional)
- message (required)

**Missing per PRD:**
- Phone field (optional in contact form)
- Character counter on message
- Real-time validation with visual feedback
- reCAPTCHA protection

---

## What's Missing (Phase 1 Requirements)

### Pages to Create

| Route | Purpose | PRD Reference |
|-------|---------|---------------|
| `/book-call` | Discovery call booking form | Feature 3 |
| `/thank-you` | Success confirmation page | Feature 5 |
| `/unsubscribe` | Newsletter unsubscribe | Feature 6 |

### Components to Create/Modify

| Component | Action | Notes |
|-----------|--------|-------|
| ContactForm | Modify | Add phone, validation, email sending |
| DiscoveryCallForm | Create | New form component |
| NewsletterForm | Create | Footer newsletter signup |
| Footer | Modify | Add newsletter section |

### Infrastructure to Create

| Item | Purpose |
|------|---------|
| `/api/send-email` | API route for all email operations |
| Resend integration | Email service provider |
| reCAPTCHA v3 | Spam protection |
| Rate limiting | Prevent abuse |

### Libraries to Add

```json
{
  "resend": "^2.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "@hookform/resolvers": "^3.x",
  "react-google-recaptcha-v3": "^1.x"
}
```

---

## Existing Patterns to Follow

### Component Pattern

- Client components use `'use client'` directive
- useState for local form state
- Inline event handlers

### Styling Pattern

- Tailwind utility classes
- Custom component classes (btn-primary, hero-gradient, etc.)
- Consistent color usage (mint, teal, navy)

### Form Pattern

```tsx
// Current pattern - will be replaced with React Hook Form
const [formData, setFormData] = useState({...})
const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
```

### Layout Pattern

- Navigation and Footer in layout.tsx
- Content pages in route folders
- Sections with `py-16` or `py-20` padding
- `container-custom` for max-width content

---

## Gaps Analysis

| PRD Requirement | Current State | Gap |
|-----------------|---------------|-----|
| Contact form sends email | Logs to console only | **Critical** |
| Team notification emails | Not implemented | **Critical** |
| User confirmation emails | Not implemented | **Critical** |
| reCAPTCHA spam protection | Not implemented | High |
| Discovery call page | Does not exist | High |
| Thank you page | Does not exist | Medium |
| Newsletter signup | Does not exist | Medium |
| Unsubscribe page | Does not exist | Medium |
| Phone field in contact | Missing | Low |
| Real-time validation | Basic HTML5 only | Low |
| Character counter | Not implemented | Low |

---

## Recommendations

### Keep (Existing Patterns)

1. **Tech stack** - Next.js 14, React 18, TypeScript, Tailwind
2. **Color scheme** - mint, teal, navy, dark
3. **Component classes** - btn-primary, hero-gradient, container-custom
4. **Layout structure** - Navigation/Footer in layout.tsx
5. **App Router** - Continue using app/ directory structure

### Change (Improvements)

1. **Form handling** - Replace useState with React Hook Form + Zod
2. **Email** - Replace "TODO Formspree" with Resend integration
3. **API** - Add `/api/send-email` route
4. **Spam protection** - Add reCAPTCHA v3
5. **Footer** - Add newsletter subscription section

### Add (New Features)

1. Three new pages: /book-call, /thank-you, /unsubscribe
2. Email templates (6 types as per PRD)
3. Rate limiting middleware
4. Environment variable configuration

---

## File Structure After Phase 1

```
src/mountarc-website-FINAL/
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts          # NEW: Email API
│   ├── book-call/
│   │   └── page.tsx              # NEW: Discovery call
│   ├── contact/
│   │   └── page.tsx              # MODIFY: Fix email
│   ├── thank-you/
│   │   └── page.tsx              # NEW: Success page
│   ├── unsubscribe/
│   │   └── page.tsx              # NEW: Unsubscribe
│   ├── components/
│   │   ├── Icons.tsx             # EXISTS
│   │   └── forms/                # NEW: Form components
│   │       ├── ContactForm.tsx
│   │       ├── DiscoveryCallForm.tsx
│   │       └── NewsletterForm.tsx
│   ├── layout.tsx                # MODIFY: Add newsletter to footer
│   └── globals.css               # EXISTS
├── lib/
│   ├── resend.ts                 # NEW: Resend client
│   ├── validation.ts             # NEW: Zod schemas
│   └── rate-limit.ts             # NEW: Rate limiting
└── package.json                  # MODIFY: Add dependencies
```

---

*This analysis forms the basis for architectural decisions.*