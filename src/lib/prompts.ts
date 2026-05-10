import { Prompt } from '@/types'

// Static imports — no fs, works in server & client
import studyPrompts from '@/data/prompts/study.json'
import writingPrompts from '@/data/prompts/writing.json'
import codingPrompts from '@/data/prompts/coding.json'
import teachingPrompts from '@/data/prompts/teaching.json'
import businessPrompts from '@/data/prompts/business.json'
import reviewPrompts from '@/data/prompts/review.json'
import testingPrompts from '@/data/prompts/testing.json'
import linkedinPrompts from '@/data/prompts/linkedin.json'

// Synchronous export — client components use this directly for instant filtering
export const ALL_PROMPTS: Prompt[] = [
  ...studyPrompts,
  ...writingPrompts,
  ...codingPrompts,
  ...teachingPrompts,
  ...businessPrompts,
  ...reviewPrompts,
  ...testingPrompts,
  ...linkedinPrompts,
] as Prompt[]

export async function getAllPrompts(): Promise<Prompt[]> {
  return ALL_PROMPTS
}

export async function getByCategory(category: string): Promise<Prompt[]> {
  return ALL_PROMPTS.filter(p => p.category === category)
}

export async function getBySlug(slug: string): Promise<Prompt | null> {
  return ALL_PROMPTS.find(p => p.slug === slug) ?? null
}

export async function getPromptsByPlatform(platform: string): Promise<Prompt[]> {
  return ALL_PROMPTS.filter(p =>
    p.platforms.includes(platform as any) || p.platforms.includes('any')
  )
}

export async function getFeaturedPrompts(): Promise<Prompt[]> {
  return ALL_PROMPTS.filter(p => p.featured)
}

export async function searchPrompts(query: string): Promise<Prompt[]> {
  const q = query.toLowerCase()
  return ALL_PROMPTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(tag => tag.toLowerCase().includes(q)) ||
    p.prompt.toLowerCase().includes(q)
  )
}

export async function filterPrompts(options: {
  category?: string
  platform?: string
  difficulty?: string
  search?: string
}): Promise<Prompt[]> {
  let result = ALL_PROMPTS

  if (options.category) {
    result = result.filter(p => p.category === options.category)
  }
  if (options.platform) {
    result = result.filter(p =>
      p.platforms.includes(options.platform as any) || p.platforms.includes('any')
    )
  }
  if (options.difficulty) {
    result = result.filter(p => p.difficulty === options.difficulty)
  }
  if (options.search) {
    const q = options.search.toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(tag => tag.toLowerCase().includes(q)) ||
      p.prompt.toLowerCase().includes(q)
    )
  }

  return result
}