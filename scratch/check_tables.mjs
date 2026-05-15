import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listTables() {
    // This is a hacky way to guess tables or use the Supabase meta API if possible
    // But since I don't have the service key, I'll just try to select from 'profiles'
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    if (error) {
        console.log("'profiles' table does not exist or is not accessible.");
    } else {
        console.log("'profiles' table exists.");
    }

    const { data: promptsData, error: promptsError } = await supabase.from('prompts').select('*').limit(1);
    if (promptsData && promptsData[0]) {
        console.log("Prompts columns:", Object.keys(promptsData[0]));
    }
}

listTables();
