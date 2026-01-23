# User Story: Booking Submission & Follow-up Workflow

**ID:** US-010
**Epic:** [Epic 3 - Discovery Call Booking System](./README.md)
**Priority:** Must Have
**Persona:** All Users + MountArc Team
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **potential client**,
I want to **submit my discovery call booking and receive confirmation**,
So that **I know my request was received and what to expect next**.

---

## Acceptance Criteria

### User Perspective

**Given** I have filled out the booking form with valid data
**When** I click "Request Discovery Call"
**Then** the button shows loading state ("Requesting...")
**And** my booking data is sent to `/api/send-email`
**And** I am redirected to `/thank-you` page
**And** I receive a confirmation email explaining next steps

### Team Perspective

**Given** a user submits a discovery call booking
**When** the form is successfully submitted
**Then** the team receives an email notification with all booking details:
- Name, email, phone
- Preferred date/time
- Project description
- Budget range
- Timestamp and page URL
**And** the team can use this information to prepare for outreach

---

## Technical Notes

### API Request Payload

```javascript
// POST /api/send-email
{
  "type": "discovery",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "preferredTime": "Next Tuesday afternoon, 2-4pm EST",
    "description": "I want to build a SaaS platform for...",
    "budgetRange": "$10,000 - $25,000",
    "timestamp": "2026-01-22T14:30:00.000Z",
    "pageUrl": "https://mountarc-website-final.vercel.app/book-call"
  },
  "recaptchaToken": "03AGdBq24..."
}
```

### Email Templates Used
- **Email C:** Discovery Call → Team Notification
- **Email D:** Discovery Call → User Confirmation

### Manual Follow-up Workflow (Not Automated)
1. Team receives booking notification email
2. Team member reviews booking details
3. Team reaches out via phone or email within 24 hours
4. Team confirms or proposes alternative time
5. Team sends calendar invite manually (Google Calendar, Outlook, etc.)
6. Discovery call happens at scheduled time

---

## Edge Cases

### Edge Case 1: Timezone Not Specified
**Scenario:** User says "Tuesday 2pm" without timezone
**Expected Behavior:** Team asks for timezone during follow-up
**Handling:** Accept any format, team clarifies manually

### Edge Case 2: Past Date Requested
**Scenario:** User requests a date that has already passed
**Expected Behavior:** Accept submission, team proposes alternative
**Handling:** No client-side date validation, team handles manually

### Edge Case 3: Very Short Preferred Time
**Scenario:** User types "ASAP" or "anytime"
**Expected Behavior:** Validation passes (10+ chars), team proposes times
**Handling:** Minimum 10 characters required, flexible format

---

## Definition of Done

- [ ] Form submission implemented
- [ ] API integration working (`type: "discovery"`)
- [ ] reCAPTCHA token sent with request
- [ ] Loading state displayed
- [ ] Success redirects to `/thank-you`
- [ ] Both emails sent (team + user)
- [ ] Error handling implemented
- [ ] Tested end-to-end
- [ ] Code reviewed and committed

---

## Related Stories

- **Depends On:** US-001, US-002, US-003, US-008, US-009
- **Similar To:** US-007 (Contact Form Submission)

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Version:** 1.0