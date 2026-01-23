# User Story: Contact Form Page & Layout

**ID:** US-004
**Epic:** [Epic 2 - Contact Form System](./README.md)
**Priority:** Must Have (Critical)
**Persona:** Startup Founder, Small Business Owner
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **potential client**,
I want to **access a professional contact form on the website**,
So that **I can easily reach out to MountArc about my project**.

---

## Business Context

The contact page is the primary lead generation tool for MountArc. It must make a strong first impression, be easy to find, and provide a frictionless way for potential clients to initiate contact. A poorly designed contact form can lose qualified leads.

---

## Acceptance Criteria

### Primary Criteria

**Given** I am a website visitor interested in MountArc's services
**When** I navigate to `/contact` or click "Contact" in navigation
**Then** I see a professional contact page
**And** the page heading is "Get in Touch"
**And** there is a clear subheading explaining the purpose
**And** the contact form is prominently displayed
**And** all form fields are visible and labeled

**Given** I am viewing the contact page on mobile
**When** I scroll through the page
**Then** all form fields are easily accessible
**And** buttons are large enough to tap (44x44px minimum)
**And** text is readable without zooming
**And** there is no horizontal scrolling

**Given** I am using keyboard navigation
**When** I press Tab to navigate through the form
**Then** focus moves through fields in logical order
**And** focus indicators are clearly visible
**And** I can complete the entire form without using a mouse

---

## Edge Cases

### Edge Case 1: Long Content in Form Fields
**Scenario:** User types very long name or message
**Expected Behavior:** Field expands or scrolls appropriately, doesn't break layout
**Handling:** Set max-width, allow vertical scroll in textarea

### Edge Case 2: Very Small Mobile Screen (320px)
**Scenario:** User on iPhone SE or small Android device
**Expected Behavior:** Form still usable, all elements visible
**Handling:** Test at 320px breakpoint, adjust spacing if needed

### Edge Case 3: Large Desktop Screen (4K)
**Scenario:** User on ultra-wide or 4K display
**Expected Behavior:** Form stays centered, doesn't stretch too wide
**Handling:** Set max-width 600px, center container

### Edge Case 4: User Disables JavaScript
**Scenario:** JavaScript is disabled in browser
**Expected Behavior:** Form still renders, basic HTML functionality works
**Handling:** Ensure semantic HTML, progressive enhancement

### Edge Case 5: Slow Network Connection
**Scenario:** Page loads slowly on 3G connection
**Expected Behavior:** Core content visible quickly, no layout shift
**Handling:** Optimize images, lazy load non-critical content

---

## Dependencies

### Prerequisites
- Design mockup or wireframe for contact page
- Brand assets (logo, colors) available
- Tailwind CSS configured

### Technical Dependencies
- Next.js pages/routing
- React components
- Tailwind CSS

### Blocks
- US-005 (Form Validation) - needs form structure
- US-006 (reCAPTCHA) - needs form
- US-007 (Form Submission) - needs form

---

## Technical Notes

### Page Structure

**File:** `/pages/contact.jsx` (or `/app/contact/page.jsx` for App Router)

```jsx
// pages/contact.jsx
import ContactForm from '../components/forms/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark">
      {/* Header/Navigation (if not in layout) */}

      <main className="container mx-auto px-4 py-16">
        {/* Page Heading */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-300">
            Have a project in mind? Let's discuss how we can help you build something amazing.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-xl mx-auto">
          <ContactForm />
        </div>

        {/* Alternative Contact */}
        <div className="max-w-xl mx-auto mt-12 text-center text-gray-400">
          <p className="mb-4">Prefer email? Reach us directly at{' '}
            <a href="mailto:contact@mountarc.com" className="text-mint-green hover:underline">
              contact@mountarc.com
            </a>
          </p>
          <p>Or{' '}
            <a href="/book-call" className="text-mint-green hover:underline">
              book a discovery call
            </a>
          </p>
        </div>
      </main>

      {/* Footer (if not in layout) */}
    </div>
  );
}
```

### Form Component Structure

**File:** `/components/forms/ContactForm.jsx`

