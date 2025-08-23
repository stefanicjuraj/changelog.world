import { ChangelogType } from "@/types/changelog";
import { NewsEntry } from "@/types/news";

export interface TechFeedMapping {
  [key: string]: string;
}

export const TECH_FEED_MAPPING: TechFeedMapping = {
  react: "FEED_URL_REACT",
  nextjs: "FEED_URL_NEXTJS",
  tailwind: "FEED_URL_TAILWIND",
  vercel: "FEED_URL_VERCEL",
  svelte: "FEED_URL_SVELTE",
  vuejs: "FEED_URL_VUEJS",
  go: "FEED_URL_GO",
  python: "FEED_URL_PYTHON",
  php: "FEED_URL_PHP",
  swift: "FEED_URL_SWIFT",
  rails: "FEED_URL_RAILS",
  laravel: "FEED_URL_LARAVEL",
  django: "FEED_URL_DJANGO",
  cpp: "FEED_URL_CPP",
  github: "FEED_URL_GITHUB",
  java: "FEED_URL_JAVA",
  express: "FEED_URL_EXPRESS",
  spring_boot: "FEED_URL_SPRING_BOOT",
  nodejs: "FEED_URL_NODEJS",
  gitlab: "FEED_URL_GITLAB",
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
