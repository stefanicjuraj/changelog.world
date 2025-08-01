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
    case "angular":
      return "/assets/icons/angular.svg";
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
    default:
      return null;
  }
};

export const invertIconInDarkMode = (tech: string): boolean => {
  const invertIcons = ["github", "vercel", "next.js", "go", "express"];
  return invertIcons.includes(tech.toLowerCase());
};
