export const emailConfig = {
  // Admin notification settings
  adminEmail: process.env.ADMIN_EMAIL || "admin@yourportfolio.com",
  fromEmail: process.env.FROM_EMAIL || "noreply@yourportfolio.com",

  // Auto-reply settings
  enableAutoReply: process.env.ENABLE_AUTO_REPLY !== "false", // Default to true

  // Email service settings (for future integration)
  emailService: process.env.EMAIL_SERVICE || "console", // console, sendgrid, resend, etc.

  // Site settings
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  siteName: process.env.SITE_NAME || "Portfolio Website",
}

// Email service integrations (placeholder for future implementation)
export const emailServices = {
  console: async (to: string, subject: string, html: string) => {
    console.log("📧 Email would be sent:")
    console.log(`To: ${to}`)
    console.log(`Subject: ${subject}`)
    console.log("HTML Content:", html)
    return true
  },

  // Gmail SMTP integration
  gmail: async (to: string, subject: string, html: string) => {
    const nodemailer = require("nodemailer")

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
      },
    })

    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject,
        html,
      })
      return true
    } catch (error) {
      console.error("Gmail send error:", error)
      return false
    }
  },

  // SendGrid integration
  sendgrid: async (to: string, subject: string, html: string) => {
    const sgMail = require("@sendgrid/mail")
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    try {
      await sgMail.send({
        to,
        from: process.env.FROM_EMAIL,
        subject,
        html,
      })
      return true
    } catch (error) {
      console.error("SendGrid send error:", error)
      return false
    }
  },

  // Resend integration
  resend: async (to: string, subject: string, html: string) => {
    const { Resend } = require("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to,
        subject,
        html,
      })
      return true
    } catch (error) {
      console.error("Resend send error:", error)
      return false
    }
  },

  // Nodemailer SMTP (for custom SMTP servers)
  smtp: async (to: string, subject: string, html: string) => {
    const nodemailer = require("nodemailer")

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    try {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to,
        subject,
        html,
      })
      return true
    } catch (error) {
      console.error("SMTP send error:", error)
      return false
    }
  },
}
