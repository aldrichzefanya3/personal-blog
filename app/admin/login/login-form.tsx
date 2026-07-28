"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { loginAction, setupAdminAction } from "../actions"

export function LoginForm({ isSetup }: { isSetup: boolean }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      const res = isSetup 
        ? await setupAdminAction(password)
        : await loginAction(password)
        
      if (res.success) {
        router.push("/admin")
        router.refresh()
      } else {
        setError(res.error || "Action failed")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isSetup ? "Setup Admin" : "Admin Login"}
          </CardTitle>
          <CardDescription>
            {isSetup 
              ? "Create a master password for your blog. You are the only admin." 
              : "Enter the master password to access the dashboard."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading 
                ? (isSetup ? "Saving..." : "Verifying...") 
                : (isSetup ? "Create Password" : "Login")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
