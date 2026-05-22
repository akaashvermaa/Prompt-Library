import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const geminiKey = process.env.GEMINI_API_KEY || '';

if (!supabaseServiceKey) {
  console.error("Error: SUPABASE_SERVICE_ROLE_KEY is missing from .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const genAI = new GoogleGenerativeAI(geminiKey);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

async function backfill() {
  console.log("Fetching prompts without embeddings...");
  
  const { data: prompts, error } = await supabase
    .from('prompts')
    .select('id, title, description, prompt, tags')
    .is('embedding', null);

  if (error) {
    console.error("Error fetching prompts:", error);
    return;
  }

  console.log(`Found ${prompts?.length || 0} prompts to process.`);

  for (const p of prompts || []) {
    try {
      // Combine metadata for a rich embedding
      const textToEmbed = `Title: ${p.title}\nDescription: ${p.description}\nTags: ${p.tags.join(', ')}\nContent: ${p.prompt}`;
      
      console.log(`Generating embedding for: ${p.title}`);
      const result = await embeddingModel.embedContent(textToEmbed.replace(/\n/g, " "));
      const embedding = result.embedding.values;

      const { error: updateError } = await supabase
        .from('prompts')
        .update({ embedding })
        .eq('id', p.id);

      if (updateError) {
        console.error(`Error updating prompt ${p.id}:`, updateError);
      } else {
        console.log(`Updated ${p.title}`);
      }
    } catch (e) {
      console.error(`Failed to process ${p.title}:`, e);
    }
  }

  console.log("Backfill complete.");
}

backfill();
