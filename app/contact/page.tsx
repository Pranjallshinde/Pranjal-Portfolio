"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navigation from "../../components/navigation"

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setStatusMessage("Thank you! Your message has been sent successfully.")
        setFormData({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        })
      } else {
        setSubmitStatus("error")
        setStatusMessage(data.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setStatusMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation currentPage="Contact" />

      <div className="px-8 py-16 max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="text-6xl font-bold mb-4 text-balance">
            Contact <span className="text-cyan-400">Me!</span>
          </h1>
        </div>

        {/* Status Message Display */}
        {submitStatus !== "idle" && (
          <div
            className={`mb-8 p-4 rounded-lg text-center transition-all duration-300 ${
              submitStatus === "success"
                ? "bg-green-900/50 border border-green-500 text-green-300"
                : "bg-red-900/50 border border-red-500 text-red-300"
            }`}
          >
            {statusMessage}
          </div>
        )}

        {/* Contact Form */}
        <div
          className={`transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Email Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={8}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 resize-none"
                required
                disabled={isSubmitting}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-12 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isSubmitting
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-cyan-400 text-slate-900 hover:bg-cyan-300 hover:shadow-cyan-400/25"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-cyan-400/3 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-cyan-400/5 rounded-full blur-lg animate-pulse delay-3000"></div>
      </div>
    </div>
  )
}
