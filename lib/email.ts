import { emailConfig, emailServices } from "./email-config"
import { generateAdminNotificationEmail, generateAutoReplyEmail, type EmailTemplateData } from "./email-templates"

export interface EmailData {
  to: string
  subject: string
  message: string
  from: string
}

export async function sendNotificationEmail(data: EmailData): Promise<boolean> {
  try {
    const templateData: EmailTemplateData = {
      name: data.from.split(" <")[0] || data.from, // Extract name from "Name <email>" format
      email: data.from.includes("<") ? data.from.split("<")[1].replace(">", "") : data.from,
      subject: data.subject.replace("New Contact: ", ""),
      message: data.message.split("\n\nMessage:\n")[1] || data.message,
      timestamp: new Date().toISOString(),
    }

    // Extract mobile from message if present
    const mobileMatch = data.message.match(/Phone: (.+)/)
    if (mobileMatch) {
      templateData.mobile = mobileMatch[1]
    }

    // Send admin notification
    const adminHtml = generateAdminNotificationEmail(templateData)
    const emailService = emailServices[emailConfig.emailService as keyof typeof emailServices]

    if (emailService) {
      await emailService(emailConfig.adminEmail, `New Contact: ${templateData.subject}`, adminHtml)
    }

    // Send auto-reply if enabled
    if (emailConfig.enableAutoReply) {
      const autoReplyHtml = generateAutoReplyEmail(templateData)
      await emailService(templateData.email, `Thank you for contacting me - ${templateData.subject}`, autoReplyHtml)
    }

    return true
  } catch (error) {
    console.error("Email sending failed:", error)
    return false
  }
}

// Utility function to format contact data for email
export function formatContactForEmail(contactData: {
  name: string
  email: string
  mobile?: string
  subject: string
  message: string
}): EmailData {
  return {
    to: emailConfig.adminEmail,
    subject: `New Contact: ${contactData.subject}`,
    message: `From: ${contactData.name} (${contactData.email})\nPhone: ${contactData.mobile || "Not provided"}\n\nMessage:\n${contactData.message}`,
    from: `${contactData.name} <${contactData.email}>`,
  }
}
