import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { BrowseSection } from "@/components/sections/BrowseSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedSection />
      <CategoriesSection />
      <BrowseSection />

      {/* CTA */}
      <section className="cta-section">
        <div className="wrap">
          <h2>
            Stop rewriting<br />
            the <span className="it">same</span> prompt.
          </h2>
          <p className="sub">
            Save your favourites, browse the library, and copy a tested prompt in one click. Free, no account.
          </p>
          <div className="actions">
            <Link href="/browse" className="btn-prim">
              Browse the library
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="#" className="btn-sec">Submit a prompt</Link>
          </div>
        </div>
      </section>
    </>
  );
}