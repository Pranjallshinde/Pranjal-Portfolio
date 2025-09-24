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

export async function GET() {
  try {
    console.log("[v0] Admin API: Fetching messages")
    const messages = global.contactMessages || []
    console.log("[v0] Admin API: Found", messages.length, "messages")

    // Sort by timestamp, newest first
    const sortedMessages = messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return NextResponse.json({ messages: sortedMessages })
  } catch (error) {
    console.error("[v0] Admin API: Failed to get messages:", error)
    return NextResponse.json({ error: "Failed to retrieve messages" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, action } = await request.json()
    console.log("[v0] Admin API: PATCH request", { id, action })

    if (action === "mark_read") {
      const messages = global.contactMessages || []
      const messageIndex = messages.findIndex((msg) => msg.id === id)

      if (messageIndex !== -1) {
        messages[messageIndex].read = true
        console.log("[v0] Admin API: Marked message as read:", id)
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Admin API: Failed to update message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    console.log("[v0] Admin API: DELETE request for message:", id)

    const messages = global.contactMessages || []
    global.contactMessages = messages.filter((msg) => msg.id !== id)

    console.log("[v0] Admin API: Deleted message:", id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Admin API: Failed to delete message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
