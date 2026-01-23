# User Story: Rate Limiting System

**ID:** US-015
**Epic:** [Epic 5 - Supporting Infrastructure](./README.md)
**Priority:** Must Have
**Persona:** System / MountArc Team
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **system administrator**,
I want to **prevent users from submitting forms too frequently**,
So that **we avoid spam, abuse, and duplicate submissions**.

---

## Acceptance Criteria

**Given** a user has submitted a form
**When** they try to submit any form again within 5 minutes using the same email
**Then** the API rejects the submission with 429 status code
**And** returns error message "Please wait before submitting again"
**And** no emails are sent

**Given** a user has waited more than 5 minutes since their last submission
**When** they submit a form
**Then** the submission is accepted normally
**And** emails are sent

**Given** different users submit forms
**When** they use different email addresses
**Then** each user has their own rate limit
**And** one user's submissions don't affect others

---

## Technical Notes

### Rate Limiting Implementation (In-Memory)

```javascript
// pages/api/send-email.js

// In-memory cache for rate limiting
const recentSubmissions = new Map();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes in milliseconds
const CLEANUP_INTERVAL = 10 * 60 * 1000; // Clean up old entries every 10 minutes

// Periodic cleanup of old entries
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > RATE_LIMIT_WINDOW * 2) {
      recentSubmissions.delete(key);
    }
  }
}, CLEANUP_INTERVAL);

function isRateLimited(email) {
  const now = Date.now();
  const lastSubmission = recentSubmissions.get(email);

  if (!lastSubmission) {
    return false;
  }

  const timeSinceLastSubmission = now - lastSubmission;
  return timeSinceLastSubmission < RATE_LIMIT_WINDOW;
}

function updateRateLimit(email) {
  recentSubmissions.set(email, Date.now());
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { type, data, recaptchaToken } = req.body;

    // Extract email based on form type
    const email = data.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    // Check rate limiting
    if (isRateLimited(email)) {
      return res.status(429).json({
        success: false,
        error: 'Please wait before submitting again. You can submit once every 5 minutes.'
      });
    }

    // Validate other fields...
    // Verify reCAPTCHA...
    // Send emails...

    // Update rate limit after successful submission
    updateRateLimit(email);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred. Please try again.'
    });
  }
}
```

### Alternative: IP-Based Rate Limiting

```javascript
function getRateLimitKey(email, req) {
  // Primary: Email address
  // Fallback: IP address (if email not available or for additional security)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  return `${email}:${ip}`;
}
```

---

## Edge Cases

### Edge Case 1: Same Email, Different Forms
**Scenario:** User submits contact form, then tries newsletter signup
**Expected Behavior:** Both use same email, rate limit applies across all forms
**Handling:** Track by email, applies to all form types

### Edge Case 2: Server Restart
**Scenario:** Server restarts, in-memory cache is lost
**Expected Behavior:** Rate limits reset
**Handling:** Acceptable for Phase 1, use Redis for persistence in future

### Edge Case 3: Exactly 5 Minutes
**Scenario:** User waits exactly 5 minutes (300 seconds)
**Expected Behavior:** Submission allowed (>= 5 minutes)
**Handling:** Use >= comparison

---

## Definition of Done

- [ ] Rate limiting implemented in API
- [ ] 5-minute window enforced
- [ ] 429 status code returned when rate limited
- [ ] Clear error message provided
- [ ] Works across all form types
- [ ] Tested with rapid submissions
- [ ] Tested with exact 5-minute wait
- [ ] Memory cleanup implemented
- [ ] Code reviewed and committed

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Version:** 1.0