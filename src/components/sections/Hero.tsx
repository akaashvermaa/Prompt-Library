import { Search, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden mb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-100"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-50"></div>

      <div className="relative container mx-auto px-4 py-32 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-8 transform hover:scale-105 transition-transform">
            <Sparkles className="w-10 h-10 text-black" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent animate-pulse">
            PromptVault
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            A curated prompt library for Claude, ChatGPT, Gemini, and Grok.
            <br />
            <span className="text-amber-400 font-semibold">One place. Every use case. Copy and go.</span>
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/browse"
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
            >
              Browse All Prompts
            </Link>
            <Link
              href="#categories"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Explore Categories
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for prompts..."
                className="w-full pl-12 pr-6 py-4 bg-gray-800/80 backdrop-blur-sm text-white rounded-xl border border-gray-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}