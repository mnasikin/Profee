import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getFallbackSkills } from '@/lib/fallback-data'

// GET all skills
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }]
    })

    if (skills.length > 0) {
      return NextResponse.json(
        skills.map(skill => ({
          id: skill.id,
          name: skill.name,
          category: skill.category,
          proficiencyLevel: skill.proficiencyLevel,
          isTechnical: skill.isTechnical
        }))
      )
    }

    const fallback = getFallbackSkills().map(skill => ({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      proficiencyLevel: skill.proficiencyLevel,
      isTechnical: skill.isTechnical
    }))

    return NextResponse.json(fallback)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new skill
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, proficiencyLevel, isTechnical } = body

    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        proficiencyLevel,
        isTechnical
      }
    })

    return NextResponse.json({ success: true, id: skill.id })
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
