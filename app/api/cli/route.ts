import { NextResponse } from "next/server";
import { NewsEntry } from "@/types/news";
import { ChangelogType } from "@/types/changelog";
import { getFeedUrls } from "@/app/utils/techFeeds";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const techsParam = searchParams.get("tech");
    const requestedTechs = techsParam
      ? techsParam.split(",").map((t) => t.trim())
      : undefined;

    if (page < 1 || limit < 1 || limit > 50) {
      return new NextResponse(
        "Error: Invalid page or limit parameters. Page must be ≥ 1, limit must be 1-50.",
        {
          status: 400,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        }
      );
    }

    const feedUrls = getFeedUrls(requestedTechs);

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

    const textOutput = formatAsText(newsEntries, page, limit);

    return new NextResponse(textOutput, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching feeds:", error);
    return new NextResponse("Error: Failed to fetch changelog data", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}

function formatAsText(
  entries: NewsEntry[],
  page: number = 1,
  limit: number = 10
): string {
  const totalEntries = entries.length;
  const totalPages = Math.ceil(totalEntries / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const pageEntries = entries.slice(startIndex, endIndex);

  let output = "\nCHANGELOG.WORLD\n";
  output += "===================\n\n";

  if (totalEntries === 0) {
    output += "No changelog entries found.\n";
    return output;
  }

  output += `Page ${page} of ${totalPages} (${totalEntries} total entries)\n`;
  output += `Showing entries ${startIndex + 1}-${Math.min(
    endIndex,
    totalEntries
  )}\n\n`;

  if (pageEntries.length === 0) {
    output += "No entries found for this page.\n\n";
  } else {
    pageEntries.forEach((entry, index) => {
      const date = entry.date
        ? new Date(entry.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "No date";

      output += `[${entry.category.toUpperCase()}] ${entry.type.toUpperCase()}\n`;
      output += `${entry.title}\n`;
      output += `Date: ${date}\n`;
      output += `Source: ${entry.url}\n`;

      if (index < pageEntries.length - 1) {
        output += "\n";
      }
    });

    output += "\n\n";
  }

  if (page > 1) {
    output += `Previous page: curl 'https://changelog.world/api/cli?page=${
      page - 1
    }'\n`;
  }

  if (page < totalPages) {
    output += `Next page:     curl 'https://changelog.world/api/cli?page=${
      page + 1
    }'\n`;
  }

  output += `Jump to page:  curl 'https://changelog.world/api/cli?page=<PAGE_NUMBER>'\n`;
  output += `Change limit:  curl 'https://changelog.world/api/cli?page=1&limit=<1-50>'\n`;
  output += `Filter tech:  curl 'https://changelog.world/api/cli?tech=<TECH1,TECH2>'\n`;
  output += `Available tech: react,nextjs,tailwind,vercel,svelte,vuejs,go,python,php,swift,rails,laravel,django,cpp,github,java,express,spring_boot,nodejs,gitlab\n`;

  if (page > 1 || page < totalPages) {
    output += "\n";
    if (page > 1) {
      output += `← Page ${page - 1}`;
    }
    if (page > 1 && page < totalPages) {
      output += "  |  ";
    }
    if (page < totalPages) {
      output += `Page ${page + 1} →`;
    }
  }

  return output;
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
