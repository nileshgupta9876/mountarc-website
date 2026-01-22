# Product Requirements Document: MountArc Website - Email & Contact System

**Project:** MountArc Website Enhancement - Phase 1
**Organization:** MountArc Private Limited
**Date Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0
**Status:** Approved
**Deadline:** February 28, 2026

---

## Executive Summary

MountArc's website currently has non-functional email and contact systems, preventing potential clients from reaching the team. This PRD defines Phase 1 enhancements to implement a complete, working email and contact system including contact forms, discovery call booking, and newsletter subscription functionality.

**What:** Implement functional email system with 3 forms, 6 email types, and 4 new pages
**Why:** Enable client communication, capture leads, build email list
**Who:** Potential clients, website visitors, newsletter subscribers
**When:** Deliver by February 28, 2026
**Success:** All forms working, emails delivering, spam protected, mobile responsive

---

## Problem Statement

### Current Situation
- **Email system is broken** - Form submissions do not send emails
- **Lost leads** - Potential clients cannot contact MountArc
- **No discovery call workflow** - No structured way to book consultations
- **No newsletter system** - Cannot build email list for marketing
- **No user confirmations** - Users don't know if their submission succeeded

### Impact
- **Business Impact:** Lost revenue opportunities, poor user experience, unprofessional perception
- **Users Affected:** All website visitors (potential clients, partners, talent)
- **Urgency:** High - Every day without working contact forms means lost business

---

## Goals & Success Metrics

### Business Goals
1. **Enable Lead Capture** - Allow potential clients to contact MountArc
2. **Streamline Discovery Calls** - Simplify the booking process
3. **Build Email List** - Grow newsletter subscribers for marketing
4. **Professional Experience** - Provide reliable, polished user experience

### Success Metrics

| Metric | Target | Measurement | Timeline |
|--------|--------|-------------|----------|
| **Form Submission Success Rate** | 99%+ | Analytics / Error tracking | Post-launch |
| **Email Delivery Rate** | 99%+ | Resend dashboard | Post-launch |
| **Spam Submissions** | <5% | Manual review | First month |
| **Mobile Form Completion** | 80%+ | Analytics | First month |
| **Page Load Time** | <3s mobile | Lighthouse | Pre-launch |
| **Zero Critical Bugs** | 0 | Testing phase | Pre-launch |

### Launch Criteria
- ✅ All 3 forms functional (contact, discovery call, newsletter)
- ✅ All 6 email types sending correctly
- ✅ Forms validated and spam-protected
- ✅ Mobile responsive (tested on 3 devices)
- ✅ Tested by both PM and client (1 week testing)
- ✅ Performance: Lighthouse score 90+

---

## User Personas

### Persona 1: Startup Founder
- **Role:** CEO/Founder of early-stage startup
- **Goals:** Find reliable development partner, get MVP built, affordable pricing
- **Pain Points:** Limited budget, needs quick response, wants to book discovery call
- **Behavior:** Mobile-first, expects immediate confirmation, checks email frequently
- **Needs:** Easy contact form, clear next steps, professional communication

### Persona 2: Small Business Owner
- **Role:** Business owner looking to digitize operations
- **Goals:** Build web app or dashboard, long-term partnership, understand costs
- **Pain Points:** Not technical, needs consultation, wants to explore options
- **Behavior:** Desktop user, prefers phone calls, likes email communication
- **Needs:** Simple forms, clear call booking, budget transparency

### Persona 3: Blog Reader / Community Member
- **Role:** Developer or entrepreneur following MountArc content
- **Goals:** Stay updated on web dev trends, learn from case studies
- **Pain Points:** Too many newsletters, values quality over quantity
- **Behavior:** Subscribes to newsletters, reads on mobile, values unsubscribe option
- **Needs:** Easy newsletter signup, clear value proposition, easy unsubscribe

---

## Features & Requirements

### Must Have (MVP - This Phase)

---

## Feature 1: Email Infrastructure

### Description
Implement reliable, server-side email system using Resend for all transactional emails.

### User Benefit
Users receive instant confirmations, team gets notifications, professional communication.

### Success Criteria
- All emails deliver within 30 seconds
- Emails don't go to spam
- Dynamic recipient configuration works
- Email templates are professional and branded

### Technical Requirements

**Email Service Provider:**
- **Provider:** Resend
- **Tier:** Free (3,000 emails/month)
- **Implementation:** Server-side via Next.js API routes
- **SDK:** `resend` npm package

