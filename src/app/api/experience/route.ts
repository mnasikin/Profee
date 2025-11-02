import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getFallbackExperience } from '@/lib/fallback-data'

const formatDate = (value: Date | null) =>
  value ? value.toISOString().split('T')[0] : null

const parseAchievements = (value: unknown): string[] => {
  if (!value) {
    return []
  }

  if (Array.isArray(value)) {
    return value as string[]
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  return []
}

// GET all experience
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: 'desc' }
    })

    if (experiences.length > 0) {
      return NextResponse.json(
        experiences.map(exp => ({
          id: exp.id,
          jobTitle: exp.jobTitle,
          company: exp.company,
          startDate: formatDate(exp.startDate),
          endDate: formatDate(exp.endDate),
          description: exp.description,
          achievements: parseAchievements(exp.achievements),
          isCurrent: exp.isCurrent
        }))
      )
    }

    const fallback = getFallbackExperience().map(exp => ({
      id: exp.id,
      jobTitle: exp.jobTitle,
      company: exp.company,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      achievements: exp.achievements,
      isCurrent: exp.isCurrent
    }))

    return NextResponse.json(fallback)
  } catch (error) {
    console.error('Error fetching experience:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new experience
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jobTitle, company, startDate, endDate, description, achievements, isCurrent } = body

    const result = await prisma.experience.create({
      data: {
        jobTitle,
        company,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        description,
        achievements: JSON.stringify(Array.isArray(achievements) ? achievements : []),
        isCurrent: Boolean(isCurrent)
      }
    })

    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
