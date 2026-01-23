# Email Data Mapping

**Document Type:** Email Template Variable Mapping
**Project:** MountArc Website - Email & Contact System (Phase 1)
**Created:** 2026-01-22
**Version:** 1.0

---

## Overview

This document maps form data fields to email template variables for all 6 email types. Each email type receives specific data from form submissions and renders it in the email body.

---

## Email A: Contact Form → Team Notification

**To:** `process.env.RECIPIENT_EMAIL` (testing: nileshgupta96g@gmail.com, production: contact@mountarc.com)
**From:** `noreply@mountarc.com`
**Subject:** `"New Contact Form Submission from {name}"`
**Type:** Team notification

### Data Mapping

| Email Variable | Form Field | Required | Example Value | Fallback |
|----------------|------------|----------|---------------|----------|
| `{name}` | `data.name` | Yes | "John Doe" | N/A |
| `{email}` | `data.email` | Yes | "john@company.com" | N/A |
| `{phone}` | `data.phone` | No | "+1 (555) 123-4567" | "Not provided" |
| `{projectType}` | `data.projectType` | No | "SaaS Product Development" | "Not provided" |
| `{budgetRange}` | `data.budgetRange` | No | "$10,000 - $25,000" | "Not provided" |
| `{message}` | `data.message` | Yes | "I need help building..." | N/A |
| `{timestamp}` | `data.timestamp` | Yes (auto) | "Jan 22, 2026 2:30 PM" | Current time |
| `{pageUrl}` | `data.pageUrl` | Yes (auto) | "https://mountarc.com/contact" | "Unknown" |

### Email Template Structure

```
Subject: New Contact Form Submission from John Doe

New Contact Form Submission

Name: John Doe
Email: john@company.com
Phone: +1 (555) 123-4567
Project Type: SaaS Product Development
Budget Range: $10,000 - $25,000

Message:
I need help building a SaaS platform for managing customer subscriptions.

Submitted on: Jan 22, 2026 2:30 PM
Submitted from: https://mountarc.com/contact

---
MountArc Private Limited
Website: https://mountarc-website-final.vercel.app
Email: contact@mountarc.com
LinkedIn: linkedin.com/company/mountarc
```

---

## Email B: Contact Form → User Auto-Reply

