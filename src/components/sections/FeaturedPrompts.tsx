"use client";

import { useState, useEffect } from "react";
import { Prompt } from "@/types";
import Link from "next/link";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { CopyButton } from "@/components/ui/CopyButton";
import { getFeaturedPrompts } from "@/lib/prompts";

export default function FeaturedPrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPrompts = async () => {
      try {
        const featured = await getFeaturedPrompts();
        setPrompts(featured);
      } catch (error) {
        console.error("Failed to load featured prompts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedPrompts();
  }, []);

  if (loading) {
    return (
      <section className="mb-20">
        <div className="text-center">
          <div className="inline-block animate-pulse bg-gray-800 rounded-lg p-8">
            <div className="h-6 bg-gray-700 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-96 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-80"></div>
          </div>
        </div>
      </section>
    );
  }

  if (prompts.length === 0) {
    return null;
  }

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Featured Prompts
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Handpicked prompts that deliver exceptional results
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {prompts.slice(0, 4).map((prompt) => (
          <div
            key={prompt.id}
            className="group bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {prompt.platforms.slice(0, 2).map((platform) => (
                    <PlatformBadge key={platform} platform={platform} />
                  ))}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  prompt.difficulty === 'beginner' ? 'bg-green-900/30 text-green-400' :
                  prompt.difficulty === 'intermediate' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-red-900/30 text-red-400'
                }`}>
                  {prompt.difficulty}
                </span>
              </div>
              <CopyButton text={prompt.prompt} />
            </div>

            {/* Title and Description */}
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
              {prompt.title}
            </h3>
            <p className="text-gray-300 mb-4 line-clamp-2">
              {prompt.description}
            </p>

            {/* Preview */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">Preview</span>
                <Link href={`/prompt/${prompt.slug}`} className="text-xs text-amber-400 hover:text-amber-300 transition-colors">
                  View full →
                </Link>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                <p className="text-gray-400 text-xs leading-relaxed font-mono">
                  {prompt.prompt.length > 100
                    ? prompt.prompt.substring(0, 100) + "..."
                    : prompt.prompt
                  }
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {prompt.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-800 text-gray-400 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* View All Featured */}
      <div className="text-center mt-12">
        <Link
          href="/browse?featured=true"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          View All Featured Prompts
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}