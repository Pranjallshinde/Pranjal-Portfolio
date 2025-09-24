import fs from "fs/promises"
import path from "path"

export interface ContactMessage {
  id: string
  name: string
  email: string
  mobile: string
  subject: string
  message: string
  timestamp: string
  read: boolean
}

const DATA_DIR = path.join(process.cwd(), "data")
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json")

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// Get all contact messages
export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(CONTACTS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Save a new contact message
export async function saveContactMessage(
  message: Omit<ContactMessage, "id" | "timestamp" | "read">,
): Promise<ContactMessage> {
  await ensureDataDir()

  const messages = await getContactMessages()
  const newMessage: ContactMessage = {
    ...message,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    read: false,
  }

  messages.push(newMessage)
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(messages, null, 2))

  return newMessage
}

// Mark message as read
export async function markMessageAsRead(id: string): Promise<void> {
  const messages = await getContactMessages()
  const messageIndex = messages.findIndex((msg) => msg.id === id)

  if (messageIndex !== -1) {
    messages[messageIndex].read = true
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(messages, null, 2))
  }
}

// Delete a message
export async function deleteContactMessage(id: string): Promise<void> {
  const messages = await getContactMessages()
  const filteredMessages = messages.filter((msg) => msg.id !== id)
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(filteredMessages, null, 2))
}
