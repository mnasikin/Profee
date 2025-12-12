import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getFallbackPersonalInfo } from '@/lib/fallback-data'
import { getDataWithFallback, executeWriteOperation } from '@/lib/hybrid-db'

// GET personal info
export async function GET() {
  try {
    const result = await getDataWithFallback(
      async () => {
        const personalInfo = await prisma.personalInfo.findFirst()
        return personalInfo ? [personalInfo] : []
      },
      () => getFallbackPersonalInfo().map(info => ({
        ...info,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      false
    )

    if (result.data.length > 0) {
      const info = result.data[0]
      return NextResponse.json({
        id: info.id,
        fullName: info.fullName,
        title: info.title,
        bio: info.bio,
        location: info.location,
        email: info.email,
        phone: info.phone,
        githubUrl: info.githubUrl,
        linkedinUrl: info.linkedinUrl,
        fallbackMode: result.fallbackMode
      })
    }

    return NextResponse.json({ error: 'Personal info not found' }, { status: 404 })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching personal info:', error)
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update personal info
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, title, bio, location, email, phone, githubUrl, linkedinUrl } = body

    const result = await executeWriteOperation(async () => {
      return await prisma.personalInfo.upsert({
        where: { id: 1 },
        update: {
          fullName,
          title,
          bio,
          location,
          email,
          phone,
          githubUrl,
          linkedinUrl
        },
        create: {
          id: 1,
          fullName,
          title,
          bio,
          location,
          email,
          phone,
          githubUrl,
          linkedinUrl
        }
      })
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 503 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error updating personal info:', error)
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
