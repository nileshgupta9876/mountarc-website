# User Story: Thank You Page

**ID:** US-014
**Epic:** [Epic 5 - Supporting Infrastructure](./README.md)
**Priority:** Must Have
**Persona:** All Users
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **user who has submitted a form**,
I want to **see a clear confirmation that my submission was successful**,
So that **I know my message was received and what to expect next**.

---

## Acceptance Criteria

**Given** I have successfully submitted any form (contact, discovery, newsletter)
**When** the submission completes
**Then** I am redirected to `/thank-you` page
**And** I see a clear success heading
**And** I see confirmation that my submission was received
**And** I see what happens next (response time, process)

**Given** I am on the thank you page
**When** I view the page content
**Then** I see action buttons for next steps (explore services, view work, read blog)
**And** I see alternative contact information
**And** the page matches the website design

**Given** I am on mobile
**When** I view the thank you page
**Then** all content is readable
**And** buttons are touch-friendly
**And** layout is responsive

---

## Technical Notes

### Thank You Page Structure

```jsx
// pages/thank-you.jsx
export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-mint-green rounded-full mx-auto flex items-center justify-center">
            <svg
              className="w-10 h-10 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Thank You! We'll Be In Touch Soon
        </h1>

        {/* Confirmation Message */}
        <p className="text-lg text-gray-300 mb-8">
          Your message has been received! Our team will review it and respond within 24 hours during business days.
        </p>

        <p className="text-gray-400 mb-8">
          We've also sent you a confirmation email.
        </p>

        {/* What Happens Next */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8 text-left">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            What Happens Next
          </h2>
          <ol className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-mint-green font-semibold mr-3">1.</span>
              <span>Our team reviews your submission</span>
            </li>
            <li className="flex items-start">
              <span className="text-mint-green font-semibold mr-3">2.</span>
              <span>We'll reach out via email or phone</span>
            </li>
            <li className="flex items-start">
              <span className="text-mint-green font-semibold mr-3">3.</span>
              <span>We'll discuss your project and next steps</span>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            While You Wait
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/services"
              className="px-6 py-3 bg-mint-green text-dark font-semibold rounded-lg hover:bg-mint-green-dark transition-colors"
            >
              Explore Our Services →
            </a>
            <a
              href="/work"
              className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
            >
              View Our Work →
            </a>
            <a
              href="/blog"
              className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
            >
              Read Our Blog →
            </a>
          </div>
        </div>

        {/* Alternative Contact */}
        <div className="text-gray-400 text-sm">
          <p>
            Need urgent assistance?{' '}
            <a
              href="mailto:contact@mountarc.com"
              className="text-mint-green hover:underline"
            >
              Email us at contact@mountarc.com
            </a>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-8">
          <a
            href="/"
            className="text-gray-400 hover:text-mint-green transition-colors"
          >
            ← Back to homepage
          </a>
        </div>
      </div>
    </div>
  );
}
```

### SEO Meta Tags

```jsx
import Head from 'next/head';

export default function ThankYouPage() {
  return (
    <>
      <Head>
        <title>Thank You | MountArc</title>
        <meta name="description" content="Thank you for contacting MountArc. We'll be in touch soon!" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {/* Page content */}
    </>
  );
}
```

---

## Design Notes

### Success Icon
- Large checkmark in mint green circle
- Positioned above heading
- Provides immediate visual confirmation

### Tone
- Warm and appreciative ("Thank You!")
- Reassuring ("We'll be in touch")
- Professional and helpful

### Action Buttons
- Primary: Mint green (Explore Services)
- Secondary: Gray (View Work, Read Blog)
- Clear hierarchy

---

## Definition of Done

- [ ] `/thank-you` page created
- [ ] Success icon/design implemented
- [ ] All content sections present
- [ ] Action buttons functional
- [ ] Alternative contact info shown
- [ ] SEO meta tags added
- [ ] Mobile responsive
- [ ] Tested from all forms
- [ ] Code reviewed and committed

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Version:** 1.0