import { Suspense } from "react";
import { getAllPrompts } from "@/lib/prompts";
import { BrowseContent } from "./BrowseClient";

export const revalidate = 0;

export default async function BrowsePage() {
  // Fetch from Supabase on the server
  const prompts = await getAllPrompts();

  return (
    <div className="page-pt">
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Browse / {prompts.length} prompts</div>
              <h2>The whole <span className="it">stack</span>, filtered.</h2>
            </div>
            <p className="lede">Filter by model or category. Live search - no submit needed.</p>
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