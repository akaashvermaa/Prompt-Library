"use client";
import { Suspense, useState, useMemo, useEffect } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Prompt, Platform } from "@/types";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { CopyButton } from "@/components/ui/CopyButton";

const TABS = ["any", "claude", "chatgpt", "gemini", "grok"] as const;
const CATS = ["all", "study-learn", "write-create", "code-dev", "teaching", "business-marketing", "review-test", "testing", "career-brand", "image"];

const CAT_LABEL: Record<string, string> = {
  "study-learn": "Study & Learn", "write-create": "Write & Create", "code-dev": "Code & Dev", teaching: "Teaching",
  "business-marketing": "Business & Marketing", "review-test": "Review & Test", testing: "QA", "career-brand": "Career & Brand", image: "Image",
};

export function BrowseContent({ prompts }: { prompts: Prompt[] }) {
  const params = useSearchParams();
  const [platform, setPlatform] = useState<Platform>("any");
  const [category, setCategory] = useState("all");
  // Live search — now with server-side debouncing
  const [query, setQuery] = useState(params.get("search") ?? "");
  const [debouncedQuery] = useDebounce(query, 300);
  const [serverResults, setServerResults] = useState<Prompt[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setServerResults(null);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then(r => r.json())
      .then(data => {
        setServerResults(data);
        setIsSearching(false);
        setCurrentPage(1); // Reset page on new search
      })
      .catch(err => {
        console.error("Search failed", err);
        setIsSearching(false);
      });
  }, [debouncedQuery]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Mix server results and client filters
  const results = useMemo(() => {
    // If we have server search results, start from those. Otherwise start from all props.
    let out = serverResults !== null ? serverResults : prompts;

    if (platform !== "any") {
      if (platform === "claude") {
        out = out.filter(p => p.platforms.includes("claude"));
      } else {
        out = out.filter(p =>
          p.platforms.includes(platform) || p.platforms.includes("any")
        );
      }
    }

    if (category !== "all") {
      out = out.filter(p => p.category === category);
    }

    // Only do client-side filtering if server results aren't active (query is short)
    if (serverResults === null && query.trim()) {
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
  }, [platform, category, query, prompts, serverResults]);

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
        <div style={{fontSize: '14px', color: 'var(--muted)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px'}}>
          {isSearching ? (
            <span style={{ color: 'var(--amber)' }}>Searching...</span>
          ) : query ? (
            `Found ${results.length} prompt${results.length !== 1 ? 's' : ''} for "${query}"`
          ) : (
            'Search for "teaching", "essay", "code", etc.'
          )}
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
              {t === "any" ? "All models" : t === "chatgpt" ? "ChatGPT" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="meta">
          {results.length} prompt{results.length !== 1 ? 's' : ''}
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
              <span className={`diff ${p.difficulty === 'beginner' ? 'd-beg' : p.difficulty === 'intermediate' ? 'd-int' : 'd-adv'}`}>
                {p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1)}
              </span>
            </div>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <div className="foot">
              <div className="badges">
                {p.platforms.slice(0, 3).map(pl => <PlatformBadge key={pl} platform={pl} />)}
              </div>
              <span className="mono" style={{ fontSize: 11, color: "var(--muted-2)" }}>
                {p.tags.slice(0, 2).map(t => `#${t}`).join(" ")}
              </span>
            </div>
            {p.imagePlatforms && p.imagePlatforms.length > 0 && (
              <div className="image-platforms" style={{ position: 'absolute', bottom: 60, left: 16, right: 16, background: 'var(--surface)', padding: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}>
                <span style={{color: 'var(--amber)'}}>Paste this into →</span>
                <div style={{ marginTop: '6px' }}>
                  {p.imagePlatforms.map((ip, idx) => (
                    <span key={ip} className="pbadge" style={{fontSize: '11px', padding: '2px 8px', marginRight: '6px', marginBottom: '4px', display: 'inline-block' }}>
                      {ip === 'midjourney' ? 'Midjourney' :
                       ip === 'dalle3' ? 'DALL-E 3' :
                       ip === 'imagen4' ? 'Imagen 4' :
                       ip === 'stablediffusion' ? 'Stable Diffusion' : ip}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="copy-container" style={{ position: 'absolute', top: 16, right: 16, opacity: 0, transition: 'opacity 0.2s' }}>
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
            onClick={() => { setPlatform("any"); setCategory("all"); setQuery(""); }}
            className="btn-sec"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
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
      )}
    </>
  );
}
