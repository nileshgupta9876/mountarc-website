# Epic 3: Discovery Call Booking System

**Epic ID:** EPIC-3
**Epic Name:** Discovery Call Booking System
**Priority:** Must Have (Critical)
**Status:** Not Started
**Target Completion:** February 7, 2026

---

## Epic Overview

Build a dedicated booking page (`/book-call`) that allows potential clients to request discovery calls with MountArc. This streamlines the consultation booking process and collects necessary information upfront to prepare for productive calls.

---

## Business Value

**Problem:** No structured way for potential clients to book consultation calls, leading to back-and-forth emails and scheduling friction.

**Solution:** Dedicated discovery call booking page with structured form to capture all necessary information.

**Value:**
- Streamline consultation booking process
- Collect project details before the call
- Reduce scheduling friction
- Show professionalism and organization
- Increase conversion from visitor to qualified lead

---

## User Personas Impacted

### Primary Personas
- **Startup Founder:** Wants quick way to schedule consultation without email back-and-forth
- **Small Business Owner:** Prefers scheduled calls over cold outreach

### Secondary
- **MountArc Team:** Receives bookings with context to prepare for calls

---

## Scope

### In Scope
✅ `/book-call` page with booking form
✅ 8 form fields (6 required, 2 auto-captured)
✅ Real-time validation
✅ reCAPTCHA v3 spam protection
✅ Form submission to email API
✅ Success page redirect (`/thank-you`)
✅ Email notifications (team + user)
✅ Manual scheduling workflow (team reaches out to schedule)
✅ Mobile-responsive design

### Out of Scope
❌ Calendar integration (Calendly, Cal.com)
❌ Automatic scheduling/time slot selection
❌ Timezone conversion
❌ Video call link generation
❌ Calendar invite sending
❌ Reminder emails
❌ Rescheduling functionality

---

## Features

### Discovery Call Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | Text | Yes | Min 2 chars |
| Email | Email | Yes | Valid email format |
| Phone | Tel | Yes | Country code required |
| Preferred Date/Time | Text | Yes | Min 10 chars |
| Project Description | Textarea | Yes | 20-250 characters |
| Budget Range | Dropdown | Yes | Predefined options |
| Timestamp | Hidden | Auto | ISO 8601 format |
| Page URL | Hidden | Auto | Current page URL |

### Key Differences from Contact Form
- **Phone Required:** Booking a call requires phone number
- **Preferred Time Field:** Text input for scheduling preferences
- **Budget Required:** Helps team prepare for call
- **No Project Type:** Description field covers this

---

## Success Criteria

### Functional
- [ ] Booking page accessible at `/book-call` URL
- [ ] All 8 fields present and functional
- [ ] Real-time validation works
- [ ] Phone number required (unlike contact form)
- [ ] Form submits successfully to API
- [ ] Both emails sent (team notification + user confirmation)
- [ ] User redirected to `/thank-you` on success
- [ ] Error handling works correctly

### User Experience
- [ ] Clear explanation of what happens next
- [ ] Reassurance about 24-hour response time
- [ ] Call preparation tips visible
- [ ] Mobile-friendly layout
- [ ] Page loads in < 3 seconds

### Technical
- [ ] Form state managed with React Hook Form
- [ ] Validation with Zod
- [ ] reCAPTCHA v3 integrated
- [ ] API integration tested
- [ ] Matches website design

---

## Dependencies

### Technical Dependencies
- Epic 1 (Email Infrastructure) - **MUST BE COMPLETE**
- React Hook Form, Zod, reCAPTCHA v3
- Reuse validation and form patterns from Epic 2

### Blocks
- None (standalone feature after Epic 1)

---

## User Stories

This epic contains the following user stories:

- [US-008: Discovery Call Booking Page & Layout](./US-008-booking-page.md)
- [US-009: Booking Form Validation](./US-009-booking-validation.md)
- [US-010: Booking Submission & Follow-up Workflow](./US-010-booking-submission.md)

**Total Stories:** 3
**Story Points:** TBD (to be estimated by Engineering)

---

## Acceptance Criteria

### Epic-Level Acceptance Criteria

**Given** a potential client wants to book a discovery call
**When** they navigate to `/book-call`
**Then** they see a professional booking page
**And** clear explanation of the discovery call process
**And** the booking form with all required fields

**Given** a user fills out the booking form with valid data
**When** they submit the form
**Then** validation passes
**And** reCAPTCHA runs invisibly
**And** form data sent to API
**And** team receives notification email with all booking details
**And** user receives confirmation email explaining next steps
**And** user redirected to `/thank-you` page

