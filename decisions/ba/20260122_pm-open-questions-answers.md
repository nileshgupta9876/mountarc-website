# BA Answers to PM's Open Questions

**Date:** 2026-01-22
**Role:** Business Analyst
**Status:** Answered
**Source:** [PM Handoff to BA](../../handoffs/20260122_1537_PM-to-BA.md)

---

## Overview

This document provides the Business Analyst's answers and recommendations for all open questions posed by the Product Manager in the handoff document.

---

## Category 1: Form Validation Details

### Question 1.1: Should we show validation errors immediately or on blur?

**Answer:** Show validation errors **on blur** (when user leaves field) + on submit attempt

**Rationale:**
- **On Change (as they type):** Too aggressive, interrupts user flow
- **On Blur:** Best practice - validates after user finishes with field
- **On Submit:** Catches any remaining errors before API call

**Implementation:**
```javascript
// React Hook Form mode
mode: 'onBlur'  // Validate when user leaves field
```

**Exception:** Character counter should update in real-time (on change) to help user stay within limits

**Decision:** Documented in [form-validation-rules.md](../../requirements/data-requirements/form-validation-rules.md)

---

### Question 1.2: What specific error messages for each field?

**Answer:** Comprehensive error messages defined in data requirements

**Error Messages Defined:**

| Field | Condition | Error Message |
|-------|-----------|---------------|
| Name | Empty | "Name is required" |
| Name | Too short | "Name must be at least 2 characters" |
| Name | Invalid chars | "Name can only contain letters, spaces, hyphens, and apostrophes" |
| Email | Empty | "Email is required" |
| Email | Invalid format | "Please enter a valid email address" |
| Phone | Missing country code | "Please include country code (e.g., +1)" |
| Message | Empty | "Message is required" |
| Message | Too short | "Message must be at least 20 characters" |
| Message | Too long | "Message must not exceed 250 characters" |

**Reference:** [form-validation-rules.md](../../requirements/data-requirements/form-validation-rules.md)

**Decision:** All error messages are clear, specific, and actionable

---

### Question 1.3: How to handle partial form completion (draft save)?

**Answer:** **No draft save for Phase 1** (out of scope)

**Rationale:**
- Adds complexity (local storage, session management)
- Forms are short (3-6 required fields)
- Time constraint for Phase 1
- User can easily re-fill if needed

**User Impact:** Minimal - forms take < 2 minutes to complete

**Future Enhancement (Phase 2):**
- Auto-save to localStorage every 30 seconds
- Restore on page revisit
- Clear on successful submission

**Decision:** Out of scope for Phase 1, revisit in Phase 2

---

## Category 2: User Experience

### Question 2.1: Should contact form and discovery call form have different visual treatments?

**Answer:** **Same visual design, different content/copy**

**Rationale:**
- Consistency across site
- Same form component, different configurations
- User familiarity (learned behavior)

**Differences:**
- Page heading and description (contact vs booking focus)
- "What to Expect" section on discovery call page
- Submit button text ("Send Message" vs "Request Discovery Call")
- Field requirements (phone optional vs required)

**Decision:** Reuse same form components and styles, customize content

---

### Question 2.2: What happens if user submits form multiple times rapidly?

**Answer:** **Second submission blocked by rate limiting**

**Flow:**
1. First submission: Success
2. Button disabled immediately on click (prevents double-click)
3. Second attempt within 5 minutes: API returns 429 error
4. User sees: "Please wait before submitting again"

**Implementation:** BR-002 Rate Limiting rule

**User Education:** Show success confirmation clearly so user knows first submission worked

