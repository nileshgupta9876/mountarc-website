# Epic 5: Supporting Infrastructure

**Epic ID:** EPIC-5
**Epic Name:** Supporting Infrastructure
**Priority:** Must Have
**Status:** Not Started
**Target Completion:** February 14, 2026

---

## Epic Overview

Build essential supporting infrastructure including the thank you page (success confirmation), rate limiting system (spam prevention), and comprehensive error handling across all forms. These are foundational pieces that support all other epics.

---

## Business Value

**Problem:** Forms need success confirmation, spam prevention, and robust error handling to provide reliable user experience.

**Solution:** Unified supporting infrastructure that all forms depend on.

**Value:**
- Clear user confirmation of successful submissions
- Protection against spam and abuse
- Graceful handling of errors
- Professional, polished user experience
- System reliability and stability

---

## User Personas Impacted

**All personas** (this infrastructure supports all forms)

---

## Scope

### In Scope
✅ Thank you page (`/thank-you`)
✅ Success confirmation messaging
✅ Next steps and alternative actions
✅ Rate limiting system (1 submission per email per 5 minutes)
✅ Comprehensive error handling (validation, API, network)
✅ User-friendly error messages
✅ Logging for debugging

### Out of Scope
❌ Admin dashboard
❌ Form submission history/database
❌ Advanced analytics
❌ A/B testing infrastructure
❌ Performance monitoring dashboard
❌ Email delivery tracking (handled by Resend)

---

## Features

### 1. Thank You Page
- URL: `/thank-you`
- Success confirmation message
- What happens next (3-step process)
- Alternative actions (buttons/links)
- Responsive design

### 2. Rate Limiting
- 1 submission per email per 5 minutes
- Prevent spam and abuse
- Clear error message when triggered
- Applies to all forms (contact, discovery, newsletter)

### 3. Error Handling
- Client-side validation errors
- API/server errors
- Network timeouts
- reCAPTCHA failures
- Rate limit errors
- User-friendly error messages

---

## Success Criteria

### Functional
- [ ] Thank you page displays after successful submissions
- [ ] Page provides clear next steps
- [ ] Alternative actions are clickable
- [ ] Rate limiting prevents rapid submissions
- [ ] Rate limit error message is clear
- [ ] All error scenarios handled gracefully
- [ ] Error messages are user-friendly

### User Experience
- [ ] Success confirmation is clear and reassuring
- [ ] Users know what to expect next
- [ ] Error messages don't expose technical details
- [ ] Alternative contact methods shown on errors
- [ ] No confusing or cryptic errors

### Technical
- [ ] Rate limiting implemented in API
- [ ] Error handling covers all scenarios
- [ ] Logging captures important events
- [ ] Thank you page SEO optimized

---

## Dependencies

### Technical Dependencies
- Next.js routing
- API routes (Epic 1)
- All forms (Epics 2, 3, 4)

