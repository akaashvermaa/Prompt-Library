import { notFound } from "next/navigation";
import { getByCategory } from "@/lib/prompts";
import { CategoryGrid } from "@/components/sections/CategoryGrid";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const prompts = await getByCategory(params.slug);

  if (prompts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          {params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Prompts
        </h1>
        <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
          Explore curated prompts for {params.slug} tasks and workflows
        </p>
        <CategoryGrid prompts={prompts} />
      </div>
    </main>
  );
}