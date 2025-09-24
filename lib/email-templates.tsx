export interface EmailTemplateData {
  name: string
  email: string
  mobile?: string
  subject: string
  message: string
  timestamp: string
}

export function generateAdminNotificationEmail(data: EmailTemplateData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0891b2; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
    .footer { background: #1e293b; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #0891b2; }
    .message-box { background: white; padding: 15px; border-left: 4px solid #0891b2; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <p>You have received a new message from your portfolio website.</p>
    </div>
    
    <div class="content">
      <div class="field">
        <span class="label">From:</span> ${data.name}
      </div>
      
      <div class="field">
        <span class="label">Email:</span> ${data.email}
      </div>
      
      ${
        data.mobile
          ? `
      <div class="field">
        <span class="label">Phone:</span> ${data.mobile}
      </div>
      `
          : ""
      }
      
      <div class="field">
        <span class="label">Subject:</span> ${data.subject}
      </div>
      
      <div class="field">
        <span class="label">Received:</span> ${new Date(data.timestamp).toLocaleString()}
      </div>
      
      <div class="message-box">
        <div class="label">Message:</div>
        <p style="margin-top: 10px; white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>
    
    <div class="footer">
      <p>This email was sent from your portfolio contact form.</p>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin" style="color: #22d3ee;">View in Admin Dashboard</a></p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

export function generateAutoReplyEmail(data: EmailTemplateData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank you for contacting me</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0891b2; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
    .footer { background: #1e293b; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Message!</h1>
    </div>
    
    <div class="content">
      <p>Hi ${data.name},</p>
      
      <p>Thank you for reaching out through my portfolio website. I have received your message regarding "<strong>${data.subject}</strong>" and will get back to you as soon as possible.</p>
      
      <p>Here's a copy of your message for your records:</p>
      
      <div style="background: white; padding: 15px; border-left: 4px solid #0891b2; margin: 15px 0;">
        <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
      </div>
      
      <p>I typically respond within 24-48 hours. If your inquiry is urgent, please feel free to call me directly.</p>
      
      <p>Best regards,<br>
      <strong>Your Name</strong></p>
    </div>
    
    <div class="footer">
      <p>This is an automated response from my portfolio contact form.</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}
