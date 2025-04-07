import withMDX from '@next/mdx'
import type { NextConfig } from 'next'

export default withMDX()({
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // redirects: async () => [
  //   {
  //     source: '/posts/:slug',
  //     destination: '/thoughts/:slug',
  //     permanent: false,
  //   },
  // ],
  experimental: {
    viewTransition: true,
    mdxRs: {
      mdxType: 'gfm',
    },
  },
  transpilePackages: ['shiki'],
  images: {
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
} satisfies NextConfig)
