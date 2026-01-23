# Data Requirements

**Document Type:** Data Requirements Specification
**Project:** MountArc Website - Email & Contact System (Phase 1)
**Created:** 2026-01-22
**Version:** 1.0

---

## Overview

This document defines all data collected, stored, and transmitted across the MountArc website contact and email system. Phase 1 is stateless (no database), so data is only collected via forms and transmitted via emails.

---

## Data Collection Points

| Form Type | Purpose | Data Destination | Storage |
|-----------|---------|------------------|---------|
| Contact Form | General inquiries | Email (team + user) | None (stateless) |
| Discovery Call | Book consultation | Email (team + user) | None (stateless) |
| Newsletter | Subscribe to newsletter | Email (team + user) | Manual list (Phase 1) |

---

## Contact Form Data

### Fields Collected

| Field Name | Type | Required | Max Length | Example |
|------------|------|----------|------------|---------|
| `name` | String | Yes | 100 chars | "John Doe" |
| `email` | String (email) | Yes | 254 chars | "john@company.com" |
| `phone` | String (tel) | No | 20 chars | "+1 (555) 123-4567" |
| `projectType` | String (enum) | No | 50 chars | "SaaS Product Development" |
| `budgetRange` | String (enum) | No | 30 chars | "$10,000 - $25,000" |
| `message` | String (textarea) | Yes | 250 chars | "I need help building..." |
| `timestamp` | DateTime (ISO 8601) | Auto | - | "2026-01-22T14:30:00.000Z" |
| `pageUrl` | String (URL) | Auto | 500 chars | "https://mountarc.com/contact" |

### Data Flow
```
User Input → Client Validation → API → Server Validation → Email Sending → Resend → Recipient Inbox
```

### Data Retention
- **Client Side:** Cleared after successful submission
- **Server Side:** Not stored (stateless)
- **Email:** Retained in recipient's email inbox (user's control)

---

## Discovery Call Form Data

### Fields Collected

| Field Name | Type | Required | Max Length | Example |
|------------|------|----------|------------|---------|
| `name` | String | Yes | 100 chars | "John Doe" |
| `email` | String (email) | Yes | 254 chars | "john@company.com" |
| `phone` | String (tel) | **Yes** | 20 chars | "+1 (555) 123-4567" |
| `preferredTime` | String (text) | Yes | 200 chars | "Next Tuesday, 2-4pm EST" |
| `description` | String (textarea) | Yes | 250 chars | "Want to discuss SaaS platform..." |
| `budgetRange` | String (enum) | **Yes** | 30 chars | "$10,000 - $25,000" |
| `timestamp` | DateTime (ISO 8601) | Auto | - | "2026-01-22T14:30:00.000Z" |
| `pageUrl` | String (URL) | Auto | 500 chars | "https://mountarc.com/book-call" |

### Key Differences from Contact Form
- `phone`: Required (not optional)
- `preferredTime`: New field (free-form text)
- `budgetRange`: Required (not optional)
- `description`: Replaces `message`, same validation

---

## Newsletter Subscription Data

### Fields Collected

| Field Name | Type | Required | Max Length | Example |
|------------|------|----------|------------|---------|
| `email` | String (email) | Yes | 254 chars | "john@company.com" |
| `timestamp` | DateTime (ISO 8601) | Auto | - | "2026-01-22T14:30:00.000Z" |
| `pageUrl` | String (URL) | Auto | 500 chars | "https://mountarc.com/" |

### Minimal Data Collection
- Only email address required (maximum simplicity)
- No name, phone, or other personal data
- Subscribe from any page (footer form)

### Subscriber List Management (Phase 1)
- **Storage:** Manual spreadsheet or email folder
- **Access:** MountArc team only
- **Updates:** Manual additions/removals
- **Future:** Migrate to Mailchimp/ConvertKit

---

## Unsubscribe Data

### Fields Collected

| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `email` | String (email) | Yes | "john@company.com" |

### Processing
- User enters email to unsubscribe
- Email removed from manual subscriber list (Phase 1)
- Idempotent (can unsubscribe multiple times, no error)

---

## Auto-Captured Fields

All forms automatically capture:

| Field | Source | Purpose | Format |
|-------|--------|---------|--------|
| `timestamp` | Server clock | Track when submitted | ISO 8601 UTC |
| `pageUrl` | Client `window.location.href` | Know where form was filled | Full URL |
| `recaptchaToken` | Google reCAPTCHA v3 | Spam protection | Token string |

---

## Data Types & Formats

