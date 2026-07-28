"use client"

import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateArticle } from "../actions"
import type { Article } from "@/generated/prisma/client"

export function EditArticleForm({ article }: { article: Article }) {
  const [title, setTitle] = useState(article.title)
  const [slug, setSlug] = useState(article.slug)
  const [published, setPublished] = useState(article.published)

  const editor = useEditor({
    extensions: [StarterKit],
    content: article.content,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border rounded-md p-4 min-h-[400px]",
      },
    },
  })

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
      <h1 className="text-3xl font-bold tracking-tight">Edit Article</h1>
      
      <form action={async (formData) => {
        if (editor) {
          formData.append("content", editor.getHTML())
        }
        await updateArticle(article.id, formData)
      }}>
        <Card>
          <CardHeader>
            <CardTitle>Article Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title"
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input 
                id="slug" 
                name="slug"
                value={slug} 
                onChange={(e) => setSlug(e.target.value)} 
                required 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category" 
                name="category"
                defaultValue={article.category || ""}
                placeholder="e.g. Engineering, Design..."
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input 
                id="coverImage" 
                name="coverImage"
                defaultValue={article.coverImage || ""}
                placeholder="https://..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="published" 
                name="published" 
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="published">Published</Label>
            </div>
            
            <div className="grid gap-2 pt-4">
              <Label>Content</Label>
              <div className="border rounded-md bg-background">
                {/* Basic Toolbar */}
                <div className="border-b p-2 flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Button>
                </div>
                <EditorContent editor={editor} />
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">Save Changes</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
