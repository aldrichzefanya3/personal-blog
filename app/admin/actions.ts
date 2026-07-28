"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function checkAdminExists() {
  const admin = await prisma.adminConfig.findUnique({
    where: { id: "singleton" }
  })
  return !!admin
}

export async function setupAdminAction(password: string) {
  const adminExists = await checkAdminExists()
  if (adminExists) {
    return { success: false, error: "Admin already exists." }
  }

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  await prisma.adminConfig.create({
    data: {
      id: "singleton",
      passwordHash
    }
  })

  // Automatically log them in
  const cookieStore = await cookies()
  cookieStore.set("admin_token", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
  
  return { success: true }
}

export async function loginAction(password: string) {
  const admin = await prisma.adminConfig.findUnique({
    where: { id: "singleton" }
  })

  if (!admin) {
    return { success: false, error: "Admin not set up yet." }
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash)

  if (isValid) {
    const cookieStore = await cookies()
    cookieStore.set("admin_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    return { success: true }
  }
  
  return { success: false, error: "Invalid password" }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_token")
  redirect("/admin/login")
}
