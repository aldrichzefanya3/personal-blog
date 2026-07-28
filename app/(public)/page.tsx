import Link from "next/link"
import { prisma } from "@/lib/db"
import { format } from "date-fns"
import { ArrowRight, Calendar, Clock } from "lucide-react"

export default async function Home() {
  const posts = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  })

  const featuredPosts = posts.slice(0, 3)
  const latestPosts = posts.slice(3)

  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-16">
      {/* Hero Section */}
      <section className="w-full max-w-screen-xl px-4 sm:px-8 text-center md:text-left py-20 mb-12">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Exploring <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">ideas</span> on the web.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed mx-auto md:mx-0">
          I'm chuckyisalive. I write about technology, design, culture, and whatever else catches my attention.
        </p>
        <Link 
          href="/blog" 
          className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-3 text-sm font-medium transition-transform hover:scale-105 active:scale-95"
        >
          Read the blog <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="w-full max-w-screen-xl px-4 sm:px-8 mb-24">
          <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-center">
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group relative rounded-2xl border bg-card p-5 hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                {post.coverImage && (
                  <div className="w-full h-48 bg-muted rounded-xl mb-4 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.coverImage} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                {!post.coverImage && (
                  <div className="w-full h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-indigo-500/50 font-bold text-4xl">A.</span>
                  </div>
                )}
                {post.category && (
                  <span className="text-xs font-semibold text-indigo-500 tracking-wider uppercase mb-2">
                    {post.category}
                  </span>
                )}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground pt-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {format(post.createdAt, "MMM d, yyyy")}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section className="w-full max-w-screen-xl px-4 sm:px-8">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col rounded-xl border bg-card p-5 hover:border-indigo-500/50 transition-colors">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-500 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                  <span className="flex items-center gap-1">{format(post.createdAt, "MMM d, yyyy")}</span>
                  {post.category && <span>•</span>}
                  {post.category && <span>{post.category}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
