# QA Best Practices

This document provides detailed testing best practices referenced by the QA role.

---

## Test Planning

### Requirements Review
- Review requirements documents thoroughly before writing tests
- Identify ambiguities and edge cases early
- Collaborate with BA during requirements phase
- Ensure acceptance criteria are testable and measurable

### Test Scenario Identification
- Identify test scenarios during or immediately after BA phase
- Map test scenarios to user stories and acceptance criteria
- Consider positive flows, negative flows, and edge cases
- Document assumptions and dependencies upfront

### Test Prioritization
- **Critical Path First**: Core user workflows and business-critical features
- **High Risk Areas**: Security, payments, data integrity, integrations
- **New Functionality**: Recently developed features
- **Regression**: Previously working features that might break
- **Edge Cases**: Last priority unless high-risk

### Test Coverage Strategy
- Define what "done" means for testing
- Set realistic coverage targets based on risk
- Balance depth vs breadth based on timeline
- Document what's in-scope and out-of-scope

---

## Test Case Design Techniques

### Equivalence Partitioning
**Concept**: Group similar inputs together, test one representative from each group

**Example**: Age validation (must be 18-65)
- Invalid partition: < 18 (test with 17)
- Valid partition: 18-65 (test with 30)
- Invalid partition: > 65 (test with 66)

### Boundary Value Analysis
**Concept**: Test at the boundaries of input ranges

**Example**: Password length (8-20 characters)
- Just below min: 7 characters ❌
- At minimum: 8 characters ✅
- Valid middle: 14 characters ✅
- At maximum: 20 characters ✅
- Just above max: 21 characters ❌

### Decision Tables
**Use for**: Complex business rules with multiple conditions

**Example**: Loan approval
| Age | Income | Credit Score | Approval |
|-----|--------|--------------|----------|
| <18 | Any | Any | Reject |
| 18+ | <30K | Any | Reject |
| 18+ | 30K+ | <600 | Reject |
| 18+ | 30K+ | 600+ | Approve |

### State Transition Testing
**Use for**: Testing workflows with different states

**Example**: Order states
- New → Pending → Confirmed → Shipped → Delivered
- Test valid transitions and invalid transitions (e.g., New → Delivered)

### Error Guessing
**Use experience to predict** common errors:
- Empty fields when required
- Special characters in text fields
- SQL injection attempts
- Cross-site scripting (XSS) attempts
- Very large numbers or negative numbers
- Concurrent user actions
- Network timeouts

---

## Test Case Writing Best Practices

### Test Case Structure
**Every test case should have:**
1. **Clear Title**: What is being tested
2. **Preconditions**: Required state before test
3. **Test Steps**: Numbered, specific actions
4. **Expected Results**: What should happen (be specific)
5. **Test Data**: Exact data to use
6. **Priority**: Critical/High/Medium/Low

### Test Case Principles

**✅ DO:**
- Make tests independent (no dependencies between tests)
- Make tests atomic (one test = one verification)
- Use specific, measurable expected results
- Include both positive and negative test cases
- Document test data requirements clearly
- Keep steps simple and easy to follow

**❌ DON'T:**
- Create tests that depend on other tests running first
- Test multiple things in one test case
- Use vague expected results ("system works correctly")
- Forget edge cases and error conditions
- Assume test data without documenting it
- Make steps overly complex

### Example: Good vs Bad Test Case

**❌ BAD:**
```
Title: Test login
Steps: Login to the system
Expected: User can login
```

**✅ GOOD:**
```
Title: Valid user login with correct credentials
Priority: Critical
Preconditions: 
- User account exists (email: test@example.com, password: Test123!)
- User is on login page
Steps:
1. Enter email: test@example.com
2. Enter password: Test123!
3. Click "Login" button
Expected Results:
- User is redirected to dashboard page
- Welcome message displays: "Welcome, Test User"
- Navigation menu is visible
- Logout button is visible
Test Data:
- Email: test@example.com
- Password: Test123!
```

