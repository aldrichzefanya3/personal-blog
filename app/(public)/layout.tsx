import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-indigo-500/30">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
