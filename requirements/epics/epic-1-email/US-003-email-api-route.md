# User Story: Email API Route Implementation

**ID:** US-003
**Epic:** [Epic 1 - Email Infrastructure](./README.md)
**Priority:** Must Have (Critical)
**Persona:** Engineering Team / System
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **developer**,
I want to **create a unified API endpoint that handles all email sending logic**,
So that **forms can submit data and trigger appropriate emails reliably**.

---

## Business Context

This API route is the central hub for all email functionality. It receives form data from the frontend, validates it, selects the appropriate email templates, and sends emails via Resend. This must be robust, secure, and handle errors gracefully as it's critical to all Phase 1 features.

---

## Acceptance Criteria

### Primary Criteria

**Given** a valid form submission is made to `/api/send-email`
**When** the API receives the request with correct payload
**Then** it validates the form data
**And** verifies the reCAPTCHA token
**And** selects the correct email templates based on form type
**And** sends emails to both team and user (where applicable)
**And** returns success response within 2 seconds
**And** logs the email event for monitoring

**Given** an invalid form submission is made
**When** the API receives the request with missing or invalid data
**Then** it validates the input and identifies the error
**And** returns a clear error message
**And** does NOT send any emails
**And** logs the validation failure
**And** returns appropriate HTTP status code (400)

**Given** an email sending failure occurs (Resend API error)
**When** the API attempts to send an email but Resend fails
**Then** it catches the error gracefully
**And** logs the full error details for debugging
**And** returns a user-friendly error message
**And** returns HTTP status code 500

**Given** rate limiting is triggered
**When** the same email submits multiple times within 5 minutes
**Then** the API rejects the request
**And** returns error message "Please wait before submitting again"
**And** returns HTTP status code 429

---

## Edge Cases

### Edge Case 1: Partial Email Failure
**Scenario:** Team email sends successfully, but user email fails
**Expected Behavior:** Log both results, return success (team was notified)
**Handling:** Try/catch for each email send, log failures separately

### Edge Case 2: Invalid reCAPTCHA Token
**Scenario:** reCAPTCHA token is missing, expired, or score too low
**Expected Behavior:** Reject request, return error
**Handling:** Validate token before processing, return 403 status

### Edge Case 3: Environment Variable Missing
**Scenario:** `RESEND_API_KEY` or `RECIPIENT_EMAIL` not set
**Expected Behavior:** API returns 500 error, logs configuration issue
**Handling:** Check env vars on initialization, fail gracefully

### Edge Case 4: Malformed Request Body
**Scenario:** Request body is not valid JSON or missing required fields
**Expected Behavior:** Return 400 error with clear message
**Handling:** Validate request body structure before processing

### Edge Case 5: Concurrent Requests
**Scenario:** Multiple users submit forms simultaneously
**Expected Behavior:** All requests processed independently
**Handling:** Ensure API is stateless, handle each request in isolation

### Edge Case 6: Very Large Message Content
**Scenario:** User submits maximum 250 character message
**Expected Behavior:** API accepts and sends without issues
**Handling:** Validate max length, ensure email template handles it

---

## Dependencies

### Prerequisites
- [x] US-001 (Resend Integration) complete
- [x] US-002 (Email Templates) complete
- [ ] reCAPTCHA v3 configured (keys available)

### Technical Dependencies
- Next.js API routes
- Resend SDK
- Environment variables configured
- Rate limiting mechanism (in-memory cache or library)

### Blocks
- All form submission stories (Epic 2, 3, 4)

---

## Technical Notes

### API Route Structure

**File:** `/pages/api/send-email.js` (or `/app/api/send-email/route.js` if using App Router)

