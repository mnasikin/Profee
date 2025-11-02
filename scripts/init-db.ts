import 'dotenv/config'
import prisma from '@/lib/prisma'
import { seedDatabaseFromFallback } from '@/lib/fallback-data'

async function run() {
  try {
    await seedDatabaseFromFallback()
    console.log('Database initialized and seeded from fallback data')
  } catch (error) {
    console.error('Failed to initialize database during build:', error)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

run()