---

## Bug Reporting Best Practices

### The 5 W's of Bug Reports

1. **WHAT** happened?
   - Specific behavior observed
   - "Payment fails" ❌ → "Payment error 'Invalid card' appears with valid card" ✅

2. **WHERE** did it happen?
   - Page/screen/component
   - "In the app" ❌ → "On checkout page, step 3 of 4" ✅

3. **WHEN** does it happen?
   - Specific timing or conditions
   - "Sometimes" ❌ → "Every time after adding 3+ items to cart" ✅

4. **WHO** can reproduce it?
   - User role, permissions, account type
   - "Users" ❌ → "Standard users with saved payment methods" ✅

5. **WHY** is it a problem?
   - Business/user impact
   - "It's broken" ❌ → "Users cannot complete purchases, revenue impact" ✅

### Severity Classification

**Critical**: System crash, data loss, security breach, complete feature failure
- Production down
- Payment processing fails for all users
- Data corruption
- Security vulnerability exposed

**High**: Major functionality broken, workaround difficult/impossible
- Login fails for all users
- Checkout fails for 50%+ of users
- Critical feature completely broken

**Medium**: Functionality impaired, workaround exists
- Search returns incorrect results but users can navigate manually
- UI misalignment affects usability
- Error messages unclear

**Low**: Minor issues, cosmetic problems
- Typos in text
- Minor UI alignment issues
- Non-critical features with minor issues

### Bug Report Components

**Required in every bug report:**

```markdown
## Title
[Clear, specific, one-line description]

## Severity
Critical / High / Medium / Low

## Environment
- Application version: X.Y.Z
- Environment: Production / Staging / Test
- OS: Windows 11 / macOS 14 / iOS 17
- Browser: Chrome 121 / Safari 17
- User role: Admin / Standard User

## Steps to Reproduce
1. [Specific action]
2. [Specific action]
3. [Specific action]

## Expected Result
[What should happen]

## Actual Result
[What actually happens]

## Evidence
- Screenshot: [attached]
- Video: [link]
- Console logs: [attached]
- Network logs: [attached]

## Test Data Used
- User: test@example.com
- Product ID: 12345
- [Other relevant data]

## Frequency
Every time / Intermittent (X out of Y attempts)

## Additional Context
[Any other relevant information]
```

---

## Test Automation Best Practices

### When to Automate

**✅ Good Candidates:**
- Repetitive test cases executed frequently
- Regression test suites
- Smoke/sanity tests
- API/integration tests
- Data validation tests
- Tests with multiple data sets (data-driven testing)
- Stable features (not changing rapidly)

**❌ Poor Candidates:**
- One-time tests
- Tests requiring visual/UX validation
- Rapidly changing features (tests break constantly)
- Exploratory testing
- Usability testing
- Complex user interactions difficult to automate

### Automation Principles

**Test Independence:**
```javascript
// ❌ BAD - Tests depend on each other
test('create user', () => { /* creates user with ID 123 */ });
test('update user', () => { /* assumes user 123 exists */ });
test('delete user', () => { /* assumes user 123 exists */ });

// ✅ GOOD - Each test is independent
test('create user', () => {
  const user = createTestUser();
  // test logic
  deleteTestUser(user.id);
});

test('update user', () => {
  const user = createTestUser();
  // test logic
  deleteTestUser(user.id);
});
```

**Fast Execution:**
- Keep tests fast (aim for <5 seconds per test)
- Use test doubles (mocks, stubs) for external dependencies
- Parallelize test execution where possible
- Avoid unnecessary waits and sleeps

**Clear Test Names:**
```javascript
// ❌ BAD
test('test1', () => { /* ... */ });

// ✅ GOOD
test('should reject login with invalid password', () => { /* ... */ });
test('should display error message for expired credit card', () => { /* ... */ });
```

**Maintainable Tests:**
- Use Page Object Model for UI tests
- Keep test data in separate files/fixtures
- Don't repeat yourself (DRY) - use helper functions
- Version control your test code
- Document complex test setups

