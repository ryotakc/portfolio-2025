import Link from "next/link";
import ogs from "open-graph-scraper";

export default async function LinkCard({ url }: { url: string }) {
  // biome-ignore lint/suspicious/noExplicitAny: OGS result is untyped
  let meta: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    const { result } = await ogs({ url });
    meta = result;
  } catch (e) {
    console.error(`Failed to fetch OG data for ${url}`, e);
    // Fallback or return simple link
    return (
      <div className="my-8">
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {url}
        </Link>
      </div>
    );
  }

  if (!meta.success) {
    return (
      <div className="my-8">
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {url}
        </Link>
      </div>
    );
  }

  const title = meta.ogTitle || meta.twitterTitle || url;
  const description = meta.ogDescription || meta.twitterDescription || "";
  const imageUrl = meta.ogImage?.[0]?.url || meta.twitterImage?.[0]?.url;

  const domain = new URL(url).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

  return (
    <div className="my-8 w-full max-w-3xl">
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-[120px] w-full overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all hover:bg-accent/50 hover:shadow-md"
      >
        <div className="flex flex-1 flex-col justify-between p-4 min-w-0">
          <div className="flex flex-col gap-1">
            <h3 className="line-clamp-1 text-base font-semibold transition-colors group-hover:text-primary">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            {/* biome-ignore lint/performance/noImgElement: Favicon */}
            <img // eslint-disable-line @next/next/no-img-element
              src={faviconUrl}
              alt={`${domain} icon`}
              className="h-4 w-4 rounded-sm"
              width={16}
              height={16}
            />
            <span className="truncate">{domain}</span>
          </div>
        </div>

        {imageUrl && (
          <div className="relative h-full aspect-[1.91/1] shrink-0 sm:aspect-square sm:w-auto hidden sm:block">
            {/* Using standard img tag if external, or Next Image if configured. 
                Using img for broader compatibility with external URLs without config */}
            {/* biome-ignore lint/performance/noImgElement: External images */}
            <img // eslint-disable-line @next/next/no-img-element
              src={imageUrl}
              alt={title || "Link preview image"}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </Link>
    </div>
  );
}
