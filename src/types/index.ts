export interface Prompt {
  id: string
  slug: string
  title: string
  description: string       // 1-line summary
  prompt: string            // The full detailed prompt
  category: string          // "study-learn" | "write-create" | "code-dev" | "career-brand" | "business-marketing" | "review-test" | "image" | "teaching" | "testing" | "ai-agents"
  platforms: Platform[]     // ["chatgpt", "claude", "gemini"]
  imagePlatforms?: string[] // For image prompts: where to paste the prompt
  tags: string[]            // ["summarization", "beginner", etc.]
  difficulty: "beginner" | "intermediate" | "advanced"
  featured: boolean
  estimatedTime: string     // e.g. "5 min"
  variables: string[]       // extracted placeholders
  exampleOutput: string     // sample result
  updatedAt: string         // e.g. "2026-05"
  copyCount: number         // engagement metric
  relatedPrompts: string[]  // cross-linking array
  authorName?: string
  githubUrl?: string
  linkedinUrl?: string
}

export interface Category {
  id: string
  slug: string
  label: string
  description: string
  count: number
}

export type Platform = "chatgpt" | "claude" | "gemini" | "grok" | "any"