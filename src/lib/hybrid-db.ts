import { PrismaClientKnownRequestError, PrismaClientInitializationError } from '@prisma/client/runtime/library'

const isServerless = process.env.IS_SERVERLESS === 'true'

/**
 * Result type for hybrid data operations
 */
export interface HybridDataResult<T> {
  data: T[]
  fallbackMode: boolean
}

/**
 * Wrapper function to get data with automatic fallback to fallback-data.ts
 * when database is unavailable or encounters errors.
 * 
 * @param dbQuery - Async function that queries the database
 * @param fallbackData - Function that returns fallback data
 * @param logErrors - Whether to log errors to console (default: true)
 * @returns Object containing data array and fallbackMode flag
 */
export async function getDataWithFallback<T>(
  dbQuery: () => Promise<T[]>,
  fallbackData: () => T[],
  logErrors: boolean = true
): Promise<HybridDataResult<T>> {
  if (isServerless) {
    if (logErrors && process.env.NODE_ENV === 'development') {
      console.log('☁️ IS_SERVERLESS is true, forcing fallback data')
    }
    return {
      data: fallbackData(),
      fallbackMode: true
    }
  }

  try {
    // Try to get data from database
    const data = await dbQuery()

    // If database returns data, use it
    if (data && data.length > 0) {
      return {
        data,
        fallbackMode: false
      }
    }

    // If database returns empty array, use fallback
    if (logErrors && process.env.NODE_ENV === 'development') {
      console.log('📦 Database returned empty data, using fallback data')
    }

    return {
      data: fallbackData(),
      fallbackMode: true
    }
  } catch (error) {
    // Handle database errors
    if (logErrors && process.env.NODE_ENV === 'development') {
      if (error instanceof PrismaClientInitializationError) {
        console.error('❌ Database initialization error - using fallback data')
        console.error('   Reason:', error.message)
      } else if (error instanceof PrismaClientKnownRequestError) {
        console.error('❌ Database request error - using fallback data')
        console.error('   Code:', error.code)
      } else if (error instanceof Error) {
        console.error('❌ Database error - using fallback data')
        console.error('   Error:', error.message)
      } else {
        console.error('❌ Unknown database error - using fallback data')
      }
    }

    // Return fallback data
    return {
      data: fallbackData(),
      fallbackMode: true
    }
  }
}

/**
 * Check if database is available
 * @returns true if database is accessible, false otherwise
 */
export async function isDatabaseAvailable(): Promise<boolean> {
  if (isServerless) return false
  try {
    const prisma = await import('./prisma')
    await prisma.default.$queryRaw`SELECT 1`
    return true
  } catch {
    return false
  }
}

/**
 * Wrapper for write operations that fail gracefully in fallback mode
 * @param writeOperation - Async function that performs write operation
 * @returns Result of write operation or error if in fallback mode
 */
export async function executeWriteOperation<T>(
  writeOperation: () => Promise<T>
): Promise<{ success: boolean; data?: T; error?: string }> {
  if (isServerless) {
    return {
      success: false,
      error: 'Write operations are disabled when IS_SERVERLESS is true.'
    }
  }
  try {
    const data = await writeOperation()
    return {
      success: true,
      data
    }
  } catch (error) {
    if (error instanceof PrismaClientInitializationError) {
      return {
        success: false,
        error: 'Database is not available. Write operations are disabled in fallback mode.'
      }
    } else if (error instanceof PrismaClientKnownRequestError) {
      return {
        success: false,
        error: `Database error: ${error.message}`
      }
    } else if (error instanceof Error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: false,
      error: 'Unknown error occurred'
    }
  }
}
