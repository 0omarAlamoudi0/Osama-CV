import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const aboutInfo = await db.aboutInfo.findFirst()
    return NextResponse.json(aboutInfo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about info' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { mainIntro, paragraph1, paragraph2 } = body

    // Get or create about info
    let aboutInfo = await db.aboutInfo.findFirst()

    if (aboutInfo) {
      aboutInfo = await db.aboutInfo.update({
        where: { id: aboutInfo.id },
        data: {
          mainIntro,
          paragraph1,
          paragraph2,
        },
      })
    } else {
      aboutInfo = await db.aboutInfo.create({
        data: {
          mainIntro,
          paragraph1,
          paragraph2,
        },
      })
    }

    return NextResponse.json(aboutInfo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about info' }, { status: 500 })
  }
}