**Given** the team receives a booking notification
**When** they review the booking details
**Then** they have all information needed (name, email, phone, preferred time, description, budget)
**And** they can reach out within 24 hours to schedule the call

---

## User Flow

### Happy Path: Successful Booking
```
1. User navigates to /book-call
2. User reads about discovery call process
3. User fills in all required fields
4. User suggests preferred date/time
5. Real-time validation shows green checkmarks
6. User clicks "Request Discovery Call"
7. Button shows loading ("Requesting...")
8. reCAPTCHA v3 runs invisibly
9. Form data sent to API
10. API sends 2 emails (team + user)
11. User redirected to /thank-you
12. Success confirmation shown
13. Team receives notification
14. Team reaches out within 24 hours
15. Call scheduled via email/phone
```

### Manual Follow-up Process (Not Automated)
```
1. Team receives booking notification email
2. Team reviews: name, email, phone, preferred time, project details, budget
3. Team member calls or emails client within 24 hours
4. Team confirms or proposes alternative time
5. Team sends calendar invite manually
6. Discovery call happens at scheduled time
```

---

## Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Users expect instant calendar booking | Medium | Medium | Clear messaging: "We'll confirm within 24 hours" |
| Invalid phone numbers submitted | Low | Medium | Validate phone format, require country code |
| Timezone confusion | Medium | High | Ask for timezone or location in preferred time field |
| Team misses bookings | High | Low | Clear email notifications, SLA monitoring |

---

## Testing Strategy

### Manual Testing
- [ ] Submit booking with all valid data
- [ ] Test phone validation (require country code)
- [ ] Test preferred time field (various formats)
- [ ] Test project description (20-250 chars)
- [ ] Test on mobile (iPhone, Android)
- [ ] Test keyboard navigation
- [ ] Test error scenarios

### Device Testing
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Desktop (Chrome, Firefox, Safari)

---

## Non-Functional Requirements

### Performance
- Page load: < 3 seconds (mobile)
- Form submission: < 2 seconds

### Accessibility
- Keyboard navigation
- Screen reader compatible
- Proper labels and ARIA attributes

### Security
- reCAPTCHA v3
- Input validation (client + server)
- Rate limiting (1 per 5 minutes)

---

## Design Requirements

### Page Layout
- Heading: "Book Your Free Discovery Call"
- Subheading: "Let's discuss your project - no pressure, no commitment"
- What to Expect section:
  - 30-45 minute consultation
  - Discuss goals and challenges
  - Get honest feedback and recommendations
  - No sales pressure
- Booking form
- Reassurance: "We'll confirm within 24 hours"

### Form Design
- Similar styling to contact form
- Centered, max-width 600px
- Dark theme + mint green
- Clear field labels
- Prominent submit button

---

## Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Page layout & UI | Feb 3, 2026 | Pending |
| Form validation | Feb 5, 2026 | Pending |
| API integration | Feb 7, 2026 | Pending |
| Testing complete | Feb 7, 2026 | Pending |

---

## Definition of Done

- [ ] All 3 user stories completed
- [ ] `/book-call` page accessible
- [ ] All form fields working
- [ ] Phone number validation working
- [ ] Form submits to API successfully
- [ ] Both emails sent and received
- [ ] Success redirect works
- [ ] Mobile responsive
- [ ] Code reviewed and committed
- [ ] PM approval received

---

## Notes

### Key Differences from Contact Form
1. **Phone Required:** Contact form has optional phone, booking requires it
2. **Preferred Time:** New field for scheduling preferences
3. **Budget Required:** Optional in contact form, required here
4. **Copy/Tone:** More focused on consultation value

### Form Copy

**Heading:** "Book Your Free Discovery Call"

**Subheading:** "Let's discuss your project - no pressure, no commitment"

**What to Expect:**
- 30-45 minute consultation
- Discuss your goals and challenges
- Get honest feedback and recommendations
- No sales pressure

**Submit Button:** "Request Discovery Call"

**Reassurance:** "We'll confirm your preferred time within 24 hours. All consultations are completely free."

---

## Related Documentation

- [PRD - Discovery Call Booking](../../PRD.md#feature-3-discovery-call-booking-page)
- [Epic 1: Email Infrastructure](../epic-1-email/README.md) (prerequisite)
- [Epic 2: Contact Form](../epic-2-contact-form/README.md) (similar patterns)

---

**Epic Owner:** Business Analyst
**Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0