import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Skill')
      .select('*')
      .order('sortOrder', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch skills', details: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch skills', details: errorMessage }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, icon } = body

    // Get the highest sort order
    const { data: maxSkill } = await supabase
      .from('Skill')
      .select('sortOrder')
      .order('sortOrder', { ascending: false })
      .limit(1)
      .single()

    const sortOrder = maxSkill ? maxSkill.sortOrder + 1 : 1

    const { data, error } = await supabase
      .from('Skill')
      .insert({ name, category, icon, sortOrder })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to create skill', details: errorMessage }, { status: 500 })
  }
}
