import { getBySlug, getAllPrompts, getPromptsByIds } from "@/lib/prompts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { PromptEditor } from "@/components/sections/PromptEditor";

export async function generateStaticParams() {
  const all = await getAllPrompts();
  return all.map(p => ({ slug: p.slug }));
}

export default async function PromptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = await getBySlug(slug);
  if (!prompt) notFound();

  const related = await getPromptsByIds(prompt.relatedPrompts || []);

  return (
    <div className="page-pt" style={{ paddingBottom: 80 }}>
      <section className="detail-section" style={{ padding: "40px 0 100px" }}>
        <div className="wrap">
          <div className="detail-grid" style={{ alignItems: "stretch" }}>
            {/* Left */}
            <div className="detail-left">
              <div className="crumb">
                <Link href="/browse">browse</Link>
                &nbsp;/&nbsp;
                <Link href={`/category/${prompt.category}`}>{prompt.category}</Link>
                &nbsp;/&nbsp;
                <span style={{ color: "var(--text)" }}>{prompt.slug}</span>
              </div>
              <h2>{prompt.title}</h2>
              <p className="desc">{prompt.description}</p>
              
              <div className="detail-meta">
                <div>
                  <div className="lbl">Difficulty</div>
                  <div className="val" style={{ textTransform: "capitalize", color: "var(--muted)" }}>
                    {prompt.difficulty}
                  </div>
                </div>
                <div>
                  <div className="lbl">Category</div>
                  <div className="val">{prompt.category}</div>
                </div>
                {prompt.estimatedTime && (
                  <div>
                    <div className="lbl">Est. Time</div>
                    <div className="val" style={{ color: "var(--muted)" }}>
                      {prompt.estimatedTime}
                     </div>
                  </div>
                )}
                <div>
                  <div className="lbl">Works with</div>
                  <div className="val">
                    <div className="badges">
                      {prompt.platforms.map(pl => <PlatformBadge key={pl} platform={pl} />)}
                    </div>
                  </div>
                </div>
                {prompt.variables && prompt.variables.length > 0 && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <div className="lbl">Required Inputs</div>
                    <div className="val">
                      <div className="badges" style={{ flexWrap: "wrap", gap: "8px" }}>
                        {prompt.variables.map(v => (
                          <span key={v} className="var-badge">[{v}]</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div style={{ gridColumn: "1 / -1" }}>
                  <div className="lbl">Tags</div>
                  <div className="val mono" style={{ fontSize: 13, color: "var(--muted)" }}>
                    {prompt.tags.map(t => `#${t}`).join("  ")}
                  </div>
                </div>
              </div>

              {related.length > 0 && (
                <div style={{ marginTop: 40, paddingTop: 30, borderTop: "1px solid var(--line)" }}>
                  <div className="lbl" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>
                    Related Prompts
                  </div>
                  <div className="related-list">
                    {related.map(rp => (
                      <Link href={`/prompt/${rp.slug}`} key={rp.id} className="related-item">
                        <div className="related-title">{rp.title}</div>
                        <div className="related-desc">{rp.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right - Protected Editor */}
            <div className="detail-right-col">
              <PromptEditor prompt={prompt} />

              {prompt.exampleOutput && (
                <div className="example-panel">
                  <div className="example-head">
                    Example Output
                  </div>
                  <div className="example-body">
                    {prompt.exampleOutput}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}