### Test Data Management

**Best Practices:**
- Create fresh test data for each test
- Clean up test data after tests
- Use realistic but fake data (faker.js, etc.)
- Don't use production data in tests
- Have separate test data for different test environments

---

## Regression Testing

### What to Include

**Must Have in Regression Suite:**
- Critical user workflows (happy paths)
- Previously found bugs (verify they don't resurface)
- Core business functionality
- Integration points
- Security features
- Payment/transaction flows

### Regression Testing Strategy

1. **Automate regression suite** (aim for 80%+ automation)
2. **Run before every release** (no exceptions)
3. **Prioritize by risk** (run critical tests first)
4. **Update regularly** (add new tests, remove obsolete ones)
5. **Track results** (pass/fail trends over time)

### When to Run Regression

- Before every release (mandatory)
- After major bug fixes
- After infrastructure changes
- Weekly in active development
- On-demand when needed

---

## Exploratory Testing

### Approach

**Allocate time**: Reserve 20% of testing time for exploratory testing

**Focus Areas:**
- Realistic user workflows (not just happy paths)
- Edge cases not covered by scripted tests
- Integration points and data flow
- Error handling and recovery
- Performance under realistic conditions

**Document Findings:**
- Keep notes during exploration
- Create bug reports for issues found
- Convert interesting scenarios into test cases
- Share insights with team

### Exploratory Testing Charters

**Example Charter:**
```
Mission: Explore payment processing with various card types
Duration: 60 minutes
Focus: Error handling, edge cases, international cards
Test Data: Valid/invalid cards, expired cards, foreign cards
```

---

## Performance Testing

### Key Metrics

- **Response Time**: How long does an operation take? (p50, p95, p99)
- **Throughput**: How many operations per second?
- **Concurrent Users**: How many users can use the system simultaneously?
- **Resource Usage**: CPU, memory, disk, network

### Performance Test Types

**Load Testing**: Normal expected load
- Example: 1,000 concurrent users for 1 hour

**Stress Testing**: Beyond normal load to find breaking point
- Example: Gradually increase from 1,000 to 10,000 users

**Soak Testing**: Sustained load over long period
- Example: 2,000 concurrent users for 8 hours (check for memory leaks)

**Spike Testing**: Sudden load increase
- Example: Jump from 100 to 5,000 users in 1 minute

---

## Security Testing

### OWASP Top 10 Checks

1. **Injection**: SQL injection, command injection
2. **Broken Authentication**: Weak passwords, session hijacking
3. **Sensitive Data Exposure**: Unencrypted data, exposed secrets
4. **XML External Entities (XXE)**
5. **Broken Access Control**: Users accessing unauthorized resources
6. **Security Misconfiguration**: Default credentials, unnecessary features enabled
7. **Cross-Site Scripting (XSS)**
8. **Insecure Deserialization**
9. **Using Components with Known Vulnerabilities**
10. **Insufficient Logging & Monitoring**

### Basic Security Tests

- Try SQL injection in all input fields
- Test XSS with `<script>alert('XSS')</script>`
- Try accessing URLs without being logged in
- Try accessing other users' data
- Check for sensitive data in responses/logs
- Verify HTTPS is enforced
- Check password policies
- Test session timeout

---

## Continuous Improvement

### Test Metrics to Track

- **Test Coverage**: % of code/features tested
- **Automation Coverage**: % of tests automated
- **Bug Detection Rate**: Bugs found in testing vs production
- **Test Execution Time**: Time to run full test suite
- **Bug Escape Rate**: Bugs found in production
- **Test Effectiveness**: Critical bugs found / total critical bugs

### Regular Reviews

- **Monthly**: Review test metrics, identify trends
- **Quarterly**: Audit test suite, remove obsolete tests
- **Per Release**: Retrospective on what testing missed
- **Continuously**: Update best practices based on lessons learned

---

*These best practices should evolve based on team experience and project needs.*
