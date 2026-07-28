import { load } from "cheerio"
import { createHighlighter } from "shiki"

let highlighterInstance: any = null

async function getHighlighterInstance() {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: ["javascript", "typescript", "tsx", "jsx", "json", "html", "css", "bash", "python"],
    })
  }
  return highlighterInstance
}

export async function highlightHtml(html: string) {
  const $ = load(html)
  const highlighter = await getHighlighterInstance()

  const codeBlocks = $("pre code")
  
  if (codeBlocks.length === 0) return html

  for (let i = 0; i < codeBlocks.length; i++) {
    const el = $(codeBlocks[i])
    const code = el.text()
    
    // Tiptap often sets language as a class like 'language-javascript'
    let lang = "text"
    const className = el.attr("class")
    if (className) {
      const match = className.match(/language-(\w+)/)
      if (match) {
        lang = match[1]
      }
    }

    try {
      const highlightedHtml = highlighter.codeToHtml(code, {
        lang,
        theme: "github-dark", // You can use a dual theme setup if preferred
      })
      // Replace the entire <pre><code> block with the highlighted HTML
      el.parent().replaceWith(highlightedHtml)
    } catch (e) {
      console.error("Failed to highlight code block", e)
    }
  }

  return $.html()
}

export function extractHeadings(html: string) {
  const $ = load(html)
  const headings: { id: string; text: string; level: number }[] = []
  
  $("h1, h2, h3").each((i, el) => {
    const text = $(el).text()
    // Generate a simple ID if it doesn't have one
    const id = $(el).attr("id") || text.toLowerCase().replace(/[^\w]+/g, "-")
    $(el).attr("id", id)
    
    headings.push({
      id,
      text,
      level: parseInt(el.tagName.replace("h", ""), 10)
    })
  })
  
  return { htmlWithIds: $.html(), headings }
}
