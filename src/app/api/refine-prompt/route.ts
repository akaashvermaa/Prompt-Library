import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Refine API: Request received");
  
  try {
    const { basePrompt, userContext } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Refine API Error: GEMINI_API_KEY is missing from environment variables");
      return new Response(JSON.stringify({ error: "API Key not configured" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    console.log("Refine API: Initializing Gemini model (gemini-flash-latest)");
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const systemPrompt = `You are an expert prompt engineer specializing in "dense" prompt architectures.
Your task is to take a "Base Prompt Template" and "User Context" and merge them into a highly professional, optimized, and tailored prompt.

CRITICAL RULES:
1. **Preserve, Don't Replace**: Do not build a new prompt from scratch. Retain the core logic, structural markers, and effective phrasing found in the Base Template.
2. **Deep Tailoring**: Inject the User Context into the Base Template to make it specific. If the user mentions a specific stack (e.g., Tailwind v4), ensure the refined prompt enforces those constraints.
3. **Strengthen**: Enhance the prompt's "density." Add deeper reasoning steps, better persona definitions, and more robust constraints that align with the user's goals.
4. **No Output Generation**: Do not answer the user's request. Write the final PROMPT that the user will copy and paste into an LLM.
5. **Universal Optimization**: Ensure the output is optimized for high-performance models like Claude 3.5 Sonnet, GPT-4o, or Gemini 1.5/2.0.

Structure the refined prompt using clear blocks (e.g., [ROLE], [CONTEXT], [TASK], [CONSTRAINTS], [OUTPUT_FORMAT]).

Base Template:
"""
${basePrompt}
"""

User Context:
"""
${userContext}
"""

Final Tailored Prompt:`;

    console.log("Refine API: Generating stream...");
    const result = await model.generateContentStream(systemPrompt);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err: any) {
          console.error("Refine API: Streaming error:", err.message || err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error: any) {
    console.error("Refinement API Error:", error.message || error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
