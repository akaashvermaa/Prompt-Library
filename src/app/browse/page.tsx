"use client";
import { Suspense, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ALL_PROMPTS } from "@/lib/prompts";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { CopyButton } from "@/components/ui/CopyButton";
import type { Platform } from "@/types";

const TABS = ["all", "claude", "chatgpt", "gemini", "grok"] as const;
const CATS = ["all", "study", "coding", "writing", "teaching", "business", "review", "testing", "linkedin", "image"];

const CAT_LABEL: Record<string, string> = {
  study: "Study", coding: "Code", writing: "Writing", teaching: "Teaching",
  business: "Business", review: "Review", testing: "QA", linkedin: "LinkedIn", image: "Image",
};

// Quick search suggestions
const SEARCH_SUGGESTIONS = [
  "teaching",
  "essay",
  "code",
  "business",
  "writing",
  "study",
  "review",
  "test",
  "linkedin"
];

function BrowseContent() {
  const params = useSearchParams();
  const [platform, setPlatform] = useState<Platform>("all");
  const [category, setCategory] = useState("all");
  // Live search — no separate "commit" state needed
  const [query, setQuery] = useState(params.get("search") ?? "");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Everything is synchronous — useMemo over the static array
  const results = useMemo(() => {
    let out = ALL_PROMPTS;

    if (platform !== "all") {
      if (platform === "claude") {
        // For Claude, only show prompts that specifically include claude
        out = out.filter(p => p.platforms.includes("claude"));
      } else {
        // For other platforms, show prompts that include that platform OR "any"
        out = out.filter(p =>
          p.platforms.includes(platform) || p.platforms.includes("any")
        );
      }
    }

    if (category !== "all") {
      out = out.filter(p => p.category === category);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.prompt.toLowerCase().includes(q) ||
        (p.category === 'image' && p.imagePlatforms?.some(ip => ip.toLowerCase().includes(q)))
      );
    }

    return out;
  }, [platform, category, query]);

  // Pagination logic
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = results.slice(startIndex, startIndex + itemsPerPage);

  // Update URL when page changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', currentPage.toString());
    window.history.replaceState({}, '', url);
  }, [currentPage]);

  // Get page from URL on mount
  useEffect(() => {
    const pageParam = params.get('page');
    if (pageParam) {
      const page = parseInt(pageParam);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
      }
    }
  }, [params]);

  console.log("Rendering BrowseContent with totalPages:", totalPages, "currentPage:", currentPage);
      return (
    <>
      {/* Search */}
      <div className="search-shell browse-content">
        <div className="search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search prompts by keywords, topics, or tags..."
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
        <div style={{fontSize: '14px', color: 'var(--muted)', marginTop: '8px'}}>
          {query ? `Found ${results.length} prompt${results.length !== 1 ? 's' : ''} for "${query}"` : 'Search for "teaching", "essay", "code", etc.'}
        </div>
      </div>

      {/* Model tabs */}
      <div className="browse-head">
        <div className="filter-tabs">
          {TABS.map(t => (
            <button
              key={t}
              className={`ftab${platform === t ? " active" : ""}`}
              onClick={() => {
                setPlatform(t as Platform);
                setCurrentPage(1);
              }}
            >
              {t === "all" ? "All models" : t === "chatgpt" ? "ChatGPT" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="meta">Showing <span className="it">{paginatedResults.length}</span> of <span className="it">{results.length}</span> ({totalPages} pages)</div>

        {/* Quick search suggestions */}
        <div style={{marginTop: '20px'}}>
          <div style={{fontSize: '13px', color: 'var(--muted-2)', marginBottom: '10px'}}>Quick search:</div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
            {SEARCH_SUGGESTIONS.slice(0, 6).map(suggestion => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--line)',
                  borderRadius: '999px',
                  fontSize: '12px',
                  color: 'var(--muted)',
                  background: 'var(--surface)',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--amber)';
                  e.currentTarget.style.color = 'var(--text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)';
                  e.currentTarget.style.color = 'var(--muted)';
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="cat-tabs">
        <div style={{display: 'flex', gap: '8px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none'}}>
          {CATS.map(c => (
            <button
              key={c}
              className={`ftab${category === c ? " active" : ""}`}
              onClick={() => {
                setCategory(c);
                setCurrentPage(1);
              }}
              style={{whiteSpace: 'nowrap'}}
            >
              {c === "all" ? "All categories" : CAT_LABEL[c] ?? c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="browse-grid">
        {paginatedResults.map(p => (
          <Link key={p.id} href={`/prompt/${p.slug}`} className="bcard">
            <div className="row1">
              <span className="cat-tag">{CAT_LABEL[p.category] ?? p.category}</span>
            </div>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <div className="foot">
              <div className="badges">
                {p.platforms.slice(0, 3).map(pl => <PlatformBadge key={pl} platform={pl} />)}
              </div>
              <span className="mono tag-mono">
                {p.tags.slice(0, 2).map(t => `#${t}`).join(" ")}
              </span>
            </div>

            {/* Show "Paste this into" for image prompts */}
            {p.category === 'image' && p.imagePlatforms && p.imagePlatforms.length > 0 && (
              <div style={{
                marginTop: '8px',
                fontSize: '12px',
                color: 'var(--muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{color: 'var(--amber)'}}>Paste this into →</span>
                {p.imagePlatforms.map((ip, idx) => (
                  <span key={ip} className="pbadge" style={{fontSize: '11px', padding: '2px 8px'}}>
                    {ip === 'midjourney' ? 'Midjourney' :
                     ip === 'dalle3' ? 'DALL-E 3' :
                     ip === 'imagen4' ? 'Imagen 4' :
                     ip === 'stablediffusion' ? 'Stable Diffusion' : ip}
                  </span>
                ))}
              </div>
            )}
            <div className="copy-container">
              <CopyButton text={p.prompt} />
            </div>
          </Link>
        ))}
      </div>

      {paginatedResults.length === 0 && (
        <div className="no-results">
          <p className="no-results-text">
            No prompts match your filters.
          </p>
          <button
            onClick={() => { setPlatform("all"); setCategory("all"); setQuery(""); }}
            className="btn-sec"
          >
            Clear all filters
          </button>
        </div>
      )}

      
      {/* Pagination */}
      <div className="pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="page-btn"
          >
            Previous
          </button>

          <div className="page-numbers">
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (currentPage <= 4) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = currentPage - 3 + i;
              }

              if (pageNum < 1 || pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`page-num ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            Next
          </button>
      </div>
    </>
  );
}

export default function BrowsePage() {
  return (
    <div className="page-pt">
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Browse / {ALL_PROMPTS.length} prompts</div>
              <h2>The whole <span className="it">stack</span>, filtered.</h2>
            </div>
            <p className="lede">Filter by model or category. Live search — no submit needed.</p>
          </div>
          <Suspense fallback={
            <div className="loading-text">
              Loading…
            </div>
          }>
            <BrowseContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}