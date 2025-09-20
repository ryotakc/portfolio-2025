# Portfolio 2025

test
This is a portfolio that powers [ryotakc.com](https://www.ryotakc.com/), build on [Next.js](https://nextjs.org) and deployed to the cloud via [Vercel](https://vercel.com).

A modern, responsive portfolio website built with Next.js, TypeScript, MDX, and Tailwind CSS.

## Features

- **Responsive Design** : Optimized for all devices from mobile to desktop
- **Dark Mode** : Toggle between light and dark themes
- **Internationalization (i18n)** : Fully localized in English and Japanese
- **MDX Content** : Write content in Markdown with React components
- **View Transitions** : Smooth page transitions using React View Transitions
- **Modern Technologies** : Built with Next.js (App Router), TypeScript, and Tailwind CSS
- **Accessibility** : Focus on creating an accessible user experience

## Tech Stack

- **Framework** : [Next.js 15](https://nextjs.org/)
- **Language** : [TypeScript](https://www.typescriptlang.org/)
- **Styling** : [Tailwind CSS 4](https://tailwindcss.com/)
- **Components** : Custom components + [Shadcn UI](https://ui.shadcn.com/)
- **Content** : [MDX](https://mdxjs.com/)
- **Deployment** : [Vercel](https://vercel.com/)

## Internationalization

The site supports multiple languages through a simple directory structure. Content is organized by language code:

```
content/
├── en/                # English content
│   ├── index.mdx
│   ├── work.mdx
│   └── contact.mdx
└── ja/                # Japanese content
    ├── index.mdx
    ├── work.mdx
    └── contact.mdx
```

Language detection happens automatically based on browser preferences, or users can toggle between languages using the language switcher in the navigation.

## Customization

### Adding New Pages

1. Create a new MDX file in the `content/{locale}/` directory
2. Add the corresponding route in `app/[locale]/`

### Modifying Styles

The project uses Tailwind CSS for styling. Global styles are defined in `app/globals.css`.

### Components

The UI components are based on the Shadcn UI library, customized for this project. You can find them in the `components/ui/` directory.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel](https://vercel.com/).
