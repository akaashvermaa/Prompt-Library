"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Prompt } from "@/types";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { LikeButton } from "@/components/ui/LikeButton";
import { CopyButton } from "@/components/ui/CopyButton";
import Fuse from "fuse.js";

const DIFF_CLASS: Record<string, string> = { 
  beginner: "d-beg", 
  intermediate: "d-int", 
  advanced: "d-adv" 
};

export function CategoryContent({ 
  prompts, 
  categoryLabel 
}: { 
  prompts: Prompt[], 
  categoryLabel: string 
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return prompts;
    
    const fuse = new Fuse(prompts, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'tags', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'prompt', weight: 0.1 }
      ],
      threshold: 0.4
    });

    return fuse.search(query).map(r => r.item);
  }, [query, prompts]);

  return (
    <>
      {/* Category Search Bar */}
      <div className="search-shell" style={{ marginBottom: '40px' }}>
        <div className="search">
          <input
            type="text"
            placeholder={`Search in ${categoryLabel}...`}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="search-btn search-btn-alt"
              onClick={() => setQuery("")}
            >
              Clear
            </button>
          )}
        </div>
        {query && (
          <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>
            Found {filtered.length} results for "{query}" in this category
          </div>
        )}
      </div>

      <div className="browse-head">
        <Link href="/browse" style={{ fontFamily: "monospace", fontSize: 12, color: "var(--amber)", display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>←</span> Back to Browse
        </Link>
        <div className="meta">
          Showing <span className="it">{filtered.length}</span> of {prompts.length} architectures
        </div>
      </div>

      <div className="browse-grid">
        {filtered.map(p => (
          <Link key={p.id} href={`/prompt/${p.slug}`} className="bcard">
            <div className="row1">
              <span className="cat-tag">{categoryLabel}</span>
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

      {filtered.length === 0 && (
        <div className="no-results">
          <p>No prompts found matching "{query}" in this category.</p>
          <button onClick={() => setQuery("")} className="btn-sec" style={{ marginTop: '12px' }}>
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
