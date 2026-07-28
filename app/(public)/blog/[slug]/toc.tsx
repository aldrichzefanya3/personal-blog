"use client"

import { useEffect, useState } from "react"

type Heading = { id: string; text: string; level: number }

export function Toc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id)
      if (el) {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </h3>
      <nav className="flex flex-col space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`text-sm transition-colors hover:text-indigo-500 line-clamp-1 ${
              activeId === heading.id 
                ? "text-indigo-500 font-medium" 
                : "text-muted-foreground"
            }`}
            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
