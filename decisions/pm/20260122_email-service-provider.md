# Email Service Provider Selection

**Date:** 2026-01-22
**Role:** Product Manager
**Status:** Accepted

## Decision

Use Resend as the email service provider for all transactional emails (contact forms, discovery call bookings, newsletter confirmations).

## Context

The MountArc website needs reliable email functionality for:
- Contact form submissions
- Discovery call booking notifications
- Newsletter subscription confirmations
- Auto-replies to users

Client requested a free email solution with dynamic recipient configuration.

## Options Considered

### 1. EmailJS (Client's Initial Preference)
**Pros:**
- Completely free (200 emails/month)
- No backend code needed
- Very simple setup

**Cons:**
- Client-side only (email visible in browser)
- Security concern - recipient email exposed
- Not truly dynamic (requires dashboard changes)
- Lower deliverability
- Easy for bots to abuse
- Limited to 200 emails/month

### 2. Resend (Recommended & Chosen)
**Pros:**
- Free tier: 3,000 emails/month
- Server-side (secure)
- Email hidden via environment variables
- Truly dynamic configuration
- Professional deliverability
- Built for developers
- Easy Next.js integration (~15 lines of code)
- No credit card required

**Cons:**
- Requires minimal backend code (Next.js API route)

### 3. AWS SES
**Pros:**
- Very cost-effective at scale
- Highly reliable

**Cons:**
- More complex setup
- Requires AWS account
- Overkill for current needs

### 4. SendGrid
**Pros:**
- Industry standard
- Good documentation

**Cons:**
- Requires credit card for free tier
- More complex than Resend

## Chosen Approach

**Selected:** Resend (Free Tier - 3,000 emails/month)

**Rationale:**
1. **Security:** Recipient email hidden on server (not visible in browser)
2. **Dynamic Configuration:** Change recipient email via environment variable without code changes
3. **Sufficient Volume:** 3,000 emails/month covers estimated 100-200 emails/month easily
4. **Professional:** Better deliverability than client-side solutions
5. **Developer Experience:** Perfect for Next.js projects
6. **Free:** No cost for foreseeable future
7. **Minimal Code:** Only ~15 lines of backend code needed

**Implementation:**
- Server-side via Next.js API routes
- Environment variable: `RECIPIENT_EMAIL`
- Testing: `nileshgupta96g@gmail.com`
- Production: `contact@mountarc.com`
- Change recipient in 30 seconds via Vercel dashboard

## Trade-offs

**Accepting:**
- Minimal backend code requirement (~15 lines)
- Slightly more complex than EmailJS

**Gaining:**
- Security and professionalism
- Scalability (3,000 vs 200 emails/month)
- True dynamic configuration
- Better deliverability

## Next Steps

- [x] Document decision
- [ ] Set up Resend account
- [ ] Configure domain verification
- [ ] Create email templates
- [ ] Implement API routes
- [ ] Set up environment variables
- [ ] Test email delivery

## Related Documents

- PRD: `/requirements/PRD.md`
- Email templates: Will be defined in PRD
