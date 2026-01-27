# Engineering → QA Handoff

**Date:** 2026-01-27
**From:** Engineering
**To:** QA
**Project:** MountArc Website - Phase 1 Email & Contact System

---

## Summary

Phase 1 implementation of the Email & Contact System is complete. All code has been developed, build passes successfully, and the system is ready for QA testing.

---

## What Was Implemented

### New Pages (4)
| Page | Path | Purpose |
|------|------|---------|
| Contact | `/contact` | Updated with new ContactForm component |
| Book Call | `/book-call` | Discovery call booking page |
| Thank You | `/thank-you` | Success confirmation page |
| Unsubscribe | `/unsubscribe` | Newsletter unsubscribe page |

### Form Components (3)
| Component | Location | Fields |
|-----------|----------|--------|
| ContactForm | Footer navigation → Contact | Name*, Email*, Phone, Project Type, Budget, Message* |
| DiscoveryCallForm | `/book-call` | Name*, Email*, Phone*, Preferred Time*, Description*, Budget* |
| NewsletterForm | Footer (all pages) | Email* only |

### Email Templates (6)
| Type | Trigger | Recipient | Subject |
|------|---------|-----------|---------|
| Contact Team | Contact form submit | Team | "New Contact Form Submission from [Name]" |
| Contact User | Contact form submit | User | "Thanks for reaching out to MountArc!" |
| Discovery Team | Book call submit | Team | "New Discovery Call Request - [Name]" |
| Discovery User | Book call submit | User | "Your Discovery Call Request - MountArc" |
| Newsletter Team | Newsletter subscribe | Team | "New Newsletter Subscriber" |
| Newsletter User | Newsletter subscribe | User | "Welcome to MountArc's Newsletter!" |

### API Endpoint
- **POST /api/send-email** - Single endpoint handling all form types
- Request body includes `type` field: `'contact' | 'discovery' | 'newsletter' | 'unsubscribe'`

---

## Testing Environment Setup

### Prerequisites
1. Node.js 18+ installed
2. npm 8+ installed
3. Git access to repository

### Step-by-Step Setup

```bash
# 1. Navigate to project
cd src/mountarc-website-FINAL

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Edit .env.local with real values (see below)

# 5. Start development server
npm run dev

# 6. Open browser to http://localhost:3000
```

### Environment Variables Required

Create `.env.local` with these values:

```env
# Resend Email (get from https://resend.com/api-keys)
RESEND_API_KEY=re_xxxxxxxxxx

# Email recipient for testing
RECIPIENT_EMAIL=nileshgupta96g@gmail.com

# reCAPTCHA v3 (get from https://www.google.com/recaptcha/admin)
# Create reCAPTCHA v3 keys and add localhost to allowed domains
RECAPTCHA_SECRET_KEY=xxxxxxxxxx
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxxxxxxxxx
```

**Note:** Contact Nilesh for actual API keys if needed.

---

## Testing Checklist

### Contact Form (`/contact`)

- [ ] **Valid submission**: Fill all required fields (name, email, message 20+ chars), submit → redirects to /thank-you
- [ ] **Team email received**: Check RECIPIENT_EMAIL inbox for "New Contact Form Submission from [Name]"
- [ ] **User confirmation email**: Check submitted email for "Thanks for reaching out to MountArc!"
- [ ] **Required field validation**: Leave name empty → shows "Name must be at least 2 characters"
- [ ] **Email validation**: Enter invalid email → shows "Please enter a valid email"
- [ ] **Message length**: Enter < 20 chars → shows min length error
- [ ] **Message length**: Enter > 250 chars → shows max length error
- [ ] **Phone format**: Enter phone without country code → shows "Include country code"
- [ ] **Optional fields**: Submit without phone/project type/budget → works fine

### Discovery Call Form (`/book-call`)

- [ ] **Valid submission**: Fill all 6 required fields, submit → redirects to /thank-you
- [ ] **Team email received**: Check inbox for "New Discovery Call Request - [Name]"
- [ ] **User confirmation**: Check submitted email for "Your Discovery Call Request - MountArc"
- [ ] **All fields required**: Leave any field empty → shows validation error
- [ ] **Phone required**: Phone is required (unlike contact form)
- [ ] **Budget dropdown**: Verify all budget options display correctly
- [ ] **Preferred time validation**: Must be at least 10 characters

### Newsletter Form (Footer)

