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
import { CustomPromptGrid } from "@/components/sections/CustomPromptGrid";
import { Heart, Sparkles } from "lucide-react";

export default function LikedPage() {
  const { user, openAuthModal } = useAuth();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"favorites" | "tailored">("favorites");

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    
    setLoading(true);
    supabase
      .from("user_likes")
      .select("prompt_id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(async ({ data }) => {
        if (!data || data.length === 0) { 
          setPrompts([]);
          setLoading(false); 
          return; 
        }
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
          <div className="sec-head" style={{ display: 'block' }}>
            <div className="eyebrow">Personal Vault / your archive</div>
            <h2 style={{ marginBottom: '24px' }}>Your curated <span className="it">collection.</span></h2>
            
            {user && (
              <div className="auth-tabs" style={{ maxWidth: '320px', marginTop: '32px' }}>
                <button 
                  className={`auth-tab ${activeTab === "favorites" ? "active" : ""}`} 
                  onClick={() => setActiveTab("favorites")}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Heart size={14} />
                  <span>Favorites</span>
                </button>
                <button 
                  className={`auth-tab ${activeTab === "tailored" ? "active" : ""}`} 
                  onClick={() => setActiveTab("tailored")}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <span>Tailored</span>
                </button>
              </div>
            )}
          </div>

          {!user && (
            <div className="liked-empty">
              <div className="liked-empty-icon">
                <Heart size={40} strokeWidth={1.5} />
              </div>
              <h3>Your personal vault awaits</h3>
              <p>Sign in to see your saved prompts and custom variations.</p>
              <button className="btn-prim" onClick={() => openAuthModal("login")}>Sign in to continue</button>
            </div>
          )}

          {user && activeTab === "favorites" && (
            <>
              {loading ? (
                <div className="loading-text">Loading your favorites...</div>
              ) : prompts.length === 0 ? (
                <div className="liked-empty">
                  <div className="liked-empty-icon">
                    <Heart size={40} strokeWidth={1.5} />
                  </div>
                  <h3>No favorites yet</h3>
                  <p>Hit the heart on any prompt while browsing to save it here.</p>
                  <Link href="/browse" className="btn-prim">Browse the library</Link>
                </div>
              ) : (
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
            </>
          )}

          {user && activeTab === "tailored" && (
            <CustomPromptGrid userId={user.id} />
          )}
        </div>
      </section>
    </div>
  );
}
