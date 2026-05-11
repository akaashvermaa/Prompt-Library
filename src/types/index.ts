export interface Prompt {
  id: string
  slug: string
  title: string
  description: string       // 1-line summary
  prompt: string            // The full detailed prompt
  category: string          // "study-learn" | "write-create" | "code-dev" | "career-brand" | "business-marketing" | "review-test" | "image" | "teaching" | "testing"
  platforms: Platform[]     // ["chatgpt", "claude", "gemini"]
  imagePlatforms?: Platform[] // For image prompts: where to paste the prompt
  tags: string[]            // ["summarization", "beginner", etc.]
  difficulty: "beginner" | "intermediate" | "advanced"
  featured: boolean
}

export interface Category {
  id: string
  slug: string
  label: string
  description: string
  icon: string              // emoji or lucide icon name
  count: number
}

export type Platform = "chatgpt" | "claude" | "gemini" | "grok" | "any"