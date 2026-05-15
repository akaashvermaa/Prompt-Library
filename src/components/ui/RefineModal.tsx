"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { CopyButton } from "./CopyButton";
import { Sparkles, X, ChevronRight, Save, Check } from "lucide-react";

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
    <div className="auth-overlay" onClick={(e) => e.target === e.currentTarget && closeRefineModal()}>
      <div className="refine-modal">
        <button className="auth-close" onClick={closeRefineModal} aria-label="Close"><X size={20} /></button>
        
        <div className="refine-header">
          <h2>
            Tailor: <span className="it">{refinePrompt.title}</span>
          </h2>
          <p className="refine-sub">
            Provide your specific context to generate a high-density, ready-to-use architecture.
          </p>
        </div>

        <div className="refine-content">
          {step === "input" ? (
            <div className="refine-input-step">
              <label className="refine-label">What are your specific requirements?</label>
              <textarea 
                className="refine-textarea"
                placeholder="Example: I'm building a SaaS admin panel using Next.js and Tailwind CSS 4. I need a clean, glassmorphic UI with high-contrast data visualizations..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                autoFocus
              />
              <div className="refine-actions">
                <button 
                  className="refine-primary-btn" 
                  onClick={handleRefine}
                  disabled={!context.trim() || isRefining}
                >
                  <span>Generate Dense Prompt</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="refine-output-step">
              <div className="refine-output-header">
                <div className="lbl">Refined Architecture</div>
                <div className="refine-output-actions">
                  <CopyButton text={refinedOutput} />
                  <button 
                    className={`save-vault-btn ${isSaved ? 'saved' : ''}`}
                    onClick={handleSaveToVault}
                    disabled={isRefining || isSaved}
                  >
                    {isSaved ? <Check size={16} /> : <Save size={16} />}
                    <span>{isSaved ? "Saved" : "Save to Vault"}</span>
                  </button>
                </div>
              </div>
              <div className="refine-output-box" ref={outputRef}>
                <pre>{refinedOutput || (isRefining ? "Agent is thinking..." : "")}</pre>
                {isRefining && <span className="cursor-blink">|</span>}
              </div>
              {!isRefining && (
                <button className="refine-back-btn" onClick={() => setStep("input")}>
                  Modify Context
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
