import type { MDXComponents } from "mdx/types";
import type { FC } from "react";
import { codeToHtml, createCssVariablesTheme } from "shiki";
import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

// @ts-ignore
import { InlineMath, BlockMath } from "react-katex";

import { BlockSideTitle } from "@/components/block-sidetitle";
import ReturnButton from "./components/return-back";
import { Tweet } from "./components/tweet-card";
import { BalancerWrapper } from "./components/mdx/balancer-wrapper";
import { IframeCard } from "./components/mdx/iframe-wrapper";
import { Highlighter } from "./components/ui/highlighter";
import { TypingAnimation } from "./components/ui/typing-animation";
// import Note from './components/note'

const cssVariablesTheme = createCssVariablesTheme({});

export const components: Record<string, FC<any>> = {
  h1: (props) => (
    <h1
      className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-5"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  p: (props) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic mb-10" {...props} />
  ),
  ul: (props) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  ol: (props) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),
  li: (props) => <li className="mt-2" {...props} />,
  table: (props) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  tr: (props) => <tr className="even:bg-muted m-0 border-t p-0" {...props} />,
  th: (props) => (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  a: ({ href, ...props }) => {
    return (
      <Link
        className="font-medium underline underline-offset-4 decoration-rurikon-300 hover:decoration-rurikon-600 focus:outline-none focus-visible:rounded-xs focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-opacity-50 focus-visible:ring-offset-2"
        href={href}
        draggable={false}
        {...(href?.startsWith("https://")
          ? {
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {})}
        {...props}
      />
    );
  },
  strong: (props) => <strong className="font-bold" {...props} />,
  pre: (props) => <pre className="mt-7 whitespace-pre md:whitespace-pre-wrap" {...props} />,
  code: async (props) => {
    if (typeof props.children === "string") {
      // Check if it's likely a code block (implied by context or length, or just use the highlight logic)
      // The previous logic highlighted everything that was a string. 
      // However, typically `inline code` in markdown doesn't have newlines or is short.
      // But `shiki` is expensive for every inline code.
      // User's request for inline code styling: <code className="bg-muted ...">
      
      // If props.className exists (e.g. language-js), it's definitely for highlighting (or at least intended).
      // Or if it's a code block from `pre`.
      // The current implementation is a bit aggressive. 
      // Let's assume if it has className or long content, we highlight?
      // Actually, let's keep the existing logic for highlighting BUT if it fails or returns plain, we wrap it?
      
      // Let's rely on the fact that code blocks usually come inside <pre> but here `code` component handles it.
      // If I look at the previous implementation:
      /*
      const code = await codeToHtml(props.children, { ... })
      return <code ... dangerouslySetInnerHTML ... />
      */
      
      // We will keep the highlight logic for now, but apply the user's inline style for the fallback.
      
      const code = await codeToHtml(props.children, {
        lang: "jsx", // Default lang?
        theme: cssVariablesTheme,
        transformers: [
          {
             pre: (hast) => {
              if (hast.children.length !== 1) {
                 // return hast; // Handle error gracefully?
                  throw new Error("<pre>: Expected a single <code> child");
              }
               // ...
              return hast.children[0];
            },
            postprocess(html) {
              return html.replace(/^<code>|<\/code>$/g, "");
            },
          },
        ],
      });

      return (
        <code
          className="inline shiki css-variables text-[0.805rem] sm:text-[13.8px] md:text-[0.92rem]"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      );
    }

    return (
      <code
        className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        {...props}
      />
    );
  },
  Tweet,
  Image,
  img: async ({ src, alt, title }) => {
    let img: React.ReactNode;

    if (src.startsWith("https://")) {
      img = (
        <Image
          className="mt-7"
          src={src}
          alt={alt}
          quality={95}
          placeholder="blur"
          draggable={false}
        />
      );
    } else {
      const image = await import(`./assets/images/${src}`);
      img = (
        <Image
          className="mt-7"
          src={image.default}
          alt={alt}
          quality={95}
          placeholder="blur"
          draggable={false}
        />
      );
    }

    if (title) {
      return <BlockSideTitle title={title}>{img}</BlockSideTitle>;
    }

    return img;
  },
  hr: (props) => <hr className="my-14 w-24 border-rurikon-border" {...props} />,
  BlockSideTitle,
  InlineMath,
  BlockMath,
  ReturnButton,
  IframeCard,
  Highlighter,
  TypingAnimation,
  // Custom Typography Components
  Lead: (props) => <p className="text-muted-foreground text-xl" {...props} />,
  Large: (props) => <div className="text-lg font-semibold" {...props} />,
  Small: (props) => <small className="text-sm leading-none font-medium" {...props} />,
  Muted: (props) => <p className="text-muted-foreground text-sm" {...props} />,
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...components,
  };
}
