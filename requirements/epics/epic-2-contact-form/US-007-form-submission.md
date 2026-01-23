# User Story: Form Submission & API Integration

**ID:** US-007
**Epic:** [Epic 2 - Contact Form System](./README.md)
**Priority:** Must Have (Critical)
**Persona:** All Users (Startup Founder, Small Business Owner, Blog Reader)
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **potential client**,
I want to **submit the contact form and receive confirmation**,
So that **I know my message was received and MountArc will respond**.

---

## Business Context

Form submission is the culmination of the contact form experience. It must be reliable, provide clear feedback, and ensure messages reach the team. Failed submissions or unclear status lead to user frustration and lost leads.

---

## Acceptance Criteria

### Primary Criteria

**Given** I have filled out the contact form with valid data
**When** I click the "Send Message" button
**Then** the button shows a loading state ("Sending...")
**And** the button is disabled to prevent double-submission
**And** my form data is sent to `/api/send-email`
**And** reCAPTCHA token is included in the request
**And** within 2 seconds, I receive a response

**Given** the form submission is successful
**When** the API responds with success
**Then** I am immediately redirected to `/thank-you` page
**And** the form is cleared (if I go back)
**And** I see a success confirmation message
**And** I receive an auto-reply email

**Given** the form submission fails due to a server error
**When** the API responds with an error
**Then** I see a clear error message on the form
**And** the submit button is re-enabled
**And** my form data is preserved (not cleared)
**And** I am given the option to try again
**And** alternative contact information is displayed

**Given** my network connection is slow or unstable
**When** the form submission takes longer than expected
**Then** I see a loading indicator
**And** after 10 seconds, I see a timeout message
**And** I can retry the submission

---

## Edge Cases

### Edge Case 1: Double Submission
**Scenario:** User clicks submit button multiple times rapidly
**Expected Behavior:** Only one submission processed
**Handling:** Disable button immediately on first click, ignore subsequent clicks

### Edge Case 2: Network Timeout
**Scenario:** API request times out (>10 seconds)
**Expected Behavior:** Show timeout error, allow retry
**Handling:** Set request timeout, catch timeout error, show message

### Edge Case 3: User Navigates Away During Submission
**Scenario:** User closes tab or navigates away while form is submitting
**Expected Behavior:** Submission should still complete (if API already called)
**Handling:** API request already sent, email will be delivered

### Edge Case 4: API Returns Unexpected Response
**Scenario:** API returns 200 but with unexpected JSON structure
**Expected Behavior:** Handle gracefully, show generic error
**Handling:** Validate API response structure, fallback to error state

### Edge Case 5: Rate Limit Hit
**Scenario:** User submits form, then immediately visits page again and submits
**Expected Behavior:** Second submission rejected with clear message
**Handling:** API returns 429, show "Please wait before submitting again"

### Edge Case 6: Partial Success
**Scenario:** Team email sends but user email fails
**Expected Behavior:** Still show success (team was notified)
**Handling:** API considers it success if team email sent

---

## Dependencies

### Prerequisites
- [x] US-001, US-002, US-003 (Email Infrastructure) complete
- [x] US-004 (Contact Form Page) complete
- [x] US-005 (Form Validation) complete
- [x] US-006 (reCAPTCHA) complete

### Technical Dependencies
- `/api/send-email` endpoint (US-003)
- `/thank-you` page (Epic 5)
- Fetch API or HTTP client
- Router for navigation

### Blocks
- None (final story in Epic 2)

---

## Technical Notes

### Form Submission Implementation

```javascript
// components/forms/ContactForm.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { contactFormSchema } from '../../lib/validation/contactFormSchema';

export default function ContactForm() {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    // Clear any previous errors
    setSubmitError('');

    try {
      // Check if reCAPTCHA is available
      if (!executeRecaptcha) {
        setSubmitError('Security verification unavailable. Please try again.');
        return;
      }

      // Execute reCAPTCHA to get token
      const recaptchaToken = await executeRecaptcha('contact_form');

      // Prepare form data
      const payload = {
        type: 'contact',
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          projectType: data.projectType || null,
          budgetRange: data.budgetRange || null,
          message: data.message,
          timestamp: new Date().toISOString(),
          pageUrl: window.location.href,
        },
        recaptchaToken,
      };

      // Submit to API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        // Add timeout
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success! Redirect to thank you page
        reset(); // Clear form
        router.push('/thank-you');
      } else {
        // API returned an error
        setSubmitError(
          result.error || 'Failed to send message. Please try again.'
        );
      }
    } catch (error) {
      console.error('Form submission error:', error);

      // Handle different error types
      if (error.name === 'AbortError') {
        setSubmitError(
          'Request timed out. Please check your connection and try again.'
        );
      } else if (error.message.includes('network')) {
        setSubmitError(
          'Network error. Please check your connection and try again.'
        );
      } else {
        setSubmitError(
          'An unexpected error occurred. Please try again or contact us directly at contact@mountarc.com'
        );
      }
    }
  };

  const message = watch('message', '');
  const messageLength = message?.length || 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Form fields (from US-004 and US-005) */}
      {/* ... all form fields ... */}

      {/* Error Message Display */}
      {submitError && (
        <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <p className="text-sm text-red-400">{submitError}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mint-green focus:ring-offset-2 focus:ring-offset-gray-900 ${
          !isValid || isSubmitting
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-mint-green text-dark hover:bg-mint-green-dark'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Alternative Contact (shown on error) */}
      {submitError && (
        <div className="text-center text-sm text-gray-400">
          <p>
            Having trouble? Email us directly at{' '}
            <a
              href="mailto:contact@mountarc.com"
              className="text-mint-green hover:underline"
            >
              contact@mountarc.com
            </a>
          </p>
        </div>
      )}
    </form>
  );
}
```

