import { expandQuery } from './synonyms';
import { supabase } from './supabase';

const CATEGORIES = ['image-prompts', 'code-dev', 'write-create', 'career-brand', 'business-marketing', 'review-test', 'study-learn', 'image', 'code', 'essay', 'linkedin', 'email', 'video', 'social'];

export async function searchPrompts(rawQuery: string) {
  const expandedQuery = expandQuery(rawQuery);
  
  // Detect if query maps to a known category
  const matchedCategory = CATEGORIES.find(cat => 
    expandedQuery.toLowerCase().includes(cat)
  );

  // Full text search with expanded terms
  const { data, error } = await supabase
    .rpc('search_prompts', { 
      query_text: expandedQuery,
      category_boost: matchedCategory || null
    });

  if (error) {
    console.error('Search error:', error);
    return [];
  }

  return data.map((row: any) => ({
    ...row,
    imagePlatforms: row.image_platforms,
  }));
}