**Decision:** Documented in [business-rules.md](../../requirements/business-rules.md#br-002-rate-limiting-spam-prevention)

---

### Question 2.3: How to handle network timeout during submission?

**Answer:** **10-second timeout with clear error and retry option**

**Flow:**
1. User submits form
2. API request sent
3. If no response after 10 seconds → Timeout error
4. Error message: "Connection error. Please check your internet and try again."
5. Submit button re-enabled
6. Form data preserved (not cleared)
7. User can retry

**Implementation:**
```javascript
signal: AbortSignal.timeout(10000) // 10 seconds
```

**Alternative Contact:** Show `mailto:contact@mountarc.com` link on timeout

**Decision:** Documented in US-016 (Error Handling)

---

## Category 3: Edge Cases

### Question 3.1: What if email delivery fails? (Show error or success?)

**Answer:** **Depends on which email fails**

**Scenario 1: Team email fails, user email succeeds**
- **Show:** Error message
- **Rationale:** Team wasn't notified (critical failure)
- **Message:** "Oops! Something went wrong. Please email us at contact@mountarc.com"

**Scenario 2: Team email succeeds, user email fails**
- **Show:** Success (redirect to thank you page)
- **Rationale:** Team was notified (business objective met)
- **Background:** Log user email failure for monitoring

**Scenario 3: Both emails fail**
- **Show:** Error message
- **Rationale:** Complete failure

**Decision:** Documented in BR-010 (Success Criteria) and BR-018 (Email Priority)

---

### Question 3.2: What if reCAPTCHA service is down?

**Answer:** **Fail gracefully with option to email directly** (recommend fail closed)

**Options:**
1. **Fail Closed (Recommended):** Reject submission, show error
2. **Fail Open:** Allow submission to proceed

**Recommendation:** **Fail Closed**

**Rationale:**
- reCAPTCHA downtime is rare (<0.01% of the time)
- Prevents spam flood during outage
- User has alternative (direct email)

**Error Message:**
"Security verification unavailable. Please try again or email us at contact@mountarc.com"

**Implementation:** Try/catch reCAPTCHA verification, log failure

**Decision:** Fail closed, escalate to PM if frequent failures occur

---

### Question 3.3: How to handle international phone numbers?

**Answer:** **Require country code, accept flexible formatting**

**Requirements:**
- Must start with `+` (country code prefix)
- Allow various formats: `+1 234 567 8900`, `+44-20-1234-5678`, `+91 (98765) 43210`
- Pattern: `/^\+\d{1,3}\s?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/`

**Validation:**
- Client-side: Real-time regex check
- Server-side: Same regex validation

**Error Message:** "Please include country code (e.g., +1)"

**Rationale:**
- Support global clients (US, UK, Australia, UAE, Ireland)
- Ensure callable numbers for discovery calls

**Decision:** Documented in BR-007 (Phone Number Format)

---

### Question 3.4: What if user's email is invalid but passes regex?

**Answer:** **Accept submission, email bounce will be handled by Resend**

**Rationale:**
- Regex validates format, not existence
- DNS/SMTP validation too slow for real-time
- False positives would frustrate users
- Resend handles bounces gracefully

**Flow:**
1. User enters `fake@nonexistent.com` (valid format)
2. Validation passes
3. Form submits
4. Resend attempts delivery
5. Email bounces (domain doesn't exist)
6. Team sees bounce notification in Resend dashboard
7. Team contacts user via alt method if needed

**Future Enhancement:** Email verification service (Phase 2)

**Decision:** Accept valid format, rely on Resend bounce handling

---

## Category 4: Business Logic

### Question 4.1: Should we validate budget ranges against project types?

**Answer:** **No validation for Phase 1**

**Rationale:**
- No clear business rules for budget-to-project mapping
- User may have unique constraints
- Would create friction (rejecting valid submissions)
- Team can discuss budget during follow-up call

**Future Enhancement (Phase 2):**
- Soft warning (not blocking): "SaaS projects typically start at $10k"
- Help set realistic expectations

**Decision:** No validation, accept any combination

---

### Question 4.2: Should newsletter welcome email be instant or delayed?

**Answer:** **Instant (within 30 seconds)**

**Rationale:**
- User expects immediate confirmation
- Proves subscription worked
- No business reason to delay
- Best practice for welcome emails

**Implementation:** Send welcome email immediately in API response

**Decision:** Instant delivery (documented in Epic 4)

---

### Question 4.3: What happens if user tries to unsubscribe but email not in list?

**Answer:** **Show success message anyway (don't reveal list membership)**

**Flow:**
1. User enters email on /unsubscribe page
2. Email not found in subscriber list
3. **Show:** "You've been unsubscribed" (success message)
4. **Don't show:** "Email not found" (reveals list membership)

**Rationale:**
- Privacy protection (don't reveal who's subscribed)
- Idempotent behavior (can unsubscribe multiple times)
- User gets desired outcome (not subscribed)

**Decision:** Always show success, idempotent operation

---

## Category 5: Analytics & Tracking

### Question 5.1: What events should we track?

**Answer:** **Phase 1: Minimal tracking via Resend dashboard + Vercel Analytics**

**Track (Built-in):**
- Email delivery rates (Resend dashboard)
- Form submission success/failure (API logs)
- Page views (Vercel Analytics)

**Don't Track (Phase 1):**
- Form field interactions
- Abandonment rates
- Time to complete
- A/B testing

**Future (Phase 2):**
- Google Analytics 4 custom events
- Form abandonment tracking
- Field-level analytics

**Rationale:** Time constraint, sufficient data for Phase 1

**Decision:** Use built-in analytics, defer custom tracking to Phase 2

---

### Question 5.2: Should we track which fields cause users to abandon forms?

**Answer:** **Not in Phase 1** (requires custom analytics setup)

**Future (Phase 2):**
- Track field focus/blur events
- Identify where users drop off
- Optimize problematic fields

**Rationale:** Phase 1 focus is functionality, not optimization

**Decision:** Out of scope for Phase 1

---

### Question 5.3: Do we need to track spam submission attempts?

**Answer:** **Yes, via Resend and API logs**

**What to Track:**
- reCAPTCHA rejections (score < 0.5)
- Rate limit violations (429 errors)
- Form validation failures

**Where to Track:**
- Server-side console logs (Vercel captures)
- Resend dashboard (bounce rates, spam reports)

**Review:** Weekly during first month to tune reCAPTCHA threshold if needed

**Decision:** Track spam attempts via logs, monitor and adjust

---

## Summary of Decisions Made

| Question | Decision | Documented In |
|----------|----------|---------------|
| Validation timing | On blur + on submit | form-validation-rules.md |
| Error messages | Comprehensive list defined | form-validation-rules.md |
| Draft save | Out of scope (Phase 1) | This document |
| Visual treatment | Same design, different content | This document |
| Double submission | Rate limiting blocks | business-rules.md (BR-002) |
| Network timeout | 10s timeout, clear error | US-016 |
| Email delivery failure | Depends on which email | business-rules.md (BR-018) |
| reCAPTCHA down | Fail closed (reject) | This document |
| International phones | Require country code | business-rules.md (BR-007) |
| Invalid email format | Accept, rely on bounces | This document |
| Budget validation | No validation | This document |
| Welcome email timing | Instant | Epic 4 |
| Unsubscribe not found | Show success anyway | business-rules.md (BR-013) |
| Analytics tracking | Minimal (built-in only) | This document |
| Spam tracking | Via logs and Resend | This document |

---

## Escalations to PM

**None required** - All questions answered with clear rationale and documented decisions.

If PM disagrees with any decision, BA is ready to revise based on feedback.

---

## Next Steps

1. ✅ All questions answered
2. ⏳ Await PM review and approval
3. ⏳ Incorporate any feedback
4. ⏳ Hand off to Architect and Engineering with answers documented

---

**Created By:** Business Analyst
**Date:** 2026-01-22
**Status:** Complete, awaiting PM review
**Version:** 1.0
