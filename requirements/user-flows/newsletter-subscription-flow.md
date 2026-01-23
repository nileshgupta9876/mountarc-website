# User Flow: Newsletter Subscription

**Flow Name:** Newsletter Subscription
**Primary Actor:** Blog Reader / Community Member
**Trigger:** User wants to receive bi-weekly updates from MountArc
**Goal:** Successfully subscribe to newsletter and receive welcome email
**Related Epic:** [Epic 4 - Newsletter Subscription System](../epics/epic-4-newsletter/README.md)

---

## Happy Path Flow

```
1. User browses website (any page)
2. User scrolls to footer
3. User sees "Stay Updated" newsletter section
4. User reads value proposition: "bi-weekly insights, no spam"
5. User enters email address
6. User clicks "Subscribe" button
7. Button shows "Subscribing..." (loading state)
8. reCAPTCHA v3 runs invisibly
9. Form data sent to API (type: "newsletter")
10. API sends 2 emails:
    - Email E: Team notification (new subscriber)
    - Email F: Welcome email to subscriber
11. Inline success message appears: "✓ Thanks! Check your email"
12. Email field clears
13. User remains on same page (no redirect)
14. User receives welcome email within 30 seconds
15. User receives newsletters bi-weekly going forward
```

---

## Key Differences from Other Forms

**Footer Placement:** Appears on all pages (not dedicated page)
**Minimal Fields:** Only email (maximum simplicity)
**Inline Feedback:** Success/error shown inline (no page redirect)
**No Thank You Page:** Stays on current page
**Single Opt-in:** No double opt-in confirmation required

---

## Detailed Steps

### Step 1-4: Discovery
- User on any page (home, contact, blog, etc.)
- Scrolls to footer
- Sees newsletter signup section
- Reads benefits and frequency (bi-weekly)

### Step 5-8: Subscription
- User types email into input field
- Clicks "Subscribe" button
- Button disabled, shows loading text
- reCAPTCHA v3 executes in background

### Step 9-10: API Processing
- POST to `/api/send-email` with `type: "newsletter"`
- Payload: `{ email, timestamp, pageUrl }`
- API sends welcome email (Email F) to subscriber
- API sends notification (Email E) to team

### Step 11-13: Inline Confirmation
- Success message appears below form
- Green checkmark + "Thanks! Check your email for confirmation"
- Email input field clears
- User stays on same page (no navigation)

### Step 14: Email Delivery
- Welcome email delivered to subscriber inbox
- Email explains what to expect (bi-weekly updates)
- Includes unsubscribe link in footer
- Team notification received

### Step 15: Ongoing
- Subscriber receives bi-weekly newsletters (manual sending in Phase 1)
- Can unsubscribe anytime via link in emails

---

## Alternative Flows

### Invalid Email
```
1. User types "notanemail" (invalid format)
2. Input field shows red border (real-time validation)
3. User attempts to submit
4. HTML5 validation prevents submission
5. Message: "Please enter a valid email address"
6. User corrects email
7. Submission succeeds
```

### Already Subscribed
```
1. User who previously subscribed enters email again
2. User clicks Subscribe
3. API accepts submission (idempotent)
4. Sends welcome email again (user gets reminder)
5. Success message shown
6. No duplicate entry issue (manual list management)
```

### Network Error
```
1. User enters email, clicks Subscribe
2. Network request fails
3. Inline error message: "✗ Oops! Please try again."
4. Button re-enabled
5. User can retry
```

### Rate Limit
```
1. User subscribes at 3:00 PM
2. User tries to subscribe again at 3:02 PM (same email)
3. API rate limit triggered
4. Error: "Please wait before submitting again"
5. User must wait until 3:05 PM
```

---

## Mobile Experience

```
1. User on mobile device (any page)
2. Scrolls to footer
3. Newsletter section stacks vertically on mobile
4. Email input: Full width
5. Subscribe button: Full width below input
6. Taps Subscribe (touch-friendly button)
7. Success message appears inline
8. No page scroll or navigation disruption
```

---

## Success Criteria

- ✅ Newsletter signup visible on all pages
- ✅ Subscription takes < 5 seconds
- ✅ Inline feedback (no page reload)
- ✅ Welcome email delivered within 30 seconds
- ✅ Clear value proposition
- ✅ Mobile-friendly

---

## Subscriber Management (Phase 1)

**Manual Process:**
1. Team receives Email E notification for each new subscriber
2. Team maintains spreadsheet or email list with subscriber emails
3. Team sends newsletters manually via Resend or email client
4. Team manually removes unsubscribes

**Future Enhancement:**
- Integrate with Mailchimp or ConvertKit
- Automated newsletter sending
- Subscriber database with preferences
- Analytics and engagement tracking

---

## Related Documentation

- [Epic 4: Newsletter Subscription](../epics/epic-4-newsletter/README.md)
- [US-011: Footer Newsletter Signup](../epics/epic-4-newsletter/US-011-footer-signup.md)
- [PRD - Newsletter Subscription](../PRD.md#feature-4-newsletter-subscription-footer)

---

**Created By:** Business Analyst
**Date:** 2026-01-22
**Version:** 1.0