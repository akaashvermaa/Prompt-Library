import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Refine API: Request received");
  
  try {
    const { basePrompt, userContext, targetPlatform } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Refine API Error: GEMINI_API_KEY is missing from environment variables");
      return new Response(JSON.stringify({ error: "API Key not configured" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    console.log("Refine API: Initializing Gemini model (gemini-2.5-flash)");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const platformInstructions: Record<string, string> = {
      claude: "OPTIMIZE FOR CLAUDE: Use XML tags (e.g., <system>, <context>, <task>) to structure the prompt. Claude responds best to clear hierarchical separation and deeply nested instructions within tags.",
      chatgpt: "OPTIMIZE FOR CHATGPT: Use strict Markdown headers (H1, H2) and clearly numbered constraints. Focus on a logical flow that ChatGPT can follow sequentially. Use bolding for emphasis on critical rules.",
      gemini: "OPTIMIZE FOR GEMINI: Use a clear 'Chain-of-Thought' structure. Explicitly tell Gemini to 'Think step-by-step' and provide a section for 'Internal Monologue' or 'Reasoning Path' to improve factual accuracy.",
      grok: "OPTIMIZE FOR GROK: Use a direct, punchy, and highly contextual style. Grok prefers straightforward instructions with clear boundaries. Avoid overly flowery language; be precise and authoritative.",
      any: "OPTIMIZE UNIVERSALLY: Use a balanced mix of Markdown and logical blocks that work across all major models (Claude, GPT, Gemini)."
    };

    const systemPrompt = `You are a Principal Prompt Architect specializing in Ultra-Dense, High-Performance LLM Instruction Sets.
Your mission is to evolve a "Base Template" into a "Master Architecture" using the provided "User Context."

TARGET PLATFORM ARCHITECTURE:
${platformInstructions[targetPlatform || 'any']}

CRITICAL ARCHITECTURAL CONSTRAINTS:
1. **Ultra-Density**: Do not use fluff. Every word must serve a functional purpose. Use technical, precise language.
2. **Structural Integrity**: Organize the final prompt into a strict, logical hierarchy appropriate for the target platform.
3. **Deep Injection**: Seamlessly weave the User Context into the very core of the logic.
4. **Agentic Reasoning**: Force the LLM to use internal monologue, chain-of-thought, or multi-step verification.
5. **No Filler**: Output ONLY the final refined PROMPT.
6. **Platform Fidelity**: Strictly follow the formatting preferences for ${targetPlatform || 'the target model'}.

Base Template for Evolution:
"""
${basePrompt}
"""

User Specific Context:
"""
${userContext}
"""

Final Refined Master Architecture [${targetPlatform || 'Universal'}]:`;

    let stream: ReadableStream;

    try {
      console.log("Refine API: Generating stream with Gemini...");
      const result = await model.generateContentStream(systemPrompt);

      stream = new ReadableStream({
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
            console.error("Refine API: Gemini Streaming error:", err.message || err);
            controller.error(err);
          } finally {
            controller.close();
          }
        },
      });
    } catch (geminiError: any) {
      console.error("Refine API: Gemini generation failed. Falling back to Groq...", geminiError.message || geminiError);
      
      const grokKey = process.env.GROK_API_KEY;
      if (!grokKey) {
        throw new Error("Gemini failed and GROK_API_KEY is not configured for fallback.");
      }

      console.log("Refine API: Initializing Groq model (llama-3.3-70b-versatile) as fallback");
      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${grokKey}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: systemPrompt }],
          stream: true
        })
      });

      if (!groqResponse.ok) {
        const errorText = await groqResponse.text();
        throw new Error(`Groq fallback failed: ${groqResponse.status} ${groqResponse.statusText} - ${errorText}`);
      }

      stream = new ReadableStream({
        async start(controller) {
          const reader = groqResponse.body?.getReader();
          const decoder = new TextDecoder();
          const encoder = new TextEncoder();
          if (!reader) {
            controller.close();
            return;
          }
          try {
            let buffer = "";
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() || "";
              for (const line of lines) {
                if (line.startsWith('data: ') && line.trim() !== 'data: [DONE]') {
                  try {
                    const data = JSON.parse(line.slice(6));
                    const text = data.choices[0]?.delta?.content;
                    if (text) {
                      controller.enqueue(encoder.encode(text));
                    }
                  } catch (e) {
                    // Ignore parse errors on partial chunks
                  }
                }
              }
            }
          } catch (err: any) {
            console.error("Refine API: Groq Streaming error:", err.message || err);
            controller.error(err);
          } finally {
            controller.close();
          }
        }
      });
    }

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