**Configuration:**
```
Environment Variables:
- RESEND_API_KEY (Resend API key)
- RECIPIENT_EMAIL (testing: nileshgupta96g@gmail.com, production: contact@mountarc.com)
```

**API Route:**
- Endpoint: `/api/send-email`
- Method: POST
- Authentication: None (reCAPTCHA validated on client)
- Rate limiting: Yes (per email, per IP)

### Email Types (All 6 Required)

#### Email A: Contact Form → Team Notification
**To:** `process.env.RECIPIENT_EMAIL`
**From:** `noreply@mountarc.com`
**Subject:** `"New Contact Form Submission from [User Name]"`

**Content:**
```
New Contact Form Submission

Name: [User Name]
Email: [User Email]
Phone: [User Phone] (if provided)
Project Type: [Selected Type] (if provided)
Budget Range: [Selected Range] (if provided)

Message:
[User Message]

Submitted on: [Date & Time]
Submitted from: [Page URL]
```

---

#### Email B: Contact Form → User Auto-Reply
**To:** `[User Email]`
**From:** `noreply@mountarc.com`
**Reply-To:** `contact@mountarc.com`
**Subject:** `"Thanks for reaching out to MountArc!"`

**Content:**
```html
Hi [User Name],

Thank you for contacting MountArc! We've received your message and our team will review it shortly.

We typically respond within 24 hours during business days. If your inquiry is urgent, feel free to book a discovery call directly: [Link to /book-call]

In the meantime, feel free to explore:
- Our Services: [Link to Services]
- Our Work: [Link to Work]
- Our Blog: [Link to Blog]

Best regards,
The MountArc Team

---
MountArc Private Limited
Website: https://mountarc-website-final.vercel.app
Email: contact@mountarc.com
LinkedIn: linkedin.com/company/mountarc
```

---

#### Email C: Discovery Call → Team Notification
**To:** `process.env.RECIPIENT_EMAIL`
**From:** `noreply@mountarc.com`
**Subject:** `"New Discovery Call Booked - [User Name]"`

**Content:**
```
New Discovery Call Booking

Name: [User Name]
Email: [User Email]
Phone: [User Phone]
Preferred Date/Time: [User's Preferred Time]
Budget Range: [Selected Range]

Project Description:
[User's Description]

Booked on: [Date & Time]
Booked from: [Page URL]
```

---

#### Email D: Discovery Call → User Confirmation
**To:** `[User Email]`
**From:** `noreply@mountarc.com`
**Reply-To:** `contact@mountarc.com`
**Subject:** `"Your Discovery Call with MountArc is Confirmed!"`

**Content:**
```html
Hi [User Name],

Great news! Your discovery call with MountArc has been confirmed.

What happens next?
1. Our team will review your request
2. We'll reach out within 24 hours to schedule the call
3. We'll send you a calendar invite

Before the call, it helps if you can think about:
- Your project goals and vision
- Timeline expectations
- Any specific challenges you're facing

Looking forward to speaking with you!

Best regards,
The MountArc Team

---
MountArc Private Limited
Website: https://mountarc-website-final.vercel.app
Email: contact@mountarc.com
LinkedIn: linkedin.com/company/mountarc
```

---

#### Email E: Newsletter → Team Notification
**To:** `process.env.RECIPIENT_EMAIL`
**From:** `noreply@mountarc.com`
**Subject:** `"New Newsletter Subscriber"`

**Content:**
```
New Newsletter Subscription

Email: [Subscriber Email]
Subscribed on: [Date & Time]
Subscribed from: [Page URL]
```

---

#### Email F: Newsletter → Welcome Email
**To:** `[Subscriber Email]`
**From:** `noreply@mountarc.com`
**Reply-To:** `contact@mountarc.com`
**Subject:** `"Welcome to MountArc's Newsletter!"`

**Content:**
```html
Hi there!

Welcome to MountArc's newsletter! We're excited to have you join our community.

Here's what you can expect from us:
- Updates on web development and AI trends (bi-weekly)
- Tips for building successful products
- Case studies and insights from our projects
- Exclusive content and resources

We promise to deliver value and respect your inbox - no spam, ever.

Want to get started? Check out our latest blog post: [Link]

Best regards,
The MountArc Team

P.S. You can unsubscribe anytime using the link at the bottom of this email.

---
MountArc Private Limited
Website: https://mountarc-website-final.vercel.app
Email: contact@mountarc.com
LinkedIn: linkedin.com/company/mountarc

[Unsubscribe Link]
```

---

### Email Template Design

**Branding:**
- Include MountArc logo at top
- Use brand colors: Dark theme with mint green accents
- Professional, clean layout

