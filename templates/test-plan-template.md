# Test Plan: [Feature Name]

**Feature ID**: [Story/Epic ID - e.g., STORY-123]
**Test Plan Version**: 1.0
**Created By**: [QA Name]
**Created Date**: YYYY-MM-DD
**Test Environment**: [Staging/Test/UAT]
**Status**: Draft / Review / Approved / In Progress / Complete

---

## Overview

### Feature Description
[Brief description of what's being tested - link to feature specification]

**Related Documents:**
- Feature Spec: [link]
- Requirements: [link]
- Design: [link]

### Scope

**In Scope:**
- [Feature/functionality 1]
- [Feature/functionality 2]
- [Integration with System X]
- [Specific user roles: Admin, Standard User]

**Out of Scope:**
- [Feature 3 - tested separately in another test plan]
- [Performance testing - separate test plan]
- [Integration with System Y - future release]

---

## Test Objectives

What are we trying to achieve with this testing?

- ✅ Verify all acceptance criteria are met
- ✅ Ensure no regressions in existing functionality
- ✅ Validate error handling and edge cases
- ✅ Confirm security requirements
- ✅ Verify performance benchmarks (if applicable)
- ✅ Validate cross-browser compatibility (if web app)
- ✅ Test accessibility compliance (if required)

---

## Test Strategy

### Testing Types

| Type | Coverage | Tool/Method | Owner | Status |
|------|----------|-------------|-------|--------|
| **Unit Testing** | 80%+ code coverage | Jest/Pytest/JUnit | Engineering | ⏳ Pending |
| **Integration Testing** | All API endpoints | Postman/Pytest | QA | ⏳ Pending |
| **End-to-End Testing** | Critical user flows | Cypress/Selenium | QA | ⏳ Pending |
| **Regression Testing** | Full regression suite | Automated suite | QA | ⏳ Pending |
| **Performance Testing** | Load/stress scenarios | k6/JMeter | QA + DevOps | N/A |
| **Security Testing** | OWASP Top 10 | OWASP ZAP/Manual | QA | ⏳ Pending |
| **Accessibility Testing** | WCAG 2.1 AA | axe/Lighthouse | QA | N/A |
| **Manual Exploratory** | Realistic user flows | Manual | QA | ⏳ Pending |

### Test Levels

- [ ] **Unit Tests** (by Engineering, QA reviews coverage reports)
- [ ] **Integration Tests** (QA + Engineering collaboration)
- [ ] **System Tests** (QA - full feature testing)
- [ ] **Acceptance Tests** (QA + PM - validate business requirements)
- [ ] **Regression Tests** (QA - ensure no existing features broken)

### Testing Approach

**Functional Testing:**
- Test all acceptance criteria from feature spec
- Positive test cases (happy paths)
- Negative test cases (invalid inputs, error conditions)
- Boundary value testing
- Edge cases and corner cases

**Non-Functional Testing:**
- Performance: Response times, throughput
- Security: Authentication, authorization, data protection
- Usability: User experience, error messages
- Compatibility: Browsers, devices, screen sizes

---

## Test Cases

### Test Case Summary

| Priority | Total | Manual | Automated |
|----------|-------|--------|-----------|
| Critical | 10 | 3 | 7 |
| High | 15 | 5 | 10 |
| Medium | 20 | 10 | 10 |
| Low | 10 | 8 | 2 |
| **TOTAL** | **55** | **26** | **29** |

### Test Case Categories

1. **Authentication & Authorization** (TC-STORY-123-001 to 010)
2. **Core Feature Functionality** (TC-STORY-123-011 to 025)
3. **Data Validation** (TC-STORY-123-026 to 035)
4. **Error Handling** (TC-STORY-123-036 to 045)
5. **Integration Points** (TC-STORY-123-046 to 055)

---

## Sample Test Cases

### TC-STORY-123-001: [Happy Path - User Login with Valid Credentials]

**Priority**: Critical
**Type**: Functional
**Automation**: Yes
**Related Requirement**: REQ-AUTH-001

**Preconditions:**
- User account exists (email: testuser@example.com, password: Test123!)
- User is logged out
- User is on login page

**Test Steps:**
1. Navigate to login page (https://app.example.com/login)
2. Enter email: testuser@example.com
3. Enter password: Test123!
4. Click "Login" button
5. Observe the result

**Expected Result:**
- User is redirected to dashboard page (https://app.example.com/dashboard)
- Welcome message displays: "Welcome, Test User"
- User avatar appears in top-right corner
- Navigation menu is fully visible
- Session token is stored securely (verify in browser storage)

**Test Data:**
- Email: testuser@example.com
- Password: Test123!
- Expected user role: Standard User

**Actual Result:** [To be filled during execution]

**Status**: ⏳ Not Run / ✅ Pass / ❌ Fail / 🚫 Blocked / ⏭️ Skipped

**Execution Date**: [YYYY-MM-DD]

**Executed By**: [QA Name]

**Notes**: [Any observations or issues]

---

### TC-STORY-123-002: [Negative Case - Login with Invalid Password]

**Priority**: High
**Type**: Functional
**Automation**: Yes
**Related Requirement**: REQ-AUTH-002

**Preconditions:**
- User account exists (email: testuser@example.com)
- User is logged out
- User is on login page

**Test Steps:**
1. Navigate to login page
2. Enter valid email: testuser@example.com
3. Enter invalid password: WrongPassword123
4. Click "Login" button
5. Observe the result

**Expected Result:**
- Error message displays: "Invalid email or password"
- User remains on login page (no redirect)
- Login form is still visible
- Password field is cleared
- Email field retains the entered email
- No session token is created

**Test Data:**
- Email: testuser@example.com
- Password: WrongPassword123 (incorrect)

**Actual Result:** [To be filled during execution]

**Status**: ⏳ Not Run

---

### TC-STORY-123-003: [Boundary Value - Maximum Input Length]

**Priority**: Medium
**Type**: Functional
**Automation**: Yes
**Related Requirement**: REQ-VALIDATION-001

**Preconditions:**
- User is on the form page

**Test Steps:**
1. Navigate to form
2. Enter text in "Description" field: [250 characters - exactly at maximum]
3. Submit form
4. Observe the result

**Expected Result:**
- Form accepts the input
- Data is saved successfully
- Confirmation message displays
- Saved data matches input (no truncation)

**Test Data:**
- Description: [250-character string]

**Actual Result:** [To be filled during execution]

**Status**: ⏳ Not Run

---

*[Add all remaining test cases following the same format]*

*For detailed test cases, see: `/test-plans/test-cases/story-123-test-cases.md`*

---

## Test Environment

### Environment Details

**Environment Name**: Staging
**Environment URL**: https://staging.example.com
**API Base URL**: https://api-staging.example.com
**Database**: Staging DB (isolated from production)
**Data Refresh**: Weekly on Sundays at 2 AM UTC

**Environment Configuration:**
- Application Version: v1.5.0-beta
- Database Version: PostgreSQL 15.2
- API Version: v2.3.0
- Frontend Build: #1234

### Test Users

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| Admin | admin@test.com | Admin123! | Full permissions |
| Standard User | user@test.com | User123! | Limited permissions |
| Guest | guest@test.com | Guest123! | Read-only access |

*Full test user list: `/test-data/test-users.md`*

### Test Data

**Data Sources:**
- Seed data script: `/test-data/seed-data.sql`
- Test fixtures: `/test-data/fixtures/`
- Mock API responses: `/test-data/mocks/`

**Data Requirements:**
- 50 sample products
- 10 test users (various roles)
- 20 sample orders
- Payment gateway in test mode

### Dependencies

**External Services:**
- Payment gateway: Stripe Test Mode (configured)
- Email service: Mailgun Sandbox (configured)
- SMS service: Twilio Test Mode (configured)
- Third-party API: Mock server available

**Internal Dependencies:**
- Authentication service: Available
- User management service: Available
- Notification service: Available

### Environment Access

- **VPN Required**: Yes (connect to VPN before testing)
- **Test Accounts Created**: Yes (see Test Users table above)
- **Data Seeded**: Yes (last refresh: 2025-01-15)
- **Access Permissions**: All QA team members have access

**Troubleshooting:**
- If environment is down: Check #devops-alerts Slack channel
- If data is corrupt: Run `/scripts/reset-test-data.sh`
- If services unavailable: Contact DevOps team

---

## Entry & Exit Criteria

### Entry Criteria (Before Testing Starts)

Must have ALL of the following before testing begins:

- [ ] Feature code deployed to test environment
- [ ] Test environment is stable (no known blocking issues)
- [ ] Test data is ready and seeded
- [ ] Test cases reviewed and approved by QA Lead
- [ ] All dependencies are available and configured
- [ ] Test tools configured and ready (Postman, Cypress, etc.)
- [ ] Test users and access permissions set up
- [ ] Feature specification finalized and approved
- [ ] Unit tests passing (>80% coverage)

**If entry criteria not met**: Testing cannot begin. Escalate to PM and Engineering.

---

### Exit Criteria (Before Release Approval)

Must meet ALL of the following before release:

- [ ] **Critical tests**: 100% pass rate (no exceptions)
- [ ] **High-priority tests**: 100% pass rate (no exceptions)
- [ ] **Medium-priority tests**: >95% pass rate
- [ ] **Low-priority tests**: >90% pass rate
- [ ] **Critical bugs**: Zero open
- [ ] **High bugs**: Zero open (or all have approved exceptions with workarounds)
- [ ] **Regression tests**: 100% pass rate
- [ ] **Performance benchmarks**: Met (if applicable)
- [ ] **Security scan**: Complete with no critical vulnerabilities
- [ ] **Code coverage**: Meets project target (e.g., >80%)
- [ ] **Documentation**: Updated (release notes, user guide)
- [ ] **Sign-offs obtained**: QA Lead, PM, Engineering Lead

**If exit criteria not met**: Release cannot proceed. Document risks and get explicit approval for any exceptions.

---

## Risk Assessment

Identify potential risks to testing and release:

| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|---------------------|
| Test environment instability (3 outages last week) | High | Medium | Daily health checks, backup environment available, monitor #devops-alerts |
| Incomplete requirements (some edge cases unclear) | Medium | Low | Early BA involvement, clarification meeting scheduled, document assumptions |
| Insufficient test data (need 1000+ records) | Medium | Medium | Automated data generation scripts, coordinate with DevOps |
| Tight timeline (only 5 days for testing) | High | High | Prioritize critical tests, automate where possible, extend timeline if needed |
| Third-party API unavailable (payment gateway issues) | High | Low | Mock service available, coordinate with vendor, test in off-peak hours |
| Resource constraint (only 2 QA engineers) | Medium | Medium | Focus on high-risk areas, leverage automation, coordinate with Engineering for support |

---

## Test Schedule

| Milestone | Planned Start | Planned End | Actual Start | Actual End | Status | Notes |
|-----------|---------------|-------------|--------------|------------|--------|-------|
| **Test Planning** | 2025-01-15 | 2025-01-17 | 2025-01-15 | 2025-01-17 | ✅ Complete | On schedule |
| **Test Case Creation** | 2025-01-18 | 2025-01-20 | 2025-01-18 | - | 🟡 In Progress | 70% complete |
| **Test Environment Setup** | 2025-01-20 | 2025-01-21 | - | - | ⏳ Pending | Waiting for DevOps |
| **Test Execution - Functional** | 2025-01-22 | 2025-01-25 | - | - | ⏳ Pending | - |
| **Bug Fixing** | 2025-01-26 | 2025-01-29 | - | - | ⏳ Pending | - |
| **Regression Testing** | 2025-01-30 | 2025-01-31 | - | - | ⏳ Pending | - |
| **Performance Testing** | 2025-02-01 | 2025-02-01 | - | - | ⏳ Pending | - |
| **Security Testing** | 2025-02-02 | 2025-02-02 | - | - | ⏳ Pending | - |
| **Sign-off & Release Approval** | 2025-02-03 | 2025-02-03 | - | - | ⏳ Pending | - |
| **Release to Production** | 2025-02-04 | 2025-02-04 | - | - | ⏳ Pending | - |

**Critical Path**: Test Environment Setup → Functional Testing → Bug Fixing

**Buffer Time**: 2 days built into schedule for unexpected issues

---

## Assumptions

Document any assumptions made during test planning:

1. Test environment will be stable and available 95%+ of the time
2. All third-party services will be available in test mode
3. Engineering will fix critical bugs within 24 hours
4. Test data will be refreshed weekly automatically
5. Two QA engineers will be available full-time during test execution
6. No major requirement changes during testing phase

---

## Approvals

**Test Plan Reviewed By:**

| Name | Role | Date | Signature | Status |
|------|------|------|-----------|--------|
| [QA Lead Name] | QA Lead | YYYY-MM-DD | _____________ | ⏳ Pending |
| [PM Name] | Product Manager | YYYY-MM-DD | _____________ | ⏳ Pending |
| [Engineering Lead] | Engineering Lead | YYYY-MM-DD | _____________ | ⏳ Pending |

**Approval Status**: ⏳ Pending Review / ✅ Approved / ❌ Rejected / 🔄 Revision Needed

---

## Test Execution Tracking

*[Update during test execution]*

### Summary (Updated: YYYY-MM-DD)

| Metric | Value |
|--------|-------|
| **Total Test Cases** | 55 |
| **Executed** | 0 |
| **Passed** | 0 |
| **Failed** | 0 |
| **Blocked** | 0 |
| **Skipped** | 0 |
| **Pass Rate** | 0% |
| **Coverage** | 0% |

### Bugs Found

| Severity | Open | In Progress | Fixed | Verified | Total |
|----------|------|-------------|-------|----------|-------|
| Critical | 0 | 0 | 0 | 0 | 0 |
| High | 0 | 0 | 0 | 0 | 0 |
| Medium | 0 | 0 | 0 | 0 | 0 |
| Low | 0 | 0 | 0 | 0 | 0 |
| **TOTAL** | **0** | **0** | **0** | **0** | **0** |

---

## Notes & Updates

### Change Log

| Date | Changed By | Changes Made | Reason |
|------|------------|--------------|--------|
| 2025-01-17 | [QA Name] | Created initial test plan | Feature ready for testing |
| [Date] | [Name] | [Changes] | [Reason] |

### Open Issues

1. [Issue description - date raised - status]
2. [Issue description - date raised - status]

---

*This test plan is a living document and should be updated throughout the testing phase.*

**Document Location**: `/test-plans/test-plan-[feature-name].md`
**Version**: 1.0
**Last Updated**: YYYY-MM-DD
