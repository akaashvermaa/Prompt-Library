"use client";

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Prompt } from "@/types";
import Link from "next/link";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { CategoryPill } from "@/components/ui/CategoryPill";
import { getAllPrompts, filterPrompts } from "@/lib/prompts";

export default function PromptGrid() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const searchParams = useSearchParams();

  useEffect(() => {
    const loadPrompts = async () => {
      const allPrompts = await getAllPrompts();
      setPrompts(allPrompts);

      // Initialize filters from URL
      const search = searchParams.get('search') || '';
      const platform = searchParams.get('platform') || 'all';
      const category = searchParams.get('category') || 'all';
      const difficulty = searchParams.get('difficulty') || 'all';

      setSearchTerm(search);
      setSelectedPlatform(platform);
      setSelectedCategory(category);
      setSelectedDifficulty(difficulty);

      // Apply filters
      const filtered = await filterPrompts({
        search,
        platform: platform === 'all' ? undefined : platform,
        category: category === 'all' ? undefined : category,
        difficulty: difficulty === 'all' ? undefined : difficulty
      });

      setFilteredPrompts(filtered);
    };
    loadPrompts();
  }, [searchParams]);

  const handleSearch = async () => {
    const filtered = await filterPrompts({
      search: searchTerm,
      platform: selectedPlatform === 'all' ? undefined : selectedPlatform,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      difficulty: selectedDifficulty === 'all' ? undefined : selectedDifficulty
    });
    setFilteredPrompts(filtered);

    // Update URL
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedPlatform !== 'all') params.set('platform', selectedPlatform);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedDifficulty !== 'all') params.set('difficulty', selectedDifficulty);

    const newUrl = params.toString() ? `/browse?${params.toString()}` : '/browse';
    window.history.replaceState({}, '', newUrl);
  };

  const platforms = ["all", "chatgpt", "claude", "gemini", "grok"];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search prompts..."
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* Category Filters */}
        <div>
          <h3 className="text-white font-semibold mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {["all", "study", "writing", "coding", "teaching", "business", "review", "testing", "linkedin"].map((category) => (
              <CategoryPill
                key={category}
                category={{
                  id: category,
                  slug: category,
                  label: category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1),
                  icon: category === 'all' ? '🔍' : getCategoryIcon(category),
                  count: 0
                }}
                isActive={selectedCategory === category}
                onClick={() => {
                  setSelectedCategory(category);
                  handleSearch();
                }}
              />
            ))}
          </div>
        </div>

        {/* Platform and Difficulty Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Platform Filters */}
          <div>
            <h3 className="text-white font-semibold mb-3">Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedPlatform === platform
                      ? platform === "all"
                        ? "bg-amber-500 text-black"
                        : "bg-gray-700 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedPlatform(platform);
                    handleSearch();
                  }}
                >
                  {platform === "all" ? "All Platforms" : platform}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filters */}
          <div>
            <h3 className="text-white font-semibold mb-3">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedDifficulty === difficulty
                      ? difficulty === "all"
                        ? "bg-amber-500 text-black"
                        : "bg-gray-700 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedDifficulty(difficulty);
                    handleSearch();
                  }}
                >
                  {difficulty === "all" ? "All Levels" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <Link
              key={prompt.id}
              href={`/prompt/${prompt.slug}`}
              className="group bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20"
            >
              <div className="flex items-center gap-2 mb-3">
                {prompt.platforms.slice(0, 2).map((platform) => (
                  <PlatformBadge key={platform} platform={platform} />
                ))}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                {prompt.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {prompt.description}
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${
                  prompt.difficulty === 'beginner' ? 'text-green-400' :
                  prompt.difficulty === 'intermediate' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {prompt.difficulty}
                </span>
                {prompt.featured && (
                  <span className="text-amber-400 text-xs">Featured</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No prompts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

function getCategoryIcon(category: string): string {
  switch (category) {
    case 'study': return '📚';
    case 'writing': return '✍️';
    case 'coding': return '💻';
    case 'teaching': return '🎓';
    case 'business': return '💼';
    case 'review': return '🔍';
    case 'testing': return '🧪';
    case 'linkedin': return '🚀';
    default: return '📝';
  }
}