**Design Style:**
- Simple HTML (not plain text, not overly designed)
- Mobile-responsive
- Inbox-friendly (avoid spam triggers)

**Footer (All Emails):**
```
---
MountArc Private Limited
Website: https://mountarc-website-final.vercel.app
Email: contact@mountarc.com
LinkedIn: linkedin.com/company/mountarc

[Newsletter emails only: Unsubscribe link]
```

---

## Feature 2: Contact Form Page

### Description
Dedicated `/contact` page with comprehensive contact form for general inquiries.

### User Benefit
Easy way for potential clients to reach MountArc, structured information capture.

### Success Criteria
- Form accessible on all devices
- Validation works in real-time
- Submission success rate 99%+
- Spam submissions <5%

### Form Fields

#### Required Fields

**1. Full Name**
- **Type:** Text input
- **Validation:**
  - Required
  - Minimum 2 characters
  - Only letters, spaces, hyphens allowed
- **Placeholder:** "John Doe"
- **Error Message:** "Please enter your full name"

**2. Email Address**
- **Type:** Email input
- **Validation:**
  - Required
  - Valid email format (regex: RFC 5322)
  - Must contain @ and domain
- **Placeholder:** "john@company.com"
- **Error Message:** "Please enter a valid email address"

**3. Message**
- **Type:** Textarea (multi-line)
- **Validation:**
  - Required
  - Minimum 20 characters
  - Maximum 250 characters
  - Show character counter
- **Placeholder:** "Tell us about your project..."
- **Error Message:** "Message must be between 20-250 characters"

#### Optional Fields

**4. Phone Number**
- **Type:** Tel input
- **Validation:**
  - Optional (only validate if filled)
  - If provided: Must include country code
  - Format: +[country code] [number]
- **Placeholder:** "+1 (555) 123-4567"
- **Error Message:** "Please include country code (e.g., +1)"

**5. Project Type**
- **Type:** Select dropdown
- **Validation:** Optional
- **Options:**
  1. AI-Enabled Web Application
  2. Real-Time Dashboard
  3. SaaS Product Development
  4. FinTech Solution
  5. API Development
  6. MVP Development
  7. Trading
  8. Other
- **Default:** "Select project type..."

**6. Budget Range**
- **Type:** Select dropdown
- **Validation:** Optional
- **Options:**
  1. Under $5,000
  2. $5,000 - $10,000
  3. $10,000 - $25,000
  4. $25,000 - $50,000
  5. Not sure yet
- **Default:** "Select budget range..."

#### Auto-Captured Fields (Hidden)

**7. Timestamp**
- Automatically captured on submission
- Format: ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)

**8. Page URL**
- Automatically captured
- Source page where form was submitted

### Form Validation Rules

**Real-time Validation:**
- Validate fields as user types (instant feedback)
- Show error messages below each field
- Show green checkmark when field is valid
- Show red border/icon when field is invalid

**Required Field Indicators:**
- Show asterisk (*) next to required field labels
- Example: "Full Name *"

**Submit Button States:**
1. **Default:** Enabled, "Send Message"
2. **Loading:** Disabled, show spinner, "Sending..."
3. **Success:** Redirect to `/thank-you`
4. **Error:** Show error message, re-enable button

**Spam Protection:**
- **reCAPTCHA v3** (invisible)
- Runs automatically in background
- No user interaction needed
- Minimum score: 0.5 (standard)

**Rate Limiting:**
- Maximum 1 submission per email per 5 minutes
- Tracked by email address
- Error message: "Please wait before submitting again"

### Form Behavior

**On Submit:**
1. Show loading spinner on button
2. Disable button to prevent double-submission
3. Validate all fields
4. Check reCAPTCHA score
5. Send to API endpoint `/api/send-email`
6. If success:
   - Send Email A (to team)
   - Send Email B (to user)
   - Redirect to `/thank-you`
   - Clear form
7. If error:
   - Show error message
   - Re-enable button
   - Keep form data

**Error Message:**
```
Oops! Something went wrong. Please try again or email us directly at contact@mountarc.com
```

### Page Design

**Layout:**
- Clean, professional design
- Match current website styling (dark theme + mint green)
- Centered form, max-width 600px
- Clear visual hierarchy

**Elements:**
- Page heading: "Get in Touch"
- Subheading: Brief description
- Form with all fields
- Submit button (prominent)
- Alternative contact info below form

**Alternative Contact:**
- Email: contact@mountarc.com
- LinkedIn: linkedin.com/company/mountarc
- "Or book a discovery call: [Link to /book-call]"

