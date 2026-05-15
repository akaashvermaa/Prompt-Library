import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { SavedSection } from "@/components/sections/SavedSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { BrowseSection } from "@/components/sections/BrowseSection";

import { getAllPrompts, getFeaturedPrompts } from "@/lib/prompts";

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
            Save your favourites, browse the library, and copy a tested prompt in one click. 
          </p>
          <div className="actions">
            <Link href="/browse" className="btn-prim">
              Browse the library
              
            </Link>
            <Link href="/submit" className="btn-sec">Submit a prompt</Link>
          </div>
        </div>
      </section>
    </>
  );
}