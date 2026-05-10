import PromptGrid from "@/components/sections/PromptGrid";

export default function BrowsePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Browse All Prompts
        </h1>
        <PromptGrid />
      </div>
    </main>
  );
}