import type { MDXComponents } from "mdx/types";
import Image from "next/image";

import { BlockMath, InlineMath } from "react-katex";

import { BlockSideTitle } from "@/components/block-sidetitle";
import { CodeBlock } from "./components/mdx/CodeBlock";
import { IframeCard } from "./components/mdx/iframe-wrapper";
import Instagram from "./components/mdx/instagram";
import LinkCard from "./components/mdx/link-card";
import { MDXImage } from "./components/mdx/MDXImage";
import OEmbed from "./components/mdx/oembed";
import Spotify from "./components/mdx/spotify";
import EmbeddedTweet from "./components/mdx/tweet";
import { Typography } from "./components/mdx/typography";
import YouTube from "./components/mdx/youtube";
import Note from "./components/note";
import ReturnButton from "./components/return-back";
import { Highlighter } from "./components/ui/highlighter";
import { TypingAnimation } from "./components/ui/typing-animation";

export const components: MDXComponents = {
  ...Typography,
  code: CodeBlock,
  Image,
  // biome-ignore lint/suspicious/noExplicitAny: MDX types incompatibility
  img: MDXImage as any,
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
