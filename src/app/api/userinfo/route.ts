import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('UserInfo')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch user info', details: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch user info', details: errorMessage }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, jobTitle, email, phone, location, birthDate } = body

    // Get existing user info
    const { data: existing } = await supabase
      .from('UserInfo')
      .select('id')
      .limit(1)
      .single()

    let result
    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from('UserInfo')
        .update({ fullName, jobTitle, email, phone, location, birthDate, updatedAt: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single()
      
      if (error) throw error
      result = data
    } else {
      // Create new
      const { data, error } = await supabase
        .from('UserInfo')
        .insert({ fullName, jobTitle, email, phone, location, birthDate })
        .select()
        .single()
      
      if (error) throw error
      result = data
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to update user info', details: errorMessage }, { status: 500 })
  }
}
