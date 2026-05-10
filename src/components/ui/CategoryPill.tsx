interface CategoryPillProps {
  category: {
    id: string;
    slug: string;
    label: string;
    icon: string;
    count: number;
  };
  isActive?: boolean;
  onClick?: () => void;
}

export function CategoryPill({ category, isActive = false, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-amber-500 text-black font-medium'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <span className="text-lg">{category.icon}</span>
      <span className="font-medium">{category.label}</span>
      <span className="text-xs opacity-70 group-hover:opacity-100">
        ({category.count})
      </span>
    </button>
  );
}