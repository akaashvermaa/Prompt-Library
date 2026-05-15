import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tgfefjlpvbjjbgbmbhmy.supabase.co';
const supabaseAnonKey = 'sb_publishable_6K1WuIxeLF_7NcnUhDJ3Lw_vLvmBbx2';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listTables() {
    const { data: promptsData, error: promptsError } = await supabase.from('prompts').select('*').limit(1);
    if (promptsData && promptsData[0]) {
        console.log("Prompts columns:", Object.keys(promptsData[0]));
    } else {
        console.log("Prompts table error or empty:", promptsError);
    }

    const { data: profilesData, error: profilesError } = await supabase.from('profiles').select('*').limit(1);
    if (profilesData) {
        console.log("Profiles columns:", Object.keys(profilesData[0] || {}));
    } else {
        console.log("Profiles table error:", profilesError);
    }
}

listTables();