### Blocks
- None (this epic supports others but doesn't block them)

---

## User Stories

This epic contains the following user stories:

- [US-014: Thank You Page](./US-014-thank-you-page.md)
- [US-015: Rate Limiting System](./US-015-rate-limiting.md)
- [US-016: Error Handling & User Feedback](./US-016-error-handling.md)

**Total Stories:** 3
**Story Points:** TBD

---

## Acceptance Criteria

### Epic-Level Acceptance Criteria

**Given** I have successfully submitted a form (contact, discovery, or newsletter)
**When** the submission completes
**Then** I am redirected to `/thank-you` page
**And** I see a clear success message
**And** I see what happens next
**And** I have options for alternative actions

**Given** I submit a form and then immediately submit again
**When** the second submission is within 5 minutes
**Then** the API rejects it with 429 status
**And** I see a clear message "Please wait before submitting again"
**And** no duplicate emails are sent

**Given** an error occurs during form submission
**When** the error happens (validation, network, API, etc.)
**Then** I see a clear, user-friendly error message
**And** I am not shown technical error details
**And** I have options to retry or contact directly

---

## User Flows

### Success Flow (All Forms)
```
1. User submits form successfully
2. API processes and sends emails
3. User redirected to /thank-you
4. Success message displayed
5. Next steps explained
6. Alternative actions available
```

### Rate Limit Flow
```
1. User submits contact form successfully
2. User immediately tries to submit again
3. API checks rate limit (same email, <5 min)
4. API returns 429 error
5. Error message displayed: "Please wait before submitting again"
6. User must wait 5 minutes to resubmit
```

### Error Flow
```
1. User submits form
2. Error occurs (network, API, etc.)
3. Error caught and logged
4. User-friendly message displayed
5. Submit button re-enabled
6. Form data preserved
7. Alternative contact shown
8. User can retry
```

---

## Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Rate limiting too strict | Medium | Low | Set at 5 minutes (reasonable), can adjust |
| Users bypass rate limiting | Low | Low | Track by email + IP, server-side enforcement |
| Error messages too generic | Low | Medium | Balance user-friendliness with helpfulness |
| Thank you page not indexed | Low | Low | Add proper meta tags, sitemap entry |

---

## Testing Strategy

### Manual Testing
- [ ] Submit each form type → verify redirect to thank you page
- [ ] Submit form twice rapidly → verify rate limiting
- [ ] Disconnect network, submit form → verify error handling
- [ ] Submit with invalid reCAPTCHA → verify error message
- [ ] Test all error scenarios (timeout, API down, etc.)

---

## Non-Functional Requirements

### Performance
- Thank you page loads in < 2 seconds
- Rate limiting check adds < 10ms to API response
- Error handling doesn't slow down user experience

### Reliability
- Rate limiting persists across server restarts (Phase 1: in-memory is acceptable)
- Error handling catches all exception types
- No uncaught errors crash the application

### Usability
- Error messages are clear and actionable
- Thank you page is encouraging and helpful
- Users always know what to do next

---

## Design Requirements

### Thank You Page Design
- Clean, centered layout
- Large success heading
- Reassuring message
- Clear next steps (numbered list)
- Action buttons (explore services, view work, read blog)
- Alternative contact info

### Error Message Design
- Red border/background for error boxes
- Clear, concise error text
- No technical jargon
- Actionable (tell user what to do)
- Alternative contact always shown

---

## Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Thank you page | Feb 12, 2026 | Pending |
| Rate limiting | Feb 13, 2026 | Pending |
| Error handling | Feb 14, 2026 | Pending |
| Testing complete | Feb 14, 2026 | Pending |

---

## Definition of Done

- [ ] All 3 user stories completed
- [ ] Thank you page created and tested
- [ ] Rate limiting implemented in API
- [ ] Rate limiting tested (works correctly)
- [ ] Error handling implemented for all scenarios
- [ ] All error messages user-friendly
- [ ] Logging implemented
- [ ] Mobile responsive
- [ ] Tested end-to-end
- [ ] Code reviewed and committed
- [ ] PM approval received

---

## Notes

### Rate Limiting Strategy (Phase 1)
**In-Memory Cache:**
- Simple Map object tracking recent submissions
- Key: email address
- Value: timestamp of last submission
- Check: If (now - last submission) < 5 minutes, reject
- Cleanup: Remove entries older than 10 minutes periodically

**Future Enhancement:**
- Use Redis for distributed rate limiting
- More sophisticated algorithms (token bucket, sliding window)
- IP-based rate limiting as backup

### Error Logging
- Console logs (Vercel captures these)
- Log level: info, warn, error
- Include: timestamp, error type, user email (if applicable), error details
- Future: Integrate Sentry or LogRocket

---

## Related Documentation

- [PRD - Thank You Page](../../PRD.md#feature-5-thank-you-page)
- [PRD - Rate Limiting](../../PRD.md#rate-limiting)
- [PRD - Error Handling](../../PRD.md#error-handling)
- [Epic 1: Email Infrastructure](../epic-1-email/README.md) - API rate limiting implemented here

---

**Epic Owner:** Business Analyst
**Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0