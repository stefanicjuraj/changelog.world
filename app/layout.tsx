import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Script from "next/script";
export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
