import { NextResponse } from "next/server";
import { NewsEntry } from "@/types/news";
import { ChangelogType } from "@/types/changelog";

export async function GET() {
  try {
    const feedUrls = [
      process.env.FEED_URL_REACT,
      process.env.FEED_URL_NEXTJS,
      process.env.FEED_URL_TAILWIND,
      process.env.FEED_URL_VERCEL,
      process.env.FEED_URL_SVELTE,
      process.env.FEED_URL_VUEJS,
      process.env.FEED_URL_GO,
      process.env.FEED_URL_PYTHON,
      process.env.FEED_URL_PHP,
      process.env.FEED_URL_SWIFT,
      process.env.FEED_URL_RAILS,
      process.env.FEED_URL_ANGULAR,
      process.env.FEED_URL_LARAVEL,
      process.env.FEED_URL_DJANGO,
      process.env.FEED_URL_CPP,
      process.env.FEED_URL_GITHUB,
      process.env.FEED_URL_JAVA,
      process.env.FEED_URL_EXPRESS,
      process.env.FEED_URL_SPRING_BOOT,
    ].filter(Boolean) as string[];

    const allNewsPromises = feedUrls.map(async (url) => {
      try {
        const response = await fetch(url, { next: { revalidate: 3600 } });

        if (!response.ok) {
          console.error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
          return [];
        }

        const data = await response.json();
        return transformToNewsEntries(data, data.title || "Unknown");
      } catch (error) {
        console.error(`Error fetching:`, error);
        return [];
      }
    });

    const allNewsArrays = await Promise.all(allNewsPromises);

    const mergedEntries = allNewsArrays.flat().sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

    const newsEntries = mergedEntries.map((entry, index) => ({
      ...entry,
      id: index + 1,
    }));

    return NextResponse.json(newsEntries);
  } catch (error) {
    console.error("Error fetching feeds:", error);
    return NextResponse.json(
      { error: "Failed to fetch feeds" },
      { status: 500 }
    );
  }
}

function transformToNewsEntries(data: any, feedTitle: string): NewsEntry[] {
  if (
    data &&
    data.version &&
    data.version.includes("jsonfeed.org") &&
    Array.isArray(data.items)
  ) {
    return data.items.map((item: any, index: number) =>
      transformItem(item, index, feedTitle)
    );
  }

  if (Array.isArray(data)) {
    return data.map((item, index) => transformItem(item, index, feedTitle));
  }

  if (data && Array.isArray(data.items)) {
    return data.items.map((item: any, index: number) =>
      transformItem(item, index, feedTitle)
    );
  }

  if (data && typeof data === "object") {
    return [transformItem(data, 0, feedTitle)];
  }

  console.error("Unexpected data format:", data);
  return [];
}

function transformItem(item: any, index: number, feedTitle: string): NewsEntry {
  let title = "";
  if (item.title) {
    title = item.title.replace(/\s+/g, " ").trim();
  }

  const url = item.url || item.link || "";

  let description = "";
  let contentHtml = "";
  if (item.content_html) {
    try {
      contentHtml = item.content_html.trim();

      description = item.content_html
        .replace(/<[^>]*>/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();

      if (description.length > 200) {
        description = description.substring(0, 197) + "...";
      }
    } catch (error) {
      console.error("Error processing content_html:", error);
      description = title || "";
    }
  } else {
    description = item.description || item.content || "";
  }

  let parsedDate: Date | null = null;
  if (contentHtml) {
    parsedDate = parseDateFromString(contentHtml);
  }

  const pubDate =
    (parsedDate ? parsedDate.toISOString() : null) ||
    item.date_published ||
    item.pubDate ||
    item.date ||
    new Date().toISOString();
  const date = new Date(pubDate).toISOString();

  const category = feedTitle || "General";

  let type: ChangelogType = "Added";

  if (
    title.toLowerCase().includes("security") ||
    description.toLowerCase().includes("security")
  ) {
    type = "Security";
  } else if (
    title.toLowerCase().includes("fix") ||
    description.toLowerCase().includes("fix")
  ) {
    type = "Fixed";
  } else if (
    title.toLowerCase().includes("remov") ||
    description.toLowerCase().includes("remov")
  ) {
    type = "Removed";
  } else if (
    title.toLowerCase().includes("deprecat") ||
    description.toLowerCase().includes("deprecat")
  ) {
    type = "Deprecated";
  } else if (
    title.toLowerCase().includes("chang") ||
    description.toLowerCase().includes("chang")
  ) {
    type = "Changed";
  }

  return {
    id: index + 1,
    title,
    description,
    date,
    category,
    type,
    url,
    content_html: contentHtml,
  };
}

function parseDateFromString(text: string): Date | null {
  text = text.replace(/<[^>]*>/g, "").trim();

  const timestamp = Date.parse(text);
  if (!isNaN(timestamp)) {
    return new Date(timestamp);
  }

  const monthDayYearRegex = /([A-Za-z]+)\s+(\d+)(st|nd|rd|th)?,\s+(\d{4})/;
  const monthDayYearMatch = text.match(monthDayYearRegex);
  if (monthDayYearMatch) {
    const [, month, day, , year] = monthDayYearMatch;
    const dateStr = `${month} ${day}, ${year}`;
    const parsedDate = new Date(dateStr);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  const dayMonthYearRegex = /(\d+)\s+([A-Za-z]+)\s+(\d{4})/;
  const dayMonthYearMatch = text.match(dayMonthYearRegex);
  if (dayMonthYearMatch) {
    const [, day, month, year] = dayMonthYearMatch;
    const dateStr = `${month} ${day}, ${year}`;
    const parsedDate = new Date(dateStr);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  const monthDayYearRegex2 = /([A-Za-z]+)\s+(\d+)\s+(\d{4})/;
  const monthDayYearMatch2 = text.match(monthDayYearRegex2);
  if (monthDayYearMatch2) {
    const [, month, day, year] = monthDayYearMatch2;
    const dateStr = `${month} ${day}, ${year}`;
    const parsedDate = new Date(dateStr);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  return null;
}
