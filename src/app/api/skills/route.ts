import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const skills = await db.skill.findMany({
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, icon } = body

    // Get the highest sort order
    const maxSkill = await db.skill.findFirst({
      orderBy: { sortOrder: 'desc' },
    })

    const sortOrder = maxSkill ? maxSkill.sortOrder + 1 : 1

    const skill = await db.skill.create({
      data: {
        name,
        category,
        icon,
        sortOrder,
      },
    })

    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}
