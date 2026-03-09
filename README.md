[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ryotakc/portfolio-2025)

# Portfolio 2025

A modern, responsive portfolio website powering [ryotakc.com](https://www.ryotakc.com/), built with [Next.js](https://nextjs.org) and deployed via [Vercel](https://vercel.com).

## Features

- **Responsive Design** : Optimized for all devices from mobile to desktop
- **Dark Mode** : Toggle between light and dark themes
- **Internationalization (i18n)** : Fully localized in English and Japanese
- **MDX Content** : Write content in Markdown with React components
- **View Transitions** : Smooth page transitions using React View Transitions
- **Web Haptics** : Tactile feedback on interactive elements for mobile
- **Accessibility** : Focus on creating an accessible user experience

## Tech Stack

- **Framework** : [Next.js 15](https://nextjs.org/) (App Router)
- **Language** : [TypeScript](https://www.typescriptlang.org/)
- **UI Library** : [React 19](https://react.dev/) (Experimental)
- **Styling** : [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation** : [Motion](https://motion.dev/), [Rough Notation](https://roughnotation.com/)
- **Content** : [MDX](https://mdxjs.com/) (via `next-mdx-remote`, `remark`, `rehype`, `shiki`)
- **Components** : Custom components + [Shadcn UI](https://ui.shadcn.com/)
- **Formatter / Linter** : [Biome](https://biomejs.dev/)
- **Git Hooks** : [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged)
- **Analytics** : [Vercel Analytics](https://vercel.com/analytics)
- **Deployment** : [Vercel](https://vercel.com/)
- **Package Manager** : [pnpm](https://pnpm.io/)

## Project Structure

The project follows [Feature-Sliced Design (FSD)](https://feature-sliced.design/) architecture:

```
src/
├── app/                  # Next.js App Router (pages, layouts, API routes)
│   ├── [locale]/         # Locale-based dynamic routing (en / ja)
│   ├── api/              # API routes (OG image generation, etc.)
│   └── globals.css       # Global styles & Tailwind config
├── entities/             # Business entities (project, etc.)
├── features/             # Feature modules (breadcrumb, navigation, theme-switcher, etc.)
├── shared/               # Shared utilities, UI components, config, types, assets
│   ├── ui/               # Reusable UI components
│   ├── lib/              # Utility functions
│   ├── config/           # App configuration
│   ├── types/            # Shared TypeScript types
│   └── assets/           # Static assets
├── widgets/              # Composite UI blocks (navbar, footer, floating-menu, etc.)
├── mdx-components.tsx    # MDX component mappings
└── middleware.ts         # Next.js middleware (locale detection, etc.)

content/
├── en/                   # English content
│   ├── index.mdx
│   ├── contact.mdx
│   ├── blog/
│   ├── work/
│   └── ...
└── ja/                   # Japanese content
    ├── index.mdx
    ├── contact.mdx
    ├── blog/
    ├── work/
    └── ...

public/
└── images/               # Static images

scripts/                  # Build / migration helper scripts
```

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/)

### Getting Started

```bash
# Install dependencies
pnpm install

# Start the development server (with Turbopack)
pnpm dev
```

### Available Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build the application for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code using Biome |
| `pnpm check` | Check code quality using Biome |

### Git Hooks

Pre-commit hooks are configured via Husky + lint-staged to automatically run formatting and linting checks before each commit.

## Internationalization

The site supports English and Japanese through locale-based routing (`/en/...`, `/ja/...`).

- Content files are organized under `content/{locale}/`
- Locale detection is handled by `middleware.ts`
- Users can switch languages via the language switcher in the navigation

### Adding Content

1. Create a new MDX file in `content/{locale}/` (e.g., `content/en/blog/my-post.mdx`)
2. The page will be automatically available at `/{locale}/blog/my-post`

## Customization

### Styles

Global styles and Tailwind CSS configuration are defined in `src/app/globals.css`.

### Components

Reusable UI components are located in `src/shared/ui/`. Feature-specific components live within their respective feature or widget directories.

## Deployment

The site is deployed to [Vercel](https://vercel.com/) with automatic deployments on push.
