"use client"

import { useState, useEffect } from "react"
import { Linkedin, Download, Github } from "lucide-react"
import Navigation from "../components/navigation"

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      <Navigation currentPage="Home" />

      {/* Main Content */}
      <div className="flex items-center justify-between px-8 py-16 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-xl mb-4 text-gray-300">Hello, It's Me</p>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-6xl font-bold mb-6 text-balance">Pranjal Shinde</h1>
          </div>

          <div
            className={`transition-all duration-1000 delay-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-2xl mb-8">
              And I'm a{" "}
              <span className="text-cyan-400 font-semibold">
                Undergraduate BE IT student at Don Bosco Institute of Technology, Mumbai.
              </span>
            </p>
          </div>

          {/* Social Icons */}
          <div
            className={`flex space-x-4 mb-8 transition-all duration-1000 delay-1100 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/pranjallshinde"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-cyan-400 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 hover:scale-110 hover:rotate-12"
            >
              <Linkedin size={20} />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Pranjallshinde"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-cyan-400 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 hover:scale-110 hover:rotate-12"
            >
              <Github size={20} />
            </a>
          </div>

          {/* Download CV Button */}
         <a
  href="https://tinyurl.com/f4hnbf9s"
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="bg-cyan-400 text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-cyan-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 flex items-center space-x-2 group">
    <Download size={20} className="group-hover:animate-bounce" />
    <span>Download CV</span>
  </button>
</a>
</div>

         

        {/* Right Content - Profile Image */}
        <div className="flex-1 flex justify-center items-center">
          <div
            className={`relative transition-all duration-1500 delay-1000 ${
              isLoaded ? "scale-100 opacity-100 rotate-0" : "scale-75 opacity-0 rotate-12"
            }`}
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
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-cyan-400/3 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-cyan-400/5 rounded-full blur-lg animate-pulse delay-3000"></div>
      </div>
    </div>
  )
}
