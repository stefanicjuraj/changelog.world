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

export const FRAMEWORK_TECHS = [
  "react",
  "nextjs",
  "svelte",
  "vuejs",
  "rails",
  "laravel",
  "django",
  "express",
  "spring_boot",
];

export const PROGRAMMING_TECHS = [
  "go",
  "python",
  "php",
  "swift",
  "cpp",
  "java",
];

export const ALL_TECHS = Object.keys(TECH_FEED_MAPPING);

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

export function getFrameworkFeedUrls(requestedTechs?: string[]): string[] {
  let techsToInclude: string[];

  if (!requestedTechs || requestedTechs.length === 0) {
    techsToInclude = FRAMEWORK_TECHS;
  } else {
    techsToInclude = requestedTechs.filter((tech) =>
      FRAMEWORK_TECHS.includes(tech.toLowerCase())
    );
  }

  return techsToInclude
    .map((tech) => process.env[TECH_FEED_MAPPING[tech.toLowerCase()]])
    .filter(Boolean) as string[];
}

export function getProgrammingFeedUrls(requestedTechs?: string[]): string[] {
  let techsToInclude: string[];

  if (!requestedTechs || requestedTechs.length === 0) {
    techsToInclude = PROGRAMMING_TECHS;
  } else {
    techsToInclude = requestedTechs.filter((tech) =>
      PROGRAMMING_TECHS.includes(tech.toLowerCase())
    );
  }

  return techsToInclude
    .map((tech) => process.env[TECH_FEED_MAPPING[tech.toLowerCase()]])
    .filter(Boolean) as string[];
}
