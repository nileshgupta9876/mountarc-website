# Bug Report: [Brief Description]

**Bug ID**: BUG-[number] or GitHub Issue #[number]
**Reported By**: [QA Name]
**Reported Date**: YYYY-MM-DD
**Severity**: Critical / High / Medium / Low
**Priority**: Urgent / High / Medium / Low
**Status**: New / In Progress / Fixed / Verified / Closed / Reopened / Won't Fix
**Assigned To**: [Developer Name]
**Target Fix Date**: YYYY-MM-DD

---

## Summary

[One-sentence clear description of the bug]

**Example:** Payment processing fails for Visa cards when order total exceeds $1000

---

## Severity Classification

**Selected: [Critical / High / Medium / Low]**

### Severity Definitions:

**Critical**: 
- System crash, data loss, security breach, complete feature failure
- Production down or major functionality completely broken
- No workaround available
- Immediate fix required

**High**: 
- Major functionality broken, significant user impact
- Workaround is difficult or time-consuming
- Affects critical user workflows
- Fix required before release

**Medium**: 
- Functionality impaired but workaround exists
- Moderate user impact
- Can be released with known issue and workaround
- Fix should be prioritized in next sprint

**Low**: 
- Minor issues, cosmetic problems
- Minimal user impact
- Easy workaround or users may not notice
- Can be fixed in future releases

---

## Environment

