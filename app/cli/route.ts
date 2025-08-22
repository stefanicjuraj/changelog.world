import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";

  const isCurlRequest =
    userAgent.toLowerCase().includes("curl") ||
    userAgent.toLowerCase().includes("wget") ||
    userAgent.toLowerCase().includes("httpie") ||
    !userAgent.toLowerCase().includes("mozilla");

  if (isCurlRequest) {
    try {
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NODE_ENV === "production"
        ? "https://changelog.world"
        : "http://localhost:3001";

      const url = new URL(request.url);
      const queryString = url.search;

      const response = await fetch(`${baseUrl}/api/cli${queryString}`, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        return new NextResponse("Error: Failed to fetch changelog data", {
          status: 500,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        });
      }

      const textContent = await response.text();

      return new NextResponse(textContent, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    } catch (_error) {
      return new NextResponse("Error: Failed to fetch changelog data", {
        status: 500,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }
  }

  return NextResponse.redirect(new URL("/cli-view", request.url));
}
