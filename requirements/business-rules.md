# Business Rules

**Document Type:** Business Rules & Logic Specification
**Project:** MountArc Website - Email & Contact System (Phase 1)
**Created:** 2026-01-22
**Version:** 1.0

---

## Overview

This document defines all business rules, logic, and constraints that govern the MountArc website contact and email system. These rules ensure consistent behavior, data quality, and business objectives are met.

---

## BR-001: Email Routing (Environment-Based)

**Rule:** Email recipients are dynamically determined based on environment

**Logic:**
- **Testing Environment:** All team emails go to `nileshgupta96g@gmail.com`
- **Production Environment:** All team emails go to `contact@mountarc.com`
- **Source:** `process.env.RECIPIENT_EMAIL` environment variable

**Applies To:** All forms (contact, discovery, newsletter)

**Rationale:** Prevent test submissions from reaching production email address; allow safe testing

**Implementation:**
```javascript
const recipientEmail = process.env.RECIPIENT_EMAIL || 'contact@mountarc.com';
```

**Testing:**
- Local dev: Set `RECIPIENT_EMAIL=nileshgupta96g@gmail.com`
- Production: Set `RECIPIENT_EMAIL=contact@mountarc.com`

---

## BR-002: Rate Limiting (Spam Prevention)

**Rule:** Users can submit forms at most once every 5 minutes per email address

**Logic:**
- Track last submission timestamp by email address
- Reject submission if `(current_time - last_submission_time) < 5 minutes`
- Return 429 status code with clear error message
- Rate limit applies across all form types (contact, discovery, newsletter)

**Applies To:** All form submissions

**Rationale:** Prevent spam, abuse, and duplicate submissions

**Parameters:**
- **Window:** 5 minutes (300 seconds)
- **Scope:** Per email address (shared across forms)
- **Storage:** In-memory cache (Phase 1)

**Error Message:**
"Please wait before submitting again. You can submit once every 5 minutes."

**Edge Cases:**
- Exactly 5 minutes: Allow submission (>= 5 minutes)
- Server restart: Cache cleared, rate limits reset (acceptable for Phase 1)
- Different emails: Each has independent rate limit

---

## BR-003: reCAPTCHA Score Threshold

**Rule:** All form submissions must pass reCAPTCHA v3 with minimum score of 0.5

**Logic:**
- Client executes reCAPTCHA v3 on form submission
- Client sends token to API
- API verifies token with Google
- If `score >= 0.5`: Accept submission
- If `score < 0.5`: Reject with 403 error

**Applies To:** All form submissions

**Rationale:** Automated bot detection without user interaction

**Parameters:**
- **Version:** reCAPTCHA v3 (invisible)
- **Minimum Score:** 0.5 (standard threshold)
- **Verification:** Server-side only (never trust client)

**Score Interpretation:**
- `0.9 - 1.0`: Very likely human
- `0.7 - 0.9`: Likely human
- `0.5 - 0.7`: Neutral (accept)
- `0.0 - 0.5`: Likely bot (reject)

**Error Message:**
"Security verification failed. Please try again."

---

## BR-004: Dual Email Sending

**Rule:** Successful form submissions trigger two emails (team + user)

**Logic:**
For each form type:

**Contact Form:**
- Email A → Team (notification)
- Email B → User (auto-reply)

**Discovery Call:**
- Email C → Team (booking notification)
- Email D → User (confirmation)

**Newsletter:**
- Email E → Team (subscriber notification)
- Email F → User (welcome email)

**Failure Handling:**
- If both emails send: Return success
- If only team email sends: Return success (team was notified)
- If only user email sends: Log failure, return success (user knows it worked)
- If both fail: Return error

**Rationale:** Team must be notified; user confirmation is best practice

---

## BR-005: Form Field Requirements by Type

**Rule:** Required fields vary by form type

**Contact Form:**
- Required: Name, Email, Message
- Optional: Phone, Project Type, Budget Range

**Discovery Call Form:**
- Required: Name, Email, **Phone**, Preferred Time, Description, **Budget Range**
- Optional: None

**Newsletter Form:**
- Required: Email
- Optional: None

**Rationale:**
- Contact form: Low friction, encourage inquiries
- Discovery call: Need phone to schedule calls, budget helps prep
- Newsletter: Absolute minimum friction

---

## BR-006: Character Limits

**Rule:** Text fields have minimum and maximum length constraints