```javascript
// pages/api/send-email.js
import resend from '../../lib/resend';
import { ContactFormTeamNotification } from '../../emails/ContactFormTeamNotification';
import { ContactFormUserAutoReply } from '../../emails/ContactFormUserAutoReply';
// ... import other email templates

// Rate limiting (simple in-memory cache for Phase 1)
const recentSubmissions = new Map();

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { type, data, recaptchaToken } = req.body;

    // 1. Validate request body
    if (!type || !data || !recaptchaToken) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // 2. Verify reCAPTCHA
    const recaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaValid) {
      return res.status(403).json({
        success: false,
        error: 'reCAPTCHA verification failed'
      });
    }

    // 3. Check rate limiting
    const rateLimitKey = data.email || req.headers['x-forwarded-for'];
    if (isRateLimited(rateLimitKey)) {
      return res.status(429).json({
        success: false,
        error: 'Please wait before submitting again'
      });
    }

    // 4. Send emails based on type
    let emailResults;
    switch (type) {
      case 'contact':
        emailResults = await sendContactFormEmails(data);
        break;
      case 'discovery':
        emailResults = await sendDiscoveryCallEmails(data);
        break;
      case 'newsletter':
        emailResults = await sendNewsletterEmails(data);
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid email type'
        });
    }

    // 5. Update rate limiting
    updateRateLimit(rateLimitKey);

    // 6. Return success
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Email API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred. Please try again or contact us directly.'
    });
  }
}

// Helper functions
async function sendContactFormEmails(data) {
  const { name, email, phone, message, projectType, budgetRange } = data;

  // Send to team
  const teamEmail = await resend.emails.send({
    from: 'noreply@mountarc.com',
    to: process.env.RECIPIENT_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    react: ContactFormTeamNotification({
      name, email, phone, message, projectType, budgetRange,
      timestamp: new Date().toISOString(),
      pageUrl: data.pageUrl || 'Unknown'
    })
  });

  // Send auto-reply to user
  const userEmail = await resend.emails.send({
    from: 'noreply@mountarc.com',
    to: email,
    replyTo: 'contact@mountarc.com',
    subject: 'Thanks for reaching out to MountArc!',
    react: ContactFormUserAutoReply({ name })
  });

  return { teamEmail, userEmail };
}

// Similar functions for discovery and newsletter...

async function verifyRecaptcha(token) {
  // Verify with Google reCAPTCHA API
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  });
  const data = await response.json();
  return data.success && data.score >= 0.5;
}

function isRateLimited(key) {
  const now = Date.now();
  const lastSubmission = recentSubmissions.get(key);
  return lastSubmission && (now - lastSubmission) < 5 * 60 * 1000; // 5 minutes
}

function updateRateLimit(key) {
  recentSubmissions.set(key, Date.now());
  // Clean up old entries (older than 10 minutes)
  for (const [k, v] of recentSubmissions.entries()) {
    if (Date.now() - v > 10 * 60 * 1000) {
      recentSubmissions.delete(k);
    }
  }
}
```

### Request/Response Format

