# Test Case: [Test Case Title]

**Test Case ID**: TC-[STORY-ID]-[number]
**Related Story**: STORY-[number]
**Feature**: [Feature name]
**Created By**: [QA Name]
**Created Date**: YYYY-MM-DD
**Last Updated**: YYYY-MM-DD
**Version**: 1.0

---

## Test Case Information

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STORY-123-001 |
| **Test Case Title** | [Clear, descriptive title] |
| **Priority** | Critical / High / Medium / Low |
| **Type** | Functional / Performance / Security / Usability / Integration / Regression |
| **Automation Status** | Manual / Automated / Planned for Automation |
| **Test Level** | Unit / Integration / System / Acceptance |
| **Related Requirement** | REQ-[number] |
| **Related User Story** | STORY-[number] |

---

## Priority Classification

**Selected: [Critical / High / Medium / Low]**

**Critical**: 
- Core functionality, critical user flows
- Payment, authentication, data integrity
- Must pass before release

**High**: 
- Important features, frequently used functionality
- Major user workflows
- Should pass before release

**Medium**: 
- Standard features, moderate importance
- Less frequently used functionality
- Can be deferred if needed

**Low**: 
- Edge cases, nice-to-have features
- Rarely used functionality
- Can be deferred to future release

---

## Test Objective

**What is this test validating?**

[1-2 sentence description of what this test verifies]

**Example:** This test verifies that users can successfully log in with valid credentials and are redirected to the dashboard with all expected UI elements displayed.

---

## Preconditions

**State required before test execution:**

- [ ] [Precondition 1]
- [ ] [Precondition 2]
- [ ] [Precondition 3]