**To:** `{email}` (user's email from form)
**From:** `noreply@mountarc.com`
**Reply-To:** `contact@mountarc.com`
**Subject:** `"Thanks for reaching out to MountArc!"`
**Type:** User confirmation

### Data Mapping

| Email Variable | Form Field | Required | Example Value |
|----------------|------------|----------|---------------|
| `{name}` | `data.name` | Yes | "John" (first name extracted) or "John Doe" |

### Email Template Structure

```
Subject: Thanks for reaching out to MountArc!

Hi John,

Thank you for contacting MountArc! We've received your message and our team will review it shortly.

We typically respond within 24 hours during business days. If your inquiry is urgent, feel free to book a discovery call directly: [Link to /book-call]

In the meantime, feel free to explore:
- Our Services: [Link]
- Our Work: [Link]
- Our Blog: [Link]

Best regards,
The MountArc Team

---
MountArc Private Limited
Website: https://mountarc-website-final.vercel.app
Email: contact@mountarc.com
LinkedIn: linkedin.com/company/mountarc
```

---

## Email C: Discovery Call → Team Notification

**To:** `process.env.RECIPIENT_EMAIL`
**From:** `noreply@mountarc.com`
**Subject:** `"New Discovery Call Booked - {name}"`
**Type:** Team notification

### Data Mapping

| Email Variable | Form Field | Required | Example Value | Fallback |
|----------------|------------|----------|---------------|----------|
| `{name}` | `data.name` | Yes | "John Doe" | N/A |
| `{email}` | `data.email` | Yes | "john@company.com" | N/A |
| `{phone}` | `data.phone` | **Yes** | "+1 (555) 123-4567" | N/A |
| `{preferredTime}` | `data.preferredTime` | Yes | "Next Tuesday, 2-4pm EST" | N/A |
| `{description}` | `data.description` | Yes | "Want to discuss SaaS..." | N/A |
| `{budgetRange}` | `data.budgetRange` | **Yes** | "$10,000 - $25,000" | N/A |
| `{timestamp}` | `data.timestamp` | Yes (auto) | "Jan 22, 2026 2:30 PM" | Current time |
| `{pageUrl}` | `data.pageUrl` | Yes (auto) | "https://mountarc.com/book-call" | "Unknown" |

### Email Template Structure

```
Subject: New Discovery Call Booked - John Doe

New Discovery Call Booking

Name: John Doe
Email: john@company.com
Phone: +1 (555) 123-4567
Preferred Date/Time: Next Tuesday, 2-4pm EST
Budget Range: $10,000 - $25,000

Project Description:
Want to discuss building a SaaS platform for managing customer subscriptions and billing.

Booked on: Jan 22, 2026 2:30 PM
Booked from: https://mountarc.com/book-call

---
MountArc Private Limited
Website: https://mountarc-website-final.vercel.app
Email: contact@mountarc.com
LinkedIn: linkedin.com/company/mountarc
```

---

## Email D: Discovery Call → User Confirmation

**To:** `{email}` (user's email from form)
**From:** `noreply@mountarc.com`
**Reply-To:** `contact@mountarc.com`
**Subject:** `"Your Discovery Call with MountArc is Confirmed!"`
**Type:** User confirmation

### Data Mapping

| Email Variable | Form Field | Required | Example Value |
|----------------|------------|----------|---------------|
| `{name}` | `data.name` | Yes | "John" or "John Doe" |

### Email Template Structure

```
Subject: Your Discovery Call with MountArc is Confirmed!

Hi John,

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

## Email E: Newsletter → Team Notification

**To:** `process.env.RECIPIENT_EMAIL`
**From:** `noreply@mountarc.com`
**Subject:** `"New Newsletter Subscriber"`
**Type:** Team notification

### Data Mapping

| Email Variable | Form Field | Required | Example Value | Fallback |
|----------------|------------|----------|---------------|----------|
| `{email}` | `data.email` | Yes | "john@company.com" | N/A |
| `{timestamp}` | `data.timestamp` | Yes (auto) | "Jan 22, 2026 2:30 PM" | Current time |
| `{pageUrl}` | `data.pageUrl` | Yes (auto) | "https://mountarc.com/" | "Unknown" |

### Email Template Structure

```
Subject: New Newsletter Subscriber

New Newsletter Subscription

Email: john@company.com
Subscribed on: Jan 22, 2026 2:30 PM
Subscribed from: https://mountarc.com/
```

---

## Email F: Newsletter → Welcome Email

**To:** `{email}` (subscriber's email from form)
**From:** `noreply@mountarc.com`
**Reply-To:** `contact@mountarc.com`
**Subject:** `"Welcome to MountArc's Newsletter!"`
**Type:** User confirmation

### Data Mapping

| Email Variable | Form Field | Required | Example Value |
|----------------|------------|----------|---------------|
| No variables | - | - | Generic welcome message |

### Email Template Structure

```
Subject: Welcome to MountArc's Newsletter!

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

[Unsubscribe](https://mountarc-website-final.vercel.app/unsubscribe)
```

---

## Variable Formatting Guidelines

### Name Formatting
- **First Name Extraction:** Extract first word from full name for personalization
- **Example:** "John Doe" → "John" (in greetings)
- **Fallback:** Use full name if extraction fails

### Timestamp Formatting
- **Format:** Human-readable date and time
- **Example:** "January 22, 2026 at 2:30 PM"
- **Timezone:** Display in recipient's local time (or UTC if not available)
- **Implementation:** Use JavaScript `toLocaleString()` or similar

### Optional Field Handling
- **If Empty:** Display "Not provided" or hide the field entirely
- **Conditional Rendering:** Use template logic to show/hide optional fields

```javascript
// Example: Conditional rendering
{phone ? (
  <p><strong>Phone:</strong> {phone}</p>
) : null}

// Or with fallback
<p><strong>Phone:</strong> {phone || 'Not provided'}</p>
```

### URL Formatting
- **Format:** Clickable links in HTML emails
- **Example:** `<a href="{pageUrl}">{pageUrl}</a>`
- **Plain Text:** Full URL as text

### Text Escaping
- **All User Input:** Escape HTML entities to prevent XSS
- **Method:** Use template engine's auto-escaping or manual escaping
- **Example:** `&lt;script&gt;` instead of `<script>`

---

## Email Footer (All Emails)

**Standard Footer:**
```
---
MountArc Private Limited
Website: https://mountarc-website-final.vercel.app
Email: contact@mountarc.com
LinkedIn: linkedin.com/company/mountarc
```

**Newsletter Footer (Email F Only):**
```
---
MountArc Private Limited
Website: https://mountarc-website-final.vercel.app
Email: contact@mountarc.com
LinkedIn: linkedin.com/company/mountarc

[Unsubscribe](https://mountarc-website-final.vercel.app/unsubscribe)
```

**Legal Requirements:**
- **CAN-SPAM:** Physical address in footer (add if sending commercial emails)
- **Unsubscribe Link:** Required in all newsletter emails

---

## Email Delivery Configuration

### Sender Configuration
- **From:** `noreply@mountarc.com` (all emails)
- **Reply-To:** `contact@mountarc.com` (user-facing emails)
- **Display Name:** "MountArc" or "MountArc Team"

### Recipient Configuration (Team Emails)
- **Testing:** `nileshgupta96g@gmail.com`
- **Production:** `contact@mountarc.com`
- **Source:** `process.env.RECIPIENT_EMAIL`

### Recipient Configuration (User Emails)
- **Source:** User's email from form submission
- **Validation:** Must be valid email address
- **Sanitization:** Lowercase, trimmed

---

## Implementation Notes

### React Email Templates (Recommended)

```jsx
// emails/ContactFormTeamNotification.jsx
export function ContactFormTeamNotification({ name, email, phone, projectType, budgetRange, message, timestamp, pageUrl }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Heading>New Contact Form Submission</Heading>

          <Text><strong>Name:</strong> {name}</Text>
          <Text><strong>Email:</strong> {email}</Text>
          {phone && <Text><strong>Phone:</strong> {phone}</Text>}
          {projectType && <Text><strong>Project Type:</strong> {projectType}</Text>}
          {budgetRange && <Text><strong>Budget Range:</strong> {budgetRange}</Text>}

          <Text><strong>Message:</strong></Text>
          <Text style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
            {message}
          </Text>

          <Text style={{ color: '#666', fontSize: '12px' }}>
            Submitted on: {new Date(timestamp).toLocaleString()}<br />
            From: {pageUrl}
          </Text>

          <Hr />

          <Text style={{ fontSize: '12px', color: '#666' }}>
            MountArc Private Limited<br />
            Website: https://mountarc-website-final.vercel.app<br />
            Email: contact@mountarc.com<br />
            LinkedIn: linkedin.com/company/mountarc
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

### Resend API Call

```javascript
import resend from './lib/resend';
import { ContactFormTeamNotification } from './emails/ContactFormTeamNotification';

await resend.emails.send({
  from: 'noreply@mountarc.com',
  to: process.env.RECIPIENT_EMAIL,
  subject: `New Contact Form Submission from ${data.name}`,
  react: ContactFormTeamNotification(data),
});
```

---

## Testing Email Templates

### Test Data Sets

**Contact Form Test Data:**
```javascript
{
  name: "Test User",
  email: "test@example.com",
  phone: "+1 234 567 8900",
  projectType: "SaaS Product Development",
  budgetRange: "$10,000 - $25,000",
  message: "This is a test message for the contact form email template.",
  timestamp: "2026-01-22T14:30:00.000Z",
  pageUrl: "https://mountarc.com/contact"
}
```

**With Optional Fields Empty:**
```javascript
{
  name: "Test User",
  email: "test@example.com",
  phone: null,
  projectType: null,
  budgetRange: null,
  message: "Minimal test message without optional fields for testing.",
  timestamp: "2026-01-22T14:30:00.000Z",
  pageUrl: "https://mountarc.com/contact"
}
```

### Testing Checklist
- [ ] All variables populate correctly
- [ ] Optional fields show "Not provided" or are hidden
- [ ] Timestamps format correctly
- [ ] URLs are clickable
- [ ] No "undefined" or "null" displayed
- [ ] HTML entities escaped (no XSS)
- [ ] Mobile responsive
- [ ] Doesn't go to spam folder

---

## Related Documentation

- [Data Requirements](./data-requirements.md)
- [Form Validation Rules](./form-validation-rules.md)
- [PRD - Email Types](../PRD.md#email-types-all-6-required)
- [US-002: Email Templates](../epics/epic-1-email/US-002-email-templates.md)

---

**Maintained By:** Business Analyst
**Last Updated:** 2026-01-22
**Version:** 1.0