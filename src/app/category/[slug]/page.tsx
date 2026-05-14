import { getByCategory } from "@/lib/prompts";
import Link from "next/link";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { notFound } from "next/navigation";

const DIFF_CLASS: Record<string,string> = { beginner:"d-beg", intermediate:"d-int", advanced:"d-adv" };
const CAT_LABELS: Record<string,{ label: string; italic: string }> = {
  "study-learn":     { label: "Study & Learn",     italic: "Learning" },
  "write-create":    { label: "Write & Create",    italic: "Essays" },
  "code-dev":        { label: "Code & Dev",        italic: "Development" },
  teaching:          { label: "Teaching",          italic: "Explaining" },
  "business-marketing": { label: "Business & Marketing", italic: "Email" },
  "review-test":    { label: "Review & Test",    italic: "Feedback" },
  testing:           { label: "QA",               italic: "Testing" },
  "career-brand":    { label: "Career & Brand",    italic: "Career" },
  "image-prompts":   { label: "Image",             italic: "Generation" },
};

export async function generateStaticParams() {
  return Object.keys(CAT_LABELS).map(slug => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = CAT_LABELS[slug];
  if (!meta) notFound();
  const prompts = await getByCategory(slug);

  return (
    <div style={{ paddingTop: 80 }}>
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Category / {slug}</div>
              <h2>{meta.label} &amp; <span className="it">{meta.italic}</span></h2>
            </div>
            <p className="lede">{prompts.length} prompts in this category.</p>
          </div>
          <div className="browse-head">
            <Link href="/browse" style={{ fontFamily: "monospace", fontSize: 12, color: "var(--amber)" }}>← Back to Browse</Link>
            <div className="meta">Showing <span className="it">{prompts.length}</span> prompts</div>
          </div>
          <div className="browse-grid">
            {prompts.map(p => (
              <Link key={p.id} href={`/prompt/${p.slug}`} className="bcard">
                <div className="row1">
                  <span className="cat-tag">{meta.label}</span>
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
        </div>
      </section>
    </div>
  );
}