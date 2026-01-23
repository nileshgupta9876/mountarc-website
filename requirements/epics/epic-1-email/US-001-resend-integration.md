# User Story: Resend Integration Setup

**ID:** US-001
**Epic:** [Epic 1 - Email Infrastructure](./README.md)
**Priority:** Must Have (Critical)
**Persona:** Engineering Team / System
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **developer**,
I want to **integrate Resend email service into the Next.js application**,
So that **the system can send transactional emails reliably**.

---

## Business Context

This is the foundational technical setup required before any emails can be sent. Without Resend integration, all form submissions will fail to send notifications. This blocks all user-facing functionality in Phase 1.

---

## Acceptance Criteria

### Primary Criteria

**Given** a Resend account is created and API key is generated
**When** the Resend SDK is installed and configured in the project
**Then** the application can successfully authenticate with Resend API
**And** test emails can be sent programmatically

**Given** environment variables are configured
**When** the application runs in testing mode
**Then** `RECIPIENT_EMAIL` resolves to `nileshgupta96g@gmail.com`
**And** when in production mode
**Then** `RECIPIENT_EMAIL` resolves to `contact@mountarc.com`

**Given** Resend SDK is integrated
**When** an email send request is made
**Then** the request completes within 2 seconds
**And** returns a success or error response
**And** includes a message ID for tracking

### Technical Criteria

- [ ] Resend npm package installed (`resend@^2.x`)
- [ ] Environment variables configured in `.env.local` (local) and Vercel (production)
- [ ] Resend client initialized correctly in application code
- [ ] Domain verification completed for `mountarc.com`
- [ ] Test email successfully sent using Resend SDK
- [ ] Error handling implemented for API failures
- [ ] Logging configured for email events

---

## Edge Cases

### Edge Case 1: Invalid API Key
**Scenario:** API key is incorrect or expired
**Expected Behavior:** Clear error message returned, logged for debugging
**Handling:** Fail gracefully, don't expose API key in error messages

### Edge Case 2: Domain Not Verified
**Scenario:** Attempt to send email before domain verification complete
**Expected Behavior:** Resend returns verification error
**Handling:** Display clear message to user, log for team review

### Edge Case 3: Network Timeout
**Scenario:** Resend API is slow or unreachable
**Expected Behavior:** Request times out after 10 seconds
**Handling:** Return timeout error, suggest user try again

### Edge Case 4: Rate Limit Exceeded
**Scenario:** Free tier limit (3,000/month) exceeded
**Expected Behavior:** Resend returns 429 error
**Handling:** Log critical alert, return error to user

### Edge Case 5: Invalid Recipient Email
**Scenario:** Recipient email format is invalid
**Expected Behavior:** Resend rejects with validation error
**Handling:** Validate emails before sending, return clear error

---

## Dependencies

