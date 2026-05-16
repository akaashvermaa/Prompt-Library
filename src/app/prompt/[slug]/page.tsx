import { getBySlug, getAllPrompts, getPromptsByIds } from "@/lib/prompts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { PromptEditor, PromptActions } from "@/components/sections/PromptEditor";
import { TailorAgent } from "@/components/ui/TailorAgent";

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

          {/* ── HEADER BLOCK ── */}
          <div style={{ marginBottom: 48, paddingBottom: 40, borderBottom: '1px solid var(--line)' }}>
            <div className="crumb" style={{ marginBottom: 20 }}>
              <Link href="/browse">browse</Link>
              &nbsp;/&nbsp;
              <Link href={`/category/${prompt.category}`}>{prompt.category}</Link>
              &nbsp;/&nbsp;
              <span style={{ color: "var(--text)" }}>{prompt.slug}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 10, lineHeight: 1.1 }}>{prompt.title}</h2>
                <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '700px', lineHeight: 1.6 }}>{prompt.description}</p>
              </div>
              {/* Copy / Like actions top-right of header */}
              <PromptActions prompt={prompt} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Difficulty</span>
                <span style={{ textTransform: "capitalize", fontWeight: 500, fontSize: '14px' }}>{prompt.difficulty}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Category</span>
                <span style={{ fontWeight: 500, fontSize: '14px' }}>{prompt.category}</span>
              </div>
              {prompt.estimatedTime && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Est. Time</span>
                  <span style={{ fontWeight: 500, fontSize: '14px' }}>{prompt.estimatedTime}</span>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Platforms</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {prompt.platforms.map(pl => <PlatformBadge key={pl} platform={pl} />)}
                </div>
              </div>
              {prompt.variables && prompt.variables.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Inputs</span>
                  <span style={{ color: 'var(--amber)', fontWeight: 500, fontSize: '14px' }}>{prompt.variables.join(", ")}</span>
                </div>
              )}
              {prompt.tags && prompt.tags.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Tags</span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {prompt.tags.map(t => <span key={t} style={{ fontSize: '13px', color: 'var(--muted)' }}>#{t}</span>)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── PROMPT CODE BLOCK (full width) ── */}
          <div style={{ marginBottom: 48 }}>
            <PromptEditor prompt={prompt} />
          </div>

          {/* ── TAILOR AGENT (full width) ── */}
          <TailorAgent prompt={prompt} />

          {/* ── RELATED PROMPTS ── */}
          {related.length > 0 && (
            <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--line)' }}>
              <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>
                Related Prompts
              </div>
              <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                {related.map(rp => (
                  <Link href={`/prompt/${rp.slug}`} key={rp.id} className="related-item" style={{ minWidth: '260px', background: 'var(--surface)', padding: '20px', borderRadius: '10px', border: '1px solid var(--line)', textDecoration: 'none', display: 'block' }}>
                    <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '6px', color: 'var(--text)' }}>{rp.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{rp.description}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {prompt.exampleOutput && (
            <div className="example-panel" style={{ marginTop: 32 }}>
              <div className="example-head">Example Output</div>
              <div className="example-body">{prompt.exampleOutput}</div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}