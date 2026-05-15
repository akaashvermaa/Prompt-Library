import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkColumns() {
    const { data, error } = await supabase.from('prompts').select('*').limit(1);
    if (error) {
        console.error(error);
        return;
    }
    if (data && data[0]) {
        console.log("Keys in 'prompts' table:", Object.keys(data[0]));
        console.log("First row:", data[0]);
    } else {
        console.log("No data found in 'prompts'");
    }
}

checkColumns();
