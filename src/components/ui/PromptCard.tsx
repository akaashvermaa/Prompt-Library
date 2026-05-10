import Link from "next/link";
import { PlatformBadge } from "./PlatformBadge";
import { CopyButton } from "./CopyButton";
import { Eye } from "lucide-react";

interface PromptCardProps {
  prompt: {
    id: string;
    slug: string;
    title: string;
    description: string;
    prompt: string;
    platforms: string[];
    difficulty: string;
    featured: boolean;
  };
}

export function PromptCard({ prompt }: PromptCardProps) {
  // Truncate prompt preview
  const previewText = prompt.prompt.length > 120
    ? prompt.prompt.substring(0, 120) + "..."
    : prompt.prompt;

  return (
    <div className="group bg-gray-800 hover:bg-gray-700 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/20 border border-gray-700 hover:border-amber-500/30">
      {/* Platform Badges */}
      <div className="flex items-center gap-2 mb-4">
        {prompt.platforms.slice(0, 3).map((platform) => (
          <PlatformBadge key={platform} platform={platform} />
        ))}
        {prompt.platforms.length > 3 && (
          <span className="text-xs text-gray-400">+{prompt.platforms.length - 3}</span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-3 text-white group-hover:text-amber-400 transition-colors duration-200">
        {prompt.title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {prompt.description}
      </p>

      {/* Preview */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-medium text-gray-500">Preview</span>
          <Link href={`/prompt/${prompt.slug}`} className="text-xs text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
            <Eye className="w-3 h-3" />
            View full
          </Link>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
          <p className="text-gray-300 text-xs leading-relaxed font-mono">
            {previewText}
          </p>
        </div>
      </div>

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
  );
}