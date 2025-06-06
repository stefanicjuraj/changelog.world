import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    FEED_URL_REACT: process.env.FEED_URL_REACT || "",
    FEED_URL_NEXTJS: process.env.FEED_URL_NEXTJS || "",
    FEED_URL_TAILWIND: process.env.FEED_URL_TAILWIND || "",
    FEED_URL_VERCEL: process.env.FEED_URL_VERCEL || "",
    FEED_URL_SVELTE: process.env.FEED_URL_SVELTE || "",
    FEED_URL_VUEJS: process.env.FEED_URL_VUEJS || "",
    FEED_URL_GO: process.env.FEED_URL_GO || "",
    FEED_URL_PYTHON: process.env.FEED_URL_PYTHON || "",
    FEED_URL_PHP: process.env.FEED_URL_PHP || "",
    FEED_URL_SWIFT: process.env.FEED_URL_SWIFT || "",
    FEED_URL_RAILS: process.env.FEED_URL_RAILS || "",
    FEED_URL_ANGULAR: process.env.FEED_URL_ANGULAR || "",
    FEED_URL_LARAVEL: process.env.FEED_URL_LARAVEL || "",
    FEED_URL_DJANGO: process.env.FEED_URL_DJANGO || "",
    FEED_URL_CPP: process.env.FEED_URL_CPP || "",
    FEED_URL_GITHUB: process.env.FEED_URL_GITHUB || "",
    FEED_URL_JAVA: process.env.FEED_URL_JAVA || "",
    FEED_URL_EXPRESS: process.env.FEED_URL_EXPRESS || "",
    FEED_URL_SPRING_BOOT: process.env.FEED_URL_SPRING_BOOT || "",
  },
};

export default nextConfig;
