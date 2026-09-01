import { Prompt } from '@/types'
import { supabase } from '@/lib/supabase'
import Fuse from 'fuse.js'
import { generateEmbedding } from './embeddings'

export async function getAllPrompts(): Promise<Prompt[]> {
  const { data, error } = await supabase.from('prompts').select('*');
  if (error) {
    console.error('Supabase fetch error:', error);
    return [];
  }
  return sortPromptsByCredibility(data.map(mapDbToPrompt));
}

export async function getByCategory(category: string): Promise<Prompt[]> {
  const { data, error } = await supabase.from('prompts').select('*').eq('category', category);
  if (error) return [];
  return sortPromptsByCredibility(data.map(mapDbToPrompt));
}

export async function getBySlug(slug: string): Promise<Prompt | null> {
  const { data, error } = await supabase.from('prompts').select('*').eq('slug', slug).single();
  if (error || !data) return null;
  return mapDbToPrompt(data);
}

export async function getPromptsByIds(ids: string[]): Promise<Prompt[]> {
  if (!ids || ids.length === 0) return [];
  const { data, error } = await supabase.from('prompts').select('*').in('id', ids);
  if (error) return [];
  return data.map(mapDbToPrompt);
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
  return sortPromptsByCredibility(data.map(mapDbToPrompt));
}

export async function getFeaturedPrompts(): Promise<Prompt[]> {
  const { data, error } = await supabase.from('prompts').select('*').eq('featured', true);
  if (error) return [];
  return sortPromptsByCredibility(data.map(mapDbToPrompt));
}

export async function searchPrompts(query: string): Promise<Prompt[]> {
  if (!query) return getAllPrompts();

  // Try semantic search first for rich queries
  if (query.split(' ').length > 3) {
    try {
      return await semanticSearchPrompts(query);
    } catch (e) {
      console.error("Semantic search failed, falling back to Fuse:", e);
    }
  }

  const all = await getAllPrompts();
  const fuse = new Fuse(all, {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'tags', weight: 0.3 },
      { name: 'description', weight: 0.2 },
      { name: 'prompt', weight: 0.1 }
    ],
    threshold: 0.4,
    includeScore: true
  });

  const results = fuse.search(query);
  // If we have fuzzy results, we use them. Fuse already sorts by score.
  return results.map(r => r.item);
}

export async function semanticSearchPrompts(query: string, options?: {
  category?: string;
  platform?: string;
  difficulty?: string;
}): Promise<Prompt[]> {
  const embedding = await generateEmbedding(query);
  
  const { data, error } = await supabase.rpc('match_prompts', {
    query_embedding: embedding,
    match_threshold: 0.4, // Slightly lower threshold for semantic matches
    match_count: 15,
    filter_category: options?.category || null,
    filter_platform: options?.platform || null,
    filter_difficulty: options?.difficulty || null
  });

  if (error) {
    console.error('Semantic search RPC error:', error);
    throw error;
  }

  return (data as any[]).map(mapDbToPrompt);
}

export async function filterPrompts(options: {
  category?: string
  platform?: string
  difficulty?: string
  search?: string
}): Promise<Prompt[]> {
  // Try semantic search first if search term is descriptive
  if (options.search && options.search.split(' ').length > 2) {
    try {
      return await semanticSearchPrompts(options.search, options);
    } catch (e) {
      console.error("Semantic filter failed, falling back to local:", e);
    }
  }

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
    const fuse = new Fuse(result, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'tags', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'prompt', weight: 0.1 }
      ],
      threshold: 0.4
    });
    result = fuse.search(options.search).map(r => r.item);
    return result;
  }

  return sortPromptsByCredibility(result);
}

// Helper to map DB columns (image_platforms) to app models (imagePlatforms)
function mapDbToPrompt(row: any): Prompt {
  return {
    ...row,
    imagePlatforms: row.image_platforms,
    estimatedTime: row.estimated_time || '5 min',
    exampleOutput: row.example_output || '',
    updatedAt: row.updated_at_str || '2026-05',
    copyCount: row.copy_count || 0,
    relatedPrompts: row.related_prompts || [],
    variables: row.variables || [],
    authorName: row.author_name,
    githubUrl: row.github_url,
    linkedinUrl: row.linkedin_url,
  };
}

export async function getLeaderboard() {
  const { data, error } = await supabase
    .from('prompts')
    .select('author_name, github_url, linkedin_url, featured')
    .not('author_name', 'is', null);

  if (error) return [];

  const authors: Record<string, any> = {};
  
  data.forEach(p => {
    if (!authors[p.author_name]) {
      authors[p.author_name] = {
        name: p.author_name,
        github: p.github_url,
        linkedin: p.linkedin_url,
        count: 0,
        quality: 0
      };
    }
    authors[p.author_name].count += 1;
    if (p.featured) authors[p.author_name].quality += 1;
  });

  return Object.values(authors).sort((a, b) => b.count - a.count);
}

// Sorts prompts by credibility and simulated usage metrics
function sortPromptsByCredibility(prompts: Prompt[]): Prompt[] {
  return prompts.sort((a, b) => {
    // 1. Featured prompts represent the highest credibility
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // 2. Proxies for "usage" and versatility: Number of supported platforms
    const aPlatformCount = a.platforms.length + (a.imagePlatforms?.length || 0);
    const bPlatformCount = b.platforms.length + (b.imagePlatforms?.length || 0);
    if (aPlatformCount !== bPlatformCount) {
      return bPlatformCount - aPlatformCount; // Higher count first
    }
    
    // 3. Proxies for "hotness": Broadest usability (Beginner > Intermediate > Advanced)
    const difficultyScore = { beginner: 3, intermediate: 2, advanced: 1 };
    const aDiff = difficultyScore[a.difficulty] || 0;
    const bDiff = difficultyScore[b.difficulty] || 0;
    if (aDiff !== bDiff) {
      return bDiff - aDiff;
    }
    
    // 4. Fallback deterministic sort by title
    return a.title.localeCompare(b.title);
  });
}