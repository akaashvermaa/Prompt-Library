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

    const systemPrompt = `You are a Principal Prompt Architect specializing in Ultra-Dense, High-Performance LLM Instruction Sets.
Your mission is to evolve a "Base Template" into a "Master Architecture" using the provided "User Context."

CRITICAL ARCHITECTURAL CONSTRAINTS:
1. **Ultra-Density**: Do not use fluff. Every word must serve a functional purpose. Use technical, precise language.
2. **Structural Integrity**: Organize the final prompt into a strict, logical hierarchy (e.g., [ROLE_MANIFESTO], [KNOWLEDGE_BOUNDARIES], [OPERATIONAL_PHASES], [RESPONSE_SCHEMA]).
3. **Deep Injection**: Seamlessly weave the User Context into the very core of the logic. If they mention a technology (e.g., Next.js), the prompt should not just mention it, but enforce its best practices, latest versions, and architectural patterns.
4. **Agentic Reasoning**: Force the LLM to use internal monologue, chain-of-thought, or multi-step verification before outputting.
5. **No Filler**: Do not apologize, do not explain your changes, and do not generate a sample output. Output ONLY the final refined PROMPT.
6. **Model Agnostic Power**: The prompt must be optimized for the absolute best models (Claude 3.5 Sonnet, GPT-4o, O1, Gemini 1.5 Pro).

Base Template for Evolution:
"""
${basePrompt}
"""

User Specific Context:
"""
${userContext}
"""

Final Refined Master Architecture:`;

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
