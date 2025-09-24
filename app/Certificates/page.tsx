"use client"

import { useState, useEffect } from "react"
import { Award } from "lucide-react"
import Navigation from "../../components/navigation"

export default function Certificates() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Replace with your real certificate details + links
  const certificates = [
    {
      icon: Award,
      title: " AICTE AWS Cloud Virtual Internship ",
      description: "Learned the basics of cloud platforms and implementation through AICTE Cloud Virtual Internship.",
      highlighted: false,
      link: "https://drive.google.com/drive/u/0/folders/1th1R9Npd-4TcHJuHUD532O32IoZPfLDa",
    },
    {
      icon: Award,
      title: " AICTE Python Full Stack",
      description: " Enhanced end-to-end web development skills through AICTE’s certified Python Full Stack program. ",
      highlighted: false,
      link: "https://drive.google.com/drive/u/0/folders/1th1R9Npd-4TcHJuHUD532O32IoZPfLDa",
    },
    {
      icon: Award,
      title: "Digital Marketing Fundamentals",
      description: "Certification on SEO, SEM, and Social Media Marketing basics.",
      highlighted: false,
      link: "https://example.com/certificate3",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation currentPage="Certificates" />

      <div className="px-8 py-16 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-6xl font-bold mb-4 text-balance">
            My <span className="text-cyan-400">Certificates</span>
          </h1>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${500 + index * 200}ms` }}
            >
              <div
                className={`h-full flex flex-col bg-slate-800 rounded-2xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300 group ${
                  cert.highlighted
                    ? "border-2 border-cyan-400 shadow-lg shadow-cyan-400/20"
                    : "border border-slate-700 hover:border-cyan-400/50"
                }`}
              >
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      cert.highlighted
                        ? "bg-cyan-400 text-slate-900"
                        : "bg-slate-700 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-900"
                    }`}
                  >
                    <cert.icon size={28} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4">{cert.title}</h3>

                {/* Description */}
                <p className="text-gray-400 mb-8 leading-relaxed flex-grow">
                  {cert.description}
                </p>

                {/* View Button (always at bottom) */}
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-block px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    cert.highlighted
                      ? "bg-cyan-400 text-slate-900 hover:bg-cyan-300 hover:shadow-cyan-400/25"
                      : "bg-cyan-400 text-slate-900 hover:bg-cyan-300 hover:shadow-cyan-400/25"
                  }`}
                >
                  View
                </a>
              </div>
            </div>
          ))}
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