```jsx
export default function ContactForm() {
  return (
    <form className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-mint-green focus:ring-1 focus:ring-mint-green"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="john@company.com"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-mint-green focus:ring-1 focus:ring-mint-green"
        />
      </div>

      {/* Phone (Optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+1 (555) 123-4567"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-mint-green focus:ring-1 focus:ring-mint-green"
        />
      </div>

      {/* Project Type (Optional) */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-mint-green focus:ring-1 focus:ring-mint-green"
        >
          <option value="">Select project type...</option>
          <option value="ai-web-app">AI-Enabled Web Application</option>
          <option value="dashboard">Real-Time Dashboard</option>
          <option value="saas">SaaS Product Development</option>
          <option value="fintech">FinTech Solution</option>
          <option value="api">API Development</option>
          <option value="mvp">MVP Development</option>
          <option value="trading">Trading</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Budget Range (Optional) */}
      <div>
        <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-300 mb-2">
          Budget Range
        </label>
        <select
          id="budgetRange"
          name="budgetRange"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-mint-green focus:ring-1 focus:ring-mint-green"
        >
          <option value="">Select budget range...</option>
          <option value="under-5k">Under $5,000</option>
          <option value="5k-10k">$5,000 - $10,000</option>
          <option value="10k-25k">$10,000 - $25,000</option>
          <option value="25k-50k">$25,000 - $50,000</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Tell us about your project..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-mint-green focus:ring-1 focus:ring-mint-green resize-y"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">20-250 characters</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-mint-green text-dark font-semibold py-3 px-6 rounded-lg hover:bg-mint-green-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mint-green focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        Send Message
      </button>
    </form>
  );
}
```

### Tailwind Color Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a',
        'mint-green': '#10b981',
        'mint-green-dark': '#059669',
      },
    },
  },
};
```

---

## Design Notes

### Visual Hierarchy
1. **Page heading** - Large, bold, white text
2. **Subheading** - Smaller, gray text, explains purpose
3. **Form** - Centered, clean, dark cards
4. **Submit button** - Prominent mint green
5. **Alternative contact** - Smaller, below form

### Color Palette
- **Background:** Dark (#1a1a1a)
- **Form inputs:** Gray 800 background, Gray 700 border
- **Text:** White (primary), Gray 300 (secondary), Gray 500 (placeholder)
- **Accent:** Mint green (#10b981)
- **Error:** Red (#ef4444)
- **Success:** Green (#10b981)

### Typography
- **Heading (h1):** 2.25rem (36px), bold
- **Subheading:** 1.125rem (18px), regular
- **Labels:** 0.875rem (14px), medium weight
- **Input text:** 1rem (16px), regular
- **Placeholder:** 1rem (16px), gray
- **Helper text:** 0.75rem (12px), gray

### Spacing
- Container padding: 1rem (16px) mobile, 2rem (32px) desktop
- Form field spacing: 1.5rem (24px) between fields
- Label to input: 0.5rem (8px)
- Max form width: 600px (xl breakpoint)

---

## Testing Notes

### Visual Regression Testing
- [ ] Page matches design mockup
- [ ] Colors match brand guidelines
- [ ] Typography consistent with site
- [ ] Spacing uniform across devices

### Responsive Testing
- [ ] 320px (iPhone SE) - smallest
- [ ] 375px (iPhone standard)
- [ ] 768px (iPad portrait)
- [ ] 1024px (iPad landscape)
- [ ] 1440px (Desktop)
- [ ] 2560px (Large desktop)

### Accessibility Testing
- [ ] All inputs have labels
- [ ] Required fields marked with *
- [ ] Color contrast passes (4.5:1)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces fields correctly

### Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (iOS)
- [ ] Firefox (latest)
- [ ] Edge (latest)

---

## Definition of Done

- [ ] `/contact` page created and accessible
- [ ] Page structure implemented (heading, form, alternative contact)
- [ ] All 8 form fields present and styled
- [ ] Matches design system (dark theme + mint green)
- [ ] Mobile responsive (tested on 3 devices)
- [ ] Keyboard navigation works
- [ ] Accessibility basics met (labels, required indicators)
- [ ] No console errors
- [ ] Page loads quickly (< 3s mobile)
- [ ] Code reviewed
- [ ] Committed to git

---

## Open Questions

1. **Navigation:** Is there a site-wide navigation component, or do we need to create one?
   - **Action:** Check existing layout components

2. **SEO Meta Tags:** Should we add meta description and title for `/contact` page?
   - **Answer:** Yes, add basic SEO tags

3. **Footer:** Is there a global footer component?
   - **Action:** Check existing layout structure

4. **Icons:** Do we need icons for form fields (envelope for email, phone for phone, etc.)?
   - **Recommendation:** Not required for Phase 1, keep simple

---

## Related Stories

- **Depends On:** None (foundational UI story)
- **Blocks:** US-005 (Form Validation), US-006 (reCAPTCHA), US-007 (Form Submission)

---

## References

- [PRD - Contact Form](../../PRD.md#feature-2-contact-form-page)
- [Tailwind CSS Forms](https://tailwindcss.com/docs/forms)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0