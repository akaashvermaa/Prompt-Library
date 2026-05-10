export interface Prompt {
  id: string
  slug: string
  title: string
  description: string       // 1-line summary
  prompt: string            // The full detailed prompt
  category: string          // "study" | "coding" | etc.
  platforms: Platform[]     // ["chatgpt", "claude", "gemini"]
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