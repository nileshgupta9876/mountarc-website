# Epic 2: Contact Form System

**Epic ID:** EPIC-2
**Epic Name:** Contact Form System
**Priority:** Must Have (Critical)
**Status:** Not Started
**Target Completion:** February 7, 2026

---

## Epic Overview

Build a comprehensive contact form page (`/contact`) that allows potential clients to reach MountArc. This is the primary lead capture mechanism for the website and must be professional, easy to use, and spam-protected.

---

## Business Value

**Problem:** No working way for potential clients to contact MountArc through the website.

**Solution:** Professional contact form with validation, spam protection, and email notifications.

**Value:**
- Enable lead capture from website visitors
- Structured data collection (name, email, message, project details)
- Professional user experience
- Spam protection to prevent fake submissions
- Foundation for client relationships

---

## User Personas Impacted

### Primary Personas
- **Startup Founder:** Needs quick way to inquire about services
- **Small Business Owner:** Wants to explore partnership options
- **Blog Reader:** May have questions or project ideas

### Secondary
- **MountArc Team:** Receives and processes inquiries

---

## Scope

### In Scope
✅ `/contact` page with form
✅ 8 form fields (3 required, 3 optional, 2 auto-captured)
✅ Real-time client-side validation
✅ reCAPTCHA v3 spam protection (invisible)
✅ Form submission to email API
✅ Success page redirect (`/thank-you`)
✅ Error handling and user feedback
✅ Mobile-responsive design
✅ Accessibility (keyboard navigation, labels)

### Out of Scope
❌ Form data storage in database
❌ Admin dashboard for submissions
❌ Multi-step form wizard
❌ File upload capability
❌ Auto-save draft functionality
❌ Email/phone verification

---

## Features

### Contact Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Full Name | Text | Yes | Min 2 chars, letters/spaces/hyphens only |
| Email | Email | Yes | Valid email format |
| Message | Textarea | Yes | 20-250 characters |
| Phone | Tel | No | Country code required if provided |
| Project Type | Dropdown | No | Predefined options |
| Budget Range | Dropdown | No | Predefined options |
| Timestamp | Hidden | Auto | ISO 8601 format |
| Page URL | Hidden | Auto | Current page URL |

### User Experience Features
- Real-time validation (as user types)
- Clear error messages
- Loading state during submission
- Success confirmation
- Alternative contact methods displayed

---

## Success Criteria

### Functional
- [ ] Contact form accessible at `/contact` URL
- [ ] All 8 fields present and functional
- [ ] Real-time validation works for all fields
- [ ] Required fields enforced
- [ ] Form submits successfully to API
- [ ] Both emails sent (team + user auto-reply)
- [ ] User redirected to `/thank-you` on success
- [ ] Error messages display clearly on failure
- [ ] reCAPTCHA v3 runs invisibly in background

### User Experience
- [ ] Form completion rate > 80%
- [ ] Clear visual feedback for validation
- [ ] Mobile-friendly (thumb-friendly buttons)
- [ ] Page loads in < 3 seconds
- [ ] No console errors
- [ ] Accessible via keyboard navigation

### Technical
- [ ] Form state managed with React Hook Form
- [ ] Validation rules defined with Zod
- [ ] reCAPTCHA token generated and sent
- [ ] API integration tested end-to-end
- [ ] Error handling covers all scenarios
- [ ] Matches existing website design

---

## Dependencies

### Technical Dependencies
- Epic 1 (Email Infrastructure) - **MUST BE COMPLETE FIRST**
- React Hook Form library
- Zod validation library
- reCAPTCHA v3 library
- Tailwind CSS (already available)

### Design Dependencies
- Contact page design/wireframe
- Form component styling guidelines
- Error message copy

### Blocks
- None (standalone feature after Epic 1)

---

## User Stories

This epic contains the following user stories:

- [US-004: Contact Form Page & Layout](./US-004-contact-form-page.md)
- [US-005: Form Validation & Error Handling](./US-005-form-validation.md)
- [US-006: Spam Protection (reCAPTCHA v3)](./US-006-spam-protection.md)
- [US-007: Form Submission & API Integration](./US-007-form-submission.md)

**Total Stories:** 4
**Story Points:** TBD (to be estimated by Engineering)

---

## Acceptance Criteria

### Epic-Level Acceptance Criteria

**Given** a user visits the `/contact` page
**When** they view the page on any device
**Then** the contact form is displayed with all fields
**And** the page matches the website's design system
**And** all interactive elements are accessible

**Given** a user fills out the contact form with valid data
**When** they submit the form
**Then** client-side validation passes
**And** reCAPTCHA v3 runs in the background
**And** the form data is sent to `/api/send-email`
**And** both team and user emails are sent
**And** the user is redirected to `/thank-you` page
**And** the form is cleared

**Given** a user submits the form with invalid data
**When** validation fails
**Then** clear error messages are shown for each invalid field
**And** the form is NOT submitted to the API
**And** the user can correct errors and resubmit

**Given** a user submits the form but API fails
**When** the email sending fails
**Then** an error message is displayed
**And** the user can try again
**And** alternative contact information is shown

**Given** a spam bot attempts to submit the form
**When** reCAPTCHA score is below 0.5
**Then** the submission is rejected
**And** the API returns an error
**And** no emails are sent

---

## User Flows

### Happy Path: Successful Submission
```
1. User navigates to /contact
2. User fills in required fields (name, email, message)
3. User optionally fills project type and budget
4. Real-time validation shows green checkmarks
5. User clicks "Send Message" button
6. Button shows loading spinner ("Sending...")
7. reCAPTCHA v3 runs invisibly
8. Form data sent to API
9. API sends 2 emails (team + user)
10. User redirected to /thank-you page
11. Success confirmation shown
```

