import { getBySlug, getAllPrompts } from "@/lib/prompts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { CopyButton } from "@/components/ui/CopyButton";



export async function generateStaticParams() {
  const all = await getAllPrompts();
  return all.map(p => ({ slug: p.slug }));
}

export default async function PromptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = await getBySlug(slug);
  if (!prompt) notFound();

  const lines = prompt.prompt.split("\n");

  return (
    <div style={{ paddingTop: 80 }}>
      <section className="detail-section">
        <div className="wrap">
          <div className="detail-grid">
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
                <div>
                  <div className="lbl">Works with</div>
                  <div className="val">
                    <div className="badges">
                      {prompt.platforms.map(pl => <PlatformBadge key={pl} platform={pl} />)}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="lbl">Tags</div>
                  <div className="val mono" style={{ fontSize: 13, color: "var(--muted)" }}>
                    {prompt.tags.map(t => `#${t}`).join("  ")}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Editor panel */}
            <div className="detail-right">
              <div className="editor-head">
                <div className="dots">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </div>
                <div className="file">prompt-{prompt.slug}.md</div>
                <CopyButton text={prompt.prompt} />
              </div>
              <div className="editor-body">
                {lines.map((line, i) => (
                  <div key={i} className="ln">
                    <span className="ln-num">{i + 1}</span>
                    <span>{line || "\u00a0"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}