import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface ActionBody {
  action: "approve" | "reject";
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { action } = await request.json() as ActionBody;

    if (!action || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { message: 'Invalid action' },
        { status: 400 }
      );
    }

    // We can delete by matching the JSON data ID or the DB row ID. 
    // Here we assume resolvedParams.id corresponds to the db_id or the json's internal id
    // We will delete rows where the JSON contains the matching internal id.
    const { error } = await supabase
      .from('submissions')
      .delete()
      .filter('data->>id', 'eq', resolvedParams.id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json(
        { message: 'Failed to update submissions' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: `Submission ${action}d successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: 'Failed to process request' },
      { status: 500 }
    );
  }
}