---

## Feature 3: Discovery Call Booking Page

### Description
Dedicated `/book-call` page for scheduling discovery calls with MountArc team.

### User Benefit
Streamlined way to request consultation calls, clear next steps.

### Success Criteria
- Easy to find and access
- Form completion rate 80%+
- Team receives all necessary info to prepare for call

### Form Fields

#### Required Fields

**1. Name**
- **Type:** Text input
- **Validation:**
  - Required
  - Minimum 2 characters
- **Placeholder:** "John Doe"

**2. Email**
- **Type:** Email input
- **Validation:**
  - Required
  - Valid email format
- **Placeholder:** "john@company.com"

**3. Phone Number**
- **Type:** Tel input
- **Validation:**
  - Required (since it's a call)
  - Must include country code
- **Placeholder:** "+1 (555) 123-4567"
- **Note:** Required because this is specifically for phone/video calls

**4. Preferred Date/Time**
- **Type:** Text input
- **Validation:**
  - Required
  - Minimum 10 characters
- **Placeholder:** "e.g., Next Tuesday afternoon, or any weekday morning"
- **Helper Text:** "Suggest your preferred time - we'll confirm availability"

**5. Brief Project Description**
- **Type:** Textarea
- **Validation:**
  - Required
  - Minimum 20 characters
  - Maximum 250 characters
- **Placeholder:** "Tell us about your project and what you'd like to discuss..."

**6. Budget Range**
- **Type:** Select dropdown
- **Validation:** Required
- **Options:** (Same as contact form)
  1. Under $5,000
  2. $5,000 - $10,000
  3. $10,000 - $25,000
  4. $25,000 - $50,000
  5. Not sure yet

### Form Behavior

**Validation:** Same rules as contact form (real-time, required indicators, etc.)

**On Submit:**
1. Validate all fields
2. Check reCAPTCHA
3. Send to API
4. If success:
   - Send Email C (to team)
   - Send Email D (to user)
   - Redirect to `/thank-you`
5. If error:
   - Show error message

**Follow-up Process (not automated):**
- Team manually reviews booking
- Team contacts user within 24 hours
- Team sends calendar invite
- Call scheduled

### Page Design

**Layout:**
- Similar to contact page
- Centered form, max-width 600px

**Elements:**
- Heading: "Book Your Free Discovery Call"
- Subheading: "Let's discuss your project - no pressure, no commitment"
- Bullet points of what to expect:
  - "30-45 minute consultation"
  - "Discuss your goals and challenges"
  - "Get honest feedback and recommendations"
  - "No sales pressure"
- Form
- Submit button: "Request Discovery Call"

**Reassurance:**
- "We'll confirm your preferred time within 24 hours"
- "All consultations are completely free"

---

## Feature 4: Newsletter Subscription (Footer)

### Description
Newsletter subscription form in website footer (all pages).

### User Benefit
Easy way to stay updated on MountArc's content and offerings.

### Success Criteria
- Visible on all pages
- Low friction (email only)
- Clear value proposition
- Spam-protected

### Form Fields

**1. Email**
- **Type:** Email input
- **Validation:**
  - Required
  - Valid email format
- **Placeholder:** "Enter your email"
- **Single field only** (maximum simplicity)

### Form Behavior

**Opt-in Type:**
- **Single opt-in** (no double opt-in)
- User enters email → immediately subscribed
- Instant welcome email

**On Submit:**
1. Validate email
2. Check reCAPTCHA v3
3. Send to API
4. If success:
   - Send Email E (to team)
   - Send Email F (to subscriber)
   - Show success message inline
   - Clear email field
5. If error:
   - Show error message inline

**Success Message:**
```
✓ Thanks! Check your email for confirmation.
```

**Error Message:**
```
✗ Oops! Please try again.
```

### Footer Design

**Section Heading:** "Stay Updated"

**Description:**
"Get bi-weekly insights on web development, AI, and building successful products. No spam, ever."

**Elements:**
- Email input field (inline with submit button)
- Submit button: "Subscribe"
- Success/error message area
- Newsletter details:
  - "Bi-weekly updates"
  - "Blog posts, resources, case studies"
  - "Unsubscribe anytime"

**Placement:**
- Website footer (present on all pages)
- Above or within footer links section
- Visually distinct but integrated

---

## Feature 5: Thank You Page

### Description
Success page shown after successful form submission.

### User Benefit
Confirmation of submission, clear next steps, additional engagement options.

### Success Criteria
- Clear confirmation message
- Sets expectations for response time
- Provides alternative actions

### Page Content

**URL:** `/thank-you`

**Heading:** "Thank You! We'll Be In Touch Soon"

**Confirmation Message:**
```
Your message has been received! Our team will review it and respond within 24 hours during business days.

We've also sent you a confirmation email.
```

**What Happens Next:**
1. Our team reviews your submission
2. We'll reach out via email or phone
3. We'll discuss your project and next steps

**While You Wait:**
- [Button] Explore Our Services →
- [Button] View Our Work →
- [Button] Read Our Blog →
- [Link] Book a Discovery Call (if they came from contact form)

**Alternative Contact:**
- "Need urgent assistance? Email us at contact@mountarc.com"

**Footer:** Standard footer with newsletter signup

---

## Feature 6: Unsubscribe Page

### Description
Page for users to unsubscribe from newsletter.

### User Benefit
Easy way to unsubscribe, legally required, builds trust.

### Success Criteria
- Simple, functional unsubscribe process
- No dark patterns (make it easy)
- Confirmation of unsubscribe

### Page Content

**URL:** `/unsubscribe`

**Heading:** "Unsubscribe from Newsletter"

**Message:**
```
We're sorry to see you go! Enter your email below to unsubscribe from our newsletter.
```

**Form:**
- **Email input** (required)
- **Submit button:** "Unsubscribe"

**On Submit:**
1. Validate email
2. Remove from internal subscriber list
3. Show confirmation message

**Success Message:**
```
You've been unsubscribed. You won't receive any more newsletters from us.

Changed your mind? You can re-subscribe anytime on our website.
```

**Alternative:**
"Rather than unsubscribe, would you like to reduce email frequency?" [Future enhancement]

---

## Technical Requirements

### Frontend Stack

**Framework:**
- Next.js (already in use)
- React 18+
- TypeScript (optional but recommended)

**Styling:**
- Tailwind CSS (already in use)
- Match current website colors (dark theme + mint green)
- Responsive design

**Form Management:**
- **React Hook Form** - Form state and validation
- **Zod** - Schema validation
- Why: Lightweight, performant, great DX

**Spam Protection:**
- **Google reCAPTCHA v3**
- Invisible (no user interaction)
- Minimum score: 0.5

**Key Libraries:**
```json
{
  "resend": "^2.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "@google-cloud/recaptcha-enterprise": "^4.x" OR "react-google-recaptcha-v3": "^1.x"
}
```

### Backend / API

**API Routes (Next.js):**

**1. `/api/send-email` (POST)**
- Handles all email sending
- Validates form data
- Checks reCAPTCHA
- Sends emails via Resend
- Returns success/error

**Request Body:**
```json
{
  "type": "contact" | "discovery" | "newsletter",
  "data": {
    // Form-specific fields
  },
  "recaptchaToken": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Rate Limiting:**
- Implement rate limiting per email/IP
- Prevent abuse
- Use in-memory cache or Redis (if available)

**Error Handling:**
- Log all errors
- Return user-friendly messages
- Don't expose internal errors to users

### Environment Variables

**Required:**
```
RESEND_API_KEY=re_xxxxx
RECIPIENT_EMAIL=nileshgupta96g@gmail.com (testing) / contact@mountarc.com (production)
RECAPTCHA_SECRET_KEY=your_secret_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
```

### Performance Requirements

**Page Load:**
- Mobile: < 3 seconds
- Desktop: < 2 seconds

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Lighthouse Score Targets:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 95+

**Optimization Techniques:**
- Image optimization (Next.js Image)
- Code splitting
- Lazy loading
- Minimize bundle size
- Server-side rendering where appropriate

### Browser Support

**Modern Browsers (Last 2 Versions):**
- Chrome (Desktop & Mobile)
- Firefox
- Safari (Desktop & iOS)
- Edge (Chromium)
- Samsung Internet

**Not Supporting:**
- Internet Explorer (deprecated)
- Browsers older than 2 years

**Testing Required:**
- Chrome Desktop
- Safari iOS
- Chrome Mobile Android

### Mobile Responsiveness

**Breakpoints:**
- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+

**Mobile-Specific Requirements:**
- Touch-friendly buttons (minimum 44x44px)
- Readable text (minimum 16px font size)
- Forms easy to fill on small screens
- No horizontal scrolling
- Stack form fields vertically
- Hamburger menu (if applicable)

**Testing Devices:**
- iPhone (Safari)
- Android phone (Chrome)
- iPad (Safari)

### Accessibility Requirements

**WCAG 2.1 Level A (Basic):**

**Must Have:**
- Semantic HTML (proper heading hierarchy)
- Alt text for all images
- Keyboard navigation (tab through forms)
- Form labels properly associated with inputs
- Color contrast ratio 4.5:1 minimum (normal text)
- Focus indicators visible on all interactive elements
- Error messages clear and descriptive
- Skip to main content link

**Form Accessibility:**
- Label elements for all inputs
- Required fields indicated (asterisk + aria-required)
- Error messages use aria-live regions
- Success messages announced to screen readers

**Not Required (Advanced):**
- Full screen reader optimization
- ARIA landmark roles (nice to have)
- Multiple language support

### Security Requirements

**Input Validation:**
- Server-side validation (never trust client)
- Sanitize all user input
- Prevent SQL injection (not applicable, but good practice)
- Prevent XSS attacks

**Email Security:**
- Use DKIM/SPF for email authentication
- Resend handles this automatically
- Verify domain ownership

**reCAPTCHA:**
- v3 (invisible)
- Check scores on server
- Reject low scores (<0.5)

**Rate Limiting:**
- Prevent brute force
- Limit submissions per email/IP
- Return 429 status code when exceeded

**Environment Variables:**
- Never expose API keys in client code
- Use server-side environment variables
- Resend API key server-side only

**HTTPS:**
- All pages served over HTTPS
- Vercel handles this automatically

### Monitoring & Analytics

**Required:**
- Track form submissions (success/failure)
- Track email delivery (Resend dashboard)
- Monitor errors (console, logging service)
- Page performance (Lighthouse, Vercel Analytics)

**Optional (Nice to Have):**
- Google Analytics events for form submissions
- Heatmaps (Hotjar, etc.)
- Session recordings
- A/B testing

---

## Non-Functional Requirements

### Performance
- Page load time < 3 seconds (mobile)
- Email delivery < 30 seconds
- Form submission response < 2 seconds
- No blocking operations on client

### Reliability
- 99%+ uptime (Vercel SLA)
- Email delivery 99%+ (Resend SLA)
- Graceful error handling
- Fallback messages if APIs fail

### Scalability
- Handle 1,000 form submissions/month
- Resend free tier: 3,000 emails/month (sufficient)
- No database required (stateless forms)

### Maintainability
- Clean, documented code
- TypeScript for type safety (recommended)
- Component-based architecture
- Easy to update email templates

### Usability
- Intuitive forms (no confusion)
- Clear error messages
- Mobile-friendly
- Fast feedback (real-time validation)

---

## Dependencies & Constraints

### Technical Dependencies
- Next.js project (already exists)
- Vercel hosting (already deployed)
- Resend account (free tier)
- Google reCAPTCHA account (free)
- Domain verification for email (MountArc's domain)

### Business Constraints
- **Timeline:** Must deliver by February 28, 2026
- **Budget:** Use free tiers only (Resend, reCAPTCHA)
- **Testing:** 1 week testing period required
- **Approval:** Client must test and approve

### Technical Constraints
- No backend database for Phase 1
- No CRM integration for Phase 1
- Manual email list management
- No calendar integration for discovery calls

### Design Constraints
- Must match existing website design
- Dark theme with mint green accents
- Use existing Tailwind CSS setup
- Maintain current branding

---

## Timeline & Milestones

### Project Timeline

**Total Duration:** ~5-6 weeks
**Hard Deadline:** February 28, 2026

### Milestones

| Milestone | Target Date | Status | Deliverables |
|-----------|-------------|--------|--------------|
| **Requirements Complete** | Jan 22, 2026 | ✅ Complete | PRD, Decisions documented |
| **Design Approved** | Jan 24, 2026 | Pending | Page designs, email templates |
| **Development Start** | Jan 27, 2026 | Pending | Setup complete |
| **Forms Implemented** | Feb 7, 2026 | Pending | All 3 forms working locally |
| **Email System** | Feb 10, 2026 | Pending | All 6 emails sending |
| **Integration Complete** | Feb 14, 2026 | Pending | All features integrated |
| **Testing Phase** | Feb 15-21, 2026 | Pending | Client + PM testing |
| **Bug Fixes** | Feb 22-26, 2026 | Pending | Address test findings |
| **Production Deploy** | Feb 28, 2026 | Pending | Go live |

### Testing Phase Details

**Duration:** 1 week (Feb 15-21)

**Testers:**
- PM (you)
- Client (MountArc team)

**Test Scenarios:**
1. Submit contact form (various field combinations)
2. Book discovery call
3. Subscribe to newsletter
4. Test spam protection
5. Test on mobile devices
6. Test error scenarios
7. Verify all emails deliver correctly
8. Test unsubscribe flow
9. Check page load performance
10. Verify accessibility (keyboard navigation)

**Test Environments:**
- Production site (direct testing)
- Real email addresses
- Multiple devices/browsers

**Pass Criteria:**
- All forms work 100%
- All emails deliver correctly
- No critical bugs
- Mobile responsive
- Client approval

---

## Risks & Mitigation

### Risk 1: Email Deliverability Issues
**Impact:** High - Core functionality
**Likelihood:** Medium
**Mitigation:**
- Use Resend (professional service)
- Verify domain properly
- Test emails before launch
- Monitor delivery rates
- Have fallback email (mailto links)

### Risk 2: Spam Submissions
**Impact:** Medium - Time wasted on fake leads
**Likelihood:** High - Forms attract spam
**Mitigation:**
- reCAPTCHA v3 (invisible)
- Rate limiting
- Email validation
- Manual review initially
- Can add honeypot fields if needed

### Risk 3: Timeline Delay
**Impact:** High - Hard deadline
**Likelihood:** Medium
**Mitigation:**
- Clear requirements (this PRD)
- Phased approach (email/contact only)
- Regular check-ins
- Buffer time for testing
- Scope flexibility (can cut nice-to-haves)

### Risk 4: Mobile UX Issues
**Impact:** Medium - 50%+ users on mobile
**Likelihood:** Medium
**Mitigation:**
- Mobile-first design
- Test on real devices
- Use responsive frameworks
- Get feedback early

### Risk 5: Integration Complexity
**Impact:** Low - Simple forms
**Likelihood:** Low
**Mitigation:**
- Use proven libraries
- Follow Next.js best practices
- Simple API design
- Thorough testing

---

## Out of Scope (Future Phases)

### Explicitly NOT in Phase 1

**Content Enhancements:**
- ❌ Portfolio/work showcase
- ❌ Client testimonials
- ❌ Client logos
- ❌ About page enhancements (team photos, bios, story)
- ❌ Blog content strategy
- ❌ Service detail pages
- ❌ Pricing information
- ❌ Resources section (guides, whitepapers)
- ❌ FAQ section

**Advanced Features:**
- ❌ Live chat integration
- ❌ Calendar booking integration (Calendly)
- ❌ CRM integration (HubSpot, Salesforce)
- ❌ Email marketing platform integration (Mailchimp)
- ❌ Multi-language support
- ❌ Advanced analytics/tracking
- ❌ A/B testing
- ❌ File upload on forms
- ❌ Multi-step forms
- ❌ User accounts/login

**Technical:**
- ❌ Database for form storage
- ❌ Admin dashboard
- ❌ Form submission history
- ❌ Advanced reporting
- ❌ Custom email builder

**Why Out of Scope:**
- Focus on core email/contact functionality first
- Content needs client input during development
- Advanced features can be added incrementally
- Faster delivery of critical features

**Future Consideration:**
These items will be evaluated for Phase 2 and beyond, based on:
- Phase 1 success
- User feedback
- Business priorities
- Client resources available

---

## Appendix

### A. Design References

**Current Website:**
- URL: https://mountarc-website-final.vercel.app
- Colors: Dark theme with mint green accents
- Typography: Modern, professional
- Layout: Grid-based, responsive

**Design Principles:**
- Match existing aesthetic
- Clean, minimal
- Professional
- Mobile-first

### B. Form Field Reference

**Complete Field List:**

**Contact Form:**
1. Full Name (required, text)
2. Email (required, email)
3. Message (required, textarea, 20-250 chars)
4. Phone (optional, tel)
5. Project Type (optional, dropdown)
6. Budget Range (optional, dropdown)
7. Timestamp (auto)
8. Page URL (auto)

**Discovery Call Form:**
1. Name (required, text)
2. Email (required, email)
3. Phone (required, tel)
4. Preferred Date/Time (required, text)
5. Project Description (required, textarea, 20-250 chars)
6. Budget Range (required, dropdown)
7. Timestamp (auto)
8. Page URL (auto)

**Newsletter Form:**
1. Email (required, email)
2. Timestamp (auto)
3. Page URL (auto)

### C. Email Template Variables

**Variable Mapping:**

**Contact Form Emails:**
- `{{user_name}}` - Full Name
- `{{user_email}}` - Email
- `{{user_phone}}` - Phone (optional)
- `{{project_type}}` - Selected project type
- `{{budget_range}}` - Selected budget
- `{{user_message}}` - Message content
- `{{timestamp}}` - Submission time
- `{{page_url}}` - Source page

**Discovery Call Emails:**
- `{{user_name}}` - Name
- `{{user_email}}` - Email
- `{{user_phone}}` - Phone
- `{{preferred_time}}` - Preferred Date/Time
- `{{project_description}}` - Description
- `{{budget_range}}` - Budget
- `{{timestamp}}` - Booking time

**Newsletter Emails:**
- `{{subscriber_email}}` - Email address
- `{{timestamp}}` - Subscription time

### D. API Endpoints

**Endpoint:** `POST /api/send-email`

**Request:**
```json
{
  "type": "contact",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "Interested in building a SaaS product",
    "projectType": "SaaS Product Development",
    "budgetRange": "$10,000 - $25,000"
  },
  "recaptchaToken": "token_here"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid email address"
}
```

### E. Environment Setup

**Local Development:**
```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local

