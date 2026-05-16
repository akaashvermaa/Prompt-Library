"use client";
import { useAuth } from "@/lib/auth-context";
import { CopyButton } from "@/components/ui/CopyButton";
import { LikeButton } from "@/components/ui/LikeButton";
import { Prompt } from "@/types";
import { Lock } from "lucide-react";

// Renders just the copy/like action buttons — used in the page header
export function PromptActions({ prompt }: { prompt: Prompt }) {
  const { user, loading, openAuthModal } = useAuth();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
      {user && (
        <>
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
  );
}

// Renders the full code-editor view of the prompt with lock overlay for guests
export function PromptEditor({ prompt }: { prompt: Prompt }) {
  const { user, loading, openAuthModal } = useAuth();

  const isLocked = !loading && !user;
  const fullLines = prompt.prompt.split("\n");
  const displayLines = isLocked
    ? [fullLines[0], ...Array(10).fill("Sign in to unlock the full high-performance architecture...")]
    : fullLines;

  return (
    <div className="detail-right">
      <div style={{ border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', background: '#0a0a0b' }}>
        <div className="editor-head">
          <div className="dots">
            <span className="dot" /><span className="dot" /><span className="dot" />
          </div>
          <div className="file">prompt-{prompt.slug}.md</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user && (
              <>
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
            <div key={i} className={`ln ${isLocked && i > 0 ? 'placeholder' : ''}`}>
              <span className="ln-num">{i + 1}</span>
              <span className={isLocked && i > 0 ? 'locked-text' : ''}>
                {line || "\u00a0"}
              </span>
            </div>
          ))}

          {isLocked && (
            <div className="editor-lock-overlay">
              <div className="lock-content">
                <div className="lock-icon"><Lock size={20} /></div>
                <h3>Vault Access Required</h3>
                <p>Join the community to access the full prompt, use the tailor agent, and save to your personal library.</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button className="btn-prim" onClick={() => openAuthModal("signup")}>Join Free</button>
                  <button className="btn-sec" style={{ padding: '12px 20px' }} onClick={() => openAuthModal("login")}>Sign In</button>
                </div>
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
    </div>
  );
}
