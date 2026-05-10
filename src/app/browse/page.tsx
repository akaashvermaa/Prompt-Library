"use client";
import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ALL_PROMPTS } from "@/lib/prompts";
import { PlatformBadge } from "@/components/ui/PlatformBadge";

const TABS = ["all", "claude", "chatgpt", "gemini", "grok"] as const;
const CATS = ["all", "study", "coding", "writing", "teaching", "business", "review", "testing", "linkedin"];

const CAT_LABEL: Record<string, string> = {
  study: "Study", coding: "Code", writing: "Writing", teaching: "Teaching",
  business: "Business", review: "Review", testing: "QA", linkedin: "LinkedIn",
};

function BrowseContent() {
  const params = useSearchParams();
  const [platform, setPlatform] = useState("all");
  const [category, setCategory] = useState("all");
  // Live search — no separate "commit" state needed
  const [query, setQuery] = useState(params.get("search") ?? "");

  // Everything is synchronous — useMemo over the static array
  const results = useMemo(() => {
    let out = ALL_PROMPTS;

    if (platform !== "all") {
      out = out.filter(p =>
        p.platforms.includes(platform as never) || p.platforms.includes("any" as never)
      );
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
        p.prompt.toLowerCase().includes(q)
      );
    }

    return out;
  }, [platform, category, query]);

  return (
    <>
      {/* Search */}
      <div className="search-shell" style={{ marginTop: 0, marginBottom: 32 }}>
        <div className="search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search prompts — live filtering…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="search-btn"
              onClick={() => setQuery("")}
              style={{ background: "var(--line-2)", color: "var(--muted)" }}
            >
              Clear
            </button>
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
              onClick={() => setPlatform(t)}
            >
              {t === "all" ? "All models" : t === "chatgpt" ? "ChatGPT" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="meta">Showing <span className="it">{results.length}</span> of {ALL_PROMPTS.length}</div>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 32 }}>
        {CATS.map(c => (
          <button
            key={c}
            className={`ftab${category === c ? " active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c === "all" ? "All categories" : CAT_LABEL[c] ?? c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="browse-grid">
        {results.map(p => (
          <Link key={p.id} href={`/prompt/${p.slug}`} className="bcard">
            <div className="row1">
              <span className="cat-tag">{CAT_LABEL[p.category] ?? p.category}</span>
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
              <span className="mono" style={{ fontSize: 11, color: "var(--muted-2)" }}>
                {p.tags.slice(0, 2).map(t => `#${t}`).join(" ")}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {results.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
          <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 13 }}>
            No prompts match your filters.
          </p>
          <button
            onClick={() => { setPlatform("all"); setCategory("all"); setQuery(""); }}
            className="btn-sec"
            style={{ marginTop: 20 }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}

export default function BrowsePage() {
  return (
    <div style={{ paddingTop: 80 }}>
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
            <div style={{ color: "var(--muted)", padding: "40px 0", fontFamily: "monospace", fontSize: 13 }}>
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
