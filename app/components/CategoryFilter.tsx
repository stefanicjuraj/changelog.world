interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onSelectCategory: (category: string) => void;
}

import { getTechIcon } from "@/app/utils/techIcons";

export function CategoryFilter({
  categories,
  selectedCategories,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      <button
        onClick={() => {
          if (selectedCategories.length === categories.length) {
            categories.forEach((cat) => onSelectCategory(cat));
          } else {
            categories
              .filter((cat) => !selectedCategories.includes(cat))
              .forEach((cat) => onSelectCategory(cat));
          }
        }}
        className={`px-3 py-1 text-sm rounded transition-colors cursor-pointer ${
          selectedCategories.length === categories.length
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All
      </button>

      {categories.map((category) => {
        const iconSrc = getTechIcon(category);
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3 py-2 text-sm rounded transition-colors cursor-pointer flex items-center gap-2 ${
              selectedCategories.includes(category)
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {iconSrc && (
              <img src={iconSrc} alt={`${category} icon`} className="w-5 h-5" />
            )}
            {category}
          </button>
        );
      })}
    </div>
  );
}
