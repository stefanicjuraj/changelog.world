import { ChangelogType } from "@/types/changelog";
import { getTypeColor } from "./TypeFilter";
import { getTechIcon, invertIconInDarkMode } from "@/app/utils/techIcons";

interface NewsItemProps {
  title: string;
  date?: string;
  category: string;
  url: string;
  type: ChangelogType;
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

function formatDate(dateString?: string): string | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function NewsItem({ title, date, category, type, url }: NewsItemProps) {
  const typeColorClass = getTypeColor(type);
  const cleanTitle = stripHtmlTags(title);
  const formattedDate = formatDate(date);
  const categoryIcon = getTechIcon(category);
  const shouldInvert = invertIconInDarkMode(category);

  return (
    <div className="py-4 border-b border-gray-200 last:border-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center w-40 gap-3 min-w-40">
          {categoryIcon && (
            <img
              src={categoryIcon}
              alt={`${category} icon`}
              className={`w-7 h-7 mr-1 ${shouldInvert ? "dark:invert" : ""}`}
            />
          )}
          <div className="flex flex-col items-start">
            <span className="px-2 py-1 mb-2 text-sm text-gray-600 bg-gray-100 rounded w-fit">
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
            <div className="mt-2">
              {formattedDate && <div className="text-xs">{formattedDate}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
