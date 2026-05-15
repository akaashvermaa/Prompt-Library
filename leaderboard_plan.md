# Leaderboard Implementation Plan

To implement the leaderboard and recognize contributors, we need to update the database schema and add new UI components.

## 1. Database Schema Update
Run the following SQL in your Supabase SQL Editor:

```sql
-- Add author fields to prompts table
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS author_name TEXT;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS linkedin_url TEXT;

-- Create an index for faster leaderboard queries
CREATE INDEX IF NOT EXISTS idx_prompts_author ON prompts(author_name);
```

## 2. Type Updates
Update `src/types/index.ts` to include author fields in the `Prompt` interface.

## 3. New Components
- **Leaderboard**: A component to fetch and display top contributors.
- **SubmitForm Updates**: Add fields for Name, GitHub, and LinkedIn.

## 4. Submission Logic
Update the submission API to handle the new author fields.
