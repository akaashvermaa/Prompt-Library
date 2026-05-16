import * as fs from 'fs';

async function testGrok() {
  const envContent = fs.readFileSync('.env', 'utf-8');
  const grokKey = envContent.match(/GROK_API_KEY=(.*)/)?.[1]?.trim();
  
  if (!grokKey) {
    console.log("No Grok Key");
    return;
  }
  
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${grokKey}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: "Say hello!" }],
      stream: true
    })
  });
  
  console.log("Status:", response.status, response.statusText);
  if (!response.ok) {
    console.log(await response.text());
    return;
  }
  
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  if (reader) {
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || "";
      for (const line of lines) {
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          try {
            const data = JSON.parse(line.slice(6));
            process.stdout.write(data.choices[0]?.delta?.content || "");
          } catch(e) {}
        }
      }
    }
    console.log("\nDone");
  }
}

testGrok();
