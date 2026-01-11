import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const experience = await db.experience.findMany({
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, company, description, isCurrent, startDate, endDate } = body

    // Get the highest sort order
    const maxExp = await db.experience.findFirst({
      orderBy: { sortOrder: 'desc' },
    })

    const sortOrder = maxExp ? maxExp.sortOrder + 1 : 1

    const experience = await db.experience.create({
      data: {
        title,
        company,
        description,
        isCurrent,
        startDate,
        endDate,
        sortOrder,
      },
    })

    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}
