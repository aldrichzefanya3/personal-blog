import { PrismaClient } from '../generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'

// Instantiate the database
const connectionString = process.env.DATABASE_URL || 'file:./dev.db'
// Strip file: prefix for better-sqlite3 if it exists
const dbPath = connectionString.startsWith('file:') ? connectionString.slice(5) : connectionString

const adapter = new PrismaBetterSqlite3({ url: dbPath })

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
