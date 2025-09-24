"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface NavigationProps {
  currentPage: string
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/Certificates" },
    { name: "Projects", href: "/Projects" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="flex justify-between items-center px-8 py-6 relative z-10">
      <div
        className={`text-2xl font-bold transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
      >
        <Link href="/">Portfolio.</Link>
      </div>
      <ul
        className={`flex space-x-8 transition-all duration-1000 delay-200 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
      >
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`transition-colors duration-300 relative group ${
                currentPage === item.name ? "text-cyan-400" : "hover:text-cyan-400"
              }`}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
  
}
