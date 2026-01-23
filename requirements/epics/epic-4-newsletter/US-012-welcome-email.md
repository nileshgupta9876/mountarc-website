# User Story: Welcome Email Automation

**ID:** US-012
**Epic:** [Epic 4 - Newsletter Subscription System](./README.md)
**Priority:** Must Have
**Persona:** Newsletter Subscriber
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **new newsletter subscriber**,
I want to **receive a welcome email immediately after subscribing**,
So that **I know my subscription was successful and what to expect**.

---

## Acceptance Criteria

**Given** I have just subscribed to the newsletter
**When** the subscription is processed
**Then** I receive a welcome email within 30 seconds
**And** the email thanks me for subscribing
**And** explains what to expect (bi-weekly updates)
**And** includes a link to the latest blog post
**And** has an unsubscribe link in the footer

**Given** the team needs to track new subscribers
**When** someone subscribes
**Then** the team receives a notification email
**And** the email includes subscriber email, timestamp, and source page

---

## Technical Notes

### Email Templates (Already Created in Epic 1)
- **Email E:** Newsletter → Team Notification
- **Email F:** Newsletter → Welcome Email

### API Integration
The API route (`/api/send-email`) already handles newsletter type:

```javascript
// API handles type: "newsletter"
{
  "type": "newsletter",
  "data": {
    "email": "subscriber@example.com",
    "timestamp": "2026-01-22T14:30:00.000Z",
    "pageUrl": "https://mountarc-website-final.vercel.app/"
  },
  "recaptchaToken": "..."
}
```

The API sends both emails:
1. **Email E** to team (`process.env.RECIPIENT_EMAIL`)
2. **Email F** to subscriber

---

## Definition of Done

- [ ] Welcome email template verified (Email F from Epic 1)
- [ ] Team notification template verified (Email E from Epic 1)
- [ ] API integration tested with newsletter type
- [ ] Both emails send on subscription
- [ ] Welcome email arrives within 30 seconds
- [ ] Unsubscribe link present in welcome email
- [ ] Tested end-to-end
- [ ] Code reviewed

---

## Related Stories

- **Depends On:** US-001, US-002, US-003 (Email templates already created)
- **Related:** US-011 (Footer signup triggers these emails)

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Version:** 1.0