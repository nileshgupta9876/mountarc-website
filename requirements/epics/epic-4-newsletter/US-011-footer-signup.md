# User Story: Footer Newsletter Signup Form

**ID:** US-011
**Epic:** [Epic 4 - Newsletter Subscription System](./README.md)
**Priority:** Must Have
**Persona:** Blog Reader, Community Member
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **blog reader**,
I want to **easily subscribe to MountArc's newsletter from any page**,
So that **I can receive updates without leaving the page I'm on**.

---

## Acceptance Criteria

**Given** I am on any page of the website
**When** I scroll to the footer
**Then** I see a "Stay Updated" newsletter section
**And** a clear value proposition
**And** an email input field
**And** a "Subscribe" button

**Given** I enter my email and click Subscribe
**When** the form submits successfully
**Then** I see an inline success message ("✓ Thanks! Check your email")
**And** the email field is cleared
**And** I remain on the same page (no reload/redirect)
**And** I receive a welcome email

**Given** I enter an invalid email
**When** I click Subscribe
**Then** I see an inline error message
**And** I can correct and resubmit

---

## Technical Notes

### Footer Newsletter Component

```jsx
// components/layout/Footer.jsx or components/NewsletterSignup.jsx
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export function NewsletterSignup() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      if (!executeRecaptcha) {
        setStatus('error');
        setMessage('Security verification unavailable');
        return;
      }

      const token = await executeRecaptcha('newsletter_signup');

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          data: {
            email,
            timestamp: new Date().toISOString(),
            pageUrl: window.location.href,
          },
          recaptchaToken: token,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage('✓ Thanks! Check your email for confirmation.');
        setEmail(''); // Clear input
      } else {
        setStatus('error');
        setMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
      <p className="text-sm text-gray-400 mb-4">
        Get bi-weekly insights on web development, AI, and building successful products. No spam, ever.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === 'loading'}
          className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-mint-green focus:ring-1 focus:ring-mint-green disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-2 bg-mint-green text-dark font-semibold rounded-lg hover:bg-mint-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {message && (
        <p
          className={`mt-2 text-sm ${
            status === 'success' ? 'text-mint-green' : 'text-red-400'
          }`}
        >
          {message}
        </p>
      )}

      <p className="text-xs text-gray-500 mt-3">
        Bi-weekly updates • Blog posts, resources, case studies • Unsubscribe anytime
      </p>
    </div>
  );
}
```

### Integration into Footer

```jsx
// components/layout/Footer.jsx
import { NewsletterSignup } from '../NewsletterSignup';

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto mb-8">
          <NewsletterSignup />
        </div>

        {/* Footer Links, Copyright, etc. */}
        {/* ... */}
      </div>
    </footer>
  );
}
```

---

## Design Notes

### Layout
- **Desktop:** Email input and button side-by-side
- **Mobile:** Stacked vertically

### Placement
- Above or within footer links
- Centered, max-width 700px
- Visually distinct but integrated

---

## Definition of Done

- [ ] Newsletter signup component created
- [ ] Integrated into footer
- [ ] Appears on all pages
- [ ] Email validation working
- [ ] reCAPTCHA v3 integrated
- [ ] Inline success/error messages
- [ ] Mobile responsive
- [ ] Tested end-to-end
- [ ] Code reviewed and committed

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Version:** 1.0