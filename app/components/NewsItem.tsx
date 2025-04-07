import { ChangelogType } from "@/types/changelog";
import { getTypeColor } from "./TypeFilter";
import { getTechIcon } from "@/app/utils/techIcons";

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

  return (
    <div className="py-4 border-b border-gray-200 last:border-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {categoryIcon && (
            <img
              src={categoryIcon}
              alt={`${category} icon`}
              className="w-5 h-5"
            />
          )}
          <div className="flex flex-col items-start">
            <span className="px-2 py-1 mb-2 text-sm rounded bg-gray-100 text-gray-600 w-fit">
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
            <h3>{cleanTitle}</h3>
            <a
              href={url}
              className="mt-2 text-blue-600 hover:underline text-xs"
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
