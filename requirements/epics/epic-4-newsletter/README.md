# Epic 4: Newsletter Subscription System

**Epic ID:** EPIC-4
**Epic Name:** Newsletter Subscription System
**Priority:** Must Have
**Status:** Not Started
**Target Completion:** February 10, 2026

---

## Epic Overview

Build a newsletter subscription system with a footer signup form (present on all pages), welcome email automation, and unsubscribe functionality. This enables MountArc to build an email list for marketing and community engagement.

---

## Business Value

**Problem:** No way to build an email list for content marketing and community engagement.

**Solution:** Simple, low-friction newsletter signup in footer with automated welcome emails.

**Value:**
- Build email list for marketing
- Engage community with bi-weekly content
- Nurture leads over time
- Establish thought leadership
- Cost-effective marketing channel

---

## User Personas Impacted

### Primary Persona
- **Blog Reader / Community Member:** Follows MountArc content, wants updates

### Secondary
- **Startup Founder / Business Owner:** May subscribe to stay informed

---

## Scope

### In Scope
✅ Footer newsletter signup form (all pages)
✅ Email-only signup (maximum simplicity)
✅ Single opt-in (no double opt-in)
✅ Welcome email automation
✅ Unsubscribe page (`/unsubscribe`)
✅ Email notifications to team on new subscribers
✅ reCAPTCHA v3 spam protection
✅ Success/error feedback inline

### Out of Scope
❌ Email marketing platform integration (Mailchimp, ConvertKit)
❌ Subscriber database/management
❌ Newsletter sending functionality
❌ Email preference center
❌ Segmentation by interest
❌ A/B testing
❌ Subscription analytics dashboard

---

## Features

### Newsletter Signup Form

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Email | Email | Yes | Valid email format |
| Timestamp | Hidden | Auto | ISO 8601 format |
| Page URL | Hidden | Auto | Current page URL |

### Unsubscribe Form

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Email | Email | Yes | Valid email format |

---

## Success Criteria

### Functional
- [ ] Newsletter form visible in footer on all pages
- [ ] Email validation works
- [ ] Form submits to API successfully
- [ ] Welcome email sent to subscriber
- [ ] Team notification sent
- [ ] Success message displays inline
- [ ] Unsubscribe page functional
- [ ] Unsubscribe confirmation works

### User Experience
- [ ] Signup takes < 5 seconds
- [ ] Clear value proposition ("bi-weekly insights")
- [ ] Inline feedback (no page reload)
- [ ] Mobile-friendly
- [ ] Easy unsubscribe (one click from email)

### Technical
- [ ] Form integrated in footer component
- [ ] reCAPTCHA v3 protection
- [ ] API integration working
- [ ] Emails sending correctly

---

## Dependencies

### Technical Dependencies
- Epic 1 (Email Infrastructure) - **MUST BE COMPLETE**
- Footer component (likely already exists)
- reCAPTCHA v3

### Blocks
- None (standalone feature)

---

## User Stories

This epic contains the following user stories:

- [US-011: Footer Newsletter Signup Form](./US-011-footer-signup.md)
- [US-012: Welcome Email Automation](./US-012-welcome-email.md)
- [US-013: Unsubscribe Page](./US-013-unsubscribe-page.md)

**Total Stories:** 3
**Story Points:** TBD

---

## Acceptance Criteria

### Epic-Level Acceptance Criteria

**Given** I am a blog reader interested in MountArc's content
**When** I scroll to the footer on any page
**Then** I see a newsletter signup section
**And** clear value proposition ("bi-weekly insights, no spam")
**And** a simple email input field
**And** a "Subscribe" button

**Given** I enter my email and click Subscribe
**When** the form is submitted
**Then** inline success message appears ("✓ Thanks! Check your email")
**And** I receive a welcome email immediately
**And** the team is notified of new subscriber
**And** my email is stored for future newsletters (manual management in Phase 1)

**Given** I want to unsubscribe from the newsletter
**When** I click the unsubscribe link in an email
**Then** I am taken to `/unsubscribe` page
**And** I can enter my email to confirm unsubscribe
**And** I see confirmation message after unsubscribing

---

## User Flows

