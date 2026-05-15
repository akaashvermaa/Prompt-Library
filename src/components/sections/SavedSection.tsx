"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLikes } from "@/lib/use-likes";
import { getPromptsByIds } from "@/lib/prompts";
import { Prompt } from "@/types";
import Link from "next/link";
import { LikeButton } from "@/components/ui/LikeButton";
import { GridSkeleton } from "@/components/ui/Skeleton";

const SIZES = ["large", "tall", "", "", "wide", ""];

export function SavedSection({ featuredPrompts }: { featuredPrompts: Prompt[] }) {
  const { user, openAuthModal } = useAuth();
  const { likedIds, loading: likesLoading } = useLikes();
  const [savedPrompts, setSavedPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || likedIds.size === 0) {
      setSavedPrompts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getPromptsByIds(Array.from(likedIds)).then(res => {
      setSavedPrompts(res);
      setLoading(false);
    });
  }, [user, likedIds]);

  const hasSaved = savedPrompts.length > 0;
  const displayPrompts = hasSaved ? savedPrompts.slice(0, 6) : featuredPrompts.slice(0, 6);

  // Use Skeleton while loading if the user is potentially logged in
  if (likesLoading || (user && loading)) {
    return (
      <section id="saved-section" style={{ padding: '140px 0' }}>
        <div className="wrap">
          <div className="sec-head" style={{ display: 'block' }}>
            <div className="eyebrow" style={{ opacity: 0.5 }}>Synchronizing Vault...</div>
            <h2 style={{ marginBottom: '24px' }}>Loading your <span className="it">collection</span></h2>
          </div>
          <GridSkeleton count={3} />
        </div>
      </section>
    );
  }

  return (
    <section id="saved-section" style={{ padding: '140px 0' }}>
      <div className="wrap">
        <div className="sec-head" style={{ display: 'block' }}>
          <div className="eyebrow">
            {hasSaved ? "Saved / your collection" : "Collection / your favorites"}
          </div>
          <h2 style={{ marginBottom: '24px' }}>
            {hasSaved ? (
              <>Prompts you <span className="it">loved.</span></>
            ) : (
              <>Your personal <span className="it">vault</span> awaits.</>
            )}
          </h2>
          <p className="lede" style={{ maxWidth: '600px', marginBottom: '48px' }}>
            {hasSaved 
              ? "Your personal shortcut to high-performance prompts. Quick access to your most used architectures."
              : "Save your favorite architectures for instant access. Sign in to start building your own personal library."}
          </p>
        </div>

        {!user && (
          <div className="none-liked-notice" style={{ marginBottom: '60px', padding: '32px', background: 'var(--surface)', border: '1px dashed var(--line)', borderRadius: '16px' }}>
             <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
                <strong>Sign in to save prompts.</strong> Build your own library and sync it across devices. 
                <button 
                  onClick={() => openAuthModal("login")}
                  style={{ marginLeft: '12px', color: 'var(--amber)', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                >
                  Sign in now
                </button>
                <span style={{ marginLeft: '12px', opacity: 0.6 }}>Recommended for you ↓</span>
             </p>
          </div>
        )}

        {user && !hasSaved && (
          <div className="none-liked-notice" style={{ marginBottom: '60px', padding: '32px', background: 'var(--surface)', border: '1px dashed var(--line)', borderRadius: '16px' }}>
             <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
                <strong>No prompts saved yet.</strong> Hit the heart on any prompt while browsing to build your own collection. 
                <span style={{ marginLeft: '8px', color: 'var(--amber)' }}>Recommended for you ↓</span>
             </p>
          </div>
        )}

        <div className="feat-grid">
          {displayPrompts.map((prompt, i) => (
            <Link key={prompt.id} href={`/prompt/${prompt.slug}`} className={`pcard ${SIZES[i] ?? ""}`}>
              <div className="top">
                <span className="num">P / {String(i + 1).padStart(3, "0")}</span>
                <div className="card-like">
                  <LikeButton promptId={prompt.id} />
                </div>
              </div>
              <h3>{prompt.title}</h3>
              <p>{prompt.description}</p>
              {prompt.prompt.length > 0 && (
                <div className="preview">{prompt.prompt.substring(0, 160)}...</div>
              )}
              <div className="foot">
                <div className="tags">{prompt.tags.slice(0, 3).map(t => `#${t}`).join(" ")}</div>
                <div className="arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
