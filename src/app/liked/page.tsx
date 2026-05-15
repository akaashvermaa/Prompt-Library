"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { getPromptsByIds } from "@/lib/prompts";
import { Prompt } from "@/types";
import Link from "next/link";
import { LikeButton } from "@/components/ui/LikeButton";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { CopyButton } from "@/components/ui/CopyButton";

export default function LikedPage() {
  const { user, openAuthModal } = useAuth();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    supabase
      .from("user_likes")
      .select("prompt_id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(async ({ data }) => {
        if (!data || data.length === 0) { setLoading(false); return; }
        const ids = data.map((r: any) => r.prompt_id);
        const results = await getPromptsByIds(ids);
        setPrompts(results);
        setLoading(false);
      });
  }, [user]);

  const DIFF_CLASS: Record<string, string> = { beginner: "d-beg", intermediate: "d-int", advanced: "d-adv" };

  return (
    <div className="page-pt">
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Saved / your collection</div>
              <h2>Prompts you <span className="it">loved.</span></h2>
            </div>
            <p className="lede">
              {user
                ? `${prompts.length} saved prompt${prompts.length !== 1 ? "s" : ""}. Copy any one instantly.`
                : "Sign in to see your saved prompts."}
            </p>
          </div>

          {!user && (
            <div className="liked-empty">
              <div className="liked-empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3>Your saved prompts live here</h3>
              <p>Sign in to start saving prompts you want to come back to.</p>
              <button className="btn-prim" onClick={() => openAuthModal("login")}>Sign in to continue</button>
            </div>
          )}

          {user && loading && (
            <div className="loading-text">Loading your saved prompts...</div>
          )}

          {user && !loading && prompts.length === 0 && (
            <div className="liked-empty">
              <div className="liked-empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3>Nothing saved yet</h3>
              <p>Hit the heart on any prompt while browsing to save it here.</p>
              <Link href="/browse" className="btn-prim">Browse the library</Link>
            </div>
          )}

          {user && !loading && prompts.length > 0 && (
            <div className="browse-grid">
              {prompts.map(p => (
                <Link key={p.id} href={`/prompt/${p.slug}`} className="bcard">
                  <div className="row1">
                    <span className="cat-tag">{p.category.replace(/-/g, " ")}</span>
                    <span className={`diff ${DIFF_CLASS[p.difficulty] ?? "d-int"}`}>
                      {p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1)}
                    </span>
                  </div>
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                  <div className="foot">
                    <div className="badges">
                      {p.platforms.slice(0, 3).map(pl => <PlatformBadge key={pl} platform={pl} />)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <LikeButton promptId={p.id} />
                      <CopyButton text={p.prompt} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
