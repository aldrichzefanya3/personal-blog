import { Code, Briefcase, Mail } from "lucide-react"
import Link from "next/link"

const skills = [
  "Technology", "Design", "Writing", "Web Culture", 
  "Open Source", "Digital Art", "Photography", "Philosophy"
]

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-16">
      <section className="w-full max-w-screen-xl px-4 sm:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div className="w-full aspect-square bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl overflow-hidden relative flex items-center justify-center shadow-sm">
              <span className="text-9xl font-bold text-indigo-500/50">A.</span>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="https://github.com" target="_blank" className="flex items-center gap-3 text-sm font-medium hover:text-indigo-500 transition-colors bg-muted/50 p-3 rounded-lg border border-transparent hover:border-indigo-500/20">
                <Code className="w-5 h-5" /> GitHub
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="flex items-center gap-3 text-sm font-medium hover:text-indigo-500 transition-colors bg-muted/50 p-3 rounded-lg border border-transparent hover:border-indigo-500/20">
                <Briefcase className="w-5 h-5" /> LinkedIn
              </Link>
              <Link href="mailto:hello@example.com" className="flex items-center gap-3 text-sm font-medium hover:text-indigo-500 transition-colors bg-muted/50 p-3 rounded-lg border border-transparent hover:border-indigo-500/20">
                <Mail className="w-5 h-5" /> Email Me
              </Link>
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Hi, I'm chuckyisalive.
            </h1>
            <div className="prose prose-zinc dark:prose-invert prose-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a technology enthusiast who loves exploring the intersection of design, engineering, and digital culture. I enjoy analyzing how tools and platforms shape our world and sharing those insights here.
              </p>
              <p>
                My journey in tech started with a curiosity for how things work, and it quickly evolved into a passion for writing about ideas that matter.
              </p>
              <p>
                When I'm not writing, you can usually find me reading, exploring new projects, or diving deep into internet rabbit holes.
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight mt-12 mb-6">Interests</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <span key={skill} className="px-4 py-2 bg-card border rounded-full text-sm font-medium shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
        </div>
      </section>
    </div>
  )
}
