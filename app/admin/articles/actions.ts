"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createArticle(formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string || null
  const coverImage = formData.get("coverImage") as string || null
  const published = formData.get("published") === "on"

  await prisma.article.create({
    data: {
      title,
      slug,
      content,
      category,
      coverImage,
      published,
    }
  })

  revalidatePath("/admin/articles")
  redirect("/admin/articles")
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } })
  revalidatePath("/admin/articles")
}

export async function updateArticle(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string || null
  const coverImage = formData.get("coverImage") as string || null
  const published = formData.get("published") === "on"

  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      category,
      coverImage,
      published,
    }
  })

  revalidatePath("/admin/articles")
  redirect("/admin/articles")
}
