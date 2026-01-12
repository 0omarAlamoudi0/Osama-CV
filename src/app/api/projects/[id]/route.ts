import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Delete tags first (cascade manually)
    await supabase
      .from('Tag')
      .delete()
      .eq('projectId', id)
    
    // Delete project
    const { error } = await supabase
      .from('Project')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to delete project', details: errorMessage }, { status: 500 })
  }
}
