import { type NextRequest, NextResponse } from "next/server"

interface ContactMessage {
  id: string
  name: string
  email: string
  mobile: string
  subject: string
  message: string
  timestamp: string
  read: boolean
}

declare global {
  var contactMessages: ContactMessage[] | undefined
}

if (!global.contactMessages) {
  global.contactMessages = []
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Contact API called")

    const body = await request.json()
    console.log("[v0] Request body:", body)

    const { name, email, mobile, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      mobile: mobile || "",
      subject,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    }

    global.contactMessages = global.contactMessages || []
    global.contactMessages.push(newMessage)
    console.log("[v0] Message saved successfully:", newMessage.id)
    console.log("[v0] Total messages:", global.contactMessages.length)

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      id: newMessage.id,
    })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json(
      {
        error: "Failed to send message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  const messageCount = global.contactMessages?.length || 0
  return NextResponse.json({
    message: "Contact API is working",
    totalMessages: messageCount,
  })
}
