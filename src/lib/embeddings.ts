import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateEmbedding(text: string): Promise<number[]> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  
  // Clean text to avoid issues with special characters or excessive length
  const cleanText = text.replace(/\n/g, " ").substring(0, 8000);
  
  const result = await model.embedContent(cleanText);
  return result.embedding.values;
}
