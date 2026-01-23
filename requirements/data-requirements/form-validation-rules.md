# Form Validation Rules

**Document Type:** Validation Specification
**Project:** MountArc Website - Email & Contact System (Phase 1)
**Created:** 2026-01-22
**Version:** 1.0

---

## Overview

This document defines all validation rules for form inputs across the MountArc website. Validation occurs at two levels:
1. **Client-Side:** Real-time feedback as user types (UX)
2. **Server-Side:** Security and data integrity (never trust client)

---

## Contact Form Validation Rules

### Field: Name

**Required:** Yes

**Client-Side Rules:**
- Minimum length: 2 characters
- Maximum length: 100 characters
- Allowed characters: Letters (a-z, A-Z), spaces, hyphens (-), apostrophes (')
- Pattern: `/^[a-zA-Z\s'-]+$/`

**Server-Side Rules:**
- Same as client-side
- Trim leading/trailing whitespace
- Reject if empty after trimming

**Examples:**
- ✅ Valid: "John Doe", "Mary-Jane", "O'Brien", "José García"
- ❌ Invalid: "J", "John123", "John@Doe", "<script>"

**Error Messages:**
- Empty: "Name is required"
- Too short: "Name must be at least 2 characters"
- Invalid characters: "Name can only contain letters, spaces, hyphens, and apostrophes"

---

### Field: Email

**Required:** Yes

**Client-Side Rules:**
- Must match email format (RFC 5322)
- Must contain `@` and domain
- Pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Maximum length: 254 characters

**Server-Side Rules:**
- Same as client-side
- Normalize to lowercase
- Trim whitespace

**Examples:**
- ✅ Valid: "john@company.com", "user.name+tag@example.co.uk"
- ❌ Invalid: "john@", "@example.com", "john.com", "john @company.com"

**Error Messages:**
- Empty: "Email is required"
- Invalid format: "Please enter a valid email address"

---

### Field: Phone (Optional)

**Required:** No (Contact Form), Yes (Discovery Call Form)

**Client-Side Rules:**
- **If provided:** Must include country code
- Pattern: `/^\+\d{1,3}\s?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/`
- Must start with `+`
- Maximum length: 20 characters

**Server-Side Rules:**
- Same as client-side
- Trim whitespace
- If empty, store as null (Contact Form only)

**Examples:**
- ✅ Valid: "+1 (555) 123-4567", "+44 20 1234 5678", "+91 98765 43210"
- ❌ Invalid: "555-1234" (no country code), "123456789" (no +), "+1-abc-defg"

**Error Messages:**
- Missing country code: "Please include country code (e.g., +1)"
- Invalid format: "Please enter a valid phone number"

---

### Field: Project Type (Optional)

**Required:** No

**Client-Side Rules:**
- Must be one of predefined options (if selected)
- Can be empty

**Allowed Values:**
- "AI-Enabled Web Application"
- "Real-Time Dashboard"
- "SaaS Product Development"
- "FinTech Solution"
- "API Development"
- "MVP Development"
- "Trading"
- "Other"

**Server-Side Rules:**
- Validate against enum
- Reject if not in allowed list
- Empty/null is acceptable

---

### Field: Budget Range (Optional for Contact, Required for Discovery)

**Required:** No (Contact Form), Yes (Discovery Call Form)

**Client-Side Rules:**
- Must be one of predefined options (if selected)

**Allowed Values:**
- "Under $5,000"
- "$5,000 - $10,000"
- "$10,000 - $25,000"
- "$25,000 - $50,000"
- "Not sure yet"

**Server-Side Rules:**
- Validate against enum
- Reject if not in allowed list

**Error Messages (Discovery Call only):**
- Empty: "Please select a budget range"

---

### Field: Message / Description

**Required:** Yes

**Client-Side Rules:**
- Minimum length: 20 characters
- Maximum length: 250 characters
- Character counter displayed

**Server-Side Rules:**
- Trim whitespace
- Count after trimming
- Sanitize HTML entities (prevent XSS)

**Examples:**
- ✅ Valid: "I need help building a SaaS platform for managing customer subscriptions." (72 chars)
- ❌ Invalid: "Help!" (5 chars, too short), "Lorem ipsum..." × 50 (>250 chars)

**Error Messages:**
- Empty: "Message is required"
- Too short: "Message must be at least 20 characters"
- Too long: "Message must not exceed 250 characters"

---

## Discovery Call Form Validation Rules

### Additional Field: Preferred Time

**Required:** Yes

**Client-Side Rules:**
- Minimum length: 10 characters
- Maximum length: 200 characters
- Free-form text (any format accepted)

**Server-Side Rules:**
- Trim whitespace
- No specific format validation (user can write anything)

**Examples:**
- ✅ Valid: "Next Tuesday afternoon, 2-4pm EST", "Weekday mornings work best", "January 25th at 3pm"
- ❌ Invalid: "ASAP" (too short, < 10 chars), "anytime" (too short)

**Error Messages:**
- Empty: "Preferred date/time is required"
- Too short: "Please provide your preferred date and time (at least 10 characters)"

---

## Newsletter Form Validation Rules

### Field: Email (Only Field)

**Required:** Yes

**Rules:** Same as Contact Form email validation

**No other fields** - maximum simplicity

---

## Unsubscribe Form Validation Rules

### Field: Email (Only Field)

**Required:** Yes

**Rules:** Same as Contact Form email validation

---

## Rate Limiting Rules

**Applied to all forms:**

| Rule | Value | Scope | Enforcement |
|------|-------|-------|-------------|
| Max submissions per email | 1 | Per 5 minutes | Server-side |
| Window duration | 5 minutes (300 seconds) | All forms combined | Server-side |
| Response on limit hit | 429 status code | N/A | Server-side |

**Behavior:**
- Track by email address
- Same email across different forms shares rate limit
- Example: Submit contact form at 2:00 PM → Cannot submit any form until 2:05 PM with same email

**Error Message:**
"Please wait before submitting again. You can submit once every 5 minutes."

---

## reCAPTCHA v3 Rules

**Applied to all forms:**

| Parameter | Value | Notes |
|-----------|-------|-------|
| Version | reCAPTCHA v3 | Invisible, no user interaction |
| Action name | `contact_form`, `discovery_form`, `newsletter_signup` | Tracks different forms |
| Minimum score | 0.5 | Threshold for acceptance |
| Verification | Server-side only | Never trust client |

**Score Interpretation:**
- 0.9 - 1.0: Very likely legitimate user
- 0.7 - 0.9: Likely legitimate
- 0.5 - 0.7: Neutral (accept)
- 0.0 - 0.5: Likely bot (reject)

**Error Message (Score < 0.5):**
"Security verification failed. Please try again."

---

## General Validation Principles

### Client-Side Validation (UX)
- ✅ Real-time feedback as user types
- ✅ Show green checkmark for valid fields
- ✅ Show red border + error message for invalid fields
- ✅ Disable submit button until form is valid
- ✅ Character counters for length-limited fields

### Server-Side Validation (Security)
- ✅ **Never trust client input**
- ✅ Validate every field, every time
- ✅ Sanitize all strings (escape HTML)
- ✅ Reject invalid data with clear errors
- ✅ Log validation failures for security monitoring

### Error Message Guidelines
- ✅ Clear and specific ("Email is required" not "Invalid input")
- ✅ Actionable ("Please include country code" not "Wrong format")
- ✅ User-friendly (no technical jargon)
- ✅ Consistent tone (helpful, professional)

---

## Validation Error Response Format

### Client-Side (Form State)
```javascript
{
  name: {
    isValid: false,
    error: "Name must be at least 2 characters"
  },
  email: {
    isValid: true,
    error: null
  },
  message: {
    isValid: false,
    error: "Message must be at least 20 characters"
  }
}
```

### Server-Side (API Response)
```json
{
  "success": false,
  "error": "Validation failed: Email is required"
}
```

or

```json
{
  "success": false,
  "error": "Missing required fields",
  "details": {
    "name": "Name is required",
    "message": "Message must be at least 20 characters"
  }
}
```

---

## Validation Libraries

### Client-Side
- **React Hook Form** (v7.x): Form state management
- **Zod** (v3.x): Schema validation
- Validation runs on `onChange` (real-time)

### Server-Side
- **Zod** (v3.x): Same schemas as client-side
- Manual validation for additional checks
- Sanitization with standard JavaScript methods

---

## Edge Cases & Special Handling

### International Characters
- **Names:** Accept Unicode letters (José, François, 文字)
- **Emails:** Follow RFC 5322 (most characters allowed in local part)
- **Pattern:** Use Unicode-aware regex where needed

### Whitespace
- **Leading/Trailing:** Always trim before validation
- **Internal:** Allow in names (e.g., "Mary Jane")
- **Empty After Trim:** Treat as empty/invalid

### Case Sensitivity
- **Emails:** Normalize to lowercase for consistency
- **Names:** Preserve user's capitalization
- **Enums:** Match exactly (case-sensitive)

### HTML/Script Injection
- **All Fields:** Escape HTML entities before sending in emails
- **Never:** Render user input as HTML without escaping
- **Prevention:** Use safe email template rendering (React Email, plain text)

---

## Testing Validation

### Test Cases Required

**Name Field:**
- [ ] Empty string → Error
- [ ] "J" (1 char) → Error
- [ ] "Jo" (2 chars) → Valid
- [ ] "John-Doe" → Valid
- [ ] "O'Brien" → Valid
- [ ] "John123" → Error (numbers)
- [ ] "John@Doe" → Error (special chars)

**Email Field:**
- [ ] Empty → Error
- [ ] "test" → Error
- [ ] "test@" → Error
- [ ] "test@example" → Error
- [ ] "test@example.com" → Valid
- [ ] "user+tag@example.co.uk" → Valid

**Phone Field:**
- [ ] Empty (contact form) → Valid (optional)
- [ ] Empty (discovery form) → Error (required)
- [ ] "1234567890" → Error (no country code)
- [ ] "+1 234 567 8900" → Valid
- [ ] "+44 20 1234 5678" → Valid

**Message/Description:**
- [ ] Empty → Error
- [ ] "Short" (5 chars) → Error
- [ ] "This is exactly twenty characters." (20 chars) → Valid
- [ ] [250 characters] → Valid
- [ ] [251 characters] → Error

**Rate Limiting:**
- [ ] Submit once → Success
- [ ] Submit again immediately → 429 Error
- [ ] Wait 5 minutes, submit → Success

**reCAPTCHA:**
- [ ] Valid token, score 0.9 → Success
- [ ] Valid token, score 0.4 → 403 Error
- [ ] Invalid token → 403 Error

---

## Related Documentation

- [Data Requirements](./data-requirements.md)
- [PRD - Form Validation Rules](../PRD.md#form-validation-rules)
- [US-005: Form Validation (Contact)](../epics/epic-2-contact-form/US-005-form-validation.md)
- [US-009: Form Validation (Discovery)](../epics/epic-3-discovery-call/US-009-booking-validation.md)

---

**Maintained By:** Business Analyst
**Last Updated:** 2026-01-22
**Version:** 1.0