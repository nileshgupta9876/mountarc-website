# Epic 1: Email Infrastructure Setup

**Epic ID:** EPIC-1
**Epic Name:** Email Infrastructure Setup
**Priority:** Must Have (Critical)
**Status:** Not Started
**Target Completion:** February 10, 2026

---

## Epic Overview

Implement a reliable, server-side email system using Resend for all transactional emails. This is the foundation for all contact, discovery call, and newsletter functionality. Without this infrastructure, none of the forms can function.

---

## Business Value

**Problem:** MountArc's website has no working email system, preventing all client communication.

**Solution:** Set up professional email infrastructure using Resend that handles 6 email types reliably.

**Value:**
- Enable lead capture and client communication
- Professional email delivery (99%+ success rate)
- Foundation for all Phase 1 features
- Scalable to 3,000 emails/month (free tier)

---

## User Personas Impacted

- **All Personas:** Startup Founders, Small Business Owners, Blog Readers
- **Internal:** MountArc team receiving notifications

---

## Scope

### In Scope
✅ Resend account setup and configuration
✅ Domain verification for email sending
✅ Email template creation (6 types)
✅ API route for email sending (`/api/send-email`)
✅ Environment configuration (testing/production)
✅ Error handling and logging
✅ Email delivery monitoring

### Out of Scope
❌ Email marketing platform integration
❌ Email tracking (opens, clicks)
❌ Rich HTML email builder
❌ Email scheduling/delayed sending
❌ Email list management system

---

## Email Types (6 Total)

| Email | Type | To | Purpose |
|-------|------|-----|---------|
| **A** | Contact Form → Team | Team | Notify team of new contact submission |
| **B** | Contact Form → User | User | Auto-reply confirmation to user |
| **C** | Discovery Call → Team | Team | Notify team of new booking request |
| **D** | Discovery Call → User | User | Confirm booking request received |
| **E** | Newsletter → Team | Team | Notify team of new subscriber |
| **F** | Newsletter → User | User | Welcome email to new subscriber |

---

## Success Criteria

### Functional
- [ ] All 6 email types send successfully
- [ ] Emails deliver within 30 seconds
- [ ] Email templates are professional and branded
- [ ] Dynamic recipient routing works (testing/production)
- [ ] All email variables populate correctly
- [ ] Error handling returns clear messages

### Technical
- [ ] Resend SDK integrated correctly
- [ ] API route `/api/send-email` functional
- [ ] Server-side validation working
- [ ] Environment variables configured
- [ ] Rate limiting implemented
- [ ] Logging captures all email events

### Quality
- [ ] 99%+ email delivery rate
- [ ] Emails don't go to spam
- [ ] All links work in emails
- [ ] Mobile-responsive email templates
- [ ] Professional branding (logo, colors, footer)

---

## Dependencies

### Technical Dependencies
- Resend account (free tier) - [resend.com](https://resend.com)
- Next.js API routes (already available)
- Environment variables setup
- Domain verification for `mountarc.com`

### Prerequisite Work
- None (this is foundational work)

### Blocks
- **BLOCKS:** All form functionality (Epics 2, 3, 4)
- Without email infrastructure, forms cannot send notifications

---

## Technical Requirements

### Technology Stack
- **Email Service:** Resend (free tier - 3,000 emails/month)
- **SDK:** `resend` npm package (v2.x)
- **API:** Next.js API routes
- **Authentication:** API key (server-side only)

### Environment Variables
```
RESEND_API_KEY=re_xxxxx
RECIPIENT_EMAIL=nileshgupta96g@gmail.com (testing) / contact@mountarc.com (production)
```

### API Endpoint
**Route:** `POST /api/send-email`

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
  "error": "Error description"
}
```

---

## User Stories

This epic contains the following user stories:

- [US-001: Resend Integration Setup](./US-001-resend-integration.md)
- [US-002: Email Template Creation](./US-002-email-templates.md)
- [US-003: Email API Route Implementation](./US-003-email-api-route.md)

**Total Stories:** 3
**Story Points:** TBD (to be estimated by Engineering)

---

## Acceptance Criteria

### Epic-Level Acceptance Criteria

**Given** the email infrastructure is fully set up
**When** a form is submitted on the website
**Then** the corresponding emails are sent to both team and user within 30 seconds
**And** emails deliver successfully (99%+ rate)
**And** all email content is correctly formatted with proper branding
**And** all variable placeholders are replaced with actual data

**Given** an email sending error occurs
**When** the system attempts to send an email
**Then** a clear error message is returned to the API caller
**And** the error is logged for debugging
**And** the user sees a friendly error message

**Given** environment is set to testing mode
**When** any email is sent
**Then** it goes to `nileshgupta96g@gmail.com`

**Given** environment is set to production mode
**When** any email is sent to the team
**Then** it goes to `contact@mountarc.com`

---

## Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Email deliverability issues | High | Medium | Use Resend (professional service), verify domain properly |
| API key exposure | High | Low | Server-side only, never expose to client |
| Rate limiting by Resend | Medium | Low | Monitor usage, stay within free tier limits |
| Domain verification delays | Medium | Medium | Start verification process early |

---

## Testing Strategy

### Unit Testing
- Test email template rendering with various data
- Test API route with valid/invalid inputs
- Test error handling scenarios

### Integration Testing
- Test end-to-end email sending
- Verify emails deliver to inbox (not spam)
- Test with real email addresses
- Verify all 6 email types work

### Manual Testing
- Send test emails for each type
- Verify content and formatting
- Check mobile rendering
- Test error scenarios

---

## Non-Functional Requirements

### Performance
- Email sending: < 2 seconds API response time
- Email delivery: < 30 seconds to inbox
- API endpoint: Handle 10 concurrent requests

### Reliability
- 99%+ email delivery rate
- Graceful error handling
- Retry logic for transient failures

### Security
- API key stored server-side only
- Input validation on all email data
- XSS prevention in email content
- Rate limiting to prevent abuse

### Maintainability
- Clean, documented code
- Reusable email template structure
- Easy to add new email types
- Clear error messages for debugging

---

## Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Resend account setup | Feb 1, 2026 | Pending |
| Email templates created | Feb 5, 2026 | Pending |
| API route implemented | Feb 8, 2026 | Pending |
| Testing complete | Feb 10, 2026 | Pending |

---

## Definition of Done

- [ ] All 3 user stories completed
- [ ] All 6 email types implemented and tested
- [ ] Resend account configured and verified
- [ ] API route tested with all email types
- [ ] Error handling tested and working
- [ ] Documentation updated
- [ ] Code reviewed and committed
- [ ] Integration tested end-to-end
- [ ] PM approval received

---

## Notes

- **Critical Path:** This epic blocks all other form-related epics
- **Priority:** Must complete before any form implementation
- **Testing Email:** Use `nileshgupta96g@gmail.com` for all testing
- **Production Email:** `contact@mountarc.com` for production
- **Free Tier Limit:** 3,000 emails/month (sufficient for Phase 1)

---

## Related Documentation

- [PRD - Feature 1: Email Infrastructure](../../PRD.md#feature-1-email-infrastructure)
- [PM Decision: Email Service Provider Selection](../../../decisions/pm/20260122_email-service-provider.md)
- [Resend Documentation](https://resend.com/docs)

---

**Epic Owner:** Business Analyst
**Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0