### Signup Flow
```
1. User browses website (any page)
2. User scrolls to footer
3. User sees "Stay Updated" newsletter section
4. User enters email
5. User clicks "Subscribe"
6. Button shows loading ("Subscribing...")
7. reCAPTCHA v3 runs invisibly
8. Form submits to API
9. API sends 2 emails (team notification + welcome email)
10. Success message appears inline ("✓ Thanks! Check your email")
11. Email field clears
12. User receives welcome email
```

### Unsubscribe Flow
```
1. User receives newsletter email
2. User clicks "Unsubscribe" link in email footer
3. User lands on /unsubscribe page
4. Page shows "Unsubscribe from Newsletter" heading
5. User enters email address
6. User clicks "Unsubscribe" button
7. System removes email from list (manual for Phase 1)
8. Success message appears ("You've been unsubscribed")
9. User no longer receives newsletters
```

---

## Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Spam signups | Medium | High | reCAPTCHA v3, rate limiting |
| Low signup rate | Low | Medium | Clear value prop, prominent placement |
| Manual list management burden | Medium | High | Document process, plan Mailchimp integration for Phase 2 |
| Unsubscribe link missing | High | Low | Test all email templates, required by law |

---

## Testing Strategy

### Manual Testing
- [ ] Footer appears on all pages (home, contact, book-call, etc.)
- [ ] Signup form submits successfully
- [ ] Welcome email received in inbox
- [ ] Team notification received
- [ ] Success message displays inline
- [ ] Unsubscribe page accessible
- [ ] Unsubscribe confirmation works
- [ ] Mobile responsive

---

## Non-Functional Requirements

### Performance
- Footer doesn't slow page load
- Form submission < 1 second response
- Inline feedback (no page reload)

### Compliance
- **CAN-SPAM Act:** Unsubscribe link in all emails
- **GDPR:** Clear consent, easy unsubscribe (covered by unsubscribe page)

### Security
- reCAPTCHA v3
- Email validation
- Rate limiting (1 signup per email)

---

## Design Requirements

### Footer Newsletter Section

**Heading:** "Stay Updated"

**Description:** "Get bi-weekly insights on web development, AI, and building successful products. No spam, ever."

**Elements:**
- Email input field (inline with button)
- Subscribe button
- Success/error message area
- Newsletter details:
  - "Bi-weekly updates"
  - "Blog posts, resources, case studies"
  - "Unsubscribe anytime"

**Visual Design:**
- Fits existing footer design
- Visually distinct but integrated
- Mint green subscribe button
- Clear visual feedback

### Unsubscribe Page

**Heading:** "Unsubscribe from Newsletter"

**Message:** "We're sorry to see you go! Enter your email below to unsubscribe from our newsletter."

**Elements:**
- Email input field
- Unsubscribe button
- Success confirmation
- Optional: "Changed your mind? Re-subscribe on our website"

---

## Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Footer form implemented | Feb 8, 2026 | Pending |
| Welcome email automation | Feb 9, 2026 | Pending |
| Unsubscribe page | Feb 10, 2026 | Pending |
| Testing complete | Feb 10, 2026 | Pending |

---

## Definition of Done

- [ ] All 3 user stories completed
- [ ] Footer newsletter form on all pages
- [ ] Form submits successfully
- [ ] Welcome email sends
- [ ] Team notification sends
- [ ] Unsubscribe page functional
- [ ] Mobile responsive
- [ ] Tested end-to-end
- [ ] Code reviewed and committed
- [ ] PM approval received

---

## Notes

### Newsletter Management (Phase 1)
- **Subscriber Storage:** Manual list in spreadsheet or email folder
- **Sending Newsletters:** Manual process (Resend or email client)
- **Future Enhancement:** Integrate Mailchimp/ConvertKit for automation

### Legal Compliance
- Must include unsubscribe link in all newsletter emails
- CAN-SPAM Act requires physical address (add to email footer)
- GDPR compliant (clear consent, easy unsubscribe)

---

## Related Documentation

- [PRD - Newsletter Subscription](../../PRD.md#feature-4-newsletter-subscription-footer)
- [PRD - Unsubscribe Page](../../PRD.md#feature-6-unsubscribe-page)
- [Epic 1: Email Infrastructure](../epic-1-email/README.md)

---

**Epic Owner:** Business Analyst
**Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0