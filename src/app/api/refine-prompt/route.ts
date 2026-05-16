import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Refine API: Request received");
  
  try {
    const { basePrompt, userContext, targetPlatform, image } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Refine API Error: GEMINI_API_KEY is missing from environment variables");
      return new Response(JSON.stringify({ error: "API Key not configured" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const origin = req.headers.get("origin") || req.headers.get("referer") || "http://localhost:3000";
    console.log(`Refine API: Initializing Gemini model (gemini-2.5-flash) with referer: ${origin}`);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel(
      { model: "gemini-2.5-flash" }, 
      { customHeaders: { "Referer": origin } }
    );

    const platformInstructions: Record<string, string> = {
      claude: "OPTIMIZE FOR CLAUDE: Use XML tags (e.g., <system>, <context>, <task>) to structure the prompt. Claude responds best to clear hierarchical separation and deeply nested instructions within tags.",
      chatgpt: "OPTIMIZE FOR CHATGPT: Use strict Markdown headers (H1, H2) and clearly numbered constraints. Focus on a logical flow that ChatGPT can follow sequentially. Use bolding for emphasis on critical rules.",
      gemini: "OPTIMIZE FOR GEMINI: Use a clear 'Chain-of-Thought' structure. Explicitly tell Gemini to 'Think step-by-step' and provide a section for 'Internal Monologue' or 'Reasoning Path' to improve factual accuracy.",
      grok: "OPTIMIZE FOR GROK: Use a direct, punchy, and highly contextual style. Grok prefers straightforward instructions with clear boundaries. Avoid overly flowery language; be precise and authoritative.",
      any: "OPTIMIZE UNIVERSALLY: Use a balanced mix of Markdown and logical blocks that work across all major models (Claude, GPT, Gemini)."
    };

    const systemPrompt = `You are a Principal Prompt Architect specializing in Ultra-Dense, High-Performance LLM Instruction Sets.
Your mission is to evolve a "Base Template" into a "Master Architecture" using the provided "User Context."
${image ? `
[IMPORTANT: AN IMAGE HAS BEEN PROVIDED BY THE USER.]
Your job is NOT to describe the uploaded image, nor should you extract its lighting, setting, clothing, or pose.
Your job is to extract ONLY the permanent or semi-permanent physical characteristics of the person in the image, and use them to fill in and enrich the user's base prompt template.

Extract ONLY these signals from the image:
- Age and Gender
- Ethnicity and skin tone
- Hair color, length, and style
- Facial features (e.g. eye color, facial hair, distinct bone structure)
- Any distinctive permanent physical characteristics (e.g. freckles, glasses if they appear to be daily wear)

Rules for Image Enrichment:
1. Ignore the clothing, lighting, pose, and background of the image entirely. The base template dictates the style.
2. Never rewrite or change the core SUBJECT or intent of the base template.
3. Output ONLY the final enriched prompt — no explanation, no breakdown, no preamble.
` : ""}
TARGET PLATFORM ARCHITECTURE:
${platformInstructions[targetPlatform || 'any']}

CRITICAL ARCHITECTURAL CONSTRAINTS:
1. **Analyze First**: Evaluate if the provided User Context (and image, if provided) contains enough specific information to create an ultra-dense, highly effective prompt.
2. **Question Mode (If info is missing)**: If crucial details are missing that would make the prompt significantly better, DO NOT generate the prompt. Instead, output ONLY a list of clear questions for the user. Start with "### I need more information to tailor this perfectly:" and list your questions.
3. **Generation Mode (If info is sufficient)**: If you have enough info, generate the final prompt.
4. **Format Preservation**: DO NOT restructure the base template into a bulleted list, markdown headers, or complex sectioned architecture unless the base template is already structured that way. Keep it as a dense, continuous paragraph or follow the exact structural style of the base template.
5. **Raw Output Only**: Output ONLY the final, ready-to-paste prompt. DO NOT include any conversational text, explanations, or meta-commentary like "Here is your refined prompt" or "Master Architecture".
6. **Deep Injection**: Seamlessly weave the User Context (and image details) into the core logic of the base template. Just fill in the blanks (e.g. [age], [gender]) and expand on them with the dense signals you extracted.

Base Template for Evolution:
"""
${basePrompt}
"""

User Specific Context:
"""
${userContext || "No text context provided."}
"""

[OUTPUT ONLY THE FINAL RAW PROMPT BELOW]`;

    let stream: ReadableStream;

    try {
      console.log("Refine API: Generating stream with Gemini...");
      const parts: any[] = [{ text: systemPrompt }];
      
      if (image) {
        try {
          const base64Data = image.split(',')[1];
          const mimeType = image.split(',')[0].split(':')[1].split(';')[0];
          parts.push({
            inlineData: {
              data: base64Data,
              mimeType
            }
          });
          console.log(`Refine API: Added image context (${mimeType})`);
        } catch (e) {
          console.error("Refine API: Failed to parse image data", e);
        }
      }

      const result = await model.generateContentStream(parts);

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

      let groqMessages: any[] = [{ role: "user", content: systemPrompt }];
      let groqModel = "llama-3.3-70b-versatile";
      
      if (image) {
        // Groq decommissioned their vision models in this tier, so we must fall back to text-only processing
        // and notify the prompt architecture that image analysis was skipped.
        groqMessages = [{ 
          role: "user", 
          content: systemPrompt + "\n[NOTE: Image analysis failed during fallback. Inform the user that you couldn't process the image and ask them to describe it manually in the context.]" 
        }];
        console.log("Refine API: Groq fallback activated, but vision models are unsupported. Dropping image payload.");
      }

      console.log(`Refine API: Initializing Groq model (${groqModel}) as fallback`);

      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${grokKey}`
        },
        body: JSON.stringify({
          model: groqModel,
          messages: groqMessages,
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
