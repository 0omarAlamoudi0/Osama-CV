import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const projects = await db.project.findMany({
      include: {
        tags: true,
      },
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, description, url, tags } = body

    // Get the highest sort order
    const maxProject = await db.project.findFirst({
      orderBy: { sortOrder: 'desc' },
    })

    const sortOrder = maxProject ? maxProject.sortOrder + 1 : 1

    const project = await db.project.create({
      data: {
        name,
        category,
        description,
        url,
        sortOrder,
        tags: tags
          ? {
              create: tags.map((tag: string) => ({ tag })),
            }
          : undefined,
      },
      include: {
        tags: true,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
