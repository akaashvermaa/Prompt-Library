"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Prompt } from "@/types";
import { PlatformBadge } from "@/components/ui/PlatformBadge";

const TABS = ["all", "claude", "chatgpt", "gemini", "grok"] as const;

const CAT_LABEL: Record<string, string> = {
  study: "Study", coding: "Code", writing: "Writing", teaching: "Teaching",
  business: "Business", review: "Review", testing: "QA", linkedin: "LinkedIn",
};

export function BrowseSection({ prompts }: { prompts: Prompt[] }) {
  const [platform, setPlatform] = useState("all");

  // Synchronous — no useEffect, no loading flash
  const visible = useMemo(() => {
    if (platform === "all") return prompts;

    if (platform === "claude") {
      // For Claude, only show prompts that specifically include claude
      return prompts.filter(p => p.platforms.includes("claude" as never));
    } else {
      // For other platforms, show prompts that include that platform OR "any"
      return prompts.filter(p =>
        p.platforms.includes(platform as never) || p.platforms.includes("any" as never)
      );
    }
  }, [platform, prompts]);

  const shown = visible.slice(0, 12);

  return (
    <section id="browse">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Browse / {prompts.length} total</div>
            <h2>The whole <span className="it">stack</span>, filtered.</h2>
          </div>
          <p className="lede">Filter by model. Click any card to open the full prompt with copy &amp; variables.</p>
        </div>

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
          <div className="meta">Showing <span className="it">{shown.length}</span> of {visible.length}</div>
        </div>

        <div className="browse-grid">
          {shown.map(p => (
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
