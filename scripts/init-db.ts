import 'dotenv/config'
import prisma from '@/lib/prisma'
import { seedDatabaseFromFallback } from '@/lib/fallback-data'

async function run() {
  try {
    await seedDatabaseFromFallback()
    if (process.env.NODE_ENV === 'development') {
      console.log('Database initialized and seeded from fallback data')
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to initialize database during build:', error)
    }
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

run()
