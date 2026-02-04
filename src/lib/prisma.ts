import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

// Check if database file exists
const dbPath = process.env.DATABASE_URL?.replace('file:', '') || ''
const dbExists = dbPath ? fs.existsSync(path.resolve(dbPath)) : false

if (!dbExists && process.env.NODE_ENV === 'development' && process.env.IS_SERVERLESS !== 'true') {
  console.warn('⚠️  SQLite database file not found at:', dbPath)
  console.warn('📦 Application will run in fallback mode using data from fallback-data.ts')
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    // Add error formatting for better debugging
    errorFormat: 'pretty'
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

/**
 * Check if database is available and accessible
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Database connection check failed:', error)
    }
    return false
  }
}

export default prisma
