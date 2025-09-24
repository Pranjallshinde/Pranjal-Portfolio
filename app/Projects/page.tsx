"use client"

import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"
import Navigation from "../../components/navigation"

export default function PortfolioPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const projects = [
    {
      image: "/CVGuru.png",
      title: "CV Guru.Ai",
      description:
        "Developed and Deployed an AI-based platform that helps people prepare for job interviews.",
      type: "image",
      projectUrl: "https://github.com/Pranjallshinde/CVGuru.Ai",
      technologies: ["HTML", "CSS", "Python/Flask", "AI(GEMINI API)"],
    },
    {
      image: "/MaidConnect.png",
      title: "Maid Connect",
      description:
        "Developed a maid hiring platform where users can create profiles, search and filter maids by skills and availability, and securely hire staff through an intuitive interface.",
      type: "image",
      projectUrl: "https://github.com/Pranjallshinde/maidConnect",
      technologies: ["HTML", "CSS", "JS", "Node.js", "React.js", "MongoDB"],
    },
    {
      image: "/Social-Media-Addiction-thumbnail.jpg",
      title: "Social Media Impact on Mental Health",
      description:
        "Built a machine learning model to analyze the impact of social media usage on mental health by processing responses to assess whether individuals may need professional support.",
      type: "image",
      projectUrl: "https://github.com/Pranjallshinde/Social-Media-Impact-on-Mental-Health",
      technologies: ["Python","Pandas","NumPy","Matplotlib","Data Visualization","Statistical Analysis"],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation currentPage="Portfolio" />

<div className="px-8 py-8 max-w-7xl mx-auto mt-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="text-6xl font-bold mb-4 text-balance">
            Latest <span className="text-cyan-400">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my recent work and creative solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${500 + index * 150}ms` }}
            >
              <div className="group cursor-pointer bg-slate-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl flex flex-col h-[520px]">
                {/* Project Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed mb-4 text-sm line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-500 text-slate-900 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      View Project
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Projects Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8">More Projects Coming Soon</h2>
          <p className="text-gray-400 mb-8">
            I'm constantly working on new and exciting projects. Stay tuned for updates!
          </p>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-400/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-cyan-400/3 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-cyan-400/5 rounded-full blur-lg animate-pulse delay-3000"></div>
      </div>
    </div>
  )
}
