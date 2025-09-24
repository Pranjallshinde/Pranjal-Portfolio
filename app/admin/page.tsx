"use client"

import { useState, useEffect } from "react"
import type { ContactMessage } from "@/lib/storage"

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages")
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "mark_read" }),
      })
      fetchMessages()
    } catch (error) {
      console.error("Failed to mark as read:", error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      fetchMessages()
      setSelectedMessage(null)
    } catch (error) {
      console.error("Failed to delete message:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = messages.filter((msg) => !msg.read).length

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p>Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage contact form submissions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-4 py-2">
              <span className="text-cyan-400 font-semibold">{unreadCount}</span>
              <span className="text-gray-300 ml-2">unread</span>
            </div>
            <a href="/" className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors">
              Back to Site
            </a>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Messages List */}
        <div className="w-1/2 border-r border-slate-700 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Messages ({messages.length})</h2>

            {messages.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p>No messages yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message)
                      if (!message.read) markAsRead(message.id)
                    }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-slate-800/50 ${
                      selectedMessage?.id === message.id
                        ? "border-cyan-400 bg-cyan-400/5"
                        : message.read
                          ? "border-slate-700 bg-slate-800/30"
                          : "border-cyan-400/50 bg-cyan-400/5"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{message.name}</h3>
                        {!message.read && <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>}
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(message.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">{message.email}</p>
                    <p className="text-sm font-medium text-cyan-400 mb-2">{message.subject}</p>
                    <p className="text-sm text-gray-400 line-clamp-2">{message.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="w-1/2 overflow-y-auto">
          {selectedMessage ? (
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>From: {selectedMessage.name}</span>
                    <span>•</span>
                    <span>{formatDate(selectedMessage.timestamp)}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Delete
                </button>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-400">Email:</span>
                    <p className="text-cyan-400">{selectedMessage.email}</p>
                  </div>
                  {selectedMessage.mobile && (
                    <div>
                      <span className="text-gray-400">Phone:</span>
                      <p className="text-white">{selectedMessage.mobile}</p>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-gray-400 text-sm">Message:</span>
                  <div className="mt-2 p-4 bg-slate-700 rounded-lg">
                    <p className="whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                
                
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p>Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
