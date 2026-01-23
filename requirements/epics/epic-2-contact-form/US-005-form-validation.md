# User Story: Form Validation & Error Handling

**ID:** US-005
**Epic:** [Epic 2 - Contact Form System](./README.md)
**Priority:** Must Have (Critical)
**Persona:** All Users (Startup Founder, Small Business Owner, Blog Reader)
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **user filling out the contact form**,
I want to **receive immediate feedback on my input**,
So that **I can correct errors before submitting and successfully send my message**.

---

## Business Context

Form validation prevents user frustration and ensures high-quality data. Real-time validation improves UX by catching errors early, reducing failed submissions, and increasing form completion rates. Poor validation leads to user abandonment and lost leads.

---

## Acceptance Criteria

### Primary Criteria

**Given** I am filling out the contact form
**When** I enter data into a required field
**Then** the field is validated in real-time as I type
**And** I see a green checkmark when the field is valid
**And** I see a red error message when the field is invalid

**Given** I try to submit the form with empty required fields
**When** I click the "Send Message" button
**Then** the form prevents submission
**And** error messages appear below each empty required field
**And** the first invalid field receives focus

**Given** I enter an invalid email address
**When** I type in the email field (e.g., "john@" or "john.com")
**Then** I see an error message "Please enter a valid email address"
**And** the email field border turns red
**And** the form cannot be submitted

**Given** I enter a message shorter than 20 characters
**When** I type in the message field
**Then** I see a character counter showing remaining characters
**And** I see an error if message is under 20 characters
**And** the submit button is disabled until message is valid

**Given** all required fields are filled correctly
**When** I view the form
**Then** the submit button is enabled
**And** I can submit the form successfully

---

## Edge Cases

### Edge Case 1: Pasting Content into Fields
**Scenario:** User pastes email or message from clipboard
**Expected Behavior:** Validation runs after paste, immediate feedback
**Handling:** Validate on paste event

### Edge Case 2: Auto-fill/Browser Auto-complete
**Scenario:** Browser auto-fills name and email
**Expected Behavior:** Validation runs, fields marked as valid
**Handling:** Listen for change events, validate auto-filled values

### Edge Case 3: Special Characters in Name
**Scenario:** User enters name with apostrophe (O'Brien) or hyphen (Mary-Jane)
**Expected Behavior:** Validation accepts these characters
**Handling:** Allow letters, spaces, hyphens, apostrophes

### Edge Case 4: International Characters
**Scenario:** User enters name with accents (José, François)
**Expected Behavior:** Validation accepts Unicode letters
**Handling:** Use Unicode-aware regex

### Edge Case 5: Exactly 20 or 250 Characters
**Scenario:** User types exactly the min/max character count
**Expected Behavior:** Validation passes (inclusive boundaries)
**Handling:** >= 20 and <= 250

### Edge Case 6: Copy-Paste Long Text
**Scenario:** User pastes 300-character message
**Expected Behavior:** Field truncates at 250, shows error
**Handling:** Limit input length, show character counter

---

## Dependencies

### Prerequisites
- [x] US-004 (Contact Form Page) - needs form structure

### Technical Dependencies
- React Hook Form library (`react-hook-form@^7.x`)
- Zod validation library (`zod@^3.x`)

### Blocks
- US-007 (Form Submission) - needs validation to pass before submit

---

## Technical Notes

### Implementation with React Hook Form + Zod

**Install Dependencies:**
```bash
npm install react-hook-form zod @hookform/resolvers
```

**Validation Schema (Zod):**
```javascript
// lib/validation/contactFormSchema.js
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+\d{1,3}\s?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/.test(val),
      'Please include country code (e.g., +1)'
    ),

  projectType: z
    .string()
    .optional(),

  budgetRange: z
    .string()
    .optional(),

  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(250, 'Message must not exceed 250 characters'),
});
```

**Form Component with Validation:**
```javascript
// components/forms/ContactForm.jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '../../lib/validation/contactFormSchema';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange', // Validate on change (real-time)
  });

  const message = watch('message', '');
  const messageLength = message?.length || 0;

  const onSubmit = async (data) => {
    // Handle form submission (US-007)
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="John Doe"
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 ${
            errors.name
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-700 focus:border-mint-green focus:ring-mint-green'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder="john@company.com"
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 ${
            errors.email
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-700 focus:border-mint-green focus:ring-mint-green'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone (Optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          placeholder="+1 (555) 123-4567"
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 ${
            errors.phone
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-700 focus:border-mint-green focus:ring-mint-green'
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
          Project Type
        </label>
        <select
          {...register('projectType')}
          id="projectType"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-mint-green focus:ring-1 focus:ring-mint-green"
        >
          <option value="">Select project type...</option>
          <option value="AI-Enabled Web Application">AI-Enabled Web Application</option>
          <option value="Real-Time Dashboard">Real-Time Dashboard</option>
          <option value="SaaS Product Development">SaaS Product Development</option>
          <option value="FinTech Solution">FinTech Solution</option>
          <option value="API Development">API Development</option>
          <option value="MVP Development">MVP Development</option>
          <option value="Trading">Trading</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Budget Range */}
      <div>
        <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-300 mb-2">
          Budget Range
        </label>
        <select
          {...register('budgetRange')}
          id="budgetRange"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-mint-green focus:ring-1 focus:ring-mint-green"
        >
          <option value="">Select budget range...</option>
          <option value="Under $5,000">Under $5,000</option>
          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows="5"
          placeholder="Tell us about your project..."
          maxLength="250"
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 resize-y ${
            errors.message
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-700 focus:border-mint-green focus:ring-mint-green'
          }`}
        />
        <div className="flex justify-between mt-1">
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          )}
          <p className={`text-xs ml-auto ${messageLength > 250 ? 'text-red-500' : 'text-gray-500'}`}>
            {messageLength}/250 characters
          </p>
        </div>
      </div>

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
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

---

## Design Notes

### Error State Styling
- **Border:** Red (#ef4444)
- **Text:** Red (#ef4444)
- **Icon:** Red X or exclamation (optional)

### Success State Styling
- **Border:** Mint green (#10b981)
- **Icon:** Green checkmark (optional)

### Character Counter
- **Normal:** Gray 500 (#6b7280)
- **Over limit:** Red 500 (#ef4444)
- **Position:** Bottom right of textarea

---

## Testing Notes

### Validation Testing Checklist
- [ ] Empty required fields show errors on submit
- [ ] Name: Accept "John", "Mary-Jane", "O'Brien", "José"
- [ ] Name: Reject numbers, special chars (except - and ')
- [ ] Email: Accept valid emails (test@example.com)
- [ ] Email: Reject invalid (test@, @example.com, test.com)
- [ ] Phone: Accept with country code (+1234567890)
- [ ] Phone: Reject without country code (1234567890)
- [ ] Message: Accept 20-250 characters
- [ ] Message: Reject <20 or >250 characters
- [ ] Character counter updates in real-time
- [ ] Submit button disabled when form invalid
- [ ] Submit button enabled when form valid

---

## Definition of Done

- [ ] React Hook Form integrated
- [ ] Zod validation schema created
- [ ] Real-time validation working
- [ ] Error messages display correctly
- [ ] Character counter working
- [ ] Submit button enables/disables correctly
- [ ] All validation rules tested
- [ ] Edge cases handled
- [ ] Code reviewed
- [ ] Committed to git

---

## Related Stories

- **Depends On:** US-004 (Contact Form Page)
- **Blocks:** US-007 (Form Submission)

---

## References

- [PRD - Form Validation Rules](../../PRD.md#form-validation-rules)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0