| Field | Value |
|-------|-------|
| **Application Version** | [e.g., v1.5.2] |
| **Environment** | Production / Staging / Test / Local |
| **Environment URL** | [e.g., https://staging.example.com] |
| **Operating System** | Windows 11 / macOS 14 / Ubuntu 22.04 / iOS 17 / Android 14 |
| **Browser** | Chrome 121 / Firefox 122 / Safari 17 / Edge 121 |
| **Device** | Desktop / Mobile / Tablet |
| **Screen Size** | [e.g., 1920x1080 / iPhone 15 Pro] |
| **User Role** | Admin / Standard User / Guest |
| **Database Version** | [if relevant - e.g., PostgreSQL 15.2] |

---

## Steps to Reproduce

**Preconditions:**
- [Required state before bug can be reproduced]
- [e.g., User is logged in as Admin]
- [e.g., Shopping cart has 5 items totaling $1200]
- [e.g., Test credit card data is available]

**Steps:**
1. [First specific action - be precise]
   - Example: Navigate to checkout page (https://staging.example.com/checkout)
2. [Second specific action]
   - Example: Select payment method "Credit Card"
3. [Third specific action]
   - Example: Enter card number: 4111-1111-1111-1111 (Visa test card)
4. [Fourth specific action]
   - Example: Enter expiry: 12/25, CVV: 123
5. [Final action that triggers the bug]
   - Example: Click "Pay Now" button
6. [Observe the result]

**Important:**
- Be specific about what is clicked, typed, selected
- Include exact URLs, field values, button names
- Number each step clearly
- Anyone should be able to reproduce following these steps

---

## Expected Result

[What should happen according to requirements/design]

**Example:**
- Payment is processed successfully
- Order confirmation page displays
- Confirmation email is sent to user
- Order status changes to "Payment Received"
- User sees message: "Payment successful! Order #12345 confirmed"

---

## Actual Result

[What actually happens - the bug]

**Example:**
- Error message displays: "Payment processing failed. Error code: PG_001"
- Payment is not processed
- User remains on payment page
- No confirmation email sent
- Order status remains "Pending Payment"
- Network tab shows API response: 500 Internal Server Error

---

## Evidence

### Screenshots
- [Attach or link to screenshots showing the issue]
- Screenshot 1: Error message displayed [attached]
- Screenshot 2: Network tab showing failed API call [attached]
- Screenshot 3: Console errors [attached]

### Videos
- [Link to screen recording if available]
- Video walkthrough: [link to Loom/recording]

### Console Errors
```
[Paste relevant console errors]
Example:
ERROR: Uncaught TypeError: Cannot read property 'amount' of undefined
    at PaymentService.processPayment (payment.js:145)
    at checkout.js:89
```

### Network Logs
```
[Paste relevant network request/response]
Example:
POST /api/v1/payments
Status: 500 Internal Server Error
Response: {
  "error": "Payment gateway timeout",
  "code": "PG_001",
  "timestamp": "2025-01-21T10:30:45Z"
}
```

### Server Logs
```
[Paste relevant server-side logs if available]
Example:
[2025-01-21 10:30:45] ERROR PaymentController: Connection timeout to payment gateway
[2025-01-21 10:30:45] ERROR PaymentController: Transaction ID: TXN-98765
```

---

## Test Data Used

| Field | Value |
|-------|-------|
| **User Email** | testuser@example.com |
| **User ID** | 12345 |
| **Order ID** | ORD-98765 |
| **Card Number** | 4111-1111-1111-1111 (Visa test) |
| **Card Expiry** | 12/25 |
| **CVV** | 123 |
| **Order Total** | $1,250.00 |
| **Currency** | USD |
| **[Other Data]** | [Value] |

**Note:** All test data should be clearly documented so developers can reproduce using the same data.

---

## Frequency / Reproducibility

**Selected: [Choose one]**

- ☑ **Every Time** - Bug occurs 100% of the time following the steps
- ☐ **Frequent** - Bug occurs >75% of the time (e.g., 8 out of 10 attempts)
- ☐ **Intermittent** - Bug occurs 25-75% of the time
- ☐ **Rare** - Bug occurs <25% of the time
- ☐ **One Time** - Bug only occurred once, cannot reproduce

**Reproduction Rate:** [X out of Y attempts]
- Example: 10 out of 10 attempts
- Example: 3 out of 5 attempts (60%)

---

## Impact Analysis

### User Impact
[Describe how this affects users]

**Example:**
- Users cannot complete purchases for orders over $1000
- Affects approximately 15% of all orders (based on analytics)
- Estimated revenue loss: $5,000 per day
- User frustration and potential cart abandonment

### Business Impact
[Describe business/revenue impact]

**Example:**
- Direct revenue loss from failed high-value transactions
- Damage to brand reputation
- Potential compliance issues (PCI DSS)
- Customer support tickets increasing

### Affected Features
[List related features or areas affected]

- Payment processing
- Order fulfillment workflow
- Email notification system
- Analytics/reporting

---

## Workaround

**Workaround Available:** Yes / No

**If Yes, describe workaround:**
[Describe temporary solution users can use]

**Example:**
- Users can split orders into multiple smaller transactions (<$1000 each)
- Alternative payment methods (PayPal) work correctly
- Manual payment processing via admin panel

**If No:**
[Explain why no workaround is possible]

---

## Root Cause (Optional - filled by Developer)

[Developer analysis of what's causing the bug]

**Example:**
Payment gateway timeout configuration is set to 5 seconds for all transactions. High-value transactions require additional fraud checks and take 10-15 seconds, causing timeout errors.

---

## Proposed Solution (Optional - filled by Developer)

[Developer's plan to fix the bug]

**Example:**
1. Increase timeout configuration to 30 seconds for payment gateway calls
2. Implement retry logic (3 attempts with exponential backoff)
3. Add better error handling and user messaging
4. Add logging for payment gateway response times

---

## Related Information

### Related Bugs
- Related to BUG-123: Timeout issues with payment gateway
- Possibly related to BUG-456: Error handling for failed payments

### Related Features
- Feature Spec: [link to payment processing spec]
- User Story: STORY-789

### Related Test Cases
- Test Case TC-PAYMENT-045: High-value transaction processing
- Test Case TC-PAYMENT-050: Payment gateway timeout handling

### Previous Occurrences
- First reported: 2025-01-15 (BUG-100) - marked as fixed but has resurfaced
- Similar issue in version 1.4.0 was resolved by [solution]

---

## Additional Context

[Any other relevant information]

**Example:**
- Bug only occurs with Visa cards; Mastercard and Amex work fine
- Issue started after deployment of version 1.5.2 on 2025-01-20
- Payment gateway (Stripe) reported no outages during testing
- Works correctly in test environment with same test data
- Only reproduces in production environment

---

## Fix Verification Plan

[How QA will verify the fix]

**Steps to verify fix:**
1. Deploy fix to staging environment
2. Execute test cases: TC-PAYMENT-045, TC-PAYMENT-050
3. Test with orders: $1000, $1500, $2000, $5000
4. Test with all card types: Visa, Mastercard, Amex
5. Verify no regression in normal payment flow (<$1000)
6. Run full payment regression suite
7. Monitor for 24 hours in production after deployment

**Success Criteria:**
- All high-value payments process successfully
- No timeout errors
- Response time <10 seconds for all payments
- No new bugs introduced

---

## Status Updates

### History

| Date | Status | Updated By | Notes |
|------|--------|------------|-------|
| 2025-01-21 | New | [QA Name] | Bug reported |
| 2025-01-21 | In Progress | [Dev Name] | Assigned to developer, investigating |
| [Date] | [Status] | [Name] | [Notes] |

### Comments

**[Date] - [Name]:**
[Comment text]

**[Date] - [Name]:**
[Comment text]

---

## Attachments

- [ ] Screenshot: error-message.png
- [ ] Screenshot: network-logs.png
- [ ] Screenshot: console-errors.png
- [ ] Video: bug-reproduction.mp4
- [ ] Log file: server-logs.txt
- [ ] Test data: test-data.json

---

**Bug Report Template Version:** 1.0
**Created:** YYYY-MM-DD
**Last Updated:** YYYY-MM-DD