### String Fields
- **Encoding:** UTF-8
- **Trimming:** Leading/trailing whitespace removed
- **Sanitization:** HTML entities escaped (XSS prevention)

### Email Addresses
- **Format:** RFC 5322 compliant
- **Validation:** Regex + DNS check (client-side only)
- **Case:** Stored as lowercase (normalized)
- **Example:** `user@example.com`

### Phone Numbers
- **Format:** International format with country code
- **Required Pattern:** `+[country code] [number]`
- **Validation:** Regex allowing digits, spaces, hyphens, parentheses
- **Example:** `+1 (555) 123-4567` or `+44 20 1234 5678`

### Timestamps
- **Format:** ISO 8601 (UTC)
- **Example:** `2026-01-22T14:30:00.000Z`
- **Timezone:** Always UTC (Z suffix)

### URLs
- **Format:** Absolute URL with protocol
- **Example:** `https://mountarc-website-final.vercel.app/contact`
- **Validation:** Must start with `http://` or `https://`

### Enums (Dropdowns)

**Project Type Options:**
- AI-Enabled Web Application
- Real-Time Dashboard
- SaaS Product Development
- FinTech Solution
- API Development
- MVP Development
- Trading
- Other

**Budget Range Options:**
- Under $5,000
- $5,000 - $10,000
- $10,000 - $25,000
- $25,000 - $50,000
- Not sure yet

---

## Data Security & Privacy

### Client-Side Security
- ✅ No sensitive data stored in localStorage or cookies
- ✅ Form data cleared after successful submission
- ✅ HTTPS enforced (Vercel handles)
- ✅ Input sanitization before submission

### Server-Side Security
- ✅ All data validated server-side (never trust client)
- ✅ XSS prevention (escape HTML in emails)
- ✅ SQL injection: N/A (no database)
- ✅ Rate limiting (prevent abuse)
- ✅ API keys never exposed to client

### Email Security
- ✅ Resend uses TLS for email transmission
- ✅ SPF/DKIM configured (Resend handles)
- ✅ No PII (Personally Identifiable Information) logged server-side

### Privacy Compliance
- **CAN-SPAM:** Unsubscribe link in newsletters ✅
- **GDPR:** Easy unsubscribe, minimal data collection ✅
- **Data Retention:** No long-term storage in Phase 1 ✅
- **User Control:** Users control their inbox, can delete emails ✅

---

## Data Transmission

### API Request Format

**Endpoint:** `POST /api/send-email`

**Headers:**
```
Content-Type: application/json
```

**Body (Contact Form Example):**
```json
{
  "type": "contact",
  "data": {
    "name": "John Doe",
    "email": "john@company.com",
    "phone": "+1 (555) 123-4567",
    "projectType": "SaaS Product Development",
    "budgetRange": "$10,000 - $25,000",
    "message": "I need help building a SaaS platform for...",
    "timestamp": "2026-01-22T14:30:00.000Z",
    "pageUrl": "https://mountarc-website-final.vercel.app/contact"
  },
  "recaptchaToken": "03AGdBq24..."
}
```

### API Response Format

**Success (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error (400/403/429/500):**
```json
{
  "success": false,
  "error": "Error description"
}
```

---

## Data Validation Rules

See [form-validation-rules.md](./form-validation-rules.md) for comprehensive validation rules.

---

## Email Data Mapping

See [email-data-mapping.md](./email-data-mapping.md) for how form data maps to email template variables.

---

## Future Enhancements (Out of Scope - Phase 1)

### Phase 2+ Considerations
- **Database Storage:** PostgreSQL or MongoDB for submissions
- **CRM Integration:** HubSpot, Salesforce, or Pipedrive
- **Email Platform:** Mailchimp or ConvertKit for newsletters
- **Analytics:** Track form abandonment, field completion rates
- **Additional Fields:** Company name, website, industry, etc.
- **File Uploads:** Attach project briefs, RFPs, etc.
- **Multi-step Forms:** Break long forms into steps
- **Draft Saving:** Auto-save partially completed forms

---

## Related Documentation

- [Form Validation Rules](./form-validation-rules.md)
- [Email Data Mapping](./email-data-mapping.md)
- [PRD - Data Fields](../PRD.md#form-field-reference)
- [Epic 2: Contact Form](../epics/epic-2-contact-form/README.md)
- [Epic 3: Discovery Call](../epics/epic-3-discovery-call/README.md)
- [Epic 4: Newsletter](../epics/epic-4-newsletter/README.md)

---

**Maintained By:** Business Analyst
**Last Updated:** 2026-01-22
**Version:** 1.0