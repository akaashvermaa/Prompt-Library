"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CopyButton } from "@/components/ui/CopyButton";
import { Sparkles, Trash2, Calendar, Layout } from "lucide-react";

interface CustomPrompt {
  id: string;
  base_prompt_id: string;
  original_context: string;
  generated_prompt: string;
  created_at: string;
}

export function CustomPromptGrid({ userId }: { userId: string }) {
  const [customPrompts, setCustomPrompts] = useState<CustomPrompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomPrompts() {
      const { data, error } = await supabase
        .from("user_custom_prompts")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching custom prompts:", error);
      } else {
        setCustomPrompts(data || []);
      }
      setLoading(false);
    }

    fetchCustomPrompts();
  }, [userId]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("user_custom_prompts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting custom prompt:", error);
    } else {
      setCustomPrompts(prev => prev.filter(p => p.id !== id));
    }
  };

  if (loading) {
    return <div className="loading-text">Loading your custom variations...</div>;
  }

  if (customPrompts.length === 0) {
    return (
      <div className="liked-empty">
        <h3>No tailored prompts yet</h3>
        <p>Use the "Tailor Prompt" feature on any prompt page to generate specific variations.</p>
      </div>
    );
  }

  return (
    <div className="custom-prompt-grid">
      {customPrompts.map(p => (
        <div key={p.id} className="custom-pcard">
          <div className="custom-pcard-head">
            <div className="custom-pcard-tag">
              <span>Tailored Variation</span>
            </div>
            <button onClick={() => handleDelete(p.id)} className="delete-btn" title="Remove from Vault">
              <Trash2 size={14} />
            </button>
          </div>

          <div className="custom-pcard-body">
            <div className="context-box">
              <div className="lbl">Context:</div>
              <p>{p.original_context}</p>
            </div>
            
            <div className="prompt-preview">
              <div className="lbl">Generated Prompt:</div>
              <pre>{p.generated_prompt.substring(0, 200)}...</pre>
            </div>
          </div>

          <div className="custom-pcard-foot">
            <div className="date">
              <Calendar size={12} />
              <span>{new Date(p.created_at).toLocaleDateString()}</span>
            </div>
            <CopyButton text={p.generated_prompt} />
          </div>
        </div>
      ))}
    </div>
  );
}
