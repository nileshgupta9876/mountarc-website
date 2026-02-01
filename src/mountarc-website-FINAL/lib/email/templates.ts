import { ContactFormData, DiscoveryFormData, NewsletterFormData } from '../validation/schemas'

const WEBSITE_URL = 'https://mountarc-website-final.vercel.app'
const LINKEDIN_URL = 'https://www.linkedin.com/company/mountarc/'

const emailFooter = `
---
MountArc Private Limited
Website: ${WEBSITE_URL}
Email: contact@mountarc.com
LinkedIn: ${LINKEDIN_URL}
`

const emailFooterWithUnsubscribe = `
${emailFooter}
<a href="${WEBSITE_URL}/unsubscribe">Unsubscribe from newsletter</a>
`

// Email A: Contact Form -> Team Notification
export function contactTeamNotification(data: ContactFormData, timestamp: string, pageUrl: string) {
  const subject = `New Contact Form Submission from ${data.name}`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1A2332; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #1A2332; border-bottom: 2px solid #7FCCC1; padding-bottom: 10px;">New Contact Form Submission</h1>

  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td>
    </tr>
    ${data.phone ? `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td>
    </tr>
    ` : ''}
    ${data.projectType ? `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Project Type:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.projectType}</td>
    </tr>
    ` : ''}
    ${data.budget ? `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Budget Range:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.budget}</td>
    </tr>
    ` : ''}
  </table>

  <h3 style="color: #5BB5A8;">Message:</h3>
  <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
    ${data.message}
  </div>

  <p style="color: #666; font-size: 14px;">
    <strong>Submitted on:</strong> ${timestamp}<br>
    <strong>Submitted from:</strong> ${pageUrl}
  </p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
  <p style="color: #999; font-size: 12px;">This email was sent from the MountArc website contact form.</p>
</body>
</html>
`

  return { subject, html }
}

// Email B: Contact Form -> User Auto-Reply
export function contactUserConfirmation(data: ContactFormData) {
  const subject = "Thanks for reaching out to MountArc!"

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1A2332; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #1A2332; margin-bottom: 5px;">MountArc</h1>
    <p style="color: #7FCCC1; font-size: 14px; margin: 0;">IT SOLUTIONS</p>
  </div>

  <h2 style="color: #1A2332;">Hi ${data.name},</h2>

  <p>Thank you for contacting MountArc! We've received your message and our team will review it shortly.</p>

  <p>We typically respond within <strong>24 hours</strong> during business days. If your inquiry is urgent, feel free to book a discovery call directly:</p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${WEBSITE_URL}/book-call" style="background: linear-gradient(to right, #7FCCC1, #5BB5A8); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Book a Discovery Call</a>
  </div>

  <p>In the meantime, feel free to explore:</p>
  <ul style="color: #5BB5A8;">
    <li><a href="${WEBSITE_URL}/services" style="color: #5BB5A8;">Our Services</a></li>
    <li><a href="${WEBSITE_URL}/work" style="color: #5BB5A8;">Our Work</a></li>
    <li><a href="${WEBSITE_URL}/blog" style="color: #5BB5A8;">Our Blog</a></li>
  </ul>

  <p>Best regards,<br><strong>The MountArc Team</strong></p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p style="color: #999; font-size: 12px;">
    MountArc Private Limited<br>
    Website: <a href="${WEBSITE_URL}" style="color: #7FCCC1;">${WEBSITE_URL}</a><br>
    Email: <a href="mailto:contact@mountarc.com" style="color: #7FCCC1;">contact@mountarc.com</a><br>
    LinkedIn: <a href="${LINKEDIN_URL}" style="color: #7FCCC1;">linkedin.com/company/mountarc</a>
  </p>
</body>
</html>
`

  return { subject, html }
}

// Email C: Discovery Call -> Team Notification
export function discoveryTeamNotification(data: DiscoveryFormData, timestamp: string, pageUrl: string) {
  const subject = `New Discovery Call Booked - ${data.name}`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1A2332; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #1A2332; border-bottom: 2px solid #7FCCC1; padding-bottom: 10px;">New Discovery Call Booking</h1>

  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td>
    </tr>
    ${data.phone ? `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td>
    </tr>
    ` : ''}
    ${data.preferredTime ? `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Preferred Date/Time:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; color: #5BB5A8; font-weight: bold;">${data.preferredTime}</td>
    </tr>
    ` : ''}
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Budget Range:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.budget}</td>
    </tr>
  </table>

  <h3 style="color: #5BB5A8;">Project Description:</h3>
  <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
    ${data.description}
  </div>

  <p style="color: #666; font-size: 14px;">
    <strong>Booked on:</strong> ${timestamp}<br>
    <strong>Booked from:</strong> ${pageUrl}
  </p>

  <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
    <strong>Action Required:</strong> Please contact the client within 24 hours to confirm the call timing.
  </div>

  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
  <p style="color: #999; font-size: 12px;">This email was sent from the MountArc website discovery call booking form.</p>
