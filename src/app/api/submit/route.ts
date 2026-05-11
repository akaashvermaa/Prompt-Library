import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface Submission {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  platforms: string[];
  tags: string[];
  imagePlatforms?: string[];
  submittedAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const submission: Submission = await request.json();

    // Validate required fields
    if (!submission.title || !submission.description || !submission.prompt || !submission.category) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure the submission directory exists
    const submissionsDir = path.join(process.cwd(), 'data', 'submissions');
    try {
      await fs.access(submissionsDir);
    } catch {
      await fs.mkdir(submissionsDir, { recursive: true });
    }

    // Save the submission to a unique file
    const filename = `submission_${submission.id}.json`;
    const filePath = path.join(submissionsDir, filename);

    await fs.writeFile(filePath, JSON.stringify(submission, null, 2));

    // Also append to a submissions list file for easy access
    const listPath = path.join(submissionsDir, 'submissions.json');
    let submissionsList: Submission[] = [];

    try {
      const existingData = await fs.readFile(listPath, 'utf-8');
      submissionsList = JSON.parse(existingData);
    } catch {
      // File doesn't exist or is empty, start with empty array
    }

    submissionsList.push(submission);
    await fs.writeFile(listPath, JSON.stringify(submissionsList, null, 2));

    return NextResponse.json(
      { message: 'Prompt submitted successfully', id: submission.id },
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
    const listPath = path.join(process.cwd(), 'data', 'submissions', 'submissions.json');

    let submissions: Submission[] = [];
    try {
      const data = await fs.readFile(listPath, 'utf-8');
      submissions = JSON.parse(data);
    } catch {
      // File doesn't exist, return empty array
    }

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error reading submissions:', error);
    return NextResponse.json(
      { message: 'Failed to read submissions' },
      { status: 500 }
    );
  }
}