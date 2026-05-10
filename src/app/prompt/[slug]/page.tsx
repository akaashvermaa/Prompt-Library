import { notFound } from "next/navigation";
import { getBySlug } from "@/lib/prompts";
import { CopyButton } from "@/components/ui/CopyButton";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import RelatedPrompts from "@/components/sections/RelatedPromptsServer";

interface PromptPageProps {
  params: {
    slug: string;
  };
}

export default async function PromptPage({ params }: PromptPageProps) {
  const prompt = await getBySlug(params.slug);

  if (!prompt) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              {prompt.platforms.map((platform) => (
                <PlatformBadge key={platform} platform={platform} />
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {prompt.title}
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              {prompt.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Difficulty: {prompt.difficulty}</span>
              {prompt.featured && (
                <span className="text-amber-400">Featured</span>
              )}
            </div>
          </div>

          {/* Prompt Content */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Prompt</h2>
              <CopyButton text={prompt.prompt} />
            </div>
            <pre className="whitespace-pre-wrap text-gray-200 font-mono text-sm leading-relaxed">
              {prompt.prompt}
            </pre>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
      <RelatedPrompts currentPrompt={prompt} />
    </>
  );
}