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
// import Note from './components/note'

const cssVariablesTheme = createCssVariablesTheme({});

export const components: Record<string, FC<any>> = {
  h1: (props) => (
    <h1 className="font-semibold mb-7 text-rurikon-600 text-2xl" {...props}>
      <BalancerWrapper>{props.children}</BalancerWrapper>
    </h1>
  ),
  h2: (props) => (
    <h2
      className="font-semibold mt-14 mb-7 text-rurikon-600 text-xl"
      {...props}
    >
      <BalancerWrapper>{props.children}</BalancerWrapper>
    </h2>
  ),
  h3: (props) => (
    <h3
      className="font-semibold mt-14 mb-7 text-rurikon-600 text-lg"
      {...props}
    >
      <BalancerWrapper>{props.children}</BalancerWrapper>
    </h3>
  ),
  // ol: (props) => (
  //   <ol className="mt-7 list-decimal list-inside pl-4 space-y-2" {...props} />
  // ),

  // ul: (props) => (
  //   <ul className="mt-7 list-disc list-inside pl-4 space-y-2" {...props} />
  // ),

  ul: (props) => (
    <ul
      className="mt-7 list-disc list-inside marker:text-rurikon-200 pl-5"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-7 list-decimal list-inside marker:text-rurikon-200 pl-5"
      {...props}
    />
  ),
  li: (props) => <li className="pl-1.5" {...props} />,
  a: ({ href, ...props }) => {
    return (
      <Link
        className="break-words decoration-from-font underline underline-offset-2 decoration-rurikon-300 hover:decoration-rurikon-600 focus:outline-none focus-visible:rounded-xs focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-opacity-50 focus-visible:ring-offset-2"
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
  p: (props) => (
    <p className="mt-7" {...props}>
      {/* {props.children} */}
      <BalancerWrapper>{props.children}</BalancerWrapper>
      {/* <Balancer>{props.children}</Balancer> */}
    </p>
  ),

  blockquote: ({ children }) => (
    <blockquote className="my-5 flex gap-4 text-gray-600 dark:text-gray-400">
      <div className="w-1 bg-gray-300 dark:bg-gray-600" />
      <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </blockquote>
  ),

  // blockquote: (props) => (
  //   <blockquote
  //     className="my-5 pl-4 border-l-4 border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 items-center"
  //   >
  //     <Balancer>{props.children}</Balancer>
  //   </blockquote>
  // ),

  pre: (props) => (
    <pre className="mt-7 whitespace-pre md:whitespace-pre-wrap" {...props} />
  ),
  code: async (props) => {
    if (typeof props.children === "string") {
      const code = await codeToHtml(props.children, {
        lang: "jsx",
        theme: cssVariablesTheme,
        // theme: 'min-light',
        // theme: 'snazzy-light',
        transformers: [
          {
            // Since we're using dangerouslySetInnerHTML, the code and pre
            // tags should be removed.
            pre: (hast) => {
              if (hast.children.length !== 1) {
                throw new Error("<pre>: Expected a single <code> child");
              }
              if (hast.children[0].type !== "element") {
                throw new Error("<pre>: Expected a <code> child");
              }
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

    return <code className="inline" {...props} />;
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
  // Note,
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...components,
  };
}
