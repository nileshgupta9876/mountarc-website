# User Story: Spam Protection (reCAPTCHA v3)

**ID:** US-006
**Epic:** [Epic 2 - Contact Form System](./README.md)
**Priority:** Must Have (Critical)
**Persona:** System / MountArc Team (preventing spam)
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **MountArc team member**,
I want **the contact form to be protected against spam bots**,
So that **I only receive legitimate inquiries and don't waste time on fake submissions**.

---

## Business Context

Unprotected forms attract spam bots that submit hundreds of fake messages, wasting team time and potentially overwhelming the email system. reCAPTCHA v3 provides invisible bot protection without disrupting user experience.

---

## Acceptance Criteria

### Primary Criteria

**Given** reCAPTCHA v3 is integrated on the contact form
**When** a legitimate user fills out and submits the form
**Then** reCAPTCHA runs invisibly in the background
**And** generates a token with a score (0.0-1.0)
**And** the token is sent to the API with the form data
**And** the user experiences no interruption or challenge

**Given** a bot attempts to submit the contact form
**When** reCAPTCHA v3 analyzes the submission
**Then** it assigns a low score (< 0.5)
**And** the API rejects the submission
**And** no emails are sent
**And** an error message is shown

**Given** reCAPTCHA service is temporarily unavailable
**When** a user attempts to submit the form
**Then** the system handles the error gracefully
**And** allows submission to proceed (fail open) OR shows clear error (fail closed)
**And** logs the reCAPTCHA service failure

---

## Edge Cases

### Edge Case 1: reCAPTCHA Service Down
**Scenario:** Google reCAPTCHA API is unreachable
**Expected Behavior:** System either allows submission (fail open) or shows clear error
**Handling:** Decide on fail strategy, log failure, notify team

### Edge Case 2: User Has Ad Blocker
**Scenario:** User's ad blocker blocks reCAPTCHA script
**Expected Behavior:** Form submission fails gracefully with message
**Handling:** Detect missing reCAPTCHA, show message asking to disable blocker

### Edge Case 3: Slow Network
**Scenario:** reCAPTCHA takes long to load on slow 3G
**Expected Behavior:** User can still see and fill form
**Handling:** Load reCAPTCHA asynchronously, don't block form render

### Edge Case 4: Token Expires
**Scenario:** User fills form slowly, token expires (2 min lifetime)
**Expected Behavior:** Generate new token on submit
**Handling:** Execute reCAPTCHA immediately before form submission

### Edge Case 5: Legitimate User Gets Low Score
**Scenario:** User with VPN or privacy tools gets flagged
**Expected Behavior:** Allow submission but log for review
**Handling:** Set threshold at 0.5, consider manual review for edge cases

---

## Dependencies

### Prerequisites
- [x] Google reCAPTCHA v3 account created
- [ ] Site key and secret key obtained
- [ ] Environment variables configured

### Technical Dependencies
- `react-google-recaptcha-v3` library (or `@google-cloud/recaptcha-enterprise`)
- Environment variables: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`

### Blocks
- None (runs in parallel with form development)

---

## Technical Notes

### Setup reCAPTCHA v3

**1. Create reCAPTCHA v3 Keys:**
- Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
- Create new site with reCAPTCHA v3
- Add domain: `mountarc-website-final.vercel.app`
- Get site key and secret key

**2. Install Library:**
```bash
npm install react-google-recaptcha-v3
```

**3. Environment Variables:**
```
# .env.local (local development)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lxxxxx...
RECAPTCHA_SECRET_KEY=6Lxxxxx...

# Vercel (production)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lxxxxx...
RECAPTCHA_SECRET_KEY=6Lxxxxx...
```

**4. Provider Setup:**
```javascript
// pages/_app.jsx or app/layout.jsx
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function App({ Component, pageProps }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      language="en"
    >
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}
```

**5. Form Integration:**
```javascript
// components/forms/ContactForm.jsx
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = async (data) => {
    if (!executeRecaptcha) {
      console.error('reCAPTCHA not available');
      return;
    }

    try {
      // Execute reCAPTCHA to get token
      const token = await executeRecaptcha('contact_form');

      // Send form data with token to API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          data: {
            ...data,
            pageUrl: window.location.href,
            timestamp: new Date().toISOString(),
          },
          recaptchaToken: token,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to thank you page
        router.push('/thank-you');
      } else {
        // Show error message
        setError(result.error);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  // ... rest of form
}
```

**6. Server-Side Verification (API):**
```javascript
// pages/api/send-email.js
async function verifyRecaptcha(token) {
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    }
  );

  const data = await response.json();

  // Check if verification successful and score meets threshold
  return data.success && data.score >= 0.5;
}

