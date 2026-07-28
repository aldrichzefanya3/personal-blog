import { prisma } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { deleteArticle } from "./actions"

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
        <Link href="/admin/articles/new">
          <Button><Plus className="w-4 h-4 mr-2" /> New Article</Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 font-medium">{article.title}</td>
                <td className="px-6 py-4">
                  {article.published ? (
                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs font-semibold dark:bg-green-900 dark:text-green-300">Published</span>
                  ) : (
                    <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded text-xs font-semibold dark:bg-yellow-900 dark:text-yellow-300">Draft</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link href={`/admin/articles/${article.id}`}>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                  <form action={async () => { "use server"; await deleteArticle(article.id) }} className="inline-block">
                    <Button variant="destructive" size="sm" type="submit">Delete</Button>
                  </form>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                  No articles found. Create your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
