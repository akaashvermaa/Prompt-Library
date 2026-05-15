import { GoogleGenerativeAI } from "@google/generative-ai";

async function testModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("No API Key found");
    return;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const models = ["gemini-pro-latest", "gemini-flash-latest", "gemini-1.5-flash-8b", "gemini-2.0-flash-exp"];

  for (const m of models) {
    console.log(`Testing ${m}...`);
    try {
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Say 'Ready'");
      console.log(`Success with ${m}:`, result.response.text());
      break;
    } catch (e) {
      console.log(`Failed with ${m}:`, e.message);
    }
  }
}

testModel();
