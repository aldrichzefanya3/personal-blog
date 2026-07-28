import { prisma } from "@/lib/db"
import { highlightHtml, extractHeadings } from "@/lib/highlighter"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Calendar, ChevronLeft, Clock } from "lucide-react"
import Link from "next/link"
import { ArticleProgress } from "./article-progress"
import { Toc } from "./toc"

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug },
  })

  if (!article || !article.published) {
    notFound()
  }

  // Calculate reading time (roughly 200 words per minute)
  const wordCount = article.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  const { htmlWithIds, headings } = extractHeadings(article.content)
  const highlightedContent = await highlightHtml(htmlWithIds)

  return (
    <>
      <ArticleProgress />
      
      <div className="container mx-auto px-4 sm:px-8 max-w-screen-xl py-12 lg:py-20 flex flex-col lg:flex-row gap-12 relative">
        
        {/* Main Content Area */}
        <article className="flex-1 max-w-3xl mx-auto lg:mx-0 w-full">
          <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to blog
          </Link>
          
          <header className="mb-10">
            {article.category && (
              <span className="text-sm font-semibold text-indigo-500 tracking-wider uppercase mb-4 block">
                {article.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {format(article.createdAt, "MMMM d, yyyy")}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {readingTime} min read</span>
            </div>
          </header>

          {article.coverImage && (
            <div className="w-full aspect-video bg-muted rounded-2xl mb-12 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div 
            className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-500 hover:prose-a:text-indigo-600 prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-border/50"
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
          />
        </article>

        {/* Sidebar for TOC */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <Toc headings={headings} />
          </div>
        </aside>
      </div>
    </>
  )
}
