import { Prompt } from '@/types'
import fs from 'fs'
import path from 'path'

const promptsDirectory = path.join(process.cwd(), 'data/prompts')

export async function getAllPrompts(): Promise<Prompt[]> {
  const promptFiles = fs.readdirSync(promptsDirectory)
  const allPrompts: Prompt[] = []

  for (const file of promptFiles) {
    if (file.endsWith('.json')) {
      const filePath = path.join(promptsDirectory, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const prompts = JSON.parse(fileContent) as Prompt[]
      allPrompts.push(...prompts)
    }
  }

  return allPrompts
}

export async function getByCategory(category: string): Promise<Prompt[]> {
  const allPrompts = await getAllPrompts()
  return allPrompts.filter(prompt => prompt.category === category)
}

export async function getBySlug(slug: string): Promise<Prompt | null> {
  const allPrompts = await getAllPrompts()
  return allPrompts.find(prompt => prompt.slug === slug) || null
}

export async function getPromptsByPlatform(platform: string): Promise<Prompt[]> {
  const allPrompts = await getAllPrompts()
  return allPrompts.filter(prompt =>
    prompt.platforms.includes(platform as any) ||
    prompt.platforms.includes('any')
  )
}

export async function getFeaturedPrompts(): Promise<Prompt[]> {
  const allPrompts = await getAllPrompts()
  return allPrompts.filter(prompt => prompt.featured)
}

export async function searchPrompts(query: string): Promise<Prompt[]> {
  const allPrompts = await getAllPrompts()
  const lowercaseQuery = query.toLowerCase()

  return allPrompts.filter(prompt =>
    prompt.title.toLowerCase().includes(lowercaseQuery) ||
    prompt.description.toLowerCase().includes(lowercaseQuery) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    prompt.prompt.toLowerCase().includes(lowercaseQuery)
  )
}

export async function filterPrompts(options: {
  category?: string
  platform?: string
  difficulty?: string
  search?: string
}): Promise<Prompt[]> {
  let filteredPrompts = await getAllPrompts()

  // Apply category filter
  if (options.category) {
    filteredPrompts = filteredPrompts.filter(prompt => prompt.category === options.category)
  }

  // Apply platform filter
  if (options.platform) {
    filteredPrompts = filteredPrompts.filter(prompt =>
      prompt.platforms.includes(options.platform as any) ||
      prompt.platforms.includes('any')
    )
  }

  // Apply difficulty filter
  if (options.difficulty) {
    filteredPrompts = filteredPrompts.filter(prompt => prompt.difficulty === options.difficulty)
  }

  // Apply search filter
  if (options.search) {
    const lowercaseQuery = options.search.toLowerCase()
    filteredPrompts = filteredPrompts.filter(prompt =>
      prompt.title.toLowerCase().includes(lowercaseQuery) ||
      prompt.description.toLowerCase().includes(lowercaseQuery) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      prompt.prompt.toLowerCase().includes(lowercaseQuery)
    )
  }

  return filteredPrompts
}