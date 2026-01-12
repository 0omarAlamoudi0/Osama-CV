import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('AboutInfo')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch about info', details: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch about info', details: errorMessage }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { mainIntro, paragraph1, paragraph2 } = body

    // Get existing about info
    const { data: existing } = await supabase
      .from('AboutInfo')
      .select('id')
      .limit(1)
      .single()

    let result
    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from('AboutInfo')
        .update({ mainIntro, paragraph1, paragraph2, updatedAt: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single()
      
      if (error) throw error
      result = data
    } else {
      // Create new
      const { data, error } = await supabase
        .from('AboutInfo')
        .insert({ mainIntro, paragraph1, paragraph2 })
        .select()
        .single()
      
      if (error) throw error
      result = data
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to update about info', details: errorMessage }, { status: 500 })
  }
}
