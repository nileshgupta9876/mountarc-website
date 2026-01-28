# API Route and Email Delivery Fixes

**Date:** 2026-01-28
**Role:** Engineering
**Status:** Accepted

## Decision

Fixed three critical issues preventing the email system from working correctly:

1. **API Route Static Export Conflict** - Added `export const dynamic = 'force-dynamic'` to the send-email route
2. **Email Delivery Error Handling** - Added proper result checking for Resend email sends
3. **Sender Domain Verification** - Switched to Resend test domain until mountarc.com is verified

## Context

During QA preparation, discovered that:
- The `output: 'export'` in next.config.js was preventing API routes from working (static export doesn't support API routes)
- The Resend API calls weren't checking for errors in the response
- Emails from `noreply@mountarc.com` would fail without domain verification in Resend

## Options Considered

### API Routes
1. Remove `output: 'export'` - **Chosen** - Vercel handles deployment automatically
2. Move to edge functions - Overkill for this use case

### Email Domain
1. Use Resend test domain (`onboarding@resend.dev`) - **Chosen** - Works immediately for development/testing
2. Wait for domain verification - Would block testing

## Chosen Approach

Made minimal changes to unblock QA testing:

```typescript
// route.ts - Mark as dynamic
export const dynamic = 'force-dynamic'

// resend.ts - Use test domain
from: 'MountArc <onboarding@resend.dev>'

// next.config.js - Remove static export
// output: 'export',  // removed
```

## Trade-offs

1. **Test Domain Limitation**: Emails from `onboarding@resend.dev` will go to spam in some cases. Need domain verification before production.

2. **Error Surfacing**: Now throws errors if email fails, which is better for debugging but means partial success scenarios (team email sent, user email failed) will show as failures.

## Production Checklist

Before going live:
- [ ] Verify mountarc.com domain in Resend dashboard
- [ ] Change `from` email back to `noreply@mountarc.com`
- [ ] Update RECIPIENT_EMAIL to `contact@mountarc.com`

---

*Commit: 8a00a8d*