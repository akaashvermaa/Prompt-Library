import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials! Make sure .env is loaded.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const promptsDir = path.join(__dirname, 'newjson');

async function migrate() {
  const files = fs.readdirSync(promptsDir);
  let totalInserted = 0;

  for (const file of files) {
    if (file === 'categories.json' || !file.endsWith('.json')) continue;
    
    console.log(`⏳ Processing ${file}...`);
    const filePath = path.join(promptsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const prompts = JSON.parse(content);
    
    const formattedPrompts = prompts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      prompt: p.prompt,
      category: p.category,
      platforms: p.platforms || [],
      image_platforms: p.imagePlatforms || [],
      tags: p.tags || [],
      difficulty: p.difficulty || 'beginner',
      featured: p.featured || false,
      estimated_time: p.estimatedTime || '5 min',
      variables: p.variables || [],
      example_output: p.exampleOutput || '',
      updated_at_str: p.updatedAt || '2026-05',
      copy_count: p.copyCount || 0,
      related_prompts: p.relatedPrompts || []
    }));

    // Upsert into Supabase
    const { data, error } = await supabase.from('prompts').upsert(formattedPrompts, { onConflict: 'slug' });
    
    if (error) {
      console.error(`❌ Error inserting from ${file}:`, error);
    } else {
      console.log(`✅ Successfully inserted ${formattedPrompts.length} prompts from ${file}`);
      totalInserted += formattedPrompts.length;
    }
  }
  
  console.log(`\n🎉 Migration complete! Total prompts migrated: ${totalInserted}`);
}

migrate();
