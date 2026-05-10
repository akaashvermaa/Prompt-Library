"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const search = () => {
    if (query.trim()) router.push(`/browse?search=${encodeURIComponent(query.trim())}`);
    else router.push("/browse");
  };

  return (
    <header className="hero">
      <div className="wrap">
        <div className="hero-meta">
          <span className="bar" />
          <span>A library, not a feed</span>
          <span>—</span>
          <span>Vol. 04 / 2026</span>
        </div>

        <h1>
          <span>Prompts </span>
          <span className="it">worth</span>
          <br />
          <span>keeping around.</span>
        </h1>

        <div className="hero-row">
          <p className="hero-sub">
            A curated, living archive of <strong>tested prompts</strong> for Claude, ChatGPT,
            Gemini and Grok. No fluff, no infinite scroll &mdash; just the ones that actually work,
            sorted by craft.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <div className="n">242</div>
              <div className="l">Curated prompts</div>
            </div>
            <div className="stat">
              <div className="n"><span className="it">8</span></div>
              <div className="l">Categories</div>
            </div>
            <div className="stat">
              <div className="n">4</div>
              <div className="l">Models</div>
            </div>
          </div>
        </div>

        <div className="hero-row" style={{ marginTop: 90, alignItems: "start" }}>
          <div>
            <div className="search-shell">
              <div className="search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <input
                  type="text"
                  placeholder={`Search 242 prompts — try "explain like I'm five"`}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && search()}
                />
                <button className="search-btn" onClick={search}>
                  Search
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="quick">
              <span className="label">Try:</span>
              {["code review","essay outline","cold email","study buddy","teach me"].map(c => (
                <span key={c} className="chip" onClick={() => { setQuery(c); router.push(`/browse?search=${encodeURIComponent(c)}`); }}>{c}</span>
              ))}
            </div>
          </div>

          <div className="hero-card">
            <div className="card-head">
              <span>Prompt of the day</span>
              <span className="live"><span className="ping" /> Updated 2h ago</span>
            </div>
            <div className="card-title">The <span className="it">socratic</span> tutor</div>
            <div className="card-snippet">
              <span className="hl">You are</span> a patient socratic tutor.{"\n"}
              <span className="hl">Topic:</span> <span className="var">{"{{subject}}"}</span>{"\n"}
              <span className="hl">Goal:</span> guide me to the answer with{"\n"}
              {"       "}questions, never give it directly&hellip;
            </div>
            <div className="card-foot">
              <div className="badges">
                <span className="pbadge pb-claude">Claude</span>
                <span className="pbadge pb-gpt">ChatGPT</span>
                <span className="pbadge pb-gemini">Gemini</span>
              </div>
              <button className="copy-mini">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copy prompt
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
