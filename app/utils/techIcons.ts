export const getTechIcon = (tech: string): string | null => {
  switch (tech.toLowerCase()) {
    case "python":
      return "/assets/icons/python.svg";
    case "github":
      return "/assets/icons/github.svg";
    case "java":
      return "/assets/icons/java.svg";
    case "c++":
      return "/assets/icons/c++.svg";
    case "php":
      return "/assets/icons/php.svg";
    case "django":
      return "/assets/icons/django.svg";
    case "ruby on rails":
      return "/assets/icons/rubyonrails.svg";
    case "tailwind css":
      return "/assets/icons/tailwindcss.svg";
    case "go":
      return "/assets/icons/go.svg";
    case "swift":
      return "/assets/icons/swift.svg";
    case "svelte":
      return "/assets/icons/svelte.svg";
    case "laravel":
      return "/assets/icons/laravel.svg";
    case "next.js":
      return "/assets/icons/nextjs.svg";
    case "express":
      return "/assets/icons/express.svg";
    case "react":
      return "/assets/icons/react.svg";
    case "vue.js":
      return "/assets/icons/vue.svg";
    case "vercel":
      return "/assets/icons/vercel.svg";
    case "spring":
      return "/assets/icons/spring.svg";
    case "node.js":
      return "/assets/icons/nodejs.svg";
    case "gitlab":
      return "/assets/icons/gitlab.svg";
    case "wordpress":
      return "/assets/icons/wordpress.svg";
    case "deno":
      return "/assets/icons/deno.svg";
    case "slack":
      return "/assets/icons/slack.svg";
    case "scala":
      return "/assets/icons/scala.svg";
    case "figma":
      return "/assets/icons/figma.svg";
    case "netlify":
      return "/assets/icons/netlify.svg";
    default:
      return null;
  }
};

export const invertIconInDarkMode = (tech: string): boolean => {
  const invertIcons = ["github", "vercel", "next.js", "go", "express"];
  return invertIcons.includes(tech.toLowerCase());
};
