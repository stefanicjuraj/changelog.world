# [changelog.world](https://changelog.world/)

<img src="./public/assets/images/changelog.world.png" width="100%" />

[changelog.world](https://changelog.world/) is a web application that displays technology news in a developer-friendly format. Browse through the web interface or access directly in the terminal with CLI commands.

Supported: Python, Java, C++, Go, PHP, Swift, React, Angular, Vue, Next.js, Svelte, Ruby on Rails, Express, Laravel, Spring, Django, Tailwind CSS, Vercel, GitHub.

## Features

- 🌐 **Web Interface**: Browse changelog entries with filtering by technology and type
- 🖥️ **CLI Access**: Direct terminal access via curl with pagination and limit support
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🌙 **Dark Mode**: Automatic dark/light mode support
- 🔍 **Smart Filtering**: Filter by technology categories and changelog types
- ⚡ **Fast Updates**: Fresh content updated regularly from official sources

## CLI

Access changelog data directly from your terminal using curl:

```bash
curl https://changelog.world/api/cli
```

### Options

- `page`: Page number (default: 1)
- `limit`: Number of entries per page (default: 10)
- `tech`: Technology (default: all)
- `type`: Type (default: all)

```bash
Pagination:  curl 'https://changelog.world/api/cli?page=<PAGE_NUMBER>'
Limit:       curl 'https://changelog.world/api/cli?page=1&limit=<1-50>'
Tech:        curl 'https://changelog.world/api/cli?tech=<TECH1,TECH2>'
Options:     react,nextjs,tailwind,vercel,svelte,vuejs,go,python,php,swift,rails,laravel,django,cpp,github,java,express,spring_boot,nodejs,gitlab
Type:        curl 'https://changelog.world/api/cli?type=<TYPE1,TYPE2>'
Options:     added,changed,deprecated,removed,fixed,security
```

### Examples

```bash
# Get latest 10 changelog entries
curl https://changelog.world/api/cli

# Navigate through changelog pages
curl 'https://changelog.world/api/cli?page=2'
curl 'https://changelog.world/api/cli?page=3'

# Limit the number of entries per page
curl 'https://changelog.world/api/cli?limit=20'

# Filter by technology
curl 'https://changelog.world/api/cli?tech=react'

# Filter by type
curl 'https://changelog.world/api/cli?type=added'

# Filter by technology and type
curl 'https://changelog.world/api/cli?tech=react&type=added'
```
