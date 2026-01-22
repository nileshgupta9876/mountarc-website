# Business Rules: [Feature/Module Name]

**Document Owner**: [BA Name or Role]
**Created**: [YYYY-MM-DD]
**Last Updated**: [YYYY-MM-DD]
**Status**: Draft / Review / Approved / Active

---

## 📋 Overview

[Brief description of what business rules are covered in this document and their purpose]

---

## Rule Category 1: [e.g., Pricing Rules]

### BR-001: [Rule Title/Name]

**Description**: [Clear statement of what the rule states]

**Applies To**: [Which entities, features, or users this rule affects]

**Validation**: [How to check if this rule is being followed]

**Example**: 
- ✅ Valid: [Concrete example that follows the rule]
- ❌ Invalid: [Concrete example that violates the rule]

**Exceptions**:
- Exception 1: [When this rule doesn't apply]
- Exception 2: [When this rule is modified]

**Business Justification**: [Why this rule exists]

**Priority**: Critical / High / Medium / Low

---

### BR-002: [Rule Title/Name]

**Description**: [Clear statement of what the rule states]

**Applies To**: [Which entities, features, or users this rule affects]

**Validation**: [How to check if this rule is being followed]

**Example**: 
- ✅ Valid: [Concrete example that follows the rule]
- ❌ Invalid: [Concrete example that violates the rule]

**Exceptions**:
- Exception 1: [When this rule doesn't apply]

**Business Justification**: [Why this rule exists]

**Priority**: Critical / High / Medium / Low

---

## Rule Category 2: [e.g., Access Control Rules]

### BR-003: [Rule Title/Name]

**Description**: [Clear statement of what the rule states]

**Applies To**: [Which entities, features, or users this rule affects]

**Validation**: [How to check if this rule is being followed]

**Example**: 
- ✅ Valid: [Concrete example that follows the rule]
- ❌ Invalid: [Concrete example that violates the rule]

**Exceptions**:
- [List any exceptions]

**Business Justification**: [Why this rule exists]

**Priority**: Critical / High / Medium / Low

---

### BR-004: [Rule Title/Name]

**Description**: [Clear statement of what the rule states]

**Applies To**: [Which entities, features, or users this rule affects]

**Validation**: [How to check if this rule is being followed]

**Example**: 
- ✅ Valid: [Concrete example that follows the rule]
- ❌ Invalid: [Concrete example that violates the rule]

**Exceptions**:
- [List any exceptions]

**Business Justification**: [Why this rule exists]

**Priority**: Critical / High / Medium / Low

---

## Rule Category 3: [Add more categories as needed]

[Continue with same format for additional rules]

---

## 🔄 Rule Dependencies

| Rule ID | Depends On | Relationship |
|---------|-----------|--------------|
| BR-002 | BR-001 | Must be validated after BR-001 |
| BR-004 | BR-003 | Only applies if BR-003 is satisfied |

---

## 🚨 Critical Rules (Priority: Critical)

These rules MUST be enforced at all times:

| Rule ID | Rule Name | Impact if Violated |
|---------|-----------|-------------------|
| BR-001 | [Rule Name] | [What happens if this rule is broken] |
| BR-003 | [Rule Name] | [What happens if this rule is broken] |

---

## 📊 Rule Implementation Guide

### For Engineering
- Rules marked **Critical** must have validation at both client and server
- Include appropriate error messages for rule violations
- Log all rule violation attempts for audit

### For QA
- Test each rule with valid and invalid scenarios
- Verify exceptions are handled correctly
- Confirm error messages match specifications

---

## 📚 Rule Change History

| Date | Rule ID | Change Description | Changed By | Approved By |
|------|---------|-------------------|------------|-------------|
| 2026-01-15 | BR-001 | Initial rule created | [BA Name] | [PM Name] |
| 2026-01-20 | BR-001 | Added exception for VIP users | [BA Name] | [PM Name] |

---

## ❓ Pending Decisions

- [ ] Decision 1: [What needs to be decided?]
- [ ] Decision 2: [What rule needs clarification?]

---

## 📝 Approval

- [ ] Business Owner Review - [Name] - [Date]
- [ ] PM Review - [Name] - [Date]
- [ ] Legal Review (if required) - [Name] - [Date]
- [ ] Compliance Review (if required) - [Name] - [Date]

---

## 💡 Example: E-commerce Pricing Rules

**This section shows a complete example. Delete this section when creating your own business rules document.**

---

### BR-001: Minimum Order Value

**Description**: All customer orders must meet a minimum total value of $10 USD before tax and shipping.

**Applies To**: All customer orders (excludes internal test orders)

**Validation**: `order.subtotal >= 10.00`

**Example**: 
- ✅ Valid: Cart with items totaling $12.50
- ❌ Invalid: Cart with items totaling $8.99 (blocks checkout)

**Exceptions**:
- VIP customers (loyalty tier: Gold or Platinum) - No minimum
- Promotional campaigns - Minimum may be waived during specific promotions
- Employee purchases - No minimum required

**Business Justification**: Ensures order profitability after processing costs and prevents abuse of free shipping promotions.

**Priority**: High

---

### BR-002: Discount Stacking

**Description**: Customers can apply only ONE discount code per order. Percentage discounts and fixed-amount discounts cannot be combined.

**Applies To**: All promotional discounts and coupon codes

**Validation**: `order.applied_discounts.count <= 1`

**Example**: 
- ✅ Valid: Apply "SAVE20" for 20% off
- ❌ Invalid: Apply "SAVE20" + "FREESHIP" together

**Exceptions**:
- Loyalty points can be used in addition to one discount code
- Bundle discounts are automatic and can combine with one manual code

**Business Justification**: Prevents excessive margin erosion and maintains pricing integrity.

**Priority**: Critical

---

*Template Version: 1.0*
*Last Updated: 2026-01-21*
