import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

    // For approve action, you might want to add the prompt to the main prompts.json
    // For this example, we'll just remove the submission
    const listPath = path.join(process.cwd(), 'data', 'submissions', 'submissions.json');
    const submissionPath = path.join(process.cwd(), 'data', 'submissions', `submission_${resolvedParams.id}.json`);

    // If approving, you might want to:
    // 1. Add to main prompts.json
    // 2. Remove from submissions
    // For now, we'll just remove it from the submissions list

    try {
      // Read the current submissions list
      const existingData = await fs.readFile(listPath, 'utf-8');
      const submissions = JSON.parse(existingData);

      // Find and remove the submission
      const updatedSubmissions = submissions.filter((s: any) => s.id !== resolvedParams.id);

      // Write back the updated list
      await fs.writeFile(listPath, JSON.stringify(updatedSubmissions, null, 2));

      // Delete the individual submission file
      try {
        await fs.unlink(submissionPath);
      } catch {
        // File might not exist, ignore
      }

      return NextResponse.json(
        { message: `Submission ${action}d successfully` },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating submissions:', error);
      return NextResponse.json(
        { message: 'Failed to update submissions' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: 'Failed to process request' },
      { status: 500 }
    );
  }
}