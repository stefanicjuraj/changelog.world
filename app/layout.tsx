import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Script from "next/script";
export const metadata: Metadata = {
  title: "changelog.world",
  description: "Tech News in a Developer-Friendly Format",
  keywords: [
    "Tech News",
    "Developer News",
    "Programming News",
    "Frameworks News",
    "Programming",
    "Frameworks",
    "Programming News",
    "Frameworks News",
    "Changelog",
  ],
  openGraph: {
    title: "changelog.world",
    description: "Tech News in a Developer-Friendly Format",
    url: "https://changelog.world",
    siteName: "changelog.world",
    images: [
      {
        url: "https://changelog.world/assets/images/changelog.world-dark.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/icons/favicon.svg" />
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "a16a101f9b04410cb252f3e363ebb489"}'
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
