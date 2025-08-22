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
# Get latest 10 changelog entries
curl 'https://changelog.world/api/cli'

# Navigate through changelog pages
curl 'https://changelog.world/api/cli?page=2'
curl 'https://changelog.world/api/cli?page=3'

# Customize changelog entries per page
curl 'https://changelog.world/api/cli?limit=20'
curl 'https://changelog.world/api/cli?page=2&limit=5'

# Filter by technology
curl 'https://changelog.world/api/cli?tech=react'
```
