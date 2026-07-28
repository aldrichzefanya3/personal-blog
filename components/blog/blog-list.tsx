"use client"

import Link from "next/link"
import { format } from "date-fns"
import { Calendar, LayoutGrid, List, SquareMenu, ChevronLeft, ChevronRight } from "lucide-react"
import type { Article } from "@/generated/prisma/client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type ViewType = "grid" | "list" | "detail"

interface BlogListProps {
  posts: Article[]
  currentPage: number
  totalPages: number
  currentView: ViewType
}

export function BlogList({ posts, currentPage, totalPages, currentView }: BlogListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    return params.toString()
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    return (
      <div className="flex items-center justify-center space-x-2 mt-12">
        <Link
          href={`${pathname}?${createQueryString("page", (currentPage - 1).toString())}`}
          className={`p-2 rounded-md border ${
            currentPage <= 1 ? "pointer-events-none opacity-50" : "hover:bg-accent"
          }`}
          aria-disabled={currentPage <= 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <Link
          href={`${pathname}?${createQueryString("page", (currentPage + 1).toString())}`}
          className={`p-2 rounded-md border ${
            currentPage >= totalPages ? "pointer-events-none opacity-50" : "hover:bg-accent"
          }`}
          aria-disabled={currentPage >= totalPages}
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    )
  }

  const renderPosts = () => {
    if (posts.length === 0) {
      return (
        <div className="py-12 text-center text-muted-foreground">
          No posts found.
        </div>
      )
    }

    if (currentView === "list") {
      return (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group relative rounded-xl border bg-card p-4 hover:shadow-md transition-all hover:border-indigo-500/50 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1">
                {post.category && (
                  <span className="text-xs font-semibold text-indigo-500 tracking-wider uppercase mb-1 block">
                    {post.category}
                  </span>
                )}
                <h2 className="text-lg font-semibold group-hover:text-indigo-500 transition-colors line-clamp-1">
                  {post.title}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 mt-2 sm:mt-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{format(post.createdAt, "MMM d, yyyy")}</span>
              </div>
            </Link>
          ))}
        </div>
      )
    }

    if (currentView === "detail") {
      return (
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group relative rounded-2xl border bg-card p-6 hover:shadow-lg transition-all flex flex-col gap-4">
               {post.coverImage && (
                <div className="w-full h-[300px] bg-muted rounded-xl overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.coverImage} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                </div>
              )}
              {!post.coverImage && (
                <div className="w-full h-[150px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                  <span className="text-indigo-500/50 font-bold text-4xl">A.</span>
                </div>
              )}
              <div>
                {post.category && (
                  <span className="text-xs font-semibold text-indigo-500 tracking-wider uppercase mb-2 block">
                    {post.category}
                  </span>
                )}
                <h2 className="text-2xl font-bold mb-3 group-hover:text-indigo-500 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                {/* A simplified excerpt from content, assuming plain text or stripping basic HTML */}
                <p className="text-muted-foreground line-clamp-3 text-sm">
                  {post.content.replace(/<[^>]*>?/gm, '').substring(0, 200)}...
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {format(post.createdAt, "MMM d, yyyy")}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )
    }

    // Default: Grid View
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
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
            <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-500 transition-colors line-clamp-2">
              {post.title}
            </h2>
            <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground pt-4">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {format(post.createdAt, "MMM d, yyyy")}</span>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <div className="text-sm text-muted-foreground">
          Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'} on this page
        </div>
        <div className="flex items-center space-x-1 border rounded-lg p-1 bg-muted/20">
          <button
            onClick={() => router.push(`${pathname}?${createQueryString("view", "grid")}`)}
            className={`p-2 rounded-md transition-colors ${currentView === "grid" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => router.push(`${pathname}?${createQueryString("view", "list")}`)}
            className={`p-2 rounded-md transition-colors ${currentView === "list" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => router.push(`${pathname}?${createQueryString("view", "detail")}`)}
            className={`p-2 rounded-md transition-colors ${currentView === "detail" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
            title="Detail View"
          >
            <SquareMenu className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {renderPosts()}
      {renderPagination()}
    </div>
  )
}
