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
          <span>A library, not a feed</span>
        </div>

        <h1>
          <span>Prompts </span>
          <span className="it">worth</span>
          <br />
          <span>keeping around.</span>
        </h1>

        <p className="hero-sub">
          A curated, living archive of <strong>tested AI prompts for text and image generation</strong>.
          No fluff, no infinite scroll-just the ones that actually work, engineered for Claude, ChatGPT, Gemini and Grok.
        </p>

        <div className="hero-search-row">
          <div className="hero-search-col">
            <div className="search-shell">
              <div className="search">
                <input
                  type="text"
                  placeholder={`Search architectures - try "Expert architect"`}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && search()}
                />
                <button className="search-btn" onClick={search}>Search</button>
              </div>
            </div>
            <div className="quick">
              <span className="label">Try:</span>
              {["code review", "essay outline", "cold email", "study buddy", "teach me"].map(c => (
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
              <button className="copy-mini">Copy prompt</button>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
