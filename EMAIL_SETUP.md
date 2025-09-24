# Email Integration Setup Guide

This portfolio website supports multiple email services for sending contact form notifications. Choose one of the options below:

## Option 1: Gmail SMTP (Recommended for personal use)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Add environment variables**:
   \`\`\`
   EMAIL_SERVICE=gmail
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   ADMIN_EMAIL=your-email@gmail.com
   FROM_EMAIL=your-email@gmail.com
   \`\`\`

## Option 2: SendGrid (Recommended for production)

1. **Create a SendGrid account** at sendgrid.com
2. **Generate an API key** in SendGrid dashboard
3. **Verify your sender email** in SendGrid
4. **Add environment variables**:
   \`\`\`
   EMAIL_SERVICE=sendgrid
   SENDGRID_API_KEY=your-sendgrid-api-key
   ADMIN_EMAIL=your-email@domain.com
   FROM_EMAIL=noreply@yourdomain.com
   \`\`\`

## Option 3: Resend (Modern alternative)

1. **Create a Resend account** at resend.com
2. **Generate an API key** in Resend dashboard
3. **Add your domain** (optional, can use resend.dev for testing)
4. **Add environment variables**:
   \`\`\`
   EMAIL_SERVICE=resend
   RESEND_API_KEY=your-resend-api-key
   ADMIN_EMAIL=your-email@domain.com
   FROM_EMAIL=noreply@yourdomain.com
   \`\`\`

## Option 4: Custom SMTP Server

1. **Get SMTP credentials** from your email provider
2. **Add environment variables**:
   \`\`\`
   EMAIL_SERVICE=smtp
   SMTP_HOST=smtp.yourdomain.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-username
   SMTP_PASSWORD=your-password
   ADMIN_EMAIL=your-email@domain.com
   FROM_EMAIL=noreply@yourdomain.com
   \`\`\`

## Additional Configuration

### Optional Settings:
\`\`\`
ENABLE_AUTO_REPLY=true          # Send auto-reply to form submitters
SITE_NAME=Your Portfolio        # Used in email templates
NEXT_PUBLIC_SITE_URL=https://yoursite.com  # Used in email links
\`\`\`

### Testing Mode:
\`\`\`
EMAIL_SERVICE=console           # Logs emails to console instead of sending
\`\`\`

## How to Add Environment Variables

### Local Development (.env.local):
Create a `.env.local` file in your project root and add your variables.

### Vercel Deployment:
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add each variable with its value
4. Redeploy your application

## Troubleshooting

- **Gmail "Less secure app access"**: Use App Passwords instead of your regular password
- **SendGrid emails not sending**: Verify your sender email address
- **SMTP connection issues**: Check your SMTP settings and firewall
- **Auto-reply not working**: Ensure `ENABLE_AUTO_REPLY=true` and `FROM_EMAIL` is set

## Security Notes

- Never commit API keys or passwords to your repository
- Use environment variables for all sensitive data
- Consider using a dedicated email address for form notifications
- Test your email setup in development before deploying
