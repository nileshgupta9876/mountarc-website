# User Story: Error Handling & User Feedback

**ID:** US-016
**Epic:** [Epic 5 - Supporting Infrastructure](./README.md)
**Priority:** Must Have
**Persona:** All Users
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **user experiencing an error**,
I want to **receive clear, helpful feedback about what went wrong**,
So that **I can take appropriate action to resolve the issue or contact support**.

---

## Acceptance Criteria

**Given** a validation error occurs (invalid email, short message, etc.)
**When** I view the form
**Then** I see clear error messages next to each invalid field
**And** the error messages explain what's wrong
**And** the error messages tell me how to fix it
**And** the form does not submit until errors are corrected

**Given** a network error occurs during submission
**When** the API request fails
**Then** I see a user-friendly error message
**And** the message doesn't expose technical details
**And** I am given the option to retry
**And** alternative contact information is displayed

**Given** the API returns an error (500, 403, 429, etc.)
**When** I view the error
**Then** I see an appropriate, user-friendly message for each error type
**And** I know what action to take (wait, retry, contact support)

---

## Error Types & Messages

### Client-Side Validation Errors
**Error:** Empty required field
**Message:** "[Field name] is required"

**Error:** Invalid email format
**Message:** "Please enter a valid email address"

**Error:** Message too short (<20 chars)
**Message:** "Message must be at least 20 characters"

**Error:** Message too long (>250 chars)
**Message:** "Message must not exceed 250 characters"

**Error:** Phone without country code
**Message:** "Please include country code (e.g., +1)"

### API/Server Errors

**Error:** 400 Bad Request
**Message:** "Some information is missing or invalid. Please check your entries."

**Error:** 403 Forbidden (reCAPTCHA failed)
**Message:** "Security verification failed. Please try again."

**Error:** 429 Rate Limited
**Message:** "Please wait before submitting again. You can submit once every 5 minutes."

**Error:** 500 Internal Server Error
**Message:** "Oops! Something went wrong on our end. Please try again or email us at contact@mountarc.com"

**Error:** Network/Timeout
**Message:** "Connection error. Please check your internet and try again."

---

## Technical Notes

### Error Handling Structure

```javascript
// Form component error handling
const [submitError, setSubmitError] = useState('');

const onSubmit = async (data) => {
  setSubmitError('');

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // Success - redirect to thank you page
      router.push('/thank-you');
    } else {
      // API returned error
      handleApiError(response.status, result.error);
    }
  } catch (error) {
    // Network or other errors
    handleClientError(error);
  }
};

function handleApiError(status, errorMessage) {
  switch (status) {
    case 400:
      setSubmitError('Some information is missing or invalid. Please check your entries.');
      break;
    case 403:
      setSubmitError('Security verification failed. Please try again.');
      break;
    case 429:
      setSubmitError('Please wait before submitting again. You can submit once every 5 minutes.');
      break;
    case 500:
    default:
      setSubmitError(
        `Oops! Something went wrong. Please try again or email us at contact@mountarc.com`
      );
  }
}

function handleClientError(error) {
  if (error.name === 'AbortError') {
    setSubmitError('Request timed out. Please check your connection and try again.');
  } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
    setSubmitError('Connection error. Please check your internet and try again.');
  } else {
    setSubmitError('An unexpected error occurred. Please try again or contact us directly.');
  }
}
```

### Error Display Component

```jsx
{submitError && (
  <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg mb-6">
    <div className="flex items-start">
      <svg
        className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
      <div className="flex-1">
        <p className="text-sm text-red-400">{submitError}</p>
        <p className="text-xs text-gray-400 mt-2">
          Having trouble?{' '}
          <a href="mailto:contact@mountarc.com" className="text-mint-green hover:underline">
            Email us directly
          </a>
        </p>
      </div>
    </div>
  </div>
)}
```

### API Error Responses

```javascript
// pages/api/send-email.js

// 400 - Bad Request
return res.status(400).json({
  success: false,
  error: 'Missing required fields'
});

// 403 - Forbidden (reCAPTCHA)
return res.status(403).json({
  success: false,
  error: 'reCAPTCHA verification failed'
});

// 429 - Too Many Requests
return res.status(429).json({
  success: false,
  error: 'Please wait before submitting again'
});

// 500 - Internal Server Error
return res.status(500).json({
  success: false,
  error: 'Internal server error'
});
```

### Logging

```javascript
// Log errors for debugging (server-side only)
console.error('[Email API Error]', {
  timestamp: new Date().toISOString(),
  type: type,
  email: data.email,
  error: error.message,
  stack: error.stack,
});
```

---

## Edge Cases

### Edge Case 1: Multiple Errors Simultaneously
**Scenario:** Validation fails on multiple fields + network error
**Expected Behavior:** Show validation errors first, prevent submission
**Handling:** Validation prevents API call, so network errors don't occur

### Edge Case 2: Error During Redirect
**Scenario:** Success response received but redirect fails
**Expected Behavior:** Show success message inline instead
**Handling:** Catch redirect error, show inline success

### Edge Case 3: Empty Error Message from API
**Scenario:** API returns error but no error message
**Expected Behavior:** Show generic error message
**Handling:** Fallback to default message

---

## Definition of Done

- [ ] All error types handled
- [ ] User-friendly error messages defined
- [ ] Error display component created
- [ ] Validation errors show inline
- [ ] API errors show in error box
- [ ] Network errors caught and handled
- [ ] Timeout errors handled
- [ ] Alternative contact shown on errors
- [ ] Logging implemented (server-side)
- [ ] All error scenarios tested
- [ ] Code reviewed and committed

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Version:** 1.0