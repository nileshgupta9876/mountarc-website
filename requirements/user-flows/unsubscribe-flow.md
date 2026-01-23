# User Flow: Newsletter Unsubscribe

**Flow Name:** Newsletter Unsubscribe
**Primary Actor:** Newsletter Subscriber
**Trigger:** User wants to stop receiving newsletters
**Goal:** Successfully unsubscribe from newsletter
**Related Epic:** [Epic 4 - Newsletter Subscription System](../epics/epic-4-newsletter/README.md)

---

## Happy Path Flow

```
1. User receives newsletter email from MountArc
2. User scrolls to email footer
3. User clicks "Unsubscribe" link
4. Link opens /unsubscribe page in browser
5. Page loads with heading and explanation
6. User enters email address
7. User clicks "Unsubscribe" button
8. Button shows "Unsubscribing..." (loading state)
9. System processes unsubscribe request
10. Success message displayed
11. Email removed from subscriber list
12. Confirmation message: "You've been unsubscribed"
13. Option shown to re-subscribe or return to website
14. User no longer receives newsletters
```

---

## Detailed Steps

### Step 1-3: Unsubscribe Initiation
- User in email inbox reading MountArc newsletter
- Scrolls to bottom of email
- Sees unsubscribe link: "Unsubscribe from this list"
- Clicks link

### Step 4-5: Unsubscribe Page Load
- Browser opens `/unsubscribe` page
- Page shows:
  - Heading: "Unsubscribe from Newsletter"
  - Message: "We're sorry to see you go!"
  - Email input field
  - Unsubscribe button

### Step 6-8: Form Submission
- User enters their email address
- User clicks red "Unsubscribe" button
- Button disabled, shows "Unsubscribing..."
- Form submits (Phase 1: logs request)

### Step 9-11: Processing
**Phase 1 (Manual):**
- System logs unsubscribe request
- Team manually removes email from list
- Success confirmation shown immediately to user

**Future (Automated):**
- API removes email from database
- Updates email marketing platform
- Confirmation email sent

### Step 12-13: Confirmation
- Success message replaces form
- "You've been unsubscribed. You won't receive any more newsletters from us."
- Alternative action: "Changed your mind? You can re-subscribe anytime on our website."
- Link back to homepage

### Step 14: Result
- User no longer receives newsletters
- Team removes from manual list (Phase 1)
- Unsubscribe recorded for compliance

---

## Alternative Flow: Pre-filled Email

**Future Enhancement:**
```
1. Unsubscribe link includes email parameter
2. URL: /unsubscribe?email=user@example.com
3. Email field pre-filled automatically
4. User only needs to click "Unsubscribe"
5. One-click unsubscribe (better UX)
```

**Phase 1:**
- Manual email entry (simpler implementation)
- User types email themselves

---

## Alternative Flow: Email Not Found

```
1. User enters email address
2. Clicks "Unsubscribe"
3. Email not in subscriber list
4. Success message shown anyway (don't reveal list membership)
5. "You've been unsubscribed" (or "not on list")
6. Privacy-friendly approach
```

---

## Alternative Flow: User Changes Mind

```
1. User lands on /unsubscribe page
2. Reads message "We're sorry to see you go"
3. Sees benefits reminder
4. Decides not to unsubscribe
5. Clicks "Back to homepage" link
6. Returns to website without unsubscribing
```

---

## Edge Cases

### Edge Case 1: Typo in Email
```
1. User types wrong email (typo)
2. Submits unsubscribe
3. Wrong email removed from list (if exists)
4. User's actual email still subscribed
5. User receives next newsletter
6. User tries again with correct email
```

### Edge Case 2: Already Unsubscribed
```
1. User clicks unsubscribe link again
2. Enters email
3. Email already removed
4. Success message shown anyway (idempotent)
5. No error (good UX)
```

### Edge Case 3: Never Subscribed
```
1. Random person visits /unsubscribe
2. Enters email
3. Email not in list
4. Success message shown (don't reveal)
5. Privacy maintained
```

---

## Unsubscribe Link Format

**In Email Footer:**
```
---
MountArc Private Limited
Website: https://mountarc-website-final.vercel.app
Email: contact@mountarc.com
LinkedIn: linkedin.com/company/mountarc

[Unsubscribe](https://mountarc-website-final.vercel.app/unsubscribe)
```

**Future Enhancement with Pre-fill:**
```
[Unsubscribe](https://mountarc-website-final.vercel.app/unsubscribe?email={{subscriber_email_encoded}})
```

---

## Legal Compliance

### CAN-SPAM Act Requirements
✅ Unsubscribe link in all newsletter emails
✅ Link functional and accessible
✅ Processing within 10 business days (instant in our case)
✅ No fee to unsubscribe
✅ No login required
✅ Physical address in email footer (add to email template)

### GDPR Compliance
✅ Easy unsubscribe (one or two clicks)
✅ No dark patterns
✅ No asking "why" as barrier
✅ Immediate effect
✅ Confirmation message

---

## Success Criteria

- ✅ Unsubscribe link present in all newsletter emails
- ✅ Unsubscribe process takes < 10 seconds
- ✅ Clear confirmation of unsubscribe
- ✅ No barriers or guilt trips
- ✅ User no longer receives emails
- ✅ Legal compliance (CAN-SPAM, GDPR)

---

## Phase 1 vs Future

### Phase 1 (Manual)
- User enters email on /unsubscribe page
- System logs request (console or simple file)
- Team manually removes from spreadsheet/email list
- User sees success message immediately
- Simple, compliant, functional

### Future (Automated)
- One-click unsubscribe (email pre-filled)
- Automated removal from database
- Integration with email marketing platform API
- Unsubscribe confirmation email
- Analytics (why they unsubscribed)
- Re-subscribe option

---

## Related Documentation

- [Epic 4: Newsletter Subscription](../epics/epic-4-newsletter/README.md)
- [US-013: Unsubscribe Page](../epics/epic-4-newsletter/US-013-unsubscribe-page.md)
- [PRD - Unsubscribe Page](../PRD.md#feature-6-unsubscribe-page)
- [CAN-SPAM Compliance](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)

---

**Created By:** Business Analyst
**Date:** 2026-01-22
**Version:** 1.0