export default async function handler(req, res) {
  const { recaptchaToken } = req.body;

  // Verify reCAPTCHA
  const isValid = await verifyRecaptcha(recaptchaToken);

  if (!isValid) {
    return res.status(403).json({
      success: false,
      error: 'reCAPTCHA verification failed. Please try again.',
    });
  }

  // Continue with email sending...
}
```

---

## Design Notes

### User Experience
- **Invisible:** reCAPTCHA v3 runs in background, no user interaction
- **Badge:** Small reCAPTCHA badge in bottom-right corner (required by Google)
- **No Challenges:** Unlike v2, no "I'm not a robot" checkbox or image selection

### reCAPTCHA Badge Styling
```css
/* Hide badge on mobile if desired (check Terms of Service) */
.grecaptcha-badge {
  visibility: visible;
  opacity: 0.5;
}

.grecaptcha-badge:hover {
  opacity: 1;
}
```

---

## Testing Notes

### Testing Checklist
- [ ] reCAPTCHA badge visible on page
- [ ] Token generated on form submit
- [ ] Token sent to API successfully
- [ ] API verifies token correctly
- [ ] High-score submissions accepted (score >= 0.5)
- [ ] Low-score submissions rejected (score < 0.5)
- [ ] Error handling when reCAPTCHA unavailable
- [ ] Form works with ad blockers (or shows appropriate message)

### Test Scenarios
1. **Normal User:** Fill and submit form → should succeed
2. **Rapid Submission:** Submit multiple times quickly → should be rate limited
3. **Automated Bot:** Use script to submit → should be rejected (score < 0.5)
4. **Ad Blocker:** Enable ad blocker → verify behavior
5. **Slow Network:** Throttle to 3G → verify reCAPTCHA loads

### Testing Tools
- Chrome DevTools (Network tab, throttling)
- reCAPTCHA Admin Console (view scores and events)
- Automated testing (difficult with reCAPTCHA, may need mocking)

---

## Validation Rules

### reCAPTCHA Token
- Must be present in request
- Must be valid (verified with Google API)
- Score must be >= 0.5

### Score Thresholds
- **0.9 - 1.0:** Very likely legitimate
- **0.7 - 0.9:** Likely legitimate
- **0.5 - 0.7:** Neutral (accept with caution)
- **0.0 - 0.5:** Likely bot (reject)

**Phase 1 Approach:** Simple threshold at 0.5 (accept/reject)

---

## Security Considerations

### Site Key vs Secret Key
- **Site Key:** Public, used in frontend (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`)
- **Secret Key:** Private, NEVER expose to frontend, server-side only

### Best Practices
- Always verify token server-side (never trust client)
- Never skip verification, even if client says it passed
- Log suspicious activity (low scores, repeated attempts)
- Monitor reCAPTCHA admin console for anomalies

### Privacy
- reCAPTCHA collects user data for analysis
- Add privacy policy link mentioning Google reCAPTCHA
- Follow Google's Terms of Service

---

## Definition of Done

- [ ] reCAPTCHA v3 account created
- [ ] Site key and secret key obtained
- [ ] Environment variables configured
- [ ] reCAPTCHA provider added to app
- [ ] Token generation working on form submit
- [ ] Server-side verification implemented
- [ ] Score threshold set (0.5)
- [ ] Error handling for failed verification
- [ ] reCAPTCHA badge visible on page
- [ ] Tested with real submissions
- [ ] Tested bot detection (low score handling)
- [ ] Privacy policy updated (if needed)
- [ ] Code reviewed
- [ ] Committed to git

---

## Open Questions

1. **Fail Strategy:** If reCAPTCHA service is down, fail open (allow) or fail closed (reject)?
   - **Recommendation:** Fail open (allow submission), but log for review

2. **Score Threshold:** Should we start with 0.5 or higher (0.7)?
   - **Recommendation:** Start with 0.5, adjust based on false positive rate

3. **Badge Placement:** Can we hide the reCAPTCHA badge?
   - **Answer:** Only if Terms of Service requirements met (show badge elsewhere)

4. **Logging:** Should we log all reCAPTCHA scores for analysis?
   - **Recommendation:** Yes, log scores for first month to tune threshold

5. **Testing Environment:** How to test without real bot traffic?
   - **Answer:** Use reCAPTCHA test keys for development, monitor production scores

---

## Related Stories

- **Depends On:** US-004 (Contact Form Page), US-005 (Form Validation)
- **Blocks:** None (runs in parallel)
- **Related:** US-003 (Email API Route) - API must verify reCAPTCHA

---

## References

- [PRD - Spam Protection](../../PRD.md#spam-protection)
- [Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [react-google-recaptcha-v3](https://www.npmjs.com/package/react-google-recaptcha-v3)

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0