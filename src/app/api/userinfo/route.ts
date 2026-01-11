import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const userInfo = await db.userInfo.findFirst()
    return NextResponse.json(userInfo)
  } catch (error) {
    console.error('Database error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ 
      error: 'Failed to fetch user info',
      details: errorMessage,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        hasDirectUrl: !!process.env.DIRECT_URL,
      }
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, jobTitle, email, phone, location, birthDate } = body

    // Get or create user info
    let userInfo = await db.userInfo.findFirst()

    if (userInfo) {
      userInfo = await db.userInfo.update({
        where: { id: userInfo.id },
        data: {
          fullName,
          jobTitle,
          email,
          phone,
          location,
          birthDate,
        },
      })
    } else {
      userInfo = await db.userInfo.create({
        data: {
          fullName,
          jobTitle,
          email,
          phone,
          location,
          birthDate,
        },
      })
    }

    return NextResponse.json(userInfo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user info' }, { status: 500 })
  }
}
