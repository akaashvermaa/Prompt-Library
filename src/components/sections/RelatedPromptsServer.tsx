import { Prompt } from "@/types";
import Link from "next/link";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { CopyButton } from "@/components/ui/CopyButton";
import { getByCategory } from "@/lib/prompts";

interface RelatedPromptsProps {
  currentPrompt: Prompt;
}

export default async function RelatedPrompts({ currentPrompt }: RelatedPromptsProps) {
  try {
    const sameCategory = await getByCategory(currentPrompt.category);

    // Filter out current prompt and sort by:
    // 1. Featured status first
    // 2. Then by platform match
    // 3. Then by number of matching tags
    const filtered = sameCategory
      .filter(p => p.id !== currentPrompt.id)
      .sort((a, b) => {
        // Featured first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;

        // Then platform match
        const aPlatformMatch = a.platforms.some(p =>
          currentPrompt.platforms.includes(p)
        );
        const bPlatformMatch = b.platforms.some(p =>
          currentPrompt.platforms.includes(p)
        );
        if (aPlatformMatch && !bPlatformMatch) return -1;
        if (!aPlatformMatch && bPlatformMatch) return 1;

        // Then tag match
        const aTagMatches = a.tags.filter(tag =>
          currentPrompt.tags.includes(tag)
        ).length;
        const bTagMatches = b.tags.filter(tag =>
          currentPrompt.tags.includes(tag)
        ).length;

        return bTagMatches - aTagMatches;
      })
      .slice(0, 4);

    if (filtered.length === 0) {
      return null;
    }

    return (
      <section className="mt-16">
        <h3 className="text-xl font-semibold mb-6">Related Prompts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((prompt) => (
            <div
              key={prompt.id}
              className="group bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20 border border-gray-700 hover:border-amber-500/30"
            >
              {/* Platform Badges */}
              <div className="flex items-center gap-2 mb-3">
                {prompt.platforms.slice(0, 2).map((platform) => (
                  <PlatformBadge key={platform} platform={platform} />
                ))}
              </div>

              {/* Title */}
              <Link href={`/prompt/${prompt.slug}`}>
                <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-amber-400 transition-colors">
                  {prompt.title}
                </h3>
              </Link>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {prompt.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Difficulty */}
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    prompt.difficulty === 'beginner' ? 'bg-green-900/30 text-green-400' :
                    prompt.difficulty === 'intermediate' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-red-900/30 text-red-400'
                  }`}>
                    {prompt.difficulty}
                  </span>

                  {/* Featured */}
                  {prompt.featured && (
                    <span className="text-xs px-2 py-1 bg-amber-900/30 text-amber-400 rounded-full font-medium">
                      Featured
                    </span>
                  )}
                </div>

                {/* Copy Button */}
                <CopyButton text={prompt.prompt} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Failed to load related prompts:", error);
    return null;
  }
}