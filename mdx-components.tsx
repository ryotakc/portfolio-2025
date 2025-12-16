import type { MDXComponents } from "mdx/types";
import Image from "next/image";

// @ts-ignore
import { InlineMath, BlockMath } from "react-katex";

import { BlockSideTitle } from "@/components/block-sidetitle";
import ReturnButton from "./components/return-back";
import { IframeCard } from "./components/mdx/iframe-wrapper";
import { Highlighter } from "./components/ui/highlighter";
import { TypingAnimation } from "./components/ui/typing-animation";
import Note from "./components/note";
import LinkCard from "./components/mdx/link-card";
import OEmbed from "./components/mdx/oembed";
import YouTube from "./components/mdx/youtube";
import EmbeddedTweet from "./components/mdx/tweet";
import Spotify from "./components/mdx/spotify";
import Instagram from "./components/mdx/instagram";

import { Typography } from "./components/mdx/typography";
import { CodeBlock } from "./components/mdx/CodeBlock";
import { MDXImage } from "./components/mdx/MDXImage";

export const components: MDXComponents = {
  ...Typography,
  code: CodeBlock,
  Image,
  img: MDXImage as any, // MDX types incompatibility workaround
  BlockSideTitle,
  InlineMath,
  BlockMath,
  ReturnButton,
  IframeCard,
  Highlighter,
  TypingAnimation,
  Note,
  LinkCard,
  OEmbed,
  YouTube,
  EmbeddedTweet,
  Spotify,
  Instagram,
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...components,
  };
}
