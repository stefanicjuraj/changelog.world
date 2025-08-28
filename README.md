# [changelog.world](https://changelog.world/)

![changelog.world](./public/assets/gifs/changelog-world.gif)

[changelog.world](https://changelog.world/) is a web application that displays tech changelogs and release notes in a developer-friendly format. Browse through the [web interface](https://changelog.world/) or access directly through the terminal with [CLI commands](#cli).

Supported: C++, Deno, Django, Express, Figma, GitHub, GitLab, Go, Java, Laravel, Next.js, Node.js, PHP, Python, Rails, React, React Native, Scala, Slack, Spring Boot, Svelte, Swift, Tailwind, Vercel, Vue.js, WordPress.

## CLI

<img src="./public/assets/images/changelog-world.png" width="100%" />

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

Supported: `cpp`, `deno`, `django`, `express`, `figma`, `github`, `gitlab`, `go`, `java`, `laravel`, `netlify`, `nextjs`, `nodejs`, `php`, `python`, `rails`, `react`, `react_native`, `scala`, `slack`, `spring_boot`, `svelte`, `swift`, `tailwind`, `vercel`, `vuejs`, `wordpress`

#### Type

```bash
curl -L 'changelog.world/cli?type=<TYPE1,TYPE2>'
```

Supported: `added`, `changed`, `deprecated`, `removed`, `fixed`, `security`