### API Request Format

```javascript
// POST /api/send-email
{
  "type": "contact",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "projectType": "SaaS Product Development",
    "budgetRange": "$10,000 - $25,000",
    "message": "I need help building a SaaS product for...",
    "timestamp": "2026-01-22T14:30:00.000Z",
    "pageUrl": "https://mountarc-website-final.vercel.app/contact"
  },
  "recaptchaToken": "03AGdBq24..."
}
```

### API Response Format

**Success (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error (400/403/500):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

---

## Design Notes

### Loading State
- **Button Text:** Changes to "Sending..."
- **Spinner Icon:** Animated spinning circle next to text
- **Button Disabled:** Grayed out, not clickable

### Error State
- **Error Box:** Red background (red-900/20), red border
- **Error Text:** Red 400 color
- **Placement:** Above submit button
- **Alternative Contact:** Shown below error

### Success State
- **Immediate Redirect:** To `/thank-you` page
- **No Confirmation Toast:** Redirect is the confirmation

---

## Testing Notes

### Manual Testing Checklist
- [ ] Submit form with valid data → redirects to /thank-you
- [ ] Check email inbox → both emails received (team + user)
- [ ] Submit form with invalid data → validation prevents submission
- [ ] Submit form twice rapidly → only one submission processed
- [ ] Submit form, then submit again immediately → rate limit triggered
- [ ] Disable network, submit form → timeout error shown
- [ ] Submit form on slow 3G → loading state works, completes
- [ ] Submit form, navigate away → email still sent
- [ ] Test on mobile device → touch-friendly, works correctly
- [ ] Test with ad blocker → handles reCAPTCHA gracefully

### Error Scenarios to Test
1. **Network Error:** Disable network, submit → error message
2. **API Down:** Stop API server, submit → error message
3. **Invalid Token:** Mock reCAPTCHA failure → 403 error
4. **Rate Limit:** Submit twice within 5 min → 429 error
5. **Timeout:** Mock slow API (>10s) → timeout message

### Browser/Device Testing
- [ ] Chrome Desktop
- [ ] Safari iOS (iPhone)
- [ ] Chrome Mobile (Android)
- [ ] Firefox Desktop
- [ ] Edge Desktop

---

## User Experience Flow

### Happy Path
```
1. User fills out form (all fields valid)
2. User clicks "Send Message"
3. Button changes to "Sending..." with spinner
4. Button disabled (grayed out)
5. Form data + reCAPTCHA token sent to API
6. API sends 2 emails (team + user)
7. API returns success response
8. User redirected to /thank-you page
9. Success message displayed
10. User receives auto-reply email in inbox
```

### Error Path
```
1. User fills out form
2. User clicks "Send Message"
3. Button shows "Sending..." with spinner
4. Network error or API failure occurs
5. Error message displayed in red box
6. Submit button re-enabled
7. Form data preserved (not cleared)
8. Alternative contact info shown
9. User can retry or email directly
```

---

## Validation Rules

### Client-Side (Before Submission)
- All required fields must pass validation
- Message must be 20-250 characters
- Email must be valid format
- Phone must have country code (if provided)

### Server-Side (API)
- reCAPTCHA token must be valid
- reCAPTCHA score must be >= 0.5
- Rate limit not exceeded (1 per 5 minutes)
- All required fields present

---

## Performance Requirements

- Form submission response time: < 2 seconds (normal conditions)
- Email delivery: < 30 seconds
- Timeout threshold: 10 seconds
- Button shows loading state immediately (< 100ms)

---

## Security Considerations

- Always send reCAPTCHA token with submission
- Never send API keys or secrets from client
- Validate all data server-side (don't trust client)
- Sanitize user input before sending emails
- Use HTTPS for all requests (Vercel handles this)

---

## Definition of Done

- [ ] Form submission function implemented
- [ ] API integration working (`/api/send-email`)
- [ ] reCAPTCHA token sent with request
- [ ] Loading state displays during submission
- [ ] Double-submission prevented
- [ ] Success redirects to `/thank-you` page
- [ ] Error handling for all scenarios
- [ ] Error messages display clearly
- [ ] Timeout handling implemented (10s)
- [ ] Alternative contact shown on error
- [ ] Form clears on successful submission
- [ ] Tested end-to-end (form → email received)
- [ ] Tested all error scenarios
- [ ] Mobile tested (3 devices)
- [ ] Code reviewed
- [ ] Committed to git

---

## Open Questions

1. **Timeout Duration:** Is 10 seconds appropriate for timeout?
   - **Recommendation:** Yes, 10s is reasonable. Most APIs respond in 1-2s.

2. **Retry Logic:** Should we auto-retry failed submissions?
   - **Answer:** No for Phase 1. User can manually retry.

3. **Success Animation:** Should we show a brief success message before redirect?
   - **Answer:** No, immediate redirect is clearer. Thank you page is the confirmation.

4. **Form Persistence:** Should we save draft if user navigates away?
   - **Answer:** No for Phase 1 (out of scope).

5. **Analytics:** Should we track form submissions?
   - **Future:** Yes, but not critical for Phase 1.

---

## Related Stories

- **Depends On:** US-001, US-002, US-003 (Email Infrastructure), US-004, US-005, US-006
- **Blocks:** None
- **Related:** US-014 (Thank You Page) - redirect target

---

## References

- [PRD - Form Behavior](../../PRD.md#form-behavior)
- [PRD - Contact Form](../../PRD.md#feature-2-contact-form-page)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Next.js Router](https://nextjs.org/docs/api-reference/next/router)

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0