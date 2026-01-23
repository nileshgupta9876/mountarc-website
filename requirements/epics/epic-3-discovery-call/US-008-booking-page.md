# User Story: Discovery Call Booking Page & Layout

**ID:** US-008
**Epic:** [Epic 3 - Discovery Call Booking System](./README.md)
**Priority:** Must Have (Critical)
**Persona:** Startup Founder, Small Business Owner
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **potential client**,
I want to **access a professional discovery call booking page**,
So that **I can easily schedule a consultation with MountArc**.

---

## Business Context

The booking page is a key conversion point - visitors who book calls are highly qualified leads. The page must build confidence, set clear expectations, and make booking frictionless.

---

## Acceptance Criteria

### Primary Criteria

**Given** I am interested in MountArc's services
**When** I navigate to `/book-call`
**Then** I see a professional booking page
**And** the heading is "Book Your Free Discovery Call"
**And** there is a clear explanation of what to expect
**And** the booking form is prominently displayed

**Given** I am viewing the booking page
**When** I read the "What to Expect" section
**Then** I see benefits of the discovery call
**And** reassurance that it's free and no-pressure
**And** clear next steps (team will reach out within 24 hours)

**Given** I am on mobile
**When** I view the booking page
**Then** all content is readable without zooming
**And** buttons are touch-friendly
**And** there is no horizontal scrolling

---

## Technical Notes

### Page Structure

**File:** `/pages/book-call.jsx`

```jsx
export default function BookCallPage() {
  return (
    <div className="min-h-screen bg-dark">
      <main className="container mx-auto px-4 py-16">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Book Your Free Discovery Call
          </h1>
          <p className="text-lg text-gray-300">
            Let's discuss your project - no pressure, no commitment
          </p>
        </div>

        {/* What to Expect */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              What to Expect:
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-mint-green mr-2">✓</span>
                <span>30-45 minute consultation</span>
              </li>
              <li className="flex items-start">
                <span className="text-mint-green mr-2">✓</span>
                <span>Discuss your goals and challenges</span>
              </li>
              <li className="flex items-start">
                <span className="text-mint-green mr-2">✓</span>
                <span>Get honest feedback and recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="text-mint-green mr-2">✓</span>
                <span>No sales pressure</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Booking Form */}
        <div className="max-w-xl mx-auto">
          <DiscoveryCallForm />
        </div>

        {/* Reassurance */}
        <div className="max-w-xl mx-auto mt-8 text-center text-gray-400 text-sm">
          <p>
            We'll confirm your preferred time within 24 hours. All consultations are completely free.
          </p>
        </div>
      </main>
    </div>
  );
}
```

---

## Design Notes

### What to Expect Section
- Box with subtle background and border
- Checkmarks in mint green
- Clear, benefit-focused bullets
- Builds confidence and sets expectations

### Tone
- Welcoming and professional
- Emphasize "free" and "no pressure"
- Set clear timeline (24-hour response)

---

## Definition of Done

- [ ] `/book-call` page created
- [ ] Page structure implemented
- [ ] "What to Expect" section added
- [ ] Booking form integrated
- [ ] Reassurance text added
- [ ] Mobile responsive
- [ ] Matches design system
- [ ] Code reviewed and committed

---

## Related Stories

- **Depends On:** None
- **Blocks:** US-009, US-010
- **Similar To:** US-004 (Contact Form Page)

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Version:** 1.0