**Request:**
```json
POST /api/send-email

{
  "type": "contact",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "I need help building a SaaS product...",
    "projectType": "SaaS Product Development",
    "budgetRange": "$10,000 - $25,000",
    "pageUrl": "https://mountarc.com/contact"
  },
  "recaptchaToken": "03AGdBq24..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

**Error Response (429 - Rate Limited):**
```json
{
  "success": false,
  "error": "Please wait before submitting again"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "An error occurred. Please try again or contact us directly."
}
```

---

## Design Notes

### Error Handling Strategy
1. **Validation Errors (400):** Clear, actionable messages
2. **Auth Errors (403):** reCAPTCHA failure
3. **Rate Limit (429):** Tell user to wait
4. **Server Errors (500):** Generic message + provide fallback (email directly)

### Logging Strategy
- Log all API calls (timestamp, type, success/failure)
- Log full error details for 500 errors
- Log rate limit hits (potential abuse)
- Don't log sensitive data (full messages, personal info in prod)

### Performance Considerations
- API should respond in < 2 seconds
- Email sending is async (Resend handles delivery)
- Rate limiting uses in-memory cache (fast)
- For scale: consider Redis for rate limiting

---

## Testing Notes

### Unit Testing
- [ ] Test request validation (missing fields, invalid format)
- [ ] Test email type routing (contact, discovery, newsletter)
- [ ] Test rate limiting logic
- [ ] Test error handling for Resend failures
- [ ] Test reCAPTCHA verification (mock)

### Integration Testing
- [ ] Submit valid contact form → verify both emails sent
- [ ] Submit valid discovery call → verify both emails sent
- [ ] Submit newsletter → verify both emails sent
- [ ] Submit with invalid data → verify 400 error
- [ ] Submit without reCAPTCHA → verify 403 error
- [ ] Submit twice within 5 min → verify 429 on second attempt
- [ ] Submit with invalid API key (mock) → verify 500 error

### Manual Testing
- [ ] Test from contact form on website
- [ ] Test from discovery call form
- [ ] Test from newsletter form
- [ ] Verify emails arrive in inbox
- [ ] Verify error messages display correctly
- [ ] Test on mobile devices
- [ ] Test with slow network (timeout handling)

### Test Data
**Contact Form:**
```json
{
  "type": "contact",
  "data": {
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message for contact form.",
    "pageUrl": "https://mountarc.com/contact"
  },
  "recaptchaToken": "test_token"
}
```

**Discovery Call:**
```json
{
  "type": "discovery",
  "data": {
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "preferredTime": "Next Tuesday afternoon",
    "description": "Want to discuss a SaaS project.",
    "budgetRange": "$10,000 - $25,000",
    "pageUrl": "https://mountarc.com/book-call"
  },
  "recaptchaToken": "test_token"
}
```

**Newsletter:**
```json
{
  "type": "newsletter",
  "data": {
    "email": "test@example.com",
    "pageUrl": "https://mountarc.com/"
  },
  "recaptchaToken": "test_token"
}
```

---

## Validation Rules

### Request Body Validation
- `type`: Required, must be one of: "contact", "discovery", "newsletter"
- `data`: Required, object with form fields
- `recaptchaToken`: Required, string

### Contact Form Data Validation
- `name`: Required, string, 2-100 characters
- `email`: Required, valid email format
- `message`: Required, string, 20-250 characters
- `phone`: Optional, string with country code
- `projectType`: Optional, string
- `budgetRange`: Optional, string

### Discovery Call Data Validation
- `name`: Required, string, 2-100 characters
- `email`: Required, valid email format
- `phone`: Required, string with country code
- `preferredTime`: Required, string, 10-200 characters
- `description`: Required, string, 20-250 characters
- `budgetRange`: Required, string

### Newsletter Data Validation
- `email`: Required, valid email format

### reCAPTCHA Validation
- Token must be valid
- Score must be >= 0.5

---

## Security Considerations

### Input Validation
- Sanitize all user input before sending emails
- Prevent email header injection
- Validate email addresses strictly
- Limit message length to prevent abuse

### Rate Limiting
- 1 submission per email per 5 minutes
- Track by email address (primary)
- Track by IP address (fallback)
- Clear old entries periodically

### API Key Security
- Never expose Resend API key to client
- Never log API key in error messages
- Store in environment variables only

### reCAPTCHA
- Verify token server-side always
- Never trust client-side validation
- Reject low scores (< 0.5)

### Error Messages
- Don't expose internal errors to users
- Log full details server-side only
- Return generic messages for 500 errors

---

## Definition of Done

- [ ] API route created at `/api/send-email`
- [ ] Handles all 3 email types (contact, discovery, newsletter)
- [ ] Request validation implemented
- [ ] reCAPTCHA verification implemented
- [ ] Rate limiting implemented
- [ ] Error handling for all scenarios
- [ ] Logging implemented
- [ ] All 6 email templates integrated
- [ ] Tested with all form types
- [ ] Tested error scenarios
- [ ] Performance verified (< 2s response)
- [ ] Code reviewed
- [ ] Documentation added (API comments)
- [ ] Committed to git

---

## Open Questions

1. **Rate Limiting Storage:** In-memory cache or Redis?
   - **Answer:** In-memory for Phase 1 (simple, sufficient for expected traffic)
   - **Future:** Consider Redis if traffic increases

2. **Email Failure Handling:** What if team email sends but user email fails?
   - **Answer:** Log failure, but return success (team was notified)
   - **Action:** Add monitoring to catch repeated failures

3. **Validation Library:** Should we use a library like Zod or Joi?
   - **Recommendation:** Yes, use Zod (matches frontend validation)

4. **Logging Service:** Where to log errors?
   - **Phase 1:** Console logs (Vercel captures these)
   - **Future:** Consider Sentry, LogRocket, or Datadog

5. **Testing:** Should we write automated tests?
   - **Answer:** Manual testing for Phase 1 (time constraint)
   - **Future:** Add unit/integration tests in Phase 2

---

## Related Stories

- **Depends On:** US-001 (Resend Integration), US-002 (Email Templates)
- **Blocks:** US-004 (Contact Form), US-008 (Discovery Call Form), US-011 (Newsletter Form)
- **Related:** All form submission stories across all epics

---

## References

- [PRD - Email Infrastructure](../../PRD.md#feature-1-email-infrastructure)
- [PRD - API Endpoints](../../PRD.md#api-endpoints)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Resend API Reference](https://resend.com/docs/api-reference/emails/send-email)
- [Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0