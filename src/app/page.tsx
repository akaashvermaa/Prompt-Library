import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { Hero } from "@/components/sections/Hero";
import FeaturedPrompts from "@/components/sections/FeaturedPrompts";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <Hero />

        {/* Featured Prompts */}
        <FeaturedPrompts />

        {/* Category Grid */}
        <CategoryGrid />
      </div>
    </main>
  );
}
