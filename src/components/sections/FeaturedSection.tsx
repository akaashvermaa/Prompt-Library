import { getFeaturedPrompts } from "@/lib/prompts";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import Link from "next/link";

const SIZES = ["large", "tall", "", "", "wide", ""];


const ArrowIcon = () => null;

export async function FeaturedSection() {
  const prompts = await getFeaturedPrompts();
  const shown = prompts.slice(0, 6);

  return (
    <section id="featured">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Featured / handpicked</div>
            <h2>The ones we keep <span className="it">coming back</span> to.</h2>
          </div>
          <p className="lede">A rotating shelf of prompts our editors actually use. Updated weekly old favourites archive into Browse.</p>
        </div>

        <div className="feat-grid">
          {shown.map((prompt, i) => (
            <Link key={prompt.id} href={`/prompt/${prompt.slug}`} className={`pcard ${SIZES[i] ?? ""}`}>
              <div className="top">
                <span className="num">P / {String(i + 1).padStart(3, "0")}</span>
              </div>
              <h3>{prompt.title}</h3>
              <p>{prompt.description}</p>
              {prompt.prompt.length > 0 && (
                <div className="preview">{prompt.prompt.substring(0, 180)}</div>
              )}
              <div className="foot">
                <div className="tags">{prompt.tags.slice(0, 3).map(t => `#${t}`).join(" ")}</div>
                <span className="arrow"><ArrowIcon /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
