import { Category } from "@/types";
import Link from "next/link";
import { getAllPrompts } from "@/lib/prompts";

export async function CategoryGrid({ prompts }: { prompts?: any[] }) {
  let displayPrompts = prompts;

  if (!prompts) {
    const allPrompts = await getAllPrompts();
    // Group prompts by category
    const promptsByCategory: Record<string, any[]> = {};

    allPrompts.forEach((prompt) => {
      if (!promptsByCategory[prompt.category]) {
        promptsByCategory[prompt.category] = [];
      }
      promptsByCategory[prompt.category].push(prompt);
    });

    // Load categories
    const categories: Category[] = [
      {
        id: "study",
        slug: "study",
        label: "Study & Learning",
        description: "Master new concepts with proven learning techniques",
        icon: "📚",
        count: promptsByCategory["study"]?.length || 0
      },
      {
        id: "writing",
        slug: "writing",
        label: "Writing & Essays",
        description: "Compelling content creation for any audience",
        icon: "✍️",
        count: promptsByCategory["writing"]?.length || 0
      },
      {
        id: "coding",
        slug: "coding",
        label: "Code & Development",
        description: "Programming solutions and technical guidance",
        icon: "💻",
        count: promptsByCategory["coding"]?.length || 0
      },
      {
        id: "teaching",
        slug: "teaching",
        label: "Teaching & Explaining",
        description: "Break down complex topics for effective learning",
        icon: "🎓",
        count: promptsByCategory["teaching"]?.length || 0
      },
      {
        id: "business",
        slug: "business",
        label: "Business & Email",
        description: "Professional communication and business strategy",
        icon: "💼",
        count: promptsByCategory["business"]?.length || 0
      },
      {
        id: "review",
        slug: "review",
        label: "Review & Feedback",
        description: "Constructive criticism and improvement suggestions",
        icon: "🔍",
        count: promptsByCategory["review"]?.length || 0
      },
      {
        id: "testing",
        slug: "testing",
        label: "QA & Testing",
        description: "Quality assurance and testing strategies",
        icon: "🧪",
        count: promptsByCategory["testing"]?.length || 0
      },
      {
        id: "linkedin",
        slug: "linkedin",
        label: "LinkedIn & Career",
        description: "Professional networking and career development",
        icon: "🚀",
        count: promptsByCategory["linkedin"]?.length || 0
      }
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20"
          >
            <div className="text-4xl mb-4">{category.icon}</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">
              {category.label}
            </h3>
            <p className="text-gray-400 text-sm mb-4">{category.description}</p>
            <span className="text-amber-400 font-medium">
              {category.count} prompts
            </span>
          </Link>
        ))}
      </div>
    );
  }

  // If prompts are passed (for category pages), show them as prompt cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt) => (
        <Link
          key={prompt.id}
          href={`/prompt/${prompt.slug}`}
          className="group bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20"
        >
          <div className="flex items-center gap-2 mb-3">
            {prompt.platforms.slice(0, 2).map((platform: string) => (
              <span
                key={platform}
                className={`px-2 py-1 rounded text-xs font-medium ${
                  platform === 'chatgpt' ? 'bg-green-600' :
                  platform === 'claude' ? 'bg-orange-600' :
                  platform === 'gemini' ? 'bg-blue-600' :
                  'bg-gray-600'
                }`}
              >
                {platform}
              </span>
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
  );
}