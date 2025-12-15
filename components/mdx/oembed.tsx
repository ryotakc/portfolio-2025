import LinkCard from "./link-card";

type OEmbedData = {
  title?: string;
  author_name?: string;
  author_url?: string;
  type?: string;
  height?: number;
  width?: number;
  version?: string;
  provider_name?: string;
  provider_url?: string;
  thumbnail_height?: number;
  thumbnail_width?: number;
  thumbnail_url?: string;
  html?: string;
  url?: string;
  [key: string]: any;
};

interface OEmbedProps {
  url: string;
  oEmbed?: string; // JSON string because attributes are string
}

export default function OEmbed({ url, oEmbed }: OEmbedProps) {
  let data: OEmbedData | null = null;

  if (oEmbed) {
    try {
      data = JSON.parse(oEmbed);
    } catch (e) {
      console.error("Failed to parse oEmbed data", e);
    }
  }

  // Fallback to LinkCard if no valid OEmbed data or if it's not a rich/video type we handle specifically
  // For now, if we have HTML (like Twitter blockquote or Spotify iframe), use it.
  if (data && data.html) {
    return (
      <div
        className="my-6 w-full flex justify-center"
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    );
  }

  // Add more specific handling here if needed

  // Fallback to LinkCard
  return <LinkCard url={url} />;
}
