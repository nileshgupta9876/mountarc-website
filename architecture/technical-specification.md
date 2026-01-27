# Technical Specification: Email & Contact System

**Version:** 1.0
**Date:** 2026-01-23
**Author:** Solution Architect
**Status:** Approved for Development

---

## 1. Overview

This document provides the technical blueprint for implementing Phase 1 of the MountArc website enhancement - the Email & Contact System.

**Scope:** Fix broken contact form, add 3 new pages, implement email infrastructure, add newsletter subscription.

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
├─────────────────────────────────────────────────────────────────┤
│  React Components (Next.js App Router)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ ContactForm │  │ DiscoveryForm│  │NewsletterForm│            │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          ▼                                       │
│              ┌───────────────────┐                              │
│              │  reCAPTCHA v3     │                              │
│              │  (Token Generation)│                              │
│              └─────────┬─────────┘                              │
└────────────────────────┼────────────────────────────────────────┘
                         │ POST /api/send-email
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVER (Vercel)                             │
├─────────────────────────────────────────────────────────────────┤
│  Next.js API Route: /api/send-email                             │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ 1. Validate reCAPTCHA token (Google API)                    ││
│  │ 2. Validate form data (Zod schema)                          ││
│  │ 3. Check rate limit (in-memory)                             ││
│  │ 4. Send emails (Resend API)                                 ││
│  │    - Team notification email                                ││
│  │    - User confirmation email                                ││
│  │ 5. Return success/error response                            ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐              ┌─────────────┐                   │
│  │   Resend    │              │   Google    │                   │
│  │  Email API  │              │ reCAPTCHA   │                   │
│  └─────────────┘              └─────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Technology Decisions

### 3.1 Libraries to Install

```bash
npm install resend react-hook-form zod @hookform/resolvers react-google-recaptcha-v3
```

| Library | Version | Purpose |
|---------|---------|---------|
| `resend` | ^2.x | Email sending API |
| `react-hook-form` | ^7.x | Form state management |
| `zod` | ^3.x | Schema validation |
| `@hookform/resolvers` | ^3.x | Zod + React Hook Form integration |
| `react-google-recaptcha-v3` | ^1.x | Invisible spam protection |

### 3.2 Environment Variables

```env
# .env.local (development)
RESEND_API_KEY=re_xxxxxxxxxx
RECIPIENT_EMAIL=nileshgupta96g@gmail.com
RECAPTCHA_SECRET_KEY=xxxxxxxxxx
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxxxxxxxxx

# Production (Vercel)
RECIPIENT_EMAIL=contact@mountarc.com
```

---

## 4. File Structure

```
src/mountarc-website-FINAL/
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts              # API endpoint
│   ├── book-call/
│   │   └── page.tsx                  # Discovery call page
│   ├── contact/
│   │   └── page.tsx                  # MODIFY existing
│   ├── thank-you/
│   │   └── page.tsx                  # Success page
│   ├── unsubscribe/
│   │   └── page.tsx                  # Unsubscribe page
│   ├── components/
│   │   ├── Icons.tsx                 # EXISTS
│   │   └── forms/
│   │       ├── ContactForm.tsx       # Contact form component
│   │       ├── DiscoveryCallForm.tsx # Book call form
│   │       └── NewsletterForm.tsx    # Newsletter signup
│   ├── layout.tsx                    # MODIFY: wrap with reCAPTCHA provider
│   └── providers.tsx                 # NEW: Client providers
├── lib/
│   ├── email/
│   │   ├── resend.ts                 # Resend client config
│   │   └── templates.ts              # Email templates
│   ├── validation/
│   │   └── schemas.ts                # Zod validation schemas
│   └── rate-limit.ts                 # Simple rate limiting
├── .env.local                        # Environment variables
└── package.json                      # Updated dependencies
```

---

## 5. API Specification

### 5.1 POST /api/send-email

**Request:**
```typescript
interface SendEmailRequest {
  type: 'contact' | 'discovery' | 'newsletter' | 'unsubscribe';
  data: ContactData | DiscoveryData | NewsletterData;
  recaptchaToken: string;
}

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message: string;
}

interface DiscoveryData {
  name: string;
  email: string;
  phone: string;
  preferredTime: string;
  description: string;
  budget: string;
}

interface NewsletterData {
  email: string;
}
```

**Response:**
```typescript
// Success (200)
{ success: true, message: "Email sent successfully" }

// Validation Error (400)
{ success: false, error: "Invalid email address" }

// Rate Limited (429)
{ success: false, error: "Please wait before submitting again" }

// Server Error (500)
{ success: false, error: "Something went wrong. Please try again." }
```

### 5.2 Rate Limiting

