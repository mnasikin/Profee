import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getFallbackPersonalInfo } from '@/lib/fallback-data'

// GET personal info
export async function GET() {
  try {
    const personalInfo = await prisma.personalInfo.findFirst()

    if (personalInfo) {
      return NextResponse.json({
        id: personalInfo.id,
        fullName: personalInfo.fullName,
        title: personalInfo.title,
        bio: personalInfo.bio,
        location: personalInfo.location,
        email: personalInfo.email,
        phone: personalInfo.phone,
        githubUrl: personalInfo.githubUrl,
        linkedinUrl: personalInfo.linkedinUrl
      })
    }

    const fallback = getFallbackPersonalInfo()
    if (fallback.length > 0) {
      const info = fallback[0]
      return NextResponse.json({
        id: info.id,
        fullName: info.fullName,
        title: info.title,
        bio: info.bio,
        location: info.location,
        email: info.email,
        phone: info.phone,
        githubUrl: info.githubUrl,
        linkedinUrl: info.linkedinUrl
      })
    }

    return NextResponse.json({ error: 'Personal info not found' }, { status: 404 })
  } catch (error) {
    console.error('Error fetching personal info:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update personal info
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, title, bio, location, email, phone, githubUrl, linkedinUrl } = body

    await prisma.personalInfo.upsert({
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating personal info:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
