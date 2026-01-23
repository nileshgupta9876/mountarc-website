# User Story: Email Template Creation

**ID:** US-002
**Epic:** [Epic 1 - Email Infrastructure](./README.md)
**Priority:** Must Have (Critical)
**Persona:** Engineering Team / All End Users (indirect)
**Story Points:** TBD
**Status:** Not Started

---

## Story

As a **developer**,
I want to **create 6 professional email templates with proper branding**,
So that **all automated emails sent to users and the team are well-formatted and on-brand**.

---

## Business Context

Email templates are the user-facing representation of MountArc's brand in automated communications. Professional, well-designed emails build trust with potential clients and ensure clear communication. These templates must work across all major email clients and devices.

---

## Acceptance Criteria

### Primary Criteria

**Given** an email template is created for each email type
**When** the template is rendered with real data
**Then** all variable placeholders are replaced with actual values
**And** the email displays correctly in major email clients (Gmail, Outlook, Apple Mail)
**And** MountArc branding (logo, colors, footer) is present
**And** all links are functional and properly formatted

**Given** an email is viewed on mobile devices
**When** the email client renders the template
**Then** the email is fully readable without horizontal scrolling
**And** text is appropriately sized (minimum 14px)
**And** buttons/links are touch-friendly

**Given** a template variable is missing or null
**When** the email is rendered
**Then** the system handles it gracefully (shows placeholder or hides section)
**And** does not display "undefined" or error text

### Template-Specific Criteria

#### Email A: Contact Form → Team Notification
- [ ] Displays all form fields clearly
- [ ] Shows submission timestamp
- [ ] Includes source page URL
- [ ] Optional fields show "Not provided" if empty
- [ ] Clear subject line with user name

#### Email B: Contact Form → User Auto-Reply
- [ ] Warm, professional greeting using user's name
- [ ] Confirms message received
- [ ] Sets expectations (24-hour response time)
- [ ] Includes helpful links (book call, services, work, blog)
- [ ] Professional signature with contact info

#### Email C: Discovery Call → Team Notification
- [ ] Shows all booking details
- [ ] Highlights preferred date/time
- [ ] Displays project description clearly
- [ ] Shows budget range
- [ ] Clear call-to-action for team (follow up)

#### Email D: Discovery Call → User Confirmation
- [ ] Confirms booking received
- [ ] Explains next steps (3-step process)
- [ ] Sets expectations (response within 24 hours)
- [ ] Provides helpful prep tips for the call
- [ ] Professional and encouraging tone

#### Email E: Newsletter → Team Notification
- [ ] Shows subscriber email
- [ ] Displays subscription timestamp
- [ ] Shows source page URL
- [ ] Simple, informational format

#### Email F: Newsletter → Welcome Email
- [ ] Warm welcome message
- [ ] Explains newsletter value (what to expect)
- [ ] Sets expectations (bi-weekly frequency)
- [ ] Includes link to latest blog post
- [ ] Clear unsubscribe link in footer

---

## Edge Cases

### Edge Case 1: Missing Optional Fields
**Scenario:** User doesn't provide optional fields (phone, project type, budget)
**Expected Behavior:** Template shows "Not provided" or hides the field
**Handling:** Use conditional logic in template

### Edge Case 2: Long User Messages
**Scenario:** User submits maximum 250 character message
**Expected Behavior:** Message displays fully without breaking layout
**Handling:** Ensure textarea section can accommodate max length

