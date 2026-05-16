"use client";
import { useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { CopyButton } from "./CopyButton";
import { Sparkles, ChevronRight, Save, Check, Wand2, Image as ImageIcon, Trash2 } from "lucide-react";
import { Prompt } from "@/types";

type TargetPlatform = "claude" | "chatgpt" | "gemini" | "grok" | "any";

export function TailorAgent({ prompt }: { prompt: Prompt }) {
  const { user } = useAuth();
  const [context, setContext] = useState("");
  const [targetPlatform, setTargetPlatform] = useState<TargetPlatform>("any");
  const [isRefining, setIsRefining] = useState(false);
  const [refinedOutput, setRefinedOutput] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRefine = async () => {
    if (!context.trim() && !imageBase64) return;
    setIsRefining(true);
    setRefinedOutput("");
    try {
      const response = await fetch("/api/refine-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          basePrompt: prompt.prompt,
          userContext: context,
          promptId: prompt.id,
          targetPlatform,
          image: imageBase64
        }),
      });
      if (!response.ok) throw new Error("Failed to refine prompt");
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          setRefinedOutput(prev => prev + decoder.decode(value));
          if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      }
    } catch (error) {
      console.error("Refinement error:", error);
      setRefinedOutput("Error: Failed to refine prompt. Please try again.");
    } finally {
      setIsRefining(false);
    }
  };

  const handleSaveToVault = async () => {
    if (!user || !refinedOutput || isSaved) return;
    try {
      const { error } = await supabase.from("user_custom_prompts").insert({
        user_id: user.id,
        base_prompt_id: prompt.id,
        original_context: context,
        generated_prompt: refinedOutput
      });
      if (error) throw error;
      setIsSaved(true);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  if (!user) return null;

  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: '12px', background: '#0a0a0b', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '28px 36px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--amber)', marginBottom: '10px' }}>
          <Wand2 size={15} className="sparkle-anim" />
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Tailor Agent</span>
        </div>
        <h3 style={{ fontSize: '22px', fontFamily: '"Instrument Serif", serif', lineHeight: 1.1, marginBottom: '6px' }}>
          Refine <span className="it">{prompt.title}</span>
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '600px' }}>
          Upload a reference photo or describe your requirements. The agent injects your details directly into the base prompt.
        </p>
      </div>

      {/* Two-column body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', alignItems: 'start' }}>
        {/* Left: Inputs */}
        <div style={{ padding: '32px 36px', borderRight: '1px solid var(--line)' }}>
          {/* Platform selector */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Target Platform</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(["any", "claude", "chatgpt", "gemini", "grok"] as TargetPlatform[]).map(p => (
                <button
                  key={p}
                  onClick={() => setTargetPlatform(p)}
                  className={`ftab ${targetPlatform === p ? 'active' : ''}`}
                  style={{ padding: '6px 14px', fontSize: '12px', textTransform: 'capitalize' }}
                >
                  {p === "any" ? "General" : p === "chatgpt" ? "ChatGPT" : p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Context input */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Your Context</label>
              {!imageBase64 ? (
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--muted)', cursor: 'pointer', opacity: isRefining ? 0.5 : 1, pointerEvents: isRefining ? 'none' : 'auto' }}>
                  <ImageIcon size={13} /> Attach Photo
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={isRefining} />
                </label>
              ) : (
                <button onClick={() => setImageBase64(null)} disabled={isRefining} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer', opacity: isRefining ? 0.5 : 1 }}>
                  <Trash2 size={13} /> Remove
                </button>
              )}
            </div>

            {imageBase64 && (
              <div style={{ marginBottom: '12px' }}>
                <img src={imageBase64} alt="Reference" style={{ maxHeight: '90px', borderRadius: '6px', border: '1px solid var(--line)' }} />
              </div>
            )}

            <textarea
              className="refine-textarea"
              placeholder={imageBase64 ? "Add extra notes about the photo..." : "Describe your project, style, or requirements..."}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              disabled={isRefining}
              style={{ width: '100%', minHeight: '140px', padding: '14px 16px', fontSize: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line)', borderRadius: '8px', opacity: isRefining ? 0.5 : 1, resize: 'vertical', color: 'var(--text)', lineHeight: 1.7, boxSizing: 'border-box' }}
            />
          </div>

          <button
            onClick={handleRefine}
            disabled={(!context.trim() && !imageBase64) || isRefining}
            style={{ display: 'flex', alignItems: 'center', padding: '13px 20px', borderRadius: '8px', gap: '8px', width: '100%', justifyContent: 'center', background: 'var(--amber)', color: '#000', border: 'none', cursor: (!context.trim() && !imageBase64) || isRefining ? 'not-allowed' : 'pointer', opacity: (!context.trim() && !imageBase64) || isRefining ? 0.5 : 1, fontWeight: 600, fontSize: '14px' }}
          >
            <Sparkles size={15} />
            <span>{isRefining ? "Evolving..." : `Evolve for ${targetPlatform === 'any' ? 'Universal Use' : targetPlatform === 'chatgpt' ? 'ChatGPT' : targetPlatform.charAt(0).toUpperCase() + targetPlatform.slice(1)}`}</span>
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Right: Output */}
        <div style={{ padding: '32px 36px' }}>
          {(refinedOutput || isRefining) ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--amber)', fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Refined Prompt</span>
                  <span style={{ background: 'var(--line)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase' }}>{targetPlatform}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <CopyButton text={refinedOutput} />
                  <button
                    onClick={handleSaveToVault}
                    disabled={isRefining || isSaved}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', height: '28px', padding: '0 12px', fontSize: '11px', background: 'var(--line)', border: 'none', borderRadius: '6px', color: 'var(--text)', cursor: 'pointer' }}
                  >
                    {isSaved ? <Check size={13} /> : <Save size={13} />}
                    <span>{isSaved ? "Saved" : "Save"}</span>
                  </button>
                </div>
              </div>
              <div ref={outputRef} style={{ background: '#060607', border: '1px solid var(--line)', minHeight: '200px', maxHeight: '400px', overflowY: 'auto', padding: '20px', borderRadius: '8px' }}>
                <pre style={{ fontSize: '13px', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', margin: 0 }}>{refinedOutput || (isRefining ? "Architecting..." : "")}</pre>
                {isRefining && <span className="cursor-blink">|</span>}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '240px', border: '1px dashed var(--line)', borderRadius: '8px', color: 'var(--muted)', gap: '14px' }}>
              <Sparkles size={26} style={{ opacity: 0.25 }} />
              <p style={{ fontSize: '13px', textAlign: 'center', opacity: 0.5, maxWidth: '220px', lineHeight: 1.7, margin: 0 }}>
                Fill in your context on the left and click Evolve
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
