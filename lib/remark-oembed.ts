import { type Plugin } from "unified";
import type { Root, Paragraph, Link } from "mdast";
import { visit } from "unist-util-visit";
import { unfurl } from "unfurl.js";
import { isParagraph, isSimpleUrlLink } from "./mdast-util";

export type headingProperties = Record<string, string>;

export type Transformer = {
  hName: string | ((url: URL) => Promise<string>);
  hProperties?: headingProperties | ((url: URL) => Promise<headingProperties>);
  match: (url: URL) => Promise<boolean>;
};

export type RemarkOEmbedPluginOptions = {
  transformers: Transformer[];
};

// 他で match しなかった場合のデフォルトの transformer
// url 先が oEmbed に対応しているかどうかをチェックする
export const oEmbedTransformer: Readonly<Transformer> = {
  hName: async (url) => {
    try {
      const metadata = await unfurl(url.href);
      return metadata.oEmbed != null ? "OEmbed" : "LinkCard"; // 'OEmbed' and 'LinkCard' component names
    } catch (e) {
      console.error("Failed to unfurl:", e);
      return "LinkCard";
    }
  },
  hProperties: async (url) => {
    try {
      const metadata = await unfurl(url.href);
      if (metadata.oEmbed != null) {
        // oEmbed data requires handling serialized JSON or passing props
        // Since we can't easily pass complex objects in MDX AST to JSX without serialization
        // We will pass it as a JSON string or individual props.
        // Let's pass the whole object as a prop for flexibility.
        return { url: url.href, oEmbed: JSON.stringify(metadata.oEmbed) };
      }
      return { url: url.href } as headingProperties;
    } catch (e) {
      return { url: url.href } as headingProperties;
    }
  },
  match: async () => true, // Always match as fallback
};

export const youTubeTransformer: Readonly<Transformer> = {
  hName: "YouTube",
  hProperties: async (url): Promise<headingProperties> => {
    const convertToEmbedUrl = (url: string): string => {
      const match = url.match(/^.*(watch\?v=|embed\/)([^#&?]*).*/);

      if (match && match[2]) {
        return "https://www.youtube.com/embed/" + match[2];
      } else {
        throw new Error("Invalid YouTube URL");
      }
    };

    return {
      src: convertToEmbedUrl(url.href),
      title: "YouTube video embed",
    };
  },
  match: async (url) => {
    return (
      url.hostname === "www.youtube.com" ||
      url.hostname === "youtube.com" ||
      url.hostname === "youtu.be"
    );
  },
};

export const twitterTransformer: Readonly<Transformer> = {
  hName: "EmbeddedTweet",
  hProperties: async (url) => {
    const match = url.pathname.match(/\/status\/(\d+)/);
    if (!match) throw new Error("Invalid Tweet URL");
    return { id: match[1] };
  },
  match: async (url) => {
    return (
      (url.hostname === "twitter.com" ||
        url.hostname === "www.twitter.com" ||
        url.hostname === "x.com" ||
        url.hostname === "www.x.com") &&
      url.pathname.includes("/status/")
    );
  },
};

export const spotifyTransformer: Readonly<Transformer> = {
  hName: "Spotify",
  hProperties: async (url) => {
    // Just pass the URL, the component handles the embed conversion or we do it here.
    // Let's do it here to be cleaner.
    // https://open.spotify.com/track/123 -> https://open.spotify.com/embed/track/123
    const embedUrl = url.href.replace("open.spotify.com/", "open.spotify.com/embed/");
    return { link: embedUrl };
  },
  match: async (url) => {
    return url.hostname === "open.spotify.com";
  },
};

export const instagramTransformer: Readonly<Transformer> = {
  hName: "Instagram",
  hProperties: async (url) => {
    return { url: url.href };
  },
  match: async (url) => {
    return (
      (url.hostname === "instagram.com" || url.hostname === "www.instagram.com") &&
      (url.pathname.includes("/p/") ||
        url.pathname.includes("/reel/") ||
        url.pathname.includes("/tv/"))
    );
  },
};

const defaultOptions: RemarkOEmbedPluginOptions = {
  transformers: [
    twitterTransformer,
    youTubeTransformer,
    spotifyTransformer,
    instagramTransformer,
    oEmbedTransformer,
  ],
};

export const remarkOEmbed: Plugin<[RemarkOEmbedPluginOptions?], Root> = (
  options = defaultOptions,
) => {
  return async (tree, file) => {
    const transforms: Promise<void>[] = [];

    visit(tree, "paragraph", (paragraph: Paragraph) => {
      if (!isSimpleUrlLink(paragraph)) return;

      // Check if we should process this link
      // isSimpleUrlLink checks structure.
      const link = paragraph.children[0] as Link; // We know it's a link from check
      const url = new URL(link.url);

      const transform = async () => {
        for (const transformer of options!.transformers) {
          // options is defaulted above
          if (!(await transformer.match(url))) continue;

          const hName = await getHName(transformer, url);
          const hProperties = await getHProperties(transformer, url);

          // Replace paragraph with mdxJsxFlowElement
          // We need to construct the node MANUALLY as per remark-link-card example relative to AST
          // modifying "paragraph" to "mdxJsxFlowElement"

          Object.assign(paragraph, {
            type: "mdxJsxFlowElement",
            name: hName,
            attributes: Object.entries(hProperties).map(([name, value]) => ({
              type: "mdxJsxAttribute",
              name,
              value,
            })),
            children: [],
          });

          return;
        }
      };

      transforms.push(
        transform().catch((e) => {
          file.message(
            `[ERROR] Failed to embed ${link.url} in ${file.path} at line ${link.position?.start?.line}; ${String(e)}`,
            link.position,
            "remarkOEmbed",
          );
        }),
      );
    });

    await Promise.all(transforms);
  };
};

const getHName = async (transformer: Transformer, url: URL) => {
  if (typeof transformer.hName === "function") return transformer.hName(url);
  return transformer.hName;
};

const getHProperties = async (transformer: Transformer, url: URL) => {
  if (typeof transformer.hProperties === "function") return transformer.hProperties(url);
  return transformer.hProperties ?? {};
};
