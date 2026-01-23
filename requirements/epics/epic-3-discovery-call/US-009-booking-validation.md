# User Story: Booking Form Validation

**ID:** US-009
**Epic:** [Epic 3 - Discovery Call Booking System](./README.md)
**Priority:** Must Have
**Persona:** All Users
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **user booking a discovery call**,
I want to **receive immediate feedback on my input**,
So that **I can correct errors and successfully submit my booking**.

---

## Acceptance Criteria

**Given** I am filling out the booking form
**When** I enter data into fields
**Then** real-time validation provides immediate feedback
**And** invalid fields show clear error messages
**And** valid fields show green indicators

**Given** I try to submit with missing required fields
**When** I click the submit button
**Then** the form prevents submission
**And** error messages appear for each invalid field

**Given** phone number is required for booking
**When** I leave the phone field empty
**Then** I see error "Phone number is required"
**And** I cannot submit until phone is provided with country code

---

## Technical Notes

### Validation Schema (Zod)

```javascript
// lib/validation/discoveryCallSchema.js
import { z } from 'zod';

export const discoveryCallSchema = z.object({
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
    .min(1, 'Phone number is required for booking a call')
    .regex(
      /^\+\d{1,3}\s?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/,
      'Please include country code (e.g., +1)'
    ),

  preferredTime: z
    .string()
    .min(10, 'Please provide your preferred date and time')
    .max(200, 'Preferred time must not exceed 200 characters'),

  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(250, 'Description must not exceed 250 characters'),

  budgetRange: z
    .string()
    .min(1, 'Please select a budget range'),
});
```

### Key Validation Differences from Contact Form
- **Phone:** Required (not optional)
- **Preferred Time:** New field, 10-200 chars
- **Description:** Required, 20-250 chars (like message field)
- **Budget:** Required (not optional)
- **No Project Type:** Not needed for discovery calls

---

## Definition of Done

- [ ] Zod validation schema created
- [ ] Real-time validation working
- [ ] Phone validation requires country code
- [ ] Preferred time field validated
- [ ] Budget required and validated
- [ ] All error messages clear
- [ ] Character counter on description field
- [ ] Code reviewed and committed

---

## Related Stories

- **Depends On:** US-008
- **Similar To:** US-005 (Contact Form Validation)

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Version:** 1.0