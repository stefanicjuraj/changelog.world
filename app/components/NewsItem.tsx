import { ChangelogType } from "@/app/types/changelog";
import { getTypeColor } from "./TypeFilter";
import { getTechIcon, invertIconInDarkMode } from "@/app/utils/techIcons";

interface NewsItemProps {
  title: string;
  category: string;
  url: string;
  type: ChangelogType;
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

export function NewsItem({ title, category, type, url }: NewsItemProps) {
  const typeColorClass = getTypeColor(type);
  const cleanTitle = stripHtmlTags(title);
  const categoryIcon = getTechIcon(category);
  const shouldInvert = invertIconInDarkMode(category);

  return (
    <div className="py-4 border-b border-neutral-200 last:border-0">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 w-32 min-w-32 sm:w-40 sm:min-w-40 sm:gap-3">
          {categoryIcon && (
            <img
              src={categoryIcon}
              alt={`${category} icon`}
              className={`w-6 h-6 sm:w-7 sm:h-7 ${
                shouldInvert ? "dark:invert" : ""
              }`}
            />
          )}
          <div className="flex flex-col items-start">
            <span className="px-2 py-1 mb-2 text-sm text-neutral-600 bg-neutral-100 rounded w-fit">
              {category}
            </span>
            <p
              className={`px-2 py-1 text-sm font-medium rounded w-fit ${typeColorClass}`}
            >
              {type}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <div>
            <h2>{cleanTitle}</h2>
            <a
              href={url}
              className="mt-2 text-xs text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
