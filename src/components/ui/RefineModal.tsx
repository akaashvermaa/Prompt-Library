"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { CopyButton } from "./CopyButton";
import { Sparkles, X, ChevronRight, Save, Check, Wand2 } from "lucide-react";

export function RefineModal() {
  const { refineModalOpen, closeRefineModal, refinePrompt, user } = useAuth();
  const [context, setContext] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [refinedOutput, setRefinedOutput] = useState("");
  const [step, setStep] = useState<"input" | "output">("input");
  const [isSaved, setIsSaved] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refineModalOpen) {
      setContext("");
      setRefinedOutput("");
      setStep("input");
      setIsSaved(false);
    }
  }, [refineModalOpen]);

  if (!refineModalOpen || !refinePrompt) return null;

  const handleRefine = async () => {
    if (!context.trim()) return;
    setIsRefining(true);
    setStep("output");
    setRefinedOutput("");
    try {
      const response = await fetch("/api/refine-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          basePrompt: refinePrompt.prompt,
          userContext: context,
          promptId: refinePrompt.id
        }),
      });
      if (!response.ok) throw new Error("Failed to refine prompt");
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          setRefinedOutput(prev => prev + chunk);
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
        base_prompt_id: refinePrompt.id,
        original_context: context,
        generated_prompt: refinedOutput
      });
      if (error) throw error;
      setIsSaved(true);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <div className="auth-overlay page-fade" onClick={(e) => e.target === e.currentTarget && closeRefineModal()} style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.8)' }}>
      <div className="refine-modal" style={{ maxWidth: '600px', border: '1px solid var(--line-2)', background: 'linear-gradient(180deg, var(--surface), var(--bg))', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8)' }}>
        <button className="auth-close" onClick={closeRefineModal} aria-label="Close" style={{ top: '24px', right: '24px' }}><X size={20} /></button>
        
        <div className="refine-header" style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--amber)', marginBottom: '16px' }}>
            <Wand2 size={20} className="sparkle-anim" />
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Tailor Agent Active</span>
          </div>
          <h2 style={{ fontSize: '36px', fontFamily: '"Instrument Serif", serif', lineHeight: 1.1 }}>
            Refine <span className="it">{refinePrompt.title}</span>
          </h2>
          <p className="refine-sub" style={{ marginTop: '12px', fontSize: '15px', opacity: 0.8 }}>
            Inject your specific requirements to evolve this architecture.
          </p>
        </div>

        <div className="refine-content">
          {step === "input" ? (
            <div className="refine-input-step">
              <div style={{ marginBottom: '24px' }}>
                <label className="refine-label" style={{ display: 'block', marginBottom: '12px', fontSize: '11px', color: 'var(--amber)' }}>Your Specific Context</label>
                <textarea 
                  className="refine-textarea"
                  placeholder="Describe your specific project or task details..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  autoFocus
                  style={{ width: '100%', minHeight: '160px', padding: '20px', fontSize: '15px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--line-2)' }}
                />
              </div>
              <div className="refine-actions">
                <button 
                  className="refine-primary-btn" 
                  onClick={handleRefine}
                  disabled={!context.trim() || isRefining}
                  style={{ padding: '18px', borderRadius: '12px', gap: '12px' }}
                >
                  <Sparkles size={18} />
                  <span style={{ fontWeight: 600 }}>Evolve Architecture</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="refine-output-step">
              <div className="refine-output-header" style={{ marginBottom: '12px' }}>
                <div className="lbl" style={{ color: 'var(--amber)', fontWeight: 600, fontSize: '11px' }}>Master Architecture</div>
                <div className="refine-output-actions">
                  <CopyButton text={refinedOutput} />
                  <button 
                    className={`save-vault-btn ${isSaved ? 'saved' : ''}`}
                    onClick={handleSaveToVault}
                    disabled={isRefining || isSaved}
                    style={{ height: '36px' }}
                  >
                    {isSaved ? <Check size={16} /> : <Save size={16} />}
                    <span>{isSaved ? "Saved" : "Save to Vault"}</span>
                  </button>
                </div>
              </div>
              <div className="refine-output-box" ref={outputRef} style={{ background: '#080809', border: '1px solid var(--line-2)', minHeight: '300px', maxHeight: '400px' }}>
                <pre style={{ fontSize: '13px', lineHeight: 1.7 }}>{refinedOutput || (isRefining ? "Architecting..." : "")}</pre>
                {isRefining && <span className="cursor-blink">|</span>}
              </div>
              {!isRefining && (
                <button className="refine-back-btn" onClick={() => setStep("input")} style={{ marginTop: '20px', fontSize: '12px', opacity: 0.6 }}>
                  ← Modify Context
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