### Prerequisites
- [ ] Resend account created ([resend.com](https://resend.com))
- [ ] API key generated from Resend dashboard
- [ ] Domain `mountarc.com` ownership verified
- [ ] Access to Vercel dashboard for environment variables

### Technical Dependencies
- Next.js project (already exists)
- Node.js 18+ (for Resend SDK compatibility)
- npm or yarn package manager

### Blocks
- US-002 (Email Templates) - needs Resend client to test
- US-003 (Email API Route) - needs Resend client to send emails

---

## Technical Notes

### Installation
```bash
npm install resend
```

### Environment Variables
Create `.env.local` for local development:
```
RESEND_API_KEY=re_xxxxxxxx
RECIPIENT_EMAIL=nileshgupta96g@gmail.com
```

Production (Vercel):
```
RESEND_API_KEY=re_xxxxxxxx
RECIPIENT_EMAIL=contact@mountarc.com
```

### Resend Client Initialization
```javascript
// lib/resend.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;
```

### Domain Verification
1. Log into Resend dashboard
2. Go to Domains section
3. Add `mountarc.com`
4. Add DNS records provided by Resend to domain DNS settings
5. Verify domain status (may take 24-48 hours)

### Testing Setup
```javascript
// Test file to verify integration
import resend from './lib/resend';

async function testResend() {
  try {
    const result = await resend.emails.send({
      from: 'noreply@mountarc.com',
      to: process.env.RECIPIENT_EMAIL,
      subject: 'Test Email - Resend Integration',
      html: '<p>This is a test email from MountArc website.</p>'
    });
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
```

---

## Design Notes

### File Structure
```
mountarc-website/
├── lib/
│   └── resend.js          # Resend client initialization
├── .env.local             # Local environment variables
├── .env.example           # Example env file for reference
└── package.json           # Include resend dependency
```

### Error Handling Strategy
- Always catch and log errors
- Never expose API keys in error messages
- Return user-friendly error messages to frontend
- Log full error details for debugging

---

## Testing Notes

### Manual Testing Checklist
- [ ] Install Resend package successfully
- [ ] Configure environment variables
- [ ] Initialize Resend client without errors
- [ ] Send test email to testing recipient
- [ ] Verify email arrives in inbox (not spam)
- [ ] Test with invalid API key (should fail gracefully)
- [ ] Test with invalid recipient email (should fail with clear error)
- [ ] Verify environment variable switching (testing vs production)

### Test Data
**Testing Email:** nileshgupta96g@gmail.com
**From Email:** noreply@mountarc.com
**Test Subject:** "Test Email - Resend Integration"
**Test Body:** Simple HTML message

---

## Validation Rules

### API Key Validation
- Must start with `re_`
- Must be stored server-side only (NEVER in client code)
- Must be present in environment variables

### Email Validation
- Must be valid email format
- Must not be empty
- Must not contain special characters except @ and .

---

## Security Considerations

### Critical Security Requirements
- ⚠️ **NEVER** expose `RESEND_API_KEY` in client-side code
- ⚠️ API key must only be in server-side environment variables
- ⚠️ Don't log API key in error messages or console logs
- ⚠️ Use `.env.local` for local dev (gitignored)
- ⚠️ Add `.env.local` to `.gitignore` if not already present

### Best Practices
- Rotate API key periodically
- Use different API keys for testing vs production (if available)
- Monitor usage in Resend dashboard
- Set up alerts for unusual activity

---

## Definition of Done

- [ ] Resend npm package installed and in `package.json`
- [ ] Environment variables configured (local and Vercel)
- [ ] Resend client initialized in `lib/resend.js`
- [ ] Domain verification completed (verified in Resend dashboard)
- [ ] Test email sent successfully
- [ ] Email arrives in inbox (not spam)
- [ ] Error handling implemented and tested
- [ ] Documentation updated (README or comments)
- [ ] Code committed to git
- [ ] Reviewed by at least one team member

---

## Open Questions

1. **Domain Verification Timeline:** How long will domain verification take?
   - **Answer:** Usually 24-48 hours, start immediately

2. **API Key Management:** Should we use different keys for testing vs production?
   - **Answer:** Resend free tier has one key; use environment variables to control recipient

3. **Monitoring:** How to monitor email delivery rates?
   - **Answer:** Use Resend dashboard - provides delivery stats, bounce rates, etc.

4. **Fallback Plan:** What if Resend is down?
   - **Answer:** Display error message, provide mailto: link as backup contact method

---

## Related Stories

- **Depends On:** None (foundational story)
- **Blocks:** US-002 (Email Templates), US-003 (Email API Route)
- **Related:** All form submission stories (Epic 2, 3, 4)

---

## References

- [Resend Documentation](https://resend.com/docs)
- [Resend Node.js SDK](https://resend.com/docs/send-with-nodejs)
- [Resend Dashboard](https://resend.com/overview)
- [PRD - Email Infrastructure](../../PRD.md#feature-1-email-infrastructure)

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0