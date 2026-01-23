# User Story: Unsubscribe Page

**ID:** US-013
**Epic:** [Epic 4 - Newsletter Subscription System](./README.md)
**Priority:** Must Have (Legal Requirement)
**Persona:** Newsletter Subscriber
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **newsletter subscriber**,
I want to **easily unsubscribe from the newsletter**,
So that **I stop receiving emails I no longer want**.

---

## Business Context

Unsubscribe functionality is legally required (CAN-SPAM Act, GDPR). It must be simple, functional, and respectful. Making unsubscribe difficult damages brand reputation and violates laws.

---

## Acceptance Criteria

**Given** I want to unsubscribe from the newsletter
**When** I click the unsubscribe link in a newsletter email
**Then** I am taken to `/unsubscribe` page
**And** I see a clear heading "Unsubscribe from Newsletter"
**And** I see a message explaining what will happen
**And** I see an email input field
**And** I see an "Unsubscribe" button

**Given** I enter my email and click Unsubscribe
**When** the form is submitted
**Then** I see a success message
**And** my email is removed from the subscriber list
**And** I will no longer receive newsletters

**Given** I change my mind after seeing the unsubscribe page
**When** I view the page
**Then** I see an option to re-subscribe or go back to the website

---

## Technical Notes

### Unsubscribe Page Structure

```jsx
// pages/unsubscribe.jsx
import { useState } from 'react';

export default function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // For Phase 1: Manual process
      // Log unsubscribe request, team removes manually
      // Future: Integrate with email marketing platform

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus('success');
      setMessage('You\'ve been unsubscribed. You won\'t receive any more newsletters from us.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again or email us at contact@mountarc.com');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Unsubscribe from Newsletter
          </h1>
          {status !== 'success' && (
            <p className="text-gray-400">
              We're sorry to see you go! Enter your email below to unsubscribe from our newsletter.
            </p>
          )}
        </div>

        {status !== 'success' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'loading'}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-mint-green focus:ring-1 focus:ring-mint-green disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Unsubscribing...' : 'Unsubscribe'}
            </button>

            {message && status === 'error' && (
              <p className="text-sm text-red-400 text-center">{message}</p>
            )}
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-mint-green font-medium">{message}</p>
            <p className="text-gray-400 text-sm">
              Changed your mind? You can re-subscribe anytime on our{' '}
              <a href="/" className="text-mint-green hover:underline">
                website
              </a>
              .
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-gray-400 hover:text-mint-green transition-colors">
            ← Back to homepage
          </a>
        </div>
      </div>
    </div>
  );
}
```

### Phase 1 Implementation
**Manual Process:**
1. User submits unsubscribe request
2. System logs email address (console, file, or simple endpoint)
3. Team manually removes email from subscriber list
4. Confirmation shown to user

**Future Enhancement (Phase 2):**
- Integrate with email marketing platform API
- Automated removal from database
- Track unsubscribe reasons

---

## Design Notes

### Unsubscribe Button Color
- Use red (#dc2626) instead of mint green
- Indicates destructive action
- Hover state: darker red (#b91c1c)

### Messaging Tone
- Respectful and understanding
- No dark patterns or guilt
- Simple, clear process
- Option to return/re-subscribe

---

## Definition of Done

- [ ] `/unsubscribe` page created
- [ ] Email input field functional
- [ ] Unsubscribe button works
- [ ] Success message displays
- [ ] Manual removal process documented
- [ ] Option to return to website
- [ ] Mobile responsive
- [ ] Tested on multiple devices
- [ ] Code reviewed and committed

---

## Open Questions

1. **Unsubscribe Mechanism:** How to handle unsubscribe in Phase 1?
   - **Answer:** Manual - log request, team removes from list
   - **Future:** Automate with Mailchimp/ConvertKit integration

2. **Unsubscribe Link Format:** What should the link in emails look like?
   - **Format:** `https://mountarc-website-final.vercel.app/unsubscribe?email={encoded_email}`
   - **Or:** Just `/unsubscribe` and user enters email manually (simpler for Phase 1)
   - **Recommendation:** Start with manual entry (simpler), pre-fill in Phase 2

---

## Related Stories

- **Depends On:** US-011 (Newsletter signup)
- **Related:** US-002 (Email templates with unsubscribe link)

---

## References

- [PRD - Unsubscribe Page](../../PRD.md#feature-6-unsubscribe-page)
- [CAN-SPAM Act Requirements](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Version:** 1.0