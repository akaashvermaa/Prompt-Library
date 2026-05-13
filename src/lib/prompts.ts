import { Prompt } from '@/types'
import { supabase } from '@/lib/supabase'

export async function getAllPrompts(): Promise<Prompt[]> {
  const { data, error } = await supabase.from('prompts').select('*');
  if (error) {
    console.error('Supabase fetch error:', error);
    return [];
  }
  return data.map(mapDbToPrompt);
}

export async function getByCategory(category: string): Promise<Prompt[]> {
  const { data, error } = await supabase.from('prompts').select('*').eq('category', category);
  if (error) return [];
  return data.map(mapDbToPrompt);
}

export async function getBySlug(slug: string): Promise<Prompt | null> {
  const { data, error } = await supabase.from('prompts').select('*').eq('slug', slug).single();
  if (error || !data) return null;
  return mapDbToPrompt(data);
}

export async function getPromptsByPlatform(platform: string): Promise<Prompt[]> {
  // Use contains to search within the text array
  let query = supabase.from('prompts').select('*');
  
  if (platform === 'claude') {
    query = query.contains('platforms', ['claude']);
  } else {
    // Supabase filtering for array OR logic can be tricky, 
    // but we can fetch all and filter or use an overlaps operator.
    query = query.overlaps('platforms', [platform, 'any']);
  }
  
  const { data, error } = await query;
  if (error) return [];
  return data.map(mapDbToPrompt);
}

export async function getFeaturedPrompts(): Promise<Prompt[]> {
  const { data, error } = await supabase.from('prompts').select('*').eq('featured', true);
  if (error) return [];
  return data.map(mapDbToPrompt);
}

export async function searchPrompts(query: string): Promise<Prompt[]> {
  const q = query.toLowerCase();
  // Fetch all for now and filter. 
  // In a large app, you'd use Supabase full-text search (fts)
  const all = await getAllPrompts();
  return all.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(tag => tag.toLowerCase().includes(q)) ||
    p.prompt.toLowerCase().includes(q)
  );
}

export async function filterPrompts(options: {
  category?: string
  platform?: string
  difficulty?: string
  search?: string
}): Promise<Prompt[]> {
  let result = await getAllPrompts();

  if (options.category) {
    result = result.filter(p => p.category === options.category);
  }
  if (options.platform) {
    if (options.platform === 'claude') {
      result = result.filter(p => p.platforms.includes('claude' as any));
    } else {
      result = result.filter(p =>
        p.platforms.includes(options.platform as any) || p.platforms.includes('any')
      );
    }
  }
  if (options.difficulty) {
    result = result.filter(p => p.difficulty === options.difficulty);
  }
  if (options.search) {
    const q = options.search.toLowerCase();
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(tag => tag.toLowerCase().includes(q)) ||
      p.prompt.toLowerCase().includes(q)
    );
  }

  return result;
}

// Helper to map DB columns (image_platforms) to app models (imagePlatforms)
function mapDbToPrompt(row: any): Prompt {
  return {
    ...row,
    imagePlatforms: row.image_platforms,
  };
}