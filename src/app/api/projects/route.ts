import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get projects
    const { data: projects, error: projectsError } = await supabase
      .from('Project')
      .select('*')
      .order('sortOrder', { ascending: true })

    if (projectsError) {
      console.error('Supabase error:', projectsError)
      return NextResponse.json({ error: 'Failed to fetch projects', details: projectsError.message }, { status: 500 })
    }

    // Get tags for each project
    const projectsWithTags = await Promise.all(
      (projects || []).map(async (project) => {
        const { data: tags } = await supabase
          .from('Tag')
          .select('*')
          .eq('projectId', project.id)

        return { ...project, tags: tags || [] }
      })
    )

    return NextResponse.json(projectsWithTags)
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch projects', details: errorMessage }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, description, url, tags } = body

    // Get the highest sort order
    const { data: maxProject } = await supabase
      .from('Project')
      .select('sortOrder')
      .order('sortOrder', { ascending: false })
      .limit(1)
      .single()

    const sortOrder = maxProject ? maxProject.sortOrder + 1 : 1

    // Create project
    const { data: project, error: projectError } = await supabase
      .from('Project')
      .insert({ name, category, description, url, sortOrder })
      .select()
      .single()

    if (projectError) throw projectError

    // Create tags if provided
    if (tags && tags.length > 0) {
      const tagsToInsert = tags.map((tag: string) => ({
        projectId: project.id,
        tag,
      }))

      const { error: tagsError } = await supabase
        .from('Tag')
        .insert(tagsToInsert)

      if (tagsError) {
        console.error('Tags error:', tagsError)
      }
    }

    // Get tags for response
    const { data: projectTags } = await supabase
      .from('Tag')
      .select('*')
      .eq('projectId', project.id)

    return NextResponse.json({ ...project, tags: projectTags || [] })
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to create project', details: errorMessage }, { status: 500 })
  }
}
