import { Suspense } from "react";
import { getAllPrompts } from "@/lib/prompts";
import { BrowseContent } from "./BrowseClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BrowsePage() {
  // Fetch from Supabase on the server
  const prompts = await getAllPrompts();

  return (
    <div className="page-pt">
      <section>
        <div className="wrap">
          <div className="sec-head" style={{ display: 'block' }}>
            <div className="eyebrow">Browse / {prompts.length} architectures</div>
            <h2 style={{ marginBottom: '24px' }}>The whole <span className="it">stack</span>, filtered.</h2>
            <p className="lede" style={{ maxWidth: '600px' }}>
              Explore our curated archive of high-performance instructions. Use the filters below to find exactly what you need for your workflow.
            </p>
          </div>
          <Suspense fallback={
            <div className="loading-text">
              Loading…
            </div>
          }>
            <BrowseContent prompts={prompts} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}