### Error Path: Validation Failure
```
1. User navigates to /contact
2. User fills in fields with invalid data (e.g., email without @)
3. Real-time validation shows red error message
4. User attempts to submit
5. Form prevents submission
6. Error messages highlight invalid fields
7. User corrects errors
8. Validation passes
9. User successfully submits
```

### Error Path: API Failure
```
1. User fills out form correctly
2. User submits form
3. API request fails (network issue, server error)
4. Error message displayed: "Oops! Something went wrong..."
5. Button re-enabled
6. Form data preserved (not cleared)
7. Alternative contact shown: "Email us at contact@mountarc.com"
8. User can retry submission
```

---

## Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| High spam submissions | Medium | High | reCAPTCHA v3, rate limiting in API |
| Users abandon form (too long) | Medium | Medium | Keep it simple, only 3 required fields |
| Mobile UX issues | High | Medium | Mobile-first design, touch-friendly buttons |
| API timeout/failure | High | Low | Clear error messages, provide fallback contact |
| Validation too strict | Low | Medium | Balance security with user experience |

---

## Testing Strategy

### Manual Testing
- [ ] Submit form with all valid data
- [ ] Submit with only required fields
- [ ] Submit with all optional fields empty
- [ ] Test each validation rule (invalid email, short message, etc.)
- [ ] Test on mobile (iPhone, Android)
- [ ] Test on tablet
- [ ] Test on desktop (Chrome, Safari, Firefox)
- [ ] Test keyboard navigation (tab through fields)
- [ ] Test with screen reader (basic accessibility)
- [ ] Test error scenarios (API down, network timeout)

### Browser Testing
- Chrome (Desktop & Mobile) - Primary
- Safari (iOS) - Primary
- Firefox (Desktop) - Secondary
- Edge (Desktop) - Secondary

### Device Testing
- iPhone (Safari)
- Android phone (Chrome)
- iPad (Safari)
- Desktop (various browsers)

---

## Non-Functional Requirements

### Performance
- Page load time: < 3 seconds (mobile)
- Form submission: < 2 seconds response
- No layout shift during page load
- Smooth animations/transitions

### Accessibility (WCAG 2.1 Level A)
- All inputs have proper labels
- Required fields indicated with asterisk + aria-required
- Error messages use aria-live regions
- Keyboard navigation works (tab order logical)
- Color contrast ratio 4.5:1 minimum
- Focus indicators visible

### Usability
- Intuitive field labels
- Clear placeholder text
- Real-time feedback (not just on submit)
- Error messages next to fields
- Success state clearly communicated

### Security
- Client-side validation (UX)
- Server-side validation (security)
- reCAPTCHA v3 spam protection
- Input sanitization
- XSS prevention

---

## Design Requirements

### Visual Design
- Match existing website dark theme + mint green
- Consistent with current page layouts
- Professional, modern aesthetic
- Clear visual hierarchy

### Layout
- Centered form, max-width 600px
- Clear heading: "Get in Touch"
- Brief subheading explaining purpose
- Form fields stacked vertically
- Prominent submit button
- Alternative contact info below form

### Form Elements
- Text inputs: Clear borders, proper spacing
- Textarea: Sufficient height (4-5 lines)
- Dropdowns: Accessible, styled consistently
- Submit button: Mint green, large, easy to tap
- Error messages: Red text below field
- Success indicators: Green checkmark or border

### Responsive Behavior
- Mobile: Single column, full-width fields
- Tablet: Same as mobile
- Desktop: Centered, max-width 600px

---

## Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Page layout & UI | Feb 3, 2026 | Pending |
| Form validation | Feb 5, 2026 | Pending |
| reCAPTCHA integration | Feb 6, 2026 | Pending |
| API integration | Feb 7, 2026 | Pending |
| Testing complete | Feb 7, 2026 | Pending |

---

## Definition of Done

- [ ] All 4 user stories completed
- [ ] `/contact` page accessible and functional
- [ ] All form fields working with validation
- [ ] reCAPTCHA v3 integrated and tested
- [ ] Form submits to API successfully
- [ ] Both emails sent and received
- [ ] Success redirect to `/thank-you` works
- [ ] Error handling tested
- [ ] Mobile responsive (tested on 3 devices)
- [ ] Accessibility basics met
- [ ] Code reviewed and committed
- [ ] PM approval received

---

## Notes

### Form Copy

**Page Heading:** "Get in Touch"

**Subheading:** "Have a project in mind? Let's discuss how we can help you build something amazing."

**Submit Button:** "Send Message"

**Alternative Contact:**
"Prefer email? Reach us directly at contact@mountarc.com

Or book a discovery call: [Link to /book-call]"

### Field Labels
- Full Name *
- Email Address *
- Phone Number (optional)
- Project Type (optional)
- Budget Range (optional)
- Your Message *

### Placeholder Text
- "John Doe"
- "john@company.com"
- "+1 (555) 123-4567"
- "Select project type..."
- "Select budget range..."
- "Tell us about your project..."

---

## Related Documentation

- [PRD - Feature 2: Contact Form](../../PRD.md#feature-2-contact-form-page)
- [Epic 1: Email Infrastructure](../epic-1-email/README.md) (prerequisite)
- [User Flow: Contact Form](../../user-flows/contact-form-flow.md) (to be created)

---

**Epic Owner:** Business Analyst
**Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0