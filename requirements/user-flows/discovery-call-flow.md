# User Flow: Discovery Call Booking

**Flow Name:** Discovery Call Booking
**Primary Actor:** Potential Client (Startup Founder / Small Business Owner)
**Trigger:** User wants to schedule a consultation with MountArc
**Goal:** Successfully book discovery call and receive confirmation
**Related Epic:** [Epic 3 - Discovery Call Booking System](../epics/epic-3-discovery-call/README.md)

---

## Happy Path Flow

```
1. User navigates to /book-call
2. User reads "What to Expect" section
3. User fills all 6 required fields:
   - Name
   - Email
   - Phone (required for calls)
   - Preferred Date/Time
   - Project Description
   - Budget Range
4. Real-time validation shows green checkmarks
5. User clicks "Request Discovery Call"
6. Button shows "Requesting..." with spinner
7. reCAPTCHA v3 runs invisibly
8. Form data sent to API
9. API sends 2 emails:
   - Email C: Team notification with booking details
   - Email D: User confirmation explaining next steps
10. User redirected to /thank-you page
11. Success confirmation displayed
12. Team receives booking notification
13. Team reaches out within 24 hours to schedule
14. Team sends calendar invite manually
15. Discovery call happens at scheduled time
```

---

## Key Differences from Contact Form

**Required Phone:** Unlike contact form, phone is required here
**Preferred Time Field:** New text field for scheduling preferences
**Required Budget:** Budget is required (optional in contact form)
**Manual Scheduling:** Team manually confirms and schedules (no automation)

---

## Detailed Steps

### Step 1-2: Page Access & Information
- User clicks "Book a Call" link or navigates to `/book-call`
- Page loads with heading, "What to Expect" section, booking form
- User reads benefits: 30-45 min consultation, no pressure, free

### Step 3-4: Form Filling
- User enters all 6 required fields
- Phone validation requires country code (e.g., +1234567890)
- Preferred time accepts any format (user enters in plain text)
- Project description must be 20-250 characters
- Budget range selected from dropdown (required)

### Step 5-9: Submission
- Same process as contact form
- reCAPTCHA v3, API validation, email sending
- API endpoint: `/api/send-email` with `type: "discovery"`

### Step 10-11: Confirmation
- Redirect to `/thank-you` page
- User sees success message and next steps

### Step 12-15: Manual Follow-up (Not Automated)
- Team reviews booking details from Email C
- Team member calls or emails within 24 hours
- Team proposes confirmed time or alternative
- Team sends calendar invite (Google Calendar, Outlook, etc.)
- Call happens at scheduled time

---

## Alternative Flows

### Validation Error - Phone Missing
```
1. User fills all fields except phone
2. User attempts to submit
3. Error: "Phone number is required for booking a call"
4. User adds phone number with country code
5. Validation passes → Submission succeeds
```

### Invalid Preferred Time Format
```
1. User types "ASAP" (too short, <10 chars)
2. Validation error: "Please provide your preferred date and time"
3. User types "Next Tuesday afternoon, 2-4pm EST" (valid)
4. Validation passes
```

### Rate Limit (Same Email as Contact Form)
```
1. User submits contact form at 2:00 PM
2. User goes to /book-call and submits at 2:03 PM
3. Same email used, < 5 minutes elapsed
4. API returns 429: "Please wait before submitting again"
5. Rate limit applies across all form types
```

---

## Success Criteria

- ✅ User can easily book a discovery call
- ✅ All necessary information collected (phone, preferred time, budget)
- ✅ User receives confirmation email
- ✅ Team has all info needed to prepare for call
- ✅ Team responds within 24 hours

---

## Related Documentation

- [Epic 3: Discovery Call Booking](../epics/epic-3-discovery-call/README.md)
- [PRD - Discovery Call Booking](../PRD.md#feature-3-discovery-call-booking-page)

---

**Created By:** Business Analyst
**Date:** 2026-01-22
**Version:** 1.0