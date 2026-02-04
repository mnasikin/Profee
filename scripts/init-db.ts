import 'dotenv/config'

import { seedDatabaseFromFallback } from '@/lib/fallback-data'

async function run() {
  if (process.env.IS_SERVERLESS === 'true') {
    if (process.env.NODE_ENV === 'development') {
      console.log('☁️ IS_SERVERLESS is true, skipping database initialization')
    }
    return
  }

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
    const prisma = (await import('@/lib/prisma')).default
    await prisma.$disconnect()
  }
}

run()
