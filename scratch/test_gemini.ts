import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from 'fs';

async function test() {
  const envContent = fs.readFileSync('.env', 'utf-8');
  const apiKey = envContent.match(/GEMINI_API_KEY=(.*)/)?.[1];
  if (!apiKey) {
    console.log("No API key");
    return;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash"});
    const result = await model.generateContent("hello");
    console.log("Success with gemini-flash-latest", result.response.text());
  } catch(e: any) {
    console.log("Error with gemini-flash-latest:", e.message);
  }

  try {
    const model2 = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result2 = await model2.generateContent("hello");
    console.log("Success with gemini-1.5-flash", result2.response.text());
  } catch(e: any) {
    console.log("Error with gemini-1.5-flash:", e.message);
  }
}

test();
