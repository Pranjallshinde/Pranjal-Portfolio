"use client"

import { useState, useEffect } from "react"
import Navigation from "../../components/navigation"

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation currentPage="About" />

      <div className="flex items-center justify-between px-8 py-16 max-w-7xl mx-auto">
        {/* Left Content - Profile Image */}
        <div className="flex-1 flex justify-center items-center">
          <div
            className={`relative transition-all duration-1500 delay-500 ${isLoaded ? "scale-100 opacity-100 rotate-0" : "scale-75 opacity-0 rotate-12"}`}
          >
            {/* Hexagonal Frame with Glow Effect */}
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full scale-110 animate-pulse"></div>

              {/* Hexagonal Shape */}
              <div className="relative w-96 h-96 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-3xl transform rotate-12 hover:rotate-6 transition-transform duration-500 overflow-hidden group">
                {/* Inner Glow */}
                <div className="absolute inset-2 bg-gradient-to-br from-cyan-300 to-cyan-500 rounded-3xl overflow-hidden">
                  <div className="absolute inset-2 bg-slate-900 rounded-2xl overflow-hidden">
                    {/* Profile Image */}
                    <img
                      src="/pihu.png"
                      alt="Pranjal Shinde - Software Developer"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400/50 animate-pulse"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-cyan-300 rounded-full animate-bounce delay-1500"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-cyan-500 rounded-full animate-bounce delay-2000"></div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 max-w-2xl pl-16">
          <div
            className={`transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h1 className="text-6xl font-bold mb-4 text-balance">
              About <span className="text-cyan-400">Me</span>
            </h1>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h2 className="text-2xl font-semibold mb-8">Software Developer!</h2>
          </div>

          <div
            className={`transition-all duration-1000 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <p className="text-gray-400 mb-8 leading-relaxed">
             I am an enthusiastic Information Technology student with a passion for problem-solving, innovation, and learning new technology.
             I aim to grow as a well-rounded professional by combining my technical expertise with creativity, leadership, and social responsibility.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-900 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-400/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-cyan-400/3 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>
    </div>
  )
}