**Examples:**
- [ ] User account exists in the system (email: testuser@example.com)
- [ ] User is logged out (no active session)
- [ ] User is on the login page (https://app.example.com/login)
- [ ] Test environment is accessible and stable
- [ ] Test data is seeded in database
- [ ] Browser cache is cleared
- [ ] User has required permissions/role

---

## Test Steps

**Step-by-step instructions:**

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | [Specific action to perform] | [What should happen after this step] |
| 2 | [Specific action to perform] | [What should happen after this step] |
| 3 | [Specific action to perform] | [What should happen after this step] |
| 4 | [Specific action to perform] | [What should happen after this step] |
| 5 | [Verification step] | [Final expected result] |

**Detailed Example:**

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | Navigate to login page: https://app.example.com/login | Login page loads with email and password fields visible |
| 2 | Enter email: testuser@example.com in the "Email" field | Email field accepts input, no validation errors |
| 3 | Enter password: Test123! in the "Password" field | Password field masks input with asterisks |
| 4 | Click the "Login" button | Loading spinner appears briefly |
| 5 | Observe the result | User is redirected to dashboard (https://app.example.com/dashboard) |

---

## Test Data

**Required test data:**

| Field | Value | Notes |
|-------|-------|-------|
| **User Email** | testuser@example.com | Valid registered user |
| **Password** | Test123! | Correct password |
| **User Role** | Standard User | Non-admin user |
| **User ID** | 12345 | Database user ID |
| **[Other Data]** | [Value] | [Notes] |

**Data Location:**
- Test data file: `/test-data/login-test-data.json`
- Database seeding: `/test-data/seed-scripts/users.sql`

**Data Requirements:**
- User must have "Active" status
- User email must be verified
- Password must not be expired

---

## Expected Results

**What should happen if the test passes:**

### Overall Expected Outcome
[High-level description of successful test]

### Specific Expected Results
- ✅ [Specific result 1]
- ✅ [Specific result 2]
- ✅ [Specific result 3]
- ✅ [Specific result 4]

**Detailed Example:**
- ✅ User is successfully authenticated
- ✅ User is redirected to dashboard page (URL: https://app.example.com/dashboard)
- ✅ Welcome message displays: "Welcome, Test User"
- ✅ User avatar appears in top-right corner
- ✅ Navigation menu is fully visible with all options
- ✅ Dashboard widgets load correctly (Recent Activity, Quick Actions)
- ✅ Session token is created and stored securely
- ✅ "Last Login" timestamp is updated in database
- ✅ No error messages are displayed
- ✅ Page loads within 2 seconds

---

## Actual Results

**[To be filled during test execution]**

**Date Executed**: YYYY-MM-DD
**Executed By**: [QA Name]
**Environment**: [Staging/Production/Test]
**Build/Version**: [v1.5.2]

### Results Summary
[Describe what actually happened during test execution]

### Deviations from Expected
- [Any differences between expected and actual results]
- [Issues encountered]

### Evidence
- Screenshot: [filename or link]
- Video: [link]
- Logs: [relevant log entries]

---

## Test Status

**Current Status**: [Select one]
- ⏳ **Not Run** - Test has not been executed yet
- ✅ **Pass** - Test passed all validations
- ❌ **Fail** - Test failed, bug found
- 🚫 **Blocked** - Cannot execute due to blocker (environment, dependency, etc.)
- ⏭️ **Skipped** - Intentionally not executed (not applicable, out of scope)
- 🔄 **Retest** - Failed previously, needs re-execution after fix

**If Failed:**
- Bug Report: BUG-[number] or GitHub Issue #[number]
- Failure Reason: [Brief description]

**If Blocked:**
- Blocker: [Description of what's blocking execution]
- Blocker Owner: [Person responsible for unblocking]
- Expected Resolution: [Date]

**If Skipped:**
- Reason: [Why test was skipped]
- Approval: [Who approved skipping this test]

---

## Execution History

Track all test executions:

| Date | Executed By | Build/Version | Environment | Result | Notes |
|------|-------------|---------------|-------------|--------|-------|
| 2025-01-20 | [QA Name] | v1.5.0 | Staging | ✅ Pass | All validations passed |
| 2025-01-21 | [QA Name] | v1.5.1 | Staging | ❌ Fail | BUG-456: Timeout issue |
| 2025-01-22 | [QA Name] | v1.5.2 | Staging | ✅ Pass | Bug fixed, retest passed |
| [Date] | [Name] | [Version] | [Env] | [Result] | [Notes] |

---

## Automation Information

**Automation Status**: Manual / Automated / Planned for Automation

**If Automated:**
- Automation Framework: [e.g., Cypress, Selenium, Playwright, Pytest]
- Test File Location: `/tests/e2e/login/test_valid_login.spec.js`
- Automation Priority: High / Medium / Low
- Automated By: [Developer/QA Name]
- Automation Date: YYYY-MM-DD

**If Planned for Automation:**
- Planned Sprint: [Sprint number]
- Assigned To: [Name]
- Automation ROI: [High - executed 50+ times per release]

**If Remaining Manual:**
- Reason: [Complex UI validation, exploratory test, one-time test, etc.]

---

## Test Environment Requirements

### Environment Configuration
- Operating System: [Windows 11 / macOS 14 / Linux]
- Browser: [Chrome 121+ / Firefox 122+ / Safari 17+]
- Screen Resolution: [1920x1080 or higher]
- Network: [Stable internet connection required]

### Dependencies
- Services: [Authentication service, Database, API]
- Test Data: [Seeded user accounts required]
- External Systems: [None / List any external dependencies]

### Special Setup
[Any special configuration needed]
- Example: VPN connection required
- Example: Specific browser extension must be disabled
- Example: Cookies must be enabled

---

## Related Test Cases

**Related Test Cases:**
- TC-STORY-123-002: Login with invalid password (negative test)
- TC-STORY-123-003: Login with non-existent email (negative test)
- TC-STORY-123-004: Login with expired account
- TC-STORY-123-005: Logout functionality

**Test Suite**: Authentication Test Suite

**Execution Order**:
- Execute independently (no dependencies on other tests)
- Can run in parallel with other authentication tests

---

## Test Case Tags

**Tags for categorization and filtering:**

- [x] Authentication
- [ ] Authorization
- [x] UI
- [ ] API
- [x] Critical Path
- [ ] Edge Case
- [x] Happy Path
- [ ] Negative Test
- [ ] Performance
- [ ] Security
- [x] Regression
- [ ] Smoke Test

---

## Notes and Comments

### Test Design Notes
[Any important information about test design decisions]

**Example:**
- This test focuses on happy path; negative scenarios covered in TC-STORY-123-002 through 005
- Session token validation is tested separately in TC-AUTH-015
- Performance assertions (2-second load time) based on SLA requirements

### Execution Notes
[Notes added during test execution]

**Example:**
- Test data user may need password reset if test fails multiple times (account lockout after 5 failed attempts)
- Dashboard widgets sometimes load slowly in test environment - acceptable if <5 seconds

### Known Issues
[Any known limitations or issues]

**Example:**
- Test environment dashboard loads slower than production
- Occasionally requires page refresh in Firefox

---

## Attachments

- [ ] Screenshot: expected-result.png
- [ ] Screenshot: actual-result.png
- [ ] Video: test-walkthrough.mp4
- [ ] Test data file: login-test-data.json
- [ ] API request/response: login-api-call.json

---

## Review and Approval

**Test Case Reviewed By:**

| Name | Role | Date | Status |
|------|------|------|--------|
| [QA Lead] | QA Lead | YYYY-MM-DD | ✅ Approved |
| [BA] | Business Analyst | YYYY-MM-DD | ✅ Approved |

**Approval Status**: ⏳ Pending Review / ✅ Approved / ❌ Rejected / 🔄 Revision Needed

**Review Comments:**
[Any feedback from reviewers]

---

## Version History

| Version | Date | Changed By | Changes |
|---------|------|------------|---------|
| 1.0 | 2025-01-15 | [QA Name] | Initial creation |
| 1.1 | 2025-01-18 | [QA Name] | Added performance assertion (2-second load time) |
| [Ver] | [Date] | [Name] | [Changes] |

---

**Template Version:** 1.0
**Last Updated:** YYYY-MM-DD

---

## Quick Reference Guide

### Test Case States
- ⏳ Not Run → ✅ Pass (test passed)
- ⏳ Not Run → ❌ Fail (bug found, create bug report)
- ⏳ Not Run → 🚫 Blocked (cannot execute, resolve blocker)
- ⏳ Not Run → ⏭️ Skipped (intentionally not executed)
- ❌ Fail → 🔄 Retest (after bug fix)
- 🔄 Retest → ✅ Pass (bug verified fixed)

### Priority Guide
- **Critical**: Must pass for release
- **High**: Should pass for release
- **Medium**: Nice to pass, can defer
- **Low**: Can defer to future release