### Edge Case 3: Special Characters in Names
**Scenario:** User name contains special characters (e.g., O'Brien, José)
**Expected Behavior:** Characters display correctly (no encoding issues)
**Handling:** Use proper HTML encoding for text

### Edge Case 4: Email Client Compatibility
**Scenario:** Email opened in older Outlook versions
**Expected Behavior:** Email still readable, even if simplified
**Handling:** Use inline CSS, avoid modern CSS features

### Edge Case 5: Broken Links
**Scenario:** Link URL is malformed or incomplete
**Expected Behavior:** Link either doesn't render or shows clear error
**Handling:** Validate all URLs before rendering

---

## Dependencies

### Prerequisites
- [x] US-001 (Resend Integration) must be complete
- [ ] MountArc logo available (PNG or SVG format)
- [ ] Brand color codes confirmed (dark theme + mint green)
- [ ] Domain verified for email sending

### Technical Dependencies
- Resend SDK (for sending)
- HTML/CSS knowledge for email templates
- Email client testing tools (optional: Litmus, Email on Acid)

### Blocks
- US-003 (Email API Route) - needs templates to send

---

## Technical Notes

### Email Template Structure

**Recommended Approach:** Use React components for templates (JSX)

```javascript
// emails/ContactFormTeamNotification.jsx
export function ContactFormTeamNotification({ name, email, phone, message, projectType, budgetRange, timestamp, pageUrl }) {
  return (
    <html>
      <body style={{fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4'}}>
        <div style={{maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px'}}>
          {/* MountArc Logo */}
          <img src="https://mountarc-website-final.vercel.app/logo.png" alt="MountArc" style={{width: '150px'}} />

          <h1 style={{color: '#333'}}>New Contact Form Submission</h1>

          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          {phone && <p><strong>Phone:</strong> {phone}</p>}
          {projectType && <p><strong>Project Type:</strong> {projectType}</p>}
          {budgetRange && <p><strong>Budget Range:</strong> {budgetRange}</p>}

          <p><strong>Message:</strong></p>
          <p style={{padding: '10px', backgroundColor: '#f9f9f9', borderLeft: '3px solid #10b981'}}>
            {message}
          </p>

          <p style={{color: '#666', fontSize: '12px'}}>
            Submitted on: {new Date(timestamp).toLocaleString()}<br/>
            From: {pageUrl}
          </p>

          {/* Footer */}
          <hr style={{marginTop: '30px'}} />
          <p style={{fontSize: '12px', color: '#666'}}>
            MountArc Private Limited<br/>
            Website: https://mountarc-website-final.vercel.app<br/>
            Email: contact@mountarc.com<br/>
            LinkedIn: linkedin.com/company/mountarc
          </p>
        </div>
      </body>
    </html>
  );
}
```

### File Structure
```
mountarc-website/
├── emails/                                      # Email template components
│   ├── ContactFormTeamNotification.jsx         # Email A
│   ├── ContactFormUserAutoReply.jsx            # Email B
│   ├── DiscoveryCallTeamNotification.jsx       # Email C
│   ├── DiscoveryCallUserConfirmation.jsx       # Email D
│   ├── NewsletterTeamNotification.jsx          # Email E
│   ├── NewsletterWelcome.jsx                   # Email F
│   └── components/
│       ├── EmailHeader.jsx                      # Reusable header with logo
│       └── EmailFooter.jsx                      # Reusable footer
```

### Styling Best Practices for Email
1. **Inline CSS only** - Email clients strip `<style>` tags
2. **Table layouts** - Safer for Outlook compatibility (or use modern approach with divs for simple layouts)
3. **Web-safe fonts** - Arial, Helvetica, Georgia, Times New Roman
4. **Avoid background images** - Often blocked by email clients
5. **Use absolute URLs** - For images and links
6. **Test in multiple clients** - Gmail, Outlook, Apple Mail, mobile

### Brand Colors
- **Dark Background:** #1a1a1a (for headers/footers if using)
- **Mint Green Accent:** #10b981 (for CTAs, highlights)
- **Text:** #333333 (primary), #666666 (secondary)
- **Background:** #ffffff (email body), #f4f4f4 (outer background)

---

## Design Notes

### Visual Hierarchy
1. **Logo** - Top of email (150px width)
2. **Subject/Heading** - Large, bold (h1)
3. **Key Information** - Clear labels and values
4. **Message/Description** - Highlighted box with left border
5. **Footer** - Smaller text, contact information

### Tone and Voice
- **Team Notifications:** Professional, informational, concise
- **User Emails:** Warm, welcoming, professional, helpful
- **All Emails:** Clear, no jargon, action-oriented

### Mobile Considerations
- Single column layout
- Minimum font size: 14px
- Touch-friendly buttons: 44x44px minimum
- No horizontal scrolling
- Images scale responsively

---

## Testing Notes

### Email Client Testing Matrix

| Client | Version | Priority | Test Status |
|--------|---------|----------|-------------|
| Gmail | Web | High | ⏳ Pending |
| Gmail | Mobile (iOS) | High | ⏳ Pending |
| Gmail | Mobile (Android) | High | ⏳ Pending |
| Outlook | Web | Medium | ⏳ Pending |
| Outlook | Desktop 2016+ | Medium | ⏳ Pending |
| Apple Mail | iOS | High | ⏳ Pending |
| Apple Mail | macOS | Low | ⏳ Pending |

### Manual Testing Checklist
- [ ] All 6 templates render without errors
- [ ] All variables populate correctly
- [ ] No "undefined" or "null" displayed
- [ ] Links are clickable and go to correct URLs
- [ ] Images load (logo, if any)
- [ ] Text is readable on mobile
- [ ] Email doesn't go to spam folder
- [ ] Unsubscribe link works (newsletter emails)
- [ ] Dark mode compatible (if supported by client)

### Test Data
Create test data for each template with:
- **Normal data:** Standard form submissions
- **Edge cases:** Max length fields, special characters, missing optional fields
- **Null values:** Test missing optional fields

---

## Validation Rules

### Required Variables (Per Template)

**Email A (Contact → Team):**
- name, email, message, timestamp, pageUrl
- Optional: phone, projectType, budgetRange

**Email B (Contact → User):**
- name (for personalization)

**Email C (Discovery → Team):**
- name, email, phone, preferredTime, description, budgetRange, timestamp, pageUrl

**Email D (Discovery → User):**
- name (for personalization)

**Email E (Newsletter → Team):**
- email, timestamp, pageUrl

**Email F (Newsletter → User):**
- None (generic welcome message)

### Link Validation
- All links must start with `https://`
- Internal links: `https://mountarc-website-final.vercel.app/...`
- External links: Full URLs
- Unsubscribe link: `/unsubscribe?email={encoded_email}`

---

## Security Considerations

- **XSS Prevention:** Escape all user input before rendering
- **Email Injection:** Validate email addresses, no newlines in headers
- **Unsubscribe Link:** Use token-based approach (if storing subscribers)
- **Privacy:** Don't include sensitive data in team notification emails

---

## Definition of Done

- [ ] All 6 email templates created
- [ ] Templates use proper MountArc branding
- [ ] All variable placeholders work correctly
- [ ] Tested in Gmail, Outlook, Apple Mail
- [ ] Mobile responsive (tested on iOS and Android)
- [ ] Optional fields handled gracefully
- [ ] Footer includes all required information
- [ ] Unsubscribe link present in newsletter emails
- [ ] Code reviewed for HTML/CSS best practices
- [ ] Templates render correctly with Resend
- [ ] No spam filter issues
- [ ] Documentation added (comments in code)
- [ ] Committed to git

---

## Open Questions

1. **Logo Format:** Do we have a logo in PNG or SVG format?
   - **Action:** Check with PM/Design team

2. **Unsubscribe Mechanism:** How to implement unsubscribe for newsletters?
   - **Answer:** Link to `/unsubscribe` page (Phase 1: manual removal)

3. **Email Tracking:** Do we need open/click tracking?
   - **Answer:** No for Phase 1 (out of scope)

4. **Rich HTML:** Should emails have advanced styling or keep it simple?
   - **Recommendation:** Keep simple for Phase 1, compatible with all clients

5. **Reply-To Address:** Should auto-replies have a reply-to address?
   - **Answer:** Yes, `contact@mountarc.com`

---

## Related Stories

- **Depends On:** US-001 (Resend Integration)
- **Blocks:** US-003 (Email API Route)
- **Related:** All form submission stories (need email templates)

---

## References

- [PRD - Email Types](../../PRD.md#email-types-all-6-required)
- [PRD - Email Template Design](../../PRD.md#email-template-design)
- [Resend - React Email](https://resend.com/docs/send-with-react)
- [Email HTML Best Practices](https://www.campaignmonitor.com/css/)
- [Can I Email](https://www.caniemail.com/) - Email client CSS support

---

**Story Owner:** Engineering
**Created By:** Business Analyst
**Created:** 2026-01-22
**Last Updated:** 2026-01-22
**Version:** 1.0
