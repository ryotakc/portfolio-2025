import withMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkBreaks from "remark-breaks";
import remarkDirective from "remark-directive"; // Keep this import as it's used in remarkPlugins
import { remarkNotePlugin } from "./src/shared/lib/remark-note-plugin.mjs";
import { remarkOEmbed } from "./src/shared/lib/remark-oembed";
import remarkPreserveBreaks from "./src/shared/lib/remark-preserve-breaks";

export default withMDX({
  options: {
    remarkPlugins: [
      remarkDirective,
      remarkOEmbed,
      remarkNotePlugin,
      remarkBreaks,
      remarkPreserveBreaks,
    ],
  },
})({
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    viewTransition: true,
    // mdxRs: {
    //   mdxType: "gfm",
    // },
  },
  transpilePackages: ["shiki"],
  images: {
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
} satisfies NextConfig);
