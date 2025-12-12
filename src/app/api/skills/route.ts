import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getFallbackSkills } from '@/lib/fallback-data'
import { getDataWithFallback, executeWriteOperation } from '@/lib/hybrid-db'

// GET all skills
export async function GET() {
  try {
    const result = await getDataWithFallback(
      async () => {
        const skills = await prisma.skill.findMany({
          orderBy: [{ category: 'asc' }, { name: 'asc' }]
        })
        return skills.map(skill => ({
          id: skill.id,
          name: skill.name,
          category: skill.category,
          proficiencyLevel: skill.proficiencyLevel,
          isTechnical: skill.isTechnical
        }))
      },
      () => getFallbackSkills().map(skill => ({
        id: skill.id,
        name: skill.name,
        category: skill.category,
        proficiencyLevel: skill.proficiencyLevel,
        isTechnical: skill.isTechnical
      }))
    )

    return NextResponse.json(result.data)
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching skills:', error)
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new skill
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, proficiencyLevel, isTechnical } = body

    const result = await executeWriteOperation(async () => {
      return await prisma.skill.create({
        data: {
          name,
          category,
          proficiencyLevel,
          isTechnical
        }
      })
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 503 })
    }

    return NextResponse.json({ success: true, id: result.data?.id })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error creating skill:', error)
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
