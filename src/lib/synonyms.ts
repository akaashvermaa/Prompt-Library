export const SYNONYM_MAP: Record<string, string[]> = {
  // Image prompts
  image: ["photo", "picture", "dp", "pf", "pfp", "portrait", "headshot", "wallpaper", "thumbnail", "avatar"],
  photo: ["image", "picture", "dp", "pf", "pfp"],
  
  // LinkedIn
  linkedin: ["pf", "profile", "professional", "bio", "connection", "networking"],
  
  // Code
  code: ["programming", "developer", "script", "function", "api", "bug", "debug"],
  
  // Essay / Writing
  essay: ["write", "writing", "article", "blog", "content", "paragraph", "draft"],
  
  // Add more as you grow...
};

export function expandQuery(query: string): string {
  const words = query.toLowerCase().trim().split(/\s+/);
  const expanded = new Set<string>(words);
  
  words.forEach(word => {
    // Direct match
    if (SYNONYM_MAP[word]) {
      SYNONYM_MAP[word].forEach(s => expanded.add(s));
    }
    // Reverse match (if user types "dp", find that it maps to "image")
    Object.entries(SYNONYM_MAP).forEach(([key, synonyms]) => {
      if (synonyms.includes(word)) {
        expanded.add(key);
        SYNONYM_MAP[key].forEach(s => expanded.add(s));
      }
    });
  });
  
  return Array.from(expanded).join(' | '); // Postgres OR query
}