</body>
</html>
`

  return { subject, html }
}

// Email D: Discovery Call -> User Confirmation
export function discoveryUserConfirmation(data: DiscoveryFormData) {
  const subject = "Your Discovery Call with MountArc is Confirmed!"

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1A2332; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #1A2332; margin-bottom: 5px;">MountArc</h1>
    <p style="color: #7FCCC1; font-size: 14px; margin: 0;">IT SOLUTIONS</p>
  </div>

  <h2 style="color: #1A2332;">Hi ${data.name},</h2>

  <p><strong style="color: #5BB5A8;">Great news!</strong> Your discovery call with MountArc has been confirmed.</p>

  <div style="background: #f0f9f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #5BB5A8; margin-top: 0;">What happens next?</h3>
    <ol style="margin: 0; padding-left: 20px;">
      <li style="margin-bottom: 10px;">Our team will review your request</li>
      <li style="margin-bottom: 10px;">We'll reach out within 24 hours to schedule the call</li>
      <li style="margin-bottom: 10px;">We'll send you a calendar invite</li>
    </ol>
  </div>

  <p><strong>Before the call, it helps if you can think about:</strong></p>
  <ul>
    <li>Your project goals and vision</li>
    <li>Timeline expectations</li>
    <li>Any specific challenges you're facing</li>
  </ul>

  <p>Looking forward to speaking with you!</p>

  <p>Best regards,<br><strong>The MountArc Team</strong></p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p style="color: #999; font-size: 12px;">
    MountArc Private Limited<br>
    Website: <a href="${WEBSITE_URL}" style="color: #7FCCC1;">${WEBSITE_URL}</a><br>
    Email: <a href="mailto:contact@mountarc.com" style="color: #7FCCC1;">contact@mountarc.com</a><br>
    LinkedIn: <a href="${LINKEDIN_URL}" style="color: #7FCCC1;">linkedin.com/company/mountarc</a>
  </p>
</body>
</html>
`

  return { subject, html }
}

// Email E: Newsletter -> Team Notification
export function newsletterTeamNotification(data: NewsletterFormData, timestamp: string, pageUrl: string) {
  const subject = "New Newsletter Subscriber"

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1A2332; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #1A2332; border-bottom: 2px solid #7FCCC1; padding-bottom: 10px;">New Newsletter Subscription</h1>

  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Email:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Subscribed on:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${timestamp}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Subscribed from:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${pageUrl}</td>
    </tr>
  </table>

  <div style="background: #d4edda; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745; margin: 20px 0;">
    <strong>Remember:</strong> Add this email to your newsletter mailing list.
  </div>

  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
  <p style="color: #999; font-size: 12px;">This email was sent from the MountArc website newsletter signup form.</p>
</body>
</html>
`

  return { subject, html }
}

// Email F: Newsletter -> Welcome Email
export function newsletterWelcome(data: NewsletterFormData) {
  const subject = "Welcome to MountArc's Newsletter!"

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1A2332; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #1A2332; margin-bottom: 5px;">MountArc</h1>
    <p style="color: #7FCCC1; font-size: 14px; margin: 0;">IT SOLUTIONS</p>
  </div>

  <h2 style="color: #1A2332;">Hi there!</h2>

  <p>Welcome to MountArc's newsletter! We're excited to have you join our community.</p>

  <div style="background: #f0f9f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #5BB5A8; margin-top: 0;">Here's what you can expect from us:</h3>
    <ul style="margin: 0; padding-left: 20px;">
      <li style="margin-bottom: 8px;">Updates on web development and AI trends (bi-weekly)</li>
      <li style="margin-bottom: 8px;">Tips for building successful products</li>
      <li style="margin-bottom: 8px;">Case studies and insights from our projects</li>
      <li style="margin-bottom: 8px;">Exclusive content and resources</li>
    </ul>
  </div>

  <p>We promise to deliver value and respect your inbox - <strong>no spam, ever</strong>.</p>

  <p>Want to get started? Check out our latest content:</p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${WEBSITE_URL}/blog" style="background: linear-gradient(to right, #7FCCC1, #5BB5A8); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Visit Our Blog</a>
  </div>

  <p>Best regards,<br><strong>The MountArc Team</strong></p>

  <p style="font-size: 14px; color: #666;"><em>P.S. You can unsubscribe anytime using the link at the bottom of this email.</em></p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p style="color: #999; font-size: 12px;">
    MountArc Private Limited<br>
    Website: <a href="${WEBSITE_URL}" style="color: #7FCCC1;">${WEBSITE_URL}</a><br>
    Email: <a href="mailto:contact@mountarc.com" style="color: #7FCCC1;">contact@mountarc.com</a><br>
    LinkedIn: <a href="${LINKEDIN_URL}" style="color: #7FCCC1;">linkedin.com/company/mountarc</a>
  </p>
  <p style="text-align: center; margin-top: 20px;">
    <a href="${WEBSITE_URL}/unsubscribe" style="color: #999; font-size: 12px;">Unsubscribe from newsletter</a>
  </p>
</body>
</html>
`

  return { subject, html }
}