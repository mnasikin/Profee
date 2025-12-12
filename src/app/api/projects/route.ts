import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getFallbackProjects } from '@/lib/fallback-data'
import { getDataWithFallback, executeWriteOperation } from '@/lib/hybrid-db'

function normalizeTechnologies(value: unknown): string[] {
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

  if (typeof value === 'object') {
    try {
      const parsed = JSON.parse(JSON.stringify(value))
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  return []
}

// GET all projects
export async function GET() {
  try {
    const result = await getDataWithFallback(
      async () => {
        const projects = await prisma.project.findMany({
          orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }]
        })
        return projects.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          technologies: normalizeTechnologies(project.technologies),
          projectUrl: project.projectUrl,
          githubUrl: project.githubUrl,
          imageUrl: project.imageUrl,
          featured: project.featured
        }))
      },
      () => getFallbackProjects().map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        projectUrl: project.projectUrl,
        githubUrl: project.githubUrl,
        imageUrl: project.imageUrl,
        featured: project.featured
      }))
    )

    return NextResponse.json(result.data)
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching projects:', error)
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, technologies, projectUrl, githubUrl, imageUrl, featured } = body

    const result = await executeWriteOperation(async () => {
      return await prisma.project.create({
        data: {
          title,
          description,
          technologies: JSON.stringify(Array.isArray(technologies) ? technologies : []),
          projectUrl,
          githubUrl,
          imageUrl,
          featured: Boolean(featured)
        }
      })
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 503 })
    }

    return NextResponse.json({ success: true, id: result.data?.id })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error creating project:', error)
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