# Add your keys to .env.local:
RESEND_API_KEY=re_xxxxx
RECIPIENT_EMAIL=your-testing-email@gmail.com
RECAPTCHA_SECRET_KEY=xxxxx
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxxxx

# Run development server
npm run dev
```

**Production (Vercel):**
1. Add environment variables in Vercel dashboard
2. Use production email: contact@mountarc.com
3. Verify domain for email sending
4. Deploy

### F. Testing Checklist

**Pre-Launch Testing:**

**Forms:**
- [ ] Contact form - all fields work
- [ ] Contact form - validation works
- [ ] Contact form - required fields enforced
- [ ] Contact form - optional fields work
- [ ] Discovery call - all fields work
- [ ] Discovery call - validation works
- [ ] Newsletter - email validation works
- [ ] All forms - spam protection active
- [ ] All forms - rate limiting works
- [ ] All forms - error handling works

**Emails:**
- [ ] Email A - delivers to team
- [ ] Email B - delivers to user
- [ ] Email C - delivers to team
- [ ] Email D - delivers to user
- [ ] Email E - delivers to team
- [ ] Email F - delivers to subscriber
- [ ] All emails - correct formatting
- [ ] All emails - variables populate correctly
- [ ] All emails - links work
- [ ] All emails - unsubscribe link works (newsletters)

**Pages:**
- [ ] /contact - loads correctly
- [ ] /book-call - loads correctly
- [ ] /thank-you - shows after submission
- [ ] /unsubscribe - works correctly
- [ ] Footer newsletter - shows on all pages

**Responsive:**
- [ ] Mobile - all forms work
- [ ] Mobile - all pages look good
- [ ] Tablet - all forms work
- [ ] Desktop - all forms work

**Performance:**
- [ ] Lighthouse score 90+
- [ ] Page load < 3s mobile
- [ ] No console errors

**Browsers:**
- [ ] Chrome desktop
- [ ] Safari iOS
- [ ] Chrome mobile Android

**User Experience:**
- [ ] Clear error messages
- [ ] Success messages work
- [ ] Loading states show
- [ ] Keyboard navigation works
- [ ] Tab order makes sense

### G. Launch Checklist

**Pre-Launch:**
- [ ] All testing complete
- [ ] Client approval received
- [ ] Environment variables set (production)
- [ ] Domain verified with Resend
- [ ] reCAPTCHA configured (production keys)
- [ ] Performance tested
- [ ] Mobile tested on real devices
- [ ] All emails tested end-to-end
- [ ] Error handling verified
- [ ] Backup plan ready (mailto links)

**Launch Day:**
- [ ] Deploy to production
- [ ] Verify all forms work on live site
- [ ] Test email delivery on live site
- [ ] Monitor for errors
- [ ] Client notified of launch
- [ ] Documentation updated

**Post-Launch (First Week):**
- [ ] Monitor form submissions
- [ ] Check email delivery rates (Resend dashboard)
- [ ] Review spam submissions
- [ ] Check for errors
- [ ] Get user feedback
- [ ] Document any issues
- [ ] Plan improvements

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-22 | PM | Initial PRD created based on client requirements |

---

## Approval

**Prepared By:** Product Manager
**Date:** January 22, 2026
**Status:** Approved

**Next Steps:**
1. Hand off to Business Analyst for detailed user stories
2. Hand off to Architect for technical design
3. Begin development by January 27, 2026

---

*This document is the source of truth for Phase 1 - Email & Contact System implementation for MountArc Website.*
