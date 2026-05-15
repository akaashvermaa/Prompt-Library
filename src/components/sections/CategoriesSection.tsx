import { getAllPrompts } from "@/lib/prompts";
import Link from "next/link";

const CATEGORIES = [
  { slug: "study-learn",     label: "Academic",     italic: "Study" },
  { slug: "write-create",    label: "Creative",    italic: "Writing" },
  { slug: "code-dev",        label: "Software",        italic: "Engineering" },
  { slug: "business-marketing", label: "Strategic", italic: "Marketing" },
  { slug: "review-test",    label: "Critical",    italic: "Review" },
  { slug: "career-brand",    label: "Professional",   italic: "Growth" },
  { slug: "image-prompts",   label: "Visual",           italic: "Generation" },
  { slug: "ai-agents",       label: "Agentic",          italic: "Workflows" },
  { slug: "instagram",       label: "Instagram",        italic: "Socials" },
  { slug: "youtube",         label: "YouTube",          italic: "Video" },
];

const ArrowIcon = () => null;

export async function CategoriesSection() {
  const all = await getAllPrompts();
  const counts: Record<string, number> = {};
  all.forEach(p => { counts[p.category] = (counts[p.category] ?? 0) + 1; });

  return (
    <section id="categories" className="cats-section">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Categories / index</div>
            <h2>Sorted by <span className="it">craft</span>, not by trend.</h2>
          </div>
          <p className="lede">Ten working categories. Each prompt belongs to exactly one. No "misc", no tag soup.</p>
        </div>
        <div className="cats">
          {CATEGORIES.map((cat, i) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} className="cat">
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="name">{cat.label} <span className="it">{cat.italic}</span></span>
              <span className="count">{counts[cat.slug] ?? 0} prompts</span>
              <span className="arrow"><ArrowIcon /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
