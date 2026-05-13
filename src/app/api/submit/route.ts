import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const submission = await request.json();

    // Validate required fields loosely
    if (!submission.title || !submission.description || !submission.prompt || !submission.category) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add a submitted timestamp if not present
    if (!submission.submittedAt) {
      submission.submittedAt = new Date().toISOString();
    }

    // Insert the entire JSON object into the `data` column
    const { data, error } = await supabase
      .from('submissions')
      .insert([{ data: submission }])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { message: 'Failed to save submission to database' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Prompt submitted successfully', id: data?.[0]?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json(
      { message: 'Failed to save submission' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('id, data');

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json(
        { message: 'Failed to fetch submissions' },
        { status: 500 }
      );
    }

    // Return the JSON objects directly, merging the database ID if needed
    const submissions = data.map(sub => ({
      db_id: sub.id,
      ...sub.data
    }));

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error reading submissions:', error);
    return NextResponse.json(
      { message: 'Failed to read submissions' },
      { status: 500 }
    );
  }
}