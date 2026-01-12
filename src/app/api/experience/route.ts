import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Experience')
      .select('*')
      .order('sortOrder', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch experience', details: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch experience', details: errorMessage }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, company, description, isCurrent, startDate, endDate } = body

    // Get the highest sort order
    const { data: maxExp } = await supabase
      .from('Experience')
      .select('sortOrder')
      .order('sortOrder', { ascending: false })
      .limit(1)
      .single()

    const sortOrder = maxExp ? maxExp.sortOrder + 1 : 1

    const { data, error } = await supabase
      .from('Experience')
      .insert({ title, company, description, isCurrent, startDate, endDate, sortOrder })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to create experience', details: errorMessage }, { status: 500 })
  }
}