- **Limit:** 1 submission per email per 5 minutes
- **Implementation:** In-memory Map (sufficient for Vercel serverless)
- **Key:** Email address (lowercase)

---

## 6. Component Specifications

### 6.1 ContactForm

```typescript
// Fields
const contactFields = {
  name: { required: true, min: 2 },
  email: { required: true, format: 'email' },
  phone: { required: false, format: 'phone with country code' },
  projectType: { required: false, type: 'select' },
  budget: { required: false, type: 'select' },
  message: { required: true, min: 20, max: 250 }
};

// Project Type Options
const projectTypes = [
  'AI-Enabled Web Application',
  'Real-Time Dashboard',
  'SaaS Product Development',
  'FinTech Solution',
  'API Development',
  'MVP Development',
  'Trading',
  'Other'
];

// Budget Options
const budgetRanges = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  'Not sure yet'
];
```

### 6.2 DiscoveryCallForm

```typescript
// All fields required
const discoveryFields = {
  name: { required: true, min: 2 },
  email: { required: true, format: 'email' },
  phone: { required: true, format: 'phone with country code' },
  preferredTime: { required: true, min: 10 },
  description: { required: true, min: 20, max: 250 },
  budget: { required: true, type: 'select' }
};
```

### 6.3 NewsletterForm

```typescript
// Single field
const newsletterFields = {
  email: { required: true, format: 'email' }
};

// Inline success/error messages (no page redirect)
```

---

## 7. Validation Schemas (Zod)

```typescript
// lib/validation/schemas.ts

import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().regex(/^\+\d{1,3}\s?\d{6,14}$/, 'Include country code (e.g., +1 555-123-4567)').optional().or(z.literal('')),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(20, 'Message must be at least 20 characters').max(250, 'Message must be under 250 characters'),
});

export const discoverySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().regex(/^\+\d{1,3}\s?\d{6,14}$/, 'Include country code (e.g., +1 555-123-4567)'),
  preferredTime: z.string().min(10, 'Please provide your preferred date/time'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(250, 'Description must be under 250 characters'),
  budget: z.string().min(1, 'Please select a budget range'),
});

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});
```

---

## 8. Email Templates

### 8.1 Template Structure

All emails use simple HTML (not plain text, not overly styled) with:
- MountArc branding (logo optional for Phase 1)
- Responsive layout
- Brand colors where applicable
- Professional footer

### 8.2 Email Types

| ID | Trigger | To | Subject |
|----|---------|-----|---------|
| A | Contact form | Team | "New Contact Form Submission from [Name]" |
| B | Contact form | User | "Thanks for reaching out to MountArc!" |
| C | Discovery call | Team | "New Discovery Call Booked - [Name]" |
| D | Discovery call | User | "Your Discovery Call with MountArc is Confirmed!" |
| E | Newsletter | Team | "New Newsletter Subscriber" |
| F | Newsletter | User | "Welcome to MountArc's Newsletter!" |

---

## 9. Page Specifications

### 9.1 /book-call

- Hero section with heading
- Form with all 6 fields
- Benefits/reassurance section
- Follow existing page patterns

### 9.2 /thank-you

- Confirmation message
- "What happens next" steps
- Links to explore (Services, Work, Blog)
- No form

### 9.3 /unsubscribe

- Simple email input form
- Confirmation message on success
- No database (Phase 1 limitation noted in UI)

---

## 10. Security Considerations

| Concern | Mitigation |
|---------|------------|
| Spam submissions | reCAPTCHA v3 (score >= 0.5) |
| Rate limiting | 1 per email per 5 minutes |
| XSS | React auto-escapes, Zod validates |
| API key exposure | Server-side only (RESEND_API_KEY) |
| Email injection | Zod email validation |

---

## 11. Testing Checklist

Before handoff to QA:

- [ ] Contact form submits and sends both emails
- [ ] Discovery form submits and sends both emails
- [ ] Newsletter subscribes and sends both emails
- [ ] All forms show validation errors correctly
- [ ] Rate limiting blocks rapid submissions
- [ ] reCAPTCHA rejects bot submissions
- [ ] /thank-you page displays correctly
- [ ] /unsubscribe page works
- [ ] Mobile responsive on all forms
- [ ] All emails render correctly

---

## 12. Development Order (Recommended)

1. **Setup** - Install dependencies, create env file
2. **Lib Layer** - Validation schemas, Resend client, rate limiter
3. **API Route** - /api/send-email with all email types
4. **Forms** - ContactForm, DiscoveryCallForm, NewsletterForm components
5. **Pages** - Update /contact, create /book-call, /thank-you, /unsubscribe
6. **Layout** - Add reCAPTCHA provider, newsletter to footer
7. **Test** - All flows end-to-end

---

*This specification provides everything needed for implementation. Refer to PRD for detailed email content and business requirements.*
