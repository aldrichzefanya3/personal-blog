import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import { EditArticleForm } from "./edit-form"

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const article = await prisma.article.findUnique({
    where: { id },
  })

  if (!article) {
    notFound()
  }

  return <EditArticleForm article={article} />
}
