import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-8 max-w-screen-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-semibold text-foreground">
            chuckyisalive.
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="https://github.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            GitHub
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            LinkedIn
          </Link>
          <Link href="mailto:hello@example.com" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Email
          </Link>
          <Link href="/admin" className="text-sm font-medium text-muted-foreground/30 hover:text-foreground transition-colors ml-4">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
