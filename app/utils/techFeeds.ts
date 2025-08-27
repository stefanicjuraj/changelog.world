import { ChangelogType } from "@/app/types/changelog";
import { NewsEntry } from "@/app/types/news";

export interface TechFeedMapping {
  [key: string]: string;
}

export const TECH_FEED_MAPPING: TechFeedMapping = {
  cpp: "FEED_URL_CPP",
  django: "FEED_URL_DJANGO",
  express: "FEED_URL_EXPRESS",
  github: "FEED_URL_GITHUB",
  gitlab: "FEED_URL_GITLAB",
  go: "FEED_URL_GO",
  java: "FEED_URL_JAVA",
  laravel: "FEED_URL_LARAVEL",
  nextjs: "FEED_URL_NEXTJS",
  nodejs: "FEED_URL_NODEJS",
  php: "FEED_URL_PHP",
  python: "FEED_URL_PYTHON",
  rails: "FEED_URL_RAILS",
  react: "FEED_URL_REACT",
  spring_boot: "FEED_URL_SPRING_BOOT",
  svelte: "FEED_URL_SVELTE",
  swift: "FEED_URL_SWIFT",
  tailwind: "FEED_URL_TAILWIND",
  vercel: "FEED_URL_VERCEL",
  vuejs: "FEED_URL_VUEJS",
  wordpress: "FEED_URL_WORDPRESS",
  deno: "FEED_URL_DENO",
  slack: "FEED_URL_SLACK",
};

export const ALL_TECHS = Object.keys(TECH_FEED_MAPPING);

export const ALL_TYPES: ChangelogType[] = [
  "Added",
  "Changed",
  "Deprecated",
  "Removed",
  "Fixed",
  "Security",
];

const TYPE_MAPPING: { [key: string]: ChangelogType } = {
  added: "Added",
  changed: "Changed",
  deprecated: "Deprecated",
  removed: "Removed",
  fixed: "Fixed",
  security: "Security",
};

export function getFeedUrls(requestedTechs?: string[]): string[] {
  let techsToInclude: string[];

  if (!requestedTechs || requestedTechs.length === 0) {
    techsToInclude = ALL_TECHS;
  } else {
    techsToInclude = requestedTechs.filter((tech) =>
      TECH_FEED_MAPPING.hasOwnProperty(tech.toLowerCase())
    );
  }

  return techsToInclude
    .map((tech) => process.env[TECH_FEED_MAPPING[tech.toLowerCase()]])
    .filter(Boolean) as string[];
}

export function filterNewsByType(
  newsEntries: NewsEntry[],
  requestedTypes?: string[]
): NewsEntry[] {
  if (!requestedTypes || requestedTypes.length === 0) {
    return newsEntries;
  }

  const validTypes: ChangelogType[] = requestedTypes
    .map(
      (type) =>
        TYPE_MAPPING[type.toLowerCase()] ||
        (ALL_TYPES.includes(type as ChangelogType)
          ? (type as ChangelogType)
          : null)
    )
    .filter((type): type is ChangelogType => type !== null);

  if (validTypes.length === 0) {
    return newsEntries;
  }

  return newsEntries.filter((entry) => validTypes.includes(entry.type));
}
