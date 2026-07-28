import { prisma } from "@/lib/db"
import { BlogList } from "@/components/blog/blog-list"

export default async function BlogPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams
  const viewParam = typeof searchParams.view === "string" ? searchParams.view : "grid"
  const view = (["grid", "list", "detail"].includes(viewParam) ? viewParam : "grid") as "grid" | "list" | "detail"

  const pageParam = typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam
  const take = 10
  const skip = (currentPage - 1) * take

  const [posts, totalCount] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.article.count({
      where: { published: true },
    }),
  ])

  const totalPages = Math.ceil(totalCount / take)

  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-16">
      <section className="w-full max-w-screen-xl px-4 sm:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Thoughts on software engineering, design, and building products.
        </p>
      </section>

      {/* TODO: Add client-side search and category filtering */}
      <section className="w-full max-w-screen-xl px-4 sm:px-8">
        <BlogList
          posts={posts}
          currentPage={currentPage}
          totalPages={totalPages}
          currentView={view}
        />
      </section>
    </div>
  )
}
