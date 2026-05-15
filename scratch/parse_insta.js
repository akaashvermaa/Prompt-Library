const fs = require('fs');

const raw = fs.readFileSync('scratch/insta_raw.txt', 'utf8');

const ordinals = [
  "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth",
  "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth", "twentieth",
  "twenty-first", "twenty-second", "twenty-third", "twenty-fourth", "twenty-fifth", "twenty-sixth", "twenty-seventh", "twenty-eighth", "twenty-ninth", "thirtieth",
  "thirty-first", "thirty-second", "thirty-third", "thirty-fourth", "thirty-fifth", "thirty-sixth", "thirty-seventh", "thirty-eighth", "thirty-nine", "fortieth",
  "forty-first", "forty-second", "forty-third", "forty-fourth", "forty-fifth", "forty-sixth", "forty-seventh", "forty-eighth", "forty-ninth", "fiftieth"
];

const prompts = [];

for (let i = 0; i < ordinals.length; i++) {
  const currentOrdinal = ordinals[i];
  const rx = new RegExp('The ' + currentOrdinal + ' (?:[a-z\\-]+ )?prompt', 'i');
  
  const match = rx.exec(raw);
  
  if (match) {
    const startIndex = match.index;
    let endIndex = raw.length;
    
    // Find next
    if (i < ordinals.length - 1) {
      const nextOrdinal = ordinals[i + 1];
      const nextRx = new RegExp('The ' + nextOrdinal + ' (?:[a-z\\-]+ )?prompt', 'i');
      const nextMatch = nextRx.exec(raw.substring(startIndex + 10));
      if (nextMatch) {
        endIndex = startIndex + 10 + nextMatch.index;
      }
    }
    
    let promptBlock = raw.substring(startIndex, endIndex).trim();
    
    let firstSentenceEnd = promptBlock.indexOf('.');
    let title = "Instagram Strategy " + (i + 1);
    if (firstSentenceEnd !== -1) {
       title = promptBlock.substring(0, firstSentenceEnd).replace(/^The [a-z\-]+ (?:[a-z\-]+ )?prompt (is|focuses on|addresses|revolves around|acts as|governs|executes|dictates|captures|caters to|engineers|targets|defines|visualizes|illustrates|resurrects|creates|synthesizes|utilizes)/i, '').trim();
       if (title.length > 60) title = title.substring(0, 57) + "...";
       title = title.charAt(0).toUpperCase() + title.slice(1);
    }
    
    let desc = promptBlock.substring(0, 100).replace(/\n/g, ' ') + "...";
    let slugBase = title.replace(/[^a-zA-Z0-9 ]/g, '').trim().split(/\s+/).slice(0, 5).join('-').toLowerCase();

    prompts.push({
      id: `insta-20${String(i + 1).padStart(2, '0')}`,
      slug: `insta-${slugBase}-${i+1}`,
      title: title.replace(/"/g, ''),
      description: desc,
      prompt: "Instagram Strategy Framework:\n\n" + promptBlock,
      category: "instagram",
      platforms: ["instagram"],
      tags: ["instagram", "strategy", "social-media"],
      difficulty: "intermediate",
      featured: false,
      estimatedTime: "10 min",
      variables: [],
      exampleOutput: "",
      updatedAt: "2026-05",
      copyCount: 0,
      relatedPrompts: []
    });
  }
}

let existing = [];
try {
  existing = JSON.parse(fs.readFileSync('newjson/instagram.json', 'utf8'));
  // Filter out the old 49 we just added to prevent duplicates!
  existing = existing.filter(p => !p.id.startsWith('insta-20'));
} catch (e) {
  console.log("Error loading existing instagram.json");
}

const merged = [...existing, ...prompts];
fs.writeFileSync('newjson/instagram.json', JSON.stringify(merged, null, 2));
console.log(`Parsed exactly ${prompts.length} instagram prompts. Total in file is ${merged.length}.`);
