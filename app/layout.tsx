import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Script from "next/script";
export const metadata: Metadata = {
  title: "changelog.world",
  description: "Tech News in a Developer-Friendly Format",
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