**Field Limits:**
| Field | Min | Max | Rationale |
|-------|-----|-----|-----------|
| Name | 2 | 100 | Ensure valid names, prevent abuse |
| Email | - | 254 | RFC 5322 standard |
| Phone | - | 20 | International format support |
| Message/Description | 20 | 250 | Ensure meaningful content, prevent spam |
| Preferred Time | 10 | 200 | Enough detail, not excessive |

**Enforcement:**
- Client-side: Real-time feedback, character counter
- Server-side: Reject if out of range

**Rationale:** Balance data quality with user experience

---

## BR-007: Phone Number Format

**Rule:** Phone numbers must include country code if provided

**Format:** `+[country code] [number]`

**Examples:**
- ✅ `+1 (555) 123-4567`
- ✅ `+44 20 1234 5678`
- ❌ `555-1234` (missing country code)
- ❌ `1234567890` (missing + prefix)

**Validation:** Regex pattern `/^\+\d{1,3}\s?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/`

**Rationale:** Support international clients, ensure callable numbers

**Applies To:** Contact form (optional), Discovery call form (required)

---

## BR-008: Email Normalization

**Rule:** All email addresses are normalized before processing

**Normalization Steps:**
1. Trim leading/trailing whitespace
2. Convert to lowercase
3. Validate format

**Example:**
- Input: `  John@COMPANY.com  `
- Output: `john@company.com`

**Rationale:** Prevent duplicate submissions due to case/whitespace differences

**Applies To:** All forms

---

## BR-009: Optional Field Handling

**Rule:** Optional fields display "Not provided" in team emails if empty

**Logic:**
- If field has value: Display value
- If field is null/empty: Display "Not provided" OR hide field

**Applies To:** Phone, Project Type, Budget Range (in contact form emails)

**Example:**
```
Phone: +1 234 567 8900     (if provided)
Phone: Not provided        (if empty)
```

**Rationale:** Clear communication to team; avoid confusion

---

## BR-010: Form Submission Success Criteria

**Rule:** A form submission is considered successful if team email sends

**Success Conditions:**
1. Form data validated (client + server)
2. reCAPTCHA passes (score >= 0.5)
3. Rate limit not exceeded
4. **Team email sends successfully**
5. User email attempted (failure logged but not blocking)

