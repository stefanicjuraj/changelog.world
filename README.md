# [changelog.world](https://changelog.world/)

<img src="./public/assets/images/changelog-world.png" width="100%" />

[changelog.world](https://changelog.world/) is a web application that displays tech changelogs and release notes in a developer-friendly format. Browse through the [web interface](https://changelog.world/) or access directly through the terminal with [CLI commands](#cli).

Supported: C++, Deno, Django, Express, GitHub, GitLab, Go, Java, Laravel, Next.js, Node.js, PHP, Python, Rails, React, Spring Boot, Svelte, Swift, Tailwind, Vercel, Vue.js, WordPress.

## Features

- **Web Interface**: Browse changelog entries with filtering by technology and type
- **CLI Access**: Direct terminal access via curl with pagination and limit support
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Automatic dark/light mode support
- **Smart Filtering**: Filter by technology categories and changelog types
- **Fast Updates**: Fresh content updated regularly from official sources

## CLI

```bash
curl https://changelog.world/cli
```

```bash
curl -L changelog.world/cli
```

#### Pagination

```bash
curl -L 'changelog.world/cli?page=<PAGE_NUMBER>'
```

#### Limit

```bash
curl -L 'changelog.world/cli?limit=<1-50>'
```

#### Tech

```bash
curl -L 'changelog.world/cli?tech=<TECH1,TECH2>'
```

Supported technologies: `cpp`, `deno`, `django`, `express`, `github`, `gitlab`, `go`, `java`, `laravel`, `nextjs`, `nodejs`, `php`, `python`, `rails`, `react`, `spring_boot`, `svelte`, `swift`, `tailwind`, `vercel`, `vuejs`, `wordpress`

#### Type

```bash
curl -L 'changelog.world/cli?type=<TYPE1,TYPE2>'
```

Supported types: `added`, `changed`, `deprecated`, `removed`, `fixed`, `security`
