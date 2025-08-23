import { NewsItem } from "./NewsItem";
import { NewsEntry } from "@/types/news";

interface NewsListProps {
  news: NewsEntry[];
}

function formatDateHeader(dateString?: string): string {
  if (!dateString) return "No Date";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function groupNewsByDate(news: NewsEntry[]): { [date: string]: NewsEntry[] } {
  return news.reduce((groups, item) => {
    const dateKey = item.date || "no-date";
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(item);
    return groups;
  }, {} as { [date: string]: NewsEntry[] });
}

function sortDateGroups(groups: {
  [date: string]: NewsEntry[];
}): [string, NewsEntry[]][] {
  return Object.entries(groups).sort(([dateA], [dateB]) => {
    if (dateA === "no-date") return 1;
    if (dateB === "no-date") return -1;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
}

export function NewsList({ news }: NewsListProps) {
  if (news.length === 0) {
    return (
      <div className="max-w-screen-md mx-auto">
        <p className="py-4 text-center text-neutral-500">
          No news entries found
        </p>
      </div>
    );
  }

  const groupedNews = groupNewsByDate(news);
  const sortedGroups = sortDateGroups(groupedNews);

  return (
    <div className="max-w-screen-md mx-auto">
      {sortedGroups.map(([date, items]) => (
        <div key={date} className="mb-8">
          <div className="mb-2">
            <h2 className="text-lg text-neutral-800 dark:text-neutral-200">
              {formatDateHeader(date === "no-date" ? undefined : date)}
            </h2>
          </div>
          <div className="divide-y divide-neutral-200">
            {items.map((item, index) => {
              const timeKey = item.date || index;
              return (
                <div
                  key={item.id ?? `${item.title}-${timeKey}-${index}`}
                  className="py-4 first:pt-0"
                >
                  <NewsItem
                    title={item.title}
                    category={item.category}
                    type={item.type}
                    url={item.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