- [ ] **Valid subscription**: Enter valid email, submit → shows success message inline
- [ ] **NO redirect**: Should show "Thanks for subscribing!" message, not redirect
- [ ] **Team notification**: Check inbox for "New Newsletter Subscriber"
- [ ] **Welcome email**: Check submitted email for "Welcome to MountArc's Newsletter!"
- [ ] **Invalid email**: Enter "test" → shows "Please enter a valid email"
- [ ] **Duplicate handling**: Submit same email twice within 5 minutes → rate limited

### Unsubscribe Page (`/unsubscribe`)

- [ ] **Page loads**: Navigate to /unsubscribe
- [ ] **Form displays**: Email input and submit button visible
- [ ] **Submission works**: Enter email and submit → shows confirmation message
- [ ] **Email validation**: Invalid email shows error

### Thank You Page (`/thank-you`)

- [ ] **Page loads**: Direct navigation to /thank-you works
- [ ] **Content**: Shows confirmation message and next steps
- [ ] **Navigation**: Links to explore (Services, Work, Blog) work correctly

### Rate Limiting

- [ ] **Rate limit active**: Submit same form twice quickly with same email → second attempt shows "Please wait before submitting again"
- [ ] **5 minute window**: After 5 minutes, same email can submit again
- [ ] **Per-email basis**: Different emails can submit concurrently

### reCAPTCHA

- [ ] **Token generated**: Form submissions include reCAPTCHA token (check browser network tab)
- [ ] **Bot rejection**: If reCAPTCHA score < 0.5, submission rejected (hard to test manually)
- [ ] **Graceful fallback**: If reCAPTCHA not configured, forms still work with warning in console

### Mobile Responsiveness

- [ ] **Contact page**: Form displays correctly on mobile (320px-480px)
- [ ] **Book call page**: All fields stack vertically on mobile
- [ ] **Newsletter in footer**: Input and button responsive
- [ ] **Thank you page**: Centered content readable on mobile
- [ ] **Unsubscribe page**: Form usable on mobile

### Email Rendering

- [ ] **HTML renders**: Emails display formatted HTML, not plain text
- [ ] **Mobile email**: Emails readable on mobile email clients
- [ ] **Links work**: Any links in emails are clickable and correct

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Build Verification

- [ ] **Build passes**: `npm run build` completes without errors
- [ ] **Production preview**: `npm run build && npm start` serves correctly

---

## Known Limitations (Phase 1)

### No Database
- Form submissions are NOT stored
- Only sent as emails
- If email fails, submission is lost
- Unsubscribe page sends notification but doesn't actually remove from list (no list exists)

### In-Memory Rate Limiting
- Rate limit resets on server restart
- In production (Vercel serverless), each function instance has separate memory
- Could allow some duplicate submissions during high traffic
- Acceptable for Phase 1 volume (100-200 submissions/month)

### No Double Opt-in
- Newsletter uses single opt-in
- User subscribes immediately, no confirmation click required
- Per PRD requirement

### Manual Calendar Scheduling
- Discovery call form sends notification email
- Team must manually schedule the call
- No calendar integration (Calendly/Cal.com planned for future)

### reCAPTCHA Score
- Using threshold of 0.5 (default)
- May need adjustment based on spam volume
- Very low scores may still get through in edge cases

---

## Files Changed (Reference)

### New Files
```
lib/
├── email/
│   ├── resend.ts              # Resend client config
│   └── templates.ts           # 6 email templates
├── validation/
│   └── schemas.ts             # Zod validation schemas
└── rate-limit.ts              # Rate limiter

app/
├── api/send-email/route.ts    # API endpoint
├── book-call/page.tsx         # Discovery call page
├── thank-you/page.tsx         # Success page
├── unsubscribe/page.tsx       # Unsubscribe page
├── providers.tsx              # reCAPTCHA provider
└── components/forms/
    ├── ContactForm.tsx
    ├── DiscoveryCallForm.tsx
    └── NewsletterForm.tsx
```

### Modified Files
```
app/layout.tsx                 # Added Providers, newsletter in footer
app/contact/page.tsx           # Rewritten with new form
app/components/Icons.tsx       # Added Calendar, BookOpen icons
.env.example                   # Environment template
package.json                   # Added dependencies
```

---

## Related Documents

- [Technical Specification](../architecture/technical-specification.md)
- [Engineering Decision](../decisions/engineering/20260127_email-contact-system-implementation.md)
- [PRD](../requirements/PRD.md)

---

## Contact

**Engineering Questions:** Reach out on #dev channel or contact@mountarc.com

---

*Ready for QA testing. Please report any issues as GitHub issues.*