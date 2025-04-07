import { ChangelogType } from "@/types/changelog";
import { getTypeColor } from "./TypeFilter";

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

function formatDate(dateString?: string): string {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

export function NewsItem({ title, date, category, type, url }: NewsItemProps) {
  const typeColorClass = getTypeColor(type);
  const cleanTitle = stripHtmlTags(title);
  const formattedDate = formatDate(date);

  return (
    <div className="py-4 border-b border-gray-200 last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-40 text-sm">
          <div className="mb-3">
            <span className="px-2 py-1 text-sm rounded bg-gray-100 text-gray-600 whitespace-nowrap">
              {category}
            </span>
          </div>
          <p
            className={`inline-block px-2 py-1 text-sm font-medium rounded ${typeColorClass}`}
          >
            {type}
          </p>
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