**User Experience:**
- Redirect to `/thank-you` page
- Show success confirmation
- User receives auto-reply (if it didn't fail)

**Rationale:** Team notification is critical; user confirmation is nice-to-have

---

## BR-011: Response Time Expectations

**Rule:** Team responds to inquiries within 24 hours during business days

**Communication:**
- Displayed on all success/confirmation pages
- Included in user auto-reply emails
- Sets clear user expectations

**Business Days:** Monday - Friday (excluding holidays)

**Applies To:** Contact form, Discovery call bookings

**Rationale:** Manage user expectations, maintain professionalism

---

## BR-012: Newsletter Opt-In Type

**Rule:** Newsletter uses single opt-in (no double opt-in)

**Process:**
1. User enters email in footer form
2. User clicks Subscribe
3. Immediate subscription (no confirmation email click required)
4. Welcome email sent immediately
5. User added to subscriber list

**Rationale:** Lower friction, faster list growth, acceptable for Phase 1

**Future:** Consider double opt-in for better list quality (Phase 2)

---

## BR-013: Unsubscribe Processing

**Rule:** Unsubscribe requests are processed immediately

**Process:**
1. User enters email on `/unsubscribe` page
2. User clicks Unsubscribe button
3. Email removed from subscriber list
4. Success confirmation shown
5. No further newsletters sent to that email

**Phase 1 Implementation:** Manual removal by team

**Future:** Automated removal via email platform API

**Legal Compliance:**
- CAN-SPAM: 10 business days (we do immediately)
- GDPR: Right to be forgotten (immediate)

---

## BR-014: Discovery Call Scheduling Workflow

**Rule:** Discovery call bookings are manually scheduled by team (not automated)

**Process:**
1. User submits booking request
2. Team receives Email C (notification)
3. Team member reviews request
4. Team reaches out within 24 hours (phone or email)
5. Team proposes time or confirms user's preferred time
6. Team sends calendar invite manually
7. Call happens at scheduled time

**Not Automated:** No calendar integration, no automatic scheduling

**Rationale:** Personal touch, flexibility in scheduling, simpler Phase 1

**Future:** Integrate Calendly or Cal.com for automatic scheduling

---

## BR-015: Spam Protection Multi-Layer

**Rule:** Multiple spam prevention mechanisms work together

**Layers:**
1. **Client-Side Validation:** Prevent obviously invalid data
2. **reCAPTCHA v3:** Detect and block bots (score < 0.5)
3. **Rate Limiting:** Prevent rapid submissions (1 per 5 min)
4. **Server-Side Validation:** Final data quality check

**All Required:** All layers must pass for submission to succeed

**Rationale:** Defense in depth; redundant protection

---

## BR-016: Error Message User-Friendliness

**Rule:** All error messages shown to users must be clear, actionable, and non-technical

**Guidelines:**
- ✅ "Email is required" (clear, actionable)
- ❌ "Validation error: NULL_FIELD_EMAIL" (technical jargon)
- ✅ "Please wait before submitting again" (clear)
- ❌ "429: Too Many Requests - Rate limit exceeded" (technical)

**Applies To:** All forms, all error types

**Rationale:** User experience; non-technical users shouldn't see tech details

---

## BR-017: Data Retention (Phase 1)

**Rule:** No long-term data storage in Phase 1 (stateless system)

**What's NOT Stored:**
- Form submissions (not saved to database)
- User data (not retained by system)
- Submission history (not tracked)

**What IS Stored:**
- Emails in recipient inboxes (Resend delivers, user controls retention)
- Rate limit cache (in-memory, temporary, cleared on restart)
- Newsletter subscriber list (manual spreadsheet/folder, Phase 1)

**Rationale:** Simplicity, privacy-friendly, sufficient for Phase 1

**Future:** Add database for analytics, submission history, CRM integration

---

## BR-018: Email Delivery Priority

**Rule:** Team notifications are critical; user confirmations are best-effort

**Priority Levels:**
1. **Critical:** Team notifications (Emails A, C, E) - Must deliver
2. **High:** User confirmations (Emails B, D, F) - Should deliver
3. **Failure Handling:** Log user email failures, but don't block submission

**Rationale:** Business needs (team must know) vs nice-to-have (user knows they clicked submit)

---

## BR-019: Mobile Responsiveness Requirement

**Rule:** All forms and pages must be fully functional on mobile devices

**Minimum Requirements:**
- Touch-friendly buttons (44x44px minimum)
- Readable text without zooming (16px minimum)
- No horizontal scrolling
- Single-column layout on mobile
- Form fields full-width

**Testing Required:** iPhone (Safari), Android (Chrome), iPad

**Rationale:** 50%+ users on mobile devices

---

## BR-020: Accessibility Baseline

**Rule:** Forms must meet WCAG 2.1 Level A accessibility standards

**Required:**
- Proper label elements for all inputs
- Required fields indicated with asterisk + `aria-required`
- Keyboard navigation (tab order logical)
- Focus indicators visible
- Error messages use `aria-live` regions
- Color contrast 4.5:1 minimum

**Rationale:** Legal compliance, inclusivity, best practice

---

## Rule Prioritization

**Critical Rules (Must Enforce):**
- BR-002: Rate Limiting
- BR-003: reCAPTCHA
- BR-004: Dual Email Sending
- BR-010: Success Criteria
- BR-013: Unsubscribe Processing
- BR-015: Spam Protection

**Important Rules (Should Enforce):**
- BR-001: Email Routing
- BR-005: Field Requirements
- BR-006: Character Limits
- BR-016: User-Friendly Errors
- BR-019: Mobile Responsiveness

**Nice-to-Have Rules (Best Practice):**
- BR-008: Email Normalization
- BR-009: Optional Field Handling
- BR-020: Accessibility

---

## Rule Exceptions & Edge Cases

### Exception 1: Rate Limit Override (Future)
**Scenario:** VIP client needs to submit multiple times
**Current:** Not supported in Phase 1
**Future:** Admin panel to whitelist emails

### Exception 2: Email Delivery Failure
**Scenario:** Resend API is down
**Handling:** Show error, provide mailto: link as fallback
**Rule:** BR-010 still applies (team email is critical)

### Exception 3: reCAPTCHA Unavailable
**Scenario:** Google reCAPTCHA service down
**Handling:** Fail gracefully, log error, optionally allow submission (or reject)
**Decision:** TBD with PM (fail open vs fail closed)

---

## Related Documentation

- [Data Requirements](./data-requirements/data-requirements.md)
- [Form Validation Rules](./data-requirements/form-validation-rules.md)
- [PRD - Business Logic](./PRD.md#business-logic)
- [User Flows](./user-flows/)

---

**Maintained By:** Business Analyst
**Last Updated:** 2026-01-22
**Version:** 1.0