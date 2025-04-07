import { NewsItem } from "./NewsItem";
import { NewsEntry } from "@/types/news";

interface NewsListProps {
  news: NewsEntry[];
}

export function NewsList({ news }: NewsListProps) {
  return (
    <div className="max-w-screen-md mx-auto divide-y divide-gray-200">
      {news.length === 0 ? (
        <p className="py-4 text-center text-gray-500">No news entries found</p>
      ) : (
        news.map((item, index) => {
          const timeKey = item.date || index;

          return (
            <div
              key={item.id ?? `${item.title}-${timeKey}-${index}`}
              className="flex justify-between items-center py-4"
            >
              <div className="flex-1">
                <NewsItem
                  title={item.title}
                  date={item.date}
                  category={item.category}
                  type={item.type}
                  url={item.url}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
