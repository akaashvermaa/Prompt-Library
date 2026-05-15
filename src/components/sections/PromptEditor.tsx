"use client";
import { useAuth } from "@/lib/auth-context";
import { CopyButton } from "@/components/ui/CopyButton";
import { LikeButton } from "@/components/ui/LikeButton";
import { TailorButton } from "@/components/ui/TailorButton";
import { Prompt } from "@/types";
import { Lock } from "lucide-react";

export function PromptEditor({ prompt }: { prompt: Prompt }) {
  const { user, loading, openAuthModal } = useAuth();
  
  const fullLines = prompt.prompt.split("\n");
  const previewLines = fullLines.slice(0, 3);
  const isLocked = !loading && !user;
  const displayLines = isLocked ? previewLines : fullLines;

  return (
    <div className="detail-right">
      <div className="editor-head">
        <div className="dots">
          <span className="dot" /><span className="dot" /><span className="dot" />
        </div>
        <div className="file">prompt-{prompt.slug}.md</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user && (
            <>
              <TailorButton prompt={prompt} />
              <LikeButton promptId={prompt.id} />
              <CopyButton text={prompt.prompt} />
            </>
          )}
          {!user && !loading && (
            <button className="nav-login-btn" onClick={() => openAuthModal("login")}>
              Unlock Full Prompt
            </button>
          )}
        </div>
      </div>
      
      <div className={`editor-body ${isLocked ? 'locked' : ''}`} style={{ position: 'relative' }}>
        {displayLines.map((line, i) => (
          <div key={i} className="ln">
            <span className="ln-num">{i + 1}</span>
            <span>{line || "\u00a0"}</span>
          </div>
        ))}
        
        {isLocked && (
          <div className="editor-lock-overlay">
            <div className="lock-content">
              <div className="lock-icon">
                <Lock size={24} />
              </div>
              <h3>Prompt is locked.</h3>
              <p>Sign up for a free account to view the full architecture and use the tailor agent.</p>
              <button className="btn-prim" onClick={() => openAuthModal("signup")}>
                Create Free Account
              </button>
            </div>
          </div>
        )}
        
        {loading && (
          <div className="editor-loading">
            <span>Synchronizing vault...</span>
          </div>
        )}
      </div>
    </div>
  );
}
