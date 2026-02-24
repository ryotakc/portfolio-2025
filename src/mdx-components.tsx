import type { MDXComponents } from "mdx/types";
import Image from "next/image";

import { BlockMath, InlineMath } from "react-katex";
import ReturnButton from "@/features/navigation/return-back";
import { BlockSideTitle } from "@/shared/ui/block-sidetitle/block-sidetitle";
import { CodeBlock } from "@/shared/ui/mdx/CodeBlock";
import { IframeCard } from "@/shared/ui/mdx/iframe-wrapper";
import Instagram from "@/shared/ui/mdx/instagram";
import LinkCard from "@/shared/ui/mdx/link-card";
import { MDXImage } from "@/shared/ui/mdx/MDXImage";
import OEmbed from "@/shared/ui/mdx/oembed";
import { PreBlock } from "@/shared/ui/mdx/PreBlock";
import Spotify from "@/shared/ui/mdx/spotify";
import EmbeddedTweet from "@/shared/ui/mdx/tweet";
import { Typography } from "@/shared/ui/mdx/typography";
import YouTube from "@/shared/ui/mdx/youtube";
import Note from "@/shared/ui/note/note";
import { AnimatedThemeToggler } from "./shared/ui/animated-theme-toggler";
import { Highlighter } from "./shared/ui/highlighter";
import { TypingAnimation } from "./shared/ui/typing-animation";

export const components: MDXComponents = {
  ...Typography,
  code: CodeBlock,
  pre: PreBlock,
  Image,
  // biome-ignore lint/suspicious/noExplicitAny: MDX types incompatibility
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  INS: "ins",
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...components,
  };
}
