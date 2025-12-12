import { NextResponse } from 'next/server'
import { seedDatabaseFromFallback } from '@/lib/fallback-data'

export async function GET() {
  try {
    await seedDatabaseFromFallback()

    return NextResponse.json({
      success: true,
      message: 'Database initialized and seeded successfully',
      fallbackMode: false
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Database initialization error:', error)
    }
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 })
  }
}
