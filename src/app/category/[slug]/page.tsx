import { getByCategory } from "@/lib/prompts";
import { notFound } from "next/navigation";
import { CategoryContent } from "./CategoryClient";

export const revalidate = 0;

const CAT_LABELS: Record<string, { label: string; italic: string }> = {
  "study-learn": { label: "Academic", italic: "Study" },
  "write-create": { label: "Creative", italic: "Writing" },
  "code-dev": { label: "Software", italic: "Engineering" },
  "business-marketing": { label: "Strategic", italic: "Marketing" },
  "review-test": { label: "Critical", italic: "Review" },
  "career-brand": { label: "Professional", italic: "Growth" },
  "image-prompts": { label: "Visual", italic: "Generation" },
  "ai-agents": { label: "Agentic", italic: "Workflows" },
  instagram: { label: "Instagram", italic: "Socials" },
  youtube: { label: "YouTube", italic: "Video" },
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
      <section className="page-fade">
        <div className="wrap">
          <div className="sec-head" style={{ display: 'block', marginBottom: '48px' }}>
            <div>
              <div className="eyebrow">Category / {slug}</div>
              <h2>{meta.label} <span className="it">{meta.italic}</span></h2>
              <p className="lede" style={{ marginTop: '24px', opacity: 0.8, maxWidth: '600px' }}>
                {prompts.length} architectures curated specifically for {meta.label} {meta.italic}. 
                Use the search below to find specific tools within this collection.
              </p>
            </div>
          </div>

          <CategoryContent 
            prompts={prompts} 
            categoryLabel={`${meta.label} ${meta.italic}`} 
          />
        </div>
      </section>
    </div>
  );
}