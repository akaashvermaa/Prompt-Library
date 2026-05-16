import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { SavedSection } from "@/components/sections/SavedSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { BrowseSection } from "@/components/sections/BrowseSection";

import { getAllPrompts, getFeaturedPrompts } from "@/lib/prompts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const prompts = await getAllPrompts();
  const featured = await getFeaturedPrompts();
  
  return (
    <>
      <Hero />
      <Marquee />
      <SavedSection featuredPrompts={featured} />
      <CategoriesSection />
      <BrowseSection prompts={prompts} />

      {/* CTA */}
      <section className="cta-section">
        <div className="wrap">
          <h2>
            Stop rewriting<br />
            the <span className="it">same</span> prompt.
          </h2>
          <p className="sub">
            Save your favourites, tailor templates with AI, and build your own personal vault of high-performance prompts.
          </p>
          <div className="actions">
            <Link href="/browse" className="btn-prim">
              Browse the library
            </Link>
            <Link href="/liked" className="btn-sec">View your vault</Link>
          </div>
        </div>
      </section>
